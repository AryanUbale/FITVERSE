import React from "react";
import {
  Activity,
  Dumbbell,
  Clock,
  Flame,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

const ICON_MAP = {
  Activity,
  Dumbbell,
  Clock,
  Flame,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
};

export const StatCard = ({
  icon: IconProp = "Activity",
  value,
  label,
  subtext,
  unit,
  className = "",
  badge,
}) => {
  const Icon = typeof IconProp === "string" ? (ICON_MAP[IconProp] || Activity) : IconProp;

  return (
    <div
      className={`bg-[#111111] border border-white/[0.08] rounded-[20px] p-6 hover:border-[#FFD21F]/30 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[140px] shadow-lg group ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#A1A1A1] uppercase tracking-[0.15em]">
          {label}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#FFD21F] group-hover:bg-[#FFD21F]/10 transition-colors">
          {Icon && <Icon className="w-4 h-4 text-[#FFD21F]" />}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-xs sm:text-sm font-extrabold text-[#A1A1A1]">
              {unit}
            </span>
          )}
        </div>
        {subtext && (
          <p className="text-[11px] text-[#6B6B6B] mt-1 font-medium">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

