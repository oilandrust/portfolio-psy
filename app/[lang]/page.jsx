import { getPortfolioData } from '../../lib/portfolio';
import AboutTab from '../../components/AboutTab';

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const profile = langData.profile || {};

  const baseUrl = 'https://www.olivier-psy.fr';

  if (lang === 'fr') {
    return {
      title: profile.title || 'Olivier Rouiller',
      description: profile.about?.substring(0, 160) || 'À propos d\'Olivier Rouiller',
      canonical: `${baseUrl}/fr/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/`,
          en: `${baseUrl}/en/`,
          'x-default': `${baseUrl}/fr/`,
        },
      },
      openGraph: {
        title: profile.title,
        description: profile.about?.substring(0, 160) || '',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/`,
      },
    };
  }

  return {
    title: profile.title || 'Olivier Rouiller',
    description: profile.about?.substring(0, 160) || 'About Olivier Rouiller',
    canonical: `${baseUrl}/en/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/`,
        en: `${baseUrl}/en/`,
        'x-default': `${baseUrl}/fr/`,
      },
    },
    openGraph: {
      title: profile.title,
      description: profile.about?.substring(0, 160) || '',
      locale: 'en_US',
      url: `${baseUrl}/en/`,
    },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';

  return <AboutTab profile={langData.profile} currentLang={currentLang} />;
}
