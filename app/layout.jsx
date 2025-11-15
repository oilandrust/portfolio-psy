import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Olivier Rouiller - Etudiant en Psychologie',
  description: 'Portfolio professionnel d\'Olivier Rouiller, étudiant en psychologie et psychopraticien en formation',
  icons: {
    icon: '/O.svg',
  },
};

const GA_MEASUREMENT_ID = 'G-FNBWP8C58K';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

