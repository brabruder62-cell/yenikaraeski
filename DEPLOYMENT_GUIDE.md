# 🚀 Karaeski App - Deployment ve Güncelleme Rehberi

## 📋 İÇİNDEKİLER
1. [İlk Kurulum](#ilk-kurulum)
2. [Güncellemeleri Yayınlama](#güncellemeleri-yayınlama)
3. [Admin Panel Ayarları](#admin-panel-ayarları)
4. [Telegram Bot Kurulumu](#telegram-bot-kurulumu)
5. [Sorun Giderme](#sorun-giderme)

---

## 🎯 İLK KURULUM

### 1. Cloudflare Pages Deployment

#### **A. GitHub'a Kod Yükleme**

```bash
# Projeyi GitHub'a yükleyin (ilk kez)
git init
git add .
git commit -m "Karaeski App - Initial commit"
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git push -u origin main
```

#### **B. Cloudflare Pages Bağlama**

1. **Cloudflare Dashboard'a gidin:** https://dash.cloudflare.com
2. **Pages** → **Create a project** → **Connect to Git**
3. **GitHub repo'nuzu seçin**
4. **Build ayarlarını yapın:**

```
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: (BOŞ BIRAKIN!)
Node.js version: 18
```

5. **"Save and Deploy"** tıklayın
6. ✅ **Build başarılı olunca site URL'ini kopyalayın:**
   ```
   https://karaeski.pages.dev
   ```

---

## 📡 GÜNCELLEMELERI YAYINLAMA

### Yöntem 1: GitHub'dan Otomatik Deploy (ÖNERİLEN)

Her kod değişikliğinde **Cloudflare otomatik deploy eder!**

```bash
# Kod değişikliklerinizi yapın
# Sonra şu komutları çalıştırın:

git add .
git commit -m "Yeni özellikler eklendi"
git push

# ✅ Cloudflare otomatik olarak yeni sürümü yayınlar!
# 1-3 dakika içinde canlıda görünür.
```

### Yöntem 2: Cloudflare Dashboard'dan

1. **Cloudflare Pages** → **Deployments** → **Create deployment**
2. **Production branch** → **Retry deployment**

---

## 🎛️ ADMIN PANEL AYARLARI

### 1. Admin Panel'e Giriş

```
URL: https://SITE_URL.pages.dev/admin/login
```

1. **Email ile giriş yapın** (OTP kodu gelecek)
2. **Gelen 6 haneli kodu girin**
3. ✅ **Admin dashboard açılacak**

---

### 2. Telegram Bot Ayarları (ÖNEMLİ!)

**Admin Panel → Settings sayfasına gidin:**

#### **A. Bot Token Ayarlama**

```
Bot Token: 6123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

> **Nasıl Alınır?**
> - Telegram'da `@BotFather` açın
> - `/newbot` yazın
> - Bot ismini ve username'ini girin
> - Token'ı kopyalayın

#### **B. Kanal Kullanıcı Adı**

```
Kanal Kullanıcı Adı: karaeski_official
```

> **NOT:** `@` işareti OLMADAN yazın!

#### **C. Diğer Ayarlar**

```
Günlük Bonus: 100
Yeni Kullanıcı Bonusu: 1000
Referans Ödülü: 500
Minimum Çekim: 1000
```

**"Ayarları Kaydet" butonuna tıklayın!**

---

### 3. Telegram Kanalını Hazırlama

#### **A. Public Kanal Oluşturun**

1. Telegram'da **yeni kanal** oluşturun
2. **Public** yapın
3. **Username** verin: `karaeski_official`
4. **Açıklama ekleyin**

#### **B. Bot'u Kanal Admini Yapın**

1. Kanal ayarları → **Administrators**
2. Bot'u ekleyin (`@karaeski_bot`)
3. **"Can invite users"** iznini verin
4. ✅ **Kaydet**

---

## 🤖 TELEGRAM BOT KURULUMU

### 1. Telegram Bot Oluşturma

**@BotFather'da şu komutları çalıştırın:**

```
/newbot
Bot Name: Karaeski Casino Bot
Username: karaeski_bot

# Token'ı kopyalayın!
# Örnek: 6123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

---

### 2. Mini App Ekleme

**@BotFather'da:**

```
/newapp
Bot: @karaeski_bot
Title: Karaeski Casino
Description: Casino oyunları ve görevlerle coin kazan!
Web App URL: https://karaeski.pages.dev
Short name: karaeski
```

**Photo/GIF yükleyin** (opsiyonel)

---

### 3. Bot Komutlarını Ayarlama

**@BotFather'da:**

```
/setcommands
Bot: @karaeski_bot

# Şu komutları yapıştırın:
start - Uygulamayı başlat
play - Oyun oyna
balance - Bakiyeni gör
profile - Profilini gör
```

---

## 🌐 KANAL LINKİNİ NEREYE KOYACAĞIM?

### ✅ Admin Panel'den Ayarlama (ÖNERİLEN)

**Uygulama artık Admin Panel'den ayarlanıyor!**

1. **Admin Panel → Settings** sayfasına gidin
2. **"Telegram Bot Ayarları"** bölümünde:
   ```
   Kanal Kullanıcı Adı: karaeski_official
   ```
3. **"Ayarları Kaydet"** tıklayın
4. ✅ **Uygulama otomatik olarak bu kanalı kullanacak!**

> **NOT:** Artık kodu değiştirmeye gerek yok! Her şey database'den çekiliyor.

---

## 🎮 UYGULAMAYI BAŞLATMA

### 1. Telegram'da Bot'u Açma

```
t.me/karaeski_bot
```

- `/start` yazın
- **"Open Mini App"** tıklayın

---

### 2. Direkt Mini App Linki

```
https://t.me/karaeski_bot/karaeski
```

> Bu linki sosyal medyada paylaşabilirsiniz!

---

## 🔧 SORUN GİDERME

### ❌ "Uygulama Başlatılamıyor"

**ÇÖZÜM:**

1. **Admin Panel → Settings** kontrol edin:
   - ✅ Bot Token doğru mu?
   - ✅ Kanal username doğru mu?
2. **Bot'u kanal admini yaptınız mı?**
3. **Ayarları kaydettikten sonra sayfayı yenileyin**

---

### ❌ "Sponsor Görseli Yüklenmiyor"

**ÇÖZÜM:**

1. **Görsel boyutu:** Maksimum 5MB
2. **Görsel formatı:** JPG, PNG, WEBP
3. **Yükleme sırasında bekleyin** (spinner dönene kadar)
4. **İnternet bağlantınızı kontrol edin**

---

### ❌ "Kanal Kontrolü Başarısız"

**ÇÖZÜM:**

1. **Bot token Admin Panel'de doğru mu?**
2. **Bot kanal admini mi?**
3. **Kanal public mu?**
4. **Kanal username @ işareti olmadan mı?**

---

### ❌ "Demo Mode Gösteriyor"

**ÇÖZÜM:**

**Demo mod kaldırıldı!** Artık bot token olmadan çalışmaz.

1. **Admin Panel → Settings** → Bot Token girin
2. **"Ayarları Kaydet"** tıklayın
3. ✅ **Kanal kontrolü artık gerçek bot ile çalışacak**

---

## 📝 GÜNCELLEME AKIŞI ÖZETİ

```bash
# 1. Kod değişikliklerini yap
nano src/pages/HomePage.tsx

# 2. Git'e commit et
git add .
git commit -m "Homepage güncellendi"
git push

# 3. Cloudflare otomatik deploy eder (1-3 dk)
# 4. https://karaeski.pages.dev adresinden kontrol et
```

---

## 🎯 CHECKLIST

### İlk Kurulum

- [ ] Cloudflare Pages'e deploy ettim
- [ ] Site URL'ini aldım
- [ ] Telegram bot oluşturdum
- [ ] Mini App ekledim
- [ ] Kanal oluşturdum ve bot'u admin yaptım
- [ ] Admin Panel'den bot token ve kanal ayarlarını yaptım
- [ ] Test ettim ve çalışıyor! 🎉

### Her Güncelleme

- [ ] Kodu değiştirdim
- [ ] `git push` yaptım
- [ ] Cloudflare build'i izledim
- [ ] Canlı sitede test ettim

---

## 📞 DESTEK

**Sorun yaşarsanız:**

1. **Build loglarını kontrol edin** (Cloudflare → Deployments)
2. **Admin Panel → Settings** ayarlarını gözden geçirin
3. **Telegram bot ayarlarını doğrulayın**

---

## 🎉 BAŞARILI DEPLOYMENT SONRASI

✅ **Artık uygulamanız canlıda!**

**Paylaşın:**
```
https://t.me/karaeski_bot/karaeski
```

**Admin paneli:**
```
https://karaeski.pages.dev/admin/login
```

**Kullanıcıları davet edin ve coin kazanın!** 🚀

---

**Son Güncelleme:** 18.11.2025
**Versiyon:** 2.0 - Production Ready
