import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
	variable: '--font-baskerville',
	weight: ['400', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lorem Ipsum Generator',
	description: 'Gerador de texto Lorem Ipsum',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt'>
			<body className={`${libreBaskerville.variable} bg-backgorund antialiased`}>{children}</body>
		</html>
	);
}
