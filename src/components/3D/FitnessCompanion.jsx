import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { HumanFigure } from "./figure/HumanFigure";

function CompanionFigure({ activeMuscle, onSelectMuscle, onRegionHover }) {
  const poseRef = useMemo(() => ({ current: { pose: { shoulderAbdL: 20, shoulderAbdR: 20 }, root: { y: 1.02 } } }), []);
  return <Float speed={0.85} rotationIntensity={0.035} floatIntensity={0.025}>
    <HumanFigure poseRef={poseRef} idle activeGroup={activeMuscle} viewMode={activeMuscle ? "focus" : "chart"} onSelectMuscle={onSelectMuscle} onRegionHover={onRegionHover} position={[0, 0, 0]} />
  </Float>;
}

function PedestalAndRings() {
  const ringA = useRef();
  const ringB = useRef();
  useFrame((_, delta) => {
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12;
  });
  return <group position={[0, -0.105, 0]}>
    <mesh position={[0, 0, 0]} receiveShadow><cylinderGeometry args={[0.72, 0.79, 0.1, 56]} /><meshStandardMaterial color="#11172D" roughness={0.4} metalness={0.3} /></mesh>
    <mesh position={[0, 0.054, 0]}><torusGeometry args={[0.7, 0.013, 8, 64]} /><meshStandardMaterial color="#8055FF" emissive="#8055FF" emissiveIntensity={0.85} /></mesh>
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringA} position={[0, 0, 0]}><ringGeometry args={[0.88, 0.895, 72]} /><meshBasicMaterial color="#8055FF" transparent opacity={0.62} side={THREE.DoubleSide} /></mesh>
      <mesh ref={ringB} position={[0, 0, 0]} rotation={[0.08, 0, 0]}><ringGeometry args={[0.97, 0.982, 72]} /><meshBasicMaterial color="#438BFF" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
    </group>
  </group>;
}

function CameraQuickView({ view, controlsRef }) {
  useFrame(({ camera }) => {
    const positions = { front: [0, 1.05, 3.05], back: [0, 1.05, -3.05], side: [3.05, 1.05, 0] };
    const destination = new THREE.Vector3(...positions[view]);
    camera.position.lerp(destination, 0.06);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0.9, 0), 0.06);
      controlsRef.current.update();
    }
  });
  return null;
}

function FallbackSilhouette({ activeMuscle, onSelectMuscle }) {
  const muscles = ["Chest", "Back", "Shoulders", "Biceps", "Core", "Quadriceps", "Glutes"];
  return <div className="relative w-full h-full flex items-center justify-center p-6">
    <div className="relative h-[70%] aspect-[1/1.5] rounded-3xl border border-brand-purple/40 bg-gradient-to-b from-brand-purple/10 to-brand-blue/10 flex items-center justify-center">
      <svg viewBox="0 0 100 200" className="h-full text-brand-lavender/80 fill-current">
        <circle cx="50" cy="19" r="10" />
        <path d="M43 30 Q50 26 57 30 L64 35 73 60 68 67 62 48 59 47 60 91 55 96 53 128 59 175 52 178 47 137 44 178 37 175 43 128 40 96 36 91 37 47 32 48 27 67 21 60 31 35Z" />
        <path d="M42 35 Q50 40 58 35 L61 55 56 70 44 70 39 55Z" className="text-brand-purple/80" />
        <path d="M42 75h16v3H42zm0 7h16v3H42zm0 7h16v3H42z" className="text-brand-cyan/70" />
      </svg>
      {muscles.map((name, index) => <button key={name} onClick={() => onSelectMuscle(name)} className={`absolute px-2 py-1 text-[10px] rounded-full border ${activeMuscle === name ? "bg-brand-cyan text-slate-900" : "bg-background-secondary/90 text-white border-white/20"}`} style={{ left: `${index % 2 ? 68 : 2}%`, top: `${14 + index * 10}%` }}>{name}</button>)}
    </div>
  </div>;
}

