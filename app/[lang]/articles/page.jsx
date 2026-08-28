import { getPortfolioData } from '../../../lib/portfolio';
import InterestsTab from '../../../components/InterestsTab';

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;

  const baseUrl = 'https://www.olivier-psy.fr';

  if (lang === 'fr') {
    return {
      title: `Articles - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Articles et réflexions sur les thérapies somatiques',
      canonical: `${baseUrl}/fr/articles/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/articles/`,
          en: `${baseUrl}/en/articles/`,
          'x-default': `${baseUrl}/fr/articles/`,
        },
      },
      openGraph: {
        title: 'Articles - Olivier Rouiller',
        description: 'Articles et réflexions sur les thérapies somatiques',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/articles/`,
      },
    };
  }

  return {
    title: `Articles - ${langData.profile?.title || 'Olivier Rouiller'}`,
    description: 'Articles and reflections on somatic therapies',
    canonical: `${baseUrl}/en/articles/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/articles/`,
        en: `${baseUrl}/en/articles/`,
        'x-default': `${baseUrl}/fr/articles/`,
      },
    },
    openGraph: {
      title: 'Articles - Olivier Rouiller',
      description: 'Articles and reflections on somatic therapies',
      locale: 'en_US',
      url: `${baseUrl}/en/articles/`,
    },
  };
}

export default async function ArticlesPage({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;

  return <InterestsTab interests={langData.interests || []} />;
}
