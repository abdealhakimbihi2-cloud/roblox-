import React, { useState } from 'react';
import { GameResource } from '../types';

interface ResourceCardProps {
  resource: GameResource;
  onSelect: (resource: GameResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onSelect
}) => {
  const [imgError, setImgError] = useState(false);

  // Reliable fallback icons matching the 7 games exactly
  const fallbackImages: Record<string, string> = {
    'Roblox': 'https://play-lh.googleusercontent.com/QqZj22aXblAyYDxLQw-Gg0ycW0QkKhrDnwqgERZU9BMRXZnMlgXfq-94sikG5mEpt_I0lzZxcUzfLblmQgwYzUE=s256',
    'Speed Escape': 'https://static.wikia.nocookie.net/roblox/images/4/45/SPKIcon.webp',
    'Steal an Egg': 'https://static.wikia.nocookie.net/roblox/images/0/0a/Steal_An_Egg_2026.png/revision/latest/scale-to-width-down/500?cb=20260816064732',
    '99 Nights in the Forest': 'https://static.wikia.nocookie.net/roblox/images/4/42/99_nights_in_the_forest.png/revision/latest/scale-to-width-down/500?cb=20250721194015',
    'Brookhaven': 'https://static.wikia.nocookie.net/roblox/images/f/f6/BHpoliceRefreshupd.webp/revision/latest/scale-to-width-down/500?cb=20260617131624',
    'Survive the Apocalypse': 'https://static.wikia.nocookie.net/roblox/images/6/68/Survival_Apocalypse_Thumbnail.png',
    'Slime RNG': 'https://static.wikia.nocookie.net/roblox/images/4/41/Slime_Mine.png/revision/latest/scale-to-width-down/500?cb=20231121131204',
    'Animal Hospital': 'https://static.wikia.nocookie.net/roblox/images/d/d5/Animal_Hospital.png/revision/latest/scale-to-width-down/500?cb=20260730071923',
  };

  const imageSrc = imgError 
    ? (fallbackImages[resource.name] || resource.image)
    : resource.image;

  return (
    <div 
      className="zup-game-card group"
      onClick={() => onSelect(resource)}
      data-name={resource.name.toLowerCase()}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(resource);
        }
      }}
    >
      {/* Icon Box with Green Check Badge */}
      <div className="zup-icon-box">
        <img 
          src={imageSrc} 
          alt={resource.name} 
          loading="lazy"
          onError={() => setImgError(true)}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="zup-check" title="Verified & Checked">
          ✓
        </div>
      </div>

      {/* Game Title */}
      <h2>{resource.name}</h2>

      {/* 5 Stars */}
      <div className="zup-stars" aria-label={`Rating: ${resource.rating} stars`}>
        ⭐⭐⭐⭐⭐
      </div>
    </div>
  );
};
