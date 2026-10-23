import { Environment, Lightformer } from '@react-three/drei';

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#dff7e6', '#0a2a1f', 0.65]} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        color="#fff5df"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0008}
      />
      <spotLight
        position={[-4, 3, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.6}
        color="#9ee7b5"
        castShadow
      />
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#fff4d9"
          scale={[6, 6, 1]}
          position={[0, 4, -5]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="circle"
          intensity={1.5}
          color="#7fd99a"
          scale={[4, 4, 1]}
          position={[-4, 1, 3]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#9db7ff"
          scale={[3, 3, 1]}
          position={[4, 2, 2]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
