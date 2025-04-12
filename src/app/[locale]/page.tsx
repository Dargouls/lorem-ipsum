'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { generateParagraphs } from '@/lib/lorem-generator';
import { locales } from '@/middleware';
import { Copy } from 'lucide-react';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import logo from '@/assets/brand/logo.png';
import Image from 'next/image';

export default function Home() {
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
			<HomeContent />
		</NextIntlClientProvider>
	);
}

// Componente interno que usa as traduções
function HomeContent() {
	const t = useTranslations('app');
	const [paragraphs, setParagraphs] = useState('3');
	const [loading, setLoading] = useState(false);
	const [loremText, setLoremText] = useState<string[]>([]);
	const [startWithClassic, setStartWithClassic] = useState(true);
	const [activeTab, setActiveTab] = useState('home');

	const generateLoremIpsum = () => {
		setLoading(true);

		// Simulando um carregamento
		setTimeout(() => {
			// Gerando parágrafos
			const numParagraphs = parseInt(paragraphs, 10) || 3;
			setLoremText(generateParagraphs(numParagraphs, startWithClassic));

			setLoading(false);
		}, 500);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(t('copiedText'));
	};

	const handleQuickCopy = () => {
		const quickParagraph = generateParagraphs(1, true)[0];
		// Usar diretamente writeText e mostrar apenas um toast
		navigator.clipboard.writeText(quickParagraph);
		toast.success(t('quickCopySuccess'));
	};

	// Verifica se há texto gerado
	const hasGeneratedText = loremText.length > 0;

	return (
		<div className='paper-texture flex flex-col bg-[#fffdf5]'>
			{/* Header */}
			<header className='fixed left-0 right-0 top-0 z-10 h-[60px] border-b border-amber-200 bg-white shadow-sm'>
				<div className='container mx-auto flex h-full items-center justify-between px-4'>
					<div className='flex items-center gap-6'>
						<Link href='/'>
							<Image src={logo} alt='Logo' className='h-8 w-8' />
						</Link>
						<Link
							href='#'
							className={`font-medium text-amber-900 ${activeTab === 'home' ? 'border-b-2 border-amber-500' : ''}`}
							onClick={(e) => {
								e.preventDefault();
								setActiveTab('home');
							}}
						>
							{t('navHome')}
						</Link>
						<Link
							href='#'
							className={`font-medium text-amber-900 ${activeTab === 'howto' ? 'border-b-2 border-amber-500' : ''}`}
							onClick={(e) => {
								e.preventDefault();
								setActiveTab('howto');
							}}
						>
							{t('navHowTo')}
						</Link>
					</div>
					<TooltipProvider delayDuration={300} skipDelayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									onClick={handleQuickCopy}
									className='relative bg-amber-500 text-black hover:bg-amber-600'
								>
									{t('quickCopy')}
								</Button>
							</TooltipTrigger>
							<TooltipContent
								sideOffset={5}
								className='z-50 border-zinc-700 bg-zinc-800 text-white'
								side='bottom'
							>
								<p>{t('quickCopyTooltip')}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</header>

			{/* Área de anúncios esquerda (apenas desktop) */}
			<div className='fixed bottom-0 left-0 top-[60px] hidden w-32 border-r border-amber-100 bg-[#fffdf5] lg:flex'>
				<div className='w-full p-4 text-center'>
					<ins
						className='adsbygoogle'
						style={{ display: 'block' }}
						data-ad-client='ca-pub-3633949689305991'
						data-ad-slot='1234567890'
						data-ad-format='auto'
						data-full-width-responsive='true'
					></ins>
					<Script id='sidebar-left-ad'>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
				</div>
			</div>

			{/* Área de anúncios direita (apenas desktop) */}
			<div className='fixed bottom-0 right-0 top-[60px] hidden w-32 border-l border-amber-100 bg-[#fffdf5] lg:flex'>
				<div className='w-full p-4 text-center'>
					<ins
						className='adsbygoogle'
						style={{ display: 'block' }}
						data-ad-client='ca-pub-3633949689305991'
						data-ad-slot='2345678901'
						data-ad-format='auto'
						data-full-width-responsive='true'
					></ins>
					<Script id='sidebar-right-ad'>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
				</div>
			</div>

			{/* Conteúdo principal */}
			<div className='mt-[60px] flex flex-1 flex-col bg-[#fffdf5] lg:ml-32 lg:mr-32'>
				{activeTab === 'home' ? (
					<>
						{/* Seção dark */}
						<div className='flex flex-col items-center bg-zinc-900 p-8 pb-16 pt-16 text-white'>
							<h1 className='mb-8 text-4xl font-bold md:text-5xl'>{t('title')}</h1>

							<div className='w-full max-w-md space-y-4'>
								<Button
									size='lg'
									onClick={generateLoremIpsum}
									disabled={loading}
									className='w-full bg-amber-500 py-7 text-lg text-black hover:bg-amber-600'
								>
									{loading ? '...' : t('generate')}
								</Button>

								<div className='space-y-1'>
									<label htmlFor='paragraphs' className='block text-xs text-zinc-400'>
										{t('paragraph')}
									</label>
									<Input
										id='paragraphs'
										type='number'
										min='1'
										max='10'
										value={paragraphs}
										onChange={(e) => setParagraphs(e.target.value)}
										placeholder={t('paragraphsPlaceholder')}
										className='border-zinc-700 bg-zinc-800 text-white'
									/>
								</div>

								<div className='flex items-center'>
									<input
										type='checkbox'
										id='startWithClassic'
										checked={startWithClassic}
										onChange={(e) => setStartWithClassic(e.target.checked)}
										className='mr-2 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-amber-500'
									/>
									<label htmlFor='startWithClassic' className='text-sm text-zinc-300'>
										{t('startWithClassic')}
									</label>
								</div>
							</div>
						</div>

						{/* Área de resultados */}
						{hasGeneratedText ? (
							<div className='flex flex-col gap-6 bg-[#fffdf5] p-8'>
								{/* Texto completo */}
								{loremText.length > 0 && (
									<Card className='border border-amber-200 bg-white shadow-md'>
										<CardHeader className='flex flex-row items-center justify-between pb-2'>
											<CardTitle className='text-sm text-zinc-600'>
												{t('fullText')} ({loremText.length}{' '}
												{loremText.length === 1 ? t('paragraph') : t('paragraphs')})
											</CardTitle>
											<Button
												variant='outline'
												size='icon'
												onClick={() => copyToClipboard(loremText.join('\n\n'))}
												className='h-8 w-8 border-amber-300 text-amber-800 hover:bg-amber-50 hover:text-amber-900'
											>
												<Copy className='h-4 w-4' />
											</Button>
										</CardHeader>
										<CardContent className='text-sm'>
											<div className='space-y-4'>
												{loremText.map((paragraph, index) => (
													<p key={index}>{paragraph}</p>
												))}
											</div>
										</CardContent>
									</Card>
								)}

								{/* Anúncio horizontal após os resultados */}
								<div className='mt-6 w-full overflow-hidden rounded-md border border-amber-200 bg-white p-2'>
									<ins
										className='adsbygoogle'
										style={{ display: 'block' }}
										data-ad-client='ca-pub-3633949689305991'
										data-ad-slot='3456789012'
										data-ad-format='auto'
										data-full-width-responsive='true'
									></ins>
									<Script id='horizontal-ad'>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
								</div>
							</div>
						) : (
							// Banner informativo - exibido apenas quando não há texto gerado
							<div className='w-full border-t border-amber-100 bg-white p-4 text-center'>
								<div className='mx-auto max-w-4xl rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
									O texto vai aparecer logo abaixo.
								</div>
							</div>
						)}
					</>
				) : (
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
						<div className='mt-6 w-full overflow-hidden rounded-md border border-amber-200 bg-white p-2'>
							<ins
								className='adsbygoogle'
								style={{ display: 'block' }}
								data-ad-client='ca-pub-3633949689305991'
								data-ad-slot='4567890123'
								data-ad-format='auto'
								data-full-width-responsive='true'
							></ins>
							<Script id='howto-ad'>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
