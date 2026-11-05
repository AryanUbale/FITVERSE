import React from "react";
import { Footprints, Bike, Navigation, Smile, Dumbbell } from "lucide-react";

const iconMap = {
  Footprints,
  Bike,
  Navigation,
  Smile,
  Dumbbell
};

export const CategoryTile = ({ category, isActive, onClick }) => {
  const Icon = iconMap[category.icon] || Dumbbell;

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-[24px] text-left transition-all duration-300 flex flex-col justify-between min-h-[120px] w-full relative overflow-hidden group ${
        isActive
          ? "bg-[#1E1D3A] border-2 border-[#4F5BFF] shadow-glow-indigo"
          : "bg-[#1E1D3A] border border-white/[0.06] hover:border-white/20 hover:-translate-y-1"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
            isActive
              ? "bg-[#4F5BFF] text-white shadow-glow-indigo"
              : "bg-white/[0.06] text-slate-300 group-hover:text-white group-hover:bg-white/10"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {isActive && (
          <span className="w-2 h-2 rounded-full bg-[#4DD0E1] animate-pulse" />
        )}
      </div>

      <div className="mt-3">
        <span className="text-sm font-bold text-white block group-hover:text-[#5B6CFF] transition-colors">
          {category.name}
        </span>
        <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
          {category.count}
        </span>
      </div>
    </button>
  );
};

