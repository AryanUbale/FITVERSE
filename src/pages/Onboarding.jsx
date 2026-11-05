import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Activity,
  HeartPulse,
  Sparkles,
  Clock,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  Calendar,
  Layers
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { workoutPlans } from "../data/workoutPlans";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { DarkCard } from "../components/ui/DarkCard";
import { YellowDotList } from "../components/ui/YellowDotList";

export const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile, setUserProfile, setActivePlan, setCategory } = useFitness();

  const initialCat = searchParams.get("category") || userProfile?.category || "gym";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userProfile?.name || "Alex Vance",
    category: initialCat,
    goal: userProfile?.goal || "Muscle building",
    experience: userProfile?.experience || "Intermediate",
    preferredDuration: userProfile?.preferredDuration || 45,
    preferredDays: userProfile?.preferredDays || ["Monday", "Wednesday", "Friday"],
    equipmentLimitation: userProfile?.equipmentLimitation || "Full commercial gym (Barbells, Dumbbells, Cables, Machines)"
  });

  const stepMeta = [
    {
      num: 1,
      title: "Discipline & Identity",
      eyebrow: "STEP 1 OF 4",
      quote: "Every physique begins with a single deliberate choice of discipline."
    },
    {
      num: 2,
      title: "Target Goal & Training Age",
      eyebrow: "STEP 2 OF 4",
      quote: "Precision periodization requires clarity on your primary biomechanical focus."
    },
    {
      num: 3,
      title: "Schedule & Time Economy",
      eyebrow: "STEP 3 OF 4",
      quote: "Consistency over intensity. Your weekly rhythm defines your long-term adaptation."
    },
    {
      num: 4,
      title: "Equipment & Program Lock",
      eyebrow: "STEP 4 OF 4",
      quote: "Zero excuses. We customize every movement pattern to the gear you have right now."
    }
  ];

  const categories = [
    {
      id: "gym",
      title: "Gym Performance",
      desc: "Iron, Barbells & Progressive Overload",
      icon: Dumbbell
    },
    {
      id: "home",
      title: "Home Calisthenics",
      desc: "Bodyweight, Bands & Household Gear",
      icon: Activity
    },
    {
      id: "pilates",
      title: "Pilates Contrology",
      desc: "Deep Core, Spine & 4s Breath Rhythm",
      icon: HeartPulse
    }
  ];

  const goalsByCategory = {
    gym: ["Muscle building", "Strength", "General fitness", "Weight management"],
    home: ["General fitness", "Weight management", "Muscle building", "Mobility"],
    pilates: ["Flexibility", "Core strength", "Mobility", "Posture alignment"]
  }[formData.category] || ["General fitness", "Strength", "Flexibility"];

  const experienceLevels = [
    { id: "Beginner", label: "Beginner", desc: "0–12 months consistent training" },
    { id: "Intermediate", label: "Intermediate", desc: "1–3 years disciplined training" },
    { id: "Advanced", label: "Advanced", desc: "3+ years structured periodization" }
  ];

  const durationOptions = [30, 45, 60];

  const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const equipmentByCategory = {
    gym: [
      "Full commercial gym (Barbells, Dumbbells, Cables, Machines)",
      "Standard gym (Dumbbells & Barbells only)",
      "Basic apartment fitness center"
    ],
    home: [
      "Pure Bodyweight only (No equipment needed)",
      "Resistance bands & Sturdy chair",
      "Household items (Water bottles, backpack, sofa)",
      "Light dumbbells + Resistance bands"
    ],
    pilates: [
      "Standard Yoga / Pilates Floor Mat",
      "Pilates Mat & Resistance Loop Band",
      "Mat & Small Pilates Stability Ball / Ring"
    ]
  }[formData.category] || ["Standard floor mat"];

  const toggleDay = (day) => {
    setFormData((prev) => {
      const exists = prev.preferredDays.includes(day);
      if (exists) {
        if (prev.preferredDays.length === 1) return prev;
        return { ...prev, preferredDays: prev.preferredDays.filter((d) => d !== day) };
      } else {
        return { ...prev, preferredDays: [...prev.preferredDays, day] };
      }
    });
  };

  // Step 4 plan recommendation
  const matchingPlans = workoutPlans.filter((p) => p.category === formData.category);
  const recommendedPlan =
    matchingPlans.find((p) => p.level === formData.experience) || matchingPlans[0] || {
      title: "Personalized Foundation Split",
      daysPerWeek: formData.preferredDays.length,
      duration: `${formData.preferredDuration} min`,
      description: "Custom split tailored to your chosen equipment and weekly frequency."
    };

  const handleFinish = () => {
    setUserProfile({
      ...userProfile,
      ...formData,
      onboarded: true
    });
    setCategory(formData.category);
    if (recommendedPlan) setActivePlan(recommendedPlan);
    navigate("/dashboard");
  };

  const currentMeta = stepMeta[step - 1];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-[#FFD21F] selection:text-black">
      {/* Thin Yellow Progress Bar at the top */}
      <div className="w-full h-1 bg-white/[0.08] fixed top-0 inset-x-0 z-50">
        <div
          className="h-full bg-[#FFD21F] transition-all duration-500 shadow-[0_0_10px_#FFD21F]"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Main Split Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center pt-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-[24px] overflow-hidden border border-white/[0.08] bg-[#111111] shadow-2xl min-h-[680px]">
          {/* LEFT 40%: Fixed Panel with Athlete Cutout & Step Indicator */}
          <div className="lg:col-span-5 bg-[#161616] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative overflow-hidden">
            {/* Subtle radial yellow glow */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Brand Wordmark */}
              <div className="flex items-center gap-2.5">
                <span className="font-black text-xl tracking-tighter text-white uppercase italic">
                  Fit<span className="text-[#FFD21F]">Verse</span>
                </span>
              </div>

              {/* Step info & motivating quote */}
              <div className="space-y-2 pt-2">
                <EyebrowLabel>{currentMeta.eyebrow}</EyebrowLabel>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                  {currentMeta.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1A1] italic leading-relaxed pt-1 font-normal">
                  "{currentMeta.quote}"
                </p>
              </div>

              {/* Vertical Step Indicator */}
              <div className="space-y-3 pt-2">
                {stepMeta.map((s) => {
                  const isCurrent = s.num === step;
                  const isPassed = s.num < step;
                  return (
                    <div key={s.num} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isCurrent
                            ? "bg-[#FFD21F] text-black font-extrabold shadow-[0_0_10px_rgba(255,210,31,0.5)]"
                            : isPassed
                            ? "bg-white/[0.1] text-[#FFD21F] border border-[#FFD21F]/40"
                            : "bg-white/[0.04] text-[#A1A1A1] border border-white/[0.08]"
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5" /> : s.num}
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          isCurrent
                            ? "text-white font-bold"
                            : isPassed
                            ? "text-[#A1A1A1]"
                            : "text-[#6B6B6B]"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Athlete Photo Graphic */}
            <div className="relative z-10 w-full flex items-center justify-center mt-6">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=80"
                alt="Athlete"
                className="w-44 h-48 sm:h-56 object-cover object-top rounded-[20px] shadow-2xl border border-white/10 grayscale contrast-125 brightness-75"
              />
            </div>
          </div>

          {/* RIGHT 60%: The Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-[#111111]">
            {/* STEP 1: Name & Category */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <EyebrowLabel>PROFILE SETUP</EyebrowLabel>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase tracking-tight">
                    What should we call you & your primary focus?
                  </h3>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block mb-2">
                    Your Name / Athlete Tag
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#161616] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#FFD21F] transition-colors"
                    placeholder="Alex Vance"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Choose Primary Discipline
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`p-4 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-[#161616] border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.25)]"
                              : "bg-[#161616]/60 border-white/[0.08] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isSelected ? "bg-[#FFD21F] text-black" : "bg-white/[0.05] text-white"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-sm font-bold text-white block">
                                {cat.title}
                              </span>
                              <span className="text-xs text-[#A1A1A1] block">
                                {cat.desc}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-black flex items-center justify-center font-bold">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Goal & Experience */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <EyebrowLabel>TRAINING OBJECTIVES</EyebrowLabel>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase tracking-tight">
                    Select your priority target & training level
                  </h3>
                </div>

                {/* Goals Grid */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Primary Goal ({formData.category.toUpperCase()})
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goalsByCategory.map((g) => {
                      const isSelected = formData.goal === g;
                      return (
                        <div
                          key={g}
                          onClick={() => setFormData({ ...formData, goal: g })}
                          className={`p-4 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-[#161616] border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.25)]"
                              : "bg-[#161616]/60 border-white/[0.08] hover:border-white/20"
                          }`}
                        >
                          <span className="text-xs font-bold text-white">{g}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-black flex items-center justify-center font-bold">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Levels */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {experienceLevels.map((lvl) => {
                      const isSelected = formData.experience === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setFormData({ ...formData, experience: lvl.id })}
                          className={`p-3.5 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-[#161616] border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.25)]"
                              : "bg-[#161616]/60 border-white/[0.08] hover:border-white/20"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {lvl.label}
                            </span>
                            <span className="text-[11px] text-[#A1A1A1] block">
                              {lvl.desc}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-black flex items-center justify-center font-bold">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Duration & Days */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <EyebrowLabel>TIME & COMMITMENT</EyebrowLabel>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase tracking-tight">
                    How much time can you commit each week?
                  </h3>
                </div>

                {/* Duration options */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Preferred Session Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {durationOptions.map((dur) => {
                      const isSelected = formData.preferredDuration === dur;
                      return (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredDuration: dur })}
                          className={`p-4 rounded-[16px] border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#161616] border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.25)]"
                              : "bg-[#161616]/60 border-white/[0.08] hover:border-white/20"
                          }`}
                        >
                          <span className="text-xl font-black text-white block">
                            {dur}
                          </span>
                          <span className="text-[10px] text-[#A1A1A1] font-bold uppercase tracking-wider">
                            Minutes
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred days */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Active Training Days ({formData.preferredDays.length} selected)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {daysList.map((day) => {
                      const isSelected = formData.preferredDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`py-3 px-2 rounded-[12px] text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-[#FFD21F] text-black border-[#FFD21F]"
                              : "bg-[#161616] text-[#A1A1A1] border-white/[0.08] hover:text-white"
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Equipment & Generated Plan Preview */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <EyebrowLabel>FINAL CALIBRATION</EyebrowLabel>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase tracking-tight">
                    Confirm your gear & tailored program
                  </h3>
                </div>

                {/* Equipment options */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
                    Available Equipment
                  </label>
                  <div className="space-y-2">
                    {equipmentByCategory.map((equip) => {
                      const isSelected = formData.equipmentLimitation === equip;
                      return (
                        <div
                          key={equip}
                          onClick={() => setFormData({ ...formData, equipmentLimitation: equip })}
                          className={`p-3.5 rounded-[16px] border transition-all cursor-pointer flex items-center justify-between text-xs font-semibold ${
                            isSelected
                              ? "bg-[#161616] border-[#FFD21F] text-white shadow-[0_0_15px_rgba(255,210,31,0.25)]"
                              : "bg-[#161616]/60 border-white/[0.08] text-[#A1A1A1] hover:text-white"
                          }`}
                        >
                          <span>{equip}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-black flex items-center justify-center font-bold shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Generated Plan Recommendation Box (Highlighted yellow-bordered summary card) */}
                <div className="p-5 rounded-[20px] bg-[#161616] border-2 border-[#FFD21F] shadow-[0_0_25px_rgba(255,210,31,0.2)] space-y-3">
                  <div className="flex items-center justify-between">
                    <EyebrowLabel>RECOMMENDED PROGRAM</EyebrowLabel>
                    <span className="text-[10px] font-extrabold bg-[#FFD21F] text-black px-2.5 py-0.5 rounded-full">
                      Match 98%
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {recommendedPlan.title}
                  </h4>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    {recommendedPlan.description}
                  </p>
                  <YellowDotList
                    items={[
                      `${formData.preferredDays.length} Days / Week schedule`,
                      `${formData.preferredDuration} Min target sessions`,
                      `${formData.experience} progressive overload tier`
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              {step > 1 ? (
                <GhostButton onClick={() => setStep(step - 1)} icon={ArrowLeft} className="text-xs">
                  Back
                </GhostButton>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <YellowButton onClick={() => setStep(step + 1)} className="text-xs px-8">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 ml-1 inline" />
                </YellowButton>
              ) : (
                <YellowButton onClick={handleFinish} className="text-xs px-8">
                  <span>Launch FitVerse</span>
                  <ArrowRight className="w-4 h-4 ml-1 inline" />
                </YellowButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
