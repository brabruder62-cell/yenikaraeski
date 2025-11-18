# 🚀 Karaeski App - Yayınlama Rehberi

## ✅ Build Tamamlandı!

`dist/` klasörü oluşturuldu ve içinde production-ready dosyalar var!

---

## 📦 YÖNTEM 1: Vercel ile Yayınlama (ÖNERİLEN - ÜCRETSİZ)

### Adım 1: Vercel Hesabı Oluşturun
1. https://vercel.com adresine gidin
2. **"Sign Up"** butonuna tıklayın
3. **GitHub ile giriş yapın** (önerilen)

### Adım 2: Projeyi GitHub'a Yükleyin
Terminal'de sırayla:

```bash
# Git başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit
git commit -m "Initial commit - Karaeski Casino App"

# GitHub'da yeni repo oluşturun
# https://github.com/new adresine gidin
# Repo adı: karaeski-app (veya istediğiniz)

# GitHub repo'nuzu bağlayın (GitHub'dan alacağınız URL)
git remote add origin https://github.com/KULLANICI_ADINIZ/karaeski-app.git

# GitHub'a gönderin
git branch -M main
git push -u origin main
```

### Adım 3: Vercel'de Deploy Edin
1. Vercel Dashboard'a gidin
2. **"New Project"** butonuna tıklayın
3. GitHub'dan **karaeski-app** repo'nuzu seçin
4. **Framework Preset:** `Vite` otomatik seçilecek
5. **Build Command:** `npm run build` (otomatik)
6. **Output Directory:** `dist` (otomatik)
7. **"Deploy"** butonuna tıklayın

**✅ 2-3 dakika içinde yayında!**

Vercel size şöyle bir URL verecek:
```
https://karaeski-app.vercel.app
```

---

## 📦 YÖNTEM 2: Netlify ile Yayınlama (ÜCRETSİZ)

### Adım 1: Netlify Hesabı
1. https://netlify.com adresine gidin
2. **"Sign Up"** tıklayın
3. GitHub ile giriş yapın

### Adım 2: Drag & Drop Deploy (GitHub olmadan)
1. Netlify Dashboard'da **"Add new site"**
2. **"Deploy manually"** seçeneğini seçin
3. `dist/` **klasörünü sürükleyip bırakın** (tüm klasörü!)

**✅ 1 dakikada yayında!**

Netlify size şöyle bir URL verecek:
```
https://random-name-123.netlify.app
```

### İsim Değiştirme (Netlify):
1. Site Settings → Domain Management
2. **"Change site name"** → `karaeski-app`
3. Yeni URL: `https://karaeski-app.netlify.app`

---

## 📦 YÖNTEM 3: Telegram Web App Hosting (ÖZELLEŞTİRİLMİŞ DOMAIN)

### Kendi Domain ile:
1. **Vercel veya Netlify'de deploy edin** (yukarıdaki adımlar)
2. **Custom domain ekleyin:**
   - Vercel: Settings → Domains → Add Domain
   - Netlify: Domain Settings → Add Custom Domain
3. **Domain'inizin DNS ayarlarını güncelleyin** (sağlayıcınızdan)

---

## 🤖 TELEGRAM BOT İLE ENTEGRASYON

