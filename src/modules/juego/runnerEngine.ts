import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Motor del juego "Corre, Esperanza" (vista lateral, estilo dinosaurio de Chrome).
 * Sin React: solo Three.js. Carga conejo_runner.glb (exportado con huellas_runner_kit.py).
 */

export type EstadoJuego =
  | "cargando"
  | "listo"
  | "corriendo"
  | "perdiendo"
  | "perdido"
  | "entrando"
  | "ganado"
  | "error";

export interface RunnerCallbacks {
  onEstado: (estado: EstadoJuego) => void;
  onTiempo: (segundos: number, nivel: number) => void;
  onError: (mensaje: string) => void;
}

export const DURACION_META = 30; // segundos para llegar a la madriguera
export const SEGUNDOS_POR_NIVEL = 8; // la dificultad cambia cada 8 s

type TipoObstaculo = "chica" | "grande" | "tronco" | "doble";

interface Fase {
  velocidad: number; // m/s con la que avanza el mundo
  hueco: [number, number]; // distancia entre obstaculos (m)
  tipos: TipoObstaculo[];
}

const FASES: Fase[] = [
  { velocidad: 6, hueco: [11, 15], tipos: ["chica"] },
  { velocidad: 7, hueco: [10, 13.5], tipos: ["chica", "grande"] },
  { velocidad: 8, hueco: [9.5, 12.5], tipos: ["chica", "grande", "tronco"] },
  { velocidad: 9, hueco: [9, 12], tipos: ["grande", "tronco", "doble"] },
];

const MEDIDAS = {
  chica: { ancho: 0.64, alto: 0.48 },
  grande: { ancho: 1.16, alto: 1.0 },
  tronco: { ancho: 1.0, alto: 0.55 },
} as const;

const ANCHO_VISTA = 14; // metros visibles en horizontal
const BORDE_INFERIOR = -1.5; // y en la parte baja de la pantalla (suelo = 0)
const CONEJO_X = -2.6;
const SALTO_V0 = 9.6;
const GRAVEDAD = 24;
const TRAMO = 10;
const N_TRAMOS = 3;
const DEJAR_DE_GENERAR = 26.5; // s: desde aqui solo aparece la madriguera
const DIST_ENTRADA = 3.6; // m antes de la madriguera donde empieza la escena final
const PUNTA_MANO = 1.1; // distancia de la palma a la punta de los dedos
const PUNTA_MANO_X = CONEJO_X - 2.2; // donde queda la punta de los dedos mientras corres

interface Obstaculo {
  obj: THREE.Object3D;
  x: number;
  ancho: number;
  alto: number;
}

const aleatorio = (a: number, b: number): number => a + Math.random() * (b - a);
const limitar = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const suave = (t: number): number => {
  const c = limitar(t, 0, 1);
  return c * c * (3 - 2 * c);
};

export class RunnerEngine {
  private readonly contenedor: HTMLElement;
  private readonly cb: RunnerCallbacks;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly escena = new THREE.Scene();
  private readonly camara = new THREE.OrthographicCamera(-ANCHO_VISTA / 2, ANCHO_VISTA / 2, 5, BORDE_INFERIOR, 0.1, 60);
  private readonly dracoLoader = new DRACOLoader();
  private readonly resizeObs: ResizeObserver;
  private readonly onVisibilidad = (): void => this.actualizarPausa();

  private raf = 0;
  private destruido = false;
  private visibleViewport = true;
  private ultimo = 0;
  private estado: EstadoJuego = "cargando";

  // modelos
  private fuente: THREE.Object3D | null = null;
  private conejo!: THREE.Object3D;
  private mano!: THREE.Object3D;
  private mixerConejo!: THREE.AnimationMixer;
  private mixerMano!: THREE.AnimationMixer;
  private accCorrer!: THREE.AnimationAction;
  private accSaltar!: THREE.AnimationAction;
  private accAgarrar!: THREE.AnimationAction;
  private readonly tramos: THREE.Object3D[] = [];
  private readonly nubes: THREE.Object3D[] = [];
  private sombra!: THREE.Mesh;

