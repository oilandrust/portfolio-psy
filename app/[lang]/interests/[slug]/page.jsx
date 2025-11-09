import { getPortfolioData } from '../../../../lib/portfolio';
import AboutTab from '../../../../components/AboutTab';
import Tabs from '../../../../components/Tabs';
import FormationsTab from '../../../../components/FormationsTab';
import ExperienceTab from '../../../../components/ExperienceTab';
import LecturesTab from '../../../../components/LecturesTab';
import ContactTab from '../../../../components/ContactTab';
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
      params.push({
        lang,
        slug,
      });
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
      title: 'Intérêt non trouvé - Olivier Rouiller',
    };
  }
  
  const baseUrl = 'https://www.olivier-psy.fr';
  const interestSlug = interest.slug || interest.id?.toString();
  
  if (lang === 'fr') {
    return {
      title: `${interest.title} - Olivier Rouiller`,
      description: interest.description?.substring(0, 160) || interest.subtitle || '',
      canonical: `${baseUrl}/fr/interests/${interestSlug}/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/interests/${interestSlug}/`,
          'en': `${baseUrl}/en/interests/${interestSlug}/`,
          'x-default': `${baseUrl}/fr/interests/${interestSlug}/`,
        },
      },
      openGraph: {
        title: interest.title,
        description: interest.description?.substring(0, 160) || interest.subtitle || '',
        locale: 'fr_FR',
        type: 'website',
        url: `${baseUrl}/fr/interests/${interestSlug}/`,
      },
    };
  }
  
  return {
    title: `${interest.title} - Olivier Rouiller`,
    description: interest.description?.substring(0, 160) || interest.subtitle || '',
    canonical: `${baseUrl}/en/interests/${interestSlug}/`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/interests/${interestSlug}/`,
        'en': `${baseUrl}/en/interests/${interestSlug}/`,
        'x-default': `${baseUrl}/fr/interests/${interestSlug}/`,
      },
    },
    openGraph: {
      title: interest.title,
      description: interest.description?.substring(0, 160) || interest.subtitle || '',
      locale: 'en_US',
      type: 'website',
      url: `${baseUrl}/en/interests/${interestSlug}/`,
    },
  };
}

export default async function InterestDetailPage({ params }) {
  const resolvedParams = await params;
  const { lang, slug, id } = resolvedParams;
  const slugOrId = slug ?? id;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  const interest = langData.interests?.find(
    i => i.slug === slugOrId || i.id?.toString() === slugOrId
  );
  
  // Show grid if interest not found
  if (!interest) {
    const InterestsTab = (await import('../../../../components/InterestsTab')).default;
    return (
      <Tabs currentLang={currentLang}>
        <AboutTab profile={langData.profile} />
        <InterestsTab interests={langData.interests || []} />
        <FormationsTab formations={langData.formations || ''} />
        <ExperienceTab experiences={langData.experiences || []} />
        <LecturesTab readings={langData.readings || []} />
        <ContactTab />
      </Tabs>
    );
  }
  
  return (
    <Tabs currentLang={currentLang}>
      <AboutTab profile={langData.profile} />
      <InterestDetail interests={langData.interests || []} currentLang={currentLang} />
      <FormationsTab formations={langData.formations || ''} />
      <ExperienceTab experiences={langData.experiences || []} />
      <LecturesTab readings={langData.readings || []} />
      <ContactTab />
    </Tabs>
  );
}

