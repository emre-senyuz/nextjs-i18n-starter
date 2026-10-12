import { notFound } from 'next/navigation';
import { getDictionary, requireLocale, type Page } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { ContentPage } from '@/components/site';
type Props = { params: Promise<{locale: string; slug?: string[]}> };
export const dynamicParams = false;
function resolvePage(slug?: string[]): Page { if (!slug?.length) return 'home'; if (slug.length === 1 && (slug[0] === 'services' || slug[0] === 'about')) return slug[0]; notFound(); }
export function generateStaticParams() { return [{ slug: [] }, { slug: ['services'] }, { slug: ['about'] }]; }
export async function generateMetadata({params}: Props) { const p = await params; return pageMetadata(requireLocale(p.locale), resolvePage(p.slug)); }
export default async function Route({params}: Props) { const p = await params; const locale = requireLocale(p.locale); return <ContentPage page={resolvePage(p.slug)} locale={locale} d={getDictionary(locale)}/>; }
