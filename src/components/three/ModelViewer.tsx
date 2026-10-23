import { Html, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import * as THREE from 'three';
import { Spinner } from '../primitives/Spinner';
import type { ModoConejo } from '../../data/types';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';
import { CanvasFallback } from './CanvasFallback';
import { SceneLights } from './SceneLights';
import styles from './ModelViewer.module.css';

useGLTF.setDecoderPath('/draco/');

interface ModelViewerProps {
  readonly src: string;
  readonly alt?: string;
  readonly mode?: ModoConejo;
  readonly className?: string;
  readonly animation?: string;
  readonly autoRotate?: boolean;
  readonly controls?: boolean;
  readonly animated?: boolean;
}

interface ModeloProps extends Pick<ModelViewerProps, 'src' | 'animation' | 'animated'> {
  readonly reproducir: boolean;
}

class ModelBoundary extends Component<
  { readonly fallback: ReactNode; readonly children: ReactNode },
  { readonly hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      '[ModelViewer] No se pudo cargar el modelo 3D. Se usa la imagen de respaldo.',
      error,
      info.componentStack,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Modelo({ src, animation, animated, reproducir }: ModeloProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(src, true, true);
  const { actions } = useAnimations(animations, group);

  const escena = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const mayor = Math.max(size.x, size.y, size.z) || 1;
    const escala = 2.65 / mayor;

    scene.scale.setScalar(escala);
    scene.position.set(
      -center.x * escala,
      -center.y * escala,
      -center.z * escala,
    );
    scene.updateMatrixWorld(true);

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      const materiales = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materiales.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = 0.95;
          material.aoMapIntensity = 1;
          material.needsUpdate = true;
        }
      });
    });

    return scene;
  }, [scene]);

  useEffect(() => {
    const listaAcciones = Object.values(actions);
    if (!animated || listaAcciones.length === 0) {
      return;
    }

    if (!reproducir) {
      listaAcciones.forEach((action) => action?.stop());
      return;
    }

    const elegida =
      (animation ? actions[animation] : undefined) ?? listaAcciones[0];
    elegida?.reset().fadeIn(0.25).play();

    return () => {
      elegida?.fadeOut(0.2);
    };
  }, [actions, animated, animation, reproducir]);

  return (
    <group ref={group}>
      <primitive object={escena} />
    </group>
  );
}

function CargandoModelo() {
  return (
    <Html center>
      <Spinner label="Cargando conejo 3D..." tone="light" />
    </Html>
  );
}

export function ModelViewer({
  src,
  alt = 'Conejo de Huellas de Esperanza',
  mode = '3d',
  className,
  animation,
  autoRotate = false,
  controls = true,
  animated = true,
}: ModelViewerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [estado, setEstado] = useState<'comprobando' | 'disponible' | 'ausente'>(
    'comprobando',
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (mode === 'image') {
      return;
    }

    let cancelado = false;
    setEstado('comprobando');

    fetch(src, { method: 'HEAD' })
      .then((response) => {
        const tipo = response.headers.get('content-type') ?? '';
        const disponible = response.ok && !tipo.includes('text/html');
        if (!cancelado) {
          setEstado(disponible ? 'disponible' : 'ausente');
        }
      })
      .catch(() => {
        if (!cancelado) {
          setEstado('ausente');
        }
      });

    return () => {
      cancelado = true;
    };
  }, [src, mode]);

  useEffect(() => {
    if (mode === 'image') {
      return;
    }

    const nodo = wrapRef.current;
    if (!nodo || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting));
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    if (mode === 'image' || estado !== 'ausente') {
      return;
    }

    console.info(
      `[ModelViewer] No se encontró "${src}". Se muestra la imagen de respaldo. Añade el .glb en /public/models/.`,
    );
  }, [estado, src, mode]);

  if (mode === 'image') {
    return (
      <div ref={wrapRef} className={`${styles.wrap} ${className ?? ''}`}>
        <CanvasFallback alt={alt} mostrarAviso={false} />
      </div>
    );
  }

  if (estado === 'ausente') {
    return (
      <div ref={wrapRef} className={`${styles.wrap} ${className ?? ''}`}>
        <CanvasFallback alt={alt} />
      </div>
    );
  }

  if (estado === 'comprobando') {
    return (
      <div ref={wrapRef} className={`${styles.wrap} ${className ?? ''}`}>
        <div className={styles.cargando}>
          <Spinner label="Preparando conejo 3D..." tone="light" />
        </div>
      </div>
    );
  }

  const animar = animated && !reducedMotion;
  const frameloop = visible && animar ? 'always' : 'demand';

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className ?? ''}`}>
      <ModelBoundary
        fallback={
          <CanvasFallback
            alt={alt}
            mostrarAviso={false}
          />
        }
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          frameloop={frameloop}
          camera={{ position: [0, 0.15, 4.4], fov: 34, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <SceneLights />
          <Suspense fallback={<CargandoModelo />}>
            <Modelo
              src={src}
              animation={animation}
              animated={animar}
              reproducir={animar}
            />
          </Suspense>
          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom
              minDistance={2.4}
              maxDistance={6.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
              autoRotate={autoRotate && !reducedMotion}
              autoRotateSpeed={0.65}
            />
          )}
        </Canvas>
      </ModelBoundary>
    </div>
  );
}

export default ModelViewer;
