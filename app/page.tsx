"use client";

import { useState, useEffect } from "react";
import ClockCard from "../components/ClockCard";
import SearchBar from "../components/SearchBar";
import { LocationData } from "../data/locations";

export default function Home() {
  const [globalTime, setGlobalTime] = useState<Date | null>(null);
  const [clocks, setClocks] = useState<LocationData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    setGlobalTime(new Date()); 
    const timer = setInterval(() => {
      setGlobalTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedClocks = localStorage.getItem("saved-clocks");
    if (savedClocks) {
      setClocks(JSON.parse(savedClocks));
    } else {
      setClocks([
        { city: "Londra", timezone: "Europe/London", keywords: [] },
        { city: "Cenevre", timezone: "Europe/Zurich", keywords: ["cenevre", "geneva", "isviçre"] }
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("saved-clocks", JSON.stringify(clocks));
    }
  }, [clocks, isLoaded]);

  const handleAddClock = (newLocation: LocationData) => {
    const isAlreadyAdded = clocks.some((clock) => clock.city === newLocation.city);
    if (!isAlreadyAdded) {
      setClocks([...clocks, newLocation]);
    } else {
      alert(`${newLocation.city} koleksiyonunuzda zaten mevcut.`);
    }
  };

  const handleRemoveClock = (cityToRemove: string) => {
    const filteredClocks = clocks.filter((clock) => clock.city !== cityToRemove);
    setClocks(filteredClocks);
  };

  return (
    <main className="min-h-screen p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* SADE VE ESKİ TİP BAŞLIK */}
        <h1 className="text-4xl md:text-5xl font-serif text-center text-[#d4af37] mb-12 tracking-widest drop-shadow-sm">
          World Time
        </h1>
        
        <SearchBar onAdd={handleAddClock} />

        {!isLoaded ? (
          <div className="flex justify-center text-[#8a6a4b] font-serif italic">
            Yükleniyor...
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {clocks.map((clock, index) => (
              <ClockCard 
                key={index} 
                city={clock.city} 
                timezone={clock.timezone} 
                time={globalTime} 
                onRemove={handleRemoveClock} 
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}