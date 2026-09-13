import React, { useRef, useState, useEffect } from 'react';
import { GreetingCardData, CardTheme, Language } from '../types';
import { CardCanvas } from './CardCanvas';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Share2,
  Download,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Shuffle,
  Palette,
  Image as ImageIcon,
  Heart
} from 'lucide-react';
import { generateGreetingCard, getVariationCount } from '../data/greetings';

interface CardPreviewProps {
  card: GreetingCardData;
  onReset: () => void;
  onUpdateCard: (updated: GreetingCardData) => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ card, onReset, onUpdateCard }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [variationIndex, setVariationIndex] = useState(card.variationIndex ?? 0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Keep variationIndex synchronized whenever a different card is loaded
  useEffect(() => {
    if (card.variationIndex !== undefined) {
      setVariationIndex(card.variationIndex);
    }
  }, [card.id, card.variationIndex]);

  // Fire celebratory marigold festive confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFD700', '#D32F2F', '#FFFFFF', '#FFB300'],
      });
    } catch {
      // Ignore confetti errors if any
    }
  }, []);

  const getShareableText = () => {
    const languageFooter =
      card.language === 'hindi'
        ? '🙏 श्री गणेश चतुर्थी की हार्दिक शुभकामनाएं'
        : card.language === 'marathi'
        ? '🙏 गणपती बाप्पा मोरया! गणेशोत्सवाच्या हार्दिक शुभेच्छा'
        : '🙏 Happy Ganesh Chaturthi';

    const lines = [
      card.title,
      '',
      card.recipientSalutation ? card.recipientSalutation : '',
      card.message,
      '',
      card.tagline,
      '',
      card.signature,
      '',
      languageFooter,
    ].filter(Boolean);

    return lines.join('\n');
  };

  // WhatsApp Sharing
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareableText())}`;

  const handleShareWhatsApp = async (e: React.MouseEvent) => {
    // If Web Share API with image is supported (e.g. mobile Safari/Chrome with native share sheet), try that
    if (navigator.share && cardRef.current) {
      try {
        e.preventDefault();
        setFeedbackMsg('Opening share sheet...');
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `Morya-Ganpati-Greeting.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: card.title,
            text: getShareableText(),
            files: [file],
          });
          setFeedbackMsg('Shared successfully!');
          setTimeout(() => setFeedbackMsg(''), 2500);
          return;
        }
      } catch {
        // If native share cancelled or not allowed, continue to direct link
      }
    }

    // Direct WhatsApp navigation fallback
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Download Card as PNG
  const handleDownload = async () => {
    if (!cardRef.current || isDownloading) return;

    try {
      setIsDownloading(true);
      setFeedbackMsg('Preparing high-resolution card...');

      // Slight wait for any image settle
      await new Promise((r) => setTimeout(r, 150));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5, // Crisp 2.5x retina quality for printing and WhatsApp
      });

      const downloadLink = document.createElement('a');
      const safeName = (card.recipientName || 'Bappa-Card').replace(/[^a-zA-Z0-9_-]/g, '_');
      downloadLink.download = `Morya-Greetings-${safeName}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setFeedbackMsg('Card downloaded successfully! 🎉');
      setTimeout(() => setFeedbackMsg(''), 3500);
    } catch (err) {
      console.error('Download error:', err);
      setFeedbackMsg('Could not download image directly. Try taking a screenshot or sharing to WhatsApp.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy Message text
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getShareableText());
      setIsCopied(true);
      setFeedbackMsg('Devotional message copied to clipboard! 📋');
      setTimeout(() => {
        setIsCopied(false);
        setFeedbackMsg('');
      }, 3000);
    } catch {
      setFeedbackMsg('Could not copy text.');
    }
  };

  // Shuffle / Next variation of greeting
  const handleShuffleGreeting = () => {
    const totalVariations = getVariationCount(card.language, card.greetingType);
    const currentIndex = card.variationIndex ?? variationIndex;
    const nextIndex = (currentIndex + 1) % totalVariations;
    setVariationIndex(nextIndex);

    const isSociety = card.greetingType === 'society_business';

    const updated = generateGreetingCard({
      senderName: card.senderName,
      recipientName: card.recipientName,
      language: card.language,
      greetingType: card.greetingType,
      theme: card.theme,
      artworkType: card.artworkType,
      customArtworkUrl: card.customArtworkUrl,
      variationIndex: nextIndex,
      organizationType: isSociety ? card.organizationType : undefined,
      societyName: isSociety ? card.societyName : undefined,
      societyLogoUrl: isSociety ? card.societyLogoUrl : undefined,
      societyLogoPreset: isSociety ? card.societyLogoPreset : undefined,
      chairmanMessage: isSociety ? card.chairmanMessage : undefined,
      committeeRole: isSociety ? card.committeeRole : undefined,
      contactDetails: isSociety ? card.contactDetails : undefined,
      addressOrLocation: isSociety ? card.addressOrLocation : undefined,
      customTitle: isSociety ? card.title : undefined,
    });

    onUpdateCard(updated);
    setFeedbackMsg(`Switched to message #${nextIndex + 1} of ${totalVariations} 🪔`);
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  // Quick theme changer
  const handleThemeChange = (newTheme: CardTheme) => {
    onUpdateCard({ ...card, theme: newTheme });
  };

  // Switch card language immediately
  const handleLanguageChange = (newLang: Language) => {
    if (card.language === newLang) return;
    const isSociety = card.greetingType === 'society_business';
    const updated = generateGreetingCard({
      senderName: card.senderName,
      recipientName: card.recipientName,
      language: newLang,
      greetingType: card.greetingType,
      theme: card.theme,
      artworkType: card.artworkType,
      customArtworkUrl: card.customArtworkUrl,
      variationIndex: 0,
      organizationType: isSociety ? card.organizationType : undefined,
      societyName: isSociety ? card.societyName : undefined,
      societyLogoUrl: isSociety ? card.societyLogoUrl : undefined,
      societyLogoPreset: isSociety ? card.societyLogoPreset : undefined,
      chairmanMessage: isSociety ? card.chairmanMessage : undefined,
      committeeRole: isSociety ? card.committeeRole : undefined,
      contactDetails: isSociety ? card.contactDetails : undefined,
      addressOrLocation: isSociety ? card.addressOrLocation : undefined,
    });

    setVariationIndex(0);
    onUpdateCard(updated);
    setFeedbackMsg(
      `Language switched to ${
        newLang === 'hindi' ? 'हिंदी (Hindi)' : newLang === 'marathi' ? 'मराठी (Marathi)' : 'English'
      } 🪔`
    );
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  // Quick artwork changer
  const handleArtworkToggle = () => {
    const sequence: ('gold' | 'blessing' | 'pandal')[] = ['gold', 'pandal', 'blessing'];
    const currentPos = sequence.indexOf((card.artworkType as 'gold' | 'blessing' | 'pandal') || 'gold');
    const nextArtwork = sequence[(currentPos + 1) % sequence.length];
    onUpdateCard({ ...card, artworkType: nextArtwork });
  };

  const themes: { id: CardTheme; name: string; bg: string }[] = [
    { id: 'saffron-gold', name: 'Saffron Gold', bg: 'bg-amber-500' },
    { id: 'royal-ruby', name: 'Royal Ruby', bg: 'bg-red-800' },
    { id: 'sacred-ivory', name: 'Sacred Ivory', bg: 'bg-stone-100 border border-amber-300' },
    { id: 'marigold-sun', name: 'Marigold Sun', bg: 'bg-orange-500' },
    { id: 'regal-emerald', name: 'Regal Emerald', bg: 'bg-emerald-800' },
  ];

  const totalVariations = getVariationCount(card.language, card.greetingType);
  const currentDisplayIndex = ((card.variationIndex ?? variationIndex) % totalVariations) + 1;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* Toast Feedback Notification */}
      {feedbackMsg && (
        <div className="mb-3 px-4 py-2 bg-amber-900 text-amber-50 text-xs sm:text-sm font-semibold rounded-full shadow-lg border border-amber-500/50 animate-bounce">
          {feedbackMsg}
        </div>
      )}

      {/* Top Controls: Language Switcher, Shuffle & Customise Bar */}
      <div className="w-full flex flex-col gap-2 mb-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          {/* Direct Language Switcher on Preview */}
          <div className="flex items-center gap-1 bg-amber-100/70 p-1 rounded-lg border border-amber-200/90">
            {(
              [
                { id: 'hindi' as Language, label: 'हिंदी' },
                { id: 'marathi' as Language, label: 'मराठी' },
                { id: 'english' as Language, label: 'English' },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                id={`preview-lang-${l.id}`}
                onClick={() => handleLanguageChange(l.id)}
                className={`px-2 py-0.5 rounded-md text-xs font-bold transition-all ${
                  card.language === l.id
                    ? 'bg-amber-600 text-white shadow-xs scale-[1.02]'
                    : 'text-amber-900 hover:bg-white/70'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            id="shuffle-greeting-btn"
            onClick={handleShuffleGreeting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900 transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Try another devotional message variation"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-700" />
            <span>Alternate Message</span>
            <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-200 text-amber-900 rounded-full">
              {currentDisplayIndex}/{totalVariations}
            </span>
          </button>
        </div>

        {/* Style & Artwork Toggles */}
        <div className="flex items-center justify-between pt-1 border-t border-amber-100">
          <button
            type="button"
            id="toggle-card-artwork-btn"
            onClick={handleArtworkToggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900"
            title="Switch Ganpati artwork portrait"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Artwork</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-amber-900/70 font-semibold mr-0.5">Theme:</span>
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.name}
                id={`preview-theme-btn-${t.id}`}
                onClick={() => handleThemeChange(t.id)}
                className={`w-6 h-6 rounded-full ${t.bg} transition-all ${
                  card.theme === t.id ? 'ring-2 ring-amber-600 scale-110 shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The Printable/Downloadable Card Canvas */}
      <div className="relative w-full flex justify-center py-1">
        <CardCanvas ref={cardRef} card={card} id="ganpati-card-preview" />
      </div>

      {/* Action Buttons Section */}
      <div className="w-full max-w-[430px] mt-5 flex flex-col gap-3">
        {/* Share on WhatsApp Button (Prominent) */}
        <a
          id="share-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1EBE5D] hover:to-[#0E7A6E] text-white font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer no-underline"
        >
          <Share2 className="w-5 h-5 text-white" />
          <span>📱 Share on WhatsApp</span>
        </a>

        {/* Action Row: Download & Copy */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            id="download-card-btn"
            disabled={isDownloading}
            onClick={handleDownload}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? 'Downloading...' : '⬇️ Download Card'}</span>
          </button>

          <button
            type="button"
            id="copy-text-btn"
            onClick={handleCopyText}
            className="py-3 px-3 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-semibold text-sm shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-amber-800" />}
            <span>{isCopied ? 'Copied!' : '📋 Copy Text'}</span>
          </button>
        </div>

        {/* Return / Create Another Card */}
        <button
          type="button"
          id="create-another-card-btn"
          onClick={onReset}
          className="w-full py-3 px-4 rounded-xl bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300/80 text-amber-950 font-semibold text-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <RotateCcw className="w-4 h-4 text-amber-800" />
          <span>🔄 Create Another Card</span>
        </button>
      </div>
    </div>
  );
};
