'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tabs = ({ children, currentLang }) => {
  const pathname = usePathname();
  
  const tabs = [
    { id: 'about', labelFr: 'À propos', labelEn: 'About', path: `/${currentLang}/about` },
    { id: 'interests', labelFr: 'Intérêts', labelEn: 'Interests', path: `/${currentLang}/interests` },
    { id: 'formations', labelFr: 'Formations', labelEn: 'Education', path: `/${currentLang}/formations` },
    { id: 'experience', labelFr: 'Expérience', labelEn: 'Experience', path: `/${currentLang}/experience` },
    { id: 'lectures', labelFr: 'Lectures', labelEn: 'Readings', path: `/${currentLang}/lectures` },
    { id: 'contact', labelFr: 'Contact', labelEn: 'Contact', path: `/${currentLang}/contact` }
  ];

  // Determine active tab based on current path
  let activeTabIndex = 0;
  if (pathname?.startsWith(`/${currentLang}/interests`)) {
    activeTabIndex = tabs.findIndex(tab => tab.id === 'interests');
  } else if (pathname?.startsWith(`/${currentLang}/lectures`)) {
    activeTabIndex = tabs.findIndex(tab => tab.id === 'lectures');
  } else if (pathname?.startsWith(`/${currentLang}/formations`)) {
    activeTabIndex = tabs.findIndex(tab => tab.id === 'formations');
  } else if (pathname?.startsWith(`/${currentLang}/experience`)) {
    activeTabIndex = tabs.findIndex(tab => tab.id === 'experience');
  } else if (pathname?.startsWith(`/${currentLang}/contact`)) {
    activeTabIndex = tabs.findIndex(tab => tab.id === 'contact');
  } else {
    // Default to about tab
    activeTabIndex = tabs.findIndex(tab => tab.id === 'about');
  }
  
  const currentTab = activeTabIndex >= 0 ? activeTabIndex : 0;

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => {
          const label = currentLang === 'fr' ? tab.labelFr : tab.labelEn;
          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={`tab-button ${currentTab === index ? 'active' : ''}`}
              scroll={false}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="tab-content">
        {children[currentTab]}
      </div>
    </div>
  );
};

export default Tabs;