export const FitnessCompanion = ({ activeMuscle = null, onSelectMuscle, className = "h-[450px]" }) => {
  const [webglError, setWebglError] = useState(false);
  const [view, setView] = useState("front");
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const controlsRef = useRef();
  const musclePills = ["Chest", "Back", "Shoulders", "Biceps", "Core", "Quadriceps", "Glutes"];
  const selectMuscle = (name) => onSelectMuscle?.(activeMuscle === name ? null : name);

  return <div className={`relative w-full rounded-3xl overflow-hidden glass-card border border-white/10 ${className}`}>
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background-secondary/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
      <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" /><span className="text-xs font-semibold text-slate-200 tracking-wide">3D FITNESS COMPANION</span><span className="text-[10px] uppercase text-brand-lavender bg-brand-purple/20 px-2 py-0.5 rounded-md font-bold">Interactive</span>
    </div>
    <div className="absolute top-[4.25rem] right-4 z-10 flex gap-1 rounded-full bg-background-secondary/85 p-1 border border-white/10">
      {[["front", "Front"], ["back", "Back"], ["side", "Side"]].map(([key, label]) => <button key={key} onClick={() => setView(key)} className={`rounded-full px-2 py-1 text-[10px] font-semibold ${view === key ? "bg-brand-purple text-white" : "text-slate-300 hover:text-white"}`}>{label}</button>)}
    </div>
    {hoveredRegion && <div className="absolute top-[4.25rem] left-4 z-10 rounded-xl border border-brand-cyan/40 bg-background-secondary/90 backdrop-blur-md px-3 py-1.5 text-xs text-white flex items-center gap-2 shadow-lg animate-fadeIn"><span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" /><span className="font-bold">{hoveredRegion.name.split(" — ")[0]}</span><span className="text-[10px] text-brand-lavender uppercase tracking-wider">({hoveredRegion.group})</span></div>}
    {activeMuscle && <div className="absolute top-16 left-4 z-10 bg-brand-purple/30 border border-brand-purple/50 backdrop-blur-md px-3.5 py-1 rounded-xl text-xs font-medium text-brand-lavender flex items-center gap-2"><span>Focusing:</span><span className="text-white font-bold">{activeMuscle}</span><button onClick={() => onSelectMuscle?.(null)} className="text-slate-400 hover:text-white ml-1 text-sm font-bold">×</button></div>}
    {webglError ? <FallbackSilhouette activeMuscle={activeMuscle} onSelectMuscle={selectMuscle} /> : <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1.05, 3.05], fov: 38 }} shadows dpr={[1, 1.25]} gl={{ powerPreference: "high-performance", antialias: true }} onCreated={({ gl }) => { gl.shadowMap.enabled = true; }}>
        <hemisphereLight args={["#B79AFF", "#10152A", 0.82]} />
        <directionalLight position={[3.5, 5, 4]} intensity={1.6} castShadow shadow-mapSize-width={512} shadow-mapSize-height={512} />
        <directionalLight position={[-3, 2.5, -3]} color="#8055FF" intensity={1.15} />
        <pointLight position={[2, 1, 3]} color="#00F5D4" intensity={0.4} />
        <pointLight position={[0, 1.7, -2.5]} color="#B79AFF" intensity={0.75} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow><circleGeometry args={[1.3, 64]} /><meshStandardMaterial color="#0D1226" roughness={0.8} /></mesh>
        <PedestalAndRings />
        <CompanionFigure activeMuscle={activeMuscle} onSelectMuscle={(group) => selectMuscle(group)} onRegionHover={setHoveredRegion} />
        <CameraQuickView view={view} controlsRef={controlsRef} />
        <OrbitControls ref={controlsRef} target={[0, 0.9, 0]} enablePan={false} minDistance={2.2} maxDistance={5.5} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2 + 0.12} autoRotate={!activeMuscle && view === "front"} autoRotateSpeed={0.4} />
      </Canvas>
    </div>}
    <div className="absolute bottom-3 inset-x-0 z-10 px-4 flex items-center justify-center gap-1.5 flex-wrap">
      <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">Highlight Muscle:</span>
      {musclePills.map((name) => <button key={name} onClick={() => selectMuscle(name)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${activeMuscle === name ? "bg-brand-cyan text-slate-900 font-bold shadow-glow-cyan" : "bg-background-secondary/90 border border-white/10 text-slate-300 hover:text-white hover:border-brand-purple/60"}`}>{name === "Biceps" ? "Arms" : name === "Quadriceps" ? "Legs" : name}</button>)}
    </div>
  </div>;
};
