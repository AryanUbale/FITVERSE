// Coordinate and joint sign conventions (angles are degrees in animation data):
// +X is the figure's left, +Y is up, and the figure faces +Z.
// Hip flex + swings the thigh forward/up; knee flex + bends the shin backward.
// Ankle flex + draws toes toward the shin. Shoulder flex + swings the arm forward/up;
// shoulder abduction + moves it out sideways/up; elbow flex + folds forearm toward shoulder.
// Spine flex + curls the trunk forward (chin toward pelvis); negative extends the back.
// Lumbar and thoracic flexion are split for visible spinal articulation. Neck flex +
// brings chin to chest. Root pitch -90° is supine (face up); +90° is prone (face down).

export const SEGMENTS = Object.freeze({
  torso: 0.52,
  shoulderHalfWidth: 0.20,
  hipHalfWidth: 0.10,
  neck: 0.09,
  head: 0.23,
  upperArm: 0.30,
  forearm: 0.26,
  hand: 0.09,
  thigh: 0.42,
  shin: 0.42,
  ankleHeight: 0.08,
  footLength: 0.24
});

export const NEUTRAL_POSE = Object.freeze({
  hipL: 0, hipR: 0, kneeL: 0, kneeR: 0, ankleL: 0, ankleR: 0,
  shoulderFlexL: 0, shoulderFlexR: 0, shoulderAbdL: 0, shoulderAbdR: 0,
  elbowL: 0, elbowR: 0, wristL: 0, wristR: 0,
  lumbarFlex: 0, thoracicFlex: 0, spineTwist: 0, neckFlex: 0,
  rootPitch: 0
});
