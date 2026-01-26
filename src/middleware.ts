import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fa', 'de'],
  defaultLocale: 'en',
  localePrefix: 'never',   // 👈 مهم
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
