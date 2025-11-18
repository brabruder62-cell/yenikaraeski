# 📢 Telegram Kanal ve Bot Kurulum Rehberi

## 🎯 KANAL LİNKİNİZİ NEREYE KOYACAKSINIZ?

### ✅ **YENİ SİSTEM: Admin Panel'den Ayarlama (ÖNERİLEN)**

**Artık kodu düzenlemeye gerek yok!** Tüm ayarlar Admin Panel'den yapılıyor.

---

## 📋 ADIM ADIM KURULUM

### 1️⃣ Telegram Kanalı Oluşturma

#### **A. Yeni Kanal Oluştur**

1. Telegram'da **"New Channel"** tıklayın
2. **İsim:** `Karaeski Casino Official`
3. **Açıklama:**
   ```
   🎰 Karaeski Casino resmi kanalı
   🎮 Oyunlar, promosyonlar ve duyurular için takipte kalın!
   ```

#### **B. Public Kanal Yapın**

1. Kanal ayarları → **Channel Type**
2. **Public** seçin
3. **Username:** `karaeski_official` (veya benzersiz bir isim)
4. ✅ **Kaydet**

> **ÖNEMLİ:** Kanal **mutlaka PUBLIC** olmalı!

---

### 2️⃣ Telegram Bot Oluşturma

#### **A. @BotFather'da Bot Oluştur**

```
# Telegram'da @BotFather açın:
/newbot

# Bot bilgilerini girin:
Bot Name: Karaeski Casino Bot
Username: karaeski_bot
```

#### **B. Token'ı Kopyalayın**

```
✅ Bot oluşturuldu!
Token: 6123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

> **BU TOKEN'I KOPYALAYIN!** Admin Panel'e gireceksiniz.

---

### 3️⃣ Mini App Ekleme

#### **@BotFather'da:**

```
/newapp

# Bot'u seçin:
Bot: @karaeski_bot

# Mini App bilgilerini girin:
Title: Karaeski Casino
Description: Casino oyunları ve görevlerle coin kazan!
Photo: [Bir görsel yükleyin]
Demo GIF: [Opsiyonel]
Web App URL: https://SITE_URL.pages.dev
Short name: karaeski
```

> **SITE_URL:** Cloudflare Pages URL'inizi girin!
> Örnek: `https://karaeski.pages.dev`

---

### 4️⃣ Bot'u Kanal Admini Yapma

#### **A. Kanal Ayarlarına Gidin**

1. Kanalınızı açın (`@karaeski_official`)
2. Kanal adına tıklayın → **Administrators**
3. **"Add Administrator"** tıklayın

#### **B. Bot'u Ekleyin**

1. **Bot username'ini arayın:** `@karaeski_bot`
2. **İzinleri verin:**
   - ✅ **Change Info** (Bilgileri değiştir)
   - ✅ **Delete Messages** (Mesaj silme)
   - ✅ **Invite Users via Link** (Link ile davet)
   - ❌ **Post Messages** (Gerek yok)
3. ✅ **Kaydet**

> **ÖNEMLİ:** Bot'un "Invite Users" yetkisi olmalı!

---

## ⚙️ ADMIN PANEL AYARLARI

### 5️⃣ Admin Panel'den Yapılandırma

#### **A. Admin Panel'e Giriş**

```
URL: https://SITE_URL.pages.dev/admin/login
```

1. **Email adresinizi girin**
2. **OTP kodu gelecek** (6 haneli)
3. ✅ **Admin dashboard açılacak**

---

#### **B. Settings Sayfası**

**Admin Panel → Settings → Telegram Bot Ayarları**

```
┌─────────────────────────────────────┐
│ Bot Token:                          │
│ [6123456789:AAHdqTcvCH1vGWJ...]    │
│ @BotFather'dan alınan bot token    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Kanal Kullanıcı Adı:                │
│ [karaeski_official]                 │
│ @ işareti OLMADAN!                  │
└─────────────────────────────────────┘
```

**"Ayarları Kaydet" tıklayın!**

---

## 🔍 NASIL ÇALIŞIR?

### Uygulama Başladığında

1. **Kullanıcı uygulamayı açar**
2. **Karaeski maskotu ile hoşgeldin ekranı** gösterilir
3. **"Kanala Katıl" butonu** → `https://t.me/karaeski_official` açar
4. **Kullanıcı kanala katılır**
5. **"Kontrol Et" butonu** → Bot API'si ile kontrol edilir
6. ✅ **Katılım onaylanırsa uygulama açılır!**

---

## 📱 TEST ETME

### 1. Telegram Bot Linkini Açın

```
https://t.me/karaeski_bot
```

- **"START"** tıklayın
- **"Open Mini App"** butonu görünmeli

---

### 2. Direkt Mini App Linki

```
https://t.me/karaeski_bot/karaeski
```

> Bu linki paylaşabilirsiniz!

---

### 3. Test Senaryosu

#### **A. İlk Açılış**

1. Mini App açılır
2. ✅ **Hoşgeldin ekranı görünür** (maskot, animasyonlar)
3. ✅ **"Kanala Katıl" butonu** çalışır

