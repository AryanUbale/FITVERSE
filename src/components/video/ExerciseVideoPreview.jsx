import React, { useState } from "react";
import {
  Play,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  Film,
  RotateCcw,
  Maximize2
} from "lucide-react";
import { getExerciseVideo } from "../../data/exerciseVideos";

export const ExerciseVideoPreview = ({
  exercise,
  className = "",
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoData = getExerciseVideo(exercise?.id || exercise?.name);
  const startSeconds = videoData.startTime ?? 30;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoData.videoId}?autoplay=1&start=${startSeconds}&rel=0&modestbranding=1`;

  return (
    <div
      className={`relative w-full rounded-[24px] overflow-hidden bg-[#111111] border border-white/[0.08] shadow-2xl flex flex-col justify-between group ${className}`}
    >
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#161616]/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/15 border border-[#FFD21F]/30 flex items-center justify-center text-[#FFD21F] shrink-0">
            <Film className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD21F]">
                {videoData.category} Video Tutorial
              </span>
              <span className="text-[10px] text-[#A1A1A1] hidden sm:inline">• Starts at 0:30 (Intro Skipped)</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
              {exercise?.name || videoData.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {videoData.duration && (
            <span className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono text-[#A1A1A1]">
              <Clock className="w-3 h-3 text-[#FFD21F]" />
              <span>{videoData.duration}</span>
            </span>
          )}

          {/* Direct YouTube Link with 30s jump */}
          <a
            href={
              videoData.videoId
                ? `https://www.youtube.com/watch?v=${videoData.videoId}&t=${startSeconds}s`
                : videoData.video_search_url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-xs font-bold text-[#A1A1A1] hover:text-white border border-white/[0.08] transition-all"
            title="Open YouTube tutorial at 0:30 in new tab"
          >
            <span className="hidden sm:inline">YouTube (0:30)</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FFD21F]" />
          </a>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={`${exercise?.name || videoData.name} Proper Form Tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-none"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black via-black/80 to-black/60">
            {/* Background moody gym image fallback */}
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80"
              alt="Exercise Form Demonstration"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-40 pointer-events-none"
            />

            {/* Glowing Center Play Button */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FFD21F] hover:bg-[#FFE04D] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,210,31,0.5)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer group/btn"
                title="Play Video Demonstration"
              >
                <Play className="w-8 h-8 fill-black ml-1 transition-transform group-hover/btn:scale-110" />
              </button>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFD21F] block">
                  Click To Play Form Video • Jumps to 0:30
                </span>
                <p className="text-xs text-[#A1A1A1] mt-1 max-w-sm font-medium">
                  High-definition biomechanics breakdown & execution cues for {exercise?.name || videoData.name}.
                </p>
              </div>
            </div>

            {/* Bottom Floating Pill Bar on Thumbnail */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-black/80 border border-white/10 text-white font-bold backdrop-blur-md text-[11px]">
                {exercise?.muscleGroup || exercise?.targetMuscles?.[0] || "Target Muscles"}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[#FFD21F] font-bold backdrop-blur-md text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFD21F]" />
                <span>Verified Biomechanics</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Key Checkpoints Bar */}
      <div className="p-4 sm:p-5 bg-[#141414] border-t border-white/[0.08] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B6B6B]">
            Form Checkpoints & Execution Focus
          </span>
          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="text-[11px] text-[#A1A1A1] hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset View</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(videoData.focusPoints || [
            "Maintain spinal alignment",
            "Control eccentric tempo (2-3s)",
            "Engage full core tension"
          ]).map((point, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-[#1A1A1A] border border-white/[0.06] flex items-start gap-2 text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD21F] shrink-0 mt-0.5" />
              <span className="text-[#A1A1A1] font-medium leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

