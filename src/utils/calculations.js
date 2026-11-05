export const calculateStreak = (history = []) => {
  if (!history || history.length === 0) return { current: 0, longest: 0 };

  const datesSet = new Set(
    history.map((item) => {
      const d = item.dateStr || (item.timestamp ? item.timestamp.split("T")[0] : null);
      return d;
    }).filter(Boolean)
  );

  const sortedDates = Array.from(datesSet).sort().reverse();
  if (sortedDates.length === 0) return { current: 0, longest: 0 };

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let currentStreak = 0;
  let checkDate = new Date();

  // If worked out today or yesterday, streak is alive
  if (datesSet.has(todayStr)) {
    checkDate = new Date(today);
  } else if (datesSet.has(yesterdayStr)) {
    checkDate = new Date(yesterday);
  } else {
    // Streak broken
    return { current: 0, longest: calculateLongestStreak(datesSet) };
  }

  while (true) {
    const formatted = checkDate.toISOString().split("T")[0];
    if (datesSet.has(formatted)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const longestStreak = Math.max(currentStreak, calculateLongestStreak(datesSet));
  return { current: currentStreak, longest: longestStreak };
};

function calculateLongestStreak(datesSet) {
  const sorted = Array.from(datesSet).sort();
  if (sorted.length === 0) return 0;

  let maxStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentRun++;
      if (currentRun > maxStreak) maxStreak = currentRun;
    } else if (diffDays > 1) {
      currentRun = 1;
    }
  }

  return maxStreak;
}

export const calculateAggregateStats = (history = []) => {
  let totalWorkouts = history.length;
  let totalMinutes = 0;
  let totalCalories = 0;
  let totalExercises = 0;
  const categoryCounts = { gym: 0, home: 0, pilates: 0 };

  history.forEach((h) => {
    totalMinutes += h.duration || 0;
    totalCalories += h.calories || Math.round((h.duration || 30) * 6.5);
    totalExercises += h.exercisesCount || (h.exercises ? h.exercises.length : 4);
    if (categoryCounts[h.category] !== undefined) {
      categoryCounts[h.category]++;
    }
  });

  return {
    totalWorkouts,
    totalMinutes,
    totalCalories,
    totalExercises,
    categoryCounts
  };
};

export const getWeeklyChartData = (history = []) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  
  // Last 7 days in order
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() - i);
    const dateStr = targetDate.toISOString().split("T")[0];
    const dayLabel = daysOfWeek[targetDate.getDay()];

    const workoutsOnDay = history.filter((h) => {
      const hDate = h.dateStr || (h.timestamp ? h.timestamp.split("T")[0] : "");
      return hDate === dateStr;
    });

    const minutes = workoutsOnDay.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const calories = workoutsOnDay.reduce((acc, curr) => acc + (curr.calories || 0), 0);

    result.push({
      day: dayLabel,
      date: dateStr,
      minutes,
      calories,
      workouts: workoutsOnDay.length
    });
  }

  return result;
};

export const generateContributionHeatmap = (history = [], weeks = 12) => {
  const historyMap = {};
  history.forEach((h) => {
    const d = h.dateStr || (h.timestamp ? h.timestamp.split("T")[0] : "");
    if (d) {
      historyMap[d] = (historyMap[d] || 0) + 1;
    }
  });

  const matrix = [];
  const today = new Date();
  const totalDays = weeks * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays + 1);

  for (let d = 0; d < totalDays; d++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + d);
    const dateStr = current.toISOString().split("T")[0];
    const count = historyMap[dateStr] || 0;

    matrix.push({
      date: dateStr,
      count,
      dayOfWeek: current.getDay(),
      intensity: count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : 3
    });
  }

  return matrix;
};