### Adım 1: Bot Token'ınızı Hazırlayın
@BotFather'dan aldığınız token:
```
7891234560:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

### Adım 2: Mini App Oluşturun
1. Telegram'da **@BotFather**'ı açın
2. `/newapp` komutunu gönderin
3. Bot'unuzu seçin
4. **"What should the title of the app be?"** → `Karaeski Casino`
5. **"Send me an optional app description"** → Casino açıklaması
6. **"Send me a photo or video for the app"** → Logo gönderin (isteğe bağlı)
7. **"Now send me a GIF, that showcases your app"** → /skip
8. **"Perfect! And the moment we've all been waiting for."**
9. **"Please send me the Web App URL"** → Vercel/Netlify URL'nizi yapıştırın:
   ```
   https://karaeski-app.vercel.app
   ```
10. **"Send me a short name for the app"** → `karaeski` (benzersiz, küçük harf)

**✅ Mini App hazır!**

### Adım 3: Bot'unuzu Test Edin
1. Telegram'da bot'unuzu açın
2. **Menu** butonuna tıklayın (klavye ikonunun yanında)
3. **"Karaeski Casino"** görünecek
4. Tıklayın ve app açılacak!

---

## ⚙️ PRODUCTION AYARLARI

### 1. Admin Panel'e Giriş Yapın
Yayınladıktan sonra:
```
https://karaeski-app.vercel.app/admin/login
```

### 2. Settings Sayfasını Yapılandırın
Admin panel → **Settings**:

- **Telegram Bot Token:** `7891234560:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`
- **Telegram Channel Username:** `@karaeski_official` (sizin kanalınız)
- **Daily Bonus Amount:** `100`
- **Referral Bonus Amount:** `500`

**Kaydet!**

### 3. Telegram Kanal Ayarları
- Kanal üyeliği kontrolünün çalışması için **bot'u kanala admin yapın**
- Kanal Settings → Administrators → Add Administrator
- Bot'unuzu arayın ve admin yapın

---

## 📊 YAYINDA NE OLACAK?

### Kullanıcı Tarafı:
✅ Welcome screen (kanal üyeliği kontrolü)
✅ Daily bonus sistemi
✅ 3 oynanabilir oyun (Limbo, Dice, Mines)
✅ Görev sistemi (kanıt gönderme)
✅ Mağaza (coin ile alışveriş)
✅ Referral sistemi (KAR+6 haneli kod)
✅ Telegram entegrasyonu (profil verisi)

### Admin Tarafı:
✅ Dashboard (istatistikler)
✅ User yönetimi (coin ekleme/çıkarma)
✅ Sponsor CRUD (logo yükleme)
✅ Store CRUD (ürün yükleme)
✅ Görev CRUD (oluşturma/silme)
✅ Görev onaylama (kanıtları inceleme)
✅ Oyun ayarları (min/max bahis)
✅ Bildirim gönderme
✅ Ayarlar (bot token, kanallar)

---

## 🔒 GÜVENLİK ÖNERİLERİ

### 1. Admin Email'leri Koruyun
Admin panel'e sadece güvendiğiniz emaillerle giriş yapın.

### 2. Bot Token'ınızı Saklamayın
- ❌ GitHub'a yüklemeyin
- ✅ Sadece Admin Panel Settings'te saklayın

### 3. HTTPS Kullanın
Vercel ve Netlify otomatik SSL sertifikası verir (HTTPS aktif).

---

## 📱 TELEGRAM WEB APP ÖZELLİKLERİ

Yayına aldıktan sonra çalışacak özellikler:

- ✅ Telegram kullanıcı verisi (isim, username, profil fotosu)
- ✅ Haptic feedback (titreşim)
- ✅ Back button kontrolü
- ✅ Main button gösterimi
- ✅ Viewport genişletme
- ✅ Kanal üyeliği kontrolü

---

## 🎯 HIZLI ÖZET

```bash
# 1. Build (TAMAMLANDI ✅)
npm run build

# 2. Vercel ile yayınla
# - GitHub'a yükle
# - Vercel'e bağla
# - Deploy et

# 3. Telegram Bot ayarla
# - @BotFather → /newapp
# - Vercel URL'ni yapıştır

# 4. Admin panel ayarları
# - /admin/login
# - Settings → Bot token
# - Settings → Channel username
```

---

## 🆘 SORUN GİDERME

### "Build failed" hatası
```bash
npm run build
```
✅ Şu an çalışıyor!

### "Page not found" hatası (Vercel/Netlify)
Vercel/Netlify ayarlarına gidin:
- **Rewrites:** `/* → /index.html`
- (Vercel ve Netlify bunu otomatik yapar)

### Telegram'da açılmıyor
- Mini App URL'ini kontrol edin
- HTTPS olmalı (HTTP değil)
- Vercel/Netlify otomatik HTTPS verir

### Kanal kontrolü çalışmıyor
- Bot token'ınızı kontrol edin
- Bot'u kanala admin olarak ekleyin
- Channel username'in `@` ile başladığından emin olun

---

## 📞 İLETİŞİM VE DESTEK

Sorun yaşarsanız:
1. `TELEGRAM_SETUP.md` dosyasını okuyun
2. `PRODUCTION_CHECKLIST.md` dosyasını kontrol edin
3. Browser console'u açın (F12) ve hata loglarını kontrol edin

---

## 🎉 TEBRİKLER!

Projeniz production-ready! Şimdi:
1. ✅ `dist/` klasörü hazır
2. ✅ Vercel/Netlify'e yükleyin
3. ✅ Telegram bot'a bağlayın
4. ✅ Admin panel'den ayarlayın
5. ✅ Yayında!

**İyi şanslar! 🚀**
