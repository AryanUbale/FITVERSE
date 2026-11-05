import React from "react";

export const Chip = ({
  label,
  selected = false,
  onClick,
  icon: Icon,
  className = "",
  size = "md",
}) => {
  const sizeClasses = size === "sm" ? "px-3 py-1 text-[11px]" : "px-4 py-1.5 text-xs";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full font-bold transition-all duration-150 cursor-pointer ${sizeClasses} ${
        selected
          ? "bg-[#FFD21F] text-black shadow-[0_0_15px_rgba(255,210,31,0.35)]"
          : "bg-[#161616] text-[#A1A1A1] border border-white/[0.08] hover:text-white hover:border-white/20"
      } ${className}`}
    >
      {Icon && <Icon className={`w-3.5 h-3.5 ${selected ? "text-black" : "text-[#A1A1A1]"}`} />}
      <span>{label}</span>
    </button>
  );
};

