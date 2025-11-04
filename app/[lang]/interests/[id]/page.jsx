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
      params.push({
        lang: lang,
        id: interest.id.toString()
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const interest = langData.interests?.find(i => i.id.toString() === id);
  
  if (!interest) {
    return {
      title: 'Intérêt non trouvé - Olivier Rouiller',
    };
  }
  
  if (lang === 'fr') {
    return {
      title: `${interest.title} - Olivier Rouiller`,
      description: interest.description?.substring(0, 160) || interest.subtitle || '',
      canonical: `https://www.olivier-psy.fr/fr/interests/${id}`,
      openGraph: {
        title: interest.title,
        description: interest.description?.substring(0, 160) || interest.subtitle || '',
        locale: 'fr_FR',
        type: 'website',
        url: `https://www.olivier-psy.fr/fr/interests/${id}`,
      },
    };
  }
  
  return {
    title: `${interest.title} - Olivier Rouiller`,
  };
}

export default async function InterestDetailPage({ params }) {
  const { lang, id } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  const interest = langData.interests?.find(i => i.id.toString() === id);
  
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