  // estado del juego
  private obstaculos: Obstaculo[] = [];
  private madriguera: Obstaculo | null = null;
  private tiempo = 0;
  private reloj = 0;
  private velocidad = 0;
  private scroll = 0;
  private y = 0;
  private vy = 0;
  private enAire = false;
  private bufferSalto = 0;
  private hastaSiguiente = 0;
  private tFase = 0;
  private xEntrada = CONEJO_X;
  private ultimoReporte = -1;

  constructor(contenedor: HTMLElement, urlGlb: string, cb: RunnerCallbacks) {
    this.contenedor = contenedor;
    this.cb = cb;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    contenedor.appendChild(this.renderer.domElement);

    this.camara.position.set(0, 0, 20);
    this.escena.add(new THREE.HemisphereLight(0xffffff, 0x9a8a6a, 1.5));
    const sol = new THREE.DirectionalLight(0xfff2d8, 2.4);
    sol.position.set(4, 8, 10);
    this.escena.add(sol);

    this.resizeObs = new ResizeObserver(() => this.ajustarTamano());
    this.resizeObs.observe(contenedor);
    this.ajustarTamano();
    document.addEventListener("visibilitychange", this.onVisibilidad);

    this.dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);
    void this.cargar(urlGlb);
  }

  // ------------------------------------------------------------------ carga
  private async cargar(url: string): Promise<void> {
    try {
      const loader = new GLTFLoader();
      loader.setDRACOLoader(this.dracoLoader);
      const gltf = await loader.loadAsync(url);
      if (this.destruido) return;
      this.fuente = gltf.scene;
      this.construirEscena(gltf.animations);
      this.reiniciarMundo();
      this.cambiarEstado("listo");
      this.ultimo = performance.now();
      this.raf = requestAnimationFrame(this.bucle);
    } catch (err) {
      if (this.destruido) return;
      const msg = err instanceof Error ? err.message : "Error desconocido";
      this.cb.onError(msg);
      this.cambiarEstado("error");
    }
  }

  private clonar(nombre: string): THREE.Object3D {
    const nodo = this.fuente?.getObjectByName(nombre);
    if (!nodo) throw new Error(`Falta el nodo "${nombre}" en el archivo .glb`);
    const copia = nodo.clone(true);
    copia.position.set(0, 0, 0);
    return copia;
  }

  private construirEscena(clips: THREE.AnimationClip[]): void {
    const clip = (nombre: string): THREE.AnimationClip => {
      const c = THREE.AnimationClip.findByName(clips, nombre);
      if (!c) throw new Error(`Falta la animacion "${nombre}" en el archivo .glb`);
      return c;
    };

    for (let i = 0; i < N_TRAMOS; i++) {
      const t = this.clonar("Suelo_Tramo");
      this.tramos.push(t);
      this.escena.add(t);
    }
    const alturas = [3.9, 4.6, 3.5];
    alturas.forEach((h, i) => {
      const n = this.clonar("Nube");
      n.position.set(-6 + i * 6.5, h, -3);
      this.nubes.push(n);
      this.escena.add(n);
    });

    this.conejo = this.clonar("Conejo");
    this.escena.add(this.conejo);
    this.mixerConejo = new THREE.AnimationMixer(this.conejo);
    this.accCorrer = this.mixerConejo.clipAction(clip("Correr"));
    this.accSaltar = this.mixerConejo.clipAction(clip("Saltar"));
    this.accSaltar.setLoop(THREE.LoopOnce, 1);
    this.accSaltar.clampWhenFinished = true;

    this.mano = this.clonar("Mano");
    this.escena.add(this.mano);
    this.mixerMano = new THREE.AnimationMixer(this.mano);
    this.accAgarrar = this.mixerMano.clipAction(clip("Agarrar"));

    const geo = new THREE.CircleGeometry(0.62, 24);
    geo.rotateX(-Math.PI / 2);
    this.sombra = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22, depthWrite: false }),
    );
    this.sombra.scale.set(1.3, 1, 0.5);
    this.sombra.position.z = 0.4;
    this.escena.add(this.sombra);
  }

  // ------------------------------------------------------------- API publica
  iniciar(): void {
    if (this.estado !== "listo" && this.estado !== "perdido" && this.estado !== "ganado") return;
    this.reiniciarMundo();
    this.accSaltar.stop();
    this.accCorrer.reset().play();
    this.mixerConejo.timeScale = 1;
    this.velocidad = FASES[0].velocidad;
    this.hastaSiguiente = 6;
    this.cambiarEstado("corriendo");
  }

  saltar(): void {
    if (this.estado !== "corriendo") return;
    if (!this.enAire) this.iniciarSalto();
    else this.bufferSalto = 0.12;
  }

  setVisible(visible: boolean): void {
    this.visibleViewport = visible;
    this.actualizarPausa();
  }

  destruir(): void {
    this.destruido = true;
    cancelAnimationFrame(this.raf);
    this.resizeObs.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilidad);
    this.dracoLoader.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // ------------------------------------------------------------------ interno
  private cambiarEstado(e: EstadoJuego): void {
    this.estado = e;
    this.cb.onEstado(e);
  }

  private ajustarTamano(): void {
    const w = Math.max(1, this.contenedor.clientWidth);
    const h = Math.max(1, this.contenedor.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camara.top = BORDE_INFERIOR + ANCHO_VISTA / (w / h);
    this.camara.bottom = BORDE_INFERIOR;
    this.camara.updateProjectionMatrix();
    if (this.fuente) this.renderer.render(this.escena, this.camara);
  }

  private actualizarPausa(): void {
    const activo = this.visibleViewport && !document.hidden;
    cancelAnimationFrame(this.raf);
    if (activo && !this.destruido && this.fuente) {
      this.ultimo = performance.now();
      this.raf = requestAnimationFrame(this.bucle);
    }
  }

  private reiniciarMundo(): void {
    for (const o of this.obstaculos) this.escena.remove(o.obj);
    this.obstaculos = [];
    if (this.madriguera) this.escena.remove(this.madriguera.obj);
    this.madriguera = null;
    this.tiempo = 0;
    this.scroll = 0;
    this.velocidad = 0;
    this.y = 0;
    this.vy = 0;
    this.enAire = false;
    this.bufferSalto = 0;
    this.tFase = 0;
    this.ultimoReporte = -1;
    this.conejo.position.set(CONEJO_X, 0, 0);
    this.conejo.rotation.set(0, 0, 0);
    this.mano.position.set(PUNTA_MANO_X - PUNTA_MANO, 0, 0);
    this.accAgarrar.reset().play();
    this.accAgarrar.timeScale = 1;
    this.mixerConejo.timeScale = 1;
    // en espera: el conejo se queda quieto en pose neutra
    this.accCorrer.stop();
    this.accSaltar.reset().play();
    this.accSaltar.paused = true;
    this.mixerConejo.update(0);
    this.posicionarMundo(0, 0);
    this.cb.onTiempo(0, 0);
  }

  private iniciarSalto(): void {
    this.enAire = true;
    this.vy = SALTO_V0;
    this.accSaltar.reset().play();
    this.accSaltar.paused = false;
    this.accSaltar.timeScale = 1.2;
    this.accSaltar.fadeIn(0.06);
    this.accCorrer.fadeOut(0.06);
  }

  private aterrizar(): void {
    this.accSaltar.fadeOut(0.06);
    this.accCorrer.reset().fadeIn(0.06).play();
  }

  private readonly bucle = (ahora: number): void => {
    if (this.destruido) return;
    const dt = Math.min(0.05, (ahora - this.ultimo) / 1000);
    this.ultimo = ahora;
    this.reloj += dt;
    this.actualizar(dt);
    this.renderer.render(this.escena, this.camara);
    this.raf = requestAnimationFrame(this.bucle);
  };

  private actualizar(dt: number): void {
    switch (this.estado) {
      case "corriendo":
        this.pasoCorriendo(dt);
        break;
      case "perdiendo":
        this.pasoPerdiendo(dt);
        break;
      case "entrando":
        this.pasoEntrando(dt);
        break;
      default:
        this.posicionarMundo(0, dt);
        break;
    }
    this.mixerConejo.update(dt);
    this.mixerMano.update(dt);
    this.sombra.position.x = this.conejo.position.x;
    const altura = Math.max(0, this.conejo.position.y);
    this.sombra.scale.set(1.3 * (1 - Math.min(0.5, altura * 0.25)), 1, 0.5);
    this.sombra.visible = this.conejo.position.y >= -0.05;
  }

  // ------------------------------------------------------------- estado: corriendo
  private pasoCorriendo(dt: number): void {
    this.tiempo = Math.min(DURACION_META, this.tiempo + dt);
    const nivel = Math.min(FASES.length - 1, Math.floor(this.tiempo / SEGUNDOS_POR_NIVEL));
    const fase = FASES[nivel];

    this.velocidad += limitar(fase.velocidad - this.velocidad, -3 * dt, 3 * dt);
    this.accCorrer.timeScale = this.velocidad / 6;
    this.posicionarMundo(this.velocidad * dt, dt);

    // salto
    if (this.enAire) {
      this.vy -= GRAVEDAD * dt;
      this.y += this.vy * dt;
      if (this.y <= 0) {
        this.y = 0;
        this.vy = 0;
        this.enAire = false;
        this.aterrizar();
        if (this.bufferSalto > 0) this.iniciarSalto();
      }
    }
    this.bufferSalto = Math.max(0, this.bufferSalto - dt);
    this.conejo.position.y = this.y;

    // la mano te persigue
    this.mano.position.x = PUNTA_MANO_X - PUNTA_MANO + Math.sin(this.reloj * 2.4) * 0.2;

    // aparicion de obstaculos
    if (this.tiempo < DEJAR_DE_GENERAR) {
      this.hastaSiguiente -= this.velocidad * dt;
      if (this.hastaSiguiente <= 0) {
        this.generar(fase);
        this.hastaSiguiente = aleatorio(fase.hueco[0], fase.hueco[1]);
      }
    } else if (!this.madriguera) {
      this.generarMadriguera();
    }

    if (this.colisiona()) {
      this.perder();
      return;
    }
    if (this.madriguera && this.madriguera.x - CONEJO_X <= DIST_ENTRADA) {
      this.iniciarEntrada();
      return;
    }

    const paso = Math.floor(this.tiempo * 10);
    if (paso !== this.ultimoReporte) {
      this.ultimoReporte = paso;
      this.cb.onTiempo(this.tiempo, nivel);
    }
  }

  private posicionarMundo(distancia: number, dt: number): void {
    this.scroll += distancia;
    for (let i = 0; i < this.tramos.length; i++) {
      const largo = TRAMO * N_TRAMOS;
      this.tramos[i].position.x = ((((i * TRAMO - this.scroll) % largo) + largo) % largo) - largo / 2;
    }
    for (const n of this.nubes) {
      n.position.x -= distancia * 0.25 + dt * 0.3;
      if (n.position.x < -11) n.position.x += 22 + aleatorio(0, 3);
    }
    for (const o of this.obstaculos) {
      o.x -= distancia;
      o.obj.position.x = o.x;
    }
    this.obstaculos = this.obstaculos.filter((o) => {
      if (o.x < -12) {
        this.escena.remove(o.obj);
        return false;
      }
      return true;
    });
    if (this.madriguera) {
      this.madriguera.x -= distancia;
      this.madriguera.obj.position.x = this.madriguera.x;
    }
  }

  private generar(fase: Fase): void {
    const tipo = fase.tipos[Math.floor(Math.random() * fase.tipos.length)];
    const x = ANCHO_VISTA / 2 + 1.5;
    if (tipo === "doble") {
      this.agregar("Roca_Chica", MEDIDAS.chica, x);
      this.agregar("Roca_Chica", MEDIDAS.chica, x + 1.9);
    } else if (tipo === "chica") {
      this.agregar("Roca_Chica", MEDIDAS.chica, x);
    } else if (tipo === "grande") {
      this.agregar("Roca_Grande", MEDIDAS.grande, x);
    } else {
      this.agregar("Tronco", MEDIDAS.tronco, x);
    }
  }

  private agregar(nodo: string, medida: { ancho: number; alto: number }, x: number): void {
    const obj = this.clonar(nodo);
    if (nodo !== "Tronco") obj.rotation.y = Math.random() * Math.PI * 2;
    obj.position.x = x;
    this.escena.add(obj);
    this.obstaculos.push({ obj, x, ancho: medida.ancho, alto: medida.alto });
  }

  private generarMadriguera(): void {
    const obj = this.clonar("Madriguera");
    const x = CONEJO_X + DIST_ENTRADA + this.velocidad * (DURACION_META - this.tiempo);
    obj.position.x = x;
    this.escena.add(obj);
    this.madriguera = { obj, x, ancho: 3, alto: 0.9 };
  }

  private colisiona(): boolean {
    const x0 = CONEJO_X - 0.35;
    const x1 = CONEJO_X + 0.65;
    const y0 = this.y + 0.12;
    const y1 = this.y + 0.95;
    for (const o of this.obstaculos) {
      const mitad = (o.ancho / 2) * 0.82;
      if (x1 > o.x - mitad && x0 < o.x + mitad && y0 < o.alto * 0.9 && y1 > 0) return true;
    }
    return false;
  }

  // ------------------------------------------------------------- estado: perdiendo
  private perder(): void {
    this.tFase = 0;
    this.mixerConejo.timeScale = 0;
    this.cambiarEstado("perdiendo");
  }

  private pasoPerdiendo(dt: number): void {
    this.tFase += dt;
    const objetivo = this.conejo.position.x - 0.35 - PUNTA_MANO;
    if (this.mano.position.x < objetivo) {
      this.mano.position.x = Math.min(objetivo, this.mano.position.x + 14 * dt);
    } else {
      this.accAgarrar.timeScale = 2.5;
      const alza = Math.min(0.5, (this.tFase - 0.25) * 0.8);
      if (alza > 0) {
        this.mano.position.y = alza;
        this.conejo.position.y = this.y + alza;
      }
    }
    if (this.tFase > 1.3) {
      this.cb.onTiempo(this.tiempo, Math.min(FASES.length - 1, Math.floor(this.tiempo / SEGUNDOS_POR_NIVEL)));
      this.cambiarEstado("perdido");
    }
  }

  // ------------------------------------------------------------- estado: entrando
  private iniciarEntrada(): void {
    this.tFase = 0;
    this.tiempo = DURACION_META;
    this.xEntrada = this.conejo.position.x;
    this.cb.onTiempo(DURACION_META, FASES.length - 1);
    this.cambiarEstado("entrando");
  }

  private pasoEntrando(dt: number): void {
    this.tFase += dt;
    const frenado = limitar(1 - this.tFase / 0.5, 0, 1);
    this.velocidad = FASES[FASES.length - 1].velocidad * frenado;
    this.posicionarMundo(this.velocidad * dt, dt);
    this.accCorrer.timeScale = Math.max(0.5, this.velocidad / 6);

    const m = this.madriguera;
    if (m) {
      const p = suave((this.tFase - 0.2) / 1.5);
      this.conejo.position.x = this.xEntrada + (m.x - this.xEntrada) * p;
      const hundir = suave((p - 0.35) / 0.65);
      this.conejo.position.y = this.y - 2.3 * hundir;
      this.conejo.rotation.z = -0.55 * hundir;
      // la mano intenta agarrarlo y se queda con las manos vacias
      const objetivo = m.x - 1.4 - PUNTA_MANO;
      this.mano.position.x = Math.min(objetivo, this.mano.position.x + 9 * dt);
    }
    if (this.tFase > 1.9) this.accAgarrar.timeScale = 2.5;
    if (this.tFase > 2.8) this.cambiarEstado("ganado");
  }
}
