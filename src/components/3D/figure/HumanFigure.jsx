import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { NEUTRAL_POSE } from "./skeleton";
import { mapHumanoidBones } from "./rigMap";
import { createMuscleShells } from "./bakeRegions";
import { nearestMuscleRegion, setShellVisual } from "./muscleShader";
import { MUSCLE_REGIONS } from "./regions";
import { mapExerciseMuscles } from "./muscleMap";

const RAD = Math.PI / 180;
const PELVIS_HEIGHT = 0.9;
const DEFAULT_ROOT_Y = 0.9;

function stripExternalTextures(buffer) {
  const view = new DataView(buffer);
  let chunkOffset = 12;
  const jsonChunk = [];
  let binaryChunk = null;
  while (chunkOffset + 8 <= buffer.byteLength) {
    const length = view.getUint32(chunkOffset, true);
    const type = view.getUint32(chunkOffset + 4, true);
    const bytes = new Uint8Array(buffer, chunkOffset + 8, length);
    if (type === 0x4E4F534A) jsonChunk.push(new TextDecoder().decode(bytes).trim());
    else if (type === 0x004E4942) binaryChunk = bytes;
    chunkOffset += 8 + length;
  }
  if (!jsonChunk.length) return buffer;
  const gltfJson = JSON.parse(jsonChunk.join(""));
  for (const material of gltfJson.materials || []) {
    delete material.normalTexture;
    delete material.occlusionTexture;
    delete material.emissiveTexture;
    delete material.pbrMetallicRoughness?.baseColorTexture;
    delete material.pbrMetallicRoughness?.metallicRoughnessTexture;
  }
  delete gltfJson.images;
  delete gltfJson.textures;
  delete gltfJson.samplers;
  const encoder = new TextEncoder();
  const jsonRaw = encoder.encode(JSON.stringify(gltfJson));
  const jsonLength = Math.ceil(jsonRaw.length / 4) * 4;
  const binLength = binaryChunk?.length || 0;
  const output = new ArrayBuffer(12 + 8 + jsonLength + (binaryChunk ? 8 + binLength : 0));
  const outView = new DataView(output);
  const outBytes = new Uint8Array(output);
  outView.setUint32(0, 0x46546C67, true);
  outView.setUint32(4, 2, true);
  outView.setUint32(8, output.byteLength, true);
  outView.setUint32(12, jsonLength, true);
  outView.setUint32(16, 0x4E4F534A, true);
  outBytes.fill(0x20, 20, 20 + jsonLength);
  outBytes.set(jsonRaw, 20);
  if (binaryChunk) {
    const binHeader = 20 + jsonLength;
    outView.setUint32(binHeader, binLength, true);
    outView.setUint32(binHeader + 4, 0x004E4942, true);
    outBytes.set(binaryChunk, binHeader + 8);
  }
  return output;
}

function deltaQuaternion(components = {}) {
  const q = new THREE.Quaternion();
  const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (components.x || 0) * RAD);
  const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (components.y || 0) * RAD);
  const qz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), (components.z || 0) * RAD);
  return q.multiply(qz).multiply(qy).multiply(qx);
}

function addPose(...parts) {
  return parts.reduce((result, part) => result.multiply(part), new THREE.Quaternion());
}

