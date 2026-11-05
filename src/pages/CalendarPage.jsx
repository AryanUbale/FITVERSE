import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Dumbbell,
  Play,
  Sparkles,
  Activity,
  HeartPulse,
  X,
  Check
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { PageHeader } from "../components/ui/PageHeader";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { DarkCard } from "../components/ui/DarkCard";
import { YellowButton } from "../components/ui/YellowButton";

export const CalendarPage = () => {
  const navigate = useNavigate();
  const {
    calendarSchedule,
    addScheduledWorkout,
    removeScheduledWorkout,
    toggleWorkoutCompleted,
    categoryExercises,
    activeCategory
  } = useFitness();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayDateStr, setSelectedDayDateStr] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkoutTitle, setNewWorkoutTitle] = useState("");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState(45);
  const [newWorkoutCategory, setNewWorkoutCategory] = useState(activeCategory || "gym");

  const todayStr = new Date().toISOString().split("T")[0];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const resetToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDayDateStr(now.toISOString().split("T")[0]);
  };

  const monthYearStr = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedDayWorkouts = calendarSchedule[selectedDayDateStr] || [];

  const getThisWeekWorkouts = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const weekWorkouts = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dStr = d.toISOString().split("T")[0];
      const list = calendarSchedule[dStr] || [];
      list.forEach((w) => {
        weekWorkouts.push({
          ...w,
          dateStr: dStr,
          dayName: dayNames[i]
        });
      });
    }
    return weekWorkouts;
  };

  const thisWeekList = getThisWeekWorkouts();

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!newWorkoutTitle.trim()) return;

    addScheduledWorkout(selectedDayDateStr, {
      title: newWorkoutTitle,
      category: newWorkoutCategory,
      duration: Number(newWorkoutDuration),
      exerciseIds: categoryExercises.slice(0, 3).map((ex) => ex.id)
    });

    setNewWorkoutTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <PageHeader
          eyebrow="TRAINING PERIODIZATION"
          title="Workout Calendar"
          subtitle="Plan your weekly training rhythm, record completed sessions, and monitor consistency."
        />

        <div className="flex items-center gap-3">
          <button
            onClick={resetToToday}
            className="px-4 py-2 rounded-full bg-[#FFD21F] text-black text-xs font-bold hover:bg-[#FFE04D] transition-colors shadow-sm"
          >
            Today
          </button>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#111111] border border-white/[0.08]">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-full text-[#A1A1A1] hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-white px-2 min-w-[130px] text-center">
              {monthYearStr}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-full text-[#A1A1A1] hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Calendar Grid */}
        <DarkCard className="lg:col-span-8 p-6 sm:p-8 space-y-4">
          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#6B6B6B] uppercase tracking-wider pb-2">
            {dayNames.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2.5">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[85px] sm:min-h-[105px] rounded-2xl bg-transparent opacity-0" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const dayWorkouts = calendarSchedule[dateStr] || [];
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDayDateStr;

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDayDateStr(dateStr)}
                  className={`min-h-[85px] sm:min-h-[105px] p-2 sm:p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "bg-[#FFD21F] border-[#FFD21F] text-black font-bold scale-[1.02] shadow-[0_0_20px_rgba(255,210,31,0.3)]"
                      : isToday
                      ? "bg-[#1A1A1A] border-[#FFD21F] ring-2 ring-[#FFD21F]/40 text-white"
                      : "bg-[#1A1A1A]/70 border-white/[0.06] text-[#A1A1A1] hover:bg-[#161616] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold">
                      {dayNum}
                    </span>
                    {isToday && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {dayWorkouts.slice(0, 2).map((w, wIdx) => (
                      <div
                        key={wIdx}
                        className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md truncate font-semibold flex items-center gap-1 ${
                          isSelected
                            ? "bg-black/20 text-black"
                            : "bg-white/[0.08] text-white/90"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-black/40" : "bg-[#FFD21F]"}`} />
                        <span className="truncate">{w.title}</span>
                      </div>
                    ))}
                    {dayWorkouts.length > 2 && (
                      <span className={`text-[9px] font-bold opacity-80 block text-right ${isSelected ? "text-black/70" : ""}`}>
                        +{dayWorkouts.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 pt-4 border-t border-white/[0.08] text-xs font-semibold text-[#6B6B6B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD21F]" />
              <span>Workout Scheduled</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08] border border-white/20" />
              <span>Rest Day</span>
            </span>
          </div>
        </DarkCard>

        {/* RIGHT: Day Details + Week Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Selected Date */}
          <DarkCard className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <EyebrowLabel>Selected Date</EyebrowLabel>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {new Date(selectedDayDateStr + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  })}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2.5 rounded-xl bg-[#FFD21F] text-black flex items-center justify-center hover:bg-[#FFE04D] hover:scale-105 transition-all"
                title="Schedule workout on this date"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedDayWorkouts.length === 0 ? (
                <div className="py-6 text-center text-xs text-[#6B6B6B] space-y-2">
                  <CalendarIcon className="w-8 h-8 text-[#6B6B6B]/40 mx-auto" />
                  <p>No workouts scheduled for this date.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-xs font-bold text-[#FFD21F] hover:text-[#FFE04D]"
                  >
                    + Schedule Session
                  </button>
                </div>
              ) : (
                selectedDayWorkouts.map((w, idx) => (
                  <div
                    key={w.id || idx}
                    className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-white/[0.08] flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleWorkoutCompleted(selectedDayDateStr, w.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          w.completed
                            ? "bg-[#FFD21F] text-black font-extrabold"
                            : "border border-white/20 text-transparent hover:border-[#FFD21F]/50"
                        }`}
                        title={w.completed ? "Mark incomplete" : "Mark completed"}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div>
                        <span
                          className={`text-xs font-bold block ${
                            w.completed ? "line-through text-[#6B6B6B]" : "text-white"
                          }`}
                        >
                          {w.title}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] mt-0.5">
                          <span>{w.duration || 45} Min</span>
                          <span>•</span>
                          <span className="capitalize font-semibold text-[#A1A1A1]">
                            {w.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => navigate(`/workout-session?title=${encodeURIComponent(w.title)}`)}
                        className="p-1.5 rounded-lg text-[#FFD21F] hover:bg-white/[0.08]"
                        title="Start Workout"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#FFD21F]" />
                      </button>
                      <button
                        onClick={() => removeScheduledWorkout(selectedDayDateStr, w.id)}
                        className="p-1.5 rounded-lg text-[#E5484D] hover:bg-white/[0.08]"
                        title="Delete workout"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DarkCard>

          {/* This Week */}
          <DarkCard className="p-6 space-y-4">
            <EyebrowLabel>This Week's Pipeline ({thisWeekList.length} Planned)</EyebrowLabel>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {thisWeekList.length === 0 ? (
                <p className="text-xs text-[#6B6B6B] italic">
                  No sessions in this week's rotation.
                </p>
              ) : (
                thisWeekList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#1A1A1A] border border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#FFD21F] text-[11px] min-w-[28px]">
                        {item.dayName}
                      </span>
                      <span className="font-medium text-white truncate max-w-[150px]">
                        {item.title}
                      </span>
                    </div>
                    {item.completed ? (
                      <span className="text-[10px] font-bold text-[#FFD21F] flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Done</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#6B6B6B]">
                        {item.duration || 45}m
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </DarkCard>
        </div>
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl p-6 sm:p-8 bg-[#111111] space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <EyebrowLabel>Add To Schedule</EyebrowLabel>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedDayDateStr}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#6B6B6B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWorkout} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1.5">
                  Workout Title
                </label>
                <input
                  type="text"
                  required
                  value={newWorkoutTitle}
                  onChange={(e) => setNewWorkoutTitle(e.target.value)}
                  placeholder="e.g. Chest Hypertrophy, 5km Tempo Run"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/[0.08] text-white text-xs placeholder-[#6B6B6B] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]/30"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1.5">
                  Discipline Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["gym", "home", "pilates"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewWorkoutCategory(c)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                        newWorkoutCategory === c
                          ? "bg-[#FFD21F] text-black border-[#FFD21F]"
                          : "bg-[#1A1A1A] text-[#A1A1A1] border-white/[0.08] hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-1.5">
                  Duration (Minutes)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setNewWorkoutDuration(mins)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        newWorkoutDuration === mins
                          ? "bg-[#FFD21F] text-black border-[#FFD21F]"
                          : "bg-[#1A1A1A] text-[#A1A1A1] border-white/[0.08] hover:text-white"
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <YellowButton className="w-full py-3.5 text-xs font-extrabold">
                  Confirm & Schedule
                </YellowButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
