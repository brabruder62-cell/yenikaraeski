/*  api/sponsors/update.ts  –  hem yükleme hem güncelleme  */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // body’yi güvenle al
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('Sponsor işlemi:', body);

    /*  TODO: DB yazma (Vercel KV, Postgres, vs.)  */
    /*  Şimdilik sadece başarı dönelim  */
    return res.status(200).json({ success: true, id: body.id || body._id });
  } catch (e: any) {
    console.error('Sunucu hatası:', e);
    return res.status(500).json({ error: e.message || 'İşlem başarısız' });
  }
};
