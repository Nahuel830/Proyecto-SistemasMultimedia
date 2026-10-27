import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Escena 3D de portada: conejo + letras "HUELLAS DE ESPERANZA" + lampara.
 * Sin React: solo Three.js. Carga huellas_inicio.glb (exportado con huellas_inicio_escena.py).
 */

export interface PortadaCallbacks {
  onListo: () => void;
  onError: (mensaje: string) => void;
}

const SEMIANCHO = 5.9; // metros de escena que deben caber a cada lado del centro
const CENTRO_X = 0.2;
const DISTANCIA = 18;
const OBJETIVO_Y = 1.05;
const ALTURA_CAMARA = 1.9;
const FOV_MINIMO = 18;
const DIST_MIN = 3.5; // zoom maximo (m)
const DIST_MAX = 24; // zoom minimo (m)
const DIST_CONEJO = 8.5; // distancia al "acercar al conejo"

const limitar = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
const suave = (t: number): number => {
  const c = limitar(t, 0, 1);
  return c * c * (3 - 2 * c);
};

interface Enfoque {
  t: number;
  dur: number;
  tIni: THREE.Vector3;
  tFin: THREE.Vector3;
  dirIni: THREE.Vector3;
  dirFin: THREE.Vector3;
  dIni: number;
  dFin: number;
}

export class PortadaEngine {
  private readonly contenedor: HTMLElement;
  private readonly cb: PortadaCallbacks;
  private readonly movimiento: boolean;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly escena = new THREE.Scene();
  private readonly camara = new THREE.PerspectiveCamera(30, 2, 0.1, 80);
  private readonly dracoLoader = new DRACOLoader();
  private readonly resizeObs: ResizeObserver;
  private readonly controles: OrbitControls;
  private readonly objetivoVista = new THREE.Vector3(CENTRO_X, OBJETIVO_Y, 0);
  private readonly objetivoConejo = new THREE.Vector3(2.3, 1.1, 0);
  private enfoque: Enfoque | null = null;
  private cerca = false;
  private ultimo = 0;
  private readonly onRueda = (e: WheelEvent): void => {
    if (!e.ctrlKey) return; // sin Ctrl la rueda sigue haciendo scroll en la pagina
    e.preventDefault();
    this.cambiarDistancia(Math.exp(e.deltaY * 0.0025));
  };
  private readonly onVisibilidad = (): void => this.actualizarPausa();

  private raf = 0;
  private destruido = false;
  private visible = true;
  private listo = false;
  private t0 = performance.now();

  private conejo: THREE.Object3D | null = null;
  private readonly letras: THREE.Object3D[] = [];
  private foco: THREE.SpotLight | null = null;
  private focoBase = 0;
  private bombilla: THREE.PointLight | null = null;

