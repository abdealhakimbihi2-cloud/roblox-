import React, { useState } from 'react';
import { X, Send, CheckCircle2, PlusCircle, AlertCircle } from 'lucide-react';
import { CategoryType, PlatformType } from '../types';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (name: string) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>('Games');
  const [platform, setPlatform] = useState<PlatformType>('Android');
  const [sourceUrl, setSourceUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(name);
      setSubmitted(false);
      setName('');
      setSourceUrl('');
      setNotes('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0F1624] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 mb-1 text-xs font-semibold uppercase tracking-wider">
          <PlusCircle className="w-4 h-4" />
          <span>Community Contribution</span>
        </div>
        <h2 className="font-display font-bold text-xl text-white">
          Submit a Gaming Resource
        </h2>
        <p className="text-xs text-slate-300 mt-1 mb-5">
          Suggest a game, companion app, or performance tweak. Submissions are virus-checked before listing.
        </p>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <div className="font-semibold text-white text-base">Thank You for Submitting!</div>
            <p className="text-xs text-slate-400">
              Our review team will verify the hash integrity and platform requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Resource Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Apex Legends Mobile Port / FPS Fix Script"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Games">Games</option>
                  <option value="Apps">Apps</option>
                  <option value="Tweaks">Tweaks</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="Desktop">Desktop / PC</option>
                  <option value="Multiplatform">Multiplatform</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Developer / Repository Link
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Brief Notes / Version Details
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Why should this be listed? Any special installation steps?"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white outline-none resize-none"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>We do not accept cheats, cracked software, or memory injectors.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Verification</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
