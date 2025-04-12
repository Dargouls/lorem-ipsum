'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

import logo from '@/assets/brand/logo.png';
import { generateParagraphs } from '@/lib/lorem-generator';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	const t = useTranslations('app');
	const pathname = usePathname();
	const locale = pathname.split('/')[1];
	
	const handleQuickCopy = () => {
		const quickParagraph = generateParagraphs(1, true)[0];
		// Usar diretamente writeText e mostrar apenas um toast
		navigator.clipboard.writeText(quickParagraph);
		toast.success(t('quickCopySuccess'));
	};

	return (
		<>
			<header className='fixed left-0 right-0 top-0 z-10 h-[60px] border-b border-amber-200 bg-white shadow-sm'>
				<div className='container mx-auto flex h-full items-center justify-between px-4'>
					<div className='flex items-center gap-6'>
						<Link href={`/${locale}`}>
							<Image src={logo} alt='Logo' className='h-8 w-8' />
						</Link>
						<Link
							href={`/${locale}`}
							className={`font-medium text-amber-900 ${pathname === `/${locale}` ? 'border-b-2 border-amber-500' : ''}`}
						>
							{t('navHome')}
						</Link>
						<Link
							href={`/${locale}/how-to`}
							className={`font-medium text-amber-900 ${pathname === `/${locale}/how-to` ? 'border-b-2 border-amber-500' : ''}`}
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
		</>
	);
}
