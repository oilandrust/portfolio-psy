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
      title: `Intérêts - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Découvrez les intérêts et domaines d\'expertise d\'Olivier Rouiller en psychologie',
      canonical: `${baseUrl}/fr/interests/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/interests/`,
          'en': `${baseUrl}/en/interests/`,
          'x-default': `${baseUrl}/fr/interests/`,
        },
      },
      openGraph: {
        title: 'Intérêts - Olivier Rouiller',
        description: 'Domaines d\'expertise et intérêts en psychologie',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/interests/`,
      },
    };
  }
  
  return {
    title: `Interests - ${langData.profile?.title || 'Olivier Rouiller'}`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/interests/`,
        'en': `${baseUrl}/en/interests/`,
        'x-default': `${baseUrl}/fr/interests/`,
      },
    },
  };
}

export default async function InterestsPage({ params }) {
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

