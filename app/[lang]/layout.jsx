import { getPortfolioData } from '../../lib/portfolio';
import Hero from '../../components/Hero';
import Footer from '../../components/Footer';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ERROR_MESSAGES } from '../../config/constants';

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const profile = langData.profile || {};
  
  // SEO optimization for French only
  if (lang === 'fr') {
    return {
      title: `${profile.title || 'Olivier Rouiller'} - ${profile.subtitle || 'Psychologue'}`,
      description: profile.about?.substring(0, 160) || 'Portfolio professionnel d\'Olivier Rouiller',
      openGraph: {
        title: profile.title || 'Olivier Rouiller',
        description: profile.about?.substring(0, 160) || '',
        locale: 'fr_FR',
        type: 'website',
        url: 'https://www.olivier-psy.fr/fr',
      },
    };
  }
  
  return {
    title: `${profile.title || 'Olivier Rouiller'} - ${profile.subtitle || 'Psychologist'}`,
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  
  return (
    <div className='App'>
      <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.COMPONENT}>
        <Hero profile={langData.profile} quotes={langData.quotes || []} currentLang={currentLang} />
      </ErrorBoundary>

      <div className='container'>
        {children}
      </div>
      
      <Footer />
      
      <LanguageSwitcher currentLang={currentLang} />
    </div>
  );
}

