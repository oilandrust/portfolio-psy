import ProjectCard from './ProjectCard';

const ProjectsList = ({ projects }) => {
  // Group projects by year
  const groupProjectsByYear = projects => {
    const grouped = {};

    projects.forEach(project => {
      const year = project.end_date
        ? new Date(project.end_date).getFullYear()
        : 'Ongoing';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(project);
    });

    // Sort projects within each year by end_date (most recent first)
    Object.keys(grouped).forEach(year => {
      grouped[year].sort((a, b) => {
        if (!a.end_date && !b.end_date) return 0;
        if (!a.end_date) return 1;
        if (!b.end_date) return -1;
        return new Date(b.end_date) - new Date(a.end_date);
      });
    });

    // Sort years in descending order (newest first) and ensure proper order
    const sortedYears = Object.keys(grouped).sort((a, b) => {
      if (a === 'Ongoing') return -1;
      if (b === 'Ongoing') return -1;
      return parseInt(b) - parseInt(a);
    });

    // Create ordered result object
    const result = {};
    sortedYears.forEach(year => {
      result[year] = grouped[year];
    });

    return result;
  };

  const groupedProjects = groupProjectsByYear(projects);
  const sortedYears = Object.keys(groupedProjects).sort((a, b) => {
    if (a === 'Ongoing') return -1;
    if (b === 'Ongoing') return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <div className='section'>
      <div
        className='projects-grid'
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        {sortedYears.map(year => (
          <div key={year}>
            <h3
              style={{
                fontSize: '1.5rem',
                color: '#000000',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
              }}
            >
              {year}
            </h3>
            {groupedProjects[year].map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
