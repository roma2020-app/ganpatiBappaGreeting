export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: Record<string, unknown>;
}

const BASE_URL =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://ganpatigreeting.vercel.app';

export const ROUTES_SEO: Record<string, RouteSEO> = {
  '/': {
    path: '/',
    title: 'Ganpati Greetings & Personalized Greeting Cards Free | Morya Greetings',
    description:
      'Create beautiful personalized Ganpati greeting cards for free. Add your name, choose Marathi, Hindi or English wishes, download and share instantly on WhatsApp.',
    keywords:
      'Ganpati greetings, personalized Ganpati cards, Ganesh Chaturthi greeting card maker, free Ganpati card generator, Marathi Ganpati wishes, Hindi Ganesh Chaturthi greetings, WhatsApp Ganpati card, Lord Ganesha cards',
    h1: 'Ganpati Greetings & Personalized Greeting Cards Free',
    canonical: `${BASE_URL}/`,
    ogTitle: 'Ganpati Greetings & Personalized Greeting Cards Free | Morya Greetings',
    ogDescription:
      'Create beautiful personalized Ganpati greeting cards for free. Add your name, choose Marathi, Hindi or English wishes, download and share instantly on WhatsApp.',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Morya Greetings',
      url: `${BASE_URL}/`,
      description:
        'Create beautiful personalized Ganpati greeting cards for free. Add your name, choose Marathi, Hindi or English wishes, download and share instantly on WhatsApp.',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      creator: {
        '@type': 'Person',
        name: 'Roma Gupta',
      },
    },
  },
  '/ganpati-greetings': {
    path: '/ganpati-greetings',
    title: 'Free Ganesh Chaturthi Greeting Card Maker | Morya Greetings',
    description:
      'Design custom Ganesh Chaturthi cards with your name, sacred shlokas, and festive themes. Download HD card images and share directly on WhatsApp.',
    keywords:
      'Ganpati greetings maker, custom Ganesh Chaturthi cards, festive cards with name, Ganeshotsav card download, WhatsApp Ganpati status card, online Ganpati card creator',
    h1: 'Online Ganpati Greeting Card Maker & Devotional Wishes',
    canonical: `${BASE_URL}/ganpati-greetings`,
    ogTitle: 'Free Ganesh Chaturthi Greeting Card Maker | Morya Greetings',
    ogDescription:
      'Design custom Ganesh Chaturthi cards with your name, sacred shlokas, and festive themes. Download HD card images and share directly on WhatsApp.',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Free Ganesh Chaturthi Greeting Card Maker',
      url: `${BASE_URL}/ganpati-greetings`,
      description:
        'Design custom Ganesh Chaturthi cards with your name, sacred shlokas, and festive themes. Download HD card images and share directly on WhatsApp.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Morya Greetings',
        url: `${BASE_URL}/`,
      },
    },
  },
  '/ganpati-wishes-marathi': {
    path: '/ganpati-wishes-marathi',
    title: 'गणपती बाप्पा मोरया शुभेच्छा व ग्रीटिंग कार्ड्स | Ganpati Wishes Marathi',
    description:
      'मराठीत गणेशोत्सवाच्या हार्दिक शुभेच्छा, गणपती बाप्पा मोरया कोट्स, श्लोक आणि स्वतःच्या नावासह मोफत ग्रीटिंग कार्ड तयार करा.',
    keywords:
      'गणपती बाप्पा मोरया शुभेच्छा, गणेशोत्सव शुभेच्छा मराठी, Ganpati wishes in Marathi, Marathi Ganesh Chaturthi greetings, सुखकर्ता दुखहर्ता, बाप्पाचे आशीर्वाद',
    h1: 'गणपती बाप्पा मोरया - मराठीत गणेशोत्सव शुभेच्छा व ग्रीटिंग कार्ड्स',
    canonical: `${BASE_URL}/ganpati-wishes-marathi`,
    ogTitle: 'गणपती बाप्पा मोरया शुभेच्छा व ग्रीटिंग कार्ड्स | Ganpati Wishes Marathi',
    ogDescription:
      'मराठीत गणेशोत्सवाच्या हार्दिक शुभेच्छा, गणपती बाप्पा मोरया कोट्स, श्लोक आणि स्वतःच्या नावासह मोफत ग्रीटिंग कार्ड तयार करा.',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'गणपती बाप्पा मोरया शुभेच्छा व ग्रीटिंग कार्ड्स',
      url: `${BASE_URL}/ganpati-wishes-marathi`,
      inLanguage: 'mr',
      description:
        'मराठीत गणेशोत्सवाच्या हार्दिक शुभेच्छा, गणपती बाप्पा मोरया कोट्स, श्लोक आणि स्वतःच्या नावासह मोफत ग्रीटिंग कार्ड तयार करा.',
    },
  },
  '/ganpati-wishes-hindi': {
    path: '/ganpati-wishes-hindi',
    title: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं व ग्रीटिंग कार्ड्स | Ganpati Wishes Hindi',
    description:
      'भगवान श्री गणेश चतुर्थी की हार्दिक शुभकामनाएं, पावन बधाई संदेश, श्लोक और अपने नाम के साथ सुंदर ग्रीटिंग कार्ड मुफ्त बनाएं और व्हाट्सएप पर शेयर करें।',
    keywords:
      'गणेश चतुर्थी की हार्दिक शुभकामनाएं, Ganpati wishes in Hindi, गणेश उत्सव बधाई संदेश, वक्रतुण्ड महाकाय, श्री गणेश कृपाशीर्वाद, हिंदी गणेश कार्ड',
    h1: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं - हिंदी बधाई संदेश व ग्रीटिंग कार्ड्स',
    canonical: `${BASE_URL}/ganpati-wishes-hindi`,
    ogTitle: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं व ग्रीटिंग कार्ड्स | Ganpati Wishes Hindi',
    ogDescription:
      'भगवान श्री गणेश चतुर्थी की हार्दिक शुभकामनाएं, पावन बधाई संदेश, श्लोक और अपने नाम के साथ सुंदर ग्रीटिंग कार्ड मुफ्त बनाएं और व्हाट्सएप पर शेयर करें।',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं व ग्रीटिंग कार्ड्स',
      url: `${BASE_URL}/ganpati-wishes-hindi`,
      inLanguage: 'hi',
      description:
        'भगवान श्री गणेश चतुर्थी की हार्दिक शुभकामनाएं, पावन बधाई संदेश, श्लोक और अपने नाम के साथ सुंदर ग्रीटिंग कार्ड मुफ्त बनाएं और व्हाट्सएप पर शेयर करें।',
    },
  },
  '/ganpati-wishes-english': {
    path: '/ganpati-wishes-english',
    title: 'Happy Ganesh Chaturthi Wishes, Quotes & Free Greeting Cards | Morya Greetings',
    description:
      'Send warm Ganesh Chaturthi wishes, auspicious quotes, and personalized devotional cards with your name. Free instant download and WhatsApp sharing.',
    keywords:
      'Happy Ganesh Chaturthi wishes, Ganesh festival quotes English, Lord Ganesha greeting cards with name, Ganeshotsav messages, divine blessings card creator',
    h1: 'Happy Ganesh Chaturthi Wishes, Quotes & Personalized Cards',
    canonical: `${BASE_URL}/ganpati-wishes-english`,
    ogTitle: 'Happy Ganesh Chaturthi Wishes, Quotes & Free Greeting Cards | Morya Greetings',
    ogDescription:
      'Send warm Ganesh Chaturthi wishes, auspicious quotes, and personalized devotional cards with your name. Free instant download and WhatsApp sharing.',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Happy Ganesh Chaturthi Wishes, Quotes & Free Greeting Cards',
      url: `${BASE_URL}/ganpati-wishes-english`,
      inLanguage: 'en',
      description:
        'Send warm Ganesh Chaturthi wishes, auspicious quotes, and personalized devotional cards with your name. Free instant download and WhatsApp sharing.',
    },
  },
  '/about': {
    path: '/about',
    title: 'About Morya Greetings | Personalized Devotional Greeting Card Generator',
    description:
      'Learn about Morya Greetings, created with devotion to help families, friends, societies, and businesses share personalized Ganpati festival blessings.',
    keywords:
      'About Morya Greetings, Ganpati card creator story, Roma Gupta developer, festival greeting card tool, privacy friendly card generator, Hindu festival celebrations',
    h1: 'About Morya Greetings',
    canonical: `${BASE_URL}/about`,
    ogTitle: 'About Morya Greetings | Personalized Devotional Greeting Card Generator',
    ogDescription:
      'Learn about Morya Greetings, created with devotion to help families, friends, societies, and businesses share personalized Ganpati festival blessings.',
    ogImage: `${BASE_URL}/og-image.jpg`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Morya Greetings',
      url: `${BASE_URL}/about`,
      description:
        'Learn about Morya Greetings, created with devotion to help families, friends, societies, and businesses share personalized Ganpati festival blessings.',
      publisher: {
        '@type': 'Person',
        name: 'Roma Gupta',
      },
    },
  },
};

