"use client";

import React, { useState } from "react";
import {
  Printer,
  Copy,
  Check,
  Globe2,
  TrendingUp,
  MessageSquareQuote,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";

export interface DossierData {
  executive: {
    name: string;
    company: string;
    title: string;
    summary: string;
    personalityArchetype: string;
    readingTime: string;
  };
  dealRadar: Array<{
    title: string;
    dateOrContext: string;
    impact: string;
    relevanceToMeeting: string;
  }>;
  talkingPoints: Array<{
    topic: string;
    opener: string;
    strategicObjective: string;
  }>;
  culturalProtocol: {
    country: string;
    executiveGreeting: string;
    meetingDynamic: string;
    dos: string[];
    donts: string[];
    proTip: string;
  };
  executiveCheatSheet: {
    theOneLinerValueProp: string;
    dangerZoneToAvoid: string;
  };
}

interface DossierViewProps {
  dossier: DossierData;
  onReset: () => void;
}

export default function DossierView({ dossier, onReset }: DossierViewProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const textToCopy = `
DEALPREP EXECUTIVE DOSSIER
Target: ${dossier.executive.name} | ${dossier.executive.company} (${dossier.executive.title})
Cultural Context: ${dossier.culturalProtocol.country}

EXECUTIVE PROFILE:
${dossier.executive.summary}

KEY VALUE PROP:
${dossier.executiveCheatSheet.theOneLinerValueProp}

CULTURAL PROTOCOL & GREETING:
${dossier.culturalProtocol.executiveGreeting}

DYNAMIC:
${dossier.culturalProtocol.meetingDynamic}

PRO-TIP:
${dossier.culturalProtocol.proTip}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#fc5000", "#524ae9", "#f5f28e"]
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Action Toolbar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f7f6f2] border border-[#070607]/10 p-4 rounded-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fc5000]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#070607]">
            Dossier Live • Ready for Executive Meeting
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="caldera-pill-btn caldera-pill-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Brief"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="caldera-pill-btn caldera-pill-btn-primary px-5 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export 1-Page PDF</span>
          </button>

          <button
            onClick={onReset}
            className="caldera-pill-btn caldera-pill-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Brief</span>
          </button>
        </div>
      </div>

      {/* Top Section: Executive Dossier Card */}
      <div className="caldera-card p-8 sm:p-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#070607]/10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="bg-[#fc5000] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {dossier.executive.company}
              </span>
              <span className="bg-[#f5f28e] text-[#070607] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#070607]/10">
                {dossier.executive.personalityArchetype}
              </span>
              <span className="bg-[#524ae9] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {dossier.culturalProtocol.country}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#070607] uppercase tracking-tight leading-[0.9] mb-2">
              {dossier.executive.name}
            </h1>
            <p className="text-base sm:text-lg text-[#070607]/70 font-semibold font-body">
              {dossier.executive.title}
            </p>
          </div>

          <div className="bg-[#e2e2df] p-4 rounded-3xl border border-[#070607]/10 text-center min-w-[140px]">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#070607]/60 block mb-1">
              Readiness Prep
            </span>
            <span className="font-display text-2xl text-[#070607]">
              {dossier.executive.readingTime || "3 MIN READ"}
            </span>
          </div>
        </div>

        {/* Executive Bio & Profile */}
        <div className="pt-8">
          <h3 className="text-xs uppercase tracking-wider font-bold text-[#070607]/50 mb-3">
            Executive Summary & Strategic Psychology
          </h3>
          <p className="text-base sm:text-lg text-[#070607] leading-relaxed font-body">
            {dossier.executive.summary}
          </p>
        </div>

        {/* The One-Liner Value Prop & Danger Zone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#070607]/10">
          <div className="bg-[#f7f6f2] p-5 rounded-3xl border-l-4 border-[#fc5000] border-t border-r border-b border-[#070607]/10">
            <span className="text-xs uppercase tracking-wider font-bold text-[#fc5000] flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5" />
              The One-Liner Value Anchor
            </span>
            <p className="text-sm font-semibold text-[#070607] leading-snug">
              {dossier.executiveCheatSheet.theOneLinerValueProp}
            </p>
          </div>

          <div className="bg-[#f7f6f2] p-5 rounded-3xl border-l-4 border-[#070607] border-t border-r border-b border-[#070607]/10">
            <span className="text-xs uppercase tracking-wider font-bold text-[#070607] flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Danger Zone (Fatal Mistake to Avoid)
            </span>
            <p className="text-sm text-[#070607]/80 leading-snug">
              {dossier.executiveCheatSheet.dangerZoneToAvoid}
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Border Cultural Protocol Card (Volcanic Ember Treatment) */}
      <div className="caldera-card p-8 sm:p-12 border-2 border-[#fc5000]/40 bg-[#f7f6f2] relative overflow-hidden">
        <div className="flex items-center justify-between pb-6 border-b border-[#070607]/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fc5000] flex items-center justify-center text-white">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#070607] uppercase tracking-tight">
                DIPLOMATIC & CULTURAL PROTOCOL
              </h2>
              <p className="text-xs text-[#070607]/60 font-semibold uppercase tracking-wider">
                Region: {dossier.culturalProtocol.country}
              </p>
            </div>
          </div>
          <span className="bg-[#f5f28e] border border-[#070607]/10 text-[#070607] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden sm:block">
            High-Stakes Etiquette
          </span>
        </div>

        {/* Physical Greeting & Communication Dynamics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#e2e2df]/60 p-6 rounded-3xl border border-[#070607]/10">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#fc5000] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Executive Greeting & Physical Ritual
            </h4>
            <p className="text-sm text-[#070607] leading-relaxed">
              {dossier.culturalProtocol.executiveGreeting}
            </p>
          </div>

          <div className="bg-[#e2e2df]/60 p-6 rounded-3xl border border-[#070607]/10">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#524ae9] mb-2 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              Communication Cadence & Meeting Dynamic
            </h4>
            <p className="text-sm text-[#070607] leading-relaxed">
              {dossier.culturalProtocol.meetingDynamic}
            </p>
          </div>
        </div>

        {/* Dos & Don'ts Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#f7f6f2] border border-green-700/20 p-6 rounded-3xl">
            <h4 className="text-xs uppercase tracking-wider font-bold text-green-700 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Strategic Protocol DOs
            </h4>
            <ul className="space-y-3">
              {dossier.culturalProtocol.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#070607]">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f7f6f2] border border-red-700/20 p-6 rounded-3xl">
            <h4 className="text-xs uppercase tracking-wider font-bold text-red-700 mb-4 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Critical Protocol DONTs (Taboos)
            </h4>
            <ul className="space-y-3">
              {dossier.culturalProtocol.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#070607]">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Insider Pro Tip */}
        <div className="bg-[#070607] text-[#ffffff] p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#f5f28e] block mb-1">
              ⭐ Insider Diplomatic Pro-Tip:
            </span>
            <p className="text-sm font-medium text-white/90">
              {dossier.culturalProtocol.proTip}
            </p>
          </div>
          <button
            onClick={triggerConfetti}
            className="caldera-pill-btn bg-[#fc5000] text-white px-5 py-2.5 text-xs font-bold shrink-0 hover:brightness-110"
          >
            Ready to Close
          </button>
        </div>
      </div>

      {/* Recent Corporate Deals & News Radar */}
      <div className="caldera-card p-8 sm:p-12">
        <div className="flex items-center justify-between pb-6 border-b border-[#070607]/10 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#070607] uppercase tracking-tight">
              CORPORATE DEALS & M&A RADAR
            </h2>
            <p className="text-xs text-[#070607]/60 font-semibold uppercase tracking-wider">
              Scraped via Firecrawl & Grounded in Recent Market Initiatives
            </p>
          </div>
          <span className="bg-[#e2e2df] text-[#070607] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            3 Active Signals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dossier.dealRadar.map((deal, idx) => (
            <div
              key={idx}
              className="bg-[#e2e2df]/50 border border-[#070607]/10 p-6 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#fc5000] uppercase tracking-wider block mb-1.5">
                  {deal.dateOrContext}
                </span>
                <h4 className="text-base font-bold text-[#070607] leading-snug mb-3">
                  {deal.title}
                </h4>
                <p className="text-xs text-[#070607]/80 leading-relaxed mb-4">
                  {deal.impact}
                </p>
              </div>

              <div className="pt-4 border-t border-[#070607]/10 mt-2 bg-[#f7f6f2] -mx-6 -mb-6 p-4 rounded-b-3xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#524ae9] block mb-1">
                  How to Pivot to Agenda:
                </span>
                <p className="text-xs font-semibold text-[#070607] leading-snug">
                  {deal.relevanceToMeeting}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Talking Points & Icebreakers */}
      <div className="caldera-card p-8 sm:p-12">
        <div className="flex items-center justify-between pb-6 border-b border-[#070607]/10 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#070607] uppercase tracking-tight">
              STRATEGIC TALKING POINTS & HOOKS
            </h2>
            <p className="text-xs text-[#070607]/60 font-semibold uppercase tracking-wider">
              Verbatim Opener Scripts Designed to Command Peer-Level Respect
            </p>
          </div>
          <MessageSquareQuote className="w-6 h-6 text-[#fc5000]" />
        </div>

        <div className="space-y-6">
          {dossier.talkingPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-[#e2e2df]/40 border border-[#070607]/10 p-6 sm:p-8 rounded-3xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#fc5000]">
                  Talking Point 0{idx + 1} • {point.topic}
                </span>
                <span className="text-xs text-[#070607]/60 font-medium">
                  Objective: {point.strategicObjective}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-semibold text-[#070607] italic leading-relaxed pl-4 border-l-3 border-[#fc5000]">
                {point.opener}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
