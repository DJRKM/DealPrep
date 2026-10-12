"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import DossierForm from "@/components/DossierForm";
import DossierView, { DossierData } from "@/components/DossierView";
import RecentDossiersModal from "@/components/RecentDossiersModal";
import confetti from "canvas-confetti";
import { Globe, Zap, Shield, Sparkles, Building2, ChevronRight } from "lucide-react";

export default function Home() {
  const [dossier, setDossier] = useState<DossierData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedDossiers, setSavedDossiers] = useState<any[]>([]);

  // Fetch saved dossiers from Supabase on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/dossiers");
      if (res.ok) {
        const data = await res.json();
        setSavedDossiers(data.dossiers || []);
      }
    } catch (err) {
      console.warn("Could not fetch dossier history:", err);
    }
  };

  const handleGenerate = async (formData: {
    personName: string;
    companyName: string;
    meetingGoal: string;
    country: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-dossier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate meeting dossier.");
      }

      setDossier(data.dossier);
      fetchHistory(); // Refresh saved list

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#fc5000", "#524ae9", "#f5f28e"],
      });

      // Smooth scroll to top of view
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDossier(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e2e2df] text-[#070607]">
      {/* Global Caldera Header */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={savedDossiers.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {error && (
          <div className="mb-6 p-4 rounded-3xl bg-red-100 border border-red-300 text-red-800 text-sm font-semibold flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={() => setError(null)}
              className="text-xs uppercase underline tracking-wider"
            >
              Dismiss
            </button>
          </div>
        )}

        {!dossier ? (
          <div>
            {/* Hero with Looped Video + Frosted Glass & Grain */}
            <HeroVideo />

            {/* Interactive Dossier Form Console */}
            <DossierForm onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Caldera 3-Column Architecture Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="caldera-card p-8">
                <div className="w-12 h-12 rounded-full bg-[#fc5000] text-white flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#070607] uppercase mb-2">
                  FIRECRAWL DEALS RADAR
                </h3>
                <p className="text-sm text-[#070607]/75 font-body leading-relaxed">
                  Scrapes the latest quarterly announcements, M&A filings, and key partnerships so you can pivot current momentum into your meeting agenda.
                </p>
              </div>

              <div className="caldera-card p-8">
                <div className="w-12 h-12 rounded-full bg-[#524ae9] text-white flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#070607] uppercase mb-2">
                  DIPLOMATIC PROTOCOLS
                </h3>
                <p className="text-sm text-[#070607]/75 font-body leading-relaxed">
                  Calibrated for Tokyo (Meishi rituals & Nemawashi consensus), Singapore (FinTech pragmatism), and Germany (direct technical rigor).
                </p>
              </div>

              <div className="caldera-card p-8">
                <div className="w-12 h-12 rounded-full bg-[#070607] text-[#f5f28e] flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#070607] uppercase mb-2">
                  VERBATIM ICEBREAKERS
                </h3>
                <p className="text-sm text-[#070607]/75 font-body leading-relaxed">
                  Exact, high-status opening sentences that anchor your authority in the first 45 seconds and steer clear of common conversation taboos.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Rendered Executive Dossier Sheet */
          <DossierView dossier={dossier} onReset={handleReset} />
        )}
      </main>

      {/* History Modal */}
      <RecentDossiersModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        dossiers={savedDossiers}
        onSelect={(selectedDossier) => setDossier(selectedDossier)}
      />

      {/* Caldera Minimalist Footer */}
      <footer className="no-print border-t border-[#070607]/10 bg-[#f7f6f2] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#070607]/60">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-[#070607] tracking-wider">
              DEALPREP
            </span>
            <span>•</span>
            <span>Architected with Caldera Design System</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-[#fc5000]/10 text-[#fc5000] font-bold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
              OpenRouter + Firecrawl + Supabase
            </span>
            <span className="hidden md:inline text-[#070607]/40">|</span>
            <span className="font-medium text-[#070607]">
              Project Portfolio by Roshan Khaja Mohamed
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
