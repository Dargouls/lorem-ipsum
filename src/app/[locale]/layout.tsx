import type { Metadata } from "next";
import { Libre_Baskerville, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { locales } from "@/middleware";
import Script from "next/script";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description: "Gerador de texto Lorem Ipsum",
};

// Gerar os parâmetros estáticos para os locales
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Script do Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3633949689305991"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${libreBaskerville.variable} ${geistMono.variable} antialiased bg-[#fffdf5]`}
        suppressHydrationWarning
      >
        {children}
        <Toaster 
          position="bottom-center" 
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
            },
            duration: 2000,
          }}
        />
      </body>
    </html>
  );
} 