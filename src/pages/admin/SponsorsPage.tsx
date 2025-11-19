// 1) import ekle
import { table } from '@devvai/devv-code-backend';

// 2) ImageUpload'un onChange yerine kendi handler'ımız
const handleLogoUpload = async (file: File) => {
  if (!file) return;
  try {
    // 401 önlemi – anonim oturum
    await table.createSession({ anon: true });
    const { url } = await table.uploadFile(file);
    setFormData({ ...formData, logo_url: url });
    toast({ title: 'Logo yüklendi!' });
  } catch (e: any) {
    toast({ title: 'Yükleme hatası', variant: 'destructive' });
    console.error(e);
  }
};

// 3) ImageUpload'u sarıyoruz – eski onChange'i bypass
<div className="space-y-2">
  <label className="text-sm text-emerald-300">Logo</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleLogoUpload(file);
    }}
    className="block w-full text-sm text-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
  />
  {formData.logo_url && (
    <p className="text-emerald-400 text-xs mt-1">✓ Yüklendi: {formData.logo_url}</p>
  )}
</div>
