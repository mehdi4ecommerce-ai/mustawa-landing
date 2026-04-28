// Serveur Express minimal pour servir le site vitrine Mustawa
const express = require('express');
const path = require('path');

const app = express();
const PUBLIC_DIR = path.join(__dirname, 'public');

// ── Trust proxy (Replit / OVH / Cloudflare) ─────────────────
app.set('trust proxy', 1);

// ── Headers de securite minimaux ────────────────────────────
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ── Routes propres pour les pages legales ───────────────────
// (sans .html dans l'URL)
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'privacy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'terms.html'));
});

// ── Fichiers statiques ──────────────────────────────────────
app.use(express.static(PUBLIC_DIR, {
  maxAge: '1h',
  extensions: ['html'],
}));

// ── Fallback : renvoie index.html pour toutes les autres URLs
// (pour SPA-style si besoin futur)
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mustawa Landing running on port ${PORT}`);
});
