import createMiddleware from 'next-intl/middleware';

// Lista de locais disponíveis
export const locales = ['en', 'pt'];
export const defaultLocale = 'pt';

// Middleware que gerencia a navegação localizada
export default createMiddleware({
  // A lista de locais disponíveis
  locales,
  
  // Locale padrão
  defaultLocale,
  
  // Forçar que o locale sempre apareça na URL, mesmo sendo o padrão
  localePrefix: 'always'
});

export const config = {
  // Matcher configurado para funcionar com i18n no Next.js 15
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 