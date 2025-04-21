'use client';

import AdComponent from '@/components/AdComponnet/AdComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateParagraphs } from '@/lib/lorem-generator';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Componente interno que usa as traduções
export default function Home() {
	const t = useTranslations('app');
	const [paragraphs, setParagraphs] = useState('3');
	const [loading, setLoading] = useState(false);
	const [loremText, setLoremText] = useState<string[]>([]);
	const [startWithClassic, setStartWithClassic] = useState(true);

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

	// Verifica se há texto gerado
	const hasGeneratedText = loremText.length > 0;

	return (
		<div className='paper-texture flex flex-col bg-[#fffdf5]'>
			<div className='mt-[60px] flex flex-col bg-[#fffdf5]'>
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
					<div className='mx-auto flex w-full max-w-3xl flex-col gap-6 bg-[#fffdf5] p-8'>
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
					</div>
				) : (
					// Banner informativo - exibido apenas quando não há texto gerado
					<div className='w-full border-t border-amber-100 bg-white p-4 text-center'>
						<div className='mx-auto max-w-3xl rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
							O texto vai aparecer logo abaixo.
						</div>
					</div>
				)}

				{/* Anúncio lateral esquerda */}
				{/* <div className='fixed bottom-0 left-0 top-[60px] hidden w-32 border-r border-amber-100 bg-[#fffdf5] lg:flex'>
					<AdComponent adSlot='9821715353' />
				</div> */}

				{/* Anúncio lateral direita */}
				{/* <div className='fixed bottom-0 right-0 top-[60px] hidden w-32 border-l border-amber-100 bg-[#fffdf5] lg:flex'>
					<AdComponent adSlot='9470361569' />
				</div> */}

				{/* Anúncio horizontal após os resultados */}
				<div className='mx-auto mt-6 w-full max-w-3xl overflow-hidden rounded-md border border-amber-200 bg-white p-2'>
					<AdComponent
						data-ad-slot='1460009608'
						data-full-width-responsive='true'
						//  data-ad-layout="in-article"
						data-ad-format='fluid'
					/>
				</div>
			</div>
		</div>
	);
}
