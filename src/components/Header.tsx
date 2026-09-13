import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  onLogoClick
}) => {
  return (
    <header className="zup-header">
      <div 
        className="zup-logo cursor-pointer"
        onClick={onLogoClick}
        title="likomy.site - Home"
      >
        likomy.site
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className="zup-status">
          <div className="zup-status-dot" />
          <span>SERVER ONLINE</span>
        </div>

        <button 
          className="zup-theme-toggle border-0 bg-transparent"
          id="themeToggle"
          onClick={onToggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};