/**
 * Normalizes route path to match supported SEO routes
 */
export function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (ROUTES_SEO[clean]) {
    return clean;
  }
  return '/';
}

/**
 * Dynamically updates document metadata for SEO on route change
 */
export function applyRouteSEO(pathname: string): RouteSEO {
  const route = normalizePath(pathname);
  const seo = ROUTES_SEO[route] || ROUTES_SEO['/'];

  if (typeof document !== 'undefined') {
    // 1. Title
    document.title = seo.title;

    // 2. Meta description
    setMetaTag('description', seo.description);
    setMetaTag('keywords', seo.keywords);

    // 3. Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
    canonicalLink.setAttribute('href', `${currentOrigin}${seo.path === '/' ? '' : seo.path}`);

    // 4. Open Graph tags
    setMetaProperty('og:title', seo.ogTitle);
    setMetaProperty('og:description', seo.ogDescription);
    setMetaProperty('og:url', `${currentOrigin}${seo.path === '/' ? '' : seo.path}`);
    setMetaProperty('og:image', `${currentOrigin}/og-image.jpg`);

    // 5. Twitter cards
    setMetaTag('twitter:title', seo.ogTitle);
    setMetaTag('twitter:description', seo.ogDescription);
    setMetaTag('twitter:image', `${currentOrigin}/og-image.jpg`);

    // 6. JSON-LD structured data
    let jsonLdScript = document.getElementById('route-specific-jsonld') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'route-specific-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(seo.structuredData);
  }

  return seo;
}

function setMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
