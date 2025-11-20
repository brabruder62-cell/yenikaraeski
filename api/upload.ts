/*  api/upload.ts  */
import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import multiparty from 'multiparty';

export const config = { api: { bodyParser: false } };

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err || !files.file || !files.file[0])
      return res.status(400).json({ error: 'Dosya bulunamadı' });

    const { path, originalFilename } = files.file[0];
    const ext = originalFilename?.split('.').pop() || 'png';

    try {
      const { url } = await put(
        `uploads/${Date.now()}.${ext}`,
        fs.createReadStream(path),
        { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN! }
      );
      return res.json({ url });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: 'Yükleme başarısız' });
    }
  });
};
