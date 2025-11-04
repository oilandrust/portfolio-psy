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
  const profile = langData.profile || {};
  
  const baseUrl = 'https://www.olivier-psy.fr';
  
  if (lang === 'fr') {
    return {
      title: `À propos - ${profile.title || 'Olivier Rouiller'}`,
      description: profile.about?.substring(0, 160) || 'À propos d\'Olivier Rouiller',
      canonical: `${baseUrl}/fr/about/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/about/`,
          'en': `${baseUrl}/en/about/`,
          'x-default': `${baseUrl}/fr/about/`,
        },
      },
      openGraph: {
        title: `À propos - ${profile.title}`,
        description: profile.about?.substring(0, 160) || '',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/about/`,
      },
    };
  }
  
  return {
    title: `About - ${profile.title || 'Olivier Rouiller'}`,
    description: profile.about?.substring(0, 160) || 'About Olivier Rouiller',
    canonical: `${baseUrl}/en/about/`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/about/`,
        'en': `${baseUrl}/en/about/`,
        'x-default': `${baseUrl}/fr/about/`,
      },
    },
    openGraph: {
      title: `About - ${profile.title}`,
      description: profile.about?.substring(0, 160) || '',
      locale: 'en_US',
      url: `${baseUrl}/en/about/`,
    },
  };
}

export default async function AboutPage({ params }) {
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

