import { MUSCLE_REGIONS } from "./regions";

// Explicit primary and secondary muscle-string coverage for the exercise catalogue.
const RULES = [
  [/pectoralis|chest/i, ["pec-upper", "pec-lower"]],
  [/anterior deltoid/i, ["delt-ant"]], [/lateral deltoid|medial deltoid|middle deltoid/i, ["delt-lat"]],
  [/posterior deltoid|rear delt/i, ["delt-post"]], [/deltoid|shoulder/i, ["delt-ant", "delt-lat", "delt-post"]],
  [/trapezius|upper traps|middle traps|\btraps\b/i, ["trap-upper", "trap-mid"]],
  [/latissimus|teres major|\bback\b/i, ["lats"]], [/rhomboid/i, ["rhomboids"]],
  [/erector|spinal|thoracic extensor/i, ["erectors"]],
  [/rectus abdominis|deep abdominal|\bcore\b/i, ["abs-upper", "abs-lower"]],
  [/transverse/i, ["abs-upper", "abs-lower"]], [/oblique/i, ["obliques"]],
  [/serratus|intercostal|scapular stabil/i, ["serratus"]],
  [/biceps|brachialis|triceps|forearm|anconeus/i, ["biceps", "triceps", "forearms"]],
  [/quadricep|vastus|rectus femoris/i, ["quads"]], [/hamstring|biceps femoris|semitendinosus|semimembranosus/i, ["hamstrings"]],
  [/glute/i, ["glute-max", "glute-med"]], [/tensor fasciae latae|abductor|gluteus minimus/i, ["glute-med"]],
  [/hip flexor|psoas|iliopsoas/i, ["hip-flexors"]], [/adductor/i, ["quads"]],
  [/calf|calves|gastrocnemius|soleus/i, ["calves"]], [/tibialis/i, ["tibialis"]],
  [/full body|cardiovascular|stabilizer/i, ["pec-lower", "quads", "abs-upper"]]
];

const DEEP_RULES = [/transverse|psoas|iliopsoas|rhomboid|adductor|scapular stabil/i];

export function mapMuscles(targets = []) {
  const ids = new Set();
  for (const target of targets) {
    for (const [pattern, regionIds] of RULES) {
      if (pattern.test(target)) {
        regionIds.forEach((id) => MUSCLE_REGIONS.filter((region) => region.baseId === id).forEach((region) => ids.add(region.id)));
      }
    }
  }
  return [...ids];
}

export function mapExerciseMuscles(exercise = {}) {
  const primary = mapMuscles(exercise.targetMuscles || []);
  const secondary = mapMuscles(exercise.secondaryMuscles || []).filter((id) => !primary.includes(id));
  const deep = [...(exercise.targetMuscles || []), ...(exercise.secondaryMuscles || [])].some((target) => DEEP_RULES.some((rule) => rule.test(target)));
  return { primary, secondary, deep };
}

export function unmatchedMuscleTargets(targets = []) {
  return targets.filter((target) => !RULES.some(([pattern]) => pattern.test(target)) && !MUSCLE_REGIONS.some((region) => target.toLowerCase().includes(region.name.toLowerCase())));
}
