import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  getStoredItem,
  setStoredItem,
  DEFAULT_USER_PROFILE,
  generateDemoHistory,
  clearAllFitVerseData
} from "../utils/storage";
import { gymExercises } from "../data/gymExercises";
import { homeExercises } from "../data/homeExercises";
import { pilatesExercises } from "../data/pilatesExercises";
import { workoutPlans } from "../data/workoutPlans";
import { achievementsList } from "../data/achievements";
import { calculateStreak, calculateAggregateStats } from "../utils/calculations";

const FitnessContext = createContext(null);

export const FitnessProvider = ({ children }) => {
  // 1. User Profile & Preferences
  const [userProfile, setUserProfile] = useState(() =>
    getStoredItem("user_profile", DEFAULT_USER_PROFILE)
  );

  // 2. Active Fitness Category: 'gym' | 'home' | 'pilates'
  const [activeCategory, setActiveCategory] = useState(() => {
    return userProfile.category || "gym";
  });

  // 3. Favorites
  const [favorites, setFavorites] = useState(() =>
    getStoredItem("favorites", ["gym-bench-press", "home-push-ups", "pilates-hundred"])
  );

  // 4. Workout History
  const [workoutHistory, setWorkoutHistory] = useState(() =>
    getStoredItem("workout_history", generateDemoHistory())
  );

  // 5. Active Selected Plan
  const [activePlan, setActivePlan] = useState(() => {
    const stored = getStoredItem("active_plan", null);
    if (stored) return stored;
    return workoutPlans.find((p) => p.category === activeCategory) || workoutPlans[0];
  });

  // 6. Calendar Scheduled Workouts
  const [calendarSchedule, setCalendarSchedule] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const defaultSchedule = {
      [today]: [
        {
          id: "sched-today",
          title: "Chest & Triceps Hypertrophy",
          category: "gym",
          duration: 45,
          completed: false,
          exerciseIds: ["gym-bench-press", "gym-cable-tricep-pushdown", "gym-dumbbell-shoulder-press"]
        }
      ]
    };
    return getStoredItem("calendar_schedule", defaultSchedule);
  });

  // 7. Unlocked Achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState(() =>
    getStoredItem("unlocked_achievements", { "first-workout": new Date().toISOString() })
  );

  // 8. Notification Toast / Alert Banner
  const [notification, setNotification] = useState(null);

  // Sync profile & active category
  useEffect(() => {
    setStoredItem("user_profile", { ...userProfile, category: activeCategory });
  }, [userProfile, activeCategory]);

  useEffect(() => {
    setStoredItem("favorites", favorites);
  }, [favorites]);

  useEffect(() => {
    setStoredItem("workout_history", workoutHistory);
  }, [workoutHistory]);

  useEffect(() => {
    setStoredItem("calendar_schedule", calendarSchedule);
  }, [calendarSchedule]);

  useEffect(() => {
    setStoredItem("unlocked_achievements", unlockedAchievements);
  }, [unlockedAchievements]);

  useEffect(() => {
    setStoredItem("active_plan", activePlan);
  }, [activePlan]);

  // Combined exercises map
  const allExercises = useMemo(
    () => [...gymExercises, ...homeExercises, ...pilatesExercises],
    []
  );

  // Category-specific exercises
  const categoryExercises = useMemo(() => {
    return {
      gym: gymExercises,
      home: homeExercises,
      pilates: pilatesExercises
    }[activeCategory] || gymExercises;
  }, [activeCategory]);

  // Category-specific workout plans
  const categoryPlans = useMemo(
    () => workoutPlans.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Calculate dynamic stats memoized
  const stats = useMemo(() => {
    const streakInfo = calculateStreak(workoutHistory);
    const aggregateStats = calculateAggregateStats(workoutHistory);
    return {
      streak: streakInfo.current,
      longestStreak: streakInfo.longest,
      totalWorkouts: aggregateStats.totalWorkouts,
      totalMinutes: aggregateStats.totalMinutes,
      totalCalories: aggregateStats.totalCalories,
      totalExercises: aggregateStats.totalExercises,
      categoryCounts: aggregateStats.categoryCounts
    };
  }, [workoutHistory]);

  // Evaluate & trigger new achievements
  const checkAchievements = (history = workoutHistory) => {
    const newUnlocked = { ...unlockedAchievements };
    let newlyAwarded = null;

    achievementsList.forEach((badge) => {
      if (!newUnlocked[badge.id]) {
        if (badge.check(stats, history)) {
          newUnlocked[badge.id] = new Date().toISOString();
          newlyAwarded = badge;
        }
      }
    });

    if (newlyAwarded) {
      setUnlockedAchievements(newUnlocked);
      setNotification({
        type: "achievement",
        title: "Achievement Unlocked!",
        message: `${newlyAwarded.title}: ${newlyAwarded.description}`
      });
    }
  };

  // Switch category
  const setCategory = (cat) => {
    if (["gym", "home", "pilates"].includes(cat)) {
      setActiveCategory(cat);
      setUserProfile((prev) => ({ ...prev, category: cat }));
      // Automatically adapt active plan if existing plan does not match category
      if (activePlan?.category !== cat) {
        const matchingPlan = workoutPlans.find((p) => p.category === cat);
        if (matchingPlan) setActivePlan(matchingPlan);
      }
    }
  };

  // Toggle Favorite
  const toggleFavorite = (exerciseId) => {
    setFavorites((prev) => {
      if (prev.includes(exerciseId)) {
        return prev.filter((id) => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  // Schedule management
  const addScheduledWorkout = (dateStr, workout) => {
    setCalendarSchedule((prev) => {
      const existing = prev[dateStr] || [];
      return {
        ...prev,
        [dateStr]: [...existing, { ...workout, id: `sched-${Date.now()}`, completed: false }]
      };
    });
    setNotification({
      type: "success",
      title: "Workout Scheduled",
      message: `Added "${workout.title}" to ${dateStr}`
    });
  };

  const removeScheduledWorkout = (dateStr, workoutId) => {
    setCalendarSchedule((prev) => {
      const existing = prev[dateStr] || [];
      return {
        ...prev,
        [dateStr]: existing.filter((w) => w.id !== workoutId)
      };
    });
  };

  const toggleWorkoutCompleted = (dateStr, workoutId) => {
    setCalendarSchedule((prev) => {
      const existing = prev[dateStr] || [];
      return {
        ...prev,
        [dateStr]: existing.map((w) => {
          if (w.id === workoutId) {
            const isNowCompleted = !w.completed;
            if (isNowCompleted) {
              // Also log to history
              logCompletedWorkout({
                title: w.title,
                category: w.category || activeCategory,
                duration: w.duration || 45,
                exercisesCount: w.exerciseIds?.length || 4,
                dateStr: dateStr
              });
            }
            return { ...w, completed: isNowCompleted };
          }
          return w;
        })
      };
    });
  };

  // Complete a full guided workout session
  const logCompletedWorkout = (sessionData) => {
    const newEntry = {
      id: `session-${Date.now()}`,
      title: sessionData.title || "Custom Session",
      category: sessionData.category || activeCategory,
      duration: sessionData.duration || 30,
      calories: sessionData.calories || Math.round((sessionData.duration || 30) * 6.5),
      timestamp: new Date().toISOString(),
      dateStr: sessionData.dateStr || new Date().toISOString().split("T")[0],
      exercisesCount: sessionData.exercisesCount || (sessionData.exercises?.length || 4),
      exercises: sessionData.exercises || []
    };

    const updatedHistory = [newEntry, ...workoutHistory];
    setWorkoutHistory(updatedHistory);
    checkAchievements(updatedHistory);
  };

  // Reset progress / clear data
  const resetWorkoutData = () => {
    setWorkoutHistory([]);
    setUnlockedAchievements({});
    setNotification({
      type: "info",
      title: "Data Reset",
      message: "Workout history and achievements have been reset."
    });
  };

  const resetAllToFactoryDefaults = () => {
    clearAllFitVerseData();
    setUserProfile(DEFAULT_USER_PROFILE);
    setActiveCategory("gym");
    setFavorites([]);
    setWorkoutHistory([]);
    setUnlockedAchievements({});
    setActivePlan(workoutPlans[0]);
    setNotification({
      type: "info",
      title: "Factory Reset",
      message: "FITVERSE has been reset to default state."
    });
  };

  const loadDemoData = () => {
    const demo = generateDemoHistory();
    setWorkoutHistory(demo);
    setUserProfile((prev) => ({ ...prev, onboarded: true }));
    checkAchievements(demo);
    setNotification({
      type: "success",
      title: "Demo Data Loaded",
      message: "28 days of realistic workout activity and charts loaded."
    });
  };

  return (
    <FitnessContext.Provider
      value={{
        userProfile,
        setUserProfile,
        activeCategory,
        setCategory,
        categoryExercises,
        allExercises,
        categoryPlans,
        activePlan,
        setActivePlan,
        favorites,
        toggleFavorite,
        calendarSchedule,
        addScheduledWorkout,
        removeScheduledWorkout,
        toggleWorkoutCompleted,
        workoutHistory,
        logCompletedWorkout,
        unlockedAchievements,
        stats,
        notification,
        setNotification,
        resetWorkoutData,
        resetAllToFactoryDefaults,
        loadDemoData
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error("useFitness must be used within a FitnessProvider");
  }
  return context;
};

