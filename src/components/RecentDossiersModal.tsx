"use client";

import React from "react";
import { X, Building2, User, Globe, Calendar, ArrowUpRight, History } from "lucide-react";
import { DossierData } from "./DossierView";

interface SavedDossierRecord {
  id: string;
  created_at: string;
  person_name: string;
  company_name: string;
  meeting_goal: string;
  country: string;
  full_dossier: DossierData;
}

interface RecentDossiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossiers: SavedDossierRecord[];
  onSelect: (dossier: DossierData) => void;
}

export default function RecentDossiersModal({
  isOpen,
  onClose,
  dossiers,
  onSelect,
}: RecentDossiersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#070607]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f7f6f2] border-2 border-[#070607]/10 w-full max-w-3xl max-h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#070607]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#070607] text-white flex items-center justify-center">
              <History className="w-5 h-5 text-[#f5f28e]" />
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#070607] uppercase tracking-tight">
                DOSSIER ARCHIVES (SUPABASE)
              </h3>
              <p className="text-xs text-[#070607]/60 font-body">
                Previously generated executive intelligence briefs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#e2e2df] hover:bg-[#070607] hover:text-white transition-colors flex items-center justify-center text-[#070607]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossiers List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1">
          {dossiers.length === 0 ? (
            <div className="text-center py-12 text-[#070607]/60 font-body">
              <p>No previous dossiers found in Supabase.</p>
              <p className="text-xs mt-1">Generate your first dossier to populate this archive!</p>
            </div>
          ) : (
            dossiers.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.full_dossier) {
                    onSelect(item.full_dossier);
                    onClose();
                  }
                }}
                className="group bg-[#e2e2df]/60 hover:bg-[#f7f6f2] hover:border-[#fc5000] transition-all border border-[#070607]/10 p-5 rounded-3xl cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-base text-[#070607] group-hover:text-[#fc5000] transition-colors">
                      {item.person_name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#fc5000] text-white font-semibold uppercase">
                      {item.company_name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#524ae9] text-white font-semibold">
                      {item.country || "Global"}
                    </span>
                  </div>

                  <p className="text-xs text-[#070607]/70 font-medium line-clamp-1">
                    Agenda: {item.meeting_goal || "Executive Briefing"}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-[#070607]/50 mt-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#070607]/60 group-hover:text-[#fc5000]">
                    Load Brief
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#070607]/60 group-hover:text-[#fc5000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
