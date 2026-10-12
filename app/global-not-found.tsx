import '@/app/globals.css';
import Link from 'next/link';
import tr from '@/locales/tr.json';
import en from '@/locales/en.json';
export const metadata = { title: `${tr.notFound.title} / ${en.notFound.title}`, robots: { index: false, follow: false } };
export default function NotFound() { return <html lang="tr"><head><title>{tr.notFound.title} / {en.notFound.title}</title><meta name="robots" content="noindex"/></head><body><main className="error-page"><p className="eyebrow">404</p><h1>{tr.notFound.title}</h1><p>{tr.notFound.text}</p><Link className="button" href="/tr" lang="tr">{tr.nav.tr} — {tr.notFound.home}</Link><section lang="en"><h2>{en.notFound.title}</h2><p>{en.notFound.text}</p><Link className="text-link" href="/en">{en.nav.en} — {en.notFound.home}</Link></section></main></body></html>; }
