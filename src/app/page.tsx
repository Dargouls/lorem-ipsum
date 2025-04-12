import { redirect } from 'next/navigation';
import { defaultLocale } from '@/middleware';

export default function HomePage() {
  // Esta página será redirecionada automaticamente para a localidade padrão
  redirect(`/${defaultLocale}`);
} 