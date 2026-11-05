export const achievementsList = [
  {
    id: "first-workout",
    title: "First Step",
    description: "Completed your first workout session in FITVERSE.",
    icon: "Flame",
    badgeColor: "from-amber-500 to-orange-500",
    tier: "Bronze",
    check: (stats) => (stats.totalWorkouts || 0) >= 1
  },
  {
    id: "streak-3",
    title: "On Fire (3-Day Streak)",
    description: "Maintained a consistent workout streak for 3 days in a row.",
    icon: "Zap",
    badgeColor: "from-purple-500 to-pink-500",
    tier: "Silver",
    check: (stats) => (stats.streak || 0) >= 3
  },
  {
    id: "streak-7",
    title: "Unstoppable (7-Day Streak)",
    description: "Conquered a full 7-day uninterrupted workout streak.",
    icon: "Award",
    badgeColor: "from-yellow-400 to-amber-600",
    tier: "Gold",
    check: (stats) => (stats.streak || 0) >= 7
  },
  {
    id: "workouts-10",
    title: "Decathlon Achiever",
    description: "Successfully recorded 10 completed workouts.",
    icon: "Target",
    badgeColor: "from-blue-500 to-indigo-600",
    tier: "Silver",
    check: (stats) => (stats.totalWorkouts || 0) >= 10
  },
  {
    id: "workouts-20",
    title: "Elite Regular",
    description: "Crossed 20 completed workouts on your journey.",
    icon: "Crown",
    badgeColor: "from-purple-600 to-violet-800",
    tier: "Gold",
    check: (stats) => (stats.totalWorkouts || 0) >= 20
  },
  {
    id: "century-minutes",
    title: "Century Club (100+ Mins)",
    description: "Accumulated more than 100 active training minutes.",
    icon: "Clock",
    badgeColor: "from-emerald-400 to-teal-600",
    tier: "Silver",
    check: (stats) => (stats.totalMinutes || 0) >= 100
  },
  {
    id: "pilates-explorer",
    title: "Pilates Mind-Body Explorer",
    description: "Completed at least one Pilates workout flow.",
    icon: "Smile",
    badgeColor: "from-violet-400 to-purple-500",
    tier: "Bronze",
    check: (stats, history) => history.some((h) => h.category === "pilates")
  },
  {
    id: "iron-lifter",
    title: "Iron Lifter",
    description: "Completed a Gym workout and logged weight resistance.",
    icon: "Dumbbell",
    badgeColor: "from-cyan-500 to-blue-600",
    tier: "Bronze",
    check: (stats, history) => history.some((h) => h.category === "gym")
  },
  {
    id: "home-hero",
    title: "Living Room Warrior",
    description: "Completed a Home workout using bodyweight or bands.",
    icon: "Home",
    badgeColor: "from-rose-500 to-red-600",
    tier: "Bronze",
    check: (stats, history) => history.some((h) => h.category === "home")
  },
  {
    id: "consistency-champion",
    title: "Consistency Champion",
    description: "Logged workouts in all three categories (Gym, Home, Pilates).",
    icon: "Compass",
    badgeColor: "from-yellow-400 to-pink-500",
    tier: "Platinum",
    check: (stats, history) => {
      const cats = new Set(history.map((h) => h.category));
      return cats.has("gym") && cats.has("home") && cats.has("pilates");
    }
  },
  {
    id: "early-bird",
    title: "Early Bird",
    description: "Completed a morning workout before 9:00 AM.",
    icon: "Sunrise",
    badgeColor: "from-amber-400 to-yellow-500",
    tier: "Silver",
    check: (stats, history) => {
      return history.some((h) => {
        if (!h.timestamp) return false;
        const hour = new Date(h.timestamp).getHours();
        return hour < 9;
      });
    }
  },
  {
    id: "weekend-warrior",
    title: "Weekend Warrior",
    description: "Crushed a weekend training session on Saturday or Sunday.",
    icon: "Sparkles",
    badgeColor: "from-indigo-400 to-purple-600",
    tier: "Bronze",
    check: (stats, history) => {
      return history.some((h) => {
        if (!h.timestamp) return false;
        const day = new Date(h.timestamp).getDay();
        return day === 0 || day === 6;
      });
    }
  }
];

