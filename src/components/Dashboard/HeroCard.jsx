import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Flame, Clock, Sparkles } from "lucide-react";

export const HeroCard = ({ hero }) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-r from-[#4F5BFF] to-[#6C3CE0] p-6 lg:p-8 text-white shadow-2xl flex flex-col justify-between min-h-[260px] group transition-all duration-300 hover:shadow-glow-indigo">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Overlapping Cutout Athlete */}
      <div className="absolute -bottom-2 right-4 sm:right-10 w-52 sm:w-64 h-[115%] flex items-end justify-end pointer-events-none z-10">
        <img
          src={hero.athleteImg}
          alt={hero.title}
          className="h-full object-cover object-top drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
          style={{
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 80%, transparent 100%)"
          }}
        />
      </div>

      {/* Top Tag & Title */}
      <div className="z-20 max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-white border border-white/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#4DD0E1]" />
          <span>Top Training</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
          {hero.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium max-w-xs">
          {hero.subtitle}
        </p>

        {/* Stat Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-bold border border-white/15">
            <Clock className="w-3.5 h-3.5 text-[#4DD0E1]" />
            <span>{hero.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-bold border border-white/15">
            <Flame className="w-3.5 h-3.5 text-[#FF5C5C]" />
            <span>{hero.calories}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-bold border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#2ED8A3]" />
            <span>{hero.intensity}</span>
          </div>
        </div>
      </div>

      {/* Bottom Start Action Button */}
      <div className="z-20 mt-6">
        <button
          onClick={() => navigate("/workout-session")}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white text-[#14132B] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:bg-slate-100 hover:shadow-2xl transition-all duration-200 group-hover:scale-105"
        >
          <div className="w-6 h-6 rounded-full bg-[#4F5BFF] flex items-center justify-center">
            <Play className="w-3 h-3 fill-white text-white translate-x-0.5" />
          </div>
          <span>Start Workout</span>
        </button>
      </div>
    </div>
  );
};

