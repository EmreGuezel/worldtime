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

  const fuse = useMemo(() => new Fuse(locations, {
    keys: ["city", "keywords"],
    threshold: 0.4,
    includeScore: true,
  }), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchTerm(text);

    if (text.length > 0) {
      const searchResults = fuse.search(text);
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
    <div className="relative w-full max-w-md mx-auto mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Şehir arayın..."
        // Ahşap tonları ve mat kenarlıklar
        className="w-full px-5 py-4 bg-[#2b1c13] rounded border-2 border-[#4a3020] text-[#e3d3b9] focus:outline-none focus:border-[#d4af37] transition-all shadow-inner placeholder-[#73553c] font-serif"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-[#2b1c13] border-2 border-[#4a3020] rounded shadow-2xl max-h-60 overflow-y-auto">
          {results.map((loc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(loc)}
              className="px-5 py-4 hover:bg-[#3d261a] cursor-pointer text-[#e3d3b9] font-serif border-b border-[#4a3020] last:border-0 flex justify-between items-center transition-colors"
            >
              <span>{loc.city}</span> 
              <span className="text-xs text-[#d4af37] font-sans tracking-wider">{loc.timezone}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}