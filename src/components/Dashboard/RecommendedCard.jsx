import React from "react";
import { Play, Flame, Clock, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockTrainingData } from "../../data/mockTrainingData";

export const RecommendedCard = () => {
  return (
    <div className="space-y-4">
      {/* Header with "See All" Link */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#4DD0E1] uppercase block">
            Curated Classes
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Recommended <span className="text-[#4F5BFF]">Classes</span>
          </h3>
        </div>
        <Link
          to="/exercises"
          className="flex items-center gap-1 text-xs font-bold text-[#4F5BFF] hover:text-[#5B6CFF] transition-colors group"
        >
          <span>See All</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Horizontal Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTrainingData.recommendedClasses.map((item) => (
          <div
            key={item.id}
            className="surface-card p-5 rounded-[28px] border border-white/[0.06] hover:border-[#4F5BFF]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-indigo flex flex-col sm:flex-row items-center gap-5 group"
          >
            {/* Class Image Preview with Play Overlay */}
            <div className="relative w-full sm:w-32 h-32 rounded-[20px] overflow-hidden shrink-0 bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#4F5BFF] text-white flex items-center justify-center shadow-glow-indigo transition-transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#4DD0E1] border border-white/10">
                {item.badge}
              </span>
            </div>

            {/* Class Details */}
            <div className="flex-1 space-y-2 text-left w-full">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Instructor: {item.instructor}
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#4F5BFF] transition-colors leading-snug">
                {item.title}
              </h4>

              {/* Stats Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="glass-pill text-[11px] text-slate-300 flex items-center gap-1.5 px-2.5 py-1">
                  <Clock className="w-3 h-3 text-[#4DD0E1]" />
                  <span>{item.duration}</span>
                </span>
                <span className="glass-pill text-[11px] text-slate-300 flex items-center gap-1.5 px-2.5 py-1">
                  <Flame className="w-3 h-3 text-[#FF5C5C]" />
                  <span>{item.calories}</span>
                </span>
                <span className="glass-pill text-[11px] text-slate-300 flex items-center gap-1.5 px-2.5 py-1">
                  <Award className="w-3 h-3 text-[#2ED8A3]" />
                  <span>{item.level}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

