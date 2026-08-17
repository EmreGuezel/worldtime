import { LocationData } from "../data/locations";

interface ClockCardProps {
  city: string;
  timezone: string;
  time: Date | null;
  onRemove: (city: string) => void; 
}

export default function ClockCard({ city, timezone, time, onRemove }: ClockCardProps) {
  
  if (!time) {
    return <div className="p-8 bg-[#2b1c13] rounded border-2 border-[#4a3020] w-72 h-96 animate-pulse"></div>;
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
    // Ahşap panel görünümü için gradient ve inset shadow
    <div className="relative group p-8 bg-gradient-to-br from-[#3e271a] to-[#1c110a] rounded shadow-[8px_8px_20px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,0,0,0.5)] border-2 border-[#5e3a24] flex flex-col items-center transition-all duration-300 min-w-[280px]">
      
      <button 
        onClick={() => onRemove(city)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-[#8a6a4b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#d4af37] font-sans"
        title="Kaldır"
      >
        ✕
      </button>

      {/* Şehir ismi - Pirinç levha hissiyatı */}
      <h2 className="text-xl font-serif text-[#d4af37] mb-6 tracking-widest uppercase font-medium drop-shadow-md">
        {city}
      </h2>
      
      {/* GERÇEKÇİ ANTİKA KADRAN */}
      <div className="relative w-52 h-52 mb-8 drop-shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 shadow-inner">
          
          {/* En dış kalın ahşap kasa */}
          <circle cx="50" cy="50" r="48" fill="#f4e8d3" stroke="#2d1a11" strokeWidth="6" />
          
          {/* İç kısımdaki ince altın/pirinç çerçeve */}
          <circle cx="50" cy="50" r="44" fill="transparent" stroke="#b89047" strokeWidth="0.75" />
          
          {/* Antika Saat Çizgileri (Koyu kahve/siyah) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line 
              key={i} 
              x1={i % 3 === 0 ? "85" : "90"} 
              y1="50" 
              x2="94" 
              y2="50" 
              transform={`rotate(${angle} 50 50)`} 
              stroke="#2d1a11" 
              strokeWidth={i % 3 === 0 ? "2.5" : "1"} 
              strokeLinecap="round"
            />
          ))}

          {/* Akrep (Koyu demir rengi, klasik yuvarlatılmış) */}
          <line x1="50" y1="50" x2="72" y2="50" transform={`rotate(${hourAngle} 50 50)`} stroke="#1a110b" strokeWidth="4" strokeLinecap="round" />
          
          {/* Yelkovan */}
          <line x1="50" y1="50" x2="88" y2="50" transform={`rotate(${minuteAngle} 50 50)`} stroke="#1a110b" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Saniye (Eski saatlerdeki gibi ince ve bakır/kızıl tonlarında) */}
          <line x1="38" y1="50" x2="90" y2="50" transform={`rotate(${secondAngle} 50 50)`} stroke="#8c2a1c" strokeWidth="1" />
          
          {/* Orta göbek pimi (Pirinç) */}
          <circle cx="50" cy="50" r="3.5" fill="#b89047" />
          {/* Orta pim siyah nokta */}
          <circle cx="50" cy="50" r="1.5" fill="#1a110b" />
        </svg>
      </div>
      
      {/* Dijital saat göstergesi (Eski daktilo/oyma fontu hissiyatı) */}
      <div className="text-sm font-sans tracking-widest text-[#8a6a4b] bg-[#1a0f0a] px-4 py-1.5 border border-[#3d261a] rounded shadow-inner">
        {time.toLocaleTimeString("tr-TR", { timeZone: timezone })}
      </div>
    </div>
  );
}