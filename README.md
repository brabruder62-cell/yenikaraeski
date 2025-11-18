# 🎰 Karaeski App - Telegram Mini App Casino Platform

[![Deploy Status](https://img.shields.io/badge/deploy-cloudflare%20pages-orange)](https://pages.cloudflare.com/)
[![Version](https://img.shields.io/badge/version-2.0-green)](https://github.com)
[![Status](https://img.shields.io/badge/status-production%20ready-success)](https://github.com)

> Modern Telegram Mini App platformu - Casino oyunları, görevler ve ödül sistemi

---

## 🎯 Özellikler

### ✨ Kullanıcı Özellikleri
- 🎮 **Playable Casino Games** - Limbo, Dice, Mines
- 💰 **Coin & Reward System** - Günlük bonus, görev ödülleri
- 🎁 **Referral System** - Davet kodu ile +500 coin
- 🛍️ **Store (Mağaza)** - Coin ile ürün satın alma
- 📊 **Profile & Stats** - Telegram entegrasyonu
- 📢 **Sponsor Showcase** - Dinamik sponsor gösterimi

### 🔐 Admin Panel
- 👥 **User Management** - Kullanıcı yönetimi
- 🎯 **Task Management** - Görev oluşturma ve onaylama
- 🛍️ **Store Management** - Ürün CRUD işlemleri
- 📢 **Sponsor Management** - Sponsor sitesi yönetimi
- ⚙️ **Settings** - Bot token, kanal, bonuslar
- 📊 **Dashboard** - İstatistikler ve grafikler

---

## 🚀 Hızlı Başlangıç

### 1. Telegram Bot Oluştur

```bash
# @BotFather'da:
/newbot
Bot Name: Karaeski Casino Bot
Username: karaeski_bot

# Token'ı kaydet!
```

### 2. Kanal Oluştur

```bash
1. Public kanal oluştur
2. Username: karaeski_official
3. Bot'u admin yap (Invite Users yetkisi)
```

### 3. Admin Panel Ayarları

```
URL: https://SITE_URL.pages.dev/admin/login

Settings → Telegram Bot Ayarları:
- Bot Token: [BotFather'dan aldığınız token]
- Kanal Kullanıcı Adı: karaeski_official
```

---

## 📖 Dokümantasyon

| Dosya | Açıklama |
|-------|----------|
| **[HIZLI_BASLANGIC.md](./HIZLI_BASLANGIC.md)** | ⚡ 3 adımda başlangıç + sorun giderme |
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | 📡 Detaylı deployment ve güncelleme |
| **[CHANNEL_SETUP.md](./CHANNEL_SETUP.md)** | 📢 Telegram kanal ve bot kurulumu |
| **[.devv/STRUCTURE.md](./.devv/STRUCTURE.md)** | 🏗️ Proje yapısı ve özellikler |

---

## 🛠️ Teknolojiler

### Frontend
- ⚛️ **React 18** + TypeScript
- 🎨 **Tailwind CSS** + shadcn/ui
- 🔄 **Zustand** - State management
- 📱 **Telegram Web App SDK**

### Backend (SDK)
- 🔐 **Devv Auth** - Email OTP
- 💾 **Devv Table** - NoSQL database (8 tables)
- 📤 **Devv File Upload** - Image uploads

---

## 📊 Veritabanı Tabloları

| Tablo | Açıklama | İzinler |
|-------|----------|---------|
| `users` | Kullanıcı verileri | Owner |
| `sponsors` | Sponsor siteleri | Public Read |
| `store_items` | Mağaza ürünleri | Public Read |
| `tasks` | Görev tanımları | Public Read |
| `task_completions` | Görev tamamlamaları | Owner |
| `notifications` | Admin bildirimleri | Owner |
| `game_settings` | Oyun ayarları | Public Read |
| `app_settings` | Uygulama ayarları | Public Read |

---

## 🔄 Güncelleme Akışı

```bash
# Kod değişikliği yap
git add .
git commit -m "Yeni özellik eklendi"
git push

# ✅ Cloudflare Pages otomatik deploy eder!
# 1-3 dakika içinde canlıda görünür
```

---

## ❌ Sorun Giderme

### Sponsor Görseli Yüklenmiyor?
- Maksimum 5MB
- Format: JPG, PNG, WEBP
- Yükleme sırasında bekleyin

### Kanal Kontrolü Başarısız?
- Bot token doğru mu? (Admin Panel → Settings)
- Bot kanal admini mi?
- Kanal PUBLIC mi?

### Uygulama Başlatılamıyor?
- Web App URL doğru mu? (`https://SITE.pages.dev`)
- Mini App @BotFather'da eklenmiş mi?

**Detaylı çözümler için:** [HIZLI_BASLANGIC.md](./HIZLI_BASLANGIC.md)

---

## 🎮 Oyunlar

### Limbo
Çarpan tahmin oyunu. Seçtiğiniz çarpandan yüksek gelirse kazanırsınız!

### Dice
Zar atma oyunu. Over/Under seçeneği ile bahis yapın.

### Mines
Mayınsweeper tarzı risk oyunu. Bomba olmayan kareleri bulun!

---

## 📱 Linkler

### Kullanıcı
```
Mini App: https://t.me/karaeski_bot/karaeski
```

### Admin
```
Admin Panel: https://SITE_URL.pages.dev/admin/login
```

---

## 📝 Önemli Notlar

### ✅ Yapıldı (v2.0)
- ✅ Demo mod kaldırıldı
- ✅ Sponsor görseli yükleme düzeltildi
- ✅ Store route eklendi
- ✅ Admin Panel Settings geliştirmesi
- ✅ Kanal ayarları Admin Panel'den yapılabilir
- ✅ Türkçe hata mesajları
- ✅ Production ready build

### 🎯 Kullanıma Hazır
- Tüm özellikler database'e bağlı
- Real-time güncellemeler
- Cloudflare Pages'de deploy edildi
- Build optimize edildi
- Telegram bot entegrasyonu çalışıyor

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

---

## 📄 Lisans

Bu proje özel kullanım içindir.

---

## 📞 Destek

**Sorun yaşarsanız:**
1. [HIZLI_BASLANGIC.md](./HIZLI_BASLANGIC.md) kontrol edin
2. Admin Panel → Settings ayarlarını gözden geçirin
3. Cloudflare build loglarını inceleyin

---

## 🎉 Başarılı Deployment!

**Artık uygulamanız canlıda kullanılmaya hazır!**

```
🚀 Mini App: https://t.me/karaeski_bot/karaeski
🎛️ Admin Panel: https://SITE_URL.pages.dev/admin/login
📢 Kanal: https://t.me/karaeski_official
```

---

**Versiyon:** 2.0 - Production Ready  
**Son Güncelleme:** 18.11.2025  
**Made with ❤️ for Telegram Mini Apps**
