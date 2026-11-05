import React from "react";

export const GlassBadge = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-[#111111]/80 backdrop-blur-md border border-white/[0.08] rounded-[16px] px-4 py-3 shadow-2xl text-white ${className}`}
    >
      {children}
    </div>
  );
};

