'use client';

import { usePathname } from 'next/navigation';
import Hero from './Hero';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import StructuredData from './StructuredData';
import { ERROR_MESSAGES } from '../config/constants';

export default function PortfolioLayout({ children, profile, quotes, currentLang }) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${currentLang}` || pathname === `/${currentLang}/`;

  const baseUrl = 'https://www.olivier-psy.fr';

  return (
    <div className='App'>
      <StructuredData profile={profile} currentLang={currentLang} baseUrl={baseUrl} />
      <Navbar currentLang={currentLang} profile={profile} />

      {isHomePage && (
        <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.COMPONENT}>
          <Hero profile={profile} quotes={quotes || []} />
        </ErrorBoundary>
      )}

      <div className='container'>
        {children}
      </div>

      <Footer />
    </div>
  );
}
