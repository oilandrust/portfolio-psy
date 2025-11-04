'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ currentLang }) => {
  const pathname = usePathname();
  const newLang = currentLang === 'fr' ? 'en' : 'fr';
  const newPath = pathname?.replace(`/${currentLang}`, `/${newLang}`) || `/${newLang}/about`;

  const flagEmoji = currentLang === 'fr' ? '🇫🇷' : '🇬🇧';

  return (
    <Link 
      href={newPath}
      className="language-switcher"
      aria-label={`Switch to ${currentLang === 'fr' ? 'English' : 'Français'}`}
    >
      <span className="flag-emoji">{flagEmoji}</span>
    </Link>
  );
};

export default LanguageSwitcher;