function fitScene(sourceScene, { raw = false } = {}) {
  const scene = cloneSkeleton(sourceScene);
  scene.updateMatrixWorld(true);
  const sourceBounds = new THREE.Box3().setFromObject(scene);
  const sourceSize = sourceBounds.getSize(new THREE.Vector3());
  const heightScale = raw ? 0.01 : 1.75 / Math.max(sourceSize.y, 0.001);
  const fit = new THREE.Group();
  fit.scale.setScalar(heightScale);
  fit.position.set(
    -sourceBounds.getCenter(new THREE.Vector3()).x * heightScale,
    -sourceBounds.min.y * heightScale,
    -sourceBounds.getCenter(new THREE.Vector3()).z * heightScale
  );
  fit.add(scene);
  fit.updateMatrixWorld(true);
  const pivot = new THREE.Group();
  pivot.add(fit);
  pivot.updateMatrixWorld(true);
  const fittedBounds = new THREE.Box3().setFromObject(pivot);
  const bones = mapHumanoidBones(scene, { warn: false });
  const bindWorld = new Map();
  Object.values(bones).filter(Boolean).forEach((bone) => {
    const quaternion = new THREE.Quaternion();
    bone.getWorldQuaternion(quaternion);
    bindWorld.set(bone, quaternion.clone());
  });
  const skinMaterial = new THREE.MeshStandardMaterial({ color: "#D9C7B8", roughness: 0.55, metalness: 0.01, side: THREE.DoubleSide });
  const skinnedMeshes = [];
  scene.traverse((node) => {
    if (!node.isSkinnedMesh) return;
    node.frustumCulled = false;
    node.castShadow = true;
    node.receiveShadow = true;
    node.skeleton.update();
    if (!raw) node.material = skinMaterial;
    skinnedMeshes.push(node);
  });
  const shells = raw || new URLSearchParams(window.location.search).get("bringup") === "material"
    ? []
    : skinnedMeshes.flatMap((mesh) => createMuscleShells(mesh, 1.75));
  shells.forEach((shell, index) => { shell.userData.pulseOffset = index * 0.37; });
  if (import.meta.env.DEV) {
    const required = ["hips", "spine", "spine1", "spine2", "neck", "head", "armL", "armR", "foreArmL", "foreArmR", "upLegL", "upLegR", "legL", "legR", "footL", "footR"];
    const absent = required.filter((name) => !bones[name]);
    if (absent.length) console.error(`[FormFit rig] Missing expected Ch36 bones: ${absent.join(", ")}`);
    console.info("[FormFit model fit]", { sourceHeight: sourceSize.y, fittedHeight: fittedBounds.max.y - fittedBounds.min.y, triangles: skinnedMeshes.reduce((sum, mesh) => sum + (mesh.geometry.index?.count || mesh.geometry.getAttribute("position").count) / 3, 0), shellCount: shells.length, shellIds: shells.map((shell) => shell.name) });
    window.__muscleShellAudit = shells.map((shell) => ({ id: shell.name, group: shell.userData.group, triangles: shell.geometry.index?.count / 3 || 0 }));
  }
  return { pivot, scene, bones, bindWorld, skinnedMeshes, shells, skinMaterial, fittedBounds, sourceSize, raw, stage: raw ? 0 : 4 };
}

function applyWorldPose(bone, bindWorld, modelPoseDelta, rootWorld) {
  if (!bone || !bindWorld) return;
  const parentWorld = new THREE.Quaternion();
  if (bone.parent) {
    bone.parent.updateWorldMatrix(true, false);
    bone.parent.getWorldQuaternion(parentWorld);
  }
  const desiredWorld = rootWorld.clone().multiply(modelPoseDelta).multiply(bindWorld);
  bone.quaternion.copy(parentWorld.invert().multiply(desiredWorld));
  bone.updateWorldMatrix(false, false);
}

