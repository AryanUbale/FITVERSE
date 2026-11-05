import { normalizeBoneName } from "./rigMap";

// Regions are assigned exclusively per bind-pose triangle. Bounds are metres after model fitting.
const colors = {
  chest: "#E4572E", shoulders: "#F4A259", arms: "#E0B341", back: "#3FA7D6",
  core: "#59C3A5", glutes: "#C05299", quads: "#7B6CF6", hamstrings: "#5A8DEE",
  hip: "#9AA5FF", calves: "#4CC9F0"
};
const torso = new Set(["hips", "spine", "spine1", "spine2", "neck", "head", "leftshoulder", "rightshoulder"]);
const descriptor = (id, name, group, palette, bone, side, yMin, yMax, xMin, xMax, face = "any", priority = 1) => ({ id: `${id}-${side}`, baseId: id, name, group, palette, bone, side, yMin, yMax, xMin, xMax, face, priority, deep: false });
const both = (id, name, group, palette, bone, yMin, yMax, xMin, xMax, face = "any", priority = 1) => ["L", "R"].map((side) => descriptor(id, name, group, palette, bone, side, yMin, yMax, xMin, xMax, face, priority));

export const MUSCLE_REGIONS = [
  ...both("pec-upper", "Pectoralis major — clavicular", "Chest", "chest", "torso", 0.68, 0.80, 0.015, 0.195, "front", 1.5),
  ...both("pec-lower", "Pectoralis major — sternocostal", "Chest", "chest", "torso", 0.62, 0.71, 0.015, 0.195, "front", 1.45),
  ...both("delt-ant", "Deltoid — anterior", "Shoulders", "shoulders", "arm", 0.76, 0.90, 0, 0.82, "front", 1.5),
  ...both("delt-lat", "Deltoid — lateral", "Shoulders", "shoulders", "arm", 0.76, 0.90, 0, 0.82, "side", 1.48),
  ...both("delt-post", "Deltoid — posterior", "Shoulders", "shoulders", "arm", 0.76, 0.90, 0, 0.82, "back", 1.5),
  ...both("biceps", "Biceps brachii", "Biceps", "arms", "upperarm", 0.57, 0.84, 0, 0.82, "front", 1.25),
  ...both("triceps", "Triceps brachii", "Biceps", "arms", "upperarm", 0.56, 0.84, 0, 0.82, "back", 1.25),
  ...both("forearms", "Forearm flexors and extensors", "Biceps", "arms", "forearm", 0.42, 0.68, 0, 0.9, "any", 1.2),
  ...both("trap-upper", "Trapezius — upper fibers", "Back", "back", "torso", 0.79, 0.92, 0.005, 0.18, "back", 1.3),
  ...both("trap-mid", "Trapezius — middle fibers", "Back", "back", "torso", 0.68, 0.81, 0.005, 0.17, "back", 1.25),
  ...both("lats", "Latissimus dorsi", "Back", "back", "torso", 0.56, 0.77, 0.055, 0.21, "back", 1.3),
  ...both("rhomboids", "Rhomboids — deep mid-back", "Back", "back", "torso", 0.68, 0.79, 0.005, 0.09, "back", 1.1),
  ...both("erectors", "Erector spinae", "Back", "back", "torso", 0.48, 0.69, 0.005, 0.075, "back", 1.2),
  ...both("abs-upper", "Rectus abdominis — upper", "Core", "core", "torso", 0.59, 0.69, 0.005, 0.075, "front", 1.4),
  ...both("abs-lower", "Rectus abdominis — lower", "Core", "core", "torso", 0.50, 0.60, 0.005, 0.075, "front", 1.4),
  ...both("obliques", "External oblique", "Core", "core", "torso", 0.50, 0.68, 0.07, 0.175, "frontside", 1.2),
  ...both("serratus", "Serratus anterior", "Core", "core", "torso", 0.63, 0.74, 0.12, 0.20, "frontside", 1.15),
  ...both("glute-max", "Gluteus maximus", "Glutes", "glutes", "hips", 0.44, 0.57, 0.005, 0.18, "back", 1.5),
  ...both("glute-med", "Gluteus medius", "Glutes", "glutes", "hips", 0.51, 0.62, 0.10, 0.205, "sideback", 1.4),
  ...both("hip-flexors", "Iliopsoas — deep hip flexors", "Core", "hip", "hips", 0.48, 0.58, 0.015, 0.10, "front", 1.3),
  ...both("quads", "Quadriceps — rectus femoris and vasti", "Quadriceps", "quads", "upleg", 0.28, 0.51, 0.005, 0.16, "front", 1.35),
  ...both("hamstrings", "Hamstrings", "Hamstrings", "hamstrings", "upleg", 0.28, 0.51, 0.005, 0.16, "back", 1.35),
  ...both("adductors", "Adductor group", "Quadriceps", "hip", "upleg", 0.29, 0.50, 0.015, 0.16, "inner", 1.2),
  ...both("calves", "Gastrocnemius and soleus", "Calves", "calves", "leg", 0.08, 0.29, 0.005, 0.13, "back", 1.35),
  ...both("tibialis", "Tibialis anterior", "Calves", "calves", "leg", 0.08, 0.29, 0.005, 0.12, "front", 1.3)
].map((item) => ({ ...item, color: colors[item.palette], isBilateral: true }));

