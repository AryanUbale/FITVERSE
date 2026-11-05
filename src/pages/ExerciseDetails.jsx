import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Play,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Dumbbell,
  Clock,
  Sparkles,
  ChevronRight,
  Wind,
  Activity
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { ExerciseVideoPreview } from "../components/video/ExerciseVideoPreview";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { DarkCard } from "../components/ui/DarkCard";
import { StatCard } from "../components/ui/StatCard";
import { Chip } from "../components/ui/Chip";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { GlassPill } from "../components/ui/GlassPill";

export const ExerciseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    allExercises,
    favorites,
    toggleFavorite,
    addScheduledWorkout,
    activeCategory
  } = useFitness();

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'steps' | 'muscles' | 'tips'

  const exercise = allExercises.find((e) => e.id === id) || allExercises[0];
  const isFav = favorites.includes(exercise?.id);

  if (!exercise) {
    return (
      <DarkCard className="p-12 text-center text-[#A1A1A1] max-w-md mx-auto my-12 space-y-4">
        <p>Exercise not found.</p>
        <YellowButton onClick={() => navigate("/exercises")} className="text-xs">
          Return to Exercise Library
        </YellowButton>
      </DarkCard>
    );
  }

  const handleScheduleToday = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    addScheduledWorkout(todayStr, {
      title: `${exercise.name} Focus`,
      category: exercise.category,
      duration: 30,
      exerciseIds: [exercise.id]
    });
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "steps", label: "How to Perform" },
    { id: "muscles", label: "Muscles Worked" },
    { id: "tips", label: "Tips & Mistakes" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1440px] mx-auto pb-16">
      {/* Top Bar: Back & Quick Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(exercise.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isFav
                ? "bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.35)]"
                : "bg-[#111111] border border-white/[0.08] text-[#A1A1A1] hover:text-white"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-black text-black" : "text-[#A1A1A1]"}`} />
            <span>{isFav ? "Favorited" : "Favorite"}</span>
          </button>

          {/* Schedule Today */}
          <GhostButton onClick={handleScheduleToday} icon={Calendar} className="text-xs px-4 py-2">
            Schedule
          </GhostButton>

          {/* Start Exercise Action */}
          <YellowButton
            onClick={() => navigate(`/workout-session?exerciseId=${exercise.id}`)}
            icon={Play}
            className="text-xs px-5 py-2"
          >
            Train Now
          </YellowButton>
        </div>
      </div>

      {/* Main Two-Column Layout (6 cols Left, 6 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 3D Visualizer + Biomechanical StatCards */}
        <div className="lg:col-span-6 space-y-5">
          {/* Video Demo Preview */}
          <ExerciseVideoPreview exercise={exercise} />

          {/* Biomechanical Summary below as StatCards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              label="Equipment"
              value={exercise.equipment?.split(" ")[0] || "Standard"}
              unit={exercise.equipment?.split(" ").slice(1, 2).join(" ") || ""}
              icon={Dumbbell}
              className="min-h-[120px] p-4"
            />
            <StatCard
              label="Volume Target"
              value={`${exercise.recommendedSets || 3}×`}
              unit={`${exercise.recommendedReps || "10"}r`}
              icon={Clock}
              className="min-h-[120px] p-4"
            />
            <StatCard
              label="Difficulty"
              value={exercise.difficulty || "Intermediate"}
              unit=""
              icon={Activity}
              className="min-h-[120px] p-4"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Title with tabs as underlined tab bar + content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title Header with Category & Difficulty Pill */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <EyebrowLabel>{exercise.category?.toUpperCase() || "FITNESS"}</EyebrowLabel>
              <GlassPill label={exercise.difficulty} />
              <span className="text-xs text-[#6B6B6B] font-semibold">
                • {exercise.muscleGroup || "Compound"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              {exercise.name}
            </h1>
          </div>

          {/* Underlined Tab Bar with Yellow Active Underline */}
          <div className="flex items-center gap-6 border-b border-white/[0.08] overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap cursor-pointer ${
                    isActive ? "text-white font-extrabold" : "text-[#A1A1A1] hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FFD21F] shadow-[0_0_8px_#FFD21F]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-fadeIn">
              <DarkCard className="space-y-2 p-5">
                <EyebrowLabel>WHAT IT IS</EyebrowLabel>
                <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                  {exercise.whatItIs || "Precision resistance movement targeting primary kinetic chains."}
                </p>
              </DarkCard>

              <DarkCard className="space-y-2 p-5">
                <EyebrowLabel>WHY IT IS USEFUL (BIOMECHANICS)</EyebrowLabel>
                <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                  {exercise.whyItIsUseful || exercise.benefits || "Builds neuromuscular motor patterns and increases physical force output."}
                </p>
              </DarkCard>

              {(exercise.breathingInstructions || exercise.breathingPattern) && (
                <DarkCard className="p-5 flex items-start gap-3.5">
                  <div className="p-2 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] shrink-0 mt-0.5">
                    <Wind className="w-4 h-4 text-[#FFD21F]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white mb-0.5">Breathing Rhythm</h5>
                    <p className="text-xs text-[#A1A1A1] leading-relaxed">
                      {exercise.breathingInstructions || exercise.breathingPattern}
                    </p>
                  </div>
                </DarkCard>
              )}
            </div>
          )}

          {/* TAB 2: Steps (Numbered vertical list with yellow numbers) */}
          {activeTab === "steps" && (
            <div className="space-y-4 animate-fadeIn">
              {exercise.startingPosition && (
                <DarkCard className="p-5">
                  <EyebrowLabel>STARTING POSITION</EyebrowLabel>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed mt-1">
                    {exercise.startingPosition}
                  </p>
                </DarkCard>
              )}

              <DarkCard className="p-6 space-y-4">
                <EyebrowLabel>STEP-BY-STEP EXECUTION</EyebrowLabel>
                <div className="space-y-4">
                  {(exercise.stepByStep || exercise.stepByStepExecution || []).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
                      {/* Yellow Number Circle */}
                      <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-black font-extrabold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,210,31,0.3)] text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200">{step}</span>
                    </div>
                  ))}
                </div>
              </DarkCard>

              {(exercise.correctPosture || exercise.movementControlTips) && (
                <DarkCard className="p-5">
                  <EyebrowLabel>CORRECT ALIGNMENT & POSTURE</EyebrowLabel>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed mt-1">
                    {exercise.correctPosture || exercise.movementControlTips}
                  </p>
                </DarkCard>
              )}
            </div>
          )}

          {/* TAB 3: Muscles Worked (Primary yellow chips, secondary gray chips) */}
          {activeTab === "muscles" && (
            <div className="space-y-4 animate-fadeIn">
              <DarkCard className="p-6 space-y-5">
                <EyebrowLabel>TARGET ANATOMICAL REGIONS</EyebrowLabel>

                {/* Primary Muscles (Yellow Chips) */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white block">
                    Primary Drivers (Agonists)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(exercise.targetMuscles || exercise.musclesTargeted?.primary || []).map((m, idx) => (
                      <Chip key={idx} label={m} selected={true} />
                    ))}
                  </div>
                </div>

                {/* Secondary Muscles (Gray Chips) */}
                <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                  <span className="text-xs font-bold text-[#A1A1A1] block">
                    Secondary & Stabilizers (Synergists)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(exercise.secondaryMuscles || exercise.musclesTargeted?.secondary || []).map((m, idx) => (
                      <Chip key={idx} label={m} selected={false} />
                    ))}
                  </div>
                </div>
              </DarkCard>

              {/* Household Substitutes / Variations */}
              {(exercise.alternatives?.length > 0 || exercise.householdSubstitute) && (
                <DarkCard className="p-5 space-y-2">
                  <EyebrowLabel>MOVEMENT VARIATIONS & ALTERNATIVES</EyebrowLabel>
                  {exercise.householdSubstitute && (
                    <p className="text-xs text-[#A1A1A1]">
                      <strong className="text-white">Household Swap:</strong> {exercise.householdSubstitute}
                    </p>
                  )}
                  {exercise.alternatives && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exercise.alternatives.map((alt, i) => (
                        <Chip key={i} label={alt} selected={false} size="sm" />
                      ))}
                    </div>
                  )}
                </DarkCard>
              )}
            </div>
          )}

          {/* TAB 4: Tips & Mistakes (DarkCards with yellow or muted-red border) */}
          {activeTab === "tips" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Common Mistakes (Muted-Red Left Border #E5484D) */}
              <div className="space-y-3">
                <EyebrowLabel className="text-[#E5484D]">COMMON BIOMECHANICAL MISTAKES</EyebrowLabel>
                {(exercise.commonMistakes || []).map((mistake, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[16px] bg-[#111111] border border-white/[0.08] border-l-4 border-l-[#E5484D] flex items-start gap-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-[#E5484D] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-relaxed font-medium">
                      {mistake}
                    </span>
                  </div>
                ))}
              </div>

              {/* Safety Tips (Yellow Left Border #FFD21F) */}
              <div className="space-y-3 pt-2">
                <EyebrowLabel>INJURY PREVENTION & SAFETY</EyebrowLabel>
                {(exercise.safetyTips || []).map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[16px] bg-[#111111] border border-white/[0.08] border-l-4 border-l-[#FFD21F] flex items-start gap-3"
                  >
                    <Shield className="w-4 h-4 text-[#FFD21F] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-relaxed font-medium">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky YellowButton "Start Exercise" */}
          <div className="pt-4 sticky bottom-6 z-20">
            <YellowButton
              onClick={() => navigate(`/workout-session?exerciseId=${exercise.id}`)}
              className="w-full py-4 text-xs uppercase tracking-wider"
              icon={Play}
            >
              Start Exercise Training Now
            </YellowButton>
          </div>
        </div>
      </div>
    </div>
  );
};
