import React from "react";
import { EyebrowLabel } from "./EyebrowLabel";

export const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  className = ""
}) => {
  return (
    <div className={`space-y-1.5 ${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-[#FFD21F]">{highlight}</span>
            {title.split(highlight)[1] || ""}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
