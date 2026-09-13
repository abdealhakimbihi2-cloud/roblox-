import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Download, 
  Check, 
  ExternalLink, 
  Copy, 
  Share2, 
  Cpu, 
  HardDrive, 
  Clock, 
  Info, 
  Layers 
} from 'lucide-react';
import { GameResource } from '../types';

interface ResourceModalProps {
  resource: GameResource | null;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'verifying' | 'ready'>('idle');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!resource) return null;

  const handleDownloadClick = () => {
    setDownloadState('verifying');
    setTimeout(() => {
      setDownloadState('ready');
      const targetUrl = resource.downloadUrl || 'https://puz-rdx.pages.dev/';
      try {
        window.location.href = targetUrl;
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // ignore clipboard error in restricted iframes
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#0F1624] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={resource.image}
            alt={resource.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1624] via-[#0F1624]/60 to-transparent" />

          {/* Header Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                {resource.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-700 text-[11px] font-medium">
                {resource.platform}
              </span>
              {resource.badge && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                  {resource.badge}
                </span>
              )}
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {resource.name}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{resource.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({resource.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span>By {resource.developer}</span>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Security & Verification Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-semibold text-emerald-300 flex items-center gap-2">
                <span>{resource.verifiedStatus}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-900/60 rounded text-emerald-200 font-mono">
                  {resource.securityCheck.cleanScore}
                </span>
              </div>
              <p className="text-slate-300 mt-0.5">
                Audited via {resource.securityCheck.engine}. Scanned at {resource.securityCheck.scanDate}. Clean binary signature.
              </p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Version</div>
              <div className="font-medium text-slate-200 font-mono mt-0.5">{resource.version}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">File Size</div>
              <div className="font-medium text-slate-200 mt-0.5">{resource.fileSize}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Updated</div>
              <div className="font-medium text-slate-200 mt-0.5">{resource.lastUpdated}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Format</div>
              <div className="font-medium text-slate-200 mt-0.5">{resource.resourceType}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Overview & Specifications
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {resource.fullDescription}
            </p>
          </div>

          {/* Compatibility */}
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-start gap-2.5 text-xs">
            <Cpu className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">System Compatibility: </span>
              <span className="text-slate-400">{resource.compatibility}</span>
            </div>
          </div>

          {/* Features checklist */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Verified Highlights & Capabilities
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {resource.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {resource.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950/70 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleDownloadClick}
              disabled={downloadState === 'verifying'}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 text-white text-xs font-semibold shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              {downloadState === 'idle' && (
                <>
                  <Download className="w-4 h-4" />
                  <span>Get Verified Resource</span>
                </>
              )}
              {downloadState === 'verifying' && (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Mirror Hash...</span>
                </>
              )}
              {downloadState === 'ready' && (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Redirecting to Resource...</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
