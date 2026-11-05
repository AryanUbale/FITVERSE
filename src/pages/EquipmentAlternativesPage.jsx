import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Dumbbell,
  Activity,
  ArrowRight,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Repeat
} from "lucide-react";
import { equipmentAlternatives } from "../data/equipmentAlternatives";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { PageHeader } from "../components/ui/PageHeader";
import { DarkCard } from "../components/ui/DarkCard";

export const EquipmentAlternativesPage = () => {
  const navigate = useNavigate();
  const [selectedSub, setSelectedSub] = useState(equipmentAlternatives[0]);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        eyebrow="HOME ADAPTATION MATRIX"
        title="Equipment Alternatives & Substitutes"
        subtitle="Achieve gym-grade progressive overload at home using intelligent physics, bands, and household items."
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Swap Cards */}
        <div className="lg:col-span-5 space-y-3.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B6B] block px-1">
            Gym Gear → Household Alternative
          </span>

          {equipmentAlternatives.map((sub, idx) => {
            const isSelected = selectedSub?.gymEquipment === sub.gymEquipment;
            return (
              <div
                key={idx}
                onClick={() => setSelectedSub(sub)}
                className={`cursor-pointer rounded-[20px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? "border-[#FFD21F] ring-2 ring-[#FFD21F]/40 shadow-[0_0_20px_rgba(255,210,31,0.2)]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="grid grid-cols-11 items-center">
                  {/* Left Half — "Replace" side */}
                  <div className="col-span-5 p-4 bg-[#E5484D]/8 border-r border-white/[0.08] flex flex-col justify-center min-h-[90px]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E5484D] block mb-0.5">
                      Gym Gear
                    </span>
                    <span className="text-xs font-bold text-white line-through opacity-85 leading-snug">
                      {sub.gymEquipment}
                    </span>
                  </div>

                  {/* Center Arrow */}
                  <div className="col-span-1 flex items-center justify-center bg-[#111111] py-2">
                    <ArrowRight className="w-4 h-4 text-[#FFD21F]" />
                  </div>

                  {/* Right Half — "Use instead" side */}
                  <div className="col-span-5 p-4 bg-[#FFD21F]/5 flex flex-col justify-center min-h-[90px]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FFD21F] block mb-0.5">
                      Household Swap
                    </span>
                    <span className="text-xs font-bold text-white leading-snug">
                      {sub.homeAlternative}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Detail Panel */}
        {selectedSub && (
          <div className="lg:col-span-7 space-y-5">
            {/* Header with Pairing */}
            <DarkCard className="p-6 sm:p-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E5484D]/10 text-[#E5484D] border border-[#E5484D]/20 text-xs font-bold">
                  Gym: {selectedSub.gymEquipment}
                </span>
                <span className="text-[#6B6B6B] font-bold">→</span>
                <span className="px-3 py-1 rounded-full bg-[#FFD21F]/10 text-[#FFD21F] border border-[#FFD21F]/25 text-xs font-bold">
                  Home: {selectedSub.homeAlternative}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedSub.homeAlternative}
              </h2>
            </DarkCard>

            {/* Preparation */}
            <DarkCard className="p-6 space-y-2.5">
              <EyebrowLabel>How To Set Up & Load Correctly</EyebrowLabel>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                {selectedSub.description}
              </p>
            </DarkCard>

            {/* Substitution Table */}
            <DarkCard className="p-6 space-y-3">
              <EyebrowLabel>Exercise Direct Substitution Mapping</EyebrowLabel>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A1A1A] text-[#6B6B6B] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Original Gym Exercise</th>
                      <th className="p-3">Home Alternative Movement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSub.replacesExercises || []).map((rep, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-[#111111]" : "bg-[#161616]"}
                      >
                        <td className="p-3 font-semibold text-[#A1A1A1]">
                          {rep.gym}
                        </td>
                        <td className="p-3 font-bold text-[#FFD21F]">
                          ↳ {rep.home}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DarkCard>

            {/* Biomechanics Comparison */}
            <DarkCard className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD21F]" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-white">
                  Biomechanical Tension Profile Comparison
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-white/[0.06] space-y-1">
                  <span className="text-xs font-bold text-[#A1A1A1] block">
                    Original Gym Tension Curve
                  </span>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    Guided fixed-axis or standardized gravitational vertical plane. Predictable overload increments.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#FFD21F]/15 space-y-1">
                  <span className="text-xs font-bold text-[#FFD21F] block">
                    Household Alternative Curve
                  </span>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {selectedSub.biomechanicsAndDifferences || "Requires greater grip and core stabilizer activation due to fluid balance and irregular mass distribution."}
                  </p>
                </div>
              </div>
            </DarkCard>

            {/* Limitations */}
            <div className="p-6 rounded-[20px] bg-[#FFD21F]/5 border border-[#FFD21F]/15 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FFD21F]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFD21F]">
                  Known Biomechanical Limitations
                </span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {selectedSub.limitations || "Micro-adjusting progressive load by single kilograms is difficult compared to standard iron plates. Focus on cadence and tempo."}
              </p>
            </div>

            {/* Safety */}
            <div className="p-6 rounded-[20px] bg-[#E5484D]/5 border border-[#E5484D]/20 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#E5484D]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E5484D]">
                  Household Safety Warning
                </span>
              </div>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                {selectedSub.safetyWarning || "Always check container seals, strap integrity, and furniture stability before loading with full body weight."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
