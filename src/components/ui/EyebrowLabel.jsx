import React from "react";

export const EyebrowLabel = ({ children, className = "" }) => {
  return (
    <span className={`inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FFD21F] ${className}`}>
      {children}
    </span>
  );
};

