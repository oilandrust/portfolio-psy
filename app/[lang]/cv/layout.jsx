export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const baseUrl = 'https://www.olivier-psy.fr';
  
  if (lang === 'fr') {
    return {
      title: 'CV - Olivier Rouiller',
      description: 'CV complet d\'Olivier Rouiller, étudiant en L3 de psychologie et psychopraticien en formation',
      canonical: `${baseUrl}/fr/cv/`,
      alternates: {
        languages: {
          'fr': `${baseUrl}/fr/cv/`,
          'en': `${baseUrl}/en/cv/`,
          'x-default': `${baseUrl}/fr/cv/`,
        },
      },
      openGraph: {
        title: 'CV - Olivier Rouiller',
        description: 'CV complet - Olivier Rouiller',
        locale: 'fr_FR',
        url: `${baseUrl}/fr/cv/`,
      },
    };
  }
  
  return {
    title: 'CV - Olivier Rouiller',
    description: 'Complete CV of Olivier Rouiller, Psychology student and psychotherapist in training',
    canonical: `${baseUrl}/en/cv/`,
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/cv/`,
        'en': `${baseUrl}/en/cv/`,
        'x-default': `${baseUrl}/fr/cv/`,
      },
    },
    openGraph: {
      title: 'CV - Olivier Rouiller',
      description: 'Complete CV - Olivier Rouiller',
      locale: 'en_US',
      url: `${baseUrl}/en/cv/`,
    },
  };
}

export default function CVLayout({ children }) {
  return children;
}

