import React from "react";
import { GlassPill } from "./GlassPill";

export const CutoutCard = ({
  title,
  subtitle,
  category = "Full Body Workout",
  duration = "30 Min",
  calories = "450Kcal",
  image,
  onClick,
  className = ""
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#111111] p-5 cursor-pointer transition-all duration-300 hover:border-[#FFD21F]/40 hover:-translate-y-1 shadow-lg flex flex-col justify-between min-h-[220px] ${className}`}
    >
      <div className="relative z-10 space-y-2">
        <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[0.2em] block">
          {category}
        </span>
        <h3 className="text-xl font-extrabold text-white group-hover:text-[#FFD21F] transition-colors leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#A1A1A1] max-w-[65%] line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Athlete Image (Desaturated, dark contrast) */}
      {image && (
        <div className="absolute right-0 bottom-0 w-36 h-48 overflow-hidden pointer-events-none">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top grayscale contrast-125 opacity-40 group-hover:opacity-60 transition-all duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>
      )}

      {/* Meta Pills */}
      <div className="relative z-10 pt-4 flex items-center gap-2">
        {duration && <GlassPill label={duration} />}
        {calories && <GlassPill label={calories} />}
      </div>
    </div>
  );
};
