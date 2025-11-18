# 🚀 Netlify Deployment Rehberi

## ⚡ HIZLI BAŞLANGIÇ (3 Yöntem)

### **Yöntem 1: Drag & Drop (EN KOLAY) ⚡**

1. **https://netlify.com** adresine git
2. **"Sign up"** tıkla (GitHub/Email ile)
3. **"Sites"** sekmesinde → **"Deploy manually"** tıkla
4. **`dist/` klasörünü sürükle bırak**

**✅ 1 dakikada canlı!** Size URL verilir:
```
https://random-name-xxxxx.netlify.app
```

---

### **Yöntem 2: Netlify CLI (HIZLI)** 

Terminal'de:

```bash
# 1. Netlify CLI'yi yükle (ilk kez ise)
npm install -g netlify-cli

# 2. Login ol
netlify login

# 3. Deploy et!
netlify deploy --prod --dir=dist
```

**✅ 1-2 dakikada canlı!**

---

### **Yöntem 3: GitHub + Netlify (OTOMATIK)**

```bash
# 1. Git başlat
git init
git add .
git commit -m "Karaeski Casino - Production Ready"

# 2. GitHub'da yeni repo oluştur
# https://github.com/new

# 3. Remote ekle (kendi URL'nizi yazın)
git remote add origin https://github.com/KULLANICI_ADI/karaeski-app.git
git branch -M main
git push -u origin main

# 4. Netlify.com'a git
# - GitHub ile giriş yap
# - "Import from Git" tıkla
# - Repo'yu seç
# - Build settings otomatik gelir (değiştirmeyin!)
# - "Deploy site" tıkla
```

**✅ 2-3 dakikada canlı + otomatik güncellemeler!**

---

## 🔧 NETLIFY AYARLARI

### **Build Settings (Otomatik tespit edilir)**

```
Build command: npm run build
Publish directory: dist
Node version: 18
```

### **Custom Domain (İsteğe Bağlı)**

1. Netlify Dashboard → **"Domain settings"**
2. **"Add custom domain"**
3. Domain'inizi girin (örn: `karaeski.com`)
4. DNS ayarlarını yapın
5. **SSL otomatik aktif!**

---

## 📱 TELEGRAM BOT KURULUMU

### **1. Bot Oluştur**

Telegram'da **@BotFather** ile konuş:

```
/newbot
```

**İsimler:**
- Bot ismi: `Karaeski Casino Bot`
- Username: `karaeski_bot` (veya benzersiz bir isim)

**✅ Token'ı kopyalayın!** Örnek:
```
6123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

### **2. Mini App Oluştur**

@BotFather'a devam:

```
/newapp
```

- **Bot'u seç:** karaeski_bot
- **App title:** Karaeski Casino
- **Description:** Telegram üzerinden casino oyunları ve görevler
- **Photo:** 640x360 görsel yükle
- **Web App URL girin:**
  ```
  https://YOUR-SITE-NAME.netlify.app
  ```
- **Short name:** `karaeski` (URL'de görünecek)

**✅ Mini App hazır!** Test için:
```
https://t.me/karaeski_bot/karaeski
```

---

## 🎛️ ADMIN PANEL AYARLARI

### **1. Admin Panel'e Giriş**

URL:
```
https://YOUR-SITE-NAME.netlify.app/admin/login
```

**Adımlar:**
1. Email adresinizi girin (herhangi bir email)
2. Devv Auth OTP kodu gelecek (email'inize)
3. Kodu girin ve giriş yapın

### **2. Settings Sayfasını Açın**

```
/admin/settings
```

### **3. Telegram Ayarlarını Yapın**

**Bot Token:**
```
6123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

**Channel Username:**
```
@karaeski_official
```
(veya kendi kanalınız)

**Initial User Balance:**
```
1000
```

**Daily Bonus:**
```
100
```

**Referral Bonus (Referrer):**
```
500
```

**Referral Bonus (Referee):**
```
500
```

**✅ "Kaydet" butonuna tıklayın!**

---

## 📢 TELEGRAM KANAL KURULUMU

### **1. Kanal Oluştur**

- Telegram'da **"Yeni Kanal"** oluştur
- İsim: `Karaeski Casino Official`
- Username: `@karaeski_official`
- **Public** kanal yapın

### **2. Bot'u Admin Yapın**

1. Kanal ayarları → **Administrators**
2. **"Add Administrator"** tıkla
3. Bot'unuzu bulun ve ekleyin
4. **"Can invite users via link"** iznini verin (üyelik kontrolü için)

**✅ Kanal hazır!**

---

## ✅ DEPLOYMENT SONRASI TEST

### **Kontrol Listesi:**

- [ ] **Site açılıyor mu?** → `https://YOUR-SITE-NAME.netlify.app`
- [ ] **Admin panel çalışıyor mu?** → `/admin/login`
- [ ] **Settings'de bot token kaydedildi mi?**
- [ ] **Telegram bot'a `/start` komutu çalışıyor mu?**
- [ ] **Mini App açılıyor mu?** → `t.me/BOT_USERNAME/APP_SHORT_NAME`
- [ ] **Kanal üyelik kontrolü çalışıyor mu?**
- [ ] **Oyunlar coin kesip ekliyor mu?**
- [ ] **Referral sistemi çalışıyor mu?**

---

## 🔄 GÜNCELLEME NASIL YAPILIR?

### **Drag & Drop Yöntemi:**
1. Proje klasöründe `npm run build` çalıştır
2. Netlify Dashboard → **"Deploys"**
3. Yeni `dist/` klasörünü sürükle bırak

### **CLI Yöntemi:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### **GitHub Yöntemi (Otomatik):**
```bash
git add .
git commit -m "Güncelleme açıklaması"
git push
```
**✅ Netlify otomatik deploy eder!**

---

## 🚨 SORUN GİDERME

### **Build hatası alıyorsam?**

`package.json` kontrol:
```json
"scripts": {
  "build": "tsc -b && vite build"
}
```

### **Sayfalar 404 veriyor?**

`netlify.toml` dosyası var mı kontrol edin (SPA redirect gerekli).

### **Bot token çalışmıyor?**

1. Token'ı kopyalarken boşluk bırakmayın
2. Admin panel Settings'den kaydedildiğinden emin olun
3. Console'da API hatalarını kontrol edin

### **Kanal üyelik kontrolü çalışmıyor?**

1. Bot kanal admin'i mi kontrol edin
2. Channel username'de `@` işareti var mı kontrol edin
3. Kanal public mi kontrol edin

---

## 🎯 ÖZET

**Yapılacaklar sırası:**

1. ✅ **Netlify'e deploy et** (Drag & Drop en kolay)
2. ✅ **Telegram bot oluştur** (@BotFather)
3. ✅ **Mini App oluştur** (Web App URL'i bağla)
4. ✅ **Telegram kanalı oluştur** (Public, bot admin)
5. ✅ **Admin panel'e giriş yap** (/admin/login)
6. ✅ **Settings'den ayarları yap** (Token, channel, bonuslar)
7. ✅ **Test et!** (Bot'a /start, mini app aç, kanal kontrolü)

---

## 📞 DESTEK

Sorun yaşarsanız:
- Netlify docs: https://docs.netlify.com
- Telegram Bot API: https://core.telegram.org/bots
- Devv SDK docs: Proje içinde `api_doc()` kullanın

---

**🚀 Başarılar! Casino platformunuz canlıya alınıyor!**
