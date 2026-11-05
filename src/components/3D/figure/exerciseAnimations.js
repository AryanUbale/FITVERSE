const standingCamera = { position: [2.8, 1.65, 3.7], target: [0, 0.9, 0] };
const groundCamera = { position: [4.15, 1.25, 1.55], target: [0, 0.22, 0] };
const supineCamera = { position: [4.15, 1.25, 1.55], target: [0, 0.18, 0] };
const proneCamera = { position: [4.15, 1.25, 1.55], target: [0, 0.18, 0] };
const standRoot = { y: 1.02 };
const floorRoot = { y: 0.14 };
const f = (t, pose, label, root = standRoot, ease = "inOut") => ({ t, pose, label, root, ease });
const cycle = (start, end, labelDown = "Lower with control", labelUp = "Return with control", rootStart = standRoot, rootEnd = rootStart) => [
  f(0, start, labelDown, rootStart), f(0.5, end, labelUp, rootEnd), f(1, start, labelDown, rootStart)
];
const pilates = (id, durationSec, keyframes, highlight, camera = supineCamera) => ({
  id, props: ["mat"], camera, durationSec, keyframes, highlight, phaseFromBreath: true
});
const gym = (id, durationSec, keyframes, props, highlight, plantedFeet = false, camera = standingCamera) => ({ id, props, camera, durationSec, keyframes, highlight, plantedFeet });
const home = (id, durationSec, keyframes, props, highlight, plantedFeet = false, camera = standingCamera) => ({ id, props, camera, durationSec, keyframes, highlight, plantedFeet });

