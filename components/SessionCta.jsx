const RECONNECTED_URL = 'https://re-connected.fr';

const SessionCta = ({ currentLang = 'fr' }) => {
  const label =
    currentLang === 'en'
      ? 'Curious about somatic therapies? Try a session'
      : 'Curieux des thérapies somatiques ? Essayer une séance';

  return (
    <div className="session-cta">
      <a
        href={RECONNECTED_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="session-cta-link"
      >
        {label}
      </a>
    </div>
  );
};

export default SessionCta;
