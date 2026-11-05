import React from "react";

export const GhostButton = ({
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
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-transparent hover:bg-white/5 text-white font-bold text-xs sm:text-sm tracking-wide border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 text-white shrink-0" />}
      {children}
    </button>
  );
};

