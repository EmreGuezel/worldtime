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
    <div className="relative w-full max-w-md mx-auto mb-16">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Şehir veya ülke ara..."
        className="w-full px-5 py-4 bg-zinc-900/50 rounded border border-zinc-800 text-amber-50 focus:outline-none focus:border-amber-700 focus:bg-zinc-900 transition-all shadow-inner placeholder-zinc-600 font-serif"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded shadow-2xl max-h-60 overflow-y-auto">
          {results.map((loc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(loc)}
              className="px-5 py-4 hover:bg-zinc-800 cursor-pointer text-zinc-300 font-serif border-b border-zinc-800/50 last:border-0 flex justify-between items-center transition-colors"
            >
              <span>{loc.city}</span> 
              <span className="text-xs text-amber-700 font-sans tracking-wider">{loc.timezone}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}