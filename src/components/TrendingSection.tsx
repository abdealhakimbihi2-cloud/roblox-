import React from 'react';
import { Flame, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { GameResource } from '../types';

interface TrendingSectionProps {
  resources: GameResource[];
  onSelectResource: (resource: GameResource) => void;
  onViewAllClick: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  resources,
  onSelectResource,
  onViewAllClick
}) => {
  const trendingItems = resources.filter((r) => r.isTrending || r.badge === 'HOT' || r.badge === 'TRENDING').slice(0, 4);

  if (trendingItems.length === 0) return null;

  return (
    <section className="py-10 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Community Interest</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Trending Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Most accessed game clients, companion utilities, and optimization scripts this week.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Grid for Trending Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource(item)}
              className="group flex flex-col bg-[#111726]/80 hover:bg-[#151E30] border border-slate-800 hover:border-amber-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/90 text-slate-950">
                  {item.badge || 'HOT'}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950/80 backdrop-blur-sm text-slate-300 border border-slate-800">
                  {item.platform}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-400">{item.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                  <span className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all font-semibold flex items-center gap-1">
                    View
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
