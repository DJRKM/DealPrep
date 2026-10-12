"use client";

import React from "react";
import { Sparkles, History, Globe2 } from "lucide-react";

interface HeaderProps {
  onOpenHistory: () => void;
  savedCount: number;
}

export default function Header({ onOpenHistory, savedCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#070607]/10 bg-[#f7f6f2]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <img
            src="/logo.jpeg"
            alt="DealPrep Logo"
            className="w-11 h-11 rounded-full object-cover border border-[#070607]/15 shadow-sm hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl tracking-wide text-[#070607]">
                DEALPREP
              </span>
              <span className="bg-[#f5f28e] text-[#070607] text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Intelligence
              </span>
            </div>
            <p className="text-xs text-[#070607]/60 hidden sm:block">
              Executive Meeting Briefings & Cross-Border Protocol
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#e2e2df]/80 border border-[#070607]/10 rounded-full px-3.5 py-1.5 text-xs text-[#070607]">
            <span className="w-2 h-2 rounded-full bg-[#fc5000] animate-pulse" />
            <span>OpenRouter & Firecrawl Live</span>
          </div>

          <button
            onClick={onOpenHistory}
            className="caldera-pill-btn caldera-pill-btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <History className="w-4 h-4" />
            <span>Dossier Archive</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#070607] text-white text-[11px] flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
