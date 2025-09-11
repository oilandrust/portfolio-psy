const AboutTab = ({ profile }) => {
  return (
    <div className='section'>
      <h2>À propos</h2>
      <div style={{ whiteSpace: 'pre-line' }}>
        {profile?.about || 'Aucune information disponible.'}
      </div>
    </div>
  );
};

export default AboutTab;
