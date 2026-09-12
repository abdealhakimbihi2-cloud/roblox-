import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

interface StatusBarProps {
  onSearchClick?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = () => {
  return (
    <div className="w-full bg-[#080B11] border-b border-slate-800/60 text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Operational Status with Pulsing Dot */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[10px]">
              Platform Operational
            </span>
          </div>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 font-medium">
            <Activity className="w-3 h-3 text-slate-400" />
            Database Synced: <span className="text-slate-300">v4.2.8</span>
          </span>
        </div>

        {/* Right: Security Guarantee & Updated timestamp */}
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Malware-Scanned Hashes</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-medium">100% Clean</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Updated 12m ago</span>
        </div>
      </div>
    </div>
  );
};
