import React from 'react';

interface ResourceCardSkeletonProps {
  count?: number;
}

export const ResourceCardSkeleton: React.FC = () => {
  return (
    <div 
      className="zup-game-card pointer-events-none select-none animate-pulse"
      aria-hidden="true"
    >
      {/* Icon Box Skeleton */}
      <div className="zup-icon-box relative">
        <div className="w-[140px] h-[140px] rounded-xl bg-slate-700/60 dark:bg-slate-700/60 light:bg-slate-200 overflow-hidden relative skeleton-shimmer shadow-sm" />
        {/* Verification Checkmark Placeholder */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-600/60 border-[3px] border-[#1f2937] dark:border-[#1f2937] light:border-white skeleton-shimmer" />
      </div>

      {/* Game Title Skeleton */}
      <div className="h-5 w-28 rounded-md bg-slate-700/70 dark:bg-slate-700/70 light:bg-slate-300 mt-3 mb-2 skeleton-shimmer" />

      {/* 5 Stars Rating Skeleton */}
      <div className="h-3.5 w-20 rounded-md bg-slate-700/50 dark:bg-slate-700/50 light:bg-slate-200 mb-1 skeleton-shimmer" />
    </div>
  );
};

export const ResourceGridSkeleton: React.FC<ResourceCardSkeletonProps> = ({ count = 7 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ResourceCardSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
};
