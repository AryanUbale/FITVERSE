import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  Dumbbell,
  Activity,
  HeartPulse,
  Play,
  ChevronDown,
  Sparkles,
  Shield,
  Layers,
  BarChart3,
  Award,
  Users
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { ExerciseVideoPreview } from "../components/video/ExerciseVideoPreview";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { YellowButton } from "../components/ui/YellowButton";
import { GhostButton } from "../components/ui/GhostButton";
import { DarkCard } from "../components/ui/DarkCard";
import { GlassBadge } from "../components/ui/GlassBadge";
import { PhotoCard } from "../components/ui/PhotoCard";
import { YellowDotList } from "../components/ui/YellowDotList";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { setCategory } = useFitness();
  const [highlightedMuscle, setHighlightedMuscle] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const disciplines = [
    {
      id: "gym",
      title: "Gym Performance",
      subtitle: "Iron, Barbells & Progressive Overload",
      description: "Heavy compound lifts, Olympic barbell paths, dumbbell biomechanics and structured progressive overload splits.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80",
      features: [
        "Barbells, Dumbbells & Cable Towers",
        "Targeted Multi-Split Periodization",
        "Interactive Biomechanical Breakdown"
      ]
    },
    {
      id: "home",
      title: "Home Calisthenics",
      subtitle: "Zero-Gear Power & Conditioning",
      description: "Master relative bodyweight strength, resistance band routines, and ingenious household equipment substitutions.",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
      features: [
        "Progressive Bodyweight Chains",
        "Household Alternative Substitutions",
        "High-Metabolic Interval Circuits"
      ]
    },
    {
      id: "pilates",
      title: "Pilates Contrology",
      subtitle: "Spinal Articulation & Deep Core",
      description: "Classical Joseph Pilates mat series, rhythmic 4-second breathing cadence, and spine centering.",
      icon: HeartPulse,
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=700&auto=format&fit=crop&q=80",
      features: [
        "Classical Joseph Pilates Mat Flow",
        "Rhythmic 4s Breathing Cadence",
        "Deep Core & Posture Alignment"
      ]
    }
  ];

  const featuresList = [
    {
      title: "Video Biomechanics",
      subtitle: "HD Form Demonstrations",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=80",
      desc: "High-definition video form demonstrations highlighting target and stabilizer muscles with precise movement execution."
    },
    {
      title: "Guided Workouts",
      subtitle: "Active Session Engine",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&auto=format&fit=crop&q=80",
      desc: "Automated step-by-step stopwatch, rest timers, set weight logging, and Pilates rhythmic breathing guides."
    },
    {
      title: "Virtual Trainer",
      subtitle: "Biomechanical Directives",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80",
      desc: "Daily directives, warm-up/cool-down routines, and interactive form guidance for maximum longevity."
    },
    {
      title: "Progress Analytics",
      subtitle: "Heatmap & Volume Tracking",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
      desc: "16-week consistency heatmaps, volume charts, discipline ratios, and active streak monitoring."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FFD21F] selection:text-black">
      {/* 1. NAVBAR (Sticky, transparent turning blurred black on scroll) */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/[0.08] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* FitVerse Brand Logo with Dumbbell */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#FFD21F] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,210,31,0.35)] shrink-0 transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
              Fit<span className="text-[#FFD21F]">Verse</span>
            </span>
          </button>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#A1A1A1]">
            <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Disciplines</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B]" />
            </a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#trainer3d" className="hover:text-white transition-colors">Video Tutorials</a>
            <a href="#about" className="hover:text-white transition-colors">Community</a>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <YellowButton onClick={() => navigate("/onboarding")} className="text-xs px-5 py-2">
              Sign Up / Get Started
            </YellowButton>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Exact PowerBlast reference layout) */}
      <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <EyebrowLabel>TRAIN SMARTER, LIVE STRONGER</EyebrowLabel>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] uppercase">
              Unleash <br />
              <span className="text-white">Your True</span> <br />
              <span className="text-[#FFD21F]">Power</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1A1] max-w-lg font-normal leading-relaxed">
              Precision video form tutorials, multi-discipline coaching, and scientific progressive overload splits engineered for the modern athlete.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <YellowButton onClick={() => navigate("/onboarding")} className="px-8 py-3 text-sm">
                Get Started
              </YellowButton>
              <GhostButton onClick={() => navigate("/dashboard")} className="px-7 py-3 text-sm">
                Explore Live Demo
              </GhostButton>
            </div>

            {/* Floating GlassBadge Mid-Left */}
            <div className="pt-4 max-w-sm">
              <GlassBadge className="flex items-start gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD21F]/15 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4 text-[#FFD21F]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Strength Meets Strategy</h4>
                  <p className="text-[11px] text-[#A1A1A1] mt-0.5 leading-relaxed">
                    Your path to daily power, joint longevity, and progressive overload.
                  </p>
                </div>
              </GlassBadge>
            </div>
          </div>

          {/* Right Hero: 3D FitnessCompanion & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
            {/* Top Right Floating GlassBadge */}
            <div className="absolute top-0 right-2 z-30 animate-float hidden sm:block">
              <GlassBadge className="flex items-center gap-3 py-2.5 px-4">
                <div className="text-2xl font-black text-[#FFD21F]">+3</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Disciplines Active</div>
                  <div className="text-[10px] text-[#A1A1A1]">Gym, Home, Pilates</div>
                </div>
              </GlassBadge>
            </div>

            {/* Featured Video Tutorial Preview */}
            <div id="trainer3d" className="relative w-full z-20">
              <ExerciseVideoPreview
                exercise={{ id: "gym-bench-press", name: "Barbell Bench Press" }}
                className="shadow-[0_0_50px_rgba(255,210,31,0.15)]"
              />
            </div>
          </div>
        </div>

        {/* Giant Watermark Text behind model */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none select-none z-10 overflow-hidden flex justify-center">
          <span className="text-[18vw] font-black tracking-tighter text-white/[0.03] uppercase italic leading-none whitespace-nowrap">
            FITVERSE
          </span>
        </div>
      </section>

      {/* 3. ABOUT US STATEMENT SECTION */}
      <section id="about" className="py-24 border-t border-white/[0.08] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Statement */}
            <div className="lg:col-span-7 space-y-6">
              <EyebrowLabel>ABOUT US</EyebrowLabel>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Strength. Power. Transformation. Focus. Results. Discipline. Consistency. Endurance. Performance.
              </h2>

              <p className="text-sm sm:text-base text-[#A1A1A1] font-normal leading-relaxed max-w-xl">
                FitVerse bridges sports medicine, 3D anatomical visualization, and real-time workout tracking to deliver a zero-compromise fitness training platform accessible straight from your browser.
              </p>

              <div className="pt-2 flex items-center gap-8">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white">100%</div>
                  <div className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider mt-1">Client-Side Privacy</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#FFD21F]">3D</div>
                  <div className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider mt-1">Real-time Biomechanics</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white">40+</div>
                  <div className="text-xs font-bold text-[#A1A1A1] uppercase tracking-wider mt-1">Precision Movements</div>
                </div>
              </div>
            </div>

            {/* Right Photos */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-[20px] overflow-hidden border border-white/[0.08] h-64 sm:h-80 bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
                  alt="Training"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                />
              </div>
              <div className="rounded-[20px] overflow-hidden border border-white/[0.08] h-64 sm:h-80 mt-8 bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80"
                  alt="Power"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISCIPLINES SECTION (3 PhotoCards in a row) */}
      <section id="disciplines" className="py-24 border-t border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <EyebrowLabel>CORE DISCIPLINES</EyebrowLabel>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-1">
                Engineered for <span className="text-[#FFD21F]">Every Body</span>
              </h2>
            </div>
            <YellowButton onClick={() => navigate("/onboarding")} className="text-xs">
              Explore Disciplines
            </YellowButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((d) => (
              <PhotoCard
                key={d.id}
                image={d.image}
                title={d.title}
                subtitle={d.subtitle}
                badge={d.id.toUpperCase()}
                onClick={() => {
                  setCategory(d.id);
                  navigate(`/onboarding?category=${d.id}`);
                }}
              >
                <div className="pt-3 border-t border-white/[0.08] mt-3">
                  <YellowDotList items={d.features} />
                </div>
              </PhotoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION (4-up row of portrait PhotoCards) */}
      <section id="features" className="py-24 border-t border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <EyebrowLabel>DEDICATED TOOLS</EyebrowLabel>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Tools to Reach Your <span className="text-[#FFD21F]">Fitness Goals</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A1]">
              Every module is designed to maximize muscular tension, ensure joint safety, and track progress over time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresList.map((f, idx) => (
              <div
                key={idx}
                className="group relative rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:border-[#FFD21F]/40 hover:-translate-y-1"
              >
                <div className="h-72 w-full overflow-hidden bg-black relative">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-75 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1 bg-[#111111]">
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#FFD21F] transition-colors">
                    {f.title}
                  </h3>
                  <div className="text-[11px] font-bold text-[#FFD21F] uppercase tracking-wider pb-1">
                    {f.subtitle}
                  </div>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    {f.desc}
                  </p>
                  <div className="w-0 group-hover:w-full h-0.5 bg-[#FFD21F] transition-all duration-300 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING / FREE MEMBERSHIP PANEL (PowerBlast Reference) */}
      <section className="py-24 border-t border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <DarkCard className="p-8 sm:p-12 border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Photo */}
              <div className="lg:col-span-5 rounded-[20px] overflow-hidden h-80 sm:h-96 border border-white/[0.08] bg-black">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80"
                  alt="Membership"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 space-y-6">
                <EyebrowLabel>FREE & PRIVATE</EyebrowLabel>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                  Complete Fitness <span className="text-[#FFD21F]">Membership</span>
                </h2>
                <p className="text-sm text-[#A1A1A1] leading-relaxed max-w-xl">
                  FitVerse requires no credit card, no account signups, and sends zero telemetry to remote servers. All your biomechanical data and workout history persist 100% locally in your browser.
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">What You'll Get:</h4>
                  <YellowDotList
                    items={[
                      "Personalized training plans across Gym, Home & Pilates",
                      "Interactive real-time 3D exercise demos with skeletal angles",
                      "Guided active session stopwatch, rep logger, and rest countdown",
                      "16-week consistency heatmap and discipline distribution analytics",
                      "Unlockable milestone badges and achievement progression"
                    ]}
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-baseline gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight">$0</span>
                    <span className="text-sm font-bold text-[#A1A1A1] uppercase tracking-wider">/ Forever</span>
                  </div>
                  <YellowButton onClick={() => navigate("/onboarding")} className="px-8 py-3 text-sm">
                    Start Your Transformation Today
                  </YellowButton>
                </div>
              </div>
            </div>
          </DarkCard>
        </div>
      </section>

      {/* 7. ATHLETE QUOTE / TESTIMONIALS SECTION */}
      <section className="py-24 border-t border-white/[0.08] relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <EyebrowLabel>ATHLETE PERSPECTIVE</EyebrowLabel>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-snug">
            "FitVerse fundamentally transformed my biomechanics and daily consistency without requiring paid gym subscriptions or complex setups."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#FFD21F] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alex Vance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Alex Vance</div>
              <div className="text-[10px] text-[#A1A1A1]">Intermediate Athlete • Mobility Focus</div>
            </div>
          </div>
          <div className="pt-4">
            <YellowButton onClick={() => navigate("/dashboard")} className="text-xs">
              See All Stories
            </YellowButton>
          </div>
        </div>
      </section>

      {/* 8. FOOTER (Pure Black Minimalist) */}
      <footer className="py-16 border-t border-white/[0.08] bg-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FFD21F] flex items-center justify-center text-black">
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase italic">
              Fit<span className="text-[#FFD21F]">Verse</span>
            </span>
            <span className="text-xs text-[#6B6B6B] ml-2">© 2026 FitVerse. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#A1A1A1] font-semibold">
            <button onClick={() => navigate("/dashboard")} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={() => navigate("/exercises")} className="hover:text-white transition-colors">Exercises</button>
            <button onClick={() => navigate("/plans")} className="hover:text-white transition-colors">Plans</button>
            <button onClick={() => navigate("/settings")} className="hover:text-white transition-colors">Settings</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
