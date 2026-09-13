import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { ResourceCard } from './components/ResourceCard';
import { ResourceGridSkeleton } from './components/ResourceCardSkeleton';
import { ResourceModal } from './components/ResourceModal';
import { RobloxTipsPage } from './components/RobloxTipsPage';
import { SpeedEscapePage } from './components/SpeedEscapePage';
import { StealAnEggPage } from './components/StealAnEggPage';
import { NightsForestPage } from './components/NightsForestPage';
import { BrookhavenPage } from './components/BrookhavenPage';
import { AnimalHospitalPage } from './components/AnimalHospitalPage';
import { Footer } from './components/Footer';
import { INITIAL_RESOURCES } from './data/resources';
import { GameResource, FilterType } from './types';
import { SearchX, ShieldCheck } from 'lucide-react';

export default function App() {
  // ONLY the 7 specified games, in the exact required order
  const [resources] = useState<GameResource[]>(INITIAL_RESOURCES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedResource, setSelectedResource] = useState<GameResource | null>(null);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [showRobloxTips, setShowRobloxTips] = useState(false);
  const [showSpeedEscape, setShowSpeedEscape] = useState(false);
  const [showStealAnEgg, setShowStealAnEgg] = useState(false);
  const [showNightsForest, setShowNightsForest] = useState(false);
  const [showBrookhaven, setShowBrookhaven] = useState(false);
  const [showAnimalHospital, setShowAnimalHospital] = useState(false);

  // Initial perceived load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Dark / Light Mode state matching zupgame.store
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gamehub_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('gamehub_theme', 'dark');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('gamehub_theme', 'light');
      }
    } catch {
      // ignore storage error
    }
  }, [isDarkMode]);

  // Filter & Search logic
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // Filter tab check (iOS, Android, Desktop, No Jailbreak)
      if (activeFilter) {
        if (activeFilter === 'iOS' && !item.platforms.includes('iOS')) {
          return false;
        }
        if (activeFilter === 'Android' && !item.platforms.includes('Android')) {
          return false;
        }
        if (activeFilter === 'Desktop' && !item.platforms.includes('Desktop')) {
          return false;
        }
        if (activeFilter === 'No Jailbreak' && !item.isNoJailbreak) {
          return false;
        }
      }

      // Search Query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        if (!matchName) {
          return false;
        }
      }

      return true;
    });
  }, [resources, activeFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user clicked Roblox, display the Roblox Tips interactive page matching user screenshot
  if (showRobloxTips) {
    return <RobloxTipsPage onBack={() => setShowRobloxTips(false)} />;
  }

  // If user clicked Speed Escape, display the Speed Escape Items & Boosts page matching user screenshots
  if (showSpeedEscape) {
    return <SpeedEscapePage onBack={() => setShowSpeedEscape(false)} />;
  }

  // If user clicked Steal an Egg, display the Steal an Egg All Eggs & Pets page matching user screenshots
  if (showStealAnEgg) {
    return <StealAnEggPage onBack={() => setShowStealAnEgg(false)} />;
  }

  // If user clicked 99 Nights in the Forest, display the Free Items & Boosts Speed Keyboard Escape matching user screenshots
  if (showNightsForest) {
    return <NightsForestPage onBack={() => setShowNightsForest(false)} />;
  }

  // If user clicked Brookhaven, display the Brookhaven 15 Free Passes page matching user screenshot
  if (showBrookhaven) {
    return <BrookhavenPage onBack={() => setShowBrookhaven(false)} />;
  }

  // If user clicked Animal Hospital, display the Animal Hospital All 21 Characters page matching user screenshot
  if (showAnimalHospital) {
    return <AnimalHospitalPage onBack={() => setShowAnimalHospital(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Exact Header matching zupgame.store */}
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          onLogoClick={handleResetFilters}
        />

        {/* Exact Hero Section with 4 Filters matching zupgame.store */}
        <Hero
          activeFilter={activeFilter}
          onSelectFilter={(f) => setActiveFilter(f)}
        />

        {/* Exact Search Bar matching zupgame.store */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          resultCount={filteredResources.length}
        />

        {/* Main Games Container with the Games */}
        <main className="zup-container">
          {isLoading ? (
            <ResourceGridSkeleton count={7} />
          ) : filteredResources.length > 0 ? (
            filteredResources.map((game) => (
              <ResourceCard
                key={game.id}
                resource={game}
                onSelect={(res) => {
                  const normalizedName = res.name.toLowerCase();
                  if (normalizedName === 'roblox' || res.id === 'roblox') {
                    setShowRobloxTips(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (
                    normalizedName.includes('speed escape') || 
                    res.id === 'speed-escape' ||
                    normalizedName === 'speed escape'
                  ) {
                    setShowSpeedEscape(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (
                    normalizedName.includes('steal an egg') || 
                    res.id === 'steal-an-egg' ||
                    normalizedName === 'steal an egg'
                  ) {
                    setShowStealAnEgg(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (
                    normalizedName.includes('99 nights') || 
                    res.id === '99-nights-in-the-forest' ||
                    normalizedName.includes('forest')
                  ) {
                    setShowNightsForest(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (
                    normalizedName.includes('brookhaven') || 
                    res.id === 'brookhaven'
                  ) {
                    setShowBrookhaven(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (
                    normalizedName.includes('animal hospital') || 
                    res.id === 'animal-hospital'
                  ) {
                    setShowAnimalHospital(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setSelectedResource(res);
                  }
                }}
              />
            ))
          ) : (
            /* Friendly Simple Empty State if search finds no game */
            <div className="col-span-full py-14 px-6 text-center rounded-2xl bg-slate-800/50 border border-slate-700/60 max-w-md mx-auto my-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white">
                No games found
              </h3>
              <p className="text-xs text-slate-400">
                No game matched your search query "{searchQuery}".
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer matching zupgame.store */}
      <Footer onDisclaimerClick={() => setIsDisclaimerOpen(true)} />

      {/* Detail / Download Modal */}
      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      {/* Disclaimer Modal */}
      {isDisclaimerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div 
            className="fixed inset-0" 
            onClick={() => setIsDisclaimerOpen(false)} 
          />
          <div className="relative w-full max-w-lg bg-[#1a1f35] border border-slate-700 rounded-2xl p-6 text-slate-200 z-10 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>GAMEHUB Disclaimer & Safe Browsing</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              GAMEHUB is an independent curated directory designed for gamers. All game titles, logos, brand names, and trademarks belong exclusively to their respective owners (Roblox Corporation, Scopely, SYBO Games, Candy Rufus Games, Blockman GO Studio, NEKKI).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every listed resource is checksum-audited against multiple antivirus engines to ensure clean signatures.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
