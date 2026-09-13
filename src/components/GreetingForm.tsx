import React, { useState, useRef, useEffect } from 'react';
import { Language, GreetingType, CardTheme, GreetingCardData, ArtworkType, OrganizationType } from '../types';
import { generateGreetingCard, BLESSINGS_PRESETS, BLESSINGS_PRESETS_BY_LANG, SOCIETY_EXAMPLES } from '../data/greetings';
import { Heart, Sparkles, Building2, User, Palette, Image as ImageIcon, Upload, Check, RefreshCw, X, Phone, MapPin } from 'lucide-react';
import { DiyaLamp, SocietyEmblem } from './FestiveDecorations';
import ganpatiGoldImg from '../assets/images/ganpati_artwork_gold_1789279868503.jpg';
import ganpatiBlessingImg from '../assets/images/ganpati_blessing_art_1789279883297.jpg';
import ganpatiPandalImg from '../assets/images/ganpati_pandal_art_1789281320323.jpg';

interface GreetingFormProps {
  onCardGenerated: (card: GreetingCardData) => void;
  initialValues?: Partial<GreetingCardData>;
  cardsCount?: number | null;
  forcedLanguage?: Language;
  prefilledMessage?: string;
}

export const GreetingForm: React.FC<GreetingFormProps> = ({
  onCardGenerated,
  initialValues,
  cardsCount,
  forcedLanguage,
  prefilledMessage,
}) => {
  const [mode, setMode] = useState<'standard' | 'blessings' | 'society_business'>(
    initialValues?.greetingType === 'society_business'
      ? 'society_business'
      : initialValues?.greetingType === 'blessings'
      ? 'blessings'
      : 'standard'
  );

  // General fields
  const [senderName, setSenderName] = useState(initialValues?.senderName || '');
  const [recipientName, setRecipientName] = useState(initialValues?.recipientName || '');
  const [language, setLanguage] = useState<Language>(
    forcedLanguage || initialValues?.language || 'marathi'
  );

  useEffect(() => {
    if (forcedLanguage && forcedLanguage !== language) {
      setLanguage(forcedLanguage);
    }
  }, [forcedLanguage]);

  useEffect(() => {
    if (prefilledMessage) {
      setChairmanMessage(prefilledMessage);
    }
  }, [prefilledMessage]);
  const [greetingType, setGreetingType] = useState<GreetingType>(
    initialValues?.greetingType && initialValues.greetingType !== 'blessings' && initialValues.greetingType !== 'society_business'
      ? initialValues.greetingType
      : 'family'
  );
  const [theme, setTheme] = useState<CardTheme>(initialValues?.theme || 'saffron-gold');
  const [artworkType, setArtworkType] = useState<ArtworkType>(
    initialValues?.artworkType || 'gold'
  );
  const [customArtworkUrl, setCustomArtworkUrl] = useState<string | undefined>(
    initialValues?.customArtworkUrl
  );

  // Society & Business specific fields
  const [organizationType, setOrganizationType] = useState<OrganizationType>(
    initialValues?.organizationType || 'society'
  );
  const [societyName, setSocietyName] = useState(
    initialValues?.societyName || 'Shree Raj Ratandeep Society'
  );
  const [societyLogoPreset, setSocietyLogoPreset] = useState<string>(
    initialValues?.societyLogoPreset || 'society_crest'
  );
  const [societyLogoUrl, setSocietyLogoUrl] = useState<string | undefined>(
    initialValues?.societyLogoUrl
  );
  const [committeeRole, setCommitteeRole] = useState(
    initialValues?.committeeRole || 'Chairman & Managing Committee'
  );
  const [chairmanMessage, setChairmanMessage] = useState(
    initialValues?.chairmanMessage ||
      'On this sacred occasion of Ganesh Chaturthi, the Managing Committee extends warmest greetings to all esteemed members, residents, and families. May Lord Ganesha bestow good health, peace, safety, and boundless prosperity upon every home. Ganpati Bappa Morya!'
  );
  const [contactDetails, setContactDetails] = useState(
    initialValues?.contactDetails || 'Reg. No: BOM/HSG/4521/2012 | Office: +91 98200 12345 | rajratandeep.chs@gmail.com'
  );
  const [addressOrLocation, setAddressOrLocation] = useState(
    initialValues?.addressOrLocation || 'M.G. Road, Kandivali (W), Mumbai - 400067'
  );
  const [customTitle, setCustomTitle] = useState(initialValues?.title || '');

  const [errorMsg, setErrorMsg] = useState('');
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const customArtworkInputRef = useRef<HTMLInputElement>(null);

  const handleSelectBlessingsRecipient = (name: string) => {
    setRecipientName(name);
  };

  // Quick load society preset
  const handleLoadSocietyExample = (index: number) => {
    const ex = SOCIETY_EXAMPLES[index];
    if (!ex) return;
    setSocietyName(ex.societyName);
    setOrganizationType(ex.organizationType);
    setLanguage(ex.language);
    setTheme(ex.theme);
    setArtworkType(ex.artworkType);
    setSocietyLogoPreset(ex.societyLogoPreset);
    setSocietyLogoUrl(undefined);
    setCommitteeRole(ex.committeeRole);
    setChairmanMessage(ex.chairmanMessage);
    setContactDetails(ex.contactDetails);
    setAddressOrLocation(ex.addressOrLocation);
    setCustomTitle(ex.customTitle);
  };

  // Custom Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Logo size should be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSocietyLogoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom Artwork upload handler
  const handleCustomArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMsg('Artwork photo size should be under 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomArtworkUrl(event.target?.result as string);
        setArtworkType('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'society_business') {
      if (!societyName.trim()) {
        setErrorMsg('Please enter your Society or Business Name.');
        return;
      }
    } else {
      if (!senderName.trim()) {
        setErrorMsg('Please enter Your Name to personalize the card.');
        return;
      }
    }

    setErrorMsg('');

    const effectiveGreetingType: GreetingType =
      mode === 'society_business'
        ? 'society_business'
        : mode === 'blessings'
        ? 'blessings'
        : greetingType;

    const isSocietyMode = mode === 'society_business';

    const card = generateGreetingCard({
      senderName: isSocietyMode ? (committeeRole || societyName) : senderName,
      recipientName: isSocietyMode ? '' : recipientName,
      language,
      greetingType: effectiveGreetingType,
      theme,
      artworkType,
      customArtworkUrl,
      organizationType: isSocietyMode ? organizationType : undefined,
      societyName: isSocietyMode ? societyName : undefined,
      societyLogoUrl: isSocietyMode ? societyLogoUrl : undefined,
      societyLogoPreset: isSocietyMode ? societyLogoPreset : undefined,
      chairmanMessage: isSocietyMode ? chairmanMessage : undefined,
      committeeRole: isSocietyMode ? committeeRole : undefined,
      contactDetails: isSocietyMode ? contactDetails : undefined,
      addressOrLocation: isSocietyMode ? addressOrLocation : undefined,
      customTitle: isSocietyMode ? (customTitle || undefined) : undefined,
    });

    onCardGenerated(card);
  };

  const languageLabels: { id: Language; label: string; sub: string; icon: string }[] = [
    { id: 'marathi', label: 'मराठी', sub: 'Marathi', icon: '🚩' },
    { id: 'hindi', label: 'हिंदी', sub: 'Hindi', icon: '🕉️' },
    { id: 'english', label: 'English', sub: 'English', icon: '✨' },
  ];

  const greetingTypes: { id: GreetingType; label: string; desc: string; icon: string }[] = [
    { id: 'family', label: 'Family', desc: 'कुटुंब / परिवार', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', label: 'Friends', desc: 'मित्र / दोस्त', icon: '🎉' },
    { id: 'formal', label: 'Formal', desc: 'ऑफिस / सहकारी', icon: '🤝' },
  ];

  const themeOptions: { id: CardTheme; name: string; color: string; ring: string }[] = [
    { id: 'saffron-gold', name: 'Saffron Gold', color: 'bg-amber-500', ring: 'ring-amber-500' },
    { id: 'royal-ruby', name: 'Royal Ruby', color: 'bg-red-800', ring: 'ring-red-600' },
    { id: 'sacred-ivory', name: 'Sacred Ivory', color: 'bg-stone-100 border border-amber-300', ring: 'ring-amber-400' },
    { id: 'marigold-sun', name: 'Marigold Sun', color: 'bg-orange-500', ring: 'ring-orange-500' },
    { id: 'regal-emerald', name: 'Regal Emerald', color: 'bg-emerald-800', ring: 'ring-emerald-600' },
  ];

  const logoPresets = [
    { id: 'society_crest', name: 'Housing Crest', desc: '🏢 Society' },
    { id: 'royal_seal', name: 'Royal Seal', desc: '⚜️ Mudra' },
    { id: 'business_shield', name: 'Trust Shield', desc: '💼 Firm' },
    { id: 'om_mandala', name: 'Om Mandala', desc: '🕉️ Sacred' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8">
      {/* Festive Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <DiyaLamp size="sm" />
          <span className="text-xs uppercase tracking-widest font-cinzel text-amber-700 font-bold bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            गणेशोत्सव २०२६
          </span>
          <DiyaLamp size="sm" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#B71C1C] flex items-center justify-center gap-2">
          <span>🙏</span>
          <span className="bg-gradient-to-r from-[#B71C1C] via-[#E65100] to-[#D4AF37] bg-clip-text text-transparent">
            Morya Greetings
          </span>
        </h1>
        <p className="text-sm sm:text-base text-amber-950/80 font-medium mt-1 font-body-devanagari">
          {mode === 'society_business'
            ? 'Create a Ganpati Greeting for Your Society or Business'
            : 'Create a Personal Ganpati Greeting'}
        </p>

        {cardsCount !== null && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300 text-amber-950 text-xs font-semibold shadow-2xs">
            <span className="text-xs">🪔</span>
            <span>
              <strong className="text-[#B71C1C] font-bold">{cardsCount.toLocaleString()}</strong>{' '}
              {cardsCount === 1 ? 'card' : 'cards'} created & shared
            </span>
            <span className="text-xs">🌺</span>
          </div>
        )}
      </div>

      {/* Greeting Mode Selector Tabs */}
      <div className="mb-5">
        <div className="bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200/90 grid grid-cols-3 gap-1 shadow-xs">
          {/* Tab 1: Personal / Family */}
          <button
            type="button"
            id="tab-mode-standard"
            onClick={() => setMode('standard')}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'standard'
                ? 'bg-white text-amber-900 shadow-md ring-1 ring-amber-300'
                : 'text-amber-800/80 hover:bg-white/50'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>Personal</span>
          </button>

          {/* Tab 2: Bappa's Blessings */}
          <button
            type="button"
            id="tab-mode-blessings"
            onClick={() => {
              setMode('blessings');
              if (!recipientName) setRecipientName('Aaji');
            }}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'blessings'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                : 'text-amber-800/80 hover:bg-white/50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${mode === 'blessings' ? 'fill-white' : 'text-red-500'}`} />
            <span>Blessings</span>
          </button>

          {/* Tab 3: Society / Business */}
          <button
            type="button"
            id="tab-mode-society-business"
            onClick={() => setMode('society_business')}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'society_business'
                ? 'bg-gradient-to-r from-[#B71C1C] to-[#E65100] text-white shadow-md ring-1 ring-amber-400'
                : 'text-amber-900 hover:bg-white/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="truncate">Society/Business</span>
          </button>
        </div>
      </div>

      {/* Main Creation Card Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-lg border border-amber-200/90 flex flex-col gap-5"
      >
        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        {/* --- SOCIETY & BUSINESS MODE SECTION --- */}
        {mode === 'society_business' ? (
          <div className="flex flex-col gap-4">
            {/* Quick Load Example Pill Bar */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                  ⚡ Quick Fill Example:
                </span>
                <span className="text-[11px] text-amber-700/80">Click to preview</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  id="load-example-raj-ratandeep"
                  onClick={() => handleLoadSocietyExample(0)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-semibold shadow-2xs transition-colors flex items-center gap-1"
                >
                  <span>🌺</span>
                  <span>Shree Raj Ratandeep Society</span>
                </button>
                <button
                  type="button"
                  id="load-example-gokuldham"
                  onClick={() => handleLoadSocietyExample(1)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-semibold shadow-2xs transition-colors"
                >
                  गोकुळधाम सोसायटी (मराठी)
                </button>
                <button
                  type="button"
                  id="load-example-apex"
                  onClick={() => handleLoadSocietyExample(2)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-amber-950 font-semibold shadow-2xs transition-colors"
                >
                  Apex Firm (Business)
                </button>
              </div>
            </div>

            {/* Society / Business Name */}
            <div>
              <label htmlFor="society-name-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                Society / Business Name <span className="text-red-600">*</span>
              </label>
              <input
                id="society-name-input"
                type="text"
                required
                value={societyName}
                onChange={(e) => {
                  setSocietyName(e.target.value);
                  // Update customTitle if it followed template
                  if (!customTitle || customTitle.includes('🌺')) {
                    setCustomTitle(`🌺 ${e.target.value} wishes you a Happy Ganesh Chaturthi 🌺`);
                  }
                }}
                placeholder="e.g. Shree Raj Ratandeep Society"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9] placeholder:text-amber-800/40 font-medium"
              />
            </div>

            {/* Organization Category */}
            <div>
              <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                Organization Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'society', label: 'Housing Society', icon: '🏢' },
                  { id: 'business', label: 'Business / Firm', icon: '💼' },
                  { id: 'mandal', label: 'Ganesh Mandal', icon: '🚩' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setOrganizationType(cat.id as OrganizationType)}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all ${
                      organizationType === cat.id
                        ? 'bg-amber-100/90 border-amber-500 text-amber-950 ring-2 ring-amber-300 font-bold'
                        : 'bg-[#FFFDF9] border-amber-200 text-amber-900 hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Society / Business Logo Section */}
            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-amber-200 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏢</span> Society / Business Logo:
                </span>
                {societyLogoUrl && (
                  <button
                    type="button"
                    onClick={() => setSocietyLogoUrl(undefined)}
                    className="text-[11px] text-red-600 hover:text-red-800 flex items-center gap-0.5 font-semibold"
                  >
                    <X className="w-3 h-3" /> Remove Custom Logo
                  </button>
                )}
              </div>

              {/* Logo Presets or Upload */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center">
                {logoPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSocietyLogoPreset(preset.id);
                      setSocietyLogoUrl(undefined);
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      !societyLogoUrl && societyLogoPreset === preset.id
                        ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-300 font-bold shadow-xs'
                        : 'bg-white border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <SocietyEmblem preset={preset.id} size={36} />
                    <span className="text-[10px] text-amber-950 font-medium truncate w-full text-center">
                      {preset.desc}
                    </span>
                  </button>
                ))}

                {/* Upload custom logo button */}
                <div className="col-span-2 sm:col-span-1">
                  <input
                    type="file"
                    ref={logoFileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                    id="society-logo-upload-input"
                  />
                  <button
                    type="button"
                    id="trigger-logo-upload-btn"
                    onClick={() => logoFileInputRef.current?.click()}
                    className={`w-full p-2 h-full min-h-[66px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      societyLogoUrl
                        ? 'bg-amber-100/90 border-amber-500 ring-2 ring-amber-300'
                        : 'bg-white border-amber-300 hover:border-amber-500 hover:bg-amber-50'
                    }`}
                  >
                    {societyLogoUrl ? (
                      <div className="relative">
                        <img
                          src={societyLogoUrl}
                          alt="Custom logo"
                          className="w-8 h-8 rounded-full object-contain bg-white border border-amber-300 shadow-xs"
                        />
                        <span className="text-[10px] text-amber-950 font-bold block mt-0.5">Uploaded</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-amber-700" />
                        <span className="text-[10px] text-amber-900 font-semibold text-center leading-tight">
                          Upload Custom
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Chairman / Committee Role & Message */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="committee-role-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                  Sign-off / Committee Role
                </label>
                <input
                  id="committee-role-input"
                  type="text"
                  value={committeeRole}
                  onChange={(e) => setCommitteeRole(e.target.value)}
                  placeholder="e.g. Chairman & Managing Committee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9]"
                />
              </div>

              <div>
                <label htmlFor="chairman-message-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                  Chairman / Committee Message
                </label>
                <textarea
                  id="chairman-message-input"
                  rows={3}
                  value={chairmanMessage}
                  onChange={(e) => setChairmanMessage(e.target.value)}
                  placeholder="Enter message for residents/clients..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9] resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Contact Details & Society Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="contact-details-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-700" /> Contact Details
                </label>
                <input
                  id="contact-details-input"
                  type="text"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  placeholder="e.g. Office: +91 98200 12345 | rajratandeep.chs@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9]"
                />
              </div>

              <div>
                <label htmlFor="address-location-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700" /> Address / Location
                </label>
                <input
                  id="address-location-input"
                  type="text"
                  value={addressOrLocation}
                  onChange={(e) => setAddressOrLocation(e.target.value)}
                  placeholder="e.g. M.G. Road, Kandivali (W), Mumbai - 400067"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9]"
                />
              </div>
            </div>

            {/* Custom Greeting Headline (Optional Edit) */}
            <div>
              <label htmlFor="custom-title-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                Greeting Card Title <span className="text-amber-700/70 font-normal">(Auto-generated or edit)</span>
              </label>
              <input
                id="custom-title-input"
                type="text"
                value={customTitle || `🌺 ${societyName || 'Society'} wishes you a Happy Ganesh Chaturthi 🌺`}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9] font-medium"
              />
            </div>
          </div>
        ) : (
          /* --- PERSONAL / FAMILY & BLESSINGS MODE SECTION --- */
          <div className="flex flex-col gap-4">
            {/* Blessings Quick Presets (when Blessings mode is selected) */}
            {mode === 'blessings' && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider">
                  Quick select recipient:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(BLESSINGS_PRESETS_BY_LANG[language] || BLESSINGS_PRESETS).map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => handleSelectBlessingsRecipient(p.name)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        recipientName === p.name
                          ? 'bg-red-600 text-white border-red-700 font-bold shadow-xs'
                          : 'bg-white text-amber-950 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Your Name (Sender) */}
              <div>
                <label htmlFor="sender-name-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="sender-name-input"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Rahul / Gupta Family"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9] placeholder:text-amber-800/40"
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label htmlFor="recipient-name-input" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                  Recipient Name <span className="text-amber-700/60 font-normal">(optional)</span>
                </label>
                <input
                  id="recipient-name-input"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={mode === 'blessings' ? "e.g. Aaji / Papa / Dear Friend" : "e.g. Amit / Sharma Family"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 outline-none text-sm text-amber-950 bg-[#FFFDF9] placeholder:text-amber-800/40"
                />
              </div>
            </div>

            {/* Greeting Category (Only in standard mode) */}
            {mode === 'standard' && (
              <div>
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
                  Greeting Type
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {greetingTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      id={`greeting-type-${type.id}`}
                      onClick={() => setGreetingType(type.id)}
                      className={`py-2 px-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        greetingType === type.id
                          ? 'bg-gradient-to-b from-[#B71C1C] to-[#8D1414] text-white border-red-800 shadow-md font-bold ring-2 ring-red-300 scale-[1.02]'
                          : 'bg-[#FFFDF9] text-amber-900 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                    >
                      <span className="text-base mb-0.5">{type.icon}</span>
                      <span className="text-xs font-semibold">{type.label}</span>
                      <span className={`text-[10px] ${greetingType === type.id ? 'text-red-100' : 'text-amber-700/70'}`}>
                        {type.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Language Selection */}
        <div>
          <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-2">
            Choose Language
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {languageLabels.map((lang) => (
              <button
                key={lang.id}
                type="button"
                id={`lang-btn-${lang.id}`}
                onClick={() => setLanguage(lang.id)}
                className={`py-2 px-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  language === lang.id
                    ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white border-amber-600 shadow-md font-bold ring-2 ring-amber-300/80 scale-[1.02]'
                    : 'bg-[#FFFDF9] text-amber-900 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{lang.icon}</span>
                  <span className="text-sm font-semibold">{lang.label}</span>
                </div>
                <span className={`text-[10px] ${language === lang.id ? 'text-amber-100' : 'text-amber-700/70'}`}>
                  {lang.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Ganpati Design & Themes Customization */}
        <div className="pt-2 border-t border-amber-100 flex flex-col gap-4">
          {/* Ganpati Design Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-700" /> Custom Ganpati Design:
              </span>
              {customArtworkUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomArtworkUrl(undefined);
                    setArtworkType('gold');
                  }}
                  className="text-[11px] text-red-600 hover:text-red-800 flex items-center gap-0.5 font-semibold"
                >
                  <X className="w-3 h-3" /> Reset Artwork
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Option 1: Gold / Suvarna */}
              <button
                type="button"
                id="artwork-btn-gold"
                onClick={() => {
                  setArtworkType('gold');
                }}
                className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-all ${
                  artworkType === 'gold' && !customArtworkUrl
                    ? 'bg-amber-100/90 border-amber-500 font-bold ring-2 ring-amber-300 text-amber-950 shadow-xs'
                    : 'bg-[#FFFDF9] border-amber-200 text-amber-900 hover:bg-amber-50'
                }`}
              >
                <img
                  src={ganpatiGoldImg}
                  alt="Golden Suvarna Ganpati idol for greeting cards"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover shadow-2xs shrink-0"
                />
                <div className="text-left leading-tight">
                  <span className="font-bold block">Suvarna</span>
                  <span className="text-[10px] opacity-70">Golden Idol</span>
                </div>
              </button>

              {/* Option 2: Pandal Grandeur */}
              <button
                type="button"
                id="artwork-btn-pandal"
                onClick={() => {
                  setArtworkType('pandal');
                }}
                className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-all ${
                  artworkType === 'pandal' && !customArtworkUrl
                    ? 'bg-amber-100/90 border-amber-500 font-bold ring-2 ring-amber-300 text-amber-950 shadow-xs'
                    : 'bg-[#FFFDF9] border-amber-200 text-amber-900 hover:bg-amber-50'
                }`}
              >
                <img
                  src={ganpatiPandalImg}
                  alt="Lalbaug style festive Ganpati pandal artwork"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover shadow-2xs shrink-0"
                />
                <div className="text-left leading-tight">
                  <span className="font-bold block">Pandal</span>
                  <span className="text-[10px] opacity-70">Raj Darshan</span>
                </div>
              </button>

              {/* Option 3: Divine Blessing */}
              <button
                type="button"
                id="artwork-btn-blessing"
                onClick={() => {
                  setArtworkType('blessing');
                }}
                className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-all ${
                  artworkType === 'blessing' && !customArtworkUrl
                    ? 'bg-amber-100/90 border-amber-500 font-bold ring-2 ring-amber-300 text-amber-950 shadow-xs'
                    : 'bg-[#FFFDF9] border-amber-200 text-amber-900 hover:bg-amber-50'
                }`}
              >
                <img
                  src={ganpatiBlessingImg}
                  alt="Divine blessing Bhagwan Ganesh idol artwork"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover shadow-2xs shrink-0"
                />
                <div className="text-left leading-tight">
                  <span className="font-bold block">Blessing</span>
                  <span className="text-[10px] opacity-70">Divya Mukut</span>
                </div>
              </button>

              {/* Option 4: Custom Upload Society Idol / Photo */}
              <div>
                <input
                  type="file"
                  ref={customArtworkInputRef}
                  onChange={handleCustomArtworkUpload}
                  accept="image/*"
                  className="hidden"
                  id="custom-artwork-upload-input"
                />
                <button
                  type="button"
                  id="trigger-custom-artwork-upload-btn"
                  onClick={() => customArtworkInputRef.current?.click()}
                  className={`w-full flex items-center gap-2 p-2 rounded-xl border-2 border-dashed text-xs transition-all cursor-pointer ${
                    customArtworkUrl
                      ? 'bg-amber-100/90 border-amber-500 font-bold ring-2 ring-amber-300 text-amber-950 shadow-xs'
                      : 'bg-[#FFFDF9] border-amber-300 text-amber-900 hover:border-amber-500 hover:bg-amber-50'
                  }`}
                >
                  {customArtworkUrl ? (
                    <img
                      src={customArtworkUrl}
                      alt="Personalized uploaded Ganpati idol photo"
                      loading="lazy"
                      className="w-8 h-8 rounded-full object-cover shadow-2xs shrink-0 border border-amber-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                      <Upload className="w-4 h-4" />
                    </div>
                  )}
                  <div className="text-left leading-tight">
                    <span className="font-bold block">
                      {customArtworkUrl ? 'Custom Idol' : 'Upload Photo'}
                    </span>
                    <span className="text-[10px] opacity-70">
                      {customArtworkUrl ? 'Active' : 'Your Bappa'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Theme / Palette Selection */}
          <div>
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-amber-700" /> Card Theme Palette:
            </span>
            <div className="flex items-center gap-2.5">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  title={t.name}
                  id={`theme-btn-${t.id}`}
                  onClick={() => setTheme(t.id)}
                  className={`w-7 h-7 rounded-full ${t.color} transition-all shadow-xs ${
                    theme === t.id ? `ring-3 ${t.ring} scale-110 shadow-sm` : 'opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="create-greeting-card-btn"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D84315] via-[#E65100] to-[#B71C1C] hover:from-[#BF360C] hover:to-[#880E4F] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span>
              {mode === 'society_business'
                ? '✨ Create Society/Business Greeting Card'
                : '✨ Create Greeting Card'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
