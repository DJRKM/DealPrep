"use client";

import React, { useState } from "react";
import { Search, Sparkles, Building2, User, Target, Globe, ArrowRight, Loader2 } from "lucide-react";

interface DossierFormProps {
  onGenerate: (data: {
    personName: string;
    companyName: string;
    meetingGoal: string;
    country: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const PRESETS = [
  {
    label: "Tokyo • Sony Group",
    personName: "Kenji Sato",
    companyName: "Sony Group",
    meetingGoal: "Pitching B2B enterprise AI compliance & cloud architecture modernization",
    country: "Japan",
    badge: "🇯🇵 Japan"
  },
  {
    label: "Walldorf • SAP SE",
    personName: "Christian Klein",
    companyName: "SAP SE",
    meetingGoal: "Automated EU AI Act verification & continuous regulatory compliance integration",
    country: "Germany",
    badge: "🇩🇪 Germany"
  },
  {
    label: "Singapore • DBS Bank",
    personName: "Piyush Gupta",
    companyName: "DBS Bank",
    meetingGoal: "Next-gen FinTech scalability & cross-border regulatory risk intelligence",
    country: "Singapore",
    badge: "🇸🇬 Singapore"
  }
];

export default function DossierForm({ onGenerate, isLoading }: DossierFormProps) {
  const [personName, setPersonName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [meetingGoal, setMeetingGoal] = useState("");
  const [country, setCountry] = useState("Japan");
  const [loadingStep, setLoadingStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !companyName.trim()) return;

    // Simulate progress messages during generation
    setLoadingStep(1);
    const timer1 = setTimeout(() => setLoadingStep(2), 1600);
    const timer2 = setTimeout(() => setLoadingStep(3), 3200);

    try {
      await onGenerate({
        personName: personName.trim(),
        companyName: companyName.trim(),
        meetingGoal: meetingGoal.trim(),
        country
      });
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setLoadingStep(0);
    }
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setPersonName(preset.personName);
    setCompanyName(preset.companyName);
    setMeetingGoal(preset.meetingGoal);
    setCountry(preset.country);
  };

  return (
    <div className="caldera-card p-8 sm:p-12 mb-12 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#070607]/10">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-[#070607] tracking-tight uppercase">
            MEETING INTELLIGENCE ENGINE
          </h2>
          <p className="text-sm text-[#070607]/70 font-body">
            Provide the meeting target to dispatch real-time scraping & AI diplomatic protocol generation.
          </p>
        </div>

        {/* 1-Click Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#070607]/50 font-semibold mr-1">
            Quick Load:
          </span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs font-semibold bg-[#e2e2df] hover:bg-[#fc5000] hover:text-white transition-colors duration-200 text-[#070607] px-3.5 py-1.5 rounded-full border border-[#070607]/10"
            >
              {preset.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Form Console */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Executive Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#070607]/70 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#fc5000]" />
              Executive / Counterpart Name *
            </label>
            <input
              type="text"
              required
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="e.g. Kenji Sato, Christian Klein, Satya Nadella"
              className="w-full h-14 px-6 rounded-full bg-[#f7f6f2] border-1.5 border-[#070607]/15 focus:border-[#fc5000] focus:outline-none text-[#070607] placeholder:text-[#070607]/40 text-base font-body transition-colors"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#070607]/70 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#fc5000]" />
              Target Enterprise / Organization *
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Sony Group, SAP SE, Toyota, DBS Bank"
              className="w-full h-14 px-6 rounded-full bg-[#f7f6f2] border-1.5 border-[#070607]/15 focus:border-[#fc5000] focus:outline-none text-[#070607] placeholder:text-[#070607]/40 text-base font-body transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meeting Objective */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#070607]/70 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#fc5000]" />
              Meeting Goal / Agenda Focus
            </label>
            <input
              type="text"
              value={meetingGoal}
              onChange={(e) => setMeetingGoal(e.target.value)}
              placeholder="e.g. Presenting enterprise AI compliance tool & cloud audit pilot"
              className="w-full h-14 px-6 rounded-full bg-[#f7f6f2] border-1.5 border-[#070607]/15 focus:border-[#fc5000] focus:outline-none text-[#070607] placeholder:text-[#070607]/40 text-base font-body transition-colors"
            />
          </div>

          {/* Cultural Protocol Region */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#070607]/70 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#524ae9]" />
              Cultural Protocol Context
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-14 px-6 pr-10 rounded-full bg-[#f7f6f2] border-1.5 border-[#070607]/15 focus:border-[#fc5000] focus:outline-none text-[#070607] text-base font-body appearance-none cursor-pointer transition-colors"
              >
                <option value="Japan">Japan (Tokyo) 🇯🇵</option>
                <option value="Singapore">Singapore 🇸🇬</option>
                <option value="Germany">Germany (Frankfurt / Munich) 🇩🇪</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="Hong Kong">Hong Kong 🇭🇰</option>
                <option value="Global">Global Enterprise 🌐</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[#070607]/50">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#070607]/60">
            {isLoading ? (
              <span className="flex items-center gap-2 text-[#fc5000] font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                {loadingStep === 1 && "Scraping company announcements & deals via Firecrawl..."}
                {loadingStep === 2 && "Synthesizing executive psychology & talking points..."}
                {loadingStep === 3 && "Calibrating cross-border cultural etiquette protocol..."}
                {loadingStep === 0 && "Generating dossier..."}
              </span>
            ) : (
              <span>⚡ Dispatches live web crawl + multi-model diplomatic synthesis in ~3 seconds</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto caldera-pill-btn caldera-pill-btn-primary h-14 px-10 text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Synthesizing Dossier...</span>
              </>
            ) : (
              <>
                <span>Generate Executive Dossier</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
