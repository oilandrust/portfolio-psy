import { useState } from 'react';

const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: 'about', label: 'À propos' },
    { id: 'interests', label: 'Intérêts' },
    { id: 'formations', label: 'Formations' },
    { id: 'experience', label: 'Expérience' },
    { id: 'lectures', label: 'Lectures' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
