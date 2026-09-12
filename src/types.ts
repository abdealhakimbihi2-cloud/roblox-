export type FilterType = 'iOS' | 'Android' | 'Desktop' | 'No Jailbreak';

export type CategoryType = 'All' | 'Games' | 'Apps' | 'Tweaks' | 'Tools';
export type PlatformType = 'All' | 'Android' | 'iOS' | 'Desktop' | 'Multiplatform';

export interface GameResource {
  id: string;
  name: string;
  category: 'Games' | 'Apps' | 'Tweaks' | 'Tools';
  platform: 'Android' | 'iOS' | 'Desktop' | 'Multiplatform';
  platforms: ('iOS' | 'Android' | 'Desktop')[];
  image: string;
  rating: number;
  reviewCount: string;
  verifiedStatus: 'Resource Checked' | 'Verified Build' | 'Official Companion';
  badge?: 'HOT' | 'TRENDING' | 'UPDATED' | 'NEW';
  shortDescription: string;
  fullDescription: string;
  version: string;
  fileSize: string;
  lastUpdated: string;
  tags: string[];
  features: string[];
  securityCheck: {
    engine: string;
    scanDate: string;
    cleanScore: string;
  };
  compatibility: string;
  developer: string;
  isTrending?: boolean;
  isRecent?: boolean;
  isNoJailbreak?: boolean;
  resourceType: string;
  downloadUrl?: string;
}
