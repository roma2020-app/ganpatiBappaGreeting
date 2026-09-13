import React from 'react';
import { Heart, Sparkles, ShieldCheck, Share2, Bell, Building2, User, ArrowLeft, Flame } from 'lucide-react';
import { DiyaLamp, MarigoldFlower } from './FestiveDecorations';

interface AboutViewProps {
  onNavigateHome: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateHome }) => {
  return (
    <article className="w-full max-w-2xl mx-auto px-4 py-6 text-left">
      {/* Back to Creator button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/90 text-amber-900 text-xs font-bold transition-all active:scale-95 border border-amber-300/80 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Back to Card Generator</span>
        </button>
      </div>

      {/* Main Page Header */}
      <header className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8C2] border border-amber-300 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DiyaLamp size="sm" />
          <span className="text-xl">🕉️</span>
          <DiyaLamp size="sm" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#B71C1C] mb-2 leading-tight">
          About Morya Greetings
        </h1>
        <p className="text-xs sm:text-sm text-amber-900/90 max-w-lg mx-auto leading-relaxed">
          Spreading the divine grace, wisdom, and joy of Bhagwan Shree Ganesh through free, personalized, and culturally authentic festival greeting cards.
        </p>
      </header>

      {/* Story Section */}
      <section className="mb-8 bg-white/95 rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold font-heading text-[#B71C1C] flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-600" />
          <span>Our Vision & Devotion</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Ganesh Chaturthi (Ganeshotsav) is not merely a festival—it is a grand celebration of unity, familial bonds, and auspicious beginnings. From traditional homes in Maharashtra to celebrations across India and the global diaspora, the joyful chant of <em>"Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya!"</em> resonates in every heart.
        </p>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          <strong>Morya Greetings</strong> was created with a singular, humble vision: to make it effortless and joyous for everyone to send deeply personal, culturally rich greetings to loved ones, elders, friends, and housing society members without paywalls, watermark clutter, or intrusive advertisements.
        </p>
      </section>

      {/* Core Capabilities */}
      <section className="mb-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold font-heading text-amber-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Key Features of Morya Greetings</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 mb-2">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-amber-950 mb-1">Personal & Family Mode</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Create cards with your own name and family name. Select from heartfelt wishes in authentic Marathi, Hindi, and English.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-700 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-amber-950 mb-1">Bappa's Blessings for Elders</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tailored blessing cards for grandparents (Aaji, Ajoba, Dadi, Dada), parents (Aai, Baba, Maa, Papa), and dear friends.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-amber-950 mb-1">Society & Mandal Greetings</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Official announcement cards for Co-operative Housing Societies, Sarvajanik Mandals, and Businesses with custom logo and Chairman signatures.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-amber-950 mb-1">One-Click WhatsApp Sharing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Download studio-quality PNG greeting cards or share directly to WhatsApp chats, family groups, and WhatsApp Status with personalized caption.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Technology */}
      <section className="mb-8 p-5 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3">
        <h2 className="text-base sm:text-lg font-bold font-heading text-amber-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Privacy-First & Browser-Local Processing</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Your privacy matters. All card generation, text personalization, and image rendering occur strictly within your web browser using HTML5 Canvas and vector graphics. We do not transmit your uploaded family photos, custom idol pictures, or contact numbers to external servers. Your saved cards remain safely in your browser's private local storage.
        </p>
      </section>

      {/* Developer Credits & Dedication */}
      <section className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-amber-300/80 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MarigoldFlower size={16} />
          <span className="text-xs uppercase tracking-wider font-bold text-amber-900">
            Devotional Dedication
          </span>
          <MarigoldFlower size={16} />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#B71C1C] mb-1">
          Developed with Devotion by Roma Gupta
        </h3>
        <p className="text-xs text-amber-900/80 max-w-md mx-auto mb-4">
          Offered at the lotus feet of Bhagwan Shree Ganesh. May Lord Ganesha bless every devotee with wisdom, health, peace, and eternal joy.
        </p>
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Create Your Personalized Ganpati Card Free
        </button>
      </section>
    </article>
  );
};
