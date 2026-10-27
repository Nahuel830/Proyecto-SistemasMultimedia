/**
 * Musica de fondo global.
 * - Vive FUERA de React (un unico <audio>), asi no se corta al cambiar de pagina.
 * - Se repite sin parar (loop).
 * - Los navegadores no dejan sonar audio hasta que la persona interactua: arranca con el primer
 *   clic, toque o tecla en cualquier parte de la pagina.
 * - Se pausa sola mientras suena cualquier <video> (el de Mi historia) y vuelve al terminar o pausar.
 * - La persona puede apagarla con el boton; se recuerda en localStorage.
 */

const CLAVE = 'huellas-musica';
const VOLUMEN = 0.35;
const FADE_MS = 600;

export interface EstadoMusica {
  readonly deseada: boolean; // la persona quiere musica
  readonly sonando: boolean;
  readonly porVideo: boolean; // pausada porque hay un video reproduciendose
  readonly bloqueada: boolean; // el navegador espera una interaccion para poder sonar
}

type Escucha = () => void;

function leerPreferencia(): boolean {
  try {
    return window.localStorage.getItem(CLAVE) !== 'off';
  } catch {
    return true;
  }
}

function guardarPreferencia(encendida: boolean): void {
  try {
    window.localStorage.setItem(CLAVE, encendida ? 'on' : 'off');
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

class MusicaFondo {
  private audio: HTMLAudioElement | null = null;
  private readonly escuchas = new Set<Escucha>();
  private readonly videos = new Set<HTMLVideoElement>();
  private estado: EstadoMusica = { deseada: true, sonando: false, porVideo: false, bloqueada: true };
  private iniciado = false;
  private vigilante = 0;
  private fade = 0;

  /** Llamar una vez (el boton lo hace al montarse). */
  iniciar(): void {
    if (this.iniciado) return;
    this.iniciado = true;

    const audio = new Audio(`${import.meta.env.BASE_URL}audio/musica-fondo.mp3`);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    this.audio = audio;
    this.cambiar({ deseada: leerPreferencia() });

    const alInteractuar = (): void => {
      window.removeEventListener('pointerdown', alInteractuar, true);
      window.removeEventListener('keydown', alInteractuar, true);
      window.removeEventListener('touchstart', alInteractuar, true);
      this.reproducir();
    };
    window.addEventListener('pointerdown', alInteractuar, true);
    window.addEventListener('keydown', alInteractuar, true);
    window.addEventListener('touchstart', alInteractuar, true);

    // los eventos de audio/video no "burbujean": se escuchan en la fase de captura
    document.addEventListener('play', (e) => {
      if (e.target instanceof HTMLVideoElement) this.videoEmpezo(e.target);
    }, true);
    const terminoVideo = (e: Event): void => {
      if (e.target instanceof HTMLVideoElement) this.videoParo(e.target);
    };
    document.addEventListener('pause', terminoVideo, true);
    document.addEventListener('ended', terminoVideo, true);

    this.reproducir(); // por si el navegador ya lo permite
  }

  readonly suscribir = (escucha: Escucha): (() => void) => {
    this.escuchas.add(escucha);
    return () => {
      this.escuchas.delete(escucha);
    };
  };

  readonly obtener = (): EstadoMusica => this.estado;

  readonly alternar = (): void => {
    const deseada = !this.estado.deseada;
    guardarPreferencia(deseada);
    this.cambiar({ deseada });
    if (deseada) this.reproducir();
    else this.apagar();
  };

  // ------------------------------------------------------------------ interno
  private cambiar(parcial: Partial<EstadoMusica>): void {
    this.estado = { ...this.estado, ...parcial };
    this.escuchas.forEach((e) => e());
  }

  private reproducir(): void {
    const audio = this.audio;
    if (!audio || !this.estado.deseada || this.estado.porVideo) return;
    audio
      .play()
      .then(() => {
        this.cambiar({ sonando: true, bloqueada: false });
        this.fadeA(VOLUMEN);
      })
      .catch(() => {
        this.cambiar({ sonando: false, bloqueada: true });
      });
  }

  private apagar(): void {
    this.fadeA(0, () => {
      this.audio?.pause();
      this.cambiar({ sonando: false });
    });
  }

  private fadeA(objetivo: number, alTerminar?: () => void): void {
    const audio = this.audio;
    if (!audio) return;
    window.clearInterval(this.fade);
    const paso = (objetivo - audio.volume) / (FADE_MS / 40);
    this.fade = window.setInterval(() => {
      const siguiente = audio.volume + paso;
      const llego = paso >= 0 ? siguiente >= objetivo : siguiente <= objetivo;
      audio.volume = Math.min(1, Math.max(0, llego ? objetivo : siguiente));
      if (llego) {
        window.clearInterval(this.fade);
        alTerminar?.();
      }
    }, 40);
  }

  private videoEmpezo(video: HTMLVideoElement): void {
    this.videos.add(video);
    if (this.estado.porVideo) return;
    this.cambiar({ porVideo: true });
    this.fadeA(0, () => {
      this.audio?.pause();
      this.cambiar({ sonando: false });
    });
    // si el video desaparece (cambio de pagina) sin avisar, se reanuda sola
    window.clearInterval(this.vigilante);
    this.vigilante = window.setInterval(() => this.revisarVideos(), 800);
  }

  private videoParo(video: HTMLVideoElement): void {
    this.videos.delete(video);
    this.revisarVideos();
  }

  private revisarVideos(): void {
    for (const v of Array.from(this.videos)) {
      if (!v.isConnected || v.paused || v.ended) this.videos.delete(v);
    }
    if (this.videos.size > 0 || !this.estado.porVideo) return;
    window.clearInterval(this.vigilante);
    this.cambiar({ porVideo: false });
    this.reproducir();
  }
}

export const musicaFondo = new MusicaFondo();
