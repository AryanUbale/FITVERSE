import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Download,
  Check,
  Dumbbell,
  Activity,
  HeartPulse,
  Save,
  Trash2,
  Calendar,
  Clock,
  Target,
  Award,
  Zap
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { PageHeader } from "../components/ui/PageHeader";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { DarkCard } from "../components/ui/DarkCard";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { GlassPill } from "../components/ui/GlassPill";

export const Settings = () => {
  const navigate = useNavigate();
  const {
    userProfile,
    setUserProfile,
    activeCategory,
    setCategory,
    resetWorkoutData,
    resetAllToFactoryDefaults,
    loadDemoData,
    workoutHistory,
    calendarSchedule,
    favorites,
    unlockedAchievements,
    setNotification
  } = useFitness();

  const [formData, setFormData] = useState({ ...userProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const shortDays = ["M", "T", "W", "T", "F", "S", "S"];

  const toggleDay = (day) => {
    setFormData((prev) => {
      const current = prev.preferredDays || [];
      const exists = current.includes(day);
      if (exists) {
        if (current.length === 1) return prev;
        return { ...prev, preferredDays: current.filter((d) => d !== day) };
      } else {
        return { ...prev, preferredDays: [...current, day] };
      }
    });
  };

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    setUserProfile(formData);
    setCategory(formData.category);
    setSaveSuccess(true);
    setNotification({
      type: "success",
      title: "Preferences Saved",
      message: "Your profile and workout configuration have been updated."
    });
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportData = () => {
    const backup = {
      userProfile,
      calendarSchedule,
      workoutHistory,
      favorites,
      unlockedAchievements,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fitverse-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification({
      type: "success",
      title: "Backup Exported",
      message: "FITVERSE JSON backup successfully downloaded."
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1440px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <PageHeader
          eyebrow="SYSTEM & ATHLETE PROFILE"
          title="Account Settings"
          subtitle="Configure your training profile, switch workout disciplines, and manage browser storage."
        />
        <div className="flex items-center gap-2">
          <GlassPill label="Local Storage" />
          <YellowButton onClick={handleSaveProfile} className="flex items-center gap-2">
            {saveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saveSuccess ? "Saved!" : "Save Changes"}</span>
          </YellowButton>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <DarkCard className="p-6 text-center space-y-5">
            {/* Avatar */}
            <div className="relative mx-auto w-24 h-24 rounded-full p-1 bg-[#FFD21F]">
              <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FFD21F] border-2 border-[#111111] flex items-center justify-center text-black">
                <Zap className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">{formData.name || "Alex Vance"}</h3>
              <p className="text-xs text-[#6B6B6B] mt-0.5">FITVERSE Athlete</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <GlassPill label={formData.experience || "Intermediate"} />
                <GlassPill label={formData.goal || "Mobility"} />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08] text-left">
              <div className="p-3 rounded-2xl bg-[#1A1A1A] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Workouts</span>
                <span className="text-base font-extrabold text-white">{workoutHistory?.length || 0}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1A1A1A] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Badges</span>
                <span className="text-base font-extrabold text-[#FFD21F]">{Object.keys(unlockedAchievements || {}).length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1A1A1A] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Duration</span>
                <span className="text-base font-extrabold text-white">{formData.preferredDuration || 30}m</span>
              </div>
            </div>

            <YellowButton onClick={handleSaveProfile} className="w-full py-3 flex items-center justify-center gap-2">
              {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? "Changes Saved" : "Save Profile Preferences"}</span>
            </YellowButton>
          </DarkCard>
        </div>

        {/* Right: Settings Cards */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Identity & Discipline */}
            <DarkCard className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/10 text-[#FFD21F] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Athlete Identity & Discipline</h4>
                  <p className="text-[11px] text-[#6B6B6B]">Your name and preferred training category</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/[0.08] text-xs font-semibold text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  Active Training Discipline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "gym", label: "Gym Workouts", icon: Dumbbell },
                    { id: "home", label: "Home Workouts", icon: Activity },
                    { id: "pilates", label: "Pilates Focus", icon: HeartPulse }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-4 rounded-[20px] border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? "bg-[#FFD21F]/10 border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.15)] text-white"
                            : "bg-[#1A1A1A] border-white/[0.06] text-[#A1A1A1] hover:text-white hover:border-white/15"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#FFD21F]/20 text-[#FFD21F]" : "bg-white/[0.05] text-[#6B6B6B]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight text-white">{cat.label}</div>
                          <div className="text-[10px] text-[#6B6B6B]">{isSelected ? "Active Discipline" : "Switch Mode"}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </DarkCard>

            {/* Goals & Experience */}
            <DarkCard className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/10 text-[#FFD21F] flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Goals & Experience Level</h4>
                  <p className="text-[11px] text-[#6B6B6B]">Personalize exercise load, pacing, and rep targets</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  Primary Fitness Objective
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    "Muscle building",
                    "Strength",
                    "General fitness",
                    "Weight management",
                    "Flexibility",
                    "Mobility"
                  ].map((goal) => {
                    const isSelected = formData.goal === goal;
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal })}
                        className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                          isSelected
                            ? "bg-[#FFD21F] text-black border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                            : "bg-[#1A1A1A] border-white/[0.06] text-[#A1A1A1] hover:text-white hover:border-white/15"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  Experience Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Beginner", "Intermediate", "Advanced"].map((exp) => {
                    const isSelected = formData.experience === exp;
                    return (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setFormData({ ...formData, experience: exp })}
                        className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                          isSelected
                            ? "bg-[#FFD21F] text-black border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                            : "bg-[#1A1A1A] border-white/[0.06] text-[#A1A1A1] hover:text-white hover:border-white/15"
                        }`}
                      >
                        {exp}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                  Preferred Session Duration
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {[15, 30, 45, 60].map((dur) => {
                    const isSelected = formData.preferredDuration === dur;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredDuration: dur })}
                        className={`py-3 rounded-xl text-xs font-extrabold border transition-all ${
                          isSelected
                            ? "bg-[#FFD21F] text-black border-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                            : "bg-[#1A1A1A] border-white/[0.06] text-[#A1A1A1] hover:text-white hover:border-white/15"
                        }`}
                      >
                        {dur} Min
                      </button>
                    );
                  })}
                </div>
              </div>
            </DarkCard>

            {/* Schedule */}
            <DarkCard className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/10 text-[#FFD21F] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Weekly Training Schedule</h4>
                  <p className="text-[11px] text-[#6B6B6B]">Select your active workout days</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                {daysList.map((day, idx) => {
                  const isSelected = formData.preferredDays?.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`w-12 h-12 rounded-full font-extrabold text-xs border flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#FFD21F] border-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                          : "bg-[#1A1A1A] border-white/[0.06] text-[#A1A1A1] hover:text-white hover:border-white/20"
                      }`}
                      title={day}
                    >
                      <span>{shortDays[idx]}</span>
                      <span className="text-[9px] font-normal opacity-75">{day.slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
            </DarkCard>
          </form>

          {/* Data & Storage */}
          <DarkCard className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h4 className="text-sm font-extrabold text-white">Browser Data & Storage</h4>
                <p className="text-[11px] text-[#6B6B6B]">100% stored client-side in localStorage</p>
              </div>
              <GlassPill label="Indexed / JSON" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-[20px] bg-[#1A1A1A] border border-white/[0.06] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-[#FFD21F]" />
                    <span>Preload Demo History</span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] mt-1.5 leading-relaxed font-medium">
                    Loads 28 days of authentic training sessions across Gym, Home, and Pilates to preview heatmap, streaks, and charts.
                  </p>
                </div>
                <YellowButton onClick={loadDemoData} className="w-full py-2.5 text-xs">
                  Load 28-Day Sample History
                </YellowButton>
              </div>

              <div className="p-5 rounded-[20px] bg-[#1A1A1A] border border-white/[0.06] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Download className="w-4 h-4 text-[#FFD21F]" />
                    <span>Export Progress Backup</span>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] mt-1.5 leading-relaxed font-medium">
                    Download a JSON copy of all your schedules, workout logs, favorites, and unlocked badges to keep locally.
                  </p>
                </div>
                <GhostButton onClick={handleExportData} className="w-full py-2.5 text-xs">
                  Download JSON Backup
                </GhostButton>
              </div>
            </div>
          </DarkCard>

          {/* Danger Zone */}
          <div className="rounded-[20px] border border-[#E5484D]/25 bg-[#E5484D]/5 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E5484D]/15 text-[#E5484D] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Danger Zone</h4>
                <p className="text-[11px] text-[#E5484D]/80">Irreversible actions on local training data</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset workout history and unlocked achievements? Your preferences and discipline will be kept.")) {
                    resetWorkoutData();
                  }
                }}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-[#E5484D] bg-[#E5484D]/10 border border-[#E5484D]/25 hover:bg-[#E5484D]/20 transition-all"
              >
                Reset Workout History Only
              </button>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#E5484D] hover:bg-[#d13b3b] transition-all"
              >
                Clear All Data & Factory Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirm Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-7 rounded-[24px] bg-[#111111] border border-[#E5484D]/30 text-center space-y-5 animate-fadeIn shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#E5484D]/10 border border-[#E5484D]/25 flex items-center justify-center mx-auto text-[#E5484D]">
              <Trash2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">Confirm Factory Reset?</h3>
              <p className="text-xs text-[#6B6B6B] mt-2 leading-relaxed">
                This will purge all workouts, achievements, custom schedule items, and preferences from this browser. You will be redirected to onboarding.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <GhostButton
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3"
              >
                Cancel
              </GhostButton>
              <button
                type="button"
                onClick={() => {
                  resetAllToFactoryDefaults();
                  navigate("/onboarding");
                }}
                className="flex-1 py-3 rounded-full text-xs font-bold text-white bg-[#E5484D] hover:bg-[#d13b3b] transition-all"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
