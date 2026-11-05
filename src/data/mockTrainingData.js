// Mock data for FitVerse – 3D Performance Desktop App
export const mockTrainingData = {
  user: {
    name: "Alex Vance",
    level: "Intermediate",
    focus: "Mobility",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    streak: 4
  },
  statTiles: [
    {
      id: "sessions",
      label: "Total Sessions",
      value: "21",
      unit: "Completed",
      icon: "Dumbbell",
      bgColor: "#5B7CFA",
      shadowGlow: "rgba(91, 124, 250, 0.45)"
    },
    {
      id: "duration",
      label: "Training Duration",
      value: "881",
      unit: "min",
      icon: "Clock",
      bgColor: "#FF5C5C",
      shadowGlow: "rgba(255, 92, 92, 0.45)"
    },
    {
      id: "streak",
      label: "Active Streak",
      value: "4",
      unit: "Days",
      icon: "Flame",
      bgColor: "#4DD0E1",
      shadowGlow: "rgba(77, 208, 225, 0.45)"
    },
    {
      id: "exercises",
      label: "Exercises Done",
      value: "96",
      unit: "Total",
      icon: "CheckCircle2",
      bgColor: "#2ED8A3",
      shadowGlow: "rgba(46, 216, 163, 0.45)"
    }
  ],
  todayWorkout: {
    title: "Core & Lower Endurance",
    duration: "30 Min",
    exercisesCount: "3 Exercises",
    level: "Intermediate",
    athleteImg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80",
    exercises: [
      { name: "Plank Hold", duration: "60s", sets: "3 sets" },
      { name: "Walking Lunges", duration: "16 reps", sets: "4 sets" },
      { name: "Glute Bridges", duration: "20 reps", sets: "3 sets" }
    ]
  },
  topTrainingHero: {
    title: "Functional Training",
    subtitle: "High Intensity Power Conditioning",
    duration: "30 Min",
    calories: "450 Kcal",
    intensity: "Advanced",
    athleteImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
  },
  categories: [
    { id: "running", name: "Running", icon: "Footprints", count: "12 Workouts" },
    { id: "cycling", name: "Cycling", icon: "Bike", count: "8 Workouts" },
    { id: "walking", name: "Walking", icon: "Navigation", count: "5 Workouts" },
    { id: "yoga", name: "Yoga", icon: "Smile", count: "14 Workouts" },
    { id: "strength", name: "Strength", icon: "Dumbbell", count: "22 Workouts" }
  ],
  featuredWorkouts: [
    {
      id: "weight-loss",
      title: "Weight Loss Training",
      subtitle: "Full Body Workout",
      duration: "35 Min",
      calories: "420 Kcal",
      themeColor: "#4DD0E1",
      textColor: "text-slate-900",
      athleteImg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "cardio",
      title: "Cardio Training",
      subtitle: "Full Body Workout",
      duration: "25 Min",
      calories: "310 Kcal",
      themeColor: "#6C3CE0",
      textColor: "text-white",
      athleteImg: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "belly-fat",
      title: "Belly Fat Loose Training",
      subtitle: "Full Body Workout",
      duration: "30 Min",
      calories: "380 Kcal",
      themeColor: "#FF5C5C",
      textColor: "text-white",
      athleteImg: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&auto=format&fit=crop&q=80"
    }
  ],
  weekDays: [
    { day: "Mon", date: "12", fullDate: "2026-11-09", score: 85, kcal: 340, heartRate: 62, steps: 5400, workoutMin: 45 },
    { day: "Tue", date: "13", fullDate: "2026-11-10", score: 70, kcal: 290, heartRate: 59, steps: 4800, workoutMin: 35 },
    { day: "Wed", date: "14", fullDate: "2026-11-11", score: 92, kcal: 410, heartRate: 64, steps: 6200, workoutMin: 50 },
    { day: "Thu", date: "15", fullDate: "2026-11-12", score: 80, kcal: 321, heartRate: 60, steps: 5030, workoutMin: 40 }, // Active
    { day: "Fri", date: "16", fullDate: "2026-11-13", score: 65, kcal: 260, heartRate: 58, steps: 4100, workoutMin: 30 },
    { day: "Sat", date: "17", fullDate: "2026-11-14", score: 88, kcal: 390, heartRate: 63, steps: 5900, workoutMin: 45 },
    { day: "Sun", date: "18", fullDate: "2026-11-15", score: 75, kcal: 310, heartRate: 61, steps: 4600, workoutMin: 35 }
  ],
  recommendedClasses: [
    {
      id: "rec-functional",
      title: "Functional Movement & Posture",
      instructor: "Elena Rostova",
      duration: "45 Min",
      level: "All Levels",
      calories: "340 Kcal",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80"
    },
    {
      id: "rec-strength",
      title: "Upper Body Hypertrophy",
      instructor: "Marcus Brody",
      duration: "50 Min",
      level: "Intermediate",
      calories: "480 Kcal",
      badge: "New",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80"
    }
  ],
  dailyGoals: {
    jogging: {
      title: "Home Jogging Track",
      duration: "2.5 Hour",
      distance: "6.1 Km",
      target: "6.7 Km",
      remaining: "0.6 km Remaining",
      progress: 91
    },
    coreBlast: {
      title: "Core Blast",
      trainerName: "Jim Kerry",
      trainerRole: "Professional Trainer",
      duration: "20 Min",
      trainerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  },
  onboardingCategories: [
    "Running",
    "Cycling",
    "Walking",
    "Overhead Extension",
    "Good Morning",
    "Front Raises",
    "Sitting",
    "Bench Press",
    "Yoga",
    "Lying"
  ]
};

