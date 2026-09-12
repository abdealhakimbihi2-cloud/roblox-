import React from 'react';
import { FilterType } from '../types';

interface HeroProps {
  activeFilter: FilterType | null;
  onSelectFilter: (filter: FilterType | null) => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeFilter,
  onSelectFilter
}) => {
  const filters: { id: FilterType; label: string; icon: string }[] = [
    { id: 'iOS', label: 'iOS', icon: '📱' },
    { id: 'Android', label: 'Android', icon: '📱' },
    { id: 'Desktop', label: 'Desktop', icon: '🖥️' },
    { id: 'No Jailbreak', label: 'No Jailbreak', icon: '🛡️' },
  ];

  return (
    <div className="zup-hero">
      {/* Badge with glowing dot */}
      <div className="zup-badge">
        <span className="zup-badge-dot" />
        VERIFIED RESOURCE HUB
      </div>

      {/* Main Title */}
      <h1>
        GAMEHUB: Your #1<br />
        <span className="highlight">Resource Hub</span>
      </h1>

      {/* Subtitle */}
      <p>
        Premium features, unlimited resources, and exclusive tweaks.<br />
        Simple, fast, and secure.
      </p>

      {/* Platform Filters - Exact 4 from zupgame.store */}
      <div className="zup-filters">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(isActive ? null : filter.id)}
              className={`zup-filter-btn ${isActive ? 'active' : ''}`}
              title={isActive ? `Clear ${filter.label} filter` : `Filter by ${filter.label}`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
