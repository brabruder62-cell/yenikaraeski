// src/lib/api.ts – kendi sunucumuza giden basit istemci
const API_BASE = '/api'; // kendi Vercel edge'imiz

export async function updateSponsor(id: string, data: any) {
  const res = await fetch(`${API_BASE}/sponsors/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...data }),
  });
  if (!res.ok) throw new Error('Güncelleme başarısız');
  return res.json();
}

export async function addSponsor(data: any) {
  const res = await fetch(`${API_BASE}/sponsors/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ekleme başarısız');
  return res.json();
}
