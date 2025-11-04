'use client';

import { usePathname } from 'next/navigation';
import Hero from './Hero';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import ErrorBoundary from './ErrorBoundary';
import StructuredData from './StructuredData';
import { ERROR_MESSAGES } from '../config/constants';

export default function PortfolioLayout({ children, profile, quotes, currentLang }) {
  const pathname = usePathname();
  const isCVPage = pathname?.includes('/cv');

  const baseUrl = 'https://www.olivier-psy.fr';

  if (isCVPage) {
    // For CV page, only show children and language switcher
    return (
      <>
        <StructuredData profile={profile} currentLang={currentLang} baseUrl={baseUrl} />
        {children}
        <LanguageSwitcher currentLang={currentLang} />
      </>
    );
  }

  // For other pages, show full layout with Hero and Footer

  return (
    <div className='App'>
      <StructuredData profile={profile} currentLang={currentLang} baseUrl={baseUrl} />
      <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.COMPONENT}>
        <Hero profile={profile} quotes={quotes || []} currentLang={currentLang} />
      </ErrorBoundary>

      <div className='container'>
        {children}
      </div>

      <Footer />

      <LanguageSwitcher currentLang={currentLang} />
    </div>
  );
}

