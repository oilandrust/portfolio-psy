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
      title: `Expérience - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Expérience professionnelle et parcours d\'Olivier Rouiller',
      canonical: `${baseUrl}/fr/experience/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/experience/`,
          'en': `${baseUrl}/en/experience/`,
          'x-default': `${baseUrl}/fr/experience/`,
        },
      },
      openGraph: {
        title: 'Expérience - Olivier Rouiller',
        description: 'Expérience professionnelle en psychothérapie',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/experience/`,
      },
    };
  }
  
  return {
    title: `Experience - ${langData.profile?.title || 'Olivier Rouiller'}`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/experience/`,
        'en': `${baseUrl}/en/experience/`,
        'x-default': `${baseUrl}/fr/experience/`,
      },
    },
  };
}

export default async function ExperiencePage({ params }) {
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

