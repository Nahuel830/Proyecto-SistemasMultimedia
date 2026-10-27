import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

/**
 * Visor 3D "estatico" para el conejo asomado + zanahoria.
 * - El conejo NO gira solo: queda quieto y solo se inclina un poco hacia el puntero (efecto de profundidad).
 * - La zanahoria flota y gira suavemente.
 * - Luces neutras (sin tintes de color) para que los ojos y el pelaje se vean como en Blender.
 */

export interface VisorCallbacks {
  onListo: () => void;
  onError: (mensaje: string) => void;
}

const FOV = 28;
const MARGEN = 1.28; // aire alrededor del modelo
const SUBIR = 0.1; // sube el modelo para dejar sitio al texto de abajo

export class VisorAsomado {
  private readonly contenedor: HTMLElement;
  private readonly cb: VisorCallbacks;
  private readonly movimiento: boolean;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly escena = new THREE.Scene();
  private readonly camara = new THREE.PerspectiveCamera(FOV, 1.33, 0.1, 100);
  private readonly pivote = new THREE.Group();
  private readonly dracoLoader = new DRACOLoader();
  private readonly resizeObs: ResizeObserver;
  private readonly onPuntero = (e: PointerEvent): void => this.moverPuntero(e);
  private readonly onSalir = (): void => {
    this.objetivo.set(0, 0);
  };
  private readonly onVisibilidad = (): void => this.actualizarPausa();

  private raf = 0;
  private destruido = false;
  private visible = true;
  private listo = false;
  private t0 = performance.now();
  private readonly objetivo = new THREE.Vector2();
  private readonly actual = new THREE.Vector2();
  private zanahoria: THREE.Object3D | null = null;
  private zanahoriaBase = new THREE.Vector3();
  private zanahoriaGiro = 0;
  private radio = 1.5;
  private centroAlto = 2;
  private centroAncho = 2;

  constructor(contenedor: HTMLElement, urlGlb: string, cb: VisorCallbacks, movimiento: boolean) {
    this.contenedor = contenedor;
    this.cb = cb;
    this.movimiento = movimiento;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    contenedor.appendChild(this.renderer.domElement);

    // luces neutras: nada de verdes ni azules que cambien el color de los ojos
    this.escena.add(new THREE.HemisphereLight(0xffffff, 0xd9d2c3, 1.15));
    const principal = new THREE.DirectionalLight(0xfff6ea, 2.6);
    principal.position.set(-3, 4, 6);
    principal.castShadow = true;
    principal.shadow.mapSize.set(1024, 1024);
    principal.shadow.camera.left = -3;
    principal.shadow.camera.right = 3;
    principal.shadow.camera.top = 3;
    principal.shadow.camera.bottom = -3;
    principal.shadow.bias = -0.0005;
    principal.shadow.normalBias = 0.02;
    this.escena.add(principal);
    const contraluz = new THREE.DirectionalLight(0xffffff, 1.1);
    contraluz.position.set(4, 2, -3);
    this.escena.add(contraluz);

    this.escena.add(this.pivote);

    this.resizeObs = new ResizeObserver(() => this.ajustarTamano());
    this.resizeObs.observe(contenedor);
    this.ajustarTamano();
    document.addEventListener('visibilitychange', this.onVisibilidad);
    if (movimiento) {
      contenedor.addEventListener('pointermove', this.onPuntero);
      contenedor.addEventListener('pointerleave', this.onSalir);
    }

    this.dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`);
    void this.cargar(urlGlb);
  }

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
      this.raf = requestAnimationFrame(this.bucle);
    } catch (err) {
      if (this.destruido) return;
      this.cb.onError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  private montar(raiz: THREE.Object3D): void {
    raiz.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return;
      o.castShadow = true;
      o.receiveShadow = true;
      const materiales = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of materiales) {
        if (m instanceof THREE.MeshStandardMaterial) {
          m.emissive.set(0x000000); // sin brillo propio (los ojos no deben "encenderse")
          m.emissiveMap = null;
          m.metalness = Math.min(m.metalness, 0.1);
          m.roughness = Math.max(m.roughness, 0.55);
        }
        if (m.transparent && m.opacity >= 0.999) {
          m.transparent = false; // evita ojos "vidriosos" por transparencia mal exportada
          m.depthWrite = true;
        }
      }
    });

    this.zanahoria = raiz.getObjectByName('Zanahoria') ?? null;
    if (this.zanahoria) {
      this.zanahoriaBase.copy(this.zanahoria.position);
      this.zanahoriaGiro = this.zanahoria.rotation.y;
    }

    // centrar todo el conjunto en el origen para que la inclinacion sea alrededor de su centro
    raiz.updateMatrixWorld(true);
    const caja = new THREE.Box3().setFromObject(raiz);
    const centro = caja.getCenter(new THREE.Vector3());
    const tam = caja.getSize(new THREE.Vector3());
    raiz.position.sub(centro);
    if (this.zanahoria) this.zanahoriaBase.copy(this.zanahoria.position);
    this.centroAlto = tam.y;
    this.centroAncho = tam.x;
    this.radio = Math.max(tam.z, 0.5);
    this.pivote.add(raiz);
    this.ajustarTamano();
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.actualizarPausa();
  }

  destruir(): void {
    this.destruido = true;
    cancelAnimationFrame(this.raf);
    this.resizeObs.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilidad);
    this.contenedor.removeEventListener('pointermove', this.onPuntero);
    this.contenedor.removeEventListener('pointerleave', this.onSalir);
    this.dracoLoader.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private moverPuntero(e: PointerEvent): void {
    const r = this.contenedor.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    this.objetivo.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  }

  private ajustarTamano(): void {
    const w = Math.max(1, this.contenedor.clientWidth);
    const h = Math.max(1, this.contenedor.clientHeight);
    this.renderer.setSize(w, h, false);
    const aspecto = w / h;
    this.camara.aspect = aspecto;
    this.camara.updateProjectionMatrix();
    const tanV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const distV = (this.centroAlto / 2) / tanV;
    const distH = (this.centroAncho / 2) / (tanV * aspecto);
    const dist = Math.max(distV, distH) * MARGEN + this.radio / 2;
    const y = -this.centroAlto * SUBIR;
    this.camara.position.set(0, y, dist);
    this.camara.lookAt(0, y, 0);
    if (this.listo) this.renderer.render(this.escena, this.camara);
  }

  private actualizarPausa(): void {
    cancelAnimationFrame(this.raf);
    if (this.visible && !document.hidden && !this.destruido && this.listo) {
      this.raf = requestAnimationFrame(this.bucle);
    }
  }

  private readonly bucle = (ahora: number): void => {
    if (this.destruido) return;
    const t = (ahora - this.t0) / 1000;
    if (this.movimiento) {
      this.actual.lerp(this.objetivo, 0.07);
      this.pivote.rotation.y = this.actual.x * 0.3; // se inclina hacia el puntero, sin girar solo
      this.pivote.rotation.x = this.actual.y * 0.12;
      if (this.zanahoria) {
        this.zanahoria.position.y = this.zanahoriaBase.y + Math.sin(t * 1.6) * 0.035;
        this.zanahoria.rotation.y = this.zanahoriaGiro + Math.sin(t * 0.9) * 0.3;
      }
    }
    this.renderer.render(this.escena, this.camara);
    this.raf = requestAnimationFrame(this.bucle);
  };
}
