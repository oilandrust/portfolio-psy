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
        {/* Google Analytics - Excludes tracking if exclusion flag is set */}
        <Script id="google-analytics-check" strategy="afterInteractive">
          {`
            // Check for exclusion flag in localStorage or URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const excludeParam = urlParams.get('exclude');
            
            // Handle URL parameter to enable/disable tracking
            if (excludeParam === 'true') {
              localStorage.setItem('ga_exclude', 'true');
            } else if (excludeParam === 'false') {
              localStorage.removeItem('ga_exclude');
            }
            
            // Check current exclusion state (after potential updates)
            const isExcluded = typeof window !== 'undefined' && localStorage.getItem('ga_exclude') === 'true';
            
            // Only load and initialize GA if not excluded
            if (!isExcluded) {
              // Load the gtag.js script
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
              document.head.appendChild(script);
              
              // Initialize GA
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
              window.gtag = gtag;
            } else {
              // Override gtag to be a no-op if excluded
              window.gtag = function() {};
              window.dataLayer = [];
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

