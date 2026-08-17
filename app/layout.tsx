import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "World Time",
  description: "Dünya Saatleri - Farklı şehirlerin saatlerini görüntüleyin ve koleksiyonunuza ekleyin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      {/* Arka planı koyu ceviz/odun tonuna (#1c120c) ayarladık */}
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#1c120c] text-[#e3d3b9] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}