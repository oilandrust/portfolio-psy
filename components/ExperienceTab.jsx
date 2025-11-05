import { parseMarkdown } from '../utils/markdown.jsx';

const ExperienceTab = ({ experiences = [] }) => {
  // Group experiences by date range (similar to projects)
  const groupExperiencesByPeriod = experiences => {
    const grouped = {};

    experiences.forEach(experience => {
      let periodKey;
      
      if (!experience.start_date && !experience.end_date) {
        periodKey = 'Ongoing';
      } else if (!experience.end_date) {
        // Only start date, treat as ongoing
        periodKey = 'En cours';
      } else {
        const startYear = experience.start_date ? new Date(experience.start_date).getFullYear() : null;
        const endYear = new Date(experience.end_date).getFullYear();
        
        if (startYear && startYear !== endYear) {
          // Experience spans multiple years
          periodKey = `${startYear} - ${endYear}`;
        } else {
          // Experience is within a single year
          periodKey = endYear.toString();
        }
      }
      
      if (!grouped[periodKey]) {
        grouped[periodKey] = [];
      }
      grouped[periodKey].push(experience);
    });

    // Sort experiences within each period by start_date (most recent first)
    Object.keys(grouped).forEach(period => {
      grouped[period].sort((a, b) => {
        if (!a.start_date && !b.start_date) return 0;
        if (!a.start_date) return 1;
        if (!b.start_date) return -1;
        return new Date(b.start_date) - new Date(a.start_date);
      });
    });

    // Sort periods in descending order (newest first)
    const sortedPeriods = Object.keys(grouped).sort((a, b) => {
      if (a === 'En cours') return -1;
      if (b === 'En cours') return -1;
      if (a === 'Ongoing') return -1;
      if (b === 'Ongoing') return -1;
      
      // Extract the end year from the period string for comparison
      const getEndYear = (period) => {
        if (period.includes(' - ')) {
          return parseInt(period.split(' - ')[1]);
        }
        return parseInt(period);
      };
      
      return getEndYear(b) - getEndYear(a);
    });

    // Create ordered result object
    const result = {};
    sortedPeriods.forEach(period => {
      result[period] = grouped[period];
    });

    return result;
  };

  const groupedExperiences = groupExperiencesByPeriod(experiences);
  const sortedPeriods = Object.keys(groupedExperiences).sort((a, b) => {
    if (a === 'En cours') return -1;
    if (b === 'En cours') return -1;
    if (a === 'Ongoing') return -1;
    if (b === 'Ongoing') return -1;
    
    // Extract the end year from the period string for comparison
    const getStartYear = (period) => {
      if (period.includes(' - ')) {
        return parseInt(period.split(' - ')[0]);
      }
      return parseInt(period);
    };
    
    return getStartYear(b) - getStartYear(a);
  });

  return (
    <div className='section'>
      <h2>Expérience</h2>
      {experiences.length > 0 ? (
        <div
          className='experiences-grid'
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {sortedPeriods.map(period => (
            <div key={period}>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#000000',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                }}
              >
                {period}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {groupedExperiences[period].map((experience) => (
                  <div key={experience.id} className="experience-item">
                    <div className="experience-header">
                      <h4 className="experience-title">{experience.title}</h4>
                      <div className="experience-meta">
                        <span className="experience-subtitle">{experience.subtitle}</span>
                      </div>
                    </div>
        
                    {experience.description && (
                      <div className="experience-description">
                        {parseMarkdown(experience.description)}
                      </div>
                    )}

                  </div>
                ))}
              </div>
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
