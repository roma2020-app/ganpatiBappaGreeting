import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent storage file for global cards generated count
const DATA_DIR = path.join(process.cwd(), 'data');
const COUNTER_FILE = path.join(DATA_DIR, 'stats.json');

// Real count of generated cards
const INITIAL_OFFSET = 0;

function readCount(): number {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(COUNTER_FILE)) {
      fs.writeFileSync(COUNTER_FILE, JSON.stringify({ cardsCount: 0 }), 'utf-8');
      return 0;
    }
    const raw = fs.readFileSync(COUNTER_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return typeof data.cardsCount === 'number' ? data.cardsCount : 0;
  } catch (err) {
    console.error('Error reading cards count:', err);
    return 0;
  }
}

function incrementCount(): number {
  try {
    const current = readCount();
    const updated = current + 1;
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ cardsCount: updated }), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error writing cards count:', err);
    return 1;
  }
}

// API Routes
app.get('/api/stats/cards-count', (req, res) => {
  const count = readCount();
  res.json({ count });
});

app.post('/api/stats/cards-count/increment', (req, res) => {
  const count = incrementCount();
  res.json({ count });
});

// Dynamic SEO files serving that adapts to any host (e.g. ganpatigreeting.vercel.app, ganpatibappamorya.vercel.app, etc.)
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'ganpatigreeting.vercel.app';
  const proto = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const domain = `${proto}://${host}`;

  res.type('text/plain').send(
`# robots.txt for Morya Greetings
User-agent: *
Allow: /
Disallow: /api/

# Sitemap location
Sitemap: ${domain}/sitemap.xml
`
  );
});

app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host') || 'ganpatigreeting.vercel.app';
  const proto = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const domain = `${proto}://${host}`;
  const today = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/ganpati-greetings</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/ganpati-wishes-marathi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/ganpati-wishes-hindi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/ganpati-wishes-english</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  res.type('application/xml').send(sitemapXml);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const htmlPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(htmlPath)) {
        return res.status(404).send('Application not built');
      }
      let html = fs.readFileSync(htmlPath, 'utf-8');
      const reqPath = req.path.replace(/\/$/, '') || '/';

      const routeMetadata: Record<string, { title: string; desc: string }> = {
        '/': {
          title: 'Ganpati Greetings & Personalized Greeting Cards Free | Morya Greetings',
          desc: 'Create beautiful personalized Ganpati greeting cards for free. Add your name, choose Marathi, Hindi or English wishes, download and share instantly on WhatsApp.',
        },
        '/ganpati-greetings': {
          title: 'Free Ganesh Chaturthi Greeting Card Maker | Morya Greetings',
          desc: 'Design custom Ganesh Chaturthi cards with your name, sacred shlokas, and festive themes. Download HD card images and share directly on WhatsApp.',
        },
        '/ganpati-wishes-marathi': {
          title: 'गणपती बाप्पा मोरया शुभेच्छा व ग्रीटिंग कार्ड्स | Ganpati Wishes Marathi',
          desc: 'मराठीत गणेशोत्सवाच्या हार्दिक शुभेच्छा, गणपती बाप्पा मोरया कोट्स, श्लोक आणि स्वतःच्या नावासह मोफत ग्रीटिंग कार्ड तयार करा.',
        },
        '/ganpati-wishes-hindi': {
          title: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं व ग्रीटिंग कार्ड्स | Ganpati Wishes Hindi',
          desc: 'भगवान श्री गणेश चतुर्थी की हार्दिक शुभकामनाएं, पावन बधाई संदेश, श्लोक और अपने नाम के साथ सुंदर ग्रीटिंग कार्ड मुफ्त बनाएं और व्हाट्सएप पर शेयर करें।',
        },
        '/ganpati-wishes-english': {
          title: 'Happy Ganesh Chaturthi Wishes, Quotes & Free Greeting Cards | Morya Greetings',
          desc: 'Send warm Ganesh Chaturthi wishes, auspicious quotes, and personalized devotional cards with your name. Free instant download and WhatsApp sharing.',
        },
        '/about': {
          title: 'About Morya Greetings | Personalized Devotional Greeting Card Generator',
          desc: 'Learn about Morya Greetings, created with devotion to help families, friends, societies, and businesses share personalized Ganpati festival blessings.',
        },
      };

      const meta = routeMetadata[reqPath];
      if (meta) {
        html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
        html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${meta.desc}" />`);
        html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${meta.title}" />`);
        html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${meta.desc}" />`);
        html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${reqPath}" />`);
      }

      res.send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Morya Greetings server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
