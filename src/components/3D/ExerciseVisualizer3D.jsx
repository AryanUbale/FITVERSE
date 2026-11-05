import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Activity, Pause, Play, RotateCcw } from "lucide-react";
import { HumanFigure } from "./figure/HumanFigure";
import { ExerciseProps } from "./figure/props";
import { exerciseAnimations } from "./figure/exerciseAnimations";
import { mapExerciseMuscles, mapMuscles } from "./figure/muscleMap";
import { MUSCLE_REGIONS } from "./figure/regions";
import { groundOffset, samplePose, solveLegIK } from "./figure/poseUtils";

function CameraUpdater({ camera, id }) {
  const { camera: threeCamera } = useThree();
  useEffect(() => {
    if (camera?.position) {
      threeCamera.position.set(...camera.position);
      if (camera.target) {
        threeCamera.lookAt(new THREE.Vector3(...camera.target));
      }
    }
  }, [id, camera, threeCamera]);
  return null;
}

function AnimationDriver({ animation, targetMuscles, secondaryMuscles, playing, speed, restartToken, poseRef, figureRef, onLabel, breathingPhase, viewMode }) {
  const elapsed = useRef(0);
  const previousRestart = useRef(restartToken);
  const lastLabel = useRef("");
  const targetHighlight = useMemo(() => mapMuscles(targetMuscles), [targetMuscles]);
  const secondaryHighlight = useMemo(() => mapMuscles(secondaryMuscles), [secondaryMuscles]);

  useFrame((_, delta) => {
    if (previousRestart.current !== restartToken) {
      previousRestart.current = restartToken;
      elapsed.current = 0;
    } else if (playing) {
      elapsed.current += delta * speed;
    }
    const duration = animation.durationSec || 4;
    const sampled = animation.keyframes
      ? samplePose(animation.keyframes, elapsed.current / duration)
      : { pose: { thoracicFlex: Math.sin(elapsed.current * 1.4) * 1.4 }, root: { y: 1.02 }, label: "Breathing" };
    const pose = { ...sampled.pose };
    if (animation.plantedFeet && Math.abs(pose.rootPitch || 0) < 35) {
      const hipWorldY = (sampled.root.y ?? 1.02) - 0.08;
      const left = solveLegIK(hipWorldY, sampled.root.z || 0, -0.02);
      const right = solveLegIK(hipWorldY, sampled.root.z || 0, 0.02);
      pose.hipL = left.hipFlex;
      pose.kneeL = left.kneeFlex;
      pose.hipR = right.hipFlex;
      pose.kneeR = right.kneeFlex;
    }
    const root = { ...sampled.root };
    const hasBench = animation.props?.includes('bench');
    if (Math.abs(pose.rootPitch || 0) >= 35) root.y = groundOffset(pose, root, hasBench);
    const activation = Object.fromEntries(targetHighlight.map((regionId) => [regionId, sampled.activation?.[regionId] ?? 1]));
    poseRef.current = { pose, root, activation, effort: sampled.effort ?? 0.5 };
    const label = breathingPhase && animation.phaseFromBreath
      ? `${breathingPhase} – ${sampled.label.split("–").slice(-1)[0].trim()}`
      : sampled.label;
    if (label !== lastLabel.current) {
      lastLabel.current = label;
      onLabel(label);
    }
  });

  return <>
    <HumanFigure ref={figureRef} poseRef={poseRef} highlightedIds={targetHighlight} secondaryMuscles={secondaryMuscles} viewMode={viewMode} />
    <ExerciseProps items={animation.props || []} figureRef={figureRef} />
  </>;
}

