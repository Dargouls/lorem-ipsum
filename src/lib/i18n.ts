import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Garantindo que sempre temos um locale válido
  const resolvedLocale = locale || 'pt';
  
  return {
    messages: (await import(`../locales/${resolvedLocale}/translation.json`)).default,
    locale: resolvedLocale
  };
}); 