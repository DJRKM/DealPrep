"use client";

import React from "react";
import { ShieldAlert, Compass, Globe, Sparkles } from "lucide-react";

export default function HeroVideo() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[#070607]/10 bg-[#e2e2df] mb-12 shadow-sm">
      {/* Background Video with Double-Layer Frosted Glass & Grain */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-95 contrast-105"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Layer 1: Frosted Limestone Glass Layer */}
        <div className="absolute inset-0 video-frosted-cover" />

        {/* Layer 2: Film Grain Texture to Hide Compression & Add Tactile Depth */}
        <div className="absolute inset-0 grain-layer mix-blend-overlay pointer-events-none" />

        {/* Layer 3: Warm Limestone Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7f6f2]/40 to-[#e2e2df]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-5xl">
        {/* Category Badge in Caldera Sulfur Yellow */}
        <div className="inline-flex items-center gap-2 bg-[#f5f28e] border border-[#070607]/15 text-[#070607] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#fc5000]" />
          <span>Cross-Border B2B Executive Intelligence</span>
        </div>

        {/* Large Architectural Caldera Headline */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-[#070607] leading-[0.88] tracking-tight uppercase mb-6">
          COMMAND <br />
          <span className="text-[#fc5000]">THE ROOM.</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-[#070607]/80 max-w-2xl leading-relaxed mb-8">
          Enter any executive name, their company, and your meeting objective. DealPrep scrapes real-time deals, analyzes corporate priorities, and arms you with a tailored meeting dossier and regional diplomatic etiquette.
        </p>

        {/* Pillar Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#f7f6f2] border border-[#070607]/10 rounded-full px-4 py-2 text-xs md:text-sm text-[#070607]">
            <Globe className="w-4 h-4 text-[#524ae9]" />
            <span>Tokyo • Singapore • Germany • US Protocols</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f7f6f2] border border-[#070607]/10 rounded-full px-4 py-2 text-xs md:text-sm text-[#070607]">
            <Compass className="w-4 h-4 text-[#fc5000]" />
            <span>Live Deal & M&A Radar</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f7f6f2] border border-[#070607]/10 rounded-full px-4 py-2 text-xs md:text-sm text-[#070607]">
            <ShieldAlert className="w-4 h-4 text-[#070607]" />
            <span>Cultural Taboo Safeguards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
