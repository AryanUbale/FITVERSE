import React from "react";

export const YellowDotList = ({ items = [], className = "" }) => {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#A1A1A1] font-medium leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] mt-2 shrink-0 shadow-[0_0_8px_#FFD21F]" />
          <span className="text-slate-200">{item}</span>
        </li>
      ))}
    </ul>
  );
};

