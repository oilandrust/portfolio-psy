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
  
  if (lang === 'fr') {
    return {
      title: `À propos - ${profile.title || 'Olivier Rouiller'}`,
      description: profile.about?.substring(0, 160) || 'À propos d\'Olivier Rouiller',
      canonical: 'https://www.olivier-psy.fr/fr/about',
      openGraph: {
        title: `À propos - ${profile.title}`,
        description: profile.about?.substring(0, 160) || '',
        locale: 'fr_FR',
        url: 'https://www.olivier-psy.fr/fr/about',
      },
    };
  }
  
  return {
    title: `About - ${profile.title || 'Olivier Rouiller'}`,
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

