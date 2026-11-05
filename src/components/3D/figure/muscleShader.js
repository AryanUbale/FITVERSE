import * as THREE from "three";
import { MUSCLE_REGIONS } from "./regions";

// Plain-mesh hit testing only. No material shader patches are installed.
export function nearestMuscleRegion(point, normal = null) {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const region of MUSCLE_REGIONS) {
    const sideSign = region.side === "L" ? -1 : 1;
    const centerX = sideSign * (region.xMin + region.xMax) * 0.5;
    const centerY = (region.yMin + region.yMax) * 0.5 * 1.75;
    const dx = (point.x - centerX) / Math.max(0.06, region.xMax - region.xMin);
    const dy = (point.y - centerY) / Math.max(0.08, (region.yMax - region.yMin) * 1.75);
    let distance = dx * dx + dy * dy;
    if (normal && region.face === "front" && normal.z < 0) distance += 1.5;
    if (normal && region.face === "back" && normal.z > 0) distance += 1.5;
    if (distance < nearestDistance) { nearestDistance = distance; nearest = region; }
  }
  return nearest;
}

export function setShellVisual(shell, { mode = "muscles", primary = false, secondary = false, effort = 0, time = 0, selected = false } = {}) {
  const material = shell.material;
  const chartMode = mode === "chart";
  const focusMode = mode === "focus" || Boolean(selected);
  const active = primary || secondary || selected;
  const rhythm = 0.5 + 0.5 * Math.sin(time * 5 + (shell.userData.pulseOffset || 0));
  if (primary) {
    material.color.set("#00F5D4");
    material.emissive.set("#00F5D4");
    material.opacity = 0.55 + 0.4 * rhythm;
    material.emissiveIntensity = 0.6 + 1.4 * rhythm * Math.max(0.35, effort);
    if (shell.morphTargetInfluences?.length) shell.morphTargetInfluences[0] = Math.min(1, effort * (0.25 + 0.75 * rhythm));
  } else if (secondary) {
    material.color.set("#8055FF");
    material.emissive.set("#8055FF");
    material.opacity = 0.4 + 0.3 * rhythm;
    material.emissiveIntensity = 0.3 + 0.6 * rhythm;
    if (shell.morphTargetInfluences?.length) shell.morphTargetInfluences[0] = 0.18 * rhythm;
  } else {
    material.color.set(shell.userData.region.color);
    material.emissive.set(shell.userData.region.color);
    material.emissiveIntensity = chartMode ? 0.16 : 0.08;
    material.opacity = chartMode ? 0.55 : mode === "body" || focusMode ? 0 : 0.34;
    if (shell.morphTargetInfluences?.length) shell.morphTargetInfluences[0] = 0;
  }
  if (focusMode && !active) material.opacity = 0;
  material.visible = material.opacity > 0.015;
  material.needsUpdate = false;
}

export function regionForId(id) { return MUSCLE_REGIONS.find((region) => region.id === id) || null; }
export const radians = THREE.MathUtils.degToRad;
