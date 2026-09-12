import React from 'react';

interface FooterProps {
  onDisclaimerClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDisclaimerClick }) => {
  return (
    <footer className="zup-footer">
      <p>
        &copy; 2026 GAMEHUB. All rights reserved. | Premium Resource Hub
      </p>
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
        <span className="hover:text-slate-400 transition-colors cursor-pointer" onClick={onDisclaimerClick}>
          Disclaimer & Safe Browsing
        </span>
        <span>•</span>
        <span className="hover:text-slate-400 transition-colors cursor-pointer">
          Privacy Policy
        </span>
        <span>•</span>
        <span className="hover:text-slate-400 transition-colors cursor-pointer">
          DMCA Notice
        </span>
      </div>
    </footer>
  );
};
