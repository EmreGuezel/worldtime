import { LocationData } from "../data/locations";

// YENİ: Çarpı tuşuna basıldığında üst bileşene haber verecek onRemove fonksiyonunu ekledik
interface ClockCardProps {
  city: string;
  timezone: string;
  time: Date | null;
  onRemove: (city: string) => void; 
}

export default function ClockCard({ city, timezone, time, onRemove }: ClockCardProps) {
  
  if (!time) {
    return <div className="p-6 bg-white rounded-2xl shadow-md w-72 h-80 animate-pulse"></div>;
  }

  // 1. ZAMAN AYRIŞTIRMA (Timezone'a göre Saat, Dakika, Saniyeyi parçalama)
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric", minute: "numeric", second: "numeric", hour12: false,
  });
  
  // Formatlı yazıyı parçalayıp rakamlara çeviriyoruz (Örn: "24:15:30")
  const parts = timeFormatter.formatToParts(time);
  let h = 0, m = 0, s = 0;
  parts.forEach(part => {
    if (part.type === "hour") h = parseInt(part.value);
    if (part.type === "minute") m = parseInt(part.value);
    if (part.type === "second") s = parseInt(part.value);
  });
  // Gece yarısı 24 dönerse onu 0'a eşitliyoruz
  if (h === 24) h = 0; 

  // 2. ANALOG SAAT MATEMATİĞİ (Açıları hesaplıyoruz)
  const secondAngle = s * 6;
  const minuteAngle = m * 6 + s * 0.1;
  const hourAngle = (h % 12) * 30 + m * 0.5;

  return (
    // relative ve group class'larını ekledik ki üzerine gelince çarpı butonu çıksın
    <div className="relative group p-6 bg-white rounded-2xl shadow-md border border-slate-200 w-72 flex flex-col items-center hover:shadow-xl transition-all duration-300">
      
      {/* ÇARPI BUTONU (Sadece farenin imleci kartın üzerindeyken görünür olur) */}
      <button 
        onClick={() => onRemove(city)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
        title="Kaldır"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold text-slate-800 mb-4">{city}</h2>
      
      {/* 3. ANALOG SAAT (SVG Çizimi) */}
      <div className="relative w-40 h-40 mb-6 drop-shadow-sm">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Saatin Yuvarlağı (Kadran) */}
          <circle cx="50" cy="50" r="48" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="4" />
          
          {/* Saatin 12, 3, 6, 9 Çizgileri */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line key={i} x1="90" y1="50" x2="96" y2="50" transform={`rotate(${angle} 50 50)`} stroke={i % 3 === 0 ? "#475569" : "#cbd5e1"} strokeWidth={i % 3 === 0 ? "3" : "1"} />
          ))}

          {/* Akrep (Hour Hand) */}
          <line x1="50" y1="50" x2="75" y2="50" transform={`rotate(${hourAngle} 50 50)`} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          
          {/* Yelkovan (Minute Hand) */}
          <line x1="50" y1="50" x2="85" y2="50" transform={`rotate(${minuteAngle} 50 50)`} stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          
          {/* Saniye (Second Hand) */}
          <line x1="50" y1="50" x2="90" y2="50" transform={`rotate(${secondAngle} 50 50)`} stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          
          {/* Saatin tam ortasındaki kırmızı nokta */}
          <circle cx="50" cy="50" r="3" fill="#ef4444" />
        </svg>
      </div>
      
      {/* Dijital Saati de altta daha küçük ve şık şekilde bırakalım */}
      <div className="text-2xl font-mono text-slate-600 font-semibold bg-slate-100 px-4 py-1 rounded-lg">
        {time.toLocaleTimeString("tr-TR", { timeZone: timezone })}
      </div>
    </div>
  );
}