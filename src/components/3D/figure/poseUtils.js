import { NEUTRAL_POSE, SEGMENTS } from "./skeleton";

export const easeInOut = (t) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

export function lerpPose(a = {}, b = {}, t = 0) {
  const from = { ...NEUTRAL_POSE, ...a };
  const to = { ...NEUTRAL_POSE, ...b };
  const pose = {};
  for (const key of Object.keys(NEUTRAL_POSE)) {
    pose[key] = from[key] + (to[key] - from[key]) * t;
  }
  return pose;
}

export function samplePose(keyframes, tNorm) {
  if (!keyframes?.length) return { pose: { ...NEUTRAL_POSE }, root: { y: 0.96 }, label: "Ready" };
  const t = ((tNorm % 1) + 1) % 1;
  let rightIndex = keyframes.findIndex((frame) => frame.t >= t);
  if (rightIndex < 0) rightIndex = 0;
  const leftIndex = (rightIndex - 1 + keyframes.length) % keyframes.length;
  const left = keyframes[leftIndex];
  const right = keyframes[rightIndex];
  const leftT = left.t;
  const rightT = right.t + (rightIndex === 0 ? 1 : 0);
  const adjustedT = t < leftT ? t + 1 : t;
  const span = Math.max(0.0001, rightT - leftT);
  let amount = Math.max(0, Math.min(1, (adjustedT - leftT) / span));
  if (right.ease === "inOut" || left.ease === "inOut" || !right.ease) amount = easeInOut(amount);
  const pose = lerpPose(left.pose, right.pose, amount);
  const activation = {};
  const activationIds = new Set([...Object.keys(left.activation || {}), ...Object.keys(right.activation || {})]);
  for (const id of activationIds) {
    const from = left.activation?.[id] ?? 0;
    const to = right.activation?.[id] ?? from;
    activation[id] = from + (to - from) * amount;
  }
  const root = {};
  for (const key of ["x", "y", "z", "pitch", "roll", "yaw"]) {
    const from = left.root?.[key] ?? (key === "y" ? 0.96 : 0);
    const to = right.root?.[key] ?? from;
    root[key] = from + (to - from) * amount;
  }
  const fromEffort = left.effort ?? 0.45;
  const toEffort = right.effort ?? fromEffort;
  return { pose, root, activation, effort: fromEffort + (toEffort - fromEffort) * amount, label: amount < 0.5 ? (left.label || "Move with control") : (right.label || left.label || "Move with control") };
}

// Analytic sagittal-plane two-bone solution. It returns plausible flexion angles,
// clamps the leg away from a locked, over-extended configuration, and preserves a fixed foot target.
export function solveLegIK(hipWorldY, hipWorldZ, footTargetZ, thighLen = SEGMENTS.thigh, shinLen = SEGMENTS.shin) {
  const footY = 0.08;
  const dy = footY - hipWorldY;
  const dz = footTargetZ - hipWorldZ;
  const rawDistance = Math.hypot(dy, dz);
  const distance = Math.max(Math.abs(thighLen - shinLen) + 0.015, Math.min(thighLen + shinLen - 0.025, rawDistance));
  const kneeInterior = Math.acos(Math.max(-1, Math.min(1, (thighLen ** 2 + shinLen ** 2 - distance ** 2) / (2 * thighLen * shinLen))));
  const hipOffset = Math.acos(Math.max(-1, Math.min(1, (thighLen ** 2 + distance ** 2 - shinLen ** 2) / (2 * thighLen * distance))));
  const lineAngle = Math.atan2(dz, -dy);
  return {
    hipFlex: Math.max(-35, Math.min(125, (lineAngle + hipOffset) * 180 / Math.PI)),
    kneeFlex: Math.max(0, Math.min(145, 180 - kneeInterior * 180 / Math.PI))
  };
}

// Conservative lift used by ground-oriented poses; root.y is kept explicit in animation data.
export function groundOffset(pose = {}, root = {}, hasBench = false) {
  if (hasBench) return root.y ?? 0.54;
  if (Math.abs(pose.rootPitch || 0) >= 75) return 0.15;
  return root.y ?? 0.96;
}
