import { getPortfolioData } from '../../../lib/portfolio';
import LecturesTab from '../../../components/LecturesTab';

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
      title: `Lectures - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Lectures et références bibliographiques d\'Olivier Rouiller',
      canonical: `${baseUrl}/fr/lectures/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/lectures/`,
          en: `${baseUrl}/en/lectures/`,
          'x-default': `${baseUrl}/fr/lectures/`,
        },
      },
      openGraph: {
        title: 'Lectures - Olivier Rouiller',
        description: 'Bibliographie et lectures en psychologie',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/lectures/`,
      },
    };
  }

  return {
    title: `Readings - ${langData.profile?.title || 'Olivier Rouiller'}`,
    description: 'Readings and bibliographic references of Olivier Rouiller',
    canonical: `${baseUrl}/en/lectures/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/lectures/`,
        en: `${baseUrl}/en/lectures/`,
        'x-default': `${baseUrl}/fr/lectures/`,
      },
    },
    openGraph: {
      title: 'Readings - Olivier Rouiller',
      description: 'Bibliography and readings in psychology',
      locale: 'en_US',
      url: `${baseUrl}/en/lectures/`,
    },
  };
}

export default async function LecturesPage({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;

  return <LecturesTab readings={langData.readings || []} />;
}
