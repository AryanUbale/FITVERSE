import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Flame, Play } from "lucide-react";

export const WorkoutCard = ({ workout }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: workout.themeColor }}
      onClick={() => navigate("/workout-session")}
      className="relative rounded-[28px] p-6 min-h-[220px] text-white shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 32px -8px ${workout.themeColor}88`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Background blurred circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />

      {/* Overlapping Cutout Athlete */}
      <div className="absolute bottom-0 right-[-10px] w-36 sm:w-44 h-[95%] flex items-end justify-end pointer-events-none z-10">
        <img
          src={workout.athleteImg}
          alt={workout.title}
          className="h-full object-cover object-top drop-shadow-[0_12px_14px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
          style={{
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 80%, transparent 100%)"
          }}
        />
      </div>

      {/* Top Details */}
      <div className="z-20 max-w-[65%]">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-black/60 block mb-1">
          {workout.subtitle}
        </span>
        <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-slate-950">
          {workout.title}
        </h4>
      </div>

      {/* Bottom Pills + Play action */}
      <div className="z-20 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/25 backdrop-blur-md text-[11px] font-bold text-white">
            <Clock className="w-3 h-3" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/25 backdrop-blur-md text-[11px] font-bold text-white">
            <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>{workout.calories}</span>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
          <Play className="w-3.5 h-3.5 fill-slate-950 translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};

