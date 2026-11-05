import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Dumbbell,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { gymEquipmentGuide } from "../data/equipmentGuide";
import { useFitness } from "../context/FitnessContext";

export const EquipmentGuidePage = () => {
  const navigate = useNavigate();
  const { allExercises } = useFitness();
  const [selectedEquip, setSelectedEquip] = useState(gymEquipmentGuide[0]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/20">
            GYM MECHANICS & SAFETY
          </span>
          <span className="text-xs text-slate-400">
            Professional Equipment Manual
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Gym Equipment Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master gym biomechanics, safety precautions, setup rules, and exercises possible with each station.
        </p>
      </div>

      {/* Main Grid: Left Selector List, Right Detailed Manual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Equipment Stations List */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Stations & Gear
          </span>
          {gymEquipmentGuide.map((item) => {
            const isSelected = selectedEquip?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedEquip(item)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-brand-purple/20 border-brand-purple text-white shadow-glow-purple"
                    : "glass-card border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold">{item.name}</h4>
                  <span className="text-[10px] text-brand-lavender font-semibold">
                    {item.exercisesPossible?.length} Exercises
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {item.purpose}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Equipment Breakdown */}
        {selectedEquip && (
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider bg-brand-cyan/10 px-2 py-0.5 rounded-md">
                  Station Specifications
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {selectedEquip.name}
              </h2>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Purpose
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEquip.purpose}
              </p>
            </div>

            {/* Target Muscles */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Targeted Muscle Groups
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedEquip.targetMuscles.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-brand-purple/20 border border-brand-purple/30 text-xs text-brand-lavender font-bold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Use It */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                How to Set Up & Operate
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedEquip.howToUse}
              </p>
            </div>

            {/* Safety Precautions */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Safety Precautions</span>
              </div>
              <div className="space-y-1.5">
                {selectedEquip.safetyPrecautions.map((safe, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{safe}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises Possible */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cataloged Exercises Using This Equipment
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedEquip.exercisesPossible.map((exName, idx) => {
                  const matched = allExercises.find((e) => e.name === exName);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (matched) navigate(`/exercise/${matched.id}`);
                        else navigate(`/exercises?search=${encodeURIComponent(exName)}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-background-secondary border border-white/10 text-xs text-slate-300 hover:text-white hover:border-brand-purple transition-all flex items-center gap-1.5 group"
                    >
                      <span>{exName}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-brand-cyan transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

