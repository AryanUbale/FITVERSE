import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Play,
  ArrowRight,
  Dumbbell,
  Clock,
  CheckCircle2,
  ChevronRight,
  Zap,
  Activity,
  Quote,
  Sparkles,
  Layers,
  BarChart3
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { ExerciseVideoPreview } from "../components/video/ExerciseVideoPreview";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { getWeeklyChartData } from "../utils/calculations";

import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { PageHeader } from "../components/ui/PageHeader";
import { DarkCard } from "../components/ui/DarkCard";
import { StatCard } from "../components/ui/StatCard";
import { GlassBadge } from "../components/ui/GlassBadge";
import { GlassPill } from "../components/ui/GlassPill";
import { YellowButton } from "../components/ui/YellowButton";
import { RingProgress } from "../components/ui/RingProgress";
import { PhotoCard } from "../components/ui/PhotoCard";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    userProfile,
    activeCategory,
    stats,
    activePlan,
    categoryExercises,
    workoutHistory
  } = useFitness();

  const [selectedMuscle, setSelectedMuscle] = useState(null);

  // Today's suggested workout from active plan
  const todayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
  const todayScheduleItem =
    activePlan?.schedule?.find((s) => s.day === todayName) ||
    activePlan?.schedule?.find((s) => s.exerciseIds?.length > 0) || {
      focus: `${activeCategory?.toUpperCase() || "GYM"} Power Session`,
      exerciseIds: categoryExercises.slice(0, 4).map((e) => e.id)
    };

  const todayExerciseCount = todayScheduleItem.exerciseIds?.length || 3;
  const todayDuration = userProfile.preferredDuration || 30;

  // Weekly data for chart
  const weeklyData = getWeeklyChartData(workoutHistory);
  const plannedWeeklyDays = userProfile.preferredDays?.length || 4;
  const completedThisWeek = weeklyData.filter((d) => d.workouts > 0).length;
  const weeklyCompletionRate = Math.min(
    100,
    Math.round((completedThisWeek / plannedWeeklyDays) * 100)
  ) || 80;

  // Motivational quote pool
  const motivationalQuotes = [
    "Consistency is the blueprint of transformation.",
    "Form before ego. Precision builds longevity.",
    "Small daily improvements accumulate into extraordinary strength.",
    "Your breath dictates your power — stay centered and present."
  ];
  const dailyQuote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  // 4 Quick Actions with dark photos & yellow arrows
  const quickActions = [
    {
      title: "Start Workout",
      subtitle: "Launch today's structured guided session",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&auto=format&fit=crop&q=80",
      route: "/workout-session"
    },
    {
      title: "Workout Plans",
      subtitle: "Multi-week splits calibrated to your discipline",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80",
      route: "/plans"
    },
    {
      title: "Exercise Library",
      subtitle: "Curated compound & isolation movement tutorials",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
      route: "/exercises"
    },
    {
      title: "Achievements",
      subtitle: "Unlock badges and track your progress",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
      route: "/achievements"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. WELCOME HEADER WITH DAILY FOCUS GLASSBADGE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-white/[0.08]">
        <div className="space-y-1">
          <EyebrowLabel>DASHBOARD</EyebrowLabel>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Welcome back, <span className="text-[#FFD21F]">{userProfile?.name || "Alex Vance"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1A1] font-normal">
            Your performance telemetry is optimized. Ready to hit your next target?
          </p>
        </div>

        {/* Daily Focus GlassBadge */}
        <GlassBadge className="flex items-center gap-3.5 max-w-md p-4">
          <div className="w-8 h-8 rounded-full bg-[#FFD21F]/15 flex items-center justify-center shrink-0 text-[#FFD21F]">
            <Quote className="w-4 h-4 text-[#FFD21F]" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD21F] block">
              Daily Focus
            </span>
            <p className="text-xs text-slate-200 italic font-medium leading-relaxed mt-0.5">
              "{dailyQuote}"
            </p>
          </div>
        </GlassBadge>
      </div>

      {/* 2. FOUR STATCARDS: Total Sessions, Active Minutes, Streak, Exercises */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Sessions"
          value={stats?.totalWorkouts || 21}
          unit="Workouts"
          icon={Dumbbell}
          subtext="Logged in history"
        />
        <StatCard
          label="Active Minutes"
          value={stats?.totalMinutes || 881}
          unit="Min"
          icon={Clock}
          subtext="Total time under tension"
        />
        <StatCard
          label="Active Streak"
          value={stats?.streak || 4}
          unit="Days"
          icon={Flame}
          subtext="Current workout momentum"
        />
        <StatCard
          label="Exercises Done"
          value={stats?.totalExercises || 96}
          unit="Total"
          icon={CheckCircle2}
          subtext="Completed across sessions"
        />
      </div>

      {/* 3. MAIN ROW: 3D Companion (7 cols) + Today's Workout (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Featured Video Form Tutorial (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <ExerciseVideoPreview
            exercise={categoryExercises.find((e) => todayScheduleItem.exerciseIds?.includes(e.id)) || categoryExercises[0]}
          />
        </div>

        {/* Today's Workout DarkCard (5 cols) */}
        <DarkCard className="lg:col-span-5 flex flex-col justify-between relative overflow-hidden p-6 lg:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <EyebrowLabel>TODAY'S WORKOUT</EyebrowLabel>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1 leading-tight">
                {todayScheduleItem.focus}
              </h3>
            </div>

            {/* Glass Meta Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <GlassPill label={`${todayDuration} Min`} icon={<Clock className="w-3.5 h-3.5 text-[#FFD21F]" />} />
              <GlassPill label={`${todayExerciseCount} Exercises`} icon={<Dumbbell className="w-3.5 h-3.5 text-[#FFD21F]" />} />
              <GlassPill label={userProfile.experience || "Intermediate"} icon={<Zap className="w-3.5 h-3.5 text-[#FFD21F]" />} />
            </div>

            {/* Exercise rows with yellow number & gray set counts */}
            <div className="space-y-2 pt-2">
              {(todayScheduleItem.exerciseIds || []).slice(0, 4).map((exId, idx) => {
                const exObj = categoryExercises.find((e) => e.id === exId) || { name: exId };
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-[14px] bg-[#161616] border border-white/[0.05] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center text-[10px] font-black">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white truncate max-w-[180px]">
                        {exObj.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A1A1A1] font-semibold">3 sets</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full-width YellowButton */}
          <div className="pt-2">
            <YellowButton
              onClick={() => navigate("/workout-session")}
              className="w-full py-3.5 text-xs uppercase tracking-wider"
              icon={Play}
            >
              Start Workout Now
            </YellowButton>
          </div>
        </DarkCard>
      </div>

      {/* 4. WEEKLY PROGRESS: RingProgress in Yellow + Recharts in Yellow */}
      <DarkCard className="p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
          <div>
            <EyebrowLabel>ACTIVITY & HABITS</EyebrowLabel>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
              Weekly Progress & Performance
            </h3>
          </div>
          <button
            onClick={() => navigate("/progress")}
            className="text-xs font-bold text-[#FFD21F] hover:underline flex items-center gap-1 transition-all"
          >
            <span>Detailed Analytics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#161616] p-6 rounded-[20px] border border-white/[0.05]">
          {/* Circular Progress Ring (Yellow on Dark Track) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6">
            <RingProgress
              percentage={weeklyCompletionRate}
              size={140}
              strokeWidth={12}
              label="Completed"
              strokeColor="#FFD21F"
            />
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD21F] px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 inline-block">
                On Pace
              </span>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                Daily Target Almost Hit
              </h4>
              <p className="text-xs text-[#A1A1A1] leading-relaxed max-w-xs font-normal">
                {completedThisWeek} of {plannedWeeklyDays} days active this week. Progressive overload drives lasting adaptation.
              </p>
            </div>
          </div>

          {/* Recharts Bars in Yellow */}
          <div className="lg:col-span-7 h-48 w-full">
            <span className="text-[11px] font-bold text-[#A1A1A1] uppercase tracking-wider block mb-2">
              Weekly Minutes Logged
            </span>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#6B6B6B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                />
                <YAxis
                  stroke="#6B6B6B"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255, 210, 31, 0.05)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 rounded-xl bg-[#111111] border border-white/10 text-xs shadow-2xl">
                          <span className="font-bold text-white block">
                            {payload[0].payload.day}
                          </span>
                          <span className="text-[#FFD21F] font-extrabold">
                            {payload[0].value} minutes
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="minutes" radius={[8, 8, 0, 0]} fill="#FFD21F">
                  {weeklyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.workouts > 0 ? "#FFD21F" : "rgba(255, 255, 255, 0.1)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DarkCard>

      {/* 5. QUICK ACTIONS: 4 PhotoCards with Dark Photos & Yellow Arrow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <EyebrowLabel>QUICK ACTIONS</EyebrowLabel>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action, idx) => (
            <PhotoCard
              key={idx}
              image={action.image}
              title={action.title}
              subtitle={action.subtitle}
              onClick={() => navigate(action.route)}
            >
              <div className="pt-3 flex items-center justify-between border-t border-white/[0.08] mt-2">
                <span className="text-xs font-bold text-[#A1A1A1] group-hover:text-white transition-colors">
                  Open Module
                </span>
                <div className="w-7 h-7 rounded-full bg-[#161616] group-hover:bg-[#FFD21F] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#A1A1A1] group-hover:text-black transition-colors" />
                </div>
              </div>
            </PhotoCard>
          ))}
        </div>
      </div>
    </div>
  );
};