function applyPose(asset, rootGroup, pose) {
  rootGroup.updateWorldMatrix(true, false);
  const rootWorld = rootGroup.getWorldQuaternion(new THREE.Quaternion());
  const bind = asset.bindWorld;
  const bones = asset.bones;
  const set = (key, delta) => applyWorldPose(bones[key], bind.get(bones[key]), delta, rootWorld);
  const lumbar = deltaQuaternion({ x: pose.lumbarFlex || 0 });
  const thoracic1 = deltaQuaternion({ x: (pose.thoracicFlex || 0) * 0.42, y: (pose.spineTwist || 0) * 0.35 });
  const thoracic2 = deltaQuaternion({ x: (pose.thoracicFlex || 0) * 0.58, y: (pose.spineTwist || 0) * 0.65 });
  const dSpine = lumbar;
  const dSpine1 = addPose(lumbar, thoracic1);
  const dSpine2 = addPose(lumbar, thoracic1, thoracic2);
  set("spine", dSpine);
  set("spine1", dSpine1);
  set("spine2", dSpine2);
  const dNeck = addPose(dSpine2, deltaQuaternion({ x: pose.neckFlex || 0 }));
  set("neck", dNeck);
  set("head", addPose(dNeck, deltaQuaternion({ x: (pose.neckFlex || 0) * 0.25 })));

  for (const side of ["L", "R"]) {
    const isLeft = side === "L";
    const sideSign = isLeft ? -1 : 1;
    const shoulderFlex = pose[`shoulderFlex${side}`] || 0;
    const abduction = pose[`shoulderAbd${side}`] || 0;
    const elbowFlex = pose[`elbow${side}`] || 0;
    const wristFlex = pose[`wrist${side}`] || 0;

    // 1. Arm abduction brings the arm from T-pose (90) down to the side (0)
    const qAbd = deltaQuaternion({ z: sideSign * (90 - abduction) });
    // 2. Shoulder flexion rotates both arms forward in the sagittal plane
    const qFlex = deltaQuaternion({ x: -shoulderFlex });
    const shoulder = addPose(qFlex, qAbd);

    // 3. Elbow flexion bends the forearm forward in the anatomical hinge plane
    const elbow = deltaQuaternion({ y: (isLeft ? -1 : 1) * elbowFlex });
    const wrist = deltaQuaternion({ x: -wristFlex });

    set(`shoulder${side}`, dSpine2);
    const dUpperArm = addPose(dSpine2, shoulder);
    set(`arm${side}`, dUpperArm);
    set(`foreArm${side}`, addPose(dUpperArm, elbow));
    set(`hand${side}`, addPose(dUpperArm, elbow, wrist));

    const hip = deltaQuaternion({ x: -(pose[`hip${side}`] || 0) });
    const knee = deltaQuaternion({ x: pose[`knee${side}`] || 0 });
    const ankle = deltaQuaternion({ x: -(pose[`ankle${side}`] || 0) });
    set(`upLeg${side}`, hip);
    set(`leg${side}`, addPose(hip, knee));
    set(`foot${side}`, addPose(hip, knee, ankle));
    set(`toe${side}`, addPose(hip, knee, ankle));
  }
  asset.scene.updateMatrixWorld(true);
  asset.skinnedMeshes.forEach((mesh) => mesh.skeleton.update());
}

function validateBoneMatrices(asset) {
  const checked = [];
  asset.scene.traverse((node) => { if (node.isBone) checked.push(node); });
  return checked.every((bone) => [...bone.matrixWorld.elements, bone.quaternion.x, bone.quaternion.y, bone.quaternion.z, bone.quaternion.w].every(Number.isFinite));
}

