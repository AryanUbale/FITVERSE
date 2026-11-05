import React from "react";

export const DarkCard = ({
  children,
  className = "",
  onClick,
  hoverable = true,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#111111] border border-white/[0.08] rounded-[20px] p-6 transition-all duration-200 ${
        hoverable ? "hover:border-[#FFD21F]/30 hover:-translate-y-1 hover:shadow-2xl" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