function SceneFloor({ isMat }) {
  return <>
    {!isMat && <group position={[0, -0.025, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.45, 64]} />
        <meshStandardMaterial color="#0D1226" roughness={0.75} metalness={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <torusGeometry args={[1.43, 0.012, 8, 96]} />
        <meshStandardMaterial color="#4F5BFF" emissive="#4F5BFF" emissiveIntensity={0.7} />
      </mesh>
    </group>}
    <ContactShadows position={[0, 0.038, 0]} opacity={0.48} scale={3.5} blur={2.5} far={2.5} resolution={512} color="#070A16" />
  </>;
}

export const ExerciseVisualizer3D = ({ exercise, breathingPhase = null }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [webglError, setWebglError] = useState(false);
  const [restartToken, setRestartToken] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState("Ready");
  const [viewMode, setViewMode] = useState(new URLSearchParams(window.location.search).get("debugRegions") === "1" ? "chart" : "muscles");
  const poseRef = useRef({ pose: {}, root: { y: 1.02 } });
  const figureRef = useRef(null);
  const id = exercise?.id || "unknown";

  // Automatically reset any WebGL error on exercise switch
  useEffect(() => {
    setWebglError(false);
  }, [id]);

  const animation = exerciseAnimations[id] || {
    id: "unknown", props: [], camera: { position: [2.8, 1.65, 3.7], target: [0, 0.9, 0] }, durationSec: 5,
    keyframes: [{ t: 0, pose: {}, root: { y: 1.02 }, label: "Breathing" }, { t: 1, pose: {}, root: { y: 1.02 }, label: "Breathing" }], highlight: []
  };

  const handleLabel = useCallback((label) => setPhaseLabel((current) => current === label ? current : label), []);
  const restart = () => {
    poseRef.current = { pose: {}, root: { y: 1.02 } };
    setRestartToken((token) => token + 1);
    setPhaseLabel("Starting position");
    setIsPlaying(true);
  };

  const camera = animation.camera || { position: [2.8, 1.65, 3.7], target: [0, 0.9, 0] };
  const isMat = animation.props?.includes("mat");
  const muscleMapping = useMemo(() => mapExerciseMuscles(exercise || {}), [exercise]);
  const primaryRegions = MUSCLE_REGIONS.filter((region) => muscleMapping.primary.includes(region.id));
  const secondaryRegions = MUSCLE_REGIONS.filter((region) => muscleMapping.secondary.includes(region.id));
  const primaryNames = [...new Set(primaryRegions.map((region) => region.name.split(" — ")[0]))];
  const secondaryNames = [...new Set(secondaryRegions.map((region) => region.name.split(" — ")[0]))];

  return (
    <div className="relative w-full h-[380px] lg:h-[450px] rounded-3xl overflow-hidden surface-card border border-white/10 flex flex-col">
      {/* Top Header Badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 max-w-[52%] flex items-center gap-2 bg-[#14132B]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
        <Activity className="w-3.5 h-3.5 text-[#4DD0E1] animate-pulse shrink-0" />
        <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide truncate">
          {exercise?.name || "3D Exercise Preview"}
        </span>
      </div>

      {/* Playback Controls */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex items-center gap-0.5 sm:gap-1 bg-[#14132B]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
        <button onClick={() => setIsPlaying((value) => !value)} className="p-1.5 rounded-full hover:bg-white/10 text-white" title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#4DD0E1]" />}
        </button>
        <button onClick={restart} className="p-1.5 rounded-full hover:bg-white/10 text-slate-300" title="Restart animation">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-px bg-white/20 mx-0.5" />
        {[0.5, 1, 1.5].map((rate) => (
          <button
            key={rate}
            onClick={() => setSpeed(rate)}
            className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full transition-all ${
              speed === rate ? "bg-[#4F5BFF] text-white shadow-glow-indigo" : "text-slate-400 hover:text-white"
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>

      {/* View Mode Switcher */}
      <div className="absolute top-[3.55rem] right-3 sm:right-4 z-10 flex gap-0.5 rounded-full border border-white/10 bg-[#14132B]/85 p-1 backdrop-blur-md">
        {[["muscles", "Muscles"], ["body", "Body"], ["focus", "Focus"]].map(([mode, label]) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`rounded-full px-2 py-0.5 text-[9px] font-bold transition-all ${
              viewMode === mode ? "bg-[#4F5BFF] text-white shadow-glow-indigo" : "text-slate-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 3D Canvas / Fallback Area */}
      {webglError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-[#14132B]/80">
          <Activity className="w-12 h-12 text-[#4F5BFF] mb-3 animate-pulse" />
          <h4 className="text-sm font-bold text-white mb-1">{exercise?.name}</h4>
          <p className="text-xs max-w-sm text-slate-400 mb-4">
            3D preview paused. Click below to initialize 3D rendering.
          </p>
          <button
            onClick={() => setWebglError(false)}
            className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white shadow-glow-indigo flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload 3D Preview</span>
          </button>
        </div>
      ) : (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            shadows
            dpr={[1, 1.25]}
            camera={{ position: camera.position, fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
              gl.shadowMap.enabled = true;
              const canvas = gl.domElement;
              canvas.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                console.warn("[ExerciseVisualizer3D] WebGL context lost. Handling recovery...");
              });
              canvas.addEventListener("webglcontextrestored", () => {
                console.info("[ExerciseVisualizer3D] WebGL context restored.");
                setWebglError(false);
              });
            }}
          >
            <hemisphereLight args={["#B79AFF", "#10152A", 0.85]} />
            <directionalLight
              castShadow
              position={[3.5, 5, 4]}
              intensity={1.6}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.1}
              shadow-camera-far={12}
              shadow-camera-left={-3}
              shadow-camera-right={3}
              shadow-camera-top={3}
              shadow-camera-bottom={-3}
            />
            <directionalLight position={[-3, 2.4, -3]} color="#4F5BFF" intensity={1.25} />
            <pointLight position={[2, 0.7, 2.5]} color="#4DD0E1" intensity={0.5} />
            <SceneFloor isMat={isMat} />
            <CameraUpdater camera={camera} id={id} />
            <AnimationDriver
              key={`driver-${id}`}
              animation={animation}
              targetMuscles={exercise?.targetMuscles || []}
              secondaryMuscles={exercise?.secondaryMuscles || []}
              playing={isPlaying}
              speed={speed}
              restartToken={restartToken}
              poseRef={poseRef}
              figureRef={figureRef}
              onLabel={handleLabel}
              breathingPhase={breathingPhase}
              viewMode={viewMode}
            />
            <OrbitControls
              key={`orbit-${id}`}
              target={camera.target}
              enablePan={false}
              minDistance={2.1}
              maxDistance={5.8}
              minPolarAngle={0.2}
              maxPolarAngle={Math.PI * 0.78}
            />
          </Canvas>
        </div>
      )}

      {/* Bottom Muscle Pill Legend */}
      <div className="absolute bottom-[3.55rem] left-3 z-10 max-w-[60%] rounded-xl border border-white/10 bg-[#14132B]/85 px-2.5 py-1.5 backdrop-blur-md">
        <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-[10px]">
          {primaryNames.length > 0 && (
            <span className="text-[#4DD0E1] flex items-center gap-1 font-semibold">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4DD0E1]" />
              Primary: {primaryNames.join(", ")}
            </span>
          )}
          {secondaryNames.length > 0 && (
            <span className="text-slate-300 flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4F5BFF]" />
              Secondary: {secondaryNames.join(", ")}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[9px] sm:text-[10px] text-slate-300">
          Working now: <strong className="text-white">{primaryNames.join(", ") || "Target muscles"}</strong> — {phaseLabel.split("–").slice(-1)[0].trim()}
        </p>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-3 inset-x-3 z-10 rounded-2xl border border-white/10 bg-[#14132B]/90 backdrop-blur-md py-2 px-3 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-xs text-slate-300">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#2ED8A3] shrink-0" />
          <span className="truncate">
            Target: <strong className="text-white">{exercise?.targetMuscles?.[0] || exercise?.muscleGroup || "Target Muscle"}</strong>
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-[#4DD0E1] font-semibold truncate max-w-[52%]">
          {phaseLabel}
        </span>
      </div>
    </div>
  );
};
