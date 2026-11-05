import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Heart,
  Dumbbell,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Activity,
  Layers,
  ChevronRight,
  Shield,
  Play
} from "lucide-react";
import { useFitness } from "../context/FitnessContext";
import { EyebrowLabel } from "../components/ui/EyebrowLabel";
import { PageHeader } from "../components/ui/PageHeader";
import { DarkCard } from "../components/ui/DarkCard";
import { Chip } from "../components/ui/Chip";
import { YellowButton } from "../components/ui/YellowButton";

export const ExerciseLibrary = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryExercises, activeCategory, favorites, toggleFavorite } = useFitness();

  const muscleParam = searchParams.get("muscle") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState(muscleParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Extract all unique muscle groups
  const muscleGroups = useMemo(() => {
    const set = new Set();
    categoryExercises.forEach((ex) => {
      if (ex.muscleGroup) set.add(ex.muscleGroup);
      if (ex.targetMuscles) ex.targetMuscles.forEach((m) => set.add(m.split(" ")[0]));
    });
    return ["All", ...Array.from(set)];
  }, [categoryExercises]);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filtered exercises
  const filteredExercises = useMemo(() => {
    return categoryExercises.filter((ex) => {
      const matchesSearch =
        searchQuery === "" ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscles?.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesMuscle =
        selectedMuscle === "All" ||
        ex.muscleGroup?.toLowerCase() === selectedMuscle.toLowerCase() ||
        ex.targetMuscles?.some((m) => m.toLowerCase().includes(selectedMuscle.toLowerCase()));

      const matchesDifficulty =
        selectedDifficulty === "All" || ex.difficulty === selectedDifficulty;

      const matchesFav = !onlyFavorites || favorites.includes(ex.id);

      return matchesSearch && matchesMuscle && matchesDifficulty && matchesFav;
    });
  }, [categoryExercises, searchQuery, selectedMuscle, selectedDifficulty, onlyFavorites, favorites]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. TOP HEADER & FAVORITES TOGGLE */}
      <PageHeader
        eyebrow={`${activeCategory.toUpperCase()} REPOSITORY`}
        title="Exercise Library"
        highlight="Library"
        subtitle="Browse step-by-step biomechanical execution, muscle targets, and postural cues."
      >
        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            onlyFavorites
              ? "bg-[#FFD21F] text-black shadow-[0_0_15px_rgba(255,210,31,0.35)]"
              : "bg-[#111111] border border-white/[0.08] text-[#A1A1A1] hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${onlyFavorites ? "fill-black text-black" : "text-[#A1A1A1]"}`} />
          <span>{onlyFavorites ? "Showing Favorites" : "Favorites Only"}</span>
        </button>
      </PageHeader>

      {/* 2. SEARCH BAR & DIFFICULTY CHIPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Large Search Bar */}
        <div className="lg:col-span-7 relative">
          <Search className="w-4 h-4 text-[#6B6B6B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises, muscles, equipment..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#111111] border border-white/[0.08] text-white text-xs placeholder-[#6B6B6B] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] transition-all"
          />
        </div>

        {/* Difficulty Chips */}
        <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-2 overflow-x-auto">
          {difficulties.map((diff) => (
            <Chip
              key={diff}
              label={diff}
              selected={selectedDifficulty === diff}
              onClick={() => setSelectedDifficulty(diff)}
            />
          ))}
        </div>
      </div>

      {/* 3. MUSCLE GROUPS AS CHIPS (selected = yellow) */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1A1] block">
          Filter By Target Muscle
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {muscleGroups.map((mg) => (
            <Chip
              key={mg}
              label={mg}
              selected={selectedMuscle === mg}
              onClick={() => setSelectedMuscle(mg)}
            />
          ))}
        </div>
      </div>

      {/* 4. EXERCISE CARDS GRID (3 to 4 columns) */}
      {filteredExercises.length === 0 ? (
        /* Clean Empty State */
        <DarkCard className="p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/5 text-[#FFD21F] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">No Exercises Match Filters</h3>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Try adjusting your search query, muscle target, or difficulty level.
          </p>
          <YellowButton
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("All");
              setSelectedDifficulty("All");
              setOnlyFavorites(false);
            }}
            className="text-xs"
          >
            Clear Filters
          </YellowButton>
        </DarkCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => {
            const isFav = favorites.includes(exercise.id);

            return (
              <DarkCard
                key={exercise.id}
                onClick={() => navigate(`/exercise/${exercise.id}`)}
                className="overflow-hidden p-0 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top Dark Header Area */}
                  <div className="h-32 p-4 relative flex items-start justify-between bg-[#161616] border-b border-white/[0.05]">
                    {/* Gray Difficulty Pill */}
                    <span className="px-3 py-1 rounded-full bg-black/80 border border-white/[0.08] text-[10px] font-extrabold uppercase tracking-widest text-[#A1A1A1]">
                      {exercise.difficulty}
                    </span>

                    {/* Heart Favorite Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                      className="p-2 rounded-full bg-black/60 border border-white/[0.08] text-white hover:border-[#FFD21F]/40 transition-all cursor-pointer"
                      title={isFav ? "Remove Favorite" : "Add Favorite"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? "fill-[#FFD21F] text-[#FFD21F]" : "text-[#A1A1A1]"
                        }`}
                      />
                    </button>

                    {/* Bottom Muscle Tag */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD21F]">
                        {exercise.muscleGroup || "Compound"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-extrabold text-white group-hover:text-[#FFD21F] transition-colors leading-snug">
                      {exercise.name}
                    </h3>

                    {/* Equipment & Target Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#161616] border border-white/[0.05] text-[10px] font-bold text-[#A1A1A1] flex items-center gap-1">
                        <Dumbbell className="w-3 h-3 text-[#FFD21F]" />
                        <span className="truncate max-w-[130px]">{exercise.equipment}</span>
                      </span>
                      {exercise.targetMuscles?.[0] && (
                        <span className="px-2.5 py-1 rounded-full bg-[#161616] border border-white/[0.05] text-[10px] font-bold text-[#A1A1A1]">
                          {exercise.targetMuscles[0].split(" ")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row with Sets/Reps & Yellow View Details link */}
                <div className="px-5 pb-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#6B6B6B]">
                    {exercise.recommendedSets} sets × {exercise.recommendedReps}
                  </span>
                  <span className="text-xs font-black text-[#FFD21F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFD21F]" />
                  </span>
                </div>
              </DarkCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
