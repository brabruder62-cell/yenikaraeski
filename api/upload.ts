/*  api/upload.ts  –  KESİN ÇÖZÜM  –  Vercel serverless  */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 });
  try {
    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: 'Dosya yok' });

    const fileName = `${Date.now()}-${file.originalFilename}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const destPath = path.join(uploadDir, fileName);
    await fs.copyFile(file.filepath, destPath);

    const url = `https://${process.env.VERCEL_URL}/uploads/${fileName}`;
    return res.json({ url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};
