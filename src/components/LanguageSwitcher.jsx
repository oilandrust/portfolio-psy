import './LanguageSwitcher.css';

const LanguageSwitcher = ({ currentLang, onSwitch }) => {
  const handleSwitch = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    onSwitch(newLang);
  };

  const flagEmoji = currentLang === 'fr' ? '🇫🇷' : '🇬🇧';

  return (
    <button 
      className="language-switcher"
      onClick={handleSwitch}
      aria-label={`Switch to ${currentLang === 'fr' ? 'English' : 'Français'}`}
    >
      <span className="flag-emoji">{flagEmoji}</span>
    </button>
  );
};

export default LanguageSwitcher;
