import type { Metadata } from "next";
// Lüks hissiyat için klasik bir font ekliyoruz
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// İŞTE BURASI SEKME YAZISINI DEĞİŞTİRİR
export const metadata: Metadata = {
  title: "Chronomètre | Dünya Saatleri",
  description: "Özel zaman dilimi koleksiyonunuz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      {/* Arka planı tamamen lüks bir koyu griye (zinc-950) boyuyoruz */}
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-zinc-950 text-zinc-200 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}