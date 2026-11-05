import React from "react";

export const YellowButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE04D] text-black font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(255,210,31,0.45)] active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 text-black shrink-0" />}
      {children}
    </button>
  );
};

