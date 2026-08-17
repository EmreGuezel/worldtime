export interface LocationData {
  city: string;
  timezone: string;
  keywords: string[];
}

export const locations: LocationData[] = [
  { city: "İstanbul", timezone: "Europe/Istanbul", keywords: ["istanbul", "türkiye", "turkey"] },
  { city: "Ankara", timezone: "Europe/Istanbul", keywords: ["ankara", "türkiye", "turkey", "başkent"] },
  { city: "Londra", timezone: "Europe/London", keywords: ["londra", "london", "ingiltere", "uk", "england", "başkent"] },
  { city: "Paris", timezone: "Europe/Paris", keywords: ["paris", "fransa", "france"] },
  { city: "New York", timezone: "America/New_York", keywords: ["new york", "abd", "usa", "amerika"] },
  { city: "Tokyo", timezone: "Asia/Tokyo", keywords: ["tokyo", "japonya", "japan"] },
  { city: "Berlin", timezone: "Europe/Berlin", keywords: ["berlin", "almanya", "germany"] },
  { city: "Moskova", timezone: "Europe/Moscow", keywords: ["moskova", "moscow", "rusya", "russia"] },
  { city: "Sidney", timezone: "Australia/Sydney", keywords: ["sidney", "sydney", "avustralya", "australia"] },
  { city: "Pekin", timezone: "Asia/Shanghai", keywords: ["pekin", "beijing", "çin", "china", "şangay"] },
  { city: "Seul", timezone: "Asia/Seoul", keywords: ["seul", "seoul", "güney kore", "korea"] },
  { city: "Dubai", timezone: "Asia/Dubai", keywords: ["dubai", "bae", "uae", "arap emirlikleri"] },
  { city: "Rio de Janeiro", timezone: "America/Sao_Paulo", keywords: ["rio", "brezilya", "brazil"] },
  { city: "Meksiko", timezone: "America/Mexico_City", keywords: ["meksika", "mexico", "mexico city"] },
  { city: "Roma", timezone: "Europe/Rome", keywords: ["roma", "rome", "italya", "italy"] },
  { city: "Madrid", timezone: "Europe/Madrid", keywords: ["madrid", "ispanya", "spain"] }
];