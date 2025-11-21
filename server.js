// server.js - ES Module formatında
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

console.log('🚀 Server başlatılıyor...');

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// Tüm routeları index.html'e yönlendir
app.get('*', (req, res) => {
  console.log('📄 Index.html servis ediliyor');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  console.log('❤️ Health check çağrıldı');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Admin panel çalışıyor!',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Admin panel ${port} portunda çalışıyor!`);
  console.log(`📊 Health check: http://0.0.0.0:${port}/health`);
});
