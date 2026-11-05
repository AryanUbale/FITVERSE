import React from "react";
import { EyebrowLabel } from "./EyebrowLabel";

export const PageHeader = ({ eyebrow, title, highlight, subtitle, className = "", children }) => {
  return (
    <div className={`space-y-2 pb-2 border-b border-white/[0.08] ${className}`}>
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {highlight ? (
              <>
                {title.split(highlight)[0]}
                <span className="text-[#FFD21F]">{highlight}</span>
                {title.split(highlight)[1] || ""}
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[#A1A1A1] max-w-2xl font-normal leading-relaxed mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </div>
  );
};

