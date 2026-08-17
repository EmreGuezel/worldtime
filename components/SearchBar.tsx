"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { locations, LocationData } from "../data/locations";

interface SearchBarProps {
  onAdd: (location: LocationData) => void;
}

export default function SearchBar({ onAdd }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<LocationData[]>([]);

  // FUSE.JS AYARLARI (Bulanık Arama Motoru)
  // useMemo: Ayarların her harf basıldığında tekrar tekrar hesaplanmasını engeller (Performans!)
  const fuse = useMemo(() => new Fuse(locations, {
    keys: ["city", "keywords"], // Arama yapılacak alanlar
    threshold: 0.4, // Hata toleransı (0.0 kesin eşleşme, 1.0 çok esnek. 0.4 yazım hataları için idealdir)
    includeScore: true, // En çok benzeyeni en üste koyması için
  }), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchTerm(text);

    if (text.length > 0) {
      // Fuse.js ile metni aratıyoruz
      const searchResults = fuse.search(text);
      // Fuse.js sonuçları kendi özel bir formatta döner, biz sadece 'item' (bizim şehrimiz) kısmını alıyoruz
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  };

  const handleSelect = (location: LocationData) => {
    onAdd(location);
    setSearchTerm("");
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-10">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Şehir veya ülke ara (Örn: Fransa, Angara...)"
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {results.map((loc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(loc)}
              className="px-4 py-3 hover:bg-slate-100 cursor-pointer text-slate-700 font-medium border-b last:border-b-0"
            >
              {loc.city} <span className="text-sm text-slate-400 font-normal ml-2">({loc.timezone})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}