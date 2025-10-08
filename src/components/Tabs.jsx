import { useNavigate, useLocation } from 'react-router-dom';

const Tabs = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'about', label: 'À propos', path: '/about' },
    { id: 'interests', label: 'Intérêts', path: '/interests' },
    { id: 'formations', label: 'Formations', path: '/formations' },
    { id: 'experience', label: 'Expérience', path: '/experience' },
    { id: 'lectures', label: 'Lectures', path: '/lectures' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  // Determine active tab based on current path
  // Special handling for interests detail pages (e.g., /interests/1)
  let activeTabIndex;
  if (location.pathname.startsWith('/interests')) {
    // If path is /interests or /interests/:id, activate interests tab
    activeTabIndex = tabs.findIndex(tab => tab.id === 'interests');
  } else {
    activeTabIndex = tabs.findIndex(tab => location.pathname === tab.path);
  }
  const currentTab = activeTabIndex >= 0 ? activeTabIndex : 0;

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${currentTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[currentTab]}
      </div>
    </div>
  );
};

export default Tabs;
