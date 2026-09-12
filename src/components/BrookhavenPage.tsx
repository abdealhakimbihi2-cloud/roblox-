import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Gamepad2, 
  TrendingUp, 
  ShoppingBag, 
  Hammer, 
  Coins, 
  Star, 
  ThumbsUp, 
  MessageSquare,
  X,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface BrookhavenPageProps {
  onBack: () => void;
}

interface BrookhavenPass {
  id: string;
  name: string;
  abbr: string;
  gradient: string;
  iconClass: string;
  price: string;
}

const BROOKHAVEN_PASSES: BrookhavenPass[] = [
  {
    id: 'premium',
    name: 'Premium',
    abbr: 'Premi',
    gradient: 'linear-gradient(135deg, #4dd0e1 0%, #0097a7 100%)',
    iconClass: 'premium-icon',
    price: 'Free'
  },
  {
    id: 'vehicle-upgrade',
    name: 'Vehicle Upgrade',
    abbr: 'Vehic',
    gradient: 'linear-gradient(135deg, #7c4dff 0%, #5e35b1 100%)',
    iconClass: 'vehicle-icon',
    price: 'Free'
  },
  {
    id: 'vehicle-speed',
    name: 'Vehicle Speed U...',
    abbr: 'Vehic',
    gradient: 'linear-gradient(135deg, #ff5252 0%, #c62828 100%)',
    iconClass: 'speed-icon',
    price: 'Free'
  },
  {
    id: 'music-unlocked',
    name: 'Music Unlocked',
    abbr: 'Music',
    gradient: 'linear-gradient(135deg, #3949ab 0%, #1a237e 100%)',
    iconClass: 'music-icon',
    price: 'Free'
  },
  {
    id: 'on-demand-fire',
    name: 'On Demand Fire',
    abbr: 'On\nDema',
    gradient: 'linear-gradient(135deg, #ff6f00 0%, #e65100 100%)',
    iconClass: 'fire-icon',
    price: 'Free'
  },
  {
    id: 'horse-unlocked',
    name: 'Horse Unlocked',
    abbr: 'Horse',
    gradient: 'linear-gradient(135deg, #8d6e63 0%, #5d4037 100%)',
    iconClass: 'horse-icon',
    price: 'Free'
  },
  {
    id: 'land-unlocked',
    name: 'Land Unlocked',
    abbr: 'Land',
    gradient: 'linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)',
    iconClass: 'land-icon',
    price: 'Free'
  },
  {
    id: 'faces-unlocked',
    name: 'Faces Unlocked',
    abbr: 'Faces',
    gradient: 'linear-gradient(135deg, #ab47bc 0%, #6a1b9a 100%)',
    iconClass: 'faces-icon',
    price: 'Free'
  },
  {
    id: 'vehicle-pack',
    name: 'Vehicle Pack',
    abbr: 'Vehic',
    gradient: 'linear-gradient(135deg, #26c6da 0%, #0097a7 100%)',
    iconClass: 'pack-icon',
    price: 'Free'
  },
  {
    id: 'penthouse',
    name: 'Penthouse',
    abbr: 'Penth',
    gradient: 'linear-gradient(135deg, #ffd54f 0%, #f9a825 100%)',
    iconClass: 'penthouse-icon',
    price: 'Free'
  },
  {
    id: 'theme-pack',
    name: 'Theme Pack',
    abbr: 'Them',
    gradient: 'linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)',
    iconClass: 'theme-icon',
    price: 'Free'
  },
  {
    id: 'disaster-pass',
    name: 'Disaster Pass',
    abbr: 'Disas',
    gradient: 'linear-gradient(135deg, #ef5350 0%, #c62828 100%)',
    iconClass: 'disaster-icon',
    price: 'Free'
  },
  {
    id: 'estates-unlocked',
    name: 'Estates Unlocked',
    abbr: 'Estate',
    gradient: 'linear-gradient(135deg, #90a4ae 0%, #546e7a 100%)',
    iconClass: 'estates-icon',
    price: 'Free'
  },
  {
    id: 'boat-pack',
    name: 'Boat Pack',
    abbr: 'Boat',
    gradient: 'linear-gradient(135deg, #ffca28 0%, #f57f17 100%)',
    iconClass: 'boat-icon',
    price: 'Free'
  },
  {
    id: 'vip',
    name: 'VIP',
    abbr: 'VIP',
    gradient: 'linear-gradient(135deg, #e0e0e0 0%, #9e9e9e 100%)',
    iconClass: 'vip-icon',
    price: 'Free'
  }
];

