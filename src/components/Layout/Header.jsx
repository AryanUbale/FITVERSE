import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Play,
  Flame,
  Dumbbell,
  Activity,
  HeartPulse,
  Search,
  CheckCircle2,
  X,
  Sparkles
} from "lucide-react";
import { useFitness } from "../../context/FitnessContext";

export const Header = () => {
  const {
    activeCategory,
    setCategory,
    stats,
    loadDemoData
  } = useFitness();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "home", label: "Home", icon: Activity },
    { id: "pilates", label: "Pilates", icon: HeartPulse }
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/exercises?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-20 px-4 md:px-8 border-b border-white/[0.08] bg-black/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Mobile FitVerse Logo with Dumbbell */}
      <div className="lg:hidden flex items-center gap-2 pl-12">
        <div className="w-8 h-8 rounded-lg bg-[#FFD21F] flex items-center justify-center text-black shadow-[0_0_12px_rgba(255,210,31,0.35)] shrink-0">
          <Dumbbell className="w-4 h-4 stroke-[2.5]" />
        </div>
        <span className="font-black text-lg tracking-tighter text-white uppercase italic">
          Fit<span className="text-[#FFD21F]">Verse</span>
        </span>
      </div>

      {/* Middle: Wide search bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#A1A1A1] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            placeholder="Search exercises, workout plans, anatomy..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#111111] border border-white/[0.08] text-xs text-white placeholder-[#6B6B6B] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] transition-all"
          />
        </div>
      </div>

      {/* Right side: Streak pill (yellow flame), Start Workout, Demo chip, Bell with yellow dot */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Streak Counter Pill with yellow flame */}
        <div
          onClick={() => navigate("/progress")}
          className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-white text-xs font-bold hover:border-[#FFD21F]/40 transition-colors shadow-sm"
          title="Active Workout Streak"
        >
          <Flame className="w-4 h-4 text-[#FFD21F] fill-[#FFD21F] animate-pulse" />
          <span>{stats?.streak || 4} Days</span>
        </div>

        {/* Start Workout Yellow Pill Button */}
        <button
          onClick={() => navigate("/workout-session")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE04D] text-xs font-black text-black shadow-[0_0_20px_rgba(255,210,31,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span className="hidden sm:inline">Start Workout</span>
          <span className="sm:hidden">Start</span>
        </button>
      </div>
    </header>
  );
};
