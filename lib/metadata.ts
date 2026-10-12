import type { Metadata } from 'next';
import { getDictionary, pagePath, type Locale, type Page } from './i18n';
export function pageMetadata(locale: Locale, page: Page): Metadata {
  return { ...getDictionary(locale).meta[page], metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'), alternates: { canonical: pagePath(locale, page), languages: { tr: pagePath('tr', page), en: pagePath('en', page), 'x-default': pagePath('tr', page) } } };
}
