const STORAGE_KEY_PREFIX = "fitverse_";

export const DEFAULT_USER_PROFILE = {
  name: "Alex Vance",
  category: "gym", // 'gym' | 'home' | 'pilates'
  goal: "Muscle building",
  experience: "Intermediate",
  preferredDuration: 45, // in minutes
  preferredDays: ["Monday", "Wednesday", "Friday", "Saturday"],
  equipmentLimitation: "Full commercial gym access",
  theme: "dark",
  onboarded: true
};

// Generates realistic past 28-day sample workout history for previewing charts, streaks, and heatmap
export const generateDemoHistory = () => {
  const history = [];
  const now = new Date();
  const sampleExercises = [
    { name: "Barbell Bench Press", category: "gym", sets: 4, reps: "10", weightKg: 65 },
    { name: "Barbell Back Squat", category: "gym", sets: 4, reps: "8", weightKg: 85 },
    { name: "Cable Lat Pulldown", category: "gym", sets: 3, reps: "12", weightKg: 50 },
    { name: "Classic Push-Up", category: "home", sets: 4, reps: "20" },
    { name: "Forearm Core Plank", category: "home", sets: 3, reps: "60s" },
    { name: "The Hundred", category: "pilates", sets: 1, reps: "100 pumps" },
    { name: "Roll Up", category: "pilates", sets: 1, reps: "8 reps" }
  ];

  // Distribute 18 workouts over past 28 days to give a realistic active streak
  for (let i = 27; i >= 0; i--) {
    // skip some days for realism
    if (i % 7 === 1 || i % 7 === 5) continue;
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(9 + (i % 8), 15, 0, 0);

    const category = i % 3 === 0 ? "gym" : i % 3 === 1 ? "home" : "pilates";
    const duration = 30 + ((i * 7) % 35);
    const exercisesDone = sampleExercises.filter(e => e.category === category || Math.random() > 0.5);

    history.push({
      id: `demo-${i}`,
      title: `${category.toUpperCase()} Session #${28 - i}`,
      category,
      duration,
      calories: Math.round(duration * 6.5),
      timestamp: date.toISOString(),
      dateStr: date.toISOString().split("T")[0],
      exercisesCount: exercisesDone.length || 3,
      exercises: exercisesDone
    });
  }

  return history;
};

export const getStoredItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[FitVerse Storage] Error reading ${key}:`, err);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[FitVerse Storage] Error saving ${key}:`, err);
  }
};

export const removeStoredItem = (key) => {
  try {
    localStorage.removeItem(STORAGE_KEY_PREFIX + key);
  } catch (err) {
    console.warn(`[FitVerse Storage] Error removing ${key}:`, err);
  }
};

export const clearAllFitVerseData = () => {
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(k);
      }
    });
  } catch (err) {
    console.warn("[FitVerse Storage] Error clearing data:", err);
  }
};

