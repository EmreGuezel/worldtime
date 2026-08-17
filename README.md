# 🌍 Dünya Saatleri (World Clocks Dashboard)

Modern, performans odaklı ve interaktif bir dünya saatleri kontrol paneli. Kullanıcıların farklı zaman dilimlerindeki şehirleri arayıp ekleyebildiği, verilerin tarayıcı hafızasında saklandığı dinamik bir Next.js uygulamasıdır.

## 🚀 Özellikler

*   **Bulanık Arama (Fuzzy Search):** `fuse.js` entegrasyonu sayesinde yazım hatalarını tolere eden (ör: "Angara" -> "Ankara") akıllı arama motoru.
*   **Dinamik Analog Saatler:** Akrep, yelkovan ve saniye açılarının 360 derece üzerinden matematiksel olarak hesaplanıp SVG ile çizildiği pürüzsüz analog saatler.
*   **Kalıcı Hafıza (Local Storage):** Kullanıcının seçtiği saatlerin sayfayı yenilese dahi kaybolmaması.
*   **Klavye Erişilebilirliği:** Arama çubuğunda fareye ihtiyaç duymadan Enter tuşu ile otomatik şehir seçimi.
*   **Responsive Tasarım:** Tailwind CSS ile tüm cihaz ekranlarına tam uyum.

## 🛠️ Teknoloji Yığını (Tech Stack)

*   **Framework:** Next.js (App Router)
*   **Dil:** TypeScript
*   **Stil:** Tailwind CSS
*   **Arama Motoru:** Fuse.js
*   **Yayınlama (Deploy):** Vercel

## 🧠 Mimari ve Mühendislik Yaklaşımı

Bu projede sadece çalışan bir arayüz yapmak yerine, sektör standartlarında performans optimizasyonları ve mimari kararlar alınmıştır:

1.  **Single Source of Truth (Tek Doğru Kaynağı):** Ekranda onlarca saat olsa bile her biri için ayrı bir kronometre çalıştırılmaz. İşlemci (CPU) yükünü sıfıra indirmek ve tam senkronizasyon sağlamak adına tek bir global `setInterval` üzerinden tüm bileşenler beslenir. Saat kartları (ClockCard) veriyi sadece prop olarak alan "Dumb Component" yapısında kurgulanmıştır.
2.  **Hydration Uyuşmazlık Çözümü:** Next.js'in Sunucu Taraflı Oluşturma (SSR) yapısı ile tarayıcı hafızası (localStorage) arasındaki doğal uyuşmazlık sorunu, `useEffect` ve `isLoaded` state yönetimi ile profesyonelce çözülmüştür.

## 💻 Yerel Kurulum (Local Setup)

Projeyi kendi bilgisayarınızda test etmek isterseniz şu adımları izleyebilirsiniz:

```bash
# 1. Repoyu bilgisayarınıza indirin
git clone [https://github.com/KULLANICI_ADINIZ/dunya-saatleri.git](https://github.com/KULLANICI_ADINIZ/dunya-saatleri.git)

# 2. Proje klasörüne girin
cd dunya-saatleri

# 3. Gerekli kütüphaneleri (bağımlılıkları) yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
