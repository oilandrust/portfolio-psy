import { getPortfolioData } from '../../../../lib/portfolio';
import AboutTab from '../../../../components/AboutTab';
import Tabs from '../../../../components/Tabs';
import FormationsTab from '../../../../components/FormationsTab';
import ExperienceTab from '../../../../components/ExperienceTab';
import LecturesTab from '../../../../components/LecturesTab';
import ContactTab from '../../../../components/ContactTab';
import ReadingDetail from '../../../../components/ReadingDetail';

export async function generateStaticParams() {
  const portfolio = getPortfolioData();
  const languages = ['fr', 'en'];
  const params = [];
  
  languages.forEach(lang => {
    const readings = portfolio[lang]?.readings || [];
    readings.forEach(reading => {
      params.push({
        lang: lang,
        id: reading.id.toString()
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const reading = langData.readings?.find(r => r.id?.toString() === id);
  
  if (!reading) {
    return {
      title: 'Lecture non trouvée - Olivier Rouiller',
    };
  }
  
  const baseUrl = 'https://www.olivier-psy.fr';
  
  if (lang === 'fr') {
    return {
      title: `${reading.title} - Olivier Rouiller`,
      description: `${reading.author} - ${reading.title}`,
      canonical: `${baseUrl}/fr/lectures/${id}/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/lectures/${id}/`,
          'en': `${baseUrl}/en/lectures/${id}/`,
          'x-default': `${baseUrl}/fr/lectures/${id}/`,
        },
      },
      openGraph: {
        title: reading.title,
        description: `${reading.author} - ${reading.title}`,
        locale: 'fr_FR',
        type: 'website',
        url: `${baseUrl}/fr/lectures/${id}/`,
      },
    };
  }
  
  return {
    title: `${reading.title} - Olivier Rouiller`,
    description: `${reading.author} - ${reading.title}`,
    canonical: `${baseUrl}/en/lectures/${id}/`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/lectures/${id}/`,
        'en': `${baseUrl}/en/lectures/${id}/`,
        'x-default': `${baseUrl}/fr/lectures/${id}/`,
      },
    },
    openGraph: {
      title: reading.title,
      description: `${reading.author} - ${reading.title}`,
      locale: 'en_US',
      type: 'website',
      url: `${baseUrl}/en/lectures/${id}/`,
    },
  };
}

export default async function ReadingDetailPage({ params }) {
  const { lang, id } = await params;
  const portfolio = getPortfolioData();
  const langData = portfolio[lang] || portfolio.fr;
  const currentLang = lang || 'fr';
  const reading = langData.readings?.find(r => r.id?.toString() === id);
  
  // Show grid if reading not found
  if (!reading) {
    return (
      <Tabs currentLang={currentLang}>
        <AboutTab profile={langData.profile} />
        <LecturesTab readings={langData.readings || []} />
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
      <LecturesTab readings={langData.readings || []} />
      <FormationsTab formations={langData.formations || ''} />
      <ExperienceTab experiences={langData.experiences || []} />
      <ReadingDetail readings={langData.readings || []} currentLang={currentLang} />
      <ContactTab />
    </Tabs>
  );
}

