
export type AdPlatform = 'Facebook/Instagram' | 'Google Search' | 'LinkedIn' | 'TikTok' | 'YouTube' | 'Twitter (X)';
export type AdFormat = 'Image' | 'Video' | 'Carousel' | 'Dynamic/Responsive' | 'Text Only';
export type AdGoal = 'Website Traffic' | 'Lead Generation' | 'WhatsApp/Messaging' | 'Direct Sales (eCom)' | 'Brand Awareness';

export interface CampaignData {
  businessName: string;
  productDescription: string;
  targetAudience: string;
  platform: AdPlatform;
  format: AdFormat;
  goal: AdGoal;
  tone: string;
  uniqueSellingPoints: string;
  callToAction: string;
  country: string;
  city: string;
}

export interface AdOption {
  id: string;
  focusKeyword: string;
  headline: string;
  primaryText: string;
  description: string;
  keywords: string[];
  ctaText: string;
  reasoning: string;
}

export interface MarketResearch {
  localAreas: {
    name: string;
    reason: string;
    potential: 'High' | 'Medium' | 'Low';
  }[];
  competitors: {
    name: string;
    strategy: string;
  }[];
  audienceTargeting: {
    interests: string[];
    demographics: string;
  };
}

export interface GenerationResult {
  options: AdOption[];
  strategySummary: string;
  marketResearch: MarketResearch;
}
