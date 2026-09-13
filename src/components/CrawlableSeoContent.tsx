import React, { useState } from 'react';
import { Copy, Check, Sparkles, Heart, ChevronDown, ChevronUp, ArrowRight, Share2, Flame } from 'lucide-react';
import { Language } from '../types';

interface CrawlableSeoContentProps {
  currentPath: string;
  onSelectWish?: (text: string, lang: Language) => void;
  onNavigate?: (path: string) => void;
}

export const CrawlableSeoContent: React.FC<CrawlableSeoContentProps> = ({
  currentPath,
  onSelectWish,
  onNavigate,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Marathi Curated Wishes
  const marathiWishes = [
    {
      id: 'mr-1',
      title: 'पारंपरिक कौटुंबिक शुभेच्छा',
      text: '॥ ॐ गं गणपतये नमः ॥ गणपती बाप्पाच्या आगमनाने तुमच्या घरात सुख, शांती, आरोग्य आणि समृद्धी नांदो. बाप्पा तुमच्या सर्व मनोकामना पूर्ण करोत! गणेशोत्सवाच्या तुम्हाला व तुमच्या कुटुंबियांना हार्दिक शुभेच्छा!',
      category: 'Family',
    },
    {
      id: 'mr-2',
      title: 'मित्रांसाठी मंगलमय शुभेच्छा',
      text: 'मोदकाचा गोडवा, आरतीचा नाद, ढोल-ताशांचा गजर आणि बाप्पाचा मंगलमय आशीर्वाद! माझ्या प्रिय मित्राला गणेशोत्सवाच्या मनापासून खूप खूप शुभेच्छा! गणपती बाप्पा मोरया!',
      category: 'Friends',
    },
    {
      id: 'mr-3',
      title: 'ज्येष्ठांसाठी आदरयुक्त आशीर्वाद',
      text: 'आदरणीय आई-बाबा, बाप्पाच्या चरणी हीच प्रार्थना की तुम्हाला उत्तम आरोग्य, दीर्घायुष्य आणि मनःशांती लाभो. बाप्पाचे कृपाछत्र सदैव तुमच्यावर राहो. शुभ गणेशोत्सव!',
      category: 'Elders',
    },
    {
      id: 'mr-4',
      title: 'सोसायटी व गृहनिर्माण संस्थेसाठी शुभेच्छा',
      text: 'श्री गणेश चतुर्थीच्या या पावन पर्वावर आमच्या गृहनिर्माण संस्थेतील सर्व रहिवासी व त्यांच्या कुटुंबियांना हार्दिक शुभेच्छा. बाप्पाच्या कृपेने आपल्या संकुलात सुख, सुरक्षितता आणि सौहार्द सदैव राहो.',
      category: 'Society',
    },
  ];

  // Hindi Curated Wishes
  const hindiWishes = [
    {
      id: 'hi-1',
      title: 'सपरिवार पावन गणेश चतुर्थी बधाई',
      text: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥ भगवान श्री गणेश आपके जीवन के सभी विघ्नों को हरें और आपके परिवार में सुख, शांति, यश तथा समृद्धि का वास हो। गणेश चतुर्थी की आप सभी को हार्दिक शुभकामनाएं!',
      category: 'Family',
    },
    {
      id: 'hi-2',
      title: 'मित्रों और स्नेहीजनों के लिए संदेश',
      text: 'मोदक की मिठास, बप्पा का दुलार, खुशियों की हो बौछार और खुश रहे आपका संसार! गणेश चतुर्थी के इस पावन उत्सव पर आपको और आपके पूरे परिवार को ढेरों शुभकामनाएं। गणपति बप्पा मोरया!',
      category: 'Friends',
    },
    {
      id: 'hi-3',
      title: 'बप्पा का दिव्य रक्षा कवच व शुभाशीर्वाद',
      text: 'विघ्नहर्ता श्री गणेश आपके हर मार्ग को आलोकित करें, सभी संकटों से रक्षा करें और नई खुशियों की सौगात दें। भगवान गणेश का दिव्य शुभाशीर्वाद सदैव आपके साथ रहे!',
      category: 'Blessings',
    },
    {
      id: 'hi-4',
      title: 'सोसायटी एवं व्यापारिक प्रतिष्ठान संदेश',
      text: 'गणेश उत्सव के पावन अवसर पर हमारी संस्था एवं प्रबंध समिति की ओर से सभी आदरणीय सदस्यों, सहयोगियों और ग्राहकों को हार्दिक शुभकामनाएं। बप्पा सबके जीवन में प्रगति और मंगल लाएं।',
      category: 'Business/Society',
    },
  ];

  // English Curated Wishes
  const englishWishes = [
    {
      id: 'en-1',
      title: 'Divine Blessings for Family & Home',
      text: 'May Lord Ganesha remove all obstacles from your path and bless you and your family with boundless joy, robust health, and eternal prosperity. Happy Ganesh Chaturthi!',
      category: 'Family',
    },
    {
      id: 'en-2',
      title: 'Warm Festive Greetings for Friends',
      text: 'Wishing you a joyful and blessed Ganesh Chaturthi filled with sweet modaks, cheerful celebrations, and divine moments with loved ones. Ganpati Bappa Morya!',
      category: 'Friends',
    },
    {
      id: 'en-3',
      title: 'Auspicious New Beginnings & Success',
      text: 'May Vighnaharta Ganesha shower his divine grace upon your new ventures, career goals, and home. May every day bring auspicious success and peace.',
      category: 'Success',
    },
    {
      id: 'en-4',
      title: 'Housing Society & Corporate Wishes',
      text: 'On the sacred occasion of Ganesh Utsav, the Managing Committee extends warmest festive greetings to all residents and associates. May harmony, safety, and prosperity flourish in our community.',
      category: 'Society/Corporate',
    },
  ];

  // FAQs for SEO rich results
  const faqs = [
    {
      q: 'Is Morya Greetings completely free to use?',
      a: 'Yes! Morya Greetings is 100% free with no sign-up or subscription required. You can generate unlimited personalized Ganpati cards with your name, download HD images, and share directly to WhatsApp.',
    },
    {
      q: 'Which languages are supported for Ganpati greeting cards?',
      a: 'Morya Greetings natively supports Marathi (मराठी), Hindi (हिंदी), and English with authentic traditional devotional shlokas, formal society greetings, and personal wishes.',
    },
    {
      q: 'Can I create cards for my Housing Society or Business?',
      a: 'Yes. Switch to the "Society/Business" tab to add your Society or Company Name, official Chairman/Secretary signature, registration number, address, and upload your own Mandal or Ganpati idol photo.',
    },
    {
      q: 'How does WhatsApp card sharing work?',
      a: 'With one click on "Share on WhatsApp", your personalized card text and high-resolution greeting image can be shared directly with contacts, family groups, and WhatsApp Status.',
    },
    {
      q: 'Is my data and name private?',
      a: 'Yes. All card rendering and image generation happens locally in your web browser. We do not store your private photos or phone numbers on external servers.',
    },
  ];

  const renderWishesList = (
    wishes: typeof marathiWishes,
    lang: Language,
    subHeading: string
  ) => (
    <div className="space-y-4 my-6">
      <h3 className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>{subHeading}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {wishes.map((w) => (
          <article
            key={w.id}
            className="p-4 rounded-xl bg-white border border-amber-200/90 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#B71C1C] font-heading">{w.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                  {w.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                "{w.text}"
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-100/80 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleCopy(w.id, w.text)}
                className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-950 font-semibold px-2 py-1 rounded-md hover:bg-amber-50"
              >
                {copiedId === w.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              {onSelectWish && (
                <button
                  type="button"
                  onClick={() => onSelectWish(w.text, lang)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 px-2.5 py-1 rounded-lg shadow-2xs transition-transform active:scale-95"
                >
                  <span>Use in Card</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <section
      aria-label="Ganpati Greetings SEO and Crawlable Resources"
      className="w-full max-w-2xl mx-auto px-4 mt-8 pt-8 border-t border-amber-200/80 text-left"
    >
      {/* Route Specific Detailed Section */}
      {currentPath === '/ganpati-wishes-marathi' && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#B71C1C] mb-2">
            मराठीत गणेशोत्सवाच्या हार्दिक शुभेच्छा व कोट्स
          </h2>
          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed mb-4">
            महाराष्ट्राचे आराध्य दैवत विघ्नहर्ता गणपती बाप्पाच्या आगमनाने घराघरात आनंद, उत्साह आणि पावित्र्याचे वातावरण निर्माण होते. मोर्या ग्रीटिंग्सद्वारे तुम्ही स्वतःच्या नावासह मराठमोळ्या शुभेच्छा, बाप्पाचे शुभाशीर्वाद आणि पारंपारिक श्लोक समाविष्ट करून सुंदर शुभेच्छा पत्र मोफत तयार करू शकता.
          </p>
          {renderWishesList(marathiWishes, 'marathi', 'निवडक मराठी गणेशोत्सव संदेश (Click to Use):')}
        </div>
      )}

      {currentPath === '/ganpati-wishes-hindi' && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#B71C1C] mb-2">
            हिंदी में श्री गणेश चतुर्थी बधाई संदेश व शुभाशीर्वाद
          </h2>
          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed mb-4">
            विघ्नहर्ता भगवान श्री गणेश के पावन जन्मोत्सव गणेश चतुर्थी पर अपने प्रियजनों, माता-पिता, मित्रों एवं सहयोगियों को अपने नाम से सुसज्जित पावन ग्रीटिंग कार्ड भेजें। हमारी निशुल्क ग्रीटिंग सेवा से सुंदर सुवर्ण एवं राजसी गणेश चित्र के साथ तुरंत कार्ड डाउनलोड व शेयर करें।
          </p>
          {renderWishesList(hindiWishes, 'hindi', 'लोकप्रिय हिंदी गणेश बधाई संदेश (Click to Use):')}
        </div>
      )}

      {currentPath === '/ganpati-wishes-english' && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#B71C1C] mb-2">
            Warm Ganesh Chaturthi Wishes, Quotes & Blessings
          </h2>
          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed mb-4">
            Celebrate the auspicious festival of Ganesh Chaturthi by sharing personalized digital greetings with your friends, colleagues, housing society, and family worldwide. Customize every card with your name and sacred mantras.
          </p>
          {renderWishesList(englishWishes, 'english', 'Featured Ganesh Chaturthi Quotes (Click to Use):')}
        </div>
      )}

      {/* General Features & Walkthrough (Shown on Home and Greetings pages) */}
      {(currentPath === '/' || currentPath === '/ganpati-greetings') && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#B71C1C] mb-2">
            Personalized Ganpati Greeting Cards & Wishes Online
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
            Morya Greetings is an authentic devotional platform designed to help you create, personalize, and share high-resolution Ganesh Chaturthi cards in Marathi, Hindi, and English. Whether you want to send blessings to elders, festive joy to friends, or official society announcements to residents, design your card in seconds.
          </p>

          {/* 3 Step Guide */}
          <div className="mb-8">
            <h3 className="text-sm sm:text-base font-bold text-amber-950 mb-3 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>How to Create Your Free Ganpati Card:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                  1
                </span>
                <h4 className="text-xs font-bold text-amber-900 mb-1">Enter Your Name</h4>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Add your name, family name, or society details for a customized devotional signature.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                  2
                </span>
                <h4 className="text-xs font-bold text-amber-900 mb-1">Select Language & Artwork</h4>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Choose Marathi, Hindi, or English wishes with Golden, Lalbaug Pandal, or Blessing artwork.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                  3
                </span>
                <h4 className="text-xs font-bold text-amber-900 mb-1">Download & Share</h4>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Download crisp PNG cards or share directly to WhatsApp groups and status instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Sample Wishes */}
          {renderWishesList(
            [marathiWishes[0], hindiWishes[0], englishWishes[0], marathiWishes[3]],
            'marathi',
            'Featured Devotional Wishes in All Languages:'
          )}
        </div>
      )}

      {/* Cultural Meaning & Sacred Shlokas Section */}
      <div className="my-8 p-5 rounded-2xl bg-gradient-to-br from-[#FFF9E6] to-[#FFF3D6] border border-amber-200">
        <h3 className="text-sm sm:text-base font-bold text-[#B71C1C] font-heading mb-2 flex items-center gap-1.5">
          <span>🕉️</span>
          <span>Sacred Shlokas & Cultural Significance of Ganeshotsav</span>
        </h3>
        <p className="text-xs text-amber-950/80 leading-relaxed mb-3">
          Ganesh Chaturthi celebrates the arrival of Lord Ganesha, the embodiment of wisdom, auspicious beginnings, and remover of obstacles (Vighnaharta). The sacred shloka <em>"Vakratunda Mahakaya Suryakoti Samaprabha"</em> reminds devotees of the divine light that dispels darkness. Our greeting cards include authentic Sanskrit and Devanagari shlokas to preserve this sacred heritage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-devanagari text-amber-900 italic bg-white/70 p-3 rounded-xl border border-amber-300/50">
          <div>॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</div>
          <div>॥ ॐ गं गणपतये नमः । विघ्नविनाशकाय वरदाय नमः ॥</div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div className="my-8">
        <h3 className="text-base sm:text-lg font-bold text-amber-950 font-heading mb-3 flex items-center gap-2">
          <span>❓</span>
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-xl border border-amber-200/90 bg-white overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-amber-950 hover:bg-amber-50/50"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-700 shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-amber-100 bg-amber-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Internal SEO Navigation Links */}
      <div className="mt-8 pt-4 border-t border-amber-200/60">
        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
          Explore Festive Greeting Collections:
        </h4>
        <nav aria-label="Footer SEO Navigation" className="flex flex-wrap gap-2 text-xs">
          {[
            { path: '/', label: 'Free Ganpati Card Maker' },
            { path: '/ganpati-greetings', label: 'Ganesh Chaturthi Greetings' },
            { path: '/ganpati-wishes-marathi', label: 'मराठी गणेशोत्सव शुभेच्छा' },
            { path: '/ganpati-wishes-hindi', label: 'हिंदी गणेश चतुर्थी बधाई' },
            { path: '/ganpati-wishes-english', label: 'English Ganpati Wishes' },
            { path: '/about', label: 'About Morya Greetings' },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate && onNavigate(item.path)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                currentPath === item.path
                  ? 'bg-amber-700 text-white border-amber-800'
                  : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-50 hover:border-amber-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};
