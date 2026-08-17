import { LocationData } from "../data/locations";

interface ClockCardProps {
  city: string;
  timezone: string;
  time: Date | null;
  onRemove: (city: string) => void; 
}

export default function ClockCard({ city, timezone, time, onRemove }: ClockCardProps) {
  
  if (!time) {
    return <div className="p-8 bg-zinc-900/50 rounded-full border border-zinc-800 w-72 h-96 animate-pulse"></div>;
  }

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric", minute: "numeric", second: "numeric", hour12: false,
  });
  
  const parts = timeFormatter.formatToParts(time);
  let h = 0, m = 0, s = 0;
  parts.forEach(part => {
    if (part.type === "hour") h = parseInt(part.value);
    if (part.type === "minute") m = parseInt(part.value);
    if (part.type === "second") s = parseInt(part.value);
  });
  if (h === 24) h = 0; 

  const secondAngle = s * 6;
  const minuteAngle = m * 6 + s * 0.1;
  const hourAngle = (h % 12) * 30 + m * 0.5;

  return (
    <div className="relative group p-8 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded shadow-2xl border border-zinc-800 flex flex-col items-center hover:border-amber-700/50 transition-all duration-500 min-w-[280px]">
      
      <button 
        onClick={() => onRemove(city)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-zinc-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-amber-500 font-sans"
        title="Kaldır"
      >
        ✕
      </button>

      {/* Şehir ismini klasik lüks saat kadranlarındaki logolar gibi şekillendirdik */}
      <h2 className="text-xl font-serif text-amber-500 mb-6 tracking-[0.2em] uppercase font-medium">
        {city}
      </h2>
      
      {/* KLASİK ANALOG KADRAN */}
      <div className="relative w-48 h-48 mb-8 drop-shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          
          {/* Saatin Kasası ve Siyah Kadranı */}
          <circle cx="50" cy="50" r="48" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
          {/* İç Altın Çerçeve */}
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#b45309" strokeWidth="0.5" opacity="0.5" />
          
          {/* Klasik Saat Çizgileri (Sadece 12, 3, 6, 9 daha kalın ve uzun) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line 
              key={i} 
              x1={i % 3 === 0 ? "88" : "92"} 
              y1="50" 
              x2="95" 
              y2="50" 
              transform={`rotate(${angle} 50 50)`} 
              stroke={i % 3 === 0 ? "#d97706" : "#71717a"} 
              strokeWidth={i % 3 === 0 ? "2" : "1"} 
            />
          ))}

          {/* Akrep (Hour Hand) - Daha kalın ve zarif */}
          <line x1="50" y1="50" x2="72" y2="50" transform={`rotate(${hourAngle} 50 50)`} stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          
          {/* Yelkovan (Minute Hand) */}
          <line x1="50" y1="50" x2="86" y2="50" transform={`rotate(${minuteAngle} 50 50)`} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          
          {/* Saniye (Second Hand) - Zarif kırmızı detay */}
          <line x1="45" y1="50" x2="90" y2="50" transform={`rotate(${secondAngle} 50 50)`} stroke="#991b1b" strokeWidth="1" />
          
          {/* Göbek Noktası (Altın) */}
          <circle cx="50" cy="50" r="2.5" fill="#fbbf24" />
          {/* Göbek Noktası İç (Siyah) */}
          <circle cx="50" cy="50" r="1" fill="#09090b" />
        </svg>
      </div>
      
      {/* Alt kısımdaki dijital saat çok daha ince ve zarif */}
      <div className="text-sm font-sans tracking-widest text-zinc-500 border border-zinc-800/50 px-4 py-1 rounded">
        {time.toLocaleTimeString("tr-TR", { timeZone: timezone })}
      </div>
    </div>
  );
}