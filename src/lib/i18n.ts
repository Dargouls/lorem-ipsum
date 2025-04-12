import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '../middleware';

export default getRequestConfig(async ({locale}) => {
  // Garantir que usamos um locale válido
  const resolvedLocale = locales.includes(locale as string) 
    ? locale 
    : defaultLocale;
  
  // Carregar as mensagens do locale e especificar o locale como string
  return {
    messages: (
      await import(`../locales/${resolvedLocale}/translation.json`)
    ).default,
    locale: resolvedLocale as string
  };
}); 