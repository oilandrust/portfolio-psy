const ExperienceTab = ({ experience = [] }) => {
  return (
    <div className='section'>
      <h2>Expérience</h2>
      {experience.length > 0 ? (
        <div className="experience-list">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.title}</h3>
              <p className="experience-company">{exp.company}</p>
              <p className="experience-period">{exp.period}</p>
              {exp.description && (
                <p className="experience-description">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune expérience disponible.</p>
      )}
    </div>
  );
};

export default ExperienceTab;
