import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Dumbbell,
  Calendar,
  BarChart3,
  Award,
  Bot,
  Settings,
  Layers,
  ChevronLeft,
  Zap,
  Menu,
  X,
  Shield,
  Activity,
  HeartPulse,
  Repeat
} from "lucide-react";
import { useFitness } from "../../context/FitnessContext";
import { mockTrainingData } from "../../data/mockTrainingData";

export const Sidebar = () => {
  const { userProfile, activeCategory, setCategory } = useFitness();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Workout Plans", path: "/plans", icon: Layers },
    { name: "Exercise Library", path: "/exercises", icon: Dumbbell },
    { name: "Home Alternatives", path: "/equipment-alternatives", icon: Repeat },
    { name: "Calendar & Schedule", path: "/calendar", icon: Calendar },
    { name: "Achievements", path: "/achievements", icon: Award },
    { name: "Virtual Trainer", path: "/trainer", icon: Bot },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const categoryOptions = [
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "home", label: "Home", icon: Activity },
    { id: "pilates", label: "Pilates", icon: HeartPulse },
  ];

  const user = mockTrainingData.user;

  return (
    <>
      {/* Mobile Menu Hamburger Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-full bg-[#111111] border border-white/10 text-white shadow-2xl backdrop-blur-md"
        >
          {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container: 260px fixed width, pure black with right border */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-white/[0.08] bg-black ${collapsed ? "w-20" : "w-[260px]"
          } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top: Logo & Nav */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 py-6 scrollbar-none">
          {/* FitVerse Brand Logo with Dumbbell */}
          <div className="flex items-center justify-between pb-6 px-1">
            {!collapsed && (
              <>
                <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD21F] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,210,31,0.35)] shrink-0 transition-transform group-hover:scale-105">
                    <Dumbbell className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                    Fit<span className="text-[#FFD21F]">Verse</span>
                  </span>
                </NavLink>

                <button
                  onClick={() => setCollapsed(true)}
                  className="hidden lg:flex p-1.5 rounded-full hover:bg-[#161616] text-[#6B6B6B] hover:text-white transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}

            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="w-10 h-10 mx-auto rounded-full bg-[#FFD21F] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,210,31,0.4)] hover:scale-105 transition-transform cursor-pointer"
                title="Expand sidebar"
              >
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Discipline Switcher Tabs (active: yellow pill with black text) */}
          {!collapsed ? (
            <div className="mb-6 p-1 bg-[#111111] rounded-full border border-white/[0.08] flex items-center gap-1">
              {categoryOptions.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex-1 py-1.5 px-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${isActive
                      ? "bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                      : "text-[#A1A1A1] hover:text-white"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mb-6 flex flex-col items-center gap-1.5 py-1">
              {categoryOptions.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isActive
                      ? "bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                      : "text-[#A1A1A1] hover:text-white hover:bg-[#161616]"
                      }`}
                    title={cat.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all relative ${isActive
                    ? "text-white bg-[#111111] font-bold"
                    : "text-[#A1A1A1] hover:text-white hover:bg-[#111111]/60"
                    }`}
                  title={collapsed ? link.name : undefined}
                >
                  {/* Yellow Left Bar on Active Item */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#FFD21F] rounded-r-full shadow-[0_0_8px_#FFD21F]" />
                  )}

                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-[#FFD21F]" : "text-[#A1A1A1]"
                      }`}
                  />
                  {!collapsed && <span className="truncate">{link.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
