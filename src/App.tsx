import React, { useState, useEffect } from 'react';
import { GreetingCardData, Language } from './types';
import { GreetingForm } from './components/GreetingForm';
import { CardPreview } from './components/CardPreview';
import { RecentCardsModal } from './components/RecentCardsModal';
import { CrawlableSeoContent } from './components/CrawlableSeoContent';
import { AboutView } from './components/AboutView';
import { getSavedCards, saveCardToLocal, deleteSavedCard } from './utils/storage';
import { soundPlayer } from './utils/audio';
import { fetchCardsCount, incrementCardsCount } from './utils/counter';
import { DiyaLamp, MarigoldFlower } from './components/FestiveDecorations';
import { applyRouteSEO, normalizePath, ROUTES_SEO } from './utils/seo';
import { Bell, BellOff, History, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [currentCard, setCurrentCard] = useState<GreetingCardData | null>(null);
  const [recentCards, setRecentCards] = useState<GreetingCardData[]>([]);
  const [isRecentModalOpen, setIsRecentModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cardsCount, setCardsCount] = useState<number | null>(null);
  const [prefilledMessage, setPrefilledMessage] = useState<string | undefined>();

  // Initialize SEO and sync with browser popstate
  useEffect(() => {
    setRecentCards(getSavedCards());
    fetchCardsCount().then((count) => setCardsCount(count));

    const path = normalizePath(window.location.pathname);
    setCurrentPath(path);
    applyRouteSEO(path);

    const handlePopState = () => {
      const updatedPath = normalizePath(window.location.pathname);
      setCurrentPath(updatedPath);
      applyRouteSEO(updatedPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic client-side navigation preserving SEO
  const navigate = (path: string) => {
    const clean = normalizePath(path);
    if (clean !== currentPath) {
      window.history.pushState({}, '', clean);
      setCurrentPath(clean);
      applyRouteSEO(clean);
    }
    // If navigating to home or greetings, clear any preview card so form is visible
    if (clean === '/' || clean === '/ganpati-greetings') {
      setCurrentCard(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundPlayer.enabled = next;
    if (next) {
      soundPlayer.playTempleBell();
    }
  };

  const handleCardGenerated = async (card: GreetingCardData) => {
    saveCardToLocal(card);
    setRecentCards(getSavedCards());
    setCurrentCard(card);
    if (soundEnabled) {
      soundPlayer.playTempleBell();
    }
    // Increment global count and update UI
    incrementCardsCount().then((newCount) => setCardsCount(newCount));
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCard = (updatedCard: GreetingCardData) => {
    saveCardToLocal(updatedCard);
    setRecentCards(getSavedCards());
    setCurrentCard(updatedCard);
  };

  const handleDeleteCard = (id: string) => {
    const updated = deleteSavedCard(id);
    setRecentCards(updated);
    if (currentCard?.id === id) {
      setCurrentCard(null);
    }
  };

  const handleSelectWishFromSeo = (text: string, lang: Language) => {
    setPrefilledMessage(text);
    setCurrentCard(null);
    navigate(lang === 'marathi' ? '/ganpati-wishes-marathi' : lang === 'hindi' ? '/ganpati-wishes-hindi' : '/ganpati-wishes-english');
  };

  // Determine default forced language based on current route
  const routeForcedLang: Language | undefined =
    currentPath === '/ganpati-wishes-marathi'
      ? 'marathi'
      : currentPath === '/ganpati-wishes-hindi'
      ? 'hindi'
      : currentPath === '/ganpati-wishes-english'
      ? 'english'
      : undefined;

  const currentSeo = ROUTES_SEO[currentPath] || ROUTES_SEO['/'];

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col selection:bg-amber-200 selection:text-amber-950">
      {/* Top Auspicious Floral & Gold Bar */}
      <div className="w-full h-2 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 shadow-xs" />

      {/* Main Navigation Header */}
      <header className="w-full max-w-3xl mx-auto px-4 py-3 sm:py-4 flex flex-col gap-2.5 border-b border-amber-200/60">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setCurrentCard(null);
              navigate('/');
            }}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
            title="Morya Greetings Home"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-lg">🕉️</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg sm:text-xl text-[#B71C1C] tracking-wide block leading-tight">
                Morya Greetings
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-800/80 font-medium block">
                Ganpati Card Generator
              </span>
            </div>
          </a>

          {/* Right header actions */}
          <div className="flex items-center gap-2">
            {/* Temple Bell Sound Button */}
            <button
              type="button"
              id="temple-bell-btn"
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Temple Bell Sound' : 'Enable Temple Bell Sound'}
              className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-100/90 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-stone-100 text-stone-500 border-stone-200'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Bell className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span className="hidden sm:inline">Sound</span>
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            {/* Saved Cards Button */}
            <button
              type="button"
              id="view-saved-cards-btn"
              onClick={() => setIsRecentModalOpen(true)}
              title="View Saved Cards"
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <History className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">My Cards</span>
              {recentCards.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {recentCards.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Semantic SEO Navigation Bar */}
        <nav
          aria-label="Festival Sections and Language Pages"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 no-scrollbar text-xs font-semibold"
        >
          {[
            { path: '/', label: 'Card Maker' },
            { path: '/ganpati-greetings', label: 'Greetings' },
            { path: '/ganpati-wishes-marathi', label: 'मराठी शुभेच्छा' },
            { path: '/ganpati-wishes-hindi', label: 'हिंदी बधाई' },
            { path: '/ganpati-wishes-english', label: 'English' },
            { path: '/about', label: 'About' },
          ].map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                currentPath === item.path
                  ? 'bg-amber-600 text-white shadow-2xs font-bold'
                  : 'text-amber-900 hover:bg-amber-100/70'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start items-center w-full">
        {/* Semantic H1 Heading for SEO & Accessibility */}
        <div className="w-full max-w-2xl mx-auto px-4 pt-3 pb-1 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-[#B71C1C] leading-snug">
            {currentSeo.h1}
          </h1>
        </div>

        {currentPath === '/about' ? (
          <AboutView onNavigateHome={() => navigate('/')} />
        ) : (
          <div className="w-full flex flex-col items-center">
            {currentCard ? (
              <CardPreview
                card={currentCard}
                onReset={() => setCurrentCard(null)}
                onUpdateCard={handleUpdateCard}
              />
            ) : (
              <GreetingForm
                onCardGenerated={handleCardGenerated}
                initialValues={recentCards[0] ? { senderName: recentCards[0].senderName } : undefined}
                cardsCount={cardsCount}
                forcedLanguage={routeForcedLang}
                prefilledMessage={prefilledMessage}
              />
            )}

            {/* Rich Crawlable SEO Text & Sacred Mantras for Search Engines */}
            <CrawlableSeoContent
              currentPath={currentPath}
              onSelectWish={handleSelectWishFromSeo}
              onNavigate={navigate}
            />
          </div>
        )}
      </main>

      {/* Auspicious Footer with Canonical Internal Links */}
      <footer id="app-footer" className="w-full mt-auto py-6 border-t border-amber-200/80 bg-[#FFFDF7] text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <DiyaLamp size="sm" />
          <span className="text-xs sm:text-sm font-bold font-devanagari text-[#B71C1C] tracking-wide">
            🌺 गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! 🌺
          </span>
          <DiyaLamp size="sm" />
        </div>

        {cardsCount !== null && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300/90 text-amber-950 text-xs font-semibold shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              <strong className="text-[#B71C1C] font-bold">{cardsCount.toLocaleString()}</strong>{' '}
              {cardsCount === 1 ? 'card' : 'cards'} generated & shared
            </span>
            <span className="text-xs">🪔</span>
          </div>
        )}

        {/* Footer Navigation Links */}
        <div className="max-w-xl mx-auto px-4 my-2">
          <nav aria-label="Footer Site Directory" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-amber-900/80 font-medium">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              Home
            </a>
            <span>•</span>
            <a
              href="/ganpati-greetings"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ganpati-greetings');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              Ganpati Greetings
            </a>
            <span>•</span>
            <a
              href="/ganpati-wishes-marathi"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ganpati-wishes-marathi');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              मराठी शुभेच्छा
            </a>
            <span>•</span>
            <a
              href="/ganpati-wishes-hindi"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ganpati-wishes-hindi');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              हिंदी बधाई
            </a>
            <span>•</span>
            <a
              href="/ganpati-wishes-english"
              onClick={(e) => {
                e.preventDefault();
                navigate('/ganpati-wishes-english');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              English Wishes
            </a>
            <span>•</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate('/about');
              }}
              className="hover:text-[#B71C1C] transition-colors"
            >
              About
            </a>
          </nav>
        </div>

        <p className="text-[11px] text-amber-900/60 mb-1.5">
          Share divine joy, blessings and prosperity with your loved ones this Ganesh Utsav.
        </p>
        <p className="text-xs font-medium text-amber-900/80">
          Developed with devotion by <span className="font-semibold text-amber-950">Roma Gupta</span>
        </p>
      </footer>

      {/* Saved / Recent Cards Modal */}
      <RecentCardsModal
        isOpen={isRecentModalOpen}
        onClose={() => setIsRecentModalOpen(false)}
        cards={recentCards}
        onSelectCard={(card) => {
          setCurrentCard(card);
          setIsRecentModalOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDeleteCard={handleDeleteCard}
      />
    </div>
  );
}