export const REGION_INDEX = Object.freeze(Object.fromEntries(MUSCLE_REGIONS.map((item, index) => [item.id, index])));

export function dominantBoneName(mesh, vertexIndices) {
  const indices = mesh.geometry.getAttribute("skinIndex");
  const weights = mesh.geometry.getAttribute("skinWeight");
  if (!indices || !weights) return "";
  const totals = new Map();
  for (const vertex of vertexIndices) {
    for (let lane = 0; lane < 4; lane += 1) {
      const boneIndex = indices.getComponent(vertex, lane);
      totals.set(boneIndex, (totals.get(boneIndex) || 0) + weights.getComponent(vertex, lane) / 3);
    }
  }
  let bestIndex = -1;
  let bestWeight = -1;
  for (const [boneIndex, weight] of totals) if (weight > bestWeight) { bestIndex = boneIndex; bestWeight = weight; }
  return bestIndex >= 0 ? normalizeBoneName(mesh.skeleton.bones[bestIndex]?.name || "") : "";
}

export function classifyMuscleTriangle({ boneName, yFraction, absX, normal, side }) {
  const isArm = /arm|shoulder|forearm|hand/.test(boneName);
  const isForearm = /forearm/.test(boneName);
  const isThigh = /upleg|thigh/.test(boneName);
  const isShin = /leg|calf/.test(boneName) && !isThigh;
  const isHip = /hips|upleg|thigh/.test(boneName);
  const isTorso = torso.has(boneName) || (!isArm && !isThigh && !isShin && !isHip);
  const boneSide = /left|larm|lupleg|lleg|lforearm|lshoulder/.test(boneName) ? -1 : /right|rarm|rupleg|rleg|rforearm|rshoulder/.test(boneName) ? 1 : side;
  const sideMatch = (region) => region.side === "L" ? boneSide < 0 : boneSide > 0;
  const facing = (region) => {
    if (region.face === "front") return normal.z > 0.08;
    if (region.face === "back") return normal.z < -0.08;
    if (region.face === "frontside") return normal.z > -0.1;
    if (region.face === "side") return Math.abs(normal.x) > Math.abs(normal.z) * 0.45;
    if (region.face === "sideback") return normal.z < 0.22;
    if (region.face === "inner") return normal.x * side < 0.3;
    return true;
  };
  const candidates = MUSCLE_REGIONS.filter((region) => {
    const boneMatch = region.bone === "arm" ? isArm && !isForearm
      : region.bone === "upperarm" ? isArm && !isForearm
      : region.bone === "forearm" ? isForearm
      : region.bone === "hips" ? isHip && !isThigh
      : region.bone === "upleg" ? isThigh
      : region.bone === "leg" ? isShin
      : region.bone === "torso" ? isTorso : false;
    return boneMatch && sideMatch(region) && yFraction >= region.yMin && yFraction <= region.yMax && absX >= region.xMin && absX <= region.xMax && facing(region);
  });
  if (!candidates.length) return null;
  candidates.sort((a, b) => b.priority - a.priority);
  return candidates[0];
}

export function regionMaterialColor(region) { return colors[region.palette] || "#B5413F"; }
