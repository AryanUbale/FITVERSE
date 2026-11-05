import React from "react";
import { FitnessCompanion } from "../3D/FitnessCompanion";

export const Companion3D = ({ activeMuscle, onSelectMuscle }) => {
  return (
    <div className="relative rounded-[28px] overflow-hidden bg-[#1E1D3A] border border-white/[0.06] p-4 lg:p-6 shadow-2xl flex flex-col justify-between group">
      {/* Saturated Indigo Radial Glow behind 3D model */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80%] h-[80%] rounded-full bg-gradient-radial from-[#4F5BFF]/35 via-[#6C3CE0]/15 to-transparent blur-3xl opacity-80" />
      </div>

      {/* 3D Fitness Companion Canvas */}
      <div className="relative z-10 w-full h-[400px] lg:h-[430px]">
        <FitnessCompanion
          activeMuscle={activeMuscle}
          onSelectMuscle={onSelectMuscle}
          className="h-full border-none shadow-none bg-transparent"
        />
      </div>
    </div>
  );
};