function HumanAsset({ poseRef, figureApiRef, viewMode, activeMuscles, secondaryMuscles, activeGroup, onSelectMuscle, onRegionHover, selectedRegion, idle, effort, bringup, labels = false }) {
  const [asset, setAsset] = useState(null);
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    const loader = new GLTFLoader(new THREE.LoadingManager());
    fetch("/models/human.glb")
      .then((response) => {
        if (!response.ok) throw new Error(`Local model request failed with status ${response.status}.`);
        return response.arrayBuffer().then(stripExternalTextures);
      })
      .then((buffer) => new Promise((resolve, reject) => loader.parse(buffer, `${window.location.origin}/models/`, resolve, reject)))
      .then((gltf) => { if (active) setAsset(fitScene(gltf.scene, { raw: bringup === "raw" })); })
      .catch((error) => {
        if (active) {
          setLoadError(error?.message || "Unable to parse the local human model.");
          console.error("[FormFit model] Failed to load local human.glb", error);
        }
      });
    return () => { active = false; };
  }, [bringup]);
  const configRef = useRef({ viewMode, activeMuscles, secondaryMuscles, activeGroup, effort });
  configRef.current = { viewMode, activeMuscles, secondaryMuscles, activeGroup, effort };
  const rootGroupRef = useRef();
  const elapsedRef = useRef(0);
  const hoverRef = useRef(null);
  const selectedIds = useMemo(() => activeGroup ? MUSCLE_REGIONS.filter((region) => region.group === activeGroup).map((region) => region.id) : [], [activeGroup]);

  React.useImperativeHandle(figureApiRef, () => ({
    setActivation: (map) => { configRef.current.activation = map; },
    setEffort: (value) => { configRef.current.effort = value; },
    setViewMode: (mode) => { configRef.current.viewMode = mode; },
    setHighlightedRegions: ({ primary = [], secondary = [] } = {}) => { configRef.current.activeMuscles = primary; configRef.current.secondaryMuscles = secondary; },
    inspectPose: (pose = {}, root = {}) => {
      if (!asset || !rootGroupRef.current) return null;
      rootGroupRef.current.position.set(root.x || 0, root.y ?? DEFAULT_ROOT_Y, root.z || 0);
      rootGroupRef.current.rotation.set((pose.rootPitch ?? root.pitch ?? 0) * RAD, (root.yaw || 0) * RAD, (root.roll || 0) * RAD);
      applyPose(asset, rootGroupRef.current, { ...NEUTRAL_POSE, ...pose });
      const joints = {};
      for (const [name, boneKey] of [["Hips", "hips"], ["KneeL", "legL"], ["KneeR", "legR"], ["WristL", "handL"], ["WristR", "handR"], ["Head", "head"]]) {
        const bone = asset.bones[boneKey];
        if (bone) {
          const point = bone.getWorldPosition(new THREE.Vector3());
          joints[name] = point.toArray();
        }
      }
      const finite = Object.values(joints).flat().every(Number.isFinite) && validateBoneMatrices(asset);
      return { joints, finite };
    },
    getJointWorldPosition: (key) => {
      const bone = asset?.bones?.[key];
      return bone ? bone.getWorldPosition(new THREE.Vector3()).toArray() : null;
    },
    getJointWorldTransform: (key) => {
      const bone = asset?.bones?.[key];
      if (!bone) return null;
      return {
        position: bone.getWorldPosition(new THREE.Vector3()),
        quaternion: bone.getWorldQuaternion(new THREE.Quaternion())
      };
    }
  }), [asset]);

  useFrame((state, delta) => {
    elapsedRef.current = state.clock.elapsedTime;
    if (!rootGroupRef.current || !asset) return;
    if (bringup === "raw" || bringup === "material") {
      rootGroupRef.current.position.set(0, DEFAULT_ROOT_Y, 0);
      rootGroupRef.current.rotation.set(0, 0, 0);
      return;
    }
    const source = poseRef?.current || {};
    const pose = { ...NEUTRAL_POSE, ...(source.pose || source) };
    const root = source.root || {};
    const pitch = (pose.rootPitch ?? root.pitch ?? 0) * RAD;
    const rootY = root.y ?? DEFAULT_ROOT_Y;
    rootGroupRef.current.position.set(root.x || 0, rootY, root.z || 0);
    rootGroupRef.current.rotation.set(pitch, (root.yaw || 0) * RAD, (root.roll || 0) * RAD);
    if (idle) rootGroupRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.34) * 0.022;
    applyPose(asset, rootGroupRef.current, pose);

    const current = configRef.current;
    const focusMode = Boolean(activeGroup) || current.viewMode === "focus";
    if (asset.skinMaterial.transparent !== focusMode) {
      asset.skinMaterial.transparent = focusMode;
      asset.skinMaterial.needsUpdate = true;
    }
    asset.skinMaterial.opacity = focusMode ? 0.35 : 1;
    asset.skinMaterial.color.set(focusMode ? "#9A8580" : "#D9C7B8");
    const highlighted = source.activation ? Object.keys(source.activation) : current.activeMuscles || [];
    const primaryIds = activeGroup ? selectedIds : highlighted;
    const secondaryIds = current.secondaryMuscles || [];
    const frameEffort = Math.max(0, Math.min(1, source.effort ?? current.effort ?? effort));
    asset.shells.forEach((shell) => setShellVisual(shell, {
      mode: activeGroup ? "focus" : current.viewMode,
      primary: primaryIds.includes(shell.userData.regionId),
      secondary: secondaryIds.includes(shell.userData.regionId),
      effort: frameEffort,
      time: state.clock.elapsedTime,
      selected: false
    }));
    if (import.meta.env.DEV && !validateBoneMatrices(asset)) console.error("[FormFit rig] NaN/Infinity detected in Ch36 bone world matrix.");
  });

  const handlePointer = (event, click) => {
    let node = event.object;
    while (node && !node.userData?.region) node = node.parent;
    const region = node?.userData?.region;
    if (!region) {
      if (!click && hoverRef.current) {
        hoverRef.current = null;
        onRegionHover?.(null);
      }
      return;
    }
    event.stopPropagation();
    if (region.id !== hoverRef.current) {
      hoverRef.current = region.id;
      onRegionHover?.(region);
    }
    if (click) onSelectMuscle?.(region.group, region.name, region.id);
  };
  const hover = selectedRegion ? MUSCLE_REGIONS.find((item) => item.id === selectedRegion) : null;
  const hoverPos = useMemo(() => {
    if (!hover) return null;
    const avgX = ((hover.xMin ?? 0.1) + (hover.xMax ?? 0.2)) * 0.5;
    const posX = (hover.side === "L" ? -1 : 1) * Math.max(0.14, avgX);
    const posY = (hover.yMin + hover.yMax) * 0.5 * 1.75;
    const isBack = hover.face?.includes("back") || hover.group === "Back" || hover.group === "Glutes" || hover.group === "Hamstrings";
    const posZ = isBack ? -0.16 : 0.16;
    return [posX, posY, posZ];
  }, [hover]);

  return <group ref={rootGroupRef} onPointerMove={(event) => handlePointer(event, false)} onPointerOut={() => { hoverRef.current = null; onRegionHover?.(null); }} onClick={(event) => handlePointer(event, true)}>
    {asset && <group position={[0, -PELVIS_HEIGHT, 0]}>
      <primitive object={asset.pivot} />
      {hover && hoverPos && (
        <Html position={hoverPos} center distanceFactor={4.5} style={{ pointerEvents: "none", whiteSpace: "nowrap", zIndex: 100 }}>
          <div className="flex flex-col items-center pointer-events-none select-none">
            <div className="rounded-xl border border-brand-cyan/60 bg-slate-950/95 px-3 py-1.5 text-center shadow-2xl backdrop-blur-md">
              <span className="text-xs font-bold text-white tracking-wide block">
                {hover.name.split(" — ")[0]}
              </span>
              <span className="text-[10px] font-semibold text-brand-cyan uppercase tracking-wider block">
                {hover.group}
              </span>
            </div>
            <div className="w-1.5 h-1.5 rotate-45 border-b border-r border-brand-cyan/60 bg-slate-950/95 -mt-1" />
          </div>
        </Html>
      )}
    </group>}
    {!asset && !loadError && <Html center position={[0, 0.9, 0]}><span className="rounded-lg border border-white/15 bg-slate-950/90 px-3 py-2 text-xs text-slate-200">Loading local human model…</span></Html>}
    {loadError && <Html center position={[0, 0.9, 0]}><span className="rounded border border-rose-400/40 bg-slate-950/95 px-3 py-2 text-xs text-rose-200">3D model error: {loadError}</span></Html>}
  </group>;
}

