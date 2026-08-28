import { getPortfolioData } from '../../../../lib/portfolio';
import InterestsTab from '../../../../components/InterestsTab';
import InterestDetail from '../../../../components/InterestDetail';

export async function generateStaticParams() {
  const portfolio = getPortfolioData();
  const languages = ['fr', 'en'];
  const params = [];

  languages.forEach(lang => {
    const interests = portfolio[lang]?.interests || [];
    interests.forEach(interest => {
      const slug = interest.slug || interest.id?.toString();
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
  const interest = langData.interests?.find(
    i => i.slug === slugOrId || i.id?.toString() === slugOrId
  );

  if (!interest) {
    return {
      title: lang === 'fr' ? 'Article non trouvé - Olivier Rouiller' : 'Article not found - Olivier Rouiller',
    };
  }

  const baseUrl = 'https://www.olivier-psy.fr';
  const interestSlug = interest.slug || interest.id?.toString();

  if (lang === 'fr') {
    return {
      title: `${interest.title} - Olivier Rouiller`,
      description: interest.description?.substring(0, 160) || interest.subtitle || '',
      canonical: `${baseUrl}/fr/articles/${interestSlug}/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/articles/${interestSlug}/`,
          en: `${baseUrl}/en/articles/${interestSlug}/`,
          'x-default': `${baseUrl}/fr/articles/${interestSlug}/`,
        },
      },
      openGraph: {
        title: interest.title,
        description: interest.description?.substring(0, 160) || interest.subtitle || '',
        locale: 'fr_FR',
        type: 'website',
        url: `${baseUrl}/fr/articles/${interestSlug}/`,
      },
    };
  }

  return {
    title: `${interest.title} - Olivier Rouiller`,
    description: interest.description?.substring(0, 160) || interest.subtitle || '',
    canonical: `${baseUrl}/en/articles/${interestSlug}/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/articles/${interestSlug}/`,
        en: `${baseUrl}/en/articles/${interestSlug}/`,
        'x-default': `${baseUrl}/fr/articles/${interestSlug}/`,
      },
    },
    openGraph: {
      title: interest.title,
      description: interest.description?.substring(0, 160) || interest.subtitle || '',
      locale: 'en_US',
      type: 'website',
      url: `${baseUrl}/en/articles/${interestSlug}/`,
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  const resolvedParams = await params;
  const { lang, slug, id } = resolvedParams;
  const slugOrId = slug ?? id;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  const interest = langData.interests?.find(
    i => i.slug === slugOrId || i.id?.toString() === slugOrId
  );

  if (!interest) {
    return <InterestsTab interests={langData.interests || []} />;
  }

  return (
    <InterestDetail interests={langData.interests || []} currentLang={currentLang} />
  );
}
