import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Clock,
  Compass,
  Play,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  UserCheck,
  ChevronDown
} from "lucide-react";
import { mockTrainingData } from "../../data/mockTrainingData";

export const DailyGoals = ({ isOpen = true, onToggle }) => {
  const [selectedTrainer, setSelectedTrainer] = useState("Jim Kerry");
  const { jogging, coreBlast } = mockTrainingData.dailyGoals;

  const trainers = [
    { name: "Jim Kerry", role: "Professional Trainer" },
    { name: "Sarah Connor", role: "Mobility Specialist" },
    { name: "David Goggins", role: "Endurance Master" }
  ];

  return (
    <aside className="w-full xl:w-[320px] shrink-0 space-y-6">
      {/* Daily Goals Card */}
      <div className="surface-card p-6 rounded-[28px] border border-white/[0.06] shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#4F5BFF] uppercase block">
              Targets
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Daily <span className="text-[#4F5BFF]">Goals</span>
            </h3>
          </div>
          <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            Edit Goals
          </button>
        </div>

        {/* Home Jogging Track Card */}
        <div className="p-4 rounded-[22px] bg-gradient-to-br from-[#4F5BFF]/15 to-[#6C3CE0]/15 border border-[#4F5BFF]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#4F5BFF] text-white flex items-center justify-center shadow-glow-indigo">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white">{jogging.title}</span>
            </div>
            <span className="text-[11px] font-bold text-[#4DD0E1]">{jogging.distance}</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#4F5BFF] transition-all duration-1000"
                style={{ width: `${jogging.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{jogging.duration} Completed</span>
              <span className="text-[#2ED8A3] font-semibold">{jogging.remaining}</span>
            </div>
          </div>
        </div>

        {/* Quick Goal Checkpoints */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#14132B]/80 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#2ED8A3]" />
              <span className="text-xs font-medium text-slate-300">Hydration (2.4L)</span>
            </div>
            <span className="text-[10px] font-bold text-[#2ED8A3] bg-[#2ED8A3]/10 px-2 py-0.5 rounded-full">
              Done
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#14132B]/80 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-[#FF5C5C]" />
              <span className="text-xs font-medium text-slate-300">Sleep Score (8.2h)</span>
            </div>
            <span className="text-[10px] font-bold text-white">92%</span>
          </div>
        </div>
      </div>

      {/* Core Blast Mini Card with Trainer Selector */}
      <div className="surface-card p-6 rounded-[28px] border border-white/[0.06] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-widest text-[#FF5C5C] uppercase">
            Quick Blast
          </span>
          <span className="glass-pill text-[10px] text-[#4DD0E1] px-2 py-0.5 font-bold">
            {coreBlast.duration}
          </span>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white">{coreBlast.title}</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Targeted core activation & endurance booster.
          </p>
        </div>

        {/* Trainer Selector */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Select Lead Trainer
          </label>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#14132B] border border-white/[0.06]">
            <img
              src={coreBlast.trainerAvatar}
              alt={selectedTrainer}
              className="w-10 h-10 rounded-xl object-cover border border-[#4F5BFF]/40"
            />
            <div className="flex-1 min-w-0">
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                {trainers.map((t) => (
                  <option key={t.name} value={t.name} className="bg-[#1E1D3A] text-white">
                    {t.name} ({t.role})
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {trainers.find((t) => t.name === selectedTrainer)?.role || coreBlast.trainerRole}
              </span>
            </div>
          </div>
        </div>

        {/* Start Workout Button */}
        <Link
          to="/workout-session"
          className="btn-gradient w-full py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-glow-indigo transition-transform hover:scale-[1.02]"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Workout Now</span>
        </Link>
      </div>
    </aside>
  );
};

