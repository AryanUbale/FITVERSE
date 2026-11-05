import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers,
  Calendar,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  X,
  Play,
  Dumbbell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFitness } from "../context/FitnessContext";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { PageHeader } from "../components/ui/PageHeader";
import { DarkCard } from "../components/ui/DarkCard";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { GlassPill } from "../components/ui/GlassPill";

export const WorkoutPlans = () => {
  const navigate = useNavigate();
  const {
    activeCategory,
    categoryPlans,
    activePlan,
    setActivePlan,
    addScheduledWorkout,
    allExercises
  } = useFitness();

  const [selectedPlanDetail, setSelectedPlanDetail] = useState(null);
  const [openDayIdx, setOpenDayIdx] = useState(0);

  const athleteImgs = [
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
  ];

  const handleSelectPlan = (plan) => {
    setActivePlan(plan);
  };

  const handleScheduleEntirePlan = (plan) => {
    const today = new Date();
    (plan.schedule || []).forEach((item, idx) => {
      const exIds = item.exerciseIds || item.exercises || [];
      if (exIds.length > 0) {
        const d = new Date(today);
        d.setDate(today.getDate() + idx);
        const dateStr = d.toISOString().split("T")[0];
        addScheduledWorkout(dateStr, {
          title: `${plan.title} - ${item.focus}`,
          category: plan.category,
          duration: 45,
          exerciseIds: exIds
        });
      }
    });
    navigate("/calendar");
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-[1440px] mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        eyebrow={`${activeCategory.toUpperCase()} PERIODIZATION`}
        title="Workout Plans & Splits"
        highlight="Splits"
        subtitle="Structured multi-week periodization designed for progressive overload and optimal recovery."
      >
        {activePlan && (
          <div className="p-3 rounded-[16px] bg-[#111111] border border-white/[0.08] flex items-center gap-3 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">
                Active Enrolled Program
              </span>
              <span className="text-xs font-bold text-white truncate max-w-[200px] block">
                {activePlan.title}
              </span>
            </div>
          </div>
        )}
      </PageHeader>

      {/* 2. PLANS GRID: PhotoCards with dark photos, gray meta pills, weekly mini-strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryPlans.map((plan, idx) => {
          const isActive = activePlan?.id === plan.id;
          const athleteImg = athleteImgs[idx % athleteImgs.length];

          return (
            <div
              key={plan.id}
              className={`rounded-[20px] overflow-hidden border bg-[#111111] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-2xl ${
                isActive ? "border-[#FFD21F] shadow-[0_0_20px_rgba(255,210,31,0.2)]" : "border-white/[0.08] hover:border-white/20"
              }`}
            >
              {/* Photo Area */}
              <div className="relative h-60 w-full overflow-hidden bg-black">
                <img
                  src={athleteImg}
                  alt={plan.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Top Meta Pills */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-[#FFD21F] border border-white/10">
                      {plan.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#A1A1A1] border border-white/10">
                      {plan.daysPerWeek} Days / Wk
                    </span>
                  </div>

                  {isActive && (
                    <span className="px-3 py-1 rounded-full bg-[#FFD21F] text-black text-[10px] font-black uppercase tracking-widest shadow-md">
                      Active Split
                    </span>
                  )}
                </div>

                {/* Bottom Title on Photo */}
                <div className="absolute bottom-3 left-5 right-5 z-10">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-[#FFD21F] transition-colors leading-tight">
                    {plan.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#A1A1A1] leading-relaxed line-clamp-2">
                  {plan.description}
                </p>

                {/* Weekly Schedule Mini-Strip with Yellow Active Days */}
                <div className="p-3.5 rounded-[16px] bg-[#161616] border border-white/[0.05] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] block">
                    Weekly Rhythm
                  </span>
                  <div className="space-y-1.5">
                    {(plan.schedule || []).slice(0, 3).map((item, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#FFD21F]">{item.day}:</span>
                        <span className="truncate max-w-[160px] text-[#A1A1A1] font-medium">{item.focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: GhostButton View Plan & YellowButton Activate */}
                <div className="flex items-center gap-3 pt-2">
                  <GhostButton
                    onClick={() => {
                      setSelectedPlanDetail(plan);
                      setOpenDayIdx(0);
                    }}
                    className="flex-1 py-2 text-xs"
                  >
                    View Plan
                  </GhostButton>

                  <YellowButton
                    onClick={() => handleSelectPlan(plan)}
                    className="flex-1 py-2 text-xs"
                    disabled={isActive}
                  >
                    {isActive ? "Active" : "Activate"}
                  </YellowButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. DETAIL MODAL (Spring Open/Close, Dark Header, Yellow Numbers) */}
      <AnimatePresence>
        {selectedPlanDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-[#111111] w-full max-w-3xl rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Photo Header */}
              <div className="relative p-6 sm:p-8 bg-[#161616] border-b border-white/[0.08]">
                <button
                  onClick={() => setSelectedPlanDetail(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-black/60 hover:bg-black text-[#A1A1A1] hover:text-white transition-colors cursor-pointer border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <EyebrowLabel>{selectedPlanDetail.level}</EyebrowLabel>
                  <span className="text-xs text-[#A1A1A1] font-semibold">
                    • {selectedPlanDetail.daysPerWeek} Days / Week
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {selectedPlanDetail.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2 leading-relaxed max-w-xl font-normal">
                  {selectedPlanDetail.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-5">
                  <YellowButton
                    onClick={() => {
                      handleSelectPlan(selectedPlanDetail);
                      setSelectedPlanDetail(null);
                    }}
                    icon={Check}
                    className="text-xs px-6 py-2"
                  >
                    Set as Active Split
                  </YellowButton>

                  <GhostButton
                    onClick={() => {
                      handleScheduleEntirePlan(selectedPlanDetail);
                      setSelectedPlanDetail(null);
                    }}
                    icon={Calendar}
                    className="text-xs px-6 py-2"
                  >
                    Schedule to Calendar
                  </GhostButton>
                </div>
              </div>

              {/* Day-by-Day Accordion with Yellow Numbers */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-3 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] block mb-2">
                  Weekly Program Schedule
                </span>

                {(selectedPlanDetail.schedule || []).map((dayItem, dIdx) => {
                  const isOpen = openDayIdx === dIdx;
                  const exerciseIds = dayItem.exerciseIds || dayItem.exercises || [];

                  return (
                    <div
                      key={dIdx}
                      className="rounded-[16px] bg-[#161616] border border-white/[0.05] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDayIdx(isOpen ? null : dIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#FFD21F] text-black text-xs font-black flex items-center justify-center shrink-0">
                            {dIdx + 1}
                          </span>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              {dayItem.day}
                            </span>
                            <span className="text-xs text-[#A1A1A1]">
                              {dayItem.focus} • {exerciseIds.length} exercises
                            </span>
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 text-[#A1A1A1] transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </button>

                      {/* Expandable Exercise Rows Linking to /exercise/:id */}
                      {isOpen && (
                        <div className="p-4 pt-0 space-y-2 border-t border-white/[0.05] mt-1">
                          {exerciseIds.map((exId, eIdx) => {
                            const ex = allExercises.find((item) => item.id === exId) || {
                              id: exId,
                              name: exId.replace(/-/g, " "),
                              equipment: "Standard"
                            };

                            return (
                              <div
                                key={eIdx}
                                onClick={() => {
                                  setSelectedPlanDetail(null);
                                  navigate(`/exercise/${ex.id}`);
                                }}
                                className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/[0.05] hover:border-[#FFD21F]/40 cursor-pointer transition-all group"
                              >
                                <div className="flex items-center gap-2.5">
                                  <Dumbbell className="w-3.5 h-3.5 text-[#FFD21F]" />
                                  <span className="text-xs font-bold text-white group-hover:text-[#FFD21F] transition-colors">
                                    {ex.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-[#6B6B6B]">{ex.equipment}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:text-[#FFD21F] group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
