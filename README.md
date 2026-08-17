# 🌍 World Time Dashboard

A vintage-styled, elegant world clock application built with modern web technologies. Designed with an antique wooden aesthetic, it allows users to search, add, and monitor multiple global time zones seamlessly with smooth analog clock mechanics.

## 🚀 Features

*   **Antique Wooden Aesthetic:** Custom-crafted vintage design featuring dark mahogany wood panels, parchment-textured clock faces, and classic iron hands.
*   **Fuzzy Search Engine:** Powered by `fuse.js` with typo tolerance (e.g., searching "Angara" automatically resolves to "Ankara"), including keyword and multi-language support.
*   **Smooth Analog Mechanics:** Real-time synchronized clock hands (hour, minute, and second) mathematically calculated and rendered using SVG.
*   **Persistent Dashboard:** User-selected time zones are safely stored in browser `localStorage`, ensuring preferences remain intact across page reloads.
*   **Keyboard Accessibility:** Instant selection of search results using the `Enter` key without requiring mouse interaction.
*   **Global Coverage:** Includes all 81 provinces of Turkey, European capitals/metropolitan areas, and major world capitals.

## 🛠️ Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Search Engine:** Fuse.js
*   **Deployment:** Vercel

---

# 🌍 Dünya Saatleri Paneli

Modern web teknolojileriyle geliştirilmiş, antika ahşap temalı zarif bir dünya saatleri uygulaması. Kullanıcıların pürüzsüz analog saat mekanizmalarıyla farklı zaman dilimlerini arayıp ekleyebileceği klasik bir koleksiyon aracıdır.

## 🚀 Özellikler

*   **Antika Ahşap Tasarım:** Maun ahşap paneller, parşömen dokulu kadranlar ve ferforje akrep/yelkovan detaylarıyla özel vintage konsepti.
*   **Bulanık Arama (Fuzzy Search):** Yazım hatalarını tolere eden `fuse.js` entegrasyonu (örn: "Angara" yazarak Ankara'ya ulaşma imkanı).
*   **Dinamik Analog Saatler:** 360 derece matematiksel açılarla hesaplanan, SVG tabanlı senkronize akrep, yelkovan ve saniye çubukları.
*   **Kalıcı Hafıza (Local Storage):** Seçilen saatlerin sayfayı yenilese dahi tarayıcıda saklanması.
*   **Klavye Erişilebilirliği:** Arama çubuğunda fareye gerek kalmadan `Enter` tuşuyla hızlı şehir seçimi.
*   **Kapsamlı Arşiv:** Türkiye'nin 81 ili, Avrupa'nın tüm büyük metropolleri ve dünya başkentleri.

## 💻 Local Setup

If you want to run this project locally, follow these steps:

```bash
# 1. Clone the repository
git clone [https://github.com/EmreGuezel/worldtime.git](https://github.com/EmreGuezel/worldtime.git)

# 2. Navigate to the project directory
cd worldtime

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
