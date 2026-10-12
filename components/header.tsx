'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu, X, Asterisk } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
export function Header({locale, labels, brand, brandLabel}: {locale: Locale; labels: Dictionary['nav']; brand: string; brandLabel: string}) {
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  const suffix = pathname.split('/').slice(2).join('/');
  const links = [{key: 'home', path: `/${locale}`}, {key:'services', path:`/${locale}/services`}, {key:'about', path:`/${locale}/about`}] as const;
  return <header className="header"><Link href={`/${locale}`} className="brand" aria-label={brandLabel}><Asterisk aria-hidden="true"/>{brand}<span aria-hidden="true">®</span></Link><nav className="desktop-nav" aria-label={labels.menu}>{links.map(link => <Link key={link.key} href={link.path} aria-current={pathname === link.path ? 'page' : undefined}>{labels[link.key]}</Link>)}</nav><div className="header-actions"><div className="language" role="group" aria-label={labels.language}>{(['tr','en'] as const).map(l => <Link key={l} href={`/${l}${suffix ? `/${suffix}` : ''}`} lang={l} hrefLang={l} aria-label={labels[l]} aria-current={locale === l ? 'true' : undefined} onClick={() => setOpen(false)}>{labels[l === 'tr' ? 'trShort' : 'enShort']}</Link>)}</div><a href="#contact" className="header-contact">{labels.contact}<ArrowUpRight size={16} aria-hidden="true"/></a><button className="menu-toggle" aria-label={labels.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div><nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label={labels.menu}>{links.map(link => <Link key={link.key} href={link.path} aria-current={pathname === link.path ? 'page' : undefined} onClick={() => setOpen(false)}>{labels[link.key]}</Link>)}</nav></header>;
}

