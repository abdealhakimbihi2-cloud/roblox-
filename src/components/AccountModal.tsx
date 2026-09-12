import React, { useState } from 'react';
import { X, User, Bookmark, Bell, Shield, LogIn, Check } from 'lucide-react';
import { GameResource } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allResources: GameResource[];
  onSelectResource: (resource: GameResource) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allResources,
  onSelectResource
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'notifications'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const favoriteResources = allResources.filter((r) => favorites.includes(r.id));

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0F1624] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white">
              {isLoggedIn ? 'Gamer Profile' : 'Gamer Access'}
            </h2>
            <p className="text-xs text-slate-400">
              {isLoggedIn ? 'Manage saved links & alerts' : 'Sync bookmarks and receive update notifications'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800 pb-2 mb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'profile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'favorites' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({favorites.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'notifications' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div>
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Logged in as:</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">{email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Account Tier:</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Standard Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Data Encryption:</span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      Client-side Encrypted
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Gamer Email or Username
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="player@domain.com"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="demo12345"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Access Dashboard</span>
                </button>
                <div className="text-center text-[11px] text-slate-400 pt-1">
                  Demo access: Enter any email to explore the account dashboard.
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {favoriteResources.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                No saved resources yet. Click any resource to bookmark it.
              </div>
            ) : (
              favoriteResources.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    onSelectResource(res);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={res.image} alt={res.name} className="w-8 h-8 rounded object-cover" />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-white truncate">{res.name}</div>
                      <div className="text-[10px] text-slate-400">{res.platform} • {res.category}</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold shrink-0">Open →</span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Version Patch Alerts</div>
                <div className="text-[11px] text-slate-400">Notify when saved games receive hotfixes</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Weekly Security Digest</div>
                <div className="text-[11px] text-slate-400">Summary of verified clean tools and tweaks</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
