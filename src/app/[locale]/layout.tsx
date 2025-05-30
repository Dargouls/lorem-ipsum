import PageContainer from '@/components/ui/layout/page';
import { locales } from '@/middleware';
import type { Metadata } from 'next';
import { Geist_Mono, Libre_Baskerville } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

const libreBaskerville = Libre_Baskerville({
	variable: '--font-baskerville',
	weight: ['400', '700'],
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lorem Ipsum Generator',
	description: 'Gerador de texto Lorem Ipsum',
};

// Gerar os parâmetros estáticos para os locales
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning>
			<head>
				{/* Script do Google AdSense */}
				<meta name='google-adsense-account' content='ca-pub-3633949689305991' />
				<Script
					async
					src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
					crossOrigin='anonymous'
					strategy='lazyOnload'
				/>
			</head>
			<body
				className={`${libreBaskerville.variable} ${geistMono.variable} bg-[#fffdf5] antialiased`}
				suppressHydrationWarning
			>
				<PageContainer>{children}</PageContainer>
				<Toaster
					position='bottom-center'
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
