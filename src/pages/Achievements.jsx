import React from "react";
import {
  Award,
  Flame,
  Zap,
  Target,
  Crown,
  Clock,
  Smile,
  Dumbbell,
  Home,
  Compass,
  Sunrise,
  Sparkles,
  Lock,
  CheckCircle2
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { achievementsList } from "../data/achievements";
import { PageHeader } from "../components/ui/PageHeader";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { DarkCard } from "../components/ui/DarkCard";

export const Achievements = () => {
  const { unlockedAchievements } = useFitness();

  const iconMap = {
    Flame,
    Zap,
    Award,
    Target,
    Crown,
    Clock,
    Smile,
    Dumbbell,
    Home,
    Compass,
    Sunrise,
    Sparkles
  };

  const unlockedCount = Object.keys(unlockedAchievements || {}).length;
  const totalCount = achievementsList.length || 12;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const currentLevel =
    unlockedCount >= 10 ? 5 : unlockedCount >= 7 ? 4 : unlockedCount >= 4 ? 3 : unlockedCount >= 2 ? 2 : 1;
  const levelTitle =
    currentLevel >= 5
      ? "Legendary Athlete"
      : currentLevel >= 4
      ? "Elite Master"
      : currentLevel >= 3
      ? "Dedicated Veteran"
      : currentLevel >= 2
      ? "Consistent Performer"
      : "Novice Explorer";

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto">
      {/* Header with Level Badge & XP Bar */}
      <DarkCard className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Large Circular Level Badge — Yellow */}
            <div className="relative w-20 h-20 rounded-full bg-[#FFD21F] flex items-center justify-center p-1 shadow-[0_0_30px_rgba(255,210,31,0.4)] shrink-0">
              <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center">
                <span className="text-[10px] font-extrabold uppercase text-[#FFD21F] tracking-widest">
                  LVL
                </span>
                <span className="text-2xl font-black text-[#FFD21F] leading-none">
                  {currentLevel}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <EyebrowLabel>HALL OF MILESTONES</EyebrowLabel>
                <span className="text-xs text-[#6B6B6B]">
                  • {unlockedCount} of {totalCount} Badges Unlocked
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {levelTitle}
              </h1>
              <p className="text-xs text-[#6B6B6B] mt-1 font-medium">
                Milestones dynamically unlocked through physical consistency, PR records, and discipline exploration.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-[#1A1A1A] border border-white/[0.08] flex items-center gap-2.5">
            <Crown className="w-5 h-5 text-[#FFD21F]" />
            <div>
              <span className="text-[10px] font-bold text-[#6B6B6B] uppercase block">
                Rank Status
              </span>
              <span className="text-xs font-extrabold text-white">
                Tier {currentLevel} Athlete
              </span>
            </div>
          </div>
        </div>

        {/* Yellow XP Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#6B6B6B]">XP Progression to Next Tier</span>
            <span className="text-[#FFD21F]">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#1A1A1A] overflow-hidden p-0.5 border border-white/[0.08]">
            <div
              className="h-full rounded-full bg-[#FFD21F] shadow-[0_0_12px_rgba(255,210,31,0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </DarkCard>

      {/* Badges Grid */}
      <div className="space-y-4">
        <EyebrowLabel className="px-1">Milestone Catalog</EyebrowLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {achievementsList.map((badge, idx) => {
            const isUnlocked = Boolean(unlockedAchievements?.[badge.id]);
            const Icon = iconMap[badge.icon] || Award;

            return (
              <div
                key={badge.id}
                className={`rounded-[20px] p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                  isUnlocked
                    ? "bg-[#111111] border border-[#FFD21F]/30 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_8px_30px_rgba(255,210,31,0.15)] group"
                    : "bg-[#111111]/60 border border-white/[0.06] opacity-55 cursor-not-allowed"
                }`}
              >
                {/* Unlocked glow */}
                {isUnlocked && (
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 bg-[#FFD21F]" />
                )}

                {/* Top */}
                <div className="flex items-start justify-between relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform ${
                      isUnlocked
                        ? "bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] group-hover:scale-110 shadow-lg"
                        : "bg-white/[0.04] text-[#6B6B6B]"
                    }`}
                  >
                    {isUnlocked ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5 text-[#6B6B6B]/50" />
                    )}
                  </div>

                  {isUnlocked ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFD21F]/15 text-[#FFD21F] border border-[#FFD21F]/30">
                      {badge.tier || "Bronze"} Tier
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#6B6B6B] bg-white/[0.04] border border-white/[0.08]">
                      Locked
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 mt-4 space-y-1.5">
                  <h4
                    className={`text-base font-bold tracking-tight ${
                      isUnlocked ? "text-white" : "text-[#6B6B6B]"
                    }`}
                  >
                    {badge.title}
                  </h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="relative z-10 pt-3 mt-3 border-t border-white/[0.06] text-[11px] font-semibold">
                  {isUnlocked ? (
                    <span className="text-[#FFD21F] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked • Achieved</span>
                    </span>
                  ) : (
                    <span className="text-[#6B6B6B]/70 italic">
                      Progress hint: {badge.requirementHint || "Continue regular training to unlock"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
