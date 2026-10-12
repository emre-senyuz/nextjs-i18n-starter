import 'server-only';
import tr from '@/locales/tr.json';
import en from '@/locales/en.json';
import { notFound } from 'next/navigation';
export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof tr;
const dictionaries = { tr, en } satisfies Record<Locale, Dictionary>;
export function isLocale(value: string): value is Locale { return locales.some(locale => locale === value); }
export function requireLocale(value: string): Locale { if (!isLocale(value)) notFound(); return value; }
export function getDictionary(locale: Locale): Dictionary { return dictionaries[locale]; }
export const pages = ['home', 'services', 'about'] as const;
export type Page = (typeof pages)[number];
export function pagePath(locale: Locale, page: Page) { return `/${locale}${page === 'home' ? '' : `/${page}`}`; }
