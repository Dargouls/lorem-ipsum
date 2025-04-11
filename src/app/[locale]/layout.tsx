import type { Metadata } from "next";
import { Libre_Baskerville, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params.locale;
  
  // Lista de locais suportados
  const locales = ['en', 'pt'];
  
  // Verifica se o locale é suportado
  if (!locales.includes(locale)) {
    notFound();
  }
  
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${libreBaskerville.variable} ${geistMono.variable} antialiased bg-[#fffdf5]`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider 
          locale={locale} 
          messages={messages}
          timeZone="UTC"
        >
          {children}
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              // Garantir consistência entre servidor e cliente
              style: {
                background: '#363636',
                color: '#fff',
              },
              duration: 2000,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 