import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Sparkles,
  Loader2
} from 'lucide-react';

interface AnimalHospitalPageProps {
  onBack: () => void;
}

interface SpeedShopItem {
  id: string;
  name: string;
  badge: 'Mythic' | 'Legendary' | 'Epic';
  badgeColor: string;
  image: string;
}

const SPEED_SHOP_ITEMS: SpeedShopItem[] = [
  {
    id: '3250-coins',
    name: '3250 Animal Coins',
    badge: 'Mythic',
    badgeColor: 'bg-[#8b5cf6] text-white',
    image: '/animal_hospital/speed_shop/animal_coins.png'
  },
  {
    id: 'vip-agent',
    name: 'VIP Agent',
    badge: 'Legendary',
    badgeColor: 'bg-[#d97706] text-white',
    image: 'https://i.postimg.cc/V63qwjJM/secret-agent.png'
  },
  {
    id: 'agent-r',
    name: 'Agent R',
    badge: 'Legendary',
    badgeColor: 'bg-[#d97706] text-white',
    image: 'https://i.postimg.cc/BbTKGR94/agent-R.png'
  },
  {
    id: 'doctor',
    name: 'Doctor',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/7YN2tvnD/doctor.png'
  },
  {
    id: 'head-nurse',
    name: 'Head Nurse',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/mZYzhxqp/head-nurse.png'
  },
  {
    id: 'hospital-cop',
    name: 'Hospital Cop',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/KzXjvQ5S/hospital-cop.png'
  },
  {
    id: 'psycho',
    name: 'Psycho',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/QdHdQv62/psycho.png'
  },
  {
    id: 'psychologist',
    name: 'Psychologist',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/VLNfw3ct/psychologist.png'
  },
  {
    id: 'secret-agent',
    name: 'Secret Agent',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/V63qwjJM/secret-agent.png'
  },
  {
    id: 'security',
    name: 'Security',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/vmsCYV6N/security.png'
  },
  {
    id: 'surgeon',
    name: 'Surgeon',
    badge: 'Epic',
    badgeColor: 'bg-[#4f6b95] text-white',
    image: 'https://i.postimg.cc/j2LFg6Gr/surgeon.png'
  }
];

