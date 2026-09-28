import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

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
  onVerify
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const lockerUrl = 'https://appcomplete.org/cl/i/j6vqxn';

  // Listen for real completion message signals sent from the locker iframe / network
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check for completion signals sent by appcomplete.org or locker scripts
      if (
        event.data === 'completed' ||
        event.data === 'offer_completed' ||
        (typeof event.data === 'object' && event.data !== null && (event.data.status === 'complete' || event.data.type === 'offer_completed'))
      ) {
        setIsCompleted(true);
        if (onVerify) {
          onVerify();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onVerify]);

  if (!isOpen) return null;

  const handleOpenNewTab = () => {
    if (onVerify) onVerify();
    window.open(lockerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container replacing old interface with new appcomplete locker */}
      <div 
        className="relative w-full max-w-[520px] bg-[#0c160e] border border-[#1b3421] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 30px rgba(89, 214, 106, 0.12)'
        }}
      >
        {/* Header Bar */}
        <div className="bg-[#112214] border-b border-[#1b3421] px-4 py-3 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1e4622] flex items-center justify-center text-[#5de876] border border-[#2b5e31] shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 
                className="text-sm sm:text-base font-extrabold text-[#5de876] tracking-wide uppercase flex items-center gap-1.5"
                style={{ fontFamily: "'Lilita One', 'Luckiest Guy', 'Arial Black', sans-serif" }}
              >
                HUMAN VERIFICATION
              </h3>
              <p className="text-[11px] text-[#7ea886] font-medium">
                Complete 1 task below to receive your items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenNewTab}
              title="Open Locker in new tab"
              className="p-1.5 rounded-lg bg-[#182e1c] hover:bg-[#234429] text-[#7ea886] hover:text-[#5de876] transition-colors cursor-pointer flex items-center gap-1 text-xs px-2 border border-[#234429]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">New Tab</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#182e1c] hover:bg-[#331818] text-[#7ea886] hover:text-red-400 transition-colors cursor-pointer border border-[#234429]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Locker iFrame Body or Genuine Success View */}
        <div className="relative w-full h-[500px] sm:h-[560px] bg-[#080f0a] flex flex-col items-center justify-center">
          {isCompleted ? (
            /* Genuine Success State triggered ONLY by real completion signal */
            <div className="p-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-emerald-400">
                Verification Completed!
              </h4>
              <p className="text-xs text-[#7ea886] max-w-xs mx-auto leading-relaxed">
                Your task completion signal was successfully verified. Your requested items are being transferred to your account.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#234429] hover:bg-[#2d5934] text-[#5de876] text-xs font-bold transition-all border border-[#2b5e31] cursor-pointer"
              >
                Close & Finish
              </button>
            </div>
          ) : (
            <>
              {/* Loading Overlay */}
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c160e] z-10 space-y-3 p-4 text-center">
                  <div className="w-10 h-10 border-3 border-[#1b3421] border-t-[#5de876] rounded-full animate-spin" />
                  <p className="text-sm text-[#7ea886] font-semibold tracking-wide">
                    Loading Verification Locker...
                  </p>
                  <p className="text-xs text-[#52b561] max-w-xs">
                    Connecting to secure offer network (appcomplete.org)
                  </p>
                </div>
              )}

              {/* Embedded Offer Locker iFrame */}
              <iframe
                src={lockerUrl}
                title="Human Verification Offer Locker"
                className="w-full h-full border-0 relative z-0"
                onLoad={() => setIframeLoading(false)}
                allow="geolocation"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
              />
            </>
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-[#0e1a10] border-t border-[#1b3421] px-4 py-2.5 flex items-center justify-between text-xs shrink-0 select-none">
          <div className="flex items-center gap-1.5 text-[#52b561] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#5de876]" />
            <span>Secure Offer Verification</span>
          </div>

          <button
            type="button"
            onClick={handleOpenNewTab}
            className="text-[#7ea886] hover:text-[#5de876] underline underline-offset-2 font-medium cursor-pointer"
          >
            Direct Link
          </button>
        </div>
      </div>
    </div>
  );
};
