/*  api/sponsors/update.ts  */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('Sponsor güncellendi:', body);
    return res.status(200).json({ success: true, id: body.id || body._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Güncelleme hatası' });
  }
};
