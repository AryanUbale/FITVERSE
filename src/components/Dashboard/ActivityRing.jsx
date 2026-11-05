import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Heart, Footprints, Clock, Sparkles } from "lucide-react";
import { mockTrainingData } from "../../data/mockTrainingData";

export const ActivityRing = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thursday active by default
  const activeDay = mockTrainingData.weekDays[selectedDayIndex];

  const percentage = activeDay.score;
  const strokeWidth = 14;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const reportTiles = [
    {
      label: "Kcal Burnt",
      value: activeDay.kcal,
      unit: "Kcal",
      icon: Flame,
      color: "#5B7CFA",
      bgLight: "rgba(91, 124, 250, 0.12)"
    },
    {
      label: "Heart Rate",
      value: activeDay.heartRate,
      unit: "Beats/min",
      icon: Heart,
      color: "#FF5C5C",
      bgLight: "rgba(255, 92, 92, 0.12)"
    },
    {
      label: "Daily Steps",
      value: activeDay.steps.toLocaleString(),
      unit: "Steps",
      icon: Footprints,
      color: "#4DD0E1",
      bgLight: "rgba(77, 208, 225, 0.12)"
    },
    {
      label: "Workout Out",
      value: `${activeDay.workoutMin} Min`,
      unit: "Duration",
      icon: Clock,
      color: "#2ED8A3",
      bgLight: "rgba(46, 216, 163, 0.12)"
    }
  ];

  return (
    <div className="surface-card p-6 md:p-8 rounded-[28px] border border-white/[0.06] space-y-7 shadow-xl">
      {/* Top Header & Week Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2ED8A3] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#2ED8A3] uppercase">
              Activity & Progress
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-1">
            Weekly <span className="text-[#4F5BFF]">Performance</span>
          </h3>
        </div>

        {/* Week Date Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#14132B]/80 rounded-2xl border border-white/[0.06]">
          {mockTrainingData.weekDays.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-[#4F5BFF] text-white shadow-glow-indigo font-bold scale-105"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-[10px] font-medium opacity-80 uppercase">
                  {item.day}
                </span>
                <span className="text-xs font-bold mt-0.5">{item.date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Grid: Circular Progress Ring on Left, Summary Message on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#14132B]/60 p-6 rounded-[24px] border border-white/[0.04]">
        {/* Progress Ring */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="activityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2ED8A3" />
                  <stop offset="50%" stopColor="#4DD0E1" />
                  <stop offset="100%" stopColor="#6C3CE0" />
                </linearGradient>
              </defs>
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#activityGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeDasharray={circumference}
              />
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {percentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Message & Status */}
        <div className="md:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2ED8A3]/10 border border-[#2ED8A3]/25 text-[#2ED8A3] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target on Track</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-white leading-snug">
            Great! Your Daily Task <span className="text-[#2ED8A3]">Almost Completed</span>
          </h4>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            You've smashed 80% of your daily movement goals. Complete today's core stretch to maintain your 4-day active streak!
          </p>
        </div>
      </div>

      {/* Today's Report (4 tiles) */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Today's Report
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {reportTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.label}
                className="p-4 rounded-[20px] bg-[#14132B]/80 border border-white/[0.06] hover:border-white/15 transition-all flex items-center gap-3.5 group"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: tile.bgLight, color: tile.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block">
                    {tile.label}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-bold text-white tracking-tight">
                      {tile.value}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {tile.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

