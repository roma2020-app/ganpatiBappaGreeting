export type Language = 'marathi' | 'hindi' | 'english';

export type GreetingType = 'family' | 'friends' | 'formal' | 'blessings' | 'society_business';

export type CardTheme = 'saffron-gold' | 'royal-ruby' | 'sacred-ivory' | 'marigold-sun' | 'regal-emerald';

export type ArtworkType = 'gold' | 'blessing' | 'pandal' | 'custom';

export type OrganizationType = 'society' | 'business' | 'mandal' | 'office';

export interface GreetingCardData {
  id: string;
  senderName: string;
  recipientName?: string;
  language: Language;
  greetingType: GreetingType;
  title: string;
  shloka: string;
  recipientSalutation?: string;
  message: string;
  tagline: string;
  signature: string;
  artworkType: ArtworkType;
  customArtworkUrl?: string;
  theme: CardTheme;
  variationIndex?: number;
  createdAt: number;

  // Society / Business Specific Fields
  organizationType?: OrganizationType;
  societyName?: string;
  societyLogoUrl?: string;
  societyLogoPreset?: string;
  chairmanMessage?: string;
  committeeRole?: string;
  contactDetails?: string;
  addressOrLocation?: string;
}
