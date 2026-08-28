import { getPortfolioData } from '../../../lib/portfolio';
import ContactTab from '../../../components/ContactTab';

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
      title: `Contact - ${langData.profile?.title || 'Olivier Rouiller'}`,
      description: 'Contactez Olivier Rouiller',
      canonical: `${baseUrl}/fr/contact/`,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/contact/`,
          en: `${baseUrl}/en/contact/`,
          'x-default': `${baseUrl}/fr/contact/`,
        },
      },
      openGraph: {
        title: 'Contact - Olivier Rouiller',
        description: 'Prenez contact',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/contact/`,
      },
    };
  }

  return {
    title: `Contact - ${langData.profile?.title || 'Olivier Rouiller'}`,
    description: 'Contact Olivier Rouiller',
    canonical: `${baseUrl}/en/contact/`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr/contact/`,
        en: `${baseUrl}/en/contact/`,
        'x-default': `${baseUrl}/fr/contact/`,
      },
    },
    openGraph: {
      title: 'Contact - Olivier Rouiller',
      description: 'Get in touch',
      locale: 'en_US',
      url: `${baseUrl}/en/contact/`,
    },
  };
}

export default async function ContactPage({ params }) {
  return <ContactTab />;
}
