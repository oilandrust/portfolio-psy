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
  
  if (lang === 'fr') {
    return {
      title: `Contact - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Contactez Olivier Rouiller',
      canonical: 'https://www.olivier-psy.fr/fr/contact',
      openGraph: {
        title: 'Contact - Olivier Rouiller',
        description: 'Prenez contact',
        locale: 'fr_FR',
        url: 'https://www.olivier-psy.fr/fr/contact',
      },
    };
  }
  
  return {
    title: `Contact - ${langData.profile?.title || 'Olivier Rouiller'}`,
  };
}

export default async function ContactPage({ params }) {
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