export const AnimalHospitalPage: React.FC<AnimalHospitalPageProps> = ({ onBack }) => {
  // Claim Modal States
  const [claimingItem, setClaimingItem] = useState<SpeedShopItem | null>(null);
  const [claimStep, setClaimStep] = useState<'input' | 'scanning' | 'verified' | 'success'>('input');
  const [username, setUsername] = useState('');
  const [scanMessage, setScanMessage] = useState('Connecting to Roblox Animal Hospital servers...');

  const handleStartClaim = (item: SpeedShopItem) => {
    setClaimingItem(item);
    setClaimStep('input');
    setUsername('');
  };

  const handleExecuteScan = () => {
    if (!username.trim()) {
      alert('Please enter your Roblox username');
      return;
    }

    setClaimStep('scanning');
    setScanMessage(`Scanning hospital servers for @${username}...`);

    setTimeout(() => {
      setScanMessage(`Injecting ${claimingItem?.name} into account...`);
      setTimeout(() => {
        setScanMessage('Finalizing security authorization...');
        setTimeout(() => {
          setClaimStep('verified');
        }, 1100);
      }, 1100);
    }, 1000);
  };

  const handleFinishVerification = () => {
    setClaimStep('success');
  };

  const handleCloseModal = () => {
    setClaimingItem(null);
    setClaimStep('input');
  };

  return (
    <div className="min-h-screen bg-[#050e08] text-white font-sans antialiased pb-16">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#07150c]/95 backdrop-blur-md border-b border-[#143820] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b2114] hover:bg-[#102d1b] text-[#8be2ad] hover:text-white text-xs md:text-sm font-semibold border border-[#1b4a2b] transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#48e07a]" />
          <span>Back to GameHub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#8be2ad]">
          <span className="w-2 h-2 rounded-full bg-[#48e07a] animate-ping"></span>
          <span>Animal Hospital Rewards</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-4">
        {/* Top Hero Card matching screenshot */}
        <section className="rounded-3xl border border-[#153b22] bg-[#07160d] p-6 sm:p-7 text-center shadow-2xl relative overflow-hidden">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#48e07a] tracking-tight uppercase leading-tight">
            FREE ITEMS & BOOSTS
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#8ce2ad] font-semibold mt-1">
            Official Animal Hospital Roblox Rewards
          </p>

          {/* Player Counter */}
          <div className="pt-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#48e07a]"></span>
            <span>1,412 Players online</span>
          </div>
        </section>

        {/* Speed Shop Section matching screenshot */}
        <section className="rounded-3xl border border-[#153b22] bg-[#07160d] p-4 sm:p-5 shadow-2xl space-y-3">
          {/* Section Header */}
          <div className="flex items-center gap-2 text-[#48e07a] font-extrabold text-sm sm:text-base tracking-wide px-1 py-1">
            <ShoppingCart className="w-4 h-4 text-[#48e07a]" />
            <span>SPEED SHOP</span>
          </div>

          {/* Items List */}
          <div className="space-y-2.5">
            {SPEED_SHOP_ITEMS.map((item) => (
              <div
                key={item.id}
                className="border border-[#143820] bg-[#0a1c10] hover:bg-[#0c2314] hover:border-[#1d4e2d] rounded-2xl p-3 sm:p-3.5 flex items-center justify-between transition-all duration-200 shadow-sm"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  {/* Cyan gradient rounded-2xl thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border border-[#0d596e] bg-gradient-to-b from-[#029bc0] to-[#013543] p-1 flex items-center justify-center shadow-inner">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain filter drop-shadow"
                        loading="lazy"
                      />
                    ) : (
                      <Sparkles className="w-6 h-6 text-[#48e07a]" />
                    )}
                  </div>

                  {/* Name & Badge */}
                  <div className="space-y-1 min-w-0 text-left">
                    <h3 className="font-bold text-sm sm:text-base text-white truncate tracking-tight">
                      {item.name}
                    </h3>
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-3 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Claim Button */}
                <button
                  onClick={() => handleStartClaim(item)}
                  className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#3ca660] hover:bg-[#48bf70] active:bg-[#349654] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all duration-150 cursor-pointer shrink-0"
                >
                  Claim
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Interactive Claim Modal */}
      {claimingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-[#091b10] border border-[#1b4a2b] rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#0e2718]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STEP 1: Enter Username */}
            {claimStep === 'input' && (
              <div className="space-y-4 pt-2">
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border border-[#0d596e] bg-gradient-to-b from-[#029bc0] to-[#013543] p-1.5 shadow-lg flex items-center justify-center">
                  {claimingItem.image ? (
                    <img
                      src={claimingItem.image}
                      alt={claimingItem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  ) : (
                    <Sparkles className="w-8 h-8 text-[#48e07a]" />
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    Claim {claimingItem.name}
                  </h3>
                  <p className="text-xs text-[#8ce2ad] mt-1">
                    Enter your Roblox username to transfer this reward to your Animal Hospital inventory.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleExecuteScan();
                      }}
                      placeholder="Roblox Username"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#051108] border border-[#184626] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#48e07a] text-center font-semibold"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#102d1a] hover:bg-[#163a23] text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExecuteScan}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#3ca660] hover:bg-[#48bf70] text-white font-bold text-xs shadow-md"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Scanning Simulation */}
            {claimStep === 'scanning' && (
              <div className="py-6 space-y-4">
                <Loader2 className="w-14 h-14 text-[#48e07a] animate-spin mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">Linking Roblox Account</h3>
                  <p className="text-xs text-[#8ce2ad] animate-pulse">{scanMessage}</p>
                </div>
                <div className="w-full bg-[#051108] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#48e07a] h-full w-3/4 animate-[pulse_1s_infinite]"></div>
                </div>
              </div>
            )}

            {/* STEP 3: Verification Check */}
            {claimStep === 'verified' && (
              <div className="space-y-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-[#0d2a17] border-2 border-[#48e07a] flex items-center justify-center mx-auto text-[#48e07a]">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">Verification Ready</h3>
                  <p className="text-xs text-[#8ce2ad]">
                    Reward <strong>{claimingItem.name}</strong> ready for <strong>@{username}</strong>.
                  </p>
                </div>

                <div className="bg-[#051108] p-3 rounded-xl border border-[#184626] text-xs text-left space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Reward Item:</span>
                    <span className="font-bold text-white">{claimingItem.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Rarity:</span>
                    <span className="font-bold text-[#8ce2ad]">{claimingItem.badge}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Target Account:</span>
                    <span className="font-bold text-[#48e07a]">@{username}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishVerification}
                  className="w-full py-2.5 px-4 bg-[#3ca660] hover:bg-[#48bf70] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Claim</span>
                </button>
              </div>
            )}

            {/* STEP 4: Success Notification */}
            {claimStep === 'success' && (
              <div className="space-y-4 pt-2">
                <div className="w-16 h-16 rounded-full bg-[#3ca660]/20 border-2 border-[#48e07a] flex items-center justify-center mx-auto text-[#48e07a]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Item Claimed!</h3>
                  <p className="text-xs text-[#8ce2ad]">
                    <strong>{claimingItem.name}</strong> has been transferred to <strong>@{username}</strong>. Launch Roblox Animal Hospital to use it.
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 px-4 bg-[#3ca660] hover:bg-[#48bf70] text-white font-bold rounded-xl text-sm transition-all shadow cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
