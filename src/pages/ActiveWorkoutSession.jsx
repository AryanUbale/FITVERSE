import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Check,
  Clock,
  Dumbbell,
  ArrowLeft,
  Flame,
  Sparkles,
  Trophy,
  Wind,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity
} from "lucide-react";
import confetti from "canvas-confetti";
import { useFitness } from "../context/FitnessContext";
import { ExerciseVideoPreview } from "../components/video/ExerciseVideoPreview";
import { DarkCard } from "../components/ui/DarkCard";
import { StatCard } from "../components/ui/StatCard";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { GlassBadge } from "../components/ui/GlassBadge";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { RingProgress } from "../components/ui/RingProgress";

export const ActiveWorkoutSession = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    activeCategory,
    categoryExercises,
    allExercises,
    activePlan,
    logCompletedWorkout,
    setNotification
  } = useFitness();

  const singleExerciseId = searchParams.get("exerciseId");

  // Determine workout exercise sequence
  const sessionExercises = useMemo(() => {
    if (singleExerciseId) {
      const match = allExercises.find((e) => e.id === singleExerciseId);
      return match ? [match] : [categoryExercises[0]];
    }
    if (activePlan?.schedule?.[0]?.exerciseIds?.length > 0) {
      const mapped = activePlan.schedule[0].exerciseIds
        .map((id) => allExercises.find((e) => e.id === id))
        .filter(Boolean);
      if (mapped.length > 0) return mapped;
    }
    return categoryExercises.slice(0, 4);
  }, [singleExerciseId, activePlan, categoryExercises, allExercises]);

  // Workout state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState({}); // { [exerciseId]: count }
  const [loggedWeights, setLoggedWeights] = useState({}); // { [`${exId}-${set}`]: weight }

  // Rest Timer state
  const [isResting, setIsResting] = useState(false);
  const [restSecondsRemaining, setRestSecondsRemaining] = useState(60);
  const [restDurationSetting, setRestDurationSetting] = useState(60);

  // Pilates Breathing state
  const [breathPhase, setBreathPhase] = useState("Inhale"); // 'Inhale' | 'Exhale'

  // Completion modal state
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = sessionExercises[currentIdx] || sessionExercises[0];
  const totalSets = currentExercise?.recommendedSets || 3;
  const isGym = currentExercise?.category === "gym";
  const isPilates = currentExercise?.category === "pilates";
  const breathCycleSeconds = currentExercise?.breathCycleSeconds || 4;

  // Main workout elapsed timer
  useEffect(() => {
    if (isPaused || isCompleted) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isCompleted]);

  // Rest countdown timer
  useEffect(() => {
    if (!isResting || isPaused || isCompleted) return;
    if (restSecondsRemaining <= 0) {
      setIsResting(false);
      return;
    }
    const timer = setInterval(() => {
      setRestSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isResting, isPaused, isCompleted, restSecondsRemaining]);

  // Pilates breath cue
  useEffect(() => {
    if (!isPilates || isPaused || isCompleted) return;
    setBreathPhase("Inhale");
    const breathTimer = setInterval(() => {
      setBreathPhase((prev) => (prev === "Inhale" ? "Exhale" : "Inhale"));
    }, breathCycleSeconds * 1000);
    return () => clearInterval(breathTimer);
  }, [isPilates, isPaused, isCompleted, currentExercise?.id, breathCycleSeconds]);

  // Handle logging a completed set
  const handleLogSet = () => {
    const exId = currentExercise.id;
    const updated = (completedSets[exId] || 0) + 1;
    setCompletedSets({ ...completedSets, [exId]: updated });

    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
      // Start rest timer
      setRestSecondsRemaining(restDurationSetting);
      setIsResting(true);
    } else {
      // Completed all sets for this exercise
      if (currentIdx < sessionExercises.length - 1) {
        // Move to next exercise
        setCurrentIdx(currentIdx + 1);
        setCurrentSet(1);
        setRestSecondsRemaining(restDurationSetting);
        setIsResting(true);
      } else {
        // Entire workout finished!
        triggerWorkoutCompletion();
      }
    }
  };

  const triggerWorkoutCompletion = () => {
    // Fire celebratory confetti in yellow and white
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#FFD21F", "#FFFFFF", "#FFE04D"]
    });

    const sessionDurationMin = Math.max(1, Math.round(elapsedSeconds / 60));

    // Save to persistent localStorage
    logCompletedWorkout({
      title: activePlan?.title || `${activeCategory.toUpperCase()} Complete Workout`,
      category: activeCategory,
      duration: sessionDurationMin,
      calories: Math.round(sessionDurationMin * 7.5),
      exercisesCount: sessionExercises.length,
      exercises: sessionExercises.map((e) => ({
        id: e.id,
        name: e.name,
        sets: totalSets,
        reps: e.recommendedReps
      }))
    });

    // Notify user with toast on dashboard
    setNotification({
      type: "achievement",
      title: "Workout Completed!",
      message: `Logged ${sessionExercises.length} exercises (${sessionDurationMin} min). Progress and streak updated.`
    });

    // Redirect to Dashboard immediately
    navigate("/dashboard");
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = Math.round(
    ((currentIdx + (currentSet - 1) / totalSets) / sessionExercises.length) * 100
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Locked Sticky Header Bar while exercising */}
      <header className="sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-white/[0.08] shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-18 py-3.5 flex items-center justify-between gap-4">
          <GhostButton
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold py-2 px-3.5 whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Exit</span>
          </GhostButton>

          {/* Live Stopwatch GlassBadge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111] border border-white/[0.08] text-white font-mono text-sm font-extrabold shadow-[0_0_15px_rgba(255,210,31,0.15)]">
            <Clock className="w-4 h-4 text-[#FFD21F] animate-pulse" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Pause/Resume Toggle & Finish Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isPaused
                ? "bg-[#FFD21F] text-black shadow-[0_0_15px_rgba(255,210,31,0.3)]"
                : "bg-[#1A1A1A] border border-white/[0.08] text-[#A1A1A1] hover:text-white"
                }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>

            <YellowButton
              onClick={triggerWorkoutCompletion}
              className="px-4 py-2 text-xs font-bold"
            >
              Finish Workout
            </YellowButton>
          </div>
        </div>
      </header>

      {/* Main workout content area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-fadeIn pb-16">

        {/* Segmented Progress Bar across Exercises */}
        <DarkCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="text-[#FFD21F]">Step {currentIdx + 1}</span>
              <span className="text-[#6B6B6B]">of {sessionExercises.length}</span>
              <span className="text-white ml-2 truncate max-w-[200px] sm:max-w-none">{currentExercise?.name}</span>
            </div>
            <span className="font-extrabold text-[#FFD21F]">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${sessionExercises.length}, minmax(0, 1fr))` }}>
            {sessionExercises.map((ex, idx) => {
              const isDone = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={ex.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setCurrentSet(1);
                    setIsResting(false);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${isDone
                    ? "bg-[#FFD21F]"
                    : isCurrent
                      ? "bg-[#FFE04D] shadow-[0_0_10px_rgba(255,210,31,0.5)]"
                      : "bg-white/[0.08] hover:bg-white/[0.15]"
                    }`}
                  title={ex.name}
                />
              );
            })}
          </div>
        </DarkCard>

        {/* Main Grid: Left Video Demo (7 cols) & Right Logger / Controls (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Video Form Demonstration Preview */}
          <div className="lg:col-span-7 space-y-5">
            <ExerciseVideoPreview exercise={currentExercise} />

            {/* Pilates Guided Calming Breathing Orb */}
            {isPilates && (
              <DarkCard className="p-6 border-[#FFD21F]/30 flex items-center justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFD21F] flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-[#FFD21F]" />
                    Pilates Rhythmic Breathwork
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-white">
                    {breathPhase === "Inhale" ? "Inhale Deeply (Rib Expansion)" : "Exhale & Draw Core To Spine"}
                  </h4>
                  <p className="text-xs text-[#A1A1A1] max-w-md font-medium">
                    {currentExercise.breathingPattern || "4-second smooth inhalation, 4-second abdominal contraction"}
                  </p>
                </div>

                {/* Pulsing Breathing Orb */}
                <div className="relative w-20 h-20 rounded-full border-2 border-[#FFD21F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,210,31,0.3)]">
                  <div
                    className={`w-14 h-14 rounded-full bg-[#FFD21F] text-black transition-all duration-1000 flex items-center justify-center font-bold ${breathPhase === "Inhale" ? "scale-110 opacity-100" : "scale-75 opacity-70"
                      }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      {breathPhase}
                    </span>
                  </div>
                </div>
              </DarkCard>
            )}
          </div>

          {/* Right: Exercise Tracker & Sets Logger */}
          <div className="lg:col-span-5 space-y-5">
            {/* Header Card */}
            <DarkCard className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD21F]/10 text-[#FFD21F] border border-[#FFD21F]/25">
                  {currentExercise.muscleGroup || currentExercise.targetMuscles?.[0] || "Target"}
                </span>
                <span className="text-xs text-[#6B6B6B] font-semibold">
                  {currentExercise.equipment || "Bodyweight"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight uppercase tracking-tight">
                {currentExercise.name}
              </h2>

              <p className="text-xs text-[#A1A1A1] leading-relaxed font-medium">
                {currentExercise.stepByStep?.[0] || currentExercise.whatItIs || "Maintain stable posture and perform each repetition with full muscular tension."}
              </p>
            </DarkCard>

            {/* ACTIVE REST TIMER CARD (Ring countdown + yellow chips) */}
            {isResting && (
              <DarkCard className="p-6 border-[#FFD21F]/40 bg-[#161616] space-y-4 animate-fadeIn shadow-[0_0_25px_rgba(255,210,31,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#FFD21F] uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-[#FFD21F]" />
                    Muscle Recovery Interval
                  </span>
                  <button
                    onClick={() => setIsResting(false)}
                    className="px-3 py-1 rounded-full bg-[#1A1A1A] text-xs text-[#A1A1A1] hover:text-white font-bold border border-white/[0.08]"
                  >
                    Skip Rest
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full border-4 border-[#1A1A1A] border-t-[#FFD21F] flex items-center justify-center font-mono font-black text-xl text-white">
                      {restSecondsRemaining}s
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Target Rest</div>
                      <div className="text-[11px] text-[#6B6B6B]">Deep nasal breathing</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[30, 60, 90].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setRestDurationSetting(s);
                          setRestSecondsRemaining(s);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full font-bold transition-all ${restDurationSetting === s
                          ? "bg-[#FFD21F] text-black shadow-[0_0_10px_rgba(255,210,31,0.3)]"
                          : "bg-[#1A1A1A] text-[#A1A1A1] hover:text-white border border-white/[0.08]"
                          }`}
                      >
                        +{s}s
                      </button>
                    ))}
                  </div>
                </div>
              </DarkCard>
            )}

            {/* SETS LOGGING TABLE */}
            <DarkCard className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Set Tracker
                </h4>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFD21F]/10 text-[#FFD21F] border border-[#FFD21F]/25">
                  Set {currentSet} of {totalSets}
                </span>
              </div>

              <div className="space-y-2.5">
                {Array.from({ length: totalSets }).map((_, idx) => {
                  const setNum = idx + 1;
                  const isCurrent = currentSet === setNum;
                  const isPast = currentSet > setNum;
                  const weightKey = `${currentExercise.id}-${setNum}`;

                  return (
                    <div
                      key={setNum}
                      className={`p-3.5 rounded-[16px] border flex items-center justify-between transition-all ${isCurrent
                        ? "bg-[#1A1A1A] border-[#FFD21F] text-white shadow-[0_0_15px_rgba(255,210,31,0.15)]"
                        : isPast
                          ? "bg-[#FFD21F]/5 border-[#FFD21F]/20 text-white"
                          : "bg-[#161616] border-white/[0.06] text-[#6B6B6B]"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold w-12 text-white">
                          Set {setNum}
                        </span>
                        <span className="text-xs text-[#A1A1A1] font-medium">
                          Target: <strong className="text-white font-bold">{currentExercise.recommendedReps}</strong>
                        </span>
                      </div>

                      {/* Weight Input for Gym lifters */}
                      {isGym && (
                        <div className="flex items-center gap-1.5 text-xs">
                          <input
                            type="number"
                            placeholder={currentExercise.defaultWeightKg || "60"}
                            value={loggedWeights[weightKey] || ""}
                            onChange={(e) =>
                              setLoggedWeights({
                                ...loggedWeights,
                                [weightKey]: e.target.value
                              })
                            }
                            className="w-16 px-2.5 py-1.5 rounded-xl bg-[#111111] border border-white/[0.08] text-center text-xs font-extrabold text-white focus:outline-none focus:border-[#FFD21F]"
                          />
                          <span className="text-[#6B6B6B] font-bold">kg</span>
                        </div>
                      )}

                      <div>
                        {isPast ? (
                          <div className="w-8 h-8 rounded-full bg-[#FFD21F]/20 text-[#FFD21F] flex items-center justify-center">
                            <Check className="w-4 h-4 font-extrabold" />
                          </div>
                        ) : isCurrent ? (
                          <button
                            onClick={handleLogSet}
                            className="px-4 py-1.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE04D] text-black text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,210,31,0.3)] transition-all"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Done</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#6B6B6B] font-semibold px-2">Upcoming</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stepper Bottom Navigation */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <GhostButton
                  disabled={currentIdx === 0}
                  onClick={() => {
                    setCurrentIdx(currentIdx - 1);
                    setCurrentSet(1);
                    setIsResting(false);
                  }}
                  className="px-4 py-2 text-xs font-bold disabled:opacity-30"
                >
                  Previous
                </GhostButton>

                <YellowButton
                  onClick={handleLogSet}
                  className="flex-1 py-2.5 text-xs font-extrabold flex items-center justify-center gap-2"
                >
                  <span>
                    {currentSet === totalSets && currentIdx === sessionExercises.length - 1
                      ? "Finish Workout"
                      : "Log & Next Set"}
                  </span>
                  <Check className="w-4 h-4 stroke-[3]" />
                </YellowButton>

                <GhostButton
                  disabled={currentIdx === sessionExercises.length - 1}
                  onClick={() => {
                    setCurrentIdx(currentIdx + 1);
                    setCurrentSet(1);
                    setIsResting(false);
                  }}
                  className="px-4 py-2 text-xs font-bold disabled:opacity-30 flex items-center gap-1.5"
                >
                  <span>Skip</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </GhostButton>
              </div>
            </DarkCard>
          </div>
        </div>

        {/* WORKOUT COMPLETION CELEBRATION MODAL */}
        {isCompleted && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#111111] max-w-lg w-full p-8 rounded-[28px] border border-[#FFD21F]/40 text-center space-y-6 animate-scaleUp shadow-[0_0_50px_rgba(255,210,31,0.2)] relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-[#FFD21F] flex items-center justify-center mx-auto text-black shadow-[0_0_30px_rgba(255,210,31,0.4)]">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <EyebrowLabel>Session Accomplished</EyebrowLabel>
                <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-tight">
                  WORKOUT COMPLETE!
                </h2>
                <p className="text-xs text-[#A1A1A1] mt-2 font-medium max-w-sm mx-auto">
                  Outstanding dedication! Your performance metrics and consistency streak have been securely recorded.
                </p>
              </div>

              {/* 4 StatCards Summary */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <StatCard
                  label="Duration"
                  value={formatTime(elapsedSeconds)}
                  icon={<Clock className="w-4 h-4" />}
                />
                <StatCard
                  label="Exercises"
                  value={sessionExercises.length}
                  icon={<Dumbbell className="w-4 h-4" />}
                />
                <StatCard
                  label="Est. Calories"
                  value={Math.round(Math.max(1, Math.round(elapsedSeconds / 60)) * 7.5)}
                  unit="kcal"
                  icon={<Flame className="w-4 h-4" />}
                />
                <StatCard
                  label="Sets Finished"
                  value={sessionExercises.length * totalSets}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <YellowButton
                  onClick={() => navigate("/progress")}
                  className="w-full py-3.5 text-xs font-extrabold flex items-center justify-center gap-2"
                >
                  <span>View Analytics & Heatmap</span>
                  <Sparkles className="w-4 h-4 text-black" />
                </YellowButton>
                <GhostButton
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-3 text-xs font-bold"
                >
                  Return to Dashboard
                </GhostButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
