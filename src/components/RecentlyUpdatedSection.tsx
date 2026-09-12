import React from 'react';
import { RefreshCw, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { GameResource } from '../types';

interface RecentlyUpdatedSectionProps {
  resources: GameResource[];
  onSelectResource: (resource: GameResource) => void;
}

export const RecentlyUpdatedSection: React.FC<RecentlyUpdatedSectionProps> = ({
  resources,
  onSelectResource
}) => {
  const recentItems = resources.filter((r) => r.isRecent || r.badge === 'UPDATED' || r.badge === 'NEW').slice(0, 4);

  return (
    <section className="py-10 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Index</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-1">
          Recently Updated & Patched
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Freshly tested releases, compatibility hotfixes, and updated configuration profiles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource(item)}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer group"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-14 h-14 rounded-lg object-cover bg-slate-950 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-semibold mb-0.5">
                  <span>{item.version}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{item.lastUpdated}</span>
                </div>
                <h4 className="font-display font-semibold text-xs sm:text-sm text-white group-hover:text-cyan-300 truncate">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span>{item.platform}</span>
                  <span>•</span>
                  <span>{item.fileSize}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