export const BrookhavenPage: React.FC<BrookhavenPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'about' | 'servers'>('store');
  const [selectedPass, setSelectedPass] = useState<BrookhavenPass | null>(null);

  // Modal flow states matching blogspot
  const [modalStep, setModalStep] = useState<'input' | 'searching' | 'found' | 'transferring' | 'verify'>('input');
  const [username, setUsername] = useState('');
  const [transferPhase, setTransferPhase] = useState<'searching' | 'found' | 'transferring'>('searching');

  const handleOpenBuy = (pass: BrookhavenPass) => {
    setSelectedPass(pass);
    setModalStep('input');
    setUsername('');
  };

  const handleCloseModal = () => {
    setSelectedPass(null);
  };

  const handleFetchUser = () => {
    if (!username.trim()) {
      alert('Please enter a Roblox username');
      return;
    }
    setModalStep('searching');
    setTimeout(() => {
      setModalStep('found');
    }, 1200);
  };

  const handleStartTransfer = () => {
    setModalStep('transferring');
    setTransferPhase('searching');

    setTimeout(() => {
      setTransferPhase('found');
      setTimeout(() => {
        setTransferPhase('transferring');
        setTimeout(() => {
          setModalStep('verify');
        }, 1800);
      }, 1500);
    }, 1200);
  };

  // Generate deterministic avatar color from username
  const getUserColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 360;
  };

  return (
    <div className="min-h-screen bg-[#dce2e6] text-[#393b3d] font-sans antialiased">
      {/* Roblox Top Header matching brookhan-rp */}
      <header className="bg-white border-b border-[#cfd8dc] px-4 md:px-8 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#e5e7eb] hover:bg-[#d1d5db] text-[#1f2937] text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to GameHub</span>
          </button>

          <div className="hidden sm:flex items-center gap-5 text-sm font-semibold text-[#4b5563]">
            <span className="flex items-center gap-1.5 text-black cursor-pointer hover:text-blue-600">
              <Gamepad2 className="w-4 h-4 text-red-500" /> Games
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-black">
              <TrendingUp className="w-4 h-4" /> Charts
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-black">
              <ShoppingBag className="w-4 h-4" /> Marketplace
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-black">
              <Hammer className="w-4 h-4" /> Create
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#f3f4f6] px-3 py-1 rounded-full text-xs font-bold text-gray-700 border border-gray-300">
            <Coins className="w-3.5 h-3.5 text-yellow-600" />
            <span>Robux Free Event</span>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-[1240px] mx-auto px-4 py-6">
        {/* Game Banner Box */}
        <section className="bg-white rounded-xl overflow-hidden shadow-xs border border-gray-200/80 mb-6">
          {/* Banner Graphic */}
          <div className="w-full h-48 md:h-64 bg-gradient-to-r from-[#357abd] via-[#4a90e2] to-[#3b82f6] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 bg-gradient-to-b from-[#c41e3a] to-[#8b1a2e] text-white px-8 md:px-14 py-3 md:py-4 rounded-xl font-black text-2xl md:text-4xl tracking-wider shadow-xl border border-white/20">
              BROOKHAVEN
            </div>
          </div>

          {/* Game Info Details */}
          <div className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827]">
                Brookhaven 🏡 RP
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                By Wolfpaq Games · Maturity: Minimal
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-gray-600">
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.9 Favorite
                </span>
                <span className="flex items-center gap-1 text-blue-600">
                  <ThumbsUp className="w-3.5 h-3.5" /> 6M+ Likes
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <MessageSquare className="w-3.5 h-3.5" /> 1M+ Comments
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('store')}
              className="bg-[#4a7cff] hover:bg-[#3568ea] text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all cursor-pointer text-base flex items-center gap-2"
            >
              <span>▶ Play & Claim Passes</span>
            </button>
          </div>
        </section>

        {/* Navigation Tabs (About | Store | Servers) */}
        <div className="flex items-center gap-8 border-b-2 border-gray-300 mb-6 font-semibold text-sm">
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'border-gray-800 text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'store'
                ? 'border-gray-800 text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Store (15 Free Passes)
          </button>
          <button
            onClick={() => setActiveTab('servers')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'servers'
                ? 'border-gray-800 text-black font-bold'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Servers
          </button>
        </div>

        {/* TAB 1: Store / Passes (Matching User Screenshot Exactly) */}
        {activeTab === 'store' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Passes
              </h2>
              <span className="text-xs text-emerald-700 bg-emerald-100 font-bold px-3 py-1 rounded-full border border-emerald-300">
                💎 All 15 Passes Free for Limited Time
              </span>
            </div>

            {/* 6-Column Grid matching user's screenshot exactly */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {BROOKHAVEN_PASSES.map((pass) => (
                <div
                  key={pass.id}
                  onClick={() => handleOpenBuy(pass)}
                  className="bg-white rounded-xl p-3.5 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-gray-200/90 flex flex-col justify-between group"
                >
                  {/* Circular Pass Icon matching screenshot */}
                  <div className="flex justify-center mb-2">
                    <div 
                      className="w-[96px] h-[96px] rounded-full border-4 border-[#e0e0e0] flex flex-col items-center justify-center relative overflow-hidden shadow-inner select-none"
                      style={{ background: pass.gradient }}
                    >
                      {/* Broken image icon simulated at top-left matching screenshot */}
                      <div className="absolute top-1 left-2 opacity-60">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>

                      {/* Text inside circle exactly matching screenshot (Premi, Vehic, Music, On Dema, etc.) */}
                      <span className="text-black font-semibold text-[22px] leading-tight tracking-tight text-center px-1">
                        {pass.abbr}
                      </span>
                    </div>
                  </div>

                  {/* Pass Title */}
                  <div className="text-[13px] font-bold text-gray-900 min-h-[38px] flex items-center justify-center leading-snug">
                    {pass.name}
                  </div>

                  {/* Price: 💎 Free matching screenshot */}
                  <div className="text-xs font-bold text-[#00aa00] my-1 flex items-center justify-center gap-1">
                    <span>💎</span>
                    <span>{pass.price}</span>
                  </div>

                  {/* Gray Buy Button matching screenshot */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenBuy(pass);
                    }}
                    className="bg-[#e0e0e0] hover:bg-[#d0d0d0] active:bg-[#c0c0c0] text-gray-800 text-xs font-semibold py-1.5 px-4 rounded-md w-full transition-colors cursor-pointer"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: About Page */}
        {activeTab === 'about' && (
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200/80 shadow-xs space-y-4 leading-relaxed text-sm">
            <h2 className="text-xl font-bold text-gray-900">Description</h2>
            <p>
              A place to hang out with like-minded people and roleplay. Own and live in amazing houses, drive cool vehicles, and explore the city of Brookhaven.
            </p>
            <p className="font-semibold text-gray-800">
              Be whoever you want to be in Brookhaven RP.
            </p>

            <h3 className="text-base font-bold text-gray-900 pt-3">Latest Update:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>🎄 New Fashion Show Estate</li>
              <li>💄 4 New Tools: Camera, Scorecard, Lipstick, Makeup</li>
              <li>💡 2 New Props: Ring Light, Umbrella Light</li>
              <li>👗 24 New Casual & Fashion Emotes!</li>
            </ul>

            <h3 className="text-base font-bold text-gray-900 pt-3">Pass Benefits:</h3>
            <p className="text-gray-700">
              All unlocked game passes allow immediate access to luxury mansions, premium vehicle upgrades, on-demand fire triggers, and exclusive avatars.
            </p>
          </div>
        )}

        {/* TAB 3: Servers Page */}
        {activeTab === 'servers' && (
          <div className="bg-white p-8 rounded-xl border border-gray-200/80 text-center shadow-xs">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Private VIP Servers</h3>
            <p className="text-sm text-gray-600 mb-4">
              All public servers are fully synchronized with our GameHub drop system. You can claim your free passes above and enter any Brookhaven server.
            </p>
            <button 
              onClick={() => setActiveTab('store')}
              className="bg-[#4a7cff] hover:bg-[#3568ea] text-white font-bold px-6 py-2 rounded-lg text-xs"
            >
              Go to Store
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 pb-10 border-t border-gray-300 text-center text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-4 mb-3 font-medium text-gray-600">
            <span>About Us</span>
            <span>·</span>
            <span>Jobs</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
          <p>© 2026 Brookhaven RP · Roblox Gamepasses Hub</p>
        </footer>
      </main>

      {/* Brookhaven Modal matching brookhan-rp.blogspot.com */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative bg-[#3a3a3a] text-white max-w-md w-full rounded-xl p-6 shadow-2xl text-center border border-white/10">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STEP 1: Username Prompt */}
            {modalStep === 'input' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Get item</h2>

                {/* Circular Pass Icon in Modal */}
                <div 
                  className="w-24 h-24 rounded-full border-4 border-[#e0e0e0] flex items-center justify-center mx-auto my-3 select-none"
                  style={{ background: selectedPass.gradient }}
                >
                  <span className="text-black font-bold text-2xl">
                    {selectedPass.abbr}
                  </span>
                </div>

                <p className="text-sm text-gray-200">
                  Would you like to Get "{selectedPass.name}"?
                </p>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFetchUser();
                  }}
                  placeholder="Enter username"
                  className="w-full py-3 px-4 rounded bg-white text-gray-900 placeholder:text-gray-400 text-center font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoFocus
                />

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="bg-transparent hover:bg-white/10 text-white font-medium py-2.5 px-6 rounded transition-colors cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFetchUser}
                    className="bg-white hover:bg-gray-100 text-[#3a3a3a] font-bold py-2.5 px-6 rounded shadow transition-colors cursor-pointer text-sm"
                  >
                    💎 Free
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: 9-Box Loading Spinner Searching */}
            {modalStep === 'searching' && (
              <div className="py-4 space-y-4">
                <h2 className="text-xl font-bold">Get item</h2>

                {/* 9-box animated grid matching blogspot exactly */}
                <div className="w-20 h-20 mx-auto my-4 grid grid-cols-3 gap-1.5">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-white rounded-xs animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.2s' }}
                    />
                  ))}
                </div>

                <div className="text-base text-gray-200 font-medium">
                  Searching for @{username}
                </div>
              </div>
            )}

            {/* STEP 3: User Avatar Found */}
            {modalStep === 'found' && (
              <div className="py-3 space-y-4">
                <h2 className="text-xl font-bold">Get item</h2>

                {/* User avatar SVG matching blogspot */}
                <div 
                  className="w-24 h-24 rounded-full border-4 border-[#2a6a9d] mx-auto flex items-center justify-center overflow-hidden shadow-md"
                  style={{
                    background: `linear-gradient(135deg, hsl(${getUserColor(username)}, 85%, 65%) 0%, hsl(${getUserColor(username)}, 85%, 45%) 100%)`
                  }}
                >
                  <span className="text-white font-extrabold text-3xl">
                    {(username[0] || 'U').toUpperCase()}
                  </span>
                </div>

                <div className="text-lg font-bold text-white">
                  @{username}
                </div>

                <button
                  onClick={handleStartTransfer}
                  className="bg-white hover:bg-gray-100 text-[#3a3a3a] font-bold py-3 px-8 rounded shadow transition-all cursor-pointer text-base uppercase tracking-wide"
                >
                  Get item now
                </button>
              </div>
            )}

            {/* STEP 4: Transferring Progress */}
            {modalStep === 'transferring' && (
              <div className="py-4 space-y-4">
                <h2 className="text-xl font-bold">Get item</h2>

                <div className="w-20 h-20 mx-auto my-4 grid grid-cols-3 gap-1.5">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className="bg-white rounded-xs animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1.2s' }}
                    />
                  ))}
                </div>

                <div className="text-base text-gray-200 font-medium">
                  {transferPhase === 'searching' && `Searching for @${username}`}
                  {transferPhase === 'found' && 'Account found'}
                  {transferPhase === 'transferring' && 'Transferring the item...'}
                </div>
              </div>
            )}

            {/* STEP 5: Verification Required */}
            {modalStep === 'verify' && (
              <div className="py-4 space-y-4">
                <h2 className="text-xl font-bold">Get item</h2>

                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-9 h-9" />
                </div>

                <div className="bg-[#2a2a2a] p-3 rounded-lg border border-white/10 text-sm text-gray-200 leading-relaxed">
                  <span className="font-bold text-white block mb-1 text-base">Human Verification</span>
                  To prevent bot abuse, please complete the final verification step to unlock <strong>{selectedPass.name}</strong> for <strong>@{username}</strong>.
                </div>

                <button
                  onClick={() => {
                    alert(`Congratulations! Pass "${selectedPass.name}" has been registered for @${username}. Enjoy Brookhaven RP!`);
                    handleCloseModal();
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded shadow transition-all cursor-pointer text-base uppercase tracking-wide flex items-center justify-center gap-2 mx-auto"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Verify</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
