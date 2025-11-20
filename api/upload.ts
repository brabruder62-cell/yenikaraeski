// pages/api/upload.ts - TAMAMEN YENİ KOD
import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📤 Upload başladı...');
    
    // Buffer olarak veriyi oku
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    console.log('📊 Dosya boyutu:', buffer.length, 'bytes');

    // Dosya boyutu kontrolü (5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Dosya boyutu 5MB üzerinde' });
    }

    // Basit dosya tipi kontrolü
    const signature = buffer.toString('hex', 0, 4);
    let extension = 'png';
    
    if (signature.startsWith('ffd8ff')) {
      extension = 'jpg';
    } else if (signature.startsWith('89504e47')) {
      extension = 'png';
    } else {
      return res.status(400).json({ error: 'Sadece JPEG ve PNG dosyaları yüklenebilir' });
    }

    const filename = `sponsors/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;

    console.log('📁 Dosya adı:', filename);
    console.log('🔑 Token kontrol:', !!process.env.BLOB_READ_WRITE_TOKEN);

    // Vercel Blob'a yükle
    const { url } = await put(filename, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('✅ Logo başarıyla yüklendi:', url);
    res.status(200).json({ url });

  } catch (error: any) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Yükleme başarısız: ' + error.message });
  }
}
