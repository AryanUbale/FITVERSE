import React from "react";

export const GlassPill = ({
  label,
  icon,
  color = "#FFD21F",
  className = ""
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#161616] border border-white/[0.08] text-[#A1A1A1] ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="text-white">{label}</span>
    </span>
  );
};
