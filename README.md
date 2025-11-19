# 🎰 Karaeski App - Premium Casino & Betting Platform

**Telegram Mini App** olarak çalışan tam özellikli casino/bahis platformu.

---

## ✨ ÖZELLİKLER

### 🎮 Kullanıcı Tarafı
- ✅ Telegram Web App SDK entegrasyonu (haptic feedback, user data)
- ✅ Animasyonlu welcome ekranı + kanal üyelik kontrolü
- ✅ Email OTP authentication sistemi
- ✅ Referans sistemi (KAR+6 rakam, her iki tarafa +500 coin)
- ✅ Coin & ödül sistemi (günlük bonus, görev ödülleri)
- ✅ **Oynanabilir Casino Oyunları:**
  - Limbo (Multiplier tahmin)
  - Dice (Sayı tahmini, over/under)
  - Mines (Mayın tarlası tarzı risk oyunu)
- ✅ Mağaza sayfası (coin ile ürün satın alma)
- ✅ Sponsor vitrin (dinamik database)
- ✅ Görev sistemi (kanıt URL yükleme, admin onay)
- ✅ Kullanıcı profili (Telegram data, istatistikler)

### 👨‍💼 Admin Paneli
- ✅ Email OTP + database admin kontrolü
- ✅ Dashboard (istatistikler, grafikler)
- ✅ Kullanıcı yönetimi (coin ekleme, admin yapma)
- ✅ Bildirim yayınlama sistemi
- ✅ Görev oluşturma & onaylama
- ✅ Oyun ayarları yapılandırma
- ✅ Mağaza ürün yönetimi
- ✅ Sponsor CRUD işlemleri
- ✅ **Bot yapılandırma sayfası** (token, kanal username)

---

## 🚀 DEPLOYMENT REHBERİ

### **1. Projeyi GitHub'a Yükleme**

**Yöntem A: Web Interface (Kolay)**

1. **github.com** → New repository
2. Repository adı: `karaeski-app`
3. **"uploading an existing file"** linkine tıkla
4. Bu ZIP'ten çıkan **TÜM DOSYALARI** sürükle
5. Commit message: `Initial commit - Production ready`
6. **Commit changes**

**Yöntem B: Command Line**

```bash
cd karaeski-app
git init
git add .
git commit -m "Initial commit - Production ready"
git remote add origin https://github.com/USERNAME/karaeski-app.git
git branch -M main
git push -u origin main
```

---

### **2. Cloudflare Pages'e Deploy**

1. **dash.cloudflare.com** → Workers & Pages
2. **"Create application"** → **"Pages"** → **"Connect to Git"**
3. **Repository seç:** `karaeski-app`
4. **Build settings:**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```
5. **"Save and Deploy"**
6. **3-5 dakika** bekle → Link hazır: `https://karaeski-app.pages.dev`

---

### **3. İlk Admin Kullanıcısı Oluşturma**

1. **Telegram Mini App'i aç** (kullanıcı tarafı)
2. **Kanala katıl** (geçici, kurulum için)
3. **Telegram ile kayıt ol**
4. **Devv Dashboard'a git:**
   - `https://app.devv.ai` → Projects
   - Projeyi seç → **Database** → **users** tablosu
5. **Kendini bul** (Telegram ID/username ile)
6. **`is_admin` sütununu `1` yap** → Save

---

### **4. Bot Yapılandırması (KRİTİK!) 🔴**

**Detaylı rehber:** `.devv/BOT_SETUP_GUIDE.md`

#### **Hızlı Adımlar:**

1. **@BotFather'da bot oluştur** → Token kaydet
2. **Telegram kanalını hazırla** → Username kaydet (@ olmadan)
3. **BOTUNU KANALA ADMİN OLARAK EKLE** → "Üye Ekleyebilir" yetkisi ver
4. **Admin Panel'e giriş yap:** `https://your-app.pages.dev/admin/login`
5. **Settings sayfasına git**
6. **"Varsayılan Ayarları Yükle"** butonu (ilk kurulum)
7. **Bot Token'ı gir:**
   - Bot Token: `6123456789:AAH...`
   - ⚠️ **Kanal sabit:** `eserkaraeskichat` (değiştirilemez)
8. **"Ayarları Kaydet"**
9. **Ana sayfadan test et:**
   - "Katıl" butonu → Doğru kanal açılmalı
   - "Kontrol Et" → ✅ Doğrulandı mesajı

---

## 📊 DATABASE TABLOLARI

**8 Tablo** (Devv Backend SDK):

| Tablo                | ID              | Açıklama                              |
|----------------------|-----------------|---------------------------------------|
| users                | f41liqhtnp4w    | Kullanıcı verileri (is_admin flag)    |
| sponsors             | f41liqhw5rsw    | Sponsor vitrin [PUBLIC READ]          |
| store_items          | f41liqhtnvgg    | Mağaza ürünleri [PUBLIC READ]         |
| tasks                | f41liqhw5lhd    | Görev tanımları [PUBLIC READ]         |
| task_completions     | f41liqs5qqyo    | Görev tamamlanma kayıtları            |
| notifications        | f41liqhjo3r4    | Bildirim geçmişi                      |
| game_settings        | f41liqhw5lhc    | Oyun ayarları [PUBLIC READ]           |
| app_settings         | f41liquxmigw    | Uygulama config [PUBLIC READ]         |

---

## ⚙️ TEKNOLOJİ STACK

### **Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- React Router (routing)
- Lucide Icons

### **Backend (SDK):**
- Devv Auth (Email OTP)
- Devv Table (NoSQL database)
- Devv File Upload (resim yükleme)

### **Telegram:**
- Telegram Web App SDK
- Bot API (membership verification)

---

## 🔐 GÜVENLİK

