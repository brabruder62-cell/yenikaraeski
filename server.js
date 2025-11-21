// server.js - Vite + React için Railway sunucusu
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - Vite build edilmiş dosyalarını servis et
app.use(express.static(path.join(__dirname, 'dist')));

// Tüm routeları index.html'e yönlendir (SPA için)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Health check endpoint - Railway için önemli
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Admin panel çalışıyor!',
    timestamp: new Date().toISOString()
  });
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`🚀 Admin panel ${port} portunda çalışıyor!`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
});

// Hata yönetimi
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
