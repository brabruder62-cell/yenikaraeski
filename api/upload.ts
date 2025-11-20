/*  api/upload.ts  –  HATASIZ  –  Vercel serverless  */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Dosya hatası' });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: 'Dosya yok' });

    const fileName = `${Date.now()}-${file.originalFilename}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    const destPath = path.join(uploadDir, fileName);
    fs.copyFileSync(file.filepath, destPath);

    const url = `https://${process.env.VERCEL_URL}/uploads/${fileName}`;
    return res.json({ url });
  });
};
