import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Clock, Dumbbell, ShieldCheck, Check } from "lucide-react";

export const TodayWorkout = ({ workout }) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#4F5BFF] via-[#5B6CFF] to-[#6C3CE0] p-6 lg:p-7 text-white shadow-2xl flex flex-col justify-between min-h-[380px] group transition-all duration-300 hover:shadow-glow-indigo">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="z-10 max-w-[65%]">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#4DD0E1] block mb-1">
          Today's Workout
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-white">
          {workout.title}
        </h3>

        {/* Glass pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-md text-[11px] font-bold border border-white/20">
            <Clock className="w-3 h-3 text-[#4DD0E1]" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-md text-[11px] font-bold border border-white/20">
            <Dumbbell className="w-3 h-3 text-white" />
            <span>{workout.exercisesCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-md text-[11px] font-bold border border-white/20">
            <ShieldCheck className="w-3 h-3 text-[#2ED8A3]" />
            <span>{workout.level}</span>
          </div>
        </div>
      </div>

      {/* Overlapping Cutout Athlete on Right */}
      <div className="absolute top-2 right-[-15px] sm:right-[-10px] w-48 sm:w-56 h-full flex items-end justify-end pointer-events-none z-0">
        <img
          src={workout.athleteImg}
          alt="Athlete"
          className="h-[88%] object-cover object-top opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] mask-gradient transform group-hover:scale-105 transition-transform duration-500"
          style={{
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 75%, transparent 100%)"
          }}
        />
      </div>

      {/* Exercise items list */}
      <div className="z-10 mt-5 space-y-2 max-w-[70%]">
        {workout.exercises.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-2 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#4DD0E1]/25 flex items-center justify-center text-[10px] text-[#4DD0E1] font-bold">
                {idx + 1}
              </span>
              <span className="font-semibold text-white">{item.name}</span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium">{item.duration}</span>
          </div>
        ))}
      </div>

      {/* Action Button: Start Workout Now */}
      <div className="z-10 mt-6 pt-2">
        <button
          onClick={() => navigate("/workout-session")}
          className="w-full py-3.5 px-5 rounded-2xl bg-white text-[#14132B] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:bg-slate-100 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
        >
          <Play className="w-4 h-4 fill-[#14132B] text-[#14132B]" />
          <span>Start Workout Now</span>
        </button>
      </div>
    </div>
  );
};

