/*  api/upload.ts  –  Vercel Blob – ücretsiz, anonim, sınırsız  */
import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = { api: { bodyParser: false } };

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { url } = await put(`uploads/${Date.now()}.png`, req, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return res.json({ url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Yükleme başarısız' });
  }
};