export const exerciseAnimations = {
  "pilates-hundred": pilates("pilates-hundred", 5, [
    f(0, { rootPitch: -90, hipL: 45, hipR: 45, kneeL: 0, kneeR: 0, shoulderFlexL: 0, shoulderFlexR: 0, neckFlex: 18, thoracicFlex: 18 }, "Inhale ×5 – pump", floorRoot),
    f(0.05, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: 12, shoulderFlexR: 12 }, "Inhale ×5 – pump", floorRoot),
    f(0.1, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: -12, shoulderFlexR: -12 }, "Inhale ×5 – pump", floorRoot),
    f(0.15, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: 12, shoulderFlexR: 12 }, "Inhale ×5 – pump", floorRoot),
    f(0.2, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: -12, shoulderFlexR: -12 }, "Inhale ×5 – pump", floorRoot),
    f(0.25, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: 12, shoulderFlexR: 12 }, "Exhale ×5 – pump", floorRoot),
    f(0.3, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: -12, shoulderFlexR: -12 }, "Exhale ×5 – pump", floorRoot),
    f(0.35, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: 12, shoulderFlexR: 12 }, "Exhale ×5 – pump", floorRoot),
    f(0.4, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: -12, shoulderFlexR: -12 }, "Exhale ×5 – pump", floorRoot),
    f(0.45, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: 12, shoulderFlexR: 12 }, "Exhale ×5 – pump", floorRoot),
    f(0.5, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18, shoulderFlexL: -12, shoulderFlexR: -12 }, "Exhale ×5 – pump", floorRoot),
    f(1, { rootPitch: -90, hipL: 45, hipR: 45, neckFlex: 18, thoracicFlex: 18 }, "Inhale ×5 – pump", floorRoot)
  ], ["core"]),
  "pilates-roll-up": pilates("pilates-roll-up", 8, [
    f(0, { rootPitch: -90, shoulderFlexL: 180, shoulderFlexR: 180 }, "Inhale – arms float to ceiling", floorRoot),
    f(0.16, { rootPitch: -90, shoulderFlexL: 90, shoulderFlexR: 90, neckFlex: 24, thoracicFlex: 28 }, "Exhale – chin to chest", floorRoot),
    f(0.38, { rootPitch: -90, shoulderFlexL: 65, shoulderFlexR: 65, neckFlex: 32, thoracicFlex: 58, lumbarFlex: 35 }, "Exhale – peel up segment by segment", { y: 0.2 }),
    f(0.5, { rootPitch: -90, shoulderFlexL: 90, shoulderFlexR: 90, neckFlex: 28, thoracicFlex: 55, lumbarFlex: 38 }, "Inhale – reach over toes in a C-curve", { y: 0.22 }),
    f(0.74, { rootPitch: -90, shoulderFlexL: 135, shoulderFlexR: 135, neckFlex: 18, thoracicFlex: 26, lumbarFlex: 16 }, "Exhale – roll down tailbone to shoulders", { y: 0.18 }),
    f(1, { rootPitch: -90, shoulderFlexL: 180, shoulderFlexR: 180 }, "Inhale – arms float to ceiling", floorRoot)
  ], ["core", "back"]),
  "pilates-single-leg-stretch": pilates("pilates-single-leg-stretch", 4, [
    f(0, { rootPitch: -90, hipL: 120, kneeL: 120, hipR: 45, kneeR: 0, elbowL: 75, elbowR: 75, shoulderFlexL: 15, shoulderFlexR: 15, neckFlex: 20, thoracicFlex: 20 }, "Exhale – draw right knee in", floorRoot),
    f(0.25, { rootPitch: -90, hipL: 45, kneeL: 0, hipR: 120, kneeR: 120, elbowL: 75, elbowR: 75, shoulderFlexL: 15, shoulderFlexR: 15, neckFlex: 20, thoracicFlex: 20 }, "Inhale – switch legs", floorRoot),
    f(0.5, { rootPitch: -90, hipL: 120, kneeL: 120, hipR: 45, kneeR: 0, elbowL: 75, elbowR: 75, shoulderFlexL: 15, shoulderFlexR: 15, neckFlex: 20, thoracicFlex: 20 }, "Exhale – draw left knee in", floorRoot),
    f(0.75, { rootPitch: -90, hipL: 45, kneeL: 0, hipR: 120, kneeR: 120, elbowL: 75, elbowR: 75, shoulderFlexL: 15, shoulderFlexR: 15, neckFlex: 20, thoracicFlex: 20 }, "Inhale – switch legs", floorRoot),
    f(1, { rootPitch: -90, hipL: 120, kneeL: 120, hipR: 45, kneeR: 0, elbowL: 75, elbowR: 75, shoulderFlexL: 15, shoulderFlexR: 15, neckFlex: 20, thoracicFlex: 20 }, "Exhale – draw right knee in", floorRoot)
  ], ["core", "hipflexors"]),
  "pilates-double-leg-stretch": pilates("pilates-double-leg-stretch", 4, [
    f(0, { rootPitch: -90, hipL: 100, hipR: 100, kneeL: 100, kneeR: 100, elbowL: 90, elbowR: 90, neckFlex: 20, thoracicFlex: 20 }, "Exhale – hug knees into a ball", floorRoot),
    f(0.5, { rootPitch: -90, hipL: 45, hipR: 45, kneeL: 0, kneeR: 0, shoulderFlexL: 180, shoulderFlexR: 180, elbowL: 0, elbowR: 0, neckFlex: 20, thoracicFlex: 20 }, "Inhale – reach arms overhead and legs long", floorRoot),
    f(0.75, { rootPitch: -90, hipL: 80, hipR: 80, kneeL: 75, kneeR: 75, shoulderFlexL: 60, shoulderFlexR: 60, elbowL: 35, elbowR: 35, neckFlex: 20, thoracicFlex: 20 }, "Exhale – circle arms and hug in", floorRoot),
    f(1, { rootPitch: -90, hipL: 100, hipR: 100, kneeL: 100, kneeR: 100, elbowL: 90, elbowR: 90, neckFlex: 20, thoracicFlex: 20 }, "Exhale – hug knees into a ball", floorRoot)
  ], ["core", "shoulders"]),
  "pilates-criss-cross": pilates("pilates-criss-cross", 4, [
    f(0, { rootPitch: -90, hipL: 45, hipR: 100, kneeL: 0, kneeR: 100, elbowL: 80, elbowR: 80, neckFlex: 22, thoracicFlex: 25, spineTwist: 22 }, "Inhale – rotate ribcage right", floorRoot),
    f(0.25, { rootPitch: -90, hipL: 65, hipR: 65, kneeL: 0, kneeR: 0, elbowL: 80, elbowR: 80, neckFlex: 22, thoracicFlex: 22 }, "Pass through center", floorRoot),
    f(0.5, { rootPitch: -90, hipL: 100, hipR: 45, kneeL: 100, kneeR: 0, elbowL: 80, elbowR: 80, neckFlex: 22, thoracicFlex: 25, spineTwist: -22 }, "Exhale – opposite armpit toward knee", floorRoot),
    f(0.75, { rootPitch: -90, hipL: 65, hipR: 65, kneeL: 0, kneeR: 0, elbowL: 80, elbowR: 80, neckFlex: 22, thoracicFlex: 22 }, "Pass through center", floorRoot),
    f(1, { rootPitch: -90, hipL: 45, hipR: 100, kneeL: 0, kneeR: 100, elbowL: 80, elbowR: 80, neckFlex: 22, thoracicFlex: 25, spineTwist: 22 }, "Inhale – rotate ribcage right", floorRoot)
  ], ["core"]),
  "pilates-shoulder-bridge": pilates("pilates-shoulder-bridge", 8, [
    f(0, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 85, elbowL: 85, elbowR: 85 }, "Exhale – roll pelvis up one vertebra at a time", floorRoot),
    f(0.2, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 85, elbowL: 85, elbowR: 85, lumbarFlex: -18, thoracicFlex: -10 }, "Hold bridge – support hips with hands", { y: 0.2 }),
    f(0.32, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 85, elbowL: 85, elbowR: 85, hipR: 90, kneeR: 0, ankleR: 0, lumbarFlex: -18, thoracicFlex: -10 }, "Inhale – extend leg to ceiling", { y: 0.2 }),
    f(0.42, { rootPitch: -90, hipL: 90, hipR: 55, kneeL: 85, kneeR: 0, ankleR: 12, lumbarFlex: -18, thoracicFlex: -10 }, "Exhale – flex foot and kick to thigh height", { y: 0.2 }),
    f(0.5, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 0, ankleR: -8, lumbarFlex: -18, thoracicFlex: -10 }, "Inhale – point and kick up", { y: 0.2 }),
    f(0.58, { rootPitch: -90, hipR: 90, hipL: 90, kneeR: 85, kneeL: 0, ankleL: 12, lumbarFlex: -18, thoracicFlex: -10 }, "Exhale – alternate leg kick", { y: 0.2 }),
    f(0.7, { rootPitch: -90, hipR: 55, hipL: 90, kneeR: 0, kneeL: 85, ankleR: 12, lumbarFlex: -18, thoracicFlex: -10 }, "Inhale – point and kick up", { y: 0.2 }),
    f(0.82, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 85, lumbarFlex: 0, thoracicFlex: 0 }, "Exhale – roll down one vertebra at a time", floorRoot),
    f(1, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 85, kneeR: 85 }, "Exhale – roll pelvis up one vertebra at a time", floorRoot)
  ], ["glutes", "hamstrings", "core"]),
  "pilates-swan-prep": pilates("pilates-swan-prep", 5, [
    f(0, { rootPitch: 90, shoulderFlexL: 180, shoulderFlexR: 180, elbowL: 25, elbowR: 25, lumbarFlex: 0, thoracicFlex: 0, neckFlex: 0 }, "Inhale – lengthen crown forward and up", { y: 0.14 }),
    f(0.5, { rootPitch: 90, shoulderFlexL: 145, shoulderFlexR: 145, elbowL: 25, elbowR: 25, lumbarFlex: -4, thoracicFlex: -28, neckFlex: -5 }, "Lift through upper chest; lower ribs stay down", { y: 0.17 }),
    f(1, { rootPitch: 90, shoulderFlexL: 180, shoulderFlexR: 180, elbowL: 25, elbowR: 25, lumbarFlex: 0, thoracicFlex: 0, neckFlex: 0 }, "Exhale – lower smoothly", { y: 0.14 })
  ], ["back"] , proneCamera),
  "pilates-swimming": pilates("pilates-swimming", 3, [
    f(0, { rootPitch: 90, shoulderFlexL: 180, shoulderFlexR: 180, hipL: 12, hipR: 12, thoracicFlex: -8, lumbarFlex: -4, neckFlex: 0 }, "Inhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.1, { rootPitch: 90, shoulderFlexL: 168, shoulderFlexR: 192, hipL: 22, hipR: 4, thoracicFlex: -8, lumbarFlex: -4 }, "Inhale ×5 – right arm + left leg", { y: 0.17 }),
    f(0.2, { rootPitch: 90, shoulderFlexL: 192, shoulderFlexR: 168, hipL: 4, hipR: 22, thoracicFlex: -8, lumbarFlex: -4 }, "Inhale ×5 – left arm + right leg", { y: 0.17 }),
    f(0.3, { rootPitch: 90, shoulderFlexL: 168, shoulderFlexR: 192, hipL: 22, hipR: 4, thoracicFlex: -8, lumbarFlex: -4 }, "Inhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.4, { rootPitch: 90, shoulderFlexL: 192, shoulderFlexR: 168, hipL: 4, hipR: 22, thoracicFlex: -8, lumbarFlex: -4 }, "Inhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.5, { rootPitch: 90, shoulderFlexL: 168, shoulderFlexR: 192, hipL: 22, hipR: 4, thoracicFlex: -8, lumbarFlex: -4 }, "Exhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.6, { rootPitch: 90, shoulderFlexL: 192, shoulderFlexR: 168, hipL: 4, hipR: 22, thoracicFlex: -8, lumbarFlex: -4 }, "Exhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.7, { rootPitch: 90, shoulderFlexL: 168, shoulderFlexR: 192, hipL: 22, hipR: 4, thoracicFlex: -8, lumbarFlex: -4 }, "Exhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(0.8, { rootPitch: 90, shoulderFlexL: 192, shoulderFlexR: 168, hipL: 4, hipR: 22, thoracicFlex: -8, lumbarFlex: -4 }, "Exhale ×5 – opposite arm and leg flutter", { y: 0.17 }),
    f(1, { rootPitch: 90, shoulderFlexL: 180, shoulderFlexR: 180, hipL: 12, hipR: 12, thoracicFlex: -8, lumbarFlex: -4 }, "Inhale ×5 – opposite arm and leg flutter", { y: 0.17 })
  ], ["back", "glutes", "hamstrings"], proneCamera),
  "pilates-side-leg-lift": pilates("pilates-side-leg-lift", 6, [
    f(0, { rootPitch: 0, hipL: 30, hipR: 30, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30 }, "Lift – hips stacked, toes pointed", { y: 0.35, roll: 90 }),
    f(0.25, { rootPitch: 0, hipL: 30, hipR: 65, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30, ankleR: -10 }, "Raise top leg to hip height", { y: 0.35, roll: 90 }),
    f(0.43, { rootPitch: 0, hipL: 30, hipR: 30, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30, ankleR: 12 }, "Lower with a flexed foot", { y: 0.35, roll: 90 }),
    f(0.58, { rootPitch: 0, hipL: 30, hipR: 48, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30, spineTwist: 5 }, "Small circles forward ×10", { y: 0.35, roll: 90 }),
    f(0.75, { rootPitch: 0, hipL: 30, hipR: 48, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30, spineTwist: -5 }, "Small circles reverse ×10", { y: 0.35, roll: 90 }),
    f(1, { rootPitch: 0, hipL: 30, hipR: 30, shoulderFlexL: 170, elbowL: 90, shoulderFlexR: 30 }, "Lift – hips stacked, toes pointed", { y: 0.35, roll: 90 })
  ], ["abductors", "glutes"], supineCamera),
  "pilates-teaser": pilates("pilates-teaser", 8, [
    f(0, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 180, shoulderFlexR: 180 }, "Inhale – arms rise, legs steady at 45°", floorRoot),
    f(0.22, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 90, shoulderFlexR: 90, neckFlex: 22, thoracicFlex: 35, lumbarFlex: 22 }, "Inhale – chin curls, spine rolls up", { y: 0.19 }),
    f(0.42, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 45, shoulderFlexR: 45, neckFlex: 8, thoracicFlex: 18, lumbarFlex: 8 }, "Balance in V – arms parallel to legs", { y: 0.22 }),
    f(0.58, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 45, shoulderFlexR: 45, neckFlex: 8, thoracicFlex: 18, lumbarFlex: 8 }, "Hold – balance on sit-bones", { y: 0.22 }),
    f(0.82, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 130, shoulderFlexR: 130, neckFlex: 18, thoracicFlex: 35, lumbarFlex: 22 }, "Exhale – roll back down with control", { y: 0.17 }),
    f(1, { rootPitch: -90, hipL: 45, hipR: 45, shoulderFlexL: 180, shoulderFlexR: 180 }, "Inhale – arms rise, legs steady at 45°", floorRoot)
  ], ["core", "hipflexors"]),

  "gym-bench-press": gym("gym-bench-press", 4, cycle({ rootPitch: -90, shoulderFlexL: 80, shoulderFlexR: 80, shoulderAbdL: 65, shoulderAbdR: 65, elbowL: 85, elbowR: 85, hipL: 45, hipR: 45, kneeL: 90, kneeR: 90 }, { rootPitch: -90, shoulderFlexL: 80, shoulderFlexR: 80, shoulderAbdL: 65, shoulderAbdR: 65, elbowL: 12, elbowR: 12, hipL: 45, hipR: 45, kneeL: 90, kneeR: 90 }, "Lower bar to mid-chest", "Press bar over chest", { y: 0.54, z: 0.12 }, { y: 0.54, z: 0.12 }), ["bench", "barbell"], ["chest", "shoulders", "arms"], false, groundCamera),
  "gym-barbell-squat": gym("gym-barbell-squat", 4, cycle({ hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, thoracicFlex: 5, shoulderFlexL: 15, shoulderFlexR: 15 }, { hipL: 65, hipR: 65, kneeL: 95, kneeR: 95, thoracicFlex: 18, shoulderFlexL: 15, shoulderFlexR: 15 }, "Descend below parallel", "Drive through planted feet", standRoot, { y: 0.66 }), ["barbell"], ["quads", "glutes", "hamstrings"], true),
  "gym-lat-pulldown": gym("gym-lat-pulldown", 4, cycle({ shoulderFlexL: 165, shoulderFlexR: 165, elbowL: 5, elbowR: 5, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90 }, { shoulderFlexL: 55, shoulderFlexR: 55, elbowL: 95, elbowR: 95, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90, thoracicFlex: -8 }, "Reach overhead", "Pull bar to upper chest", { y: 0.56 }, { y: 0.56 }), ["cable"], ["back", "arms"], false, groundCamera),
  "gym-leg-press": gym("gym-leg-press", 4, cycle({ rootPitch: -55, hipL: 85, hipR: 85, kneeL: 95, kneeR: 95 }, { rootPitch: -55, hipL: 35, hipR: 35, kneeL: 25, kneeR: 25 }, "Lower sled to comfortable depth", "Press sled without locking knees", { y: 0.35 }, { y: 0.35 }), ["legpress"], ["quads", "glutes"], true, groundCamera),
  "gym-dumbbell-shoulder-press": gym("gym-dumbbell-shoulder-press", 4, cycle({ shoulderFlexL: 15, shoulderFlexR: 15, shoulderAbdL: 75, shoulderAbdR: 75, elbowL: 90, elbowR: 90, hipL: 85, hipR: 85, kneeL: 90, kneeR: 90 }, { shoulderFlexL: 15, shoulderFlexR: 15, shoulderAbdL: 80, shoulderAbdR: 80, elbowL: 12, elbowR: 12, hipL: 85, hipR: 85, kneeL: 90, kneeR: 90 }, "Lower dumbbells to ear level", "Press overhead", { y: 0.49 }, { y: 0.49 }), ["bench", "dumbbells"], ["shoulders", "arms"], false, groundCamera),
  "gym-barbell-deadlift": gym("gym-barbell-deadlift", 5, cycle({ hipL: 55, hipR: 55, kneeL: 50, kneeR: 50, thoracicFlex: 8, shoulderFlexL: 80, shoulderFlexR: 80 }, { hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, shoulderFlexL: 80, shoulderFlexR: 80 }, "Hinge to bar over mid-foot", "Extend hips and knees together", { y: 0.68 }, standRoot), ["barbell"], ["back", "glutes", "hamstrings"], true, groundCamera),
  "gym-dumbbell-bicep-curl": gym("gym-dumbbell-bicep-curl", 4, cycle({ shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 10, elbowR: 10, hipL: 85, hipR: 85, kneeL: 90, kneeR: 90 }, { shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 110, elbowR: 110, hipL: 85, hipR: 85, kneeL: 90, kneeR: 90, wristL: 15, wristR: 15 }, "Lower arms with control", "Curl dumbbells upward", { y: 0.49 }, { y: 0.49 }), ["bench", "dumbbells"], ["arms"], false, groundCamera),
  "gym-cable-tricep-pushdown": gym("gym-cable-tricep-pushdown", 4, cycle({ shoulderFlexL: 15, shoulderFlexR: 15, elbowL: 90, elbowR: 90 }, { shoulderFlexL: 15, shoulderFlexR: 15, elbowL: 8, elbowR: 8 }, "Bend elbows under control", "Extend rope to lockout", standRoot, standRoot), ["cable"], ["arms", "back"]),
  "gym-cable-seated-row": gym("gym-cable-seated-row", 4, cycle({ hipL: 90, hipR: 90, kneeL: 25, kneeR: 25, shoulderFlexL: 80, shoulderFlexR: 80, elbowL: 10, elbowR: 10, thoracicFlex: 8 }, { hipL: 90, hipR: 90, kneeL: 25, kneeR: 25, shoulderFlexL: 35, shoulderFlexR: 35, elbowL: 85, elbowR: 85, thoracicFlex: -4 }, "Reach forward with a long back", "Pull handle to lower abdomen", { y: 0.55 }, { y: 0.55 }), ["cable"], ["back", "arms"], false, groundCamera),
  "gym-dumbbell-lateral-raise": gym("gym-dumbbell-lateral-raise", 4, cycle({ shoulderAbdL: 4, shoulderAbdR: 4, elbowL: 12, elbowR: 12 }, { shoulderAbdL: 78, shoulderAbdR: 78, elbowL: 12, elbowR: 12 }, "Lower slowly", "Raise in the scapular plane", standRoot, standRoot), ["dumbbells"], ["shoulders"]),
  "gym-romanian-deadlift": gym("gym-romanian-deadlift", 5, cycle({ hipL: 0, hipR: 0, kneeL: 15, kneeR: 15, shoulderFlexL: 75, shoulderFlexR: 75, thoracicFlex: 0 }, { hipL: 65, hipR: 65, kneeL: 15, kneeR: 15, shoulderFlexL: 75, shoulderFlexR: 75, thoracicFlex: 5 }, "Hinge hips back; bar slides to mid-shin", "Drive hips forward to stand", standRoot, { y: 0.76 }), ["barbell"], ["hamstrings", "glutes", "back"], true),
  "gym-hanging-leg-raise": gym("gym-hanging-leg-raise", 4, cycle({ shoulderFlexL: 180, shoulderFlexR: 180, elbowL: 5, elbowR: 5, hipL: 0, hipR: 0 }, { shoulderFlexL: 180, shoulderFlexR: 180, elbowL: 5, elbowR: 5, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90, lumbarFlex: 18 }, "Hang with shoulders engaged", "Curl pelvis and raise knees", { y: 1.7 }, { y: 1.7 }), ["pullup"], ["core", "arms"], false, groundCamera),

  "home-push-ups": home("home-push-ups", 4, cycle({ rootPitch: 90, shoulderFlexL: 80, shoulderFlexR: 80, shoulderAbdL: 55, shoulderAbdR: 55, elbowL: 85, elbowR: 85, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0 }, { rootPitch: 90, shoulderFlexL: 80, shoulderFlexR: 80, shoulderAbdL: 55, shoulderAbdR: 55, elbowL: 15, elbowR: 15, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0 }, "Lower chest close to floor", "Press up in rigid plank", { y: 0.28 }, { y: 0.35 }), ["mat"], ["chest", "arms", "core"], false, groundCamera),
  "home-bodyweight-squat": home("home-bodyweight-squat", 4, cycle({ shoulderFlexL: 75, shoulderFlexR: 75 }, { hipL: 65, hipR: 65, kneeL: 95, kneeR: 95, shoulderFlexL: 80, shoulderFlexR: 80 }, "Sit hips down to parallel", "Stand through whole foot", standRoot, { y: 0.66 }), [], ["quads", "glutes"], true),
  "home-plank": home("home-plank", 6, [f(0, { rootPitch: 90, shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 90, elbowR: 90, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0 }, "Forearm plank – breathe steadily", { y: 0.37 }), f(0.5, { rootPitch: 90, shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 90, elbowR: 90, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, lumbarFlex: 1 }, "Hold a straight line", { y: 0.37 }), f(1, { rootPitch: 90, shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 90, elbowR: 90, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0 }, "Forearm plank – breathe steadily", { y: 0.37 })], ["mat"], ["core", "shoulders"]),
  "home-walking-lunges": home("home-walking-lunges", 4, [f(0, { hipL: 12, hipR: 0, kneeL: 75, kneeR: 5, shoulderFlexL: 20, shoulderFlexR: 20 }, "Lower into forward lunge", { y: 0.72 }), f(0.5, { hipL: 0, hipR: 12, kneeL: 5, kneeR: 75, shoulderFlexL: 20, shoulderFlexR: 20 }, "Step rear foot through", { y: 0.72 }), f(1, { hipL: 12, hipR: 0, kneeL: 75, kneeR: 5, shoulderFlexL: 20, shoulderFlexR: 20 }, "Lower into forward lunge", { y: 0.72 })], [], ["quads", "glutes"], true),
  "home-glute-bridge": home("home-glute-bridge", 4, cycle({ rootPitch: -90, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90 }, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90, lumbarFlex: -12 }, "Lower hips with control", "Drive hips up and hold", floorRoot, { y: 0.28 }), ["mat"], ["glutes", "hamstrings", "core"], false, supineCamera),
  "home-mountain-climbers": home("home-mountain-climbers", 3, [f(0, { rootPitch: 90, hipL: 80, hipR: 0, kneeL: 90, kneeR: 0, shoulderFlexL: 0, shoulderFlexR: 0 }, "Drive right knee toward chest", { y: 0.38 }), f(0.5, { rootPitch: 90, hipL: 0, hipR: 80, kneeL: 0, kneeR: 90, shoulderFlexL: 0, shoulderFlexR: 0 }, "Switch legs quickly; hips level", { y: 0.38 }), f(1, { rootPitch: 90, hipL: 80, hipR: 0, kneeL: 90, kneeR: 0, shoulderFlexL: 0, shoulderFlexR: 0 }, "Drive right knee toward chest", { y: 0.38 })], ["mat"], ["core", "hipflexors", "shoulders"]),
  "home-resistance-band-row": home("home-resistance-band-row", 4, cycle({ rootPitch: -90, hipL: 90, hipR: 90, kneeL: 8, kneeR: 8, shoulderFlexL: 65, shoulderFlexR: 65, elbowL: 5, elbowR: 5 }, { rootPitch: -90, hipL: 90, hipR: 90, kneeL: 8, kneeR: 8, shoulderFlexL: 35, shoulderFlexR: 35, elbowL: 85, elbowR: 85, thoracicFlex: -4 }, "Extend arms against band", "Row elbows back beside ribs", floorRoot, floorRoot), ["band"], ["back", "arms"], false, supineCamera),
  "home-chair-tricep-dips": home("home-chair-tricep-dips", 4, cycle({ shoulderFlexL: 40, shoulderFlexR: 40, elbowL: 15, elbowR: 15, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90 }, { shoulderFlexL: 40, shoulderFlexR: 40, elbowL: 90, elbowR: 90, hipL: 90, hipR: 90, kneeL: 90, kneeR: 90 }, "Bend elbows back to 90°", "Press through hands", { y: 0.56 }, { y: 0.56 }), ["chair"], ["arms", "shoulders"]),
  "home-wall-sit": home("home-wall-sit", 8, [f(0, { hipL: 55, hipR: 55, kneeL: 90, kneeR: 90, shoulderFlexL: 0, shoulderFlexR: 0 }, "Wall sit – hold with steady breaths", { y: 0.58 }), f(0.5, { hipL: 55, hipR: 55, kneeL: 90, kneeR: 90, shoulderFlexL: 0, shoulderFlexR: 0, lumbarFlex: 1 }, "Back stays against wall; knees over ankles", { y: 0.58 }), f(1, { hipL: 55, hipR: 55, kneeL: 90, kneeR: 90, shoulderFlexL: 0, shoulderFlexR: 0 }, "Wall sit – hold with steady breaths", { y: 0.58 })], ["wall"], ["quads", "glutes"], true),
  "home-burpees": home("home-burpees", 6, [f(0, { shoulderFlexL: 180, shoulderFlexR: 180 }, "Stand tall – prepare to squat", standRoot), f(0.16, { hipL: 75, hipR: 75, kneeL: 100, kneeR: 100, shoulderFlexL: 75, shoulderFlexR: 75 }, "Squat and place hands down", { y: 0.66 }), f(0.32, { rootPitch: 90, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 10, elbowR: 10 }, "Jump feet back to plank", { y: 0.38 }), f(0.48, { rootPitch: 90, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, shoulderFlexL: 0, shoulderFlexR: 0, elbowL: 90, elbowR: 90 }, "Lower chest to floor", { y: 0.35 }), f(0.64, { hipL: 75, hipR: 75, kneeL: 100, kneeR: 100, shoulderFlexL: 75, shoulderFlexR: 75 }, "Jump feet forward to squat", { y: 0.66 }), f(0.82, { shoulderFlexL: 180, shoulderFlexR: 180, hipL: 0, hipR: 0, kneeL: 0, kneeR: 0 }, "Jump up with arms overhead", standRoot), f(1, { shoulderFlexL: 180, shoulderFlexR: 180 }, "Stand tall – prepare to squat", standRoot)], ["mat"], ["chest", "quads", "shoulders", "core"]),
  "home-water-bottle-lateral-raise": home("home-water-bottle-lateral-raise", 4, cycle({ shoulderAbdL: 4, shoulderAbdR: 4, elbowL: 12, elbowR: 12 }, { shoulderAbdL: 78, shoulderAbdR: 78, elbowL: 12, elbowR: 12 }, "Lower bottles slowly", "Raise to shoulder height", standRoot, standRoot), ["bottles"], ["shoulders"])
};