export const HumanFigure = React.forwardRef(function HumanFigure({
  poseRef,
  highlight = [],
  highlightedIds = [],
  activeGroup = null,
  secondaryMuscles: secondaryInput = [],
  onSelectMuscle,
  onRegionHover,
  selectedRegion = null,
  viewMode = "muscles",
  effort = 0,
  idle = false,
  position = [0, 0, 0],
  scale = 1,
  bringup = null,
  labels = false
}, forwardedRef) {
  const figureApiRef = useRef(null);
  const [hoverId, setHoverId] = useState(null);
  const mapping = useMemo(() => mapExerciseMuscles({ targetMuscles: highlight }), [highlight]);
  const active = highlightedIds.length ? highlightedIds : mapping.primary;
  const secondary = useMemo(() => mapExerciseMuscles({ secondaryMuscles: secondaryInput }).secondary, [secondaryInput]);
  React.useImperativeHandle(forwardedRef, () => ({
    setActivation: (map) => figureApiRef.current?.setActivation(map),
    setEffort: (value) => figureApiRef.current?.setEffort(value),
    setViewMode: (mode) => figureApiRef.current?.setViewMode(mode),
    setHighlightedRegions: (regions) => figureApiRef.current?.setHighlightedRegions(regions),
    inspectPose: (pose, root) => figureApiRef.current?.inspectPose(pose, root),
    getJointWorldPosition: (key) => figureApiRef.current?.getJointWorldPosition(key),
    getJointWorldTransform: (key) => figureApiRef.current?.getJointWorldTransform(key)
  }), []);
  const handleHover = (region) => { onRegionHover?.(region); setHoverId(region?.id || null); };
  return <group position={position} scale={scale}>
    <HumanAsset poseRef={poseRef} figureApiRef={figureApiRef} viewMode={viewMode} activeMuscles={active} secondaryMuscles={secondary} activeGroup={activeGroup} onSelectMuscle={onSelectMuscle} onRegionHover={handleHover} selectedRegion={selectedRegion || hoverId} idle={idle} effort={effort} bringup={bringup} labels={labels} />
  </group>;
});
