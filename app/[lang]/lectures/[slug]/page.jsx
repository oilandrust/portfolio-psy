import { getPortfolioData } from '../../../../lib/portfolio';
import LecturesTab from '../../../../components/LecturesTab';
import ReadingDetail from '../../../../components/ReadingDetail';

export async function generateStaticParams() {
  const portfolio = getPortfolioData();
  const languages = ['fr', 'en'];
  const params = [];

  languages.forEach(lang => {
    const readings = portfolio[lang]?.readings || [];
    readings.forEach(reading => {
      const slug = reading.slug || reading.id?.toString();
      if (!slug) return;
      params.push({ lang, slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang, slug, id } = resolvedParams;
  const slugOrId = slug ?? id;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const reading = langData.readings?.find(
    r => r.slug === slugOrId || r.id?.toString() === slugOrId
  );

  if (!reading) {
    return {
      title: 'Lecture non trouvée - Olivier Rouiller',
    };
  }

  const baseUrl = 'https://www.olivier-psy.fr';
  const readingSlug = reading.slug || reading.id?.toString();

  if (lang === 'fr') {
    return {
      title: `${reading.title} - Olivier Rouiller`,
      description: `${reading.author} - ${reading.title}`,
      canonical: `${baseUrl}/fr/lectures/${readingSlug}/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/lectures/${readingSlug}/`,
          en: `${baseUrl}/en/lectures/${readingSlug}/`,
          'x-default': `${baseUrl}/fr/lectures/${readingSlug}/`,
        },
      },
      openGraph: {
        title: reading.title,
        description: `${reading.author} - ${reading.title}`,
        locale: 'fr_FR',
        type: 'website',
        url: `${baseUrl}/fr/lectures/${readingSlug}/`,
      },
    };
  }

  return {
    title: `${reading.title} - Olivier Rouiller`,
    description: `${reading.author} - ${reading.title}`,
    canonical: `${baseUrl}/en/lectures/${readingSlug}/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/lectures/${readingSlug}/`,
        en: `${baseUrl}/en/lectures/${readingSlug}/`,
        'x-default': `${baseUrl}/fr/lectures/${readingSlug}/`,
      },
    },
    openGraph: {
      title: reading.title,
      description: `${reading.author} - ${reading.title}`,
      locale: 'en_US',
      type: 'website',
      url: `${baseUrl}/en/lectures/${readingSlug}/`,
    },
  };
}

export default async function ReadingDetailPage({ params }) {
  const resolvedParams = await params;
  const { lang, slug, id } = resolvedParams;
  const slugOrId = slug ?? id;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  const reading = langData.readings?.find(
    r => r.slug === slugOrId || r.id?.toString() === slugOrId
  );

  if (!reading) {
    return <LecturesTab readings={langData.readings || []} />;
  }

  return (
    <ReadingDetail readings={langData.readings || []} currentLang={currentLang} />
  );
}
