import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects }) => {
  // Group projects by date range
  const groupProjectsByPeriod = projects => {
    const grouped = {};

    projects.forEach(project => {
      let periodKey;
      
      if (!project.start_date && !project.end_date) {
        periodKey = 'Ongoing';
      } else if (!project.end_date) {
        // Only start date, treat as ongoing
        periodKey = 'Ongoing';
      } else {
        const startYear = project.start_date ? new Date(project.start_date).getFullYear() : null;
        const endYear = new Date(project.end_date).getFullYear();
        
        if (startYear && startYear !== endYear) {
          // Project spans multiple years
          periodKey = `${startYear} - ${endYear}`;
        } else {
          // Project is within a single year
          periodKey = endYear.toString();
        }
      }
      
      if (!grouped[periodKey]) {
        grouped[periodKey] = [];
      }
      grouped[periodKey].push(project);
    });

    // Sort projects within each period by end_date (most recent first)
    Object.keys(grouped).forEach(period => {
      grouped[period].sort((a, b) => {
        if (!a.end_date && !b.end_date) return 0;
        if (!a.end_date) return 1;
        if (!b.end_date) return -1;
        return new Date(b.end_date) - new Date(a.end_date);
      });
    });

    // Sort periods in descending order (newest first)
    const sortedPeriods = Object.keys(grouped).sort((a, b) => {
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

  const groupedProjects = groupProjectsByPeriod(projects);
  const sortedPeriods = Object.keys(groupedProjects).sort((a, b) => {
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

  return (
    <div className='section'>
      <div
        className='projects-grid'
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
              {groupedProjects[period].map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
