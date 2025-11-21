// server.js - Debug versiyonu
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

console.log('🔄 Server başlatılıyor...');
console.log('📁 Current directory:', __dirname);
console.log('📁 Files in directory:', (await import('fs')).readdirSync(__dirname));

// Basic route
app.get('/', (req, res) => {
  console.log('📄 Root route called');
  res.send('🚀 Admin Panel Çalışıyor!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server çalışıyor' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server ${port} portunda çalışıyor!`);
});