const activationRegions = {
  chest: ["pec-upper", "pec-lower"], shoulders: ["delt-ant", "delt-lat", "delt-post"],
  arms: ["biceps", "triceps", "forearms"], core: ["abs-upper", "abs-lower", "obliques"],
  glutes: ["glute-max", "glute-med"], quads: ["quads"], hamstrings: ["hamstrings"],
  back: ["lats", "trap-upper", "trap-mid", "erectors"], calves: ["calves", "tibialis"],
  hipflexors: ["hip-flexors"], abductors: ["glute-med"], adductors: ["quads"]
};
Object.values(exerciseAnimations).forEach((animation) => {
  const regionIds = [...new Set((animation.highlight || []).flatMap((group) => activationRegions[group] || []))];
  animation.keyframes = (animation.keyframes || []).map((frame) => {
    const text = (frame.label || "").toLowerCase();
    const effort = /hold|press|drive|pull|extend|kick|raise|lift|curl|stand/.test(text) ? 0.9 : /lower|descend|hinge|reach|roll down/.test(text) ? 0.52 : 0.68;
    return { ...frame, effort, activation: Object.fromEntries(regionIds.map((id) => [id, effort])) };
  });
});

export function mapTargetMuscles(targetMuscles = []) {
  const text = targetMuscles.join(" ").toLowerCase();
  const matches = [
    ["chest", /pectoralis|chest/], ["back", /latissimus|\bback\b|erector|spinal|rhomboid|trapezius|traps/],
    ["shoulders", /deltoid|shoulder/], ["arms", /biceps|triceps|forearm|brachialis/],
    ["core", /rectus|abdominis|transverse|oblique|\bcore\b/], ["glutes", /glute/],
    ["quads", /quadricep|\bquad/], ["hamstrings", /hamstring/], ["calves", /calf|calves/],
    ["hipflexors", /hip flexor|psoas|iliopsoas/], ["adductors", /adductor/],
    ["abductors", /abductor|gluteus medius|tensor/]
  ];
  return matches.filter(([, pattern]) => pattern.test(text)).map(([key]) => key);
}
