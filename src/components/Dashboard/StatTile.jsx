import React from "react";
import { Dumbbell, Clock, Flame, CheckCircle2 } from "lucide-react";

const iconMap = {
  Dumbbell,
  Clock,
  Flame,
  CheckCircle2
};

export const StatTile = ({ label, value, unit, iconName, bgColor, shadowGlow }) => {
  const Icon = iconMap[iconName] || Dumbbell;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="p-6 rounded-[28px] text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden group"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 28px -6px ${shadowGlow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Decorative blurred background orb */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

      {/* Top: Icon in frosted glass pill + label */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs font-bold tracking-wide uppercase opacity-90">
          {label}
        </span>
        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-sm">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Bottom: Big Bold Stat Value + Unit */}
      <div className="z-10 mt-3 flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold opacity-85">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

