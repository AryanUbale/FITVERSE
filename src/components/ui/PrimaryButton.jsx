import React from "react";

export const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  variant = "yellow", // "yellow" | "ghost"
  icon: Icon,
  className = "",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    yellow:
      "bg-[#FFD21F] hover:bg-[#FFE04D] text-black shadow-[0_0_20px_rgba(255,210,31,0.35)] hover:-translate-y-0.5 active:translate-y-0",
    indigo:
      "bg-[#FFD21F] hover:bg-[#FFE04D] text-black shadow-[0_0_20px_rgba(255,210,31,0.35)] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-white/20 hover:-translate-y-0.5",
    glass:
      "bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-white/20 hover:-translate-y-0.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant] || variants.yellow} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};
