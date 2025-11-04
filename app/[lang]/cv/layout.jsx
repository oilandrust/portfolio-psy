export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (lang === 'fr') {
    return {
      title: 'CV - Olivier Rouiller',
      description: 'CV complet d\'Olivier Rouiller, étudiant en L3 de psychologie et psychopraticien en formation',
      canonical: 'https://www.olivier-psy.fr/fr/cv',
      openGraph: {
        title: 'CV - Olivier Rouiller',
        description: 'CV complet - Olivier Rouiller',
        locale: 'fr_FR',
        url: 'https://www.olivier-psy.fr/fr/cv',
      },
    };
  }
  
  return {
    title: 'CV - Olivier Rouiller',
  };
}

export default function CVLayout({ children }) {
  return children;
}

