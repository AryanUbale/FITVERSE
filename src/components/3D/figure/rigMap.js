const aliases = {
  hips: ["hips", "pelvis"], spine: ["spine"], spine1: ["spine1"], spine2: ["spine2", "chest"],
  neck: ["neck"], head: ["head"],
  shoulderL: ["leftshoulder", "lshoulder"], shoulderR: ["rightshoulder", "rshoulder"],
  armL: ["leftarm", "larm", "leftupperarm"], armR: ["rightarm", "rarm", "rightupperarm"],
  foreArmL: ["leftforearm", "lforearm"], foreArmR: ["rightforearm", "rforearm"],
  handL: ["lefthand", "lhand"], handR: ["righthand", "rhand"],
  upLegL: ["leftupleg", "lupleg", "leftthigh"], upLegR: ["rightupleg", "rupleg", "rightthigh"],
  legL: ["leftleg", "lleg", "leftcalf"], legR: ["rightleg", "rleg", "rightcalf"],
  footL: ["leftfoot", "lfoot"], footR: ["rightfoot", "rfoot"],
  toeL: ["lefttoebase", "ltoebase"], toeR: ["righttoebase", "rtoebase"]
};

export const normalizeBoneName = (name = "") => name
  .replace(/^mixamorig\d*[:_]?/i, "")
  .replace(/[^a-z0-9]/gi, "")
  .toLowerCase();

export function mapHumanoidBones(root, { warn = import.meta.env?.DEV } = {}) {
  const names = new Map();
  root.traverse((node) => {
    if (!node.isBone) return;
    const normalized = normalizeBoneName(node.name);
    names.set(normalized, node);
  });
  const mapped = {};
  for (const [joint, candidates] of Object.entries(aliases)) {
    mapped[joint] = candidates.map((candidate) => names.get(candidate)).find(Boolean) || null;
    if (!mapped[joint] && warn) console.warn(`[FormFit rig] Missing expected bone for ${joint}: ${candidates.join(", ")}`);
  }
  return mapped;
}

export const POSE_BONE_KEYS = Object.freeze({
  spine: ["spine", "spine1", "spine2"],
  neck: ["neck", "head"],
  shoulders: { L: "shoulderL", R: "shoulderR" },
  arms: { L: "armL", R: "armR" },
  forearms: { L: "foreArmL", R: "foreArmR" },
  hands: { L: "handL", R: "handR" },
  thighs: { L: "upLegL", R: "upLegR" },
  shins: { L: "legL", R: "legR" },
  feet: { L: "footL", R: "footR" }
});
