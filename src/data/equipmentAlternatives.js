export const equipmentAlternatives = [
  {
    gymEquipment: "Dumbbells (5 - 25 kg)",
    homeAlternative: "Water Bottles & Backpack Loaded with Books",
    substituteIcon: "Dumbbell",
    description: "Fill 1L or 2L plastic bottles with water (1kg or 2kg each) or wet sand (approx 1.6kg or 3.2kg). For heavier loads, pack hardback textbooks or soup cans into a backpack with padded straps.",
    replacesExercises: [
      { gym: "Dumbbell Bicep Curls", home: "Water Bottle Curls / Towel Curls" },
      { gym: "Dumbbell Shoulder Press", home: "Overhead Water Bottle / Jug Press" },
      { gym: "Goblet Squats", home: "Backpack Hug Squats" }
    ],
    biomechanicsAndDifferences: "Bottles provide good grip for light arm work, but grip diameter may feel slicker than knurled iron. Backpacks shift center of mass slightly forward or backward compared to balanced hand weights.",
    limitations: "Harder to make incremental 1kg micro-adjustments; max capacity is bounded by bag volume and seam strength (usually max ~15-20kg safely).",
    safetyWarning: "Ensure bottles are tightly closed to prevent spills. Check backpack zipper and strap seams before loading above 10kg."
  },
  {
    gymEquipment: "Cable Pulley Machine",
    homeAlternative: "Tubular or Loop Elastic Resistance Bands",
    substituteIcon: "Activity",
    description: "Multi-tension elastic latex bands attached around a door anchor, bed post, or looped underneath your feet.",
    replacesExercises: [
      { gym: "Cable Lat Pulldown", home: "Door-Anchored High Resistance Band Pulldown" },
      { gym: "Seated Cable Row", home: "Foot-Looped Band Seated Row" },
      { gym: "Cable Tricep Pushdown", home: "Top-Door Anchored Band Pushdown" },
      { gym: "Cable Lateral Raise", home: "Step-on Band Lateral Raise" }
    ],
    biomechanicsAndDifferences: "Elastic resistance has an ascending resistance profile (tension increases exponentially as band stretches), whereas cables provide completely uniform linear resistance throughout range.",
    limitations: "Less resistance at the very beginning of the movement; you must step further away to preload tension.",
    safetyWarning: "Inspect bands for small tears or nicks before every workout. Never loop around sharp metal edges or abrasive surfaces."
  },
  {
    gymEquipment: "Flat / Incline Weight Bench",
    homeAlternative: "Sturdy Wooden Dining Chair, Sofa Edge, or Floor Mat",
    substituteIcon: "Square",
    description: "A solid dining chair placed against a wall, firm sofa cushions, or performing exercises on the floor (Floor Press).",
    replacesExercises: [
      { gym: "Flat Barbell Bench Press", home: "Dumbbell Floor Press or Deficit Push-Ups" },
      { gym: "Tricep Bench Dips", home: "Sturdy Chair Edge Dips" },
      { gym: "Bulgarian Split Squats on Bench", home: "Rear Foot Elevated on Sofa / Chair" }
    ],
    biomechanicsAndDifferences: "The floor press limits range of motion when elbows touch the floor, which actually protects shoulders while providing high triceps overload.",
    limitations: "Chairs are narrower and less padded; sofas may be slightly squishy for heavy unilateral balance.",
    safetyWarning: "Always brace chairs against a sturdy wall to avoid sliding or tipping during step-ups or dips."
  },
  {
    gymEquipment: "Squat Rack & Barbell Squat",
    homeAlternative: "Heavy Backpack Squat, Bulgarian Split Squats & Pistol Squats",
    substituteIcon: "ShieldAlert",
    description: "Unilateral bodyweight progressions (Bulgarian split squats, pistol squats, wall sits) that overload single legs with 2-3x effective bodyweight tension.",
    replacesExercises: [
      { gym: "Barbell Back Squat", home: "Bulgarian Split Squat + Backpack Squat" },
      { gym: "Barbell Front Squat", home: "Tempo Goblet Air Squat (4-sec descent)" }
    ],
    biomechanicsAndDifferences: "Unilateral leg work challenges stabilizers (glute medius, adductors, ankle proprioception) much more than bilateral squatting with low spine load.",
    limitations: "Requires more balance and coordination; cannot achieve maximal 1-rep maximum testing without heavy iron.",
    safetyWarning: "Perform near a wall or table if your single-leg balance is still developing."
  },
  {
    gymEquipment: "Lat Pulldown Machine / Pull-Up Bar",
    homeAlternative: "Inverted Table Rows or Towel Door Rows",
    substituteIcon: "Layers",
    description: "Lie underneath a sturdy dining table, grip table edge with palms, and pull chest up to table underside. Alternatively, loop a long bath towel around a closed door handle.",
    replacesExercises: [
      { gym: "Cable Lat Pulldown", home: "Towel Door Pulls / Sliding Floor Pulldowns" },
      { gym: "Barbell Bent-Over Row", home: "Inverted Dining Table Row" }
    ],
    biomechanicsAndDifferences: "Inverted rows are a closed-chain horizontal pull that trains lats, rhomboids, and core simultaneously in an athletic plank posture.",
    limitations: "Table height determines angle; table must be heavy and rigid enough to support full bodyweight without tipping.",
    safetyWarning: "Test table stability with full bodyweight slowly before hanging underneath. Never use glass-top tables!"
  }
];

