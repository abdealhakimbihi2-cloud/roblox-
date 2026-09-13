import React, { useState } from 'react';
import { X } from 'lucide-react';

declare global {
  interface Window {
    _xY?: () => void;
    mGpBE_doL_khdWwc?: { it: number; key: string };
  }
}

export interface ClaimVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  onVerify?: () => void;
  gameIcon?: string;
  itemName?: string;
  username?: string;
  dropCodePrefix?: string;
}

export const ClaimVerificationModal: React.FC<ClaimVerificationModalProps> = ({
  isOpen,
  onClose,
  redirectUrl,
  onVerify
}) => {
  const [isTriggering, setIsTriggering] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    // Prevent double-clicks from triggering the locker multiple times
    if (isTriggering) return;
    setIsTriggering(true);

    if (onVerify) {
      onVerify();
    }

    // Open the external locker in a new browser tab directly on click
    const targetUrl = '/verify.html';
    let opened = false;
    try {
      const newTab = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (newTab) {
        newTab.focus();
        opened = true;
      }
    } catch (err) {
      console.error('Error opening locker window:', err);
    }

    // Fallback if window.open was intercepted by popup blocker
    if (!opened) {
      const anchor = document.createElement('a');
      anchor.href = targetUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    // Reset debounce lock after 2 seconds
    setTimeout(() => {
      setIsTriggering(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Verification Card matching exact user screenshot */}
      <div 
        className="relative w-full max-w-[420px] bg-[#0c160e] border border-[#1b3421] rounded-[26px] px-6 py-8 text-center shadow-2xl z-10 space-y-6"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(89, 214, 106, 0.08)'
        }}
      >
        {/* Subtle close button in top corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#3d6044] hover:text-[#7ea886] transition-colors p-1 rounded-lg cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="space-y-2.5 pt-1">
          <h2 
            className="text-2xl sm:text-[28px] text-[#5de876] font-black tracking-wider uppercase select-none"
            style={{ 
              fontFamily: "'Lilita One', 'Luckiest Guy', 'Arial Black', sans-serif",
              letterSpacing: '0.04em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 14px rgba(93, 232, 118, 0.25)'
            }}
          >
            HUMAN VERIFICATION
          </h2>
          <p className="text-sm text-[#7ea886] font-medium leading-relaxed max-w-[320px] mx-auto select-none">
            Complete 1 task below to receive your items instantly.
          </p>
        </div>

        {/* Verify Now Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleVerify}
            disabled={isTriggering}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#38783d] hover:bg-[#418a47] active:translate-y-0.5 text-white font-extrabold text-lg sm:text-xl tracking-wide transition-all shadow-[0_5px_0_#1e4622] border border-[#2b5e31] cursor-pointer flex items-center justify-center select-none disabled:opacity-85"
          >
            Verify Now
          </button>
        </div>

        {/* Secure Verification Footer with Shield Icon */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5 text-xs text-[#52b561] font-semibold tracking-wide select-none">
          {/* Half red / half white heraldic shield matching user screenshot */}
          <svg className="w-3.5 h-3.5 shrink-0 drop-shadow-xs" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91V2z" fill="#dc2626" />
            <path d="M12 2v20c4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#ffffff" />
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91V5l-8-3z" stroke="#166534" strokeWidth="0.8" />
          </svg>
          <span>Secure Verification</span>
        </div>
      </div>
    </div>
  );
};
