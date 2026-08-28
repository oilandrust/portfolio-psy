'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({ currentLang, profile }) => {
  const pathname = usePathname();

  const navItems = [
    { id: 'articles', labelFr: 'Articles', labelEn: 'Articles', path: `/${currentLang}/articles` },
    { id: 'lectures', labelFr: 'Lectures', labelEn: 'Readings', path: `/${currentLang}/lectures` },
    { id: 'contact', labelFr: 'Contact', labelEn: 'Contact', path: `/${currentLang}/contact` },
  ];

  const isActive = (item) => {
    if (item.id === 'home') {
      return pathname === `/${currentLang}` || pathname === `/${currentLang}/`;
    }
    return pathname?.startsWith(item.path);
  };

  const homeItem = {
    id: 'home',
    labelFr: profile?.title?.split(' ')[0] || 'Accueil',
    labelEn: profile?.title?.split(' ')[0] || 'Home',
    path: `/${currentLang}/`,
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link
          href={homeItem.path}
          className={`navbar-brand ${isActive(homeItem) ? 'active' : ''}`}
        >
          {profile?.title || (currentLang === 'fr' ? 'Accueil' : 'Home')}
        </Link>
        <div className="navbar-links">
          {navItems.map((item) => {
            const label = currentLang === 'fr' ? item.labelFr : item.labelEn;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`navbar-link ${isActive(item) ? 'active' : ''}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
