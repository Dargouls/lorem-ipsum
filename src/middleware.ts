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
  
  // Se um usuário visitar a raiz, ele será redirecionado para o locale apropriado
  localePrefix: 'as-needed'
});

export const config = {
  // Matcher configurado para funcionar com i18n no Next.js 15
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 