#### **B. Kanal Kontrolü**

1. **"Kanala Katıl"** tıklayın → Telegram kanalı açılır
2. **Kanala katılın**
3. **Mini App'e dönün**
4. **"Kontrol Et"** tıklayın
5. ✅ **Konfeti animasyonu** oynar
6. ✅ **"Uygulamayı Başla"** butonu aktif olur

#### **C. Uygulama Girişi**

1. **"Uygulamayı Başla"** tıklayın
2. ✅ **Email giriş ekranı** açılır
3. ✅ **OTP kodu gönderilir**
4. ✅ **Ana sayfa yüklenir!**

---

## ❌ SORUN GİDERME

### "Kanal Kontrolü Başarısız"

**SORUN:** Bot token veya kanal ayarları yanlış.

**ÇÖZÜM:**

1. ✅ **Admin Panel → Settings** kontrol edin
2. ✅ **Bot token doğru mu?**
3. ✅ **Kanal username @ işareti olmadan mı?**
4. ✅ **Bot kanal admini mi?**
5. ✅ **Kanal PUBLIC mi?**

---

### "Uygulama Başlatılamıyor"

**SORUN:** Bot token veya Web App URL hatalı.

**ÇÖZÜM:**

1. **@BotFather'da `/myapps` yazın**
2. **Bot'unuzu seçin → Edit Web App**
3. **Web App URL doğru mu?**
   ```
   https://karaeski.pages.dev
   ```
4. **Token'ı yenileyin:**
   ```
   /token
   Bot: @karaeski_bot
   Are you sure? Yes
   ```

---

### Bot Token Nasıl Yenilenir?

```
# @BotFather'da:
/token
Bot: @karaeski_bot
Are you sure? Yes

# Yeni token gelecek, Admin Panel'de güncelleyin!
```

---

## 🎨 KANAL GÖRSELLERİ

### Logo/Avatar

- **Boyut:** 512x512 px
- **Format:** PNG
- **Arka plan:** Yeşil gradient (tema ile uyumlu)

### Banner (Opsiyonel)

- **Boyut:** 1280x640 px
- **Format:** PNG/JPG
- **İçerik:** Karaeski logo + "Casino & Betting Platform"

---

## 📋 CHECKLIST

### Telegram Kanalı

- [ ] Public kanal oluşturdum
- [ ] Username verdim (`@karaeski_official`)
- [ ] Açıklama ekledim
- [ ] Logo yükledim

### Telegram Bot

- [ ] @BotFather'da bot oluşturdum
- [ ] Token kopyaladım
- [ ] Mini App ekledim (Web App URL ile)
- [ ] Bot komutlarını ayarladım

### Bot Admini

- [ ] Bot'u kanal admini yaptım
- [ ] "Invite Users" yetkisi verdim
- [ ] Test ettim (bot kanal üyelerini görebiliyor mu?)

### Admin Panel

- [ ] Admin Panel'e giriş yaptım
- [ ] Settings → Bot Token girdim
- [ ] Settings → Kanal username girdim
- [ ] Ayarları kaydettim

### Test

- [ ] Mini App linkini açtım (`t.me/karaeski_bot/karaeski`)
- [ ] Hoşgeldin ekranı göründü
- [ ] "Kanala Katıl" çalışıyor
- [ ] "Kontrol Et" doğru çalışıyor
- [ ] Uygulama açıldı! 🎉

---

## 🚀 PAYLAŞIM LİNKLERİ

### Kullanıcılar İçin

```
🎰 Karaeski Casino'ya katıl!

Casino oyunları oyna, görevleri tamamla ve ödüller kazan! 🎁

👉 Hemen başla: https://t.me/karaeski_bot/karaeski

📢 Resmi kanal: https://t.me/karaeski_official
```

---

## 💡 İPUÇLARI

### 1. Kanal İçeriği

**Düzenli içerik paylaşın:**
- ✅ Yeni oyun duyuruları
- ✅ Haftalık promosyonlar
- ✅ En yüksek kazançlar
- ✅ Yeni özellikler

### 2. Bot Komutları

**@BotFather'da ayarlayın:**
```
/setcommands

start - Uygulamayı başlat
play - Oyun oyna
balance - Bakiyeni gör
profile - Profilini gör
help - Yardım al
```

### 3. Hoşgeldin Mesajı

**@BotFather'da:**
```
/setdescription

🎰 Karaeski Casino'ya hoş geldin!

🎮 Oyunlar, görevler ve ödüllerle dolu!
💰 İlk kayıtta 1000 coin hediye!

Mini App'i aç ve oyunlara başla! 🚀
```

---

## 📞 DESTEK

**Sorun yaşarsanız kontrol edin:**

1. ✅ **Bot token Admin Panel'de doğru mu?**
2. ✅ **Kanal username @ olmadan mı?**
3. ✅ **Bot kanal admini mi?**
4. ✅ **Kanal PUBLIC mi?**
5. ✅ **Web App URL doğru mu?**

---

**Başarılar! 🎉**

**Son Güncelleme:** 18.11.2025
**Versiyon:** 2.0 - Production Ready
