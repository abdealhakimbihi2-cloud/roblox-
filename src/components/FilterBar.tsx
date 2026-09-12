import React from 'react';
import { 
  Laptop, 
  Smartphone, 
  Apple, 
  Globe, 
  Sparkles, 
  Gamepad2, 
  Wrench, 
  Sliders, 
  Layers 
} from 'lucide-react';
import { CategoryType, PlatformType } from '../types';

interface FilterBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  selectedPlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
  countsByCategory: Record<CategoryType, number>;
  countsByPlatform: Record<PlatformType, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  countsByCategory,
  countsByPlatform
}) => {
  const categories: { type: CategoryType; label: string; icon: React.ReactNode }[] = [
    { type: 'All', label: 'All Resources', icon: <Layers className="w-3.5 h-3.5" /> },
    { type: 'Games', label: 'Games', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { type: 'Apps', label: 'Apps', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { type: 'Tweaks', label: 'Tweaks', icon: <Sliders className="w-3.5 h-3.5" /> },
    { type: 'Tools', label: 'Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  const platforms: { type: PlatformType; label: string; icon: React.ReactNode }[] = [
    { type: 'All', label: 'All Systems', icon: <Globe className="w-3.5 h-3.5" /> },
    { type: 'Android', label: 'Android', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { type: 'iOS', label: 'iOS', icon: <Apple className="w-3.5 h-3.5" /> },
    { type: 'Desktop', label: 'Desktop / PC', icon: <Laptop className="w-3.5 h-3.5" /> },
    { type: 'Multiplatform', label: 'Multi-Device', icon: <Globe className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Category Tabs (Primary) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.type;
          const count = countsByCategory[cat.type] ?? 0;
          return (
            <button
              key={cat.type}
              onClick={() => onSelectCategory(cat.type)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-500/30'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                  isActive
                    ? 'bg-emerald-700/80 text-emerald-100'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Platform Pills (Secondary Filter) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
          Platform:
        </span>
        {platforms.map((plat) => {
          const isActive = selectedPlatform === plat.type;
          const count = countsByPlatform[plat.type] ?? 0;
          return (
            <button
              key={plat.type}
              onClick={() => onSelectPlatform(plat.type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-slate-200 text-slate-900 font-semibold shadow-sm'
                  : 'bg-slate-900/50 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {plat.icon}
              <span>{plat.label}</span>
              {plat.type !== 'All' && (
                <span className={`text-[10px] opacity-75`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
