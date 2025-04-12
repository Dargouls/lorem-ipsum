'use client';

import { Card } from '@/components/ui/card';

import { locales } from '@/middleware';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HowTo() {
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
			<HowToContent />
		</NextIntlClientProvider>
	);
}

// Componente interno que usa as traduções
function HowToContent() {
	const t = useTranslations('app');

	return (
		<div className='paper-texture flex flex-col bg-[#fffdf5]'>
			<div className='mt-[60px] flex flex-col bg-[#fffdf5]'>
				<div className='bg-[#fffdf5] p-8'>
					<Card className='border border-amber-200 bg-white p-6 shadow-md'>
						<h2 className='mb-4 text-2xl font-bold text-amber-900'>{t('howToTitle')}</h2>
						<div className='space-y-4 text-zinc-700'>
							<p>{t('howToDesc1')}</p>
							<p>{t('howToDesc2')}</p>
							<p>{t('howToDesc3')}</p>
							<ol className='list-decimal space-y-2 pl-6'>
								<li>{t('howToStep1')}</li>
								<li>{t('howToStep2')}</li>
								<li>{t('howToStep3')}</li>
								<li>{t('howToStep4')}</li>
							</ol>
						</div>
					</Card>

					{/* Anúncio na página de Como Utilizar */}
					{/* <div className='mt-6 w-full overflow-hidden rounded-md border border-amber-200 bg-white p-2'>
						<AdComponent adSlot='4218034888' />
					</div> */}
				</div>
			</div>
		</div>
	);
}
