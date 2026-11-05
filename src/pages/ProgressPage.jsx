import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Flame,
  Award,
  Calendar,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  Dumbbell
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  getWeeklyChartData,
  generateContributionHeatmap
} from "../utils/calculations";

export const ProgressPage = () => {
  const navigate = useNavigate();
  const { workoutHistory, stats, userProfile, loadDemoData } = useFitness();

  const weeklyChartData = useMemo(() => getWeeklyChartData(workoutHistory), [workoutHistory]);
  const heatmapData = useMemo(() => generateContributionHeatmap(workoutHistory, 16), [workoutHistory]);

  // Category distribution data for Pie Chart
  const pieData = [
    { name: "Gym", value: stats.categoryCounts.gym, color: "#438BFF" },
    { name: "Home", value: stats.categoryCounts.home, color: "#8055FF" },
    { name: "Pilates", value: stats.categoryCounts.pilates, color: "#00F5D4" },
  ].filter((p) => p.value > 0);

  // Group heatmap into 7 rows (days of week) and 16 columns (weeks)
  const heatmapWeeks = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      weeks.push(heatmapData.slice(i, i + 7));
    }
    return weeks;
  }, [heatmapData]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/20">
              ANALYTICS & METRICS
            </span>
            <span className="text-xs text-slate-400">
              Biomechanical & Consistency Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Progress & Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real recorded training history, workout consistency heatmaps, and discipline splits.
          </p>
        </div>

        {workoutHistory.length === 0 && (
          <button
            onClick={loadDemoData}
            className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold text-white shadow-glow-purple flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Sample History</span>
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sessions */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Workouts</span>
            <span className="text-2xl font-black text-white">{stats.totalWorkouts}</span>
          </div>
        </div>

        {/* Active Minutes */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Duration</span>
            <span className="text-2xl font-black text-white">
              {stats.totalMinutes} <span className="text-xs font-normal text-slate-400">min</span>
            </span>
          </div>
        </div>

        {/* Current vs Longest Streak */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Current / Best Streak</span>
            <span className="text-2xl font-black text-white">
              {stats.streak} <span className="text-xs font-normal text-slate-400">/ {stats.longestStreak} d</span>
            </span>
          </div>
        </div>

        {/* Caloric Expenditure */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Burn</span>
            <span className="text-2xl font-black text-white">
              {stats.totalCalories} <span className="text-xs font-normal text-slate-400">kcal</span>
            </span>
          </div>
        </div>
      </div>

      {/* CONSISTENCY HEATMAP (GitHub Style) */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-purple" />
              <span>Workout Consistency Heatmap (Past 16 Weeks)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Each cell represents a day. Darker colors signify completed workout sessions.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded bg-white/5" />
            <span className="w-2.5 h-2.5 rounded bg-brand-purple/40" />
            <span className="w-2.5 h-2.5 rounded bg-brand-purple" />
            <span className="w-2.5 h-2.5 rounded bg-brand-cyan shadow-glow-cyan" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1.5 min-w-[700px]">
            {heatmapWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} workout${day.count === 1 ? "" : "s"}`}
                    className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${
                      day.intensity === 0
                        ? "bg-white/[0.04]"
                        : day.intensity === 1
                        ? "bg-brand-purple/45"
                        : day.intensity === 2
                        ? "bg-brand-purple"
                        : "bg-brand-cyan shadow-glow-cyan"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHARTS ROW: Duration Progression + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Weekly Duration Bar Chart */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Daily Workout Duration (Minutes)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10152A",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#FFF"
                  }}
                  formatter={(val) => [`${val} minutes`, "Active Time"]}
                />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {weeklyChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.minutes > 0 ? "#8055FF" : "#1E2749"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Discipline Distribution
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#10152A",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#FFF"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-slate-500">
                No session distribution data available yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECENT WORKOUT SESSIONS TABLE */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Completed Workout History
        </h3>

        {workoutHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-bold">Session Name</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Duration</th>
                  <th className="pb-3 font-bold">Calories</th>
                  <th className="pb-3 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {workoutHistory.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-semibold text-white">
                      {item.title}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                          item.category === "gym"
                            ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                            : item.category === "home"
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                            : "bg-violet-500/10 text-violet-300 border-violet-500/30"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{item.duration} min</td>
                    <td className="py-3 text-brand-cyan">{item.calories} kcal</td>
                    <td className="py-3 text-slate-400">
                      {item.dateStr || (item.timestamp ? item.timestamp.split("T")[0] : "-")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs">
            No completed workouts logged yet. Start a session from the Dashboard to record your progress!
          </div>
        )}
      </div>
    </div>
  );
};

