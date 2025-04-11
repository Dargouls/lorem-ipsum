import createMiddleware from 'next-intl/middleware';

// Middleware que gerencia a navegação localizada
export default createMiddleware({
  // A lista de locais disponíveis
  locales: ['en', 'pt'],
  
  // Se a localidade no caminho não for encontrada,
  // `defaultLocale` será usada
  defaultLocale: 'pt',
  
  // Se um usuário visitar a raiz, ele será redirecionado
  localePrefix: 'as-needed',
});

export const config = {
  // Ignora arquivos estáticos e API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 