  constructor(contenedor: HTMLElement, urlGlb: string, cb: PortadaCallbacks, movimiento: boolean) {
    this.contenedor = contenedor;
    this.cb = cb;
    this.movimiento = movimiento;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    contenedor.appendChild(this.renderer.domElement);

    this.escena.add(new THREE.HemisphereLight(0xb8e6cc, 0x0b2a20, 1.1));
    const frontal = new THREE.DirectionalLight(0xfff4e0, 1.7);
    frontal.position.set(-3, 5, 12);
    this.escena.add(frontal);

    this.camara.position.set(CENTRO_X, ALTURA_CAMARA, DISTANCIA);
    this.controles = new OrbitControls(this.camara, this.renderer.domElement);
    this.controles.target.copy(this.objetivoVista);
    this.controles.enableDamping = true;
    this.controles.dampingFactor = 0.08;
    this.controles.enablePan = false;
    this.controles.enableZoom = false; // el zoom va con Ctrl + rueda o con los botones
    this.controles.rotateSpeed = 0.6;
    this.controles.minPolarAngle = Math.PI / 2 - 0.55;
    this.controles.maxPolarAngle = Math.PI / 2 + 0.08;
    this.controles.minAzimuthAngle = -0.95;
    this.controles.maxAzimuthAngle = 0.95;
    this.controles.update();
    this.renderer.domElement.style.touchAction = "pan-y"; // en el movil, el scroll vertical sigue funcionando
    this.renderer.domElement.style.cursor = "grab";
    contenedor.addEventListener("wheel", this.onRueda, { passive: false });

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
      this.montar(gltf.scene);
      this.listo = true;
      this.cb.onListo();
      this.t0 = performance.now();
      this.ultimo = this.t0;
      this.raf = requestAnimationFrame(this.bucle);
    } catch (err) {
      if (this.destruido) return;
      this.cb.onError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  private montar(raiz: THREE.Object3D): void {
    this.escena.add(raiz);
    raiz.updateMatrixWorld(true);

    this.conejo = raiz.getObjectByName("Conejo_Hero") ?? null;
    if (this.conejo) {
      this.conejo.getWorldPosition(this.objetivoConejo);
      this.objetivoConejo.y += 1.1; // a la altura del pecho/cabeza
    }
    for (const nombre of ["Texto_HuellasDe", "Texto_Esperanza"]) {
      const l = raiz.getObjectByName(nombre);
      if (l) this.letras.push(l);
    }
    const haz = raiz.getObjectByName("Haz_Luz");
    const suelo = raiz.getObjectByName("Suelo");

    raiz.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      const material = o.material as THREE.Material;
      if (material instanceof THREE.MeshStandardMaterial && material.metalness > 0.5) {
        material.metalness = 0.35; // sin mapa de entorno, el metal puro se ve negro
      }
      const esHaz = haz !== undefined && (o === haz || haz.getObjectById(o.id) !== undefined);
      if (esHaz) {
        material.depthWrite = false;
        o.renderOrder = 2;
        o.castShadow = false;
        o.receiveShadow = false;
        return;
      }
      const esLetra = this.letras.some((l) => l === o || l.getObjectById(o.id) !== undefined);
      o.castShadow = !esLetra;
      o.receiveShadow = suelo !== undefined;
    });

    // luz de la lampara: nace en el vacio "Luz_Lampara" del .glb
    const posFoco = new THREE.Vector3(3.5, 2.8, -0.3);
    raiz.getObjectByName("Luz_Lampara")?.getWorldPosition(posFoco);
    const objetivo = new THREE.Object3D();
    const pecho = new THREE.Vector3(2.3, 0.95, -0.3);
    this.conejo?.getWorldPosition(pecho);
    pecho.y += 0.95;
    objetivo.position.copy(pecho);
    this.escena.add(objetivo);

    this.focoBase = 260;
    const spot = new THREE.SpotLight(0xffd9a0, this.focoBase, 14, 0.75, 0.6, 2);
    spot.position.copy(posFoco);
    spot.target = objetivo;
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.bias = -0.0004;
    this.escena.add(spot);
    this.foco = spot;

    const bombilla = new THREE.PointLight(0xffc966, 8, 5, 2);
    bombilla.position.copy(posFoco);
    this.escena.add(bombilla);
    this.bombilla = bombilla;
  }

  // ------------------------------------------------------------- API publica
  setVisible(visible: boolean): void {
    this.visible = visible;
    this.actualizarPausa();
  }

  /** direccion 1 = acercar, -1 = alejar */
  zoom(direccion: 1 | -1): void {
    this.enfoque = null;
    this.cambiarDistancia(direccion > 0 ? 0.8 : 1.25);
  }

  /** Alterna entre ver al conejo de cerca y la escena completa. Devuelve true si quedo de cerca. */
  alternarEnfoque(): boolean {
    this.cerca = !this.cerca;
    this.iniciarEnfoque(this.cerca ? this.objetivoConejo : this.objetivoVista, this.cerca ? DIST_CONEJO : DISTANCIA, false);
    return this.cerca;
  }

  restablecer(): void {
    this.cerca = false;
    this.iniciarEnfoque(this.objetivoVista, DISTANCIA, true);
  }

  destruir(): void {
    this.destruido = true;
    cancelAnimationFrame(this.raf);
    this.resizeObs.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibilidad);
    this.contenedor.removeEventListener("wheel", this.onRueda);
    this.controles.dispose();
    this.dracoLoader.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // ------------------------------------------------------------------ interno
  private cambiarDistancia(factor: number): void {
    const desde = this.camara.position.clone().sub(this.controles.target);
    desde.setLength(limitar(desde.length() * factor, DIST_MIN, DIST_MAX));
    this.camara.position.copy(this.controles.target).add(desde);
    this.controles.update();
  }

  private iniciarEnfoque(destino: THREE.Vector3, distancia: number, reiniciarAngulo: boolean): void {
    const dirActual = this.camara.position.clone().sub(this.controles.target).normalize();
    const dirFin = reiniciarAngulo
      ? new THREE.Vector3(0, ALTURA_CAMARA - OBJETIVO_Y, DISTANCIA).normalize()
      : dirActual.clone();
    this.enfoque = {
      t: 0,
      dur: 0.9,
      tIni: this.controles.target.clone(),
      tFin: destino.clone(),
      dirIni: dirActual,
      dirFin,
      dIni: this.camara.position.distanceTo(this.controles.target),
      dFin: distancia,
    };
  }

  private ajustarTamano(): void {
    const w = Math.max(1, this.contenedor.clientWidth);
    const h = Math.max(1, this.contenedor.clientHeight);
    this.renderer.setSize(w, h, false);
    const aspecto = w / h;
    this.camara.aspect = aspecto;
    const fov = THREE.MathUtils.radToDeg(2 * Math.atan(SEMIANCHO / aspecto / DISTANCIA));
    this.camara.fov = Math.max(FOV_MINIMO, fov);
    this.camara.updateProjectionMatrix();
    if (this.listo) this.renderer.render(this.escena, this.camara);
  }

  private actualizarPausa(): void {
    cancelAnimationFrame(this.raf);
    if (this.visible && !document.hidden && !this.destruido && this.listo) {
      this.ultimo = performance.now();
      this.raf = requestAnimationFrame(this.bucle);
    }
  }

  private readonly bucle = (ahora: number): void => {
    if (this.destruido) return;
    const t = (ahora - this.t0) / 1000;
    const dt = Math.min(0.05, Math.max(0, (ahora - this.ultimo) / 1000));
    this.ultimo = ahora;

    if (this.enfoque) {
      const f = this.enfoque;
      f.t += dt;
      const k = suave(f.t / f.dur);
      this.controles.target.lerpVectors(f.tIni, f.tFin, k);
      const dir = new THREE.Vector3().lerpVectors(f.dirIni, f.dirFin, k).normalize();
      this.camara.position.copy(this.controles.target).addScaledVector(dir, f.dIni + (f.dFin - f.dIni) * k);
      if (f.t >= f.dur) this.enfoque = null;
    }
    this.controles.update();

    if (this.movimiento) {
      if (this.conejo) {
        this.conejo.rotation.y = Math.sin(t * 0.6) * 0.18;
        this.conejo.position.y = Math.sin(t * 1.5) * 0.012;
      }
      this.letras.forEach((l, i) => {
        l.rotation.y = Math.sin(t * 0.4 + i) * 0.035;
      });
      const parpadeo = 1 + 0.025 * Math.sin(t * 7) + 0.015 * Math.sin(t * 13.3);
      if (this.foco) this.foco.intensity = this.focoBase * parpadeo;
      if (this.bombilla) this.bombilla.intensity = 8 * parpadeo;
    }
    this.renderer.render(this.escena, this.camara);
    this.raf = requestAnimationFrame(this.bucle);
  };
}
