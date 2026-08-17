"use client";

import { useState, useEffect } from "react";
import ClockCard from "../components/ClockCard";
import SearchBar from "../components/SearchBar";
import { LocationData } from "../data/locations";

export default function Home() {
  const [globalTime, setGlobalTime] = useState<Date | null>(null);
  
  // Başlangıçta boş bir liste veriyoruz, çünkü önce hafızayı kontrol etmemiz gerekiyor
  const [clocks, setClocks] = useState<LocationData[]>([]);
  // Uygulamanın hafızayı okuyup okumadığını takip eden yeni bir state (Hydration çözümü)
  const [isLoaded, setIsLoaded] = useState(false); 

  // 1. ZAMAN DÖNGÜSÜ (Burası aynı kaldı)
  useEffect(() => {
    setGlobalTime(new Date()); 
    const timer = setInterval(() => {
      setGlobalTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. HAFIZADAN OKUMA (Sayfa ilk açıldığında sadece 1 kere çalışır)
  useEffect(() => {
    // Tarayıcının hafızasından "saved-clocks" isimli kasayı bulmaya çalışıyoruz
    const savedClocks = localStorage.getItem("saved-clocks");
    
    if (savedClocks) {
      // Hafızadaki veriler düz metin (String) olduğu için JSON.parse ile tekrar React'in anlayacağı listeye çeviriyoruz
      setClocks(JSON.parse(savedClocks));
    } else {
      // Eğer kasa boşsa (kullanıcı ilk kez giriyorsa) varsayılan saatleri veriyoruz
      setClocks([
        { city: "İstanbul", timezone: "Europe/Istanbul", keywords: [] },
        { city: "Londra", timezone: "Europe/London", keywords: [] }
      ]);
    }
    setIsLoaded(true); // "Hafızayı okudum, artık saatleri gösterebilirsin" diyoruz
  }, []);

  // 3. HAFIZAYA YAZMA (Saat listesi her değiştiğinde çalışır)
  useEffect(() => {
    // Yanlışlıkla başlangıçtaki boş listeyi kaydetmemek için önce isLoaded kontrolü yapıyoruz
    if (isLoaded) {
      // Listemizi JSON.stringify ile metne çevirip "saved-clocks" kasasına kilitliyoruz
      localStorage.setItem("saved-clocks", JSON.stringify(clocks));
    }
  }, [clocks, isLoaded]); // Bu effect, "clocks" veya "isLoaded" değiştiğinde tetiklenir

  const handleAddClock = (newLocation: LocationData) => {
    const isAlreadyAdded = clocks.some((clock) => clock.city === newLocation.city);
    if (!isAlreadyAdded) {
      setClocks([...clocks, newLocation]);
    } else {
      alert(`${newLocation.city} zaten ekli!`);
    }
  };

  const handleRemoveClock = (cityToRemove: string) => {
    const filteredClocks = clocks.filter((clock) => clock.city !== cityToRemove);
    setClocks(filteredClocks);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-2">
          Dünya Saatleri
        </h1>
        <p className="text-center text-slate-500 mb-10">
          Zaman dilimlerini arayın ve panonuza ekleyin
        </p>
        
        <SearchBar onAdd={handleAddClock} />

        {/* Veriler yüklenmeden önce boşluk yerine kısa bir mesaj gösteriyoruz */}
        {!isLoaded ? (
          <div className="flex justify-center text-slate-400 font-medium">
            Saatleriniz yükleniyor...
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {clocks.map((clock, index) => (
              <ClockCard 
                key={index} 
                city={clock.city} 
                timezone={clock.timezone} 
                time={globalTime} 
                onRemove={handleRemoveClock} 
              />
            ))}
            
            {clocks.length === 0 && (
               <div className="text-slate-400 mt-10 text-lg">
                 Panonuz boş. Yukarıdan yeni bir şehir ekleyebilirsiniz.
               </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}