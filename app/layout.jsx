import './globals.css';

export const metadata = {
  title: 'Olivier Rouiller - Psychologue',
  description: 'Portfolio professionnel d\'Olivier Rouiller, étudiant en psychologie et psychopraticien en formation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

