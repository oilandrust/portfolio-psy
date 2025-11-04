'use client';

import { usePathname } from 'next/navigation';
import Hero from './Hero';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import ErrorBoundary from './ErrorBoundary';
import { ERROR_MESSAGES } from '../config/constants';

export default function PortfolioLayout({ children, profile, quotes, currentLang }) {
  const pathname = usePathname();
  const isCVPage = pathname?.includes('/cv');

  if (isCVPage) {
    // For CV page, only show children and language switcher
    return (
      <>
        {children}
        <LanguageSwitcher currentLang={currentLang} />
      </>
    );
  }

  // For other pages, show full layout with Hero and Footer
  return (
    <div className='App'>
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

