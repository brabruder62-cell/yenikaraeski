# Telegram Channel Gate Kurulum Rehberi

## 🔧 Yapılandırma Gereksinimleri

Karaeski App'te kanal üyeliği kontrolü aktif hale getirmek için aşağıdaki adımları takip edin.

---

## 1️⃣ Telegram Bot Oluşturma

### Adım 1: BotFather ile Bot Oluşturun
1. Telegram'da [@BotFather](https://t.me/BotFather) açın
2. `/newbot` komutunu gönderin
3. Bot için bir isim girin (örn: "Karaeski Verification Bot")
4. Bot için bir username girin (örn: "karaeski_verify_bot")
5. BotFather size bir **Bot Token** verecek. Bunu kaydedin:
   ```
   Örnek: 5234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
   ```

### Adım 2: Bot'u Kanalınıza Admin Olarak Ekleyin
1. Telegram kanalınızı açın
2. Kanal Ayarları → Yöneticiler → Yönetici Ekle
3. Oluşturduğunuz botu arayın ve ekleyin
4. Bot'a sadece **"Üye ekleyebilir"** yetkisi verin (diğer yetkiler gerekli değil)

---

## 2️⃣ Kod Yapılandırması

### Dosya: `src/pages/WelcomePage.tsx`

Aşağıdaki satırları güncelleyin:

```typescript
// TELEGRAM CHANNEL CONFIG - Update these values
const TELEGRAM_CHANNEL_USERNAME = "karaeski_official"; // Kanal kullanıcı adınızı girin (@ olmadan)
const TELEGRAM_CHANNEL_URL = `https://t.me/${TELEGRAM_CHANNEL_USERNAME}`;
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"; // Bot token'ınızı buraya yapıştırın
```

**Örnek:**
```typescript
const TELEGRAM_CHANNEL_USERNAME = "karaeski_official";
const TELEGRAM_BOT_TOKEN = "5234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890";
```

---

## 3️⃣ Nasıl Çalışır?

### Kullanıcı Akışı:
1. **Hoş Geldiniz Ekranı** - Kullanıcı uygulamayı ilk açtığında animasyonlu karşılama ekranı görünür
2. **Katıl Butonu** - Telegram kanalına yönlendirme
3. **Kontrol Et Butonu** - Bot API ile üyelik kontrolü yapılır
4. **Doğrulama** - Üyelik doğrulanırsa:
   - ✅ Confetti animasyonu
   - ✅ Email OTP ile giriş ekranı
   - ✅ Otomatik kullanıcı oluşturma
   - ✅ Referral kodu üretimi (örn: `KAR123456`)
   - ✅ Başlangıç bonusu: 1000 coin
5. **Korumalı Erişim** - Tüm sayfalara erişim için kanal üyeliği gereklidir

### Referral Sistemi:
- Her kullanıcıya otomatik kod: `KAR{telegram_id_son_6_hane}`
- Referral ile kayıt: **+500 coin** (hem referrer hem referee)
- Profil sayfasından kod paylaşımı ve takibi

### API Kontrolü:
```javascript
// Telegram Bot API üzerinden üyelik kontrolü
fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=@${CHANNEL_USERNAME}&user_id=${USER_ID}`)
```

**Üyelik Durumları:**
- ✅ `creator` - Kanal sahibi
- ✅ `administrator` - Yönetici  
- ✅ `member` - Üye
- ❌ `left` - Ayrılmış
- ❌ `kicked` - Yasaklanmış

---

## 4️⃣ Demo Mode

Bot token yapılandırılmamışsa (`YOUR_BOT_TOKEN`), uygulama **demo mode**'da çalışır:
- "Kontrol Et" butonuna basıldıktan 1.5 saniye sonra otomatik olarak onaylanır
- Gerçek üyelik kontrolü yapılmaz
- Test amaçlı kullanılabilir

---

## 5️⃣ Test Etme

### Manuel Test:
1. Uygulamayı açın - Welcome ekranını görmelisiniz
2. "Katıl" butonuna basın - Telegram kanalı açılmalı
3. Kanala katılın
4. Uygulamaya geri dönün
5. "Kontrol Et" butonuna basın
6. ✅ Başarılı olursa confetti animasyonu ve ana sayfaya yönlendirme

### localStorage Temizleme:
Test sırasında welcome ekranını tekrar görmek için:
```javascript
localStorage.removeItem('channel_joined');
localStorage.removeItem('auth-storage');
```
Tarayıcı console'unda çalıştırın ve sayfayı yenileyin.

---

## 6️⃣ Güvenlik Notları

⚠️ **Önemli:**
- Bot token'ınızı asla paylaşmayın
- Bot'a minimum yetki verin (sadece üye kontrolü için)
- API çağrıları client-side'da yapılır (production'da backend'e taşınabilir)
- Rate limiting için Telegram Bot API limitlerine dikkat edin (30 request/second)

---

## 7️⃣ Sorun Giderme

### Problem: "API hatası" mesajı
- Bot token'ın doğru olduğunu kontrol edin
- Bot'un kanala admin olarak eklendiğini doğrulayın
- Kanal username'inin @ olmadan girildiğini kontrol edin

### Problem: "Henüz katılmadınız" mesajı
- Gerçekten kanala katıldığınızdan emin olun
- Birkaç saniye bekleyip tekrar deneyin
- Telegram'dan çıkış yapıp tekrar giriş yapın

### Problem: Welcome ekranı görünmüyor
- localStorage'ı temizleyin
- Tarayıcı cache'ini temizleyin
- `auth-storage` değerini kontrol edin

---

## 📝 Ek Notlar

- Kanal üyeliği kontrolü localStorage'da saklanır
- Kullanıcı bir kez doğrulandıktan sonra tekrar kontrol gerekmez
- Admin paneli için kanal kontrolü yapılmaz
- Haptic feedback Telegram Mini App'te çalışır

---

**Destek:** Bu dosyayı referans olarak kullanarak kurulumu tamamlayın. Sorun yaşarsanız Telegram Bot API documentation'ını inceleyin: https://core.telegram.org/bots/api
