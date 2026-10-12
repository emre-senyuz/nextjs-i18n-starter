import '@/app/globals.css';
import { getDictionary, locales, requireLocale } from '@/lib/i18n';
import { Header } from '@/components/header';
import { Footer } from '@/components/site';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{locale: string}> }) {
  const locale = requireLocale((await params).locale); const d = getDictionary(locale);
  return <html lang={locale}><body><a className="skip" href="#main">{d.nav.skip}</a><Header locale={locale} labels={d.nav} brand={d.brand} brandLabel={d.brandLabel}/>{children}<Footer d={d} locale={locale}/></body></html>;
}
