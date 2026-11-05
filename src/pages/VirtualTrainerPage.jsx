import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Search,
  Sparkles,
  Flame,
  CheckCircle2,
  HelpCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Shield,
  Dumbbell,
  Play,
  HeartPulse,
  Award,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trainerKnowledge } from "../data/trainerKnowledge";
import { useFitness } from "../context/FitnessContext";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { PageHeader } from "../components/ui/PageHeader";
import { DarkCard } from "../components/ui/DarkCard";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { GlassPill } from "../components/ui/GlassPill";

export const VirtualTrainerPage = () => {
  const navigate = useNavigate();
  const { userProfile, activeCategory, activePlan } = useFitness();

  const [faqSearch, setFaqSearch] = useState("");
  const [selectedWarmup, setSelectedWarmup] = useState(trainerKnowledge.warmupRoutines[0]);
  const [selectedCooldown, setSelectedCooldown] = useState(trainerKnowledge.cooldownRoutines[0]);
  const [expandedFaq, setExpandedFaq] = useState(trainerKnowledge.faqs[0]?.id || null);

  const filteredFaqs = trainerKnowledge.faqs.filter((faq) => {
    if (!faqSearch) return true;
    const q = faqSearch.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1440px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <PageHeader
          eyebrow="INTELLIGENT COACHING ENGINE"
          title="Virtual Trainer"
          subtitle="Biomechanical recommendations, warm-up sequencing, recovery protocols, and instant exercise guidance."
        />
        <div className="flex items-center gap-2">
          <GlassPill label="Advisor Active" icon={<Zap className="w-3.5 h-3.5 text-[#FFD21F]" />} />
          <GlassPill label={userProfile.experience || "Intermediate"} />
        </div>
      </div>

      {/* Coaching Brief Hero */}
      <div className="relative rounded-[24px] overflow-hidden bg-[#111111] border border-[#FFD21F]/20 p-6 sm:p-10 shadow-[0_0_40px_rgba(255,210,31,0.08)]">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#FFD21F]/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#FFD21F]/10 text-[11px] font-bold uppercase tracking-wider text-[#FFD21F] flex items-center gap-1.5 border border-[#FFD21F]/25">
                <Bot className="w-3.5 h-3.5" />
                Daily Directive • {userProfile.name || "Athlete"}
              </span>
              <GlassPill label={activePlan?.title || "Custom Split"} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Focus on Progressive Tension & Eccentric Control
            </h2>

            <p className="text-sm sm:text-base text-[#A1A1A1] font-medium leading-relaxed max-w-2xl">
              You are currently enrolled in the <strong className="text-white underline decoration-[#FFD21F]">{activePlan?.title || "Custom Split"}</strong>.
              Remember that lowering under 2–3 seconds eccentric control triggers up to 40% greater hypertrophy and protects connective joints compared to hurried repetitions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <YellowButton onClick={() => navigate("/workout-session")} className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-black" />
                <span>Launch Today's Session</span>
              </YellowButton>
              <GhostButton onClick={() => navigate("/exercises")}>
                Explore Movement Library
              </GhostButton>
            </div>
          </div>

          {/* Right: Coach Image */}
          <div className="lg:col-span-4 hidden lg:flex justify-end items-end relative h-64">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full bg-[#FFD21F]/10 blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80"
                alt="Trainer Coach"
                className="w-full h-full object-cover object-top rounded-3xl grayscale contrast-125 brightness-75 border border-white/[0.08] shadow-2xl"
              />
              <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/[0.08] text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFD21F] text-black font-extrabold flex items-center justify-center text-xs">
                  CPT
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Coach Marcus Vance</div>
                  <div className="text-[10px] text-[#6B6B6B]">NASM Certified Biomechanist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-Up & Cool-Down */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warm-Up */}
        <DarkCard className="p-6 sm:p-7 space-y-5 hover:border-[#FFD21F]/20 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FFD21F]/10 border border-[#FFD21F]/25 flex items-center justify-center text-[#FFD21F]">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Dynamic Warm-Up</h3>
                <span className="text-[11px] text-[#6B6B6B]">Pre-workout neuromuscular activation</span>
              </div>
            </div>
            <GlassPill label={selectedWarmup.duration} icon={<Clock className="w-3 h-3 text-[#FFD21F]" />} />
          </div>

          {/* Routine Switcher */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {trainerKnowledge.warmupRoutines.map((w, idx) => {
              const active = selectedWarmup.name === w.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedWarmup(w)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                      : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {w.name.split(" ")[0]} Routine
                </button>
              );
            })}
          </div>

          {/* Steps */}
          <div className="p-5 rounded-[20px] bg-[#1A1A1A] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{selectedWarmup.name}</h4>
              <span className="text-[10px] text-[#FFD21F] font-semibold">{selectedWarmup.steps.length} movements</span>
            </div>

            <div className="space-y-2.5">
              {selectedWarmup.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <div className="w-5 h-5 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-[#A1A1A1] font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </DarkCard>

        {/* Cool-Down */}
        <DarkCard className="p-6 sm:p-7 space-y-5 hover:border-[#FFD21F]/20 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FFD21F]/10 border border-[#FFD21F]/25 flex items-center justify-center text-[#FFD21F]">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Post-Workout Cool-Down</h3>
                <span className="text-[11px] text-[#6B6B6B]">Parasympathetic reset & flexibility</span>
              </div>
            </div>
            <GlassPill label={selectedCooldown.duration} icon={<Clock className="w-3 h-3 text-[#FFD21F]" />} />
          </div>

          {/* Routine Switcher */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {trainerKnowledge.cooldownRoutines.map((c, idx) => {
              const active = selectedCooldown.name === c.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCooldown(c)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#FFD21F] text-black shadow-[0_0_12px_rgba(255,210,31,0.3)]"
                      : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {c.name.split(" ")[0]} Routine
                </button>
              );
            })}
          </div>

          {/* Steps */}
          <div className="p-5 rounded-[20px] bg-[#1A1A1A] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">{selectedCooldown.name}</h4>
              <span className="text-[10px] text-[#FFD21F] font-semibold">{selectedCooldown.steps.length} stretches</span>
            </div>

            <div className="space-y-2.5">
              {selectedCooldown.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <div className="w-5 h-5 rounded-full bg-[#FFD21F]/15 text-[#FFD21F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-[#A1A1A1] font-medium leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </DarkCard>
      </div>

      {/* Biomechanical Principles Grid */}
      <div className="space-y-4">
        <PageHeader
          eyebrow="SPORTS SCIENCE KNOWLEDGE"
          title="Biomechanical Principles"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainerKnowledge.dailyRecommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111111] p-6 rounded-[20px] border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-[#FFD21F]/30 transition-all shadow-md group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#FFD21F]/10 text-[#FFD21F] border border-[#FFD21F]/20">
                    {rec.category}
                  </span>
                  <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider">
                    {rec.tag}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-white group-hover:text-[#FFD21F] transition-colors leading-snug">
                  {rec.title}
                </h4>

                <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                  {rec.advice}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#6B6B6B]">
                <span className="font-semibold">Evidence Level</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#FFD21F]" /> Peer-Reviewed
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <DarkCard className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <EyebrowLabel>KNOWLEDGE BASE & PROTOCOLS</EyebrowLabel>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              Ask the Virtual Trainer
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
              Instant answers regarding soreness, breathing patterns, progressive overload cadences, and joint mobility.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search soreness, breathing, rest..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/[0.08] text-xs font-semibold text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]/30 transition-all"
            />
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-[20px] border transition-all overflow-hidden ${
                    isOpen
                      ? "bg-[#161616] border-[#FFD21F]/30 shadow-[0_0_15px_rgba(255,210,31,0.1)]"
                      : "bg-[#1A1A1A]/60 border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isOpen ? "bg-[#FFD21F] text-black" : "bg-white/[0.05] text-[#6B6B6B]"}`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className={`text-xs sm:text-sm font-extrabold leading-snug ${isOpen ? "text-[#FFD21F]" : "text-white"}`}>
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded-full ${isOpen ? "text-[#FFD21F] bg-[#FFD21F]/10" : "text-[#6B6B6B]"}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 pt-1 text-xs text-[#A1A1A1] font-medium leading-relaxed border-t border-white/[0.06]"
                      >
                        <p className="pl-11">{faq.answer}</p>
                        {faq.keywords && (
                          <div className="pl-11 mt-3 flex flex-wrap gap-1.5">
                            {faq.keywords.map((kw, i) => (
                              <span key={i} className="text-[10px] font-semibold text-[#6B6B6B] bg-white/[0.05] px-2 py-0.5 rounded-md">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-[#6B6B6B] text-xs">
              No matching guidance found for "{faqSearch}". Try searching for "soreness", "rest", "frequency", or "protein".
            </div>
          )}
        </div>
      </DarkCard>
    </div>
  );
};
