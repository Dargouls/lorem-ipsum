'use client';

import { locales } from '@/middleware';
import { NextIntlClientProvider } from 'next-intl';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './header';

export default function PageContainer({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const locale = params.locale as string;

	// Verificar se o locale é válido
	useEffect(() => {
		if (!locales.includes(locale)) {
			notFound();
		}
	}, [locale]);

	// Mensagens de tradução carregadas no cliente
	const [messages, setMessages] = useState<any>(null);
	const [mounted, setMounted] = useState(false);

	// Carregar as traduções no cliente
	useEffect(() => {
		async function loadMessages() {
			try {
				const messages = (await import(`@/locales/${locale}/translation.json`)).default;
				setMessages(messages);
				setMounted(true);
				// Definir o atributo lang do HTML para o locale atual
				document.documentElement.lang = locale;
			} catch (error) {
				console.error('Falha ao carregar traduções:', error);
			}
		}
		loadMessages();
	}, [locale]);

	// Aguardar até que as mensagens estejam carregadas
	if (!mounted || !messages) {
		return <div className='paper-texture flex flex-col bg-[#fffdf5]'></div>;
	}

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<Header />
			{children}
		</NextIntlClientProvider>
	);
}