### **Admin Koruma:**
- ✅ Email OTP authentication
- ✅ Database'de `is_admin = 1` kontrolü
- ✅ Her istekte yetki doğrulama
- ✅ Session persistence (Zustand)

### **Bot Token:**
- ⚠️ **Hardcoded token YOK**
- ✅ Sadece database'de saklanıyor
- ✅ Admin Panel'den yapılandırılıyor
- ⚠️ **GitHub'a yüklemeyin!**

### **Kanal Kontrolü:**
- ✅ Telegram Bot API ile gerçek doğrulama
- ✅ localStorage + server-side check
- ⚠️ Bot mutlaka kanala admin olmalı
- 🔒 **Kanal sabit kodlanmış:** `https://t.me/eserkaraeskichat`

---

## 📁 DOSYA YAPISI

```
/src
├── assets/              # Statik kaynaklar
├── components/
│   ├── ui/             # shadcn/ui (pre-installed)
│   ├── AdminSidebar.tsx
│   ├── AdminLayout.tsx
│   └── BottomNav.tsx
├── hooks/              # Custom hooks
├── lib/                # Utils (cn function, etc.)
├── pages/
│   ├── WelcomePage.tsx        # Kanal gate (eserkaraeskichat) + animasyon
│   ├── HomePage.tsx           # Ana sayfa
│   ├── GamesPage.tsx          # Oyun listesi
│   ├── TasksPage.tsx          # Görevler
│   ├── ProfilePage.tsx        # Profil
│   ├── games/                 # Oynanabilir oyunlar
│   │   ├── LimboGame.tsx
│   │   ├── DiceGame.tsx
│   │   └── MinesGame.tsx
│   └── admin/                 # Admin panel
│       ├── AdminLoginPage.tsx # PRODUCTION AUTH
│       ├── DashboardPage.tsx
│       ├── UsersPage.tsx
│       ├── NotificationsPage.tsx
│       ├── TasksPage.tsx
│       ├── TaskApprovalsPage.tsx
│       ├── GameSettingsPage.tsx
│       ├── StorePage.tsx
│       ├── SponsorsPage.tsx
│       └── SettingsPage.tsx   # Bot yapılandırma
├── store/
│   ├── auth-store.ts          # User auth state
│   └── admin-store.ts         # Admin session
├── App.tsx                    # Router config
├── main.tsx                   # Entry point
└── index.css                  # Design system

/.devv
├── STRUCTURE.md                    # Proje mimarisi
├── DEPLOYMENT_GUIDE.md             # Deploy rehberi
├── CHANNEL_SETUP.md                # Kanal kurulumu
├── UPDATE_GUIDE.md                 # Güncelleme rehberi
├── ADMIN_SETUP.md                  # Admin kurulumu
├── BOT_SETUP_GUIDE.md              # Bot yapılandırma
├── ADMIN_SEPARATE_DEPLOYMENT.md    # 🆕 Admin ayrı domain deploy
└── QUICK_SUMMARY.md                # 🆕 Hızlı özet + son değişiklikler

/public
└── _redirects                 # Cloudflare SPA routing
```

---

## ❓ SORUN GİDERME

### ❌ "Chat not found" hatası

**Çözüm:**
1. Bot kanala **admin olarak** eklenmiş mi?
2. Bot'a **"Üye Ekleyebilir"** yetkisi verilmiş mi?
3. Kanal username doğru mu? (@ olmadan)

→ Detay: `.devv/BOT_SETUP_GUIDE.md`

---

### ❌ Admin paneline giriş yapamıyorum

**Çözüm:**
1. Devv Dashboard → Database → users tablosunu aç
2. Kullanıcınızı bul
3. `is_admin` → `1` yap
4. Tekrar giriş yap

---

### ❌ "Kanala Katıl" butonu çalışmıyor

**Çözüm:**
1. Admin Panel → Settings
2. Bot Token girilmiş mi? (Kanal sabit: eserkaraeskichat)
3. Ayarları kaydet
4. Ana sayfayı yenile

---

## 📞 DESTEK

**Dokümantasyon:**
- `.devv/BOT_SETUP_GUIDE.md` - Bot yapılandırma
- `.devv/ADMIN_SETUP.md` - Admin kurulumu
- `.devv/DEPLOYMENT_GUIDE.md` - Deploy rehberi

**Sorun mu yaşıyorsunuz?**
1. Console loglarını kontrol edin
2. Database'de ayarları kontrol edin
3. Bot yetkilerini kontrol edin

---

## 📋 KURULUM KONTROL LİSTESİ

```
✅ 1. GitHub'a upload edildi
✅ 2. Cloudflare Pages'e deploy edildi
✅ 3. İlk admin kullanıcısı oluşturuldu (is_admin = 1)
✅ 4. @BotFather'da bot oluşturuldu
✅ 5. Bot kanala admin olarak eklendi
✅ 6. Bot'a "Üye Ekleyebilir" yetkisi verildi
✅ 7. Admin Panel → Settings → Bot ayarları yapıldı
✅ 8. Ayarlar kaydedildi
✅ 9. Ana sayfadan "Katıl" butonu test edildi
✅ 10. "Kontrol Et" butonu çalışıyor ✅
```

---

## 🎉 PRODUCTION READY!

**Tüm özellikler aktif:**
- ✅ Gerçek auth sistemi
- ✅ Database bağlantıları
- ✅ Telegram bot entegrasyonu
- ✅ Admin panel
- ✅ Oynanabilir oyunlar
- ✅ Görev ve mağaza sistemi

**Demo/test modu YOK!**
- ❌ Hardcoded credentials kaldırıldı
- ✅ Tüm ayarlar Admin Panel'den yapılıyor

---

**İyi eğlenceler! 🎰**
