import React, { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Metal = () => <meshStandardMaterial color="#9AA8C8" roughness={0.38} metalness={0.65} />;
const Frame = () => <meshStandardMaterial color="#293355" roughness={0.5} metalness={0.25} />;

function BarbellProp({ figureRef, fallback = [0, 0.82, 0.42] }) {
  const ref = useRef();
  useFrame(() => {
    const left = figureRef?.current?.getJointWorldPosition?.("handL");
    const right = figureRef?.current?.getJointWorldPosition?.("handR");
    if (!ref.current || !left || !right) return;
    const l = new THREE.Vector3(...left);
    const r = new THREE.Vector3(...right);
    ref.current.position.copy(l).add(r).multiplyScalar(0.5);
    const dir = r.clone().sub(l);
    if (dir.lengthSq() > 0.0001) {
      dir.normalize();
      ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
    }
  });
  return <group ref={ref} position={fallback}>
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.018, 0.018, 1.5, 16]} /><Metal /></mesh>
    {[-0.58, 0.58].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.11, 0.11, 0.09, 20]} /><Frame /></mesh>)}
  </group>;
}

function DumbbellPair({ figureRef, fallbackY = 1.26 }) {
  const leftRef = useRef();
  const rightRef = useRef();
  useFrame(() => {
    for (const [side, ref] of [["L", leftRef], ["R", rightRef]]) {
      const transform = figureRef?.current?.getJointWorldTransform?.(`hand${side}`);
      if (ref.current && transform) {
        ref.current.position.copy(transform.position);
        ref.current.quaternion.copy(transform.quaternion);
      }
    }
  });
  return <>
    {[leftRef, rightRef].map((ref, index) => <group key={index} ref={ref} position={[index ? 0.33 : -0.33, fallbackY, 0.18]}>
      {/* Dumbbell aligned across the hand's palm grip */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.018, 0.018, 0.22, 12]} /><Metal /></mesh>
      {[-0.11, 0.11].map((z) => <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.075, 0.075, 0.05, 16]} /><Frame /></mesh>)}
    </group>)}
  </>;
}

export function ExerciseProps({ items = [], figureRef }) {
  return <group>
    {items.map((item, index) => {
      const key = `${item}-${index}`;
      if (item === "mat") return <group key={key}>
        <RoundedBox args={[0.78, 0.045, 2.12]} radius={0.06} smoothness={3} position={[0, 0.005, -0.02]} receiveShadow>
          <meshStandardMaterial color="#35255E" roughness={0.82} />
        </RoundedBox>
        <RoundedBox args={[0.74, 0.008, 2.06]} radius={0.05} smoothness={3} position={[0, 0.03, -0.02]}>
          <meshStandardMaterial color="#4B347E" roughness={0.88} />
        </RoundedBox>
      </group>;
      if (item === "bench") return <group key={key}>
        <RoundedBox args={[0.38, 0.08, 1.25]} radius={0.03} smoothness={3} position={[0, 0.41, 0]} castShadow><Frame /></RoundedBox>
        <mesh position={[0, 0.19, 0.45]} castShadow><cylinderGeometry args={[0.035, 0.035, 0.38, 12]} /><Frame /></mesh>
        <mesh position={[0, 0.19, -0.45]} castShadow><cylinderGeometry args={[0.035, 0.035, 0.38, 12]} /><Frame /></mesh>
        <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.02, 0.02, 0.55, 12]} /><Metal /></mesh>
      </group>;
      if (item === "barbell") return <BarbellProp key={key} figureRef={figureRef} />;
      if (item === "dumbbells" || item === "bottles") return <DumbbellPair key={key} figureRef={figureRef} />;
      if (item === "cable") return <group key={key} position={[0, 0, -0.58]}>
        <mesh position={[-0.48, 0.88, 0]} castShadow><boxGeometry args={[0.09, 1.78, 0.1]} /><Frame /></mesh>
        <mesh position={[0.48, 0.88, 0]} castShadow><boxGeometry args={[0.09, 1.78, 0.1]} /><Frame /></mesh>
        <mesh position={[0, 1.76, 0]}><boxGeometry args={[1.05, 0.11, 0.13]} /><Frame /></mesh>
        <mesh position={[0, 1.56, 0.05]}><cylinderGeometry args={[0.016, 0.016, 0.42, 10]} /><Metal /></mesh>
        <mesh position={[0, 1.35, 0.05]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 0.42, 10]} /><Metal /></mesh>
      </group>;
      if (item === "chair") return <group key={key} position={[0, 0, -0.35]}>
        <RoundedBox args={[0.46, 0.1, 0.42]} radius={0.035} position={[0, 0.49, 0]}><Frame /></RoundedBox>
        <RoundedBox args={[0.46, 0.75, 0.09]} radius={0.03} position={[0, 0.91, -0.17]}><Frame /></RoundedBox>
        {[-0.17, 0.17].map((x) => <mesh key={x} position={[x, 0.23, 0]}><cylinderGeometry args={[0.025, 0.025, 0.48, 10]} /><Frame /></mesh>)}
      </group>;
      if (item === "wall") return <mesh key={key} position={[0, 1, -0.62]}><boxGeometry args={[1.7, 2.2, 0.08]} /><meshStandardMaterial color="#202A47" roughness={0.9} /></mesh>;
      if (item === "pullup") return <group key={key} position={[0, 1.92, -0.38]}>
        <mesh position={[-0.45, -0.65, 0]}><boxGeometry args={[0.07, 1.35, 0.07]} /><Frame /></mesh>
        <mesh position={[0.45, -0.65, 0]}><boxGeometry args={[0.07, 1.35, 0.07]} /><Frame /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 1.05, 12]} /><Metal /></mesh>
      </group>;
      if (item === "legpress") return <group key={key} position={[0, 0.28, -0.35]} rotation={[0, 0, -0.42]}>
        <RoundedBox args={[0.52, 0.16, 0.78]} radius={0.04} position={[0, 0.23, 0]}><Frame /></RoundedBox>
        <mesh position={[0, 0.67, -0.28]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.035, 0.92, 12]} /><Metal /></mesh>
        <mesh position={[0, 0.67, -0.28]}><boxGeometry args={[0.56, 0.1, 0.1]} /><Frame /></mesh>
      </group>;
      if (item === "band") return <mesh key={key} position={[0, 0.12, 0.4]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.35, 0.012, 8, 48]} /><meshStandardMaterial color="#00F5D4" emissive="#00F5D4" emissiveIntensity={0.25} /></mesh>;
      return null;
    })}
  </group>;
}
