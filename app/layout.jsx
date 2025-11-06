import './globals.css';

export const metadata = {
  title: 'Olivier Rouiller - Etudiant en Psychologie',
  description: 'Portfolio professionnel d\'Olivier Rouiller, étudiant en psychologie et psychopraticien en formation',
  icons: {
    icon: '/O.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

