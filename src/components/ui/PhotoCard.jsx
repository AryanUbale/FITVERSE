import React from "react";

export const PhotoCard = ({
  image,
  title,
  subtitle,
  badge,
  onClick,
  className = "",
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#111111] cursor-pointer transition-all duration-300 hover:border-[#FFD21F]/40 hover:-translate-y-1 ${className}`}
    >
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-75 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-[#FFD21F]">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-1.5 bg-[#111111] relative z-10">
        <h3 className="text-lg font-extrabold text-white group-hover:text-[#FFD21F] transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#A1A1A1] leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

