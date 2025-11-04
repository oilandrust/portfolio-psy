import { getPortfolioData } from '../../../lib/portfolio';
import AboutTab from '../../../components/AboutTab';
import Tabs from '../../../components/Tabs';
import FormationsTab from '../../../components/FormationsTab';
import ExperienceTab from '../../../components/ExperienceTab';
import LecturesTab from '../../../components/LecturesTab';
import ContactTab from '../../../components/ContactTab';
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
      title: `Lectures - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Lectures et références bibliographiques d\'Olivier Rouiller',
      canonical: `${baseUrl}/fr/lectures/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/lectures/`,
          'en': `${baseUrl}/en/lectures/`,
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
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/lectures/`,
        'en': `${baseUrl}/en/lectures/`,
        'x-default': `${baseUrl}/fr/lectures/`,
      },
    },
  };
}

export default async function LecturesPage({ params }) {
  const { lang } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  
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

