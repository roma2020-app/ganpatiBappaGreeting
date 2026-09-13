import React, { forwardRef } from 'react';
import { GreetingCardData } from '../types';
import { DiyaLamp, AuspiciousCorner, MarigoldFlower, SocietyEmblem } from './FestiveDecorations';
import ganpatiGoldImg from '../assets/images/ganpati_artwork_gold_1789279868503.jpg';
import ganpatiBlessingImg from '../assets/images/ganpati_blessing_art_1789279883297.jpg';
import ganpatiPandalImg from '../assets/images/ganpati_pandal_art_1789281320323.jpg';

interface CardCanvasProps {
  card: GreetingCardData;
  scale?: number;
  className?: string;
  id?: string;
}

export const CardCanvas = forwardRef<HTMLDivElement, CardCanvasProps>(({ card, scale = 1, className = '', id = 'ganpati-greeting-card' }, ref) => {
  let artworkSrc = ganpatiGoldImg;
  if (card.artworkType === 'custom' && card.customArtworkUrl) {
    artworkSrc = card.customArtworkUrl;
  } else if (card.artworkType === 'pandal') {
    artworkSrc = ganpatiPandalImg;
  } else if (card.artworkType === 'blessing') {
    artworkSrc = ganpatiBlessingImg;
  }

  // Theme styling definitions
  const themeStyles = {
    'saffron-gold': {
      bg: 'bg-gradient-to-b from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8C2]',
      borderWrapper: 'border-[#D4AF37] shadow-amber-900/10',
      innerBorder: 'border-[#B8860B]/40',
      primaryText: 'text-[#5A1D08]',
      titleText: 'text-[#B71C1C]',
      shlokaText: 'text-[#8D3B03]',
      taglineBg: 'bg-[#FFECB3]/70 border-[#FFB300]/40 text-[#B71C1C]',
      accentColor: '#D4AF37',
      badgeBg: 'bg-amber-100/80 border-amber-300 text-amber-900',
    },
    'royal-ruby': {
      bg: 'bg-gradient-to-b from-[#4A0E17] via-[#5C101D] to-[#3B0710]',
      borderWrapper: 'border-[#F5D061] shadow-red-950/30',
      innerBorder: 'border-[#E6AC3C]/40',
      primaryText: 'text-[#FFF8E7]',
      titleText: 'text-[#FFD54F]',
      shlokaText: 'text-[#FFE082]',
      taglineBg: 'bg-[#2A050B]/60 border-[#F5D061]/40 text-[#FFE082]',
      accentColor: '#F5D061',
      badgeBg: 'bg-red-950/70 border-amber-400/40 text-amber-200',
    },
    'sacred-ivory': {
      bg: 'bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF7] to-[#FDF8EE]',
      borderWrapper: 'border-[#C59B27] shadow-stone-900/10',
      innerBorder: 'border-[#D4AF37]/40',
      primaryText: 'text-[#3E2723]',
      titleText: 'text-[#C62828]',
      shlokaText: 'text-[#795548]',
      taglineBg: 'bg-[#FFF8E1] border-[#FFE082] text-[#B71C1C]',
      accentColor: '#C59B27',
      badgeBg: 'bg-stone-100/90 border-amber-300/60 text-stone-800',
    },
    'marigold-sun': {
      bg: 'bg-gradient-to-b from-[#FFF5E5] via-[#FFE4B5] to-[#FFD89B]',
      borderWrapper: 'border-[#E65100] shadow-orange-950/10',
      innerBorder: 'border-[#FF8F00]/50',
      primaryText: 'text-[#4E1D06]',
      titleText: 'text-[#D84315]',
      shlokaText: 'text-[#9C3804]',
      taglineBg: 'bg-[#FFF0D4] border-[#FFB74D]/60 text-[#BF360C]',
      accentColor: '#FF8F00',
      badgeBg: 'bg-orange-100/80 border-orange-300 text-orange-950',
    },
    'regal-emerald': {
      bg: 'bg-gradient-to-b from-[#0F382A] via-[#164E3A] to-[#0A261C]',
      borderWrapper: 'border-[#F5D061] shadow-emerald-950/30',
      innerBorder: 'border-[#E6AC3C]/40',
      primaryText: 'text-[#F4F9F5]',
      titleText: 'text-[#FFD54F]',
      shlokaText: 'text-[#A7F3D0]',
      taglineBg: 'bg-[#062016]/70 border-[#F5D061]/40 text-[#FFE082]',
      accentColor: '#F5D061',
      badgeBg: 'bg-emerald-950/80 border-amber-400/40 text-amber-200',
    },
  }[card.theme || 'saffron-gold'] || {
    bg: 'bg-gradient-to-b from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8C2]',
    borderWrapper: 'border-[#D4AF37] shadow-amber-900/10',
    innerBorder: 'border-[#B8860B]/40',
    primaryText: 'text-[#5A1D08]',
    titleText: 'text-[#B71C1C]',
    shlokaText: 'text-[#8D3B03]',
    taglineBg: 'bg-[#FFECB3]/70 border-[#FFB300]/40 text-[#B71C1C]',
    accentColor: '#D4AF37',
    badgeBg: 'bg-amber-100/80 border-amber-300 text-amber-900',
  };

  // Descriptive alt text for SEO and accessibility
  const artworkAlt =
    card.artworkType === 'pandal'
      ? 'Festive Lalbaug style Ganpati Bappa pandal celebration with floral decoration for Ganeshotsav'
      : card.artworkType === 'blessing'
      ? 'Divine Bhagwan Shree Ganesh blessing devotees with Abhaya mudra and sacred modak'
      : card.artworkType === 'custom'
      ? `Personalized Bhagwan Shree Ganesh festive artwork for ${card.title || 'Ganesh Chaturthi'}`
      : 'Sacred golden idol of Bhagwan Shree Ganesh with radiant aura for Ganesh Chaturthi greetings';

  return (
    <div
      ref={ref}
      id={id}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top center' }}
      className={`relative w-full max-w-[430px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${themeStyles.bg} ${className}`}
    >
      {/* Outer Ornamental Border */}
      <div className={`p-3.5 border-4 rounded-2xl ${themeStyles.borderWrapper}`}>
        {/* Inner Auspicious Double Border */}
        <div className={`relative p-4 md:p-5 border-2 rounded-xl ${themeStyles.innerBorder} flex flex-col items-center text-center overflow-hidden`}>
          
          {/* Corner traditional flourishes */}
          <AuspiciousCorner className="absolute top-1 left-1 opacity-90 pointer-events-none" />
          <AuspiciousCorner className="absolute top-1 right-1 -scale-x-100 opacity-90 pointer-events-none" />
          <AuspiciousCorner className="absolute bottom-1 left-1 -scale-y-100 opacity-90 pointer-events-none" />
          <AuspiciousCorner className="absolute bottom-1 right-1 -scale-x-100 -scale-y-100 opacity-90 pointer-events-none" />

          {/* Top Marigold Garland Band */}
          <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
            <MarigoldFlower size={16} />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase font-cinzel text-amber-700/80">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <MarigoldFlower size={16} />
          </div>

          {/* Society / Business Header (Logo & Name) */}
          {card.greetingType === 'society_business' && card.societyName && (
            <div className="w-full mb-2.5 px-2 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center gap-3">
              <SocietyEmblem
                preset={card.societyLogoPreset}
                customLogoUrl={card.societyLogoUrl}
                size={44}
                className="shrink-0"
              />
              <div className="text-left flex-1 min-w-0">
                <h3 className={`text-sm sm:text-base font-extrabold tracking-wide font-heading leading-tight truncate ${themeStyles.titleText}`}>
                  {card.societyName}
                </h3>
                <p className="text-[10px] font-medium tracking-wider uppercase text-amber-700/80 font-cinzel">
                  {card.organizationType === 'business'
                    ? 'Corporate & Business House'
                    : card.organizationType === 'mandal'
                    ? 'Sarvajanik Ganeshotsav Mandal'
                    : 'Co-operative Housing Society Ltd.'}
                </p>
              </div>
            </div>
          )}

          {/* Ganpati Artwork Frame with radiant aura and flanking diyas */}
          <div className="relative my-2 flex items-center justify-center w-full">
            {/* Left Diya */}
            <div className="hidden sm:block absolute left-2 -bottom-1">
              <DiyaLamp size="sm" />
            </div>

            {/* Central Artwork */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full blur-xs opacity-80" />
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#B37C1C] via-[#FFD54F] to-[#B37C1C] shadow-md">
                <img
                  src={artworkSrc}
                  alt={artworkAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full select-none"
                  crossOrigin="anonymous"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Diya */}
            <div className="hidden sm:block absolute right-2 -bottom-1">
              <DiyaLamp size="sm" />
            </div>
          </div>

          {/* Auspicious Shloka */}
          <div className="mt-1 mb-2 max-w-[340px]">
            <p className={`text-[11px] sm:text-xs leading-relaxed font-devanagari italic ${themeStyles.shlokaText}`}>
              {card.shloka}
            </p>
          </div>

          {/* Thin Gold Decorative Divider */}
          <div className="w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1" />

          {/* Card Title / Blessing Banner */}
          <div className="mt-1.5 mb-1.5 px-2">
            <h2 className={`text-lg sm:text-xl md:text-2xl font-bold font-heading tracking-wide leading-snug ${themeStyles.titleText}`}>
              {card.title}
            </h2>
          </div>

          {/* Recipient Salutation (if present) */}
          {card.recipientSalutation && (
            <div className="mt-1 mb-1.5">
              <p className={`text-xs sm:text-sm font-semibold ${themeStyles.primaryText}`}>
                {card.recipientSalutation}
              </p>
            </div>
          )}

          {/* Chairman / Committee Message Highlight (only for society/business greetings with chairman message) */}
          {card.greetingType === 'society_business' && card.chairmanMessage ? (
            <div className={`my-2 px-3 py-2 rounded-xl border max-w-[360px] text-left shadow-xs ${themeStyles.badgeBg}`}>
              <div className="flex items-center gap-1.5 mb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-90">
                <span>📜</span>
                <span>{card.committeeRole || 'Managing Committee Message'}</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-body-devanagari ${themeStyles.primaryText}`}>
                "{card.chairmanMessage}"
              </p>
            </div>
          ) : (
            /* Heartfelt Personalized Message Body */
            <div className="my-1.5 px-1 max-w-[340px]">
              <p className={`text-xs sm:text-sm leading-relaxed font-body-devanagari font-normal ${themeStyles.primaryText}`}>
                {card.message}
              </p>
            </div>
          )}

          {/* Auspicious Tagline / Morya Chants */}
          <div className={`mt-2 py-1.5 px-3 rounded-full border shadow-xs ${themeStyles.taglineBg}`}>
            <p className="text-xs sm:text-sm font-bold font-devanagari tracking-wide">
              {card.tagline}
            </p>
          </div>

          {/* Sender Signature / From Line */}
          <div className="mt-3 mb-1 flex items-center justify-center px-3">
            <span className={`text-xs sm:text-sm font-semibold tracking-wide ${themeStyles.primaryText}`}>
              {card.signature}
            </span>
          </div>

          {/* Contact Details & Address Strip (only for Society & Business) */}
          {card.greetingType === 'society_business' && (card.addressOrLocation || card.contactDetails) && (
            <div className="w-full mt-2.5 pt-2 border-t border-amber-400/30 text-[10px] sm:text-[11px] leading-snug flex flex-col items-center gap-1 opacity-90">
              {card.addressOrLocation && (
                <div className={`flex items-center gap-1 font-medium ${themeStyles.primaryText}`}>
                  <span>📍</span>
                  <span>{card.addressOrLocation}</span>
                </div>
              )}
              {card.contactDetails && (
                <div className={`flex items-center justify-center flex-wrap gap-x-2 font-medium ${themeStyles.primaryText}`}>
                  <span>📞 {card.contactDetails}</span>
                </div>
              )}
            </div>
          )}

          {/* Bottom Festive Diya Trio */}
          <div className="mt-2.5 flex items-center justify-center gap-6 sm:gap-8 pt-1">
            <DiyaLamp size="sm" />
            <div className="flex items-center gap-1.5">
              <MarigoldFlower size={14} />
              <span className="text-[10px] tracking-wider uppercase font-cinzel opacity-70">
                {card.language === 'marathi' ? 'बाप्पा मोरया' : card.language === 'hindi' ? 'जय श्री गणेश' : 'Shree Ganesh'}
              </span>
              <MarigoldFlower size={14} />
            </div>
            <DiyaLamp size="sm" />
          </div>

        </div>
      </div>
    </div>
  );
});

CardCanvas.displayName = 'CardCanvas';
