import { useState, useEffect } from 'react';
import ProjectsList from './components/ProjectsList';
import Hero from './components/Hero';
import Contact from './components/Contact';

function App() {
  // Fallback projects in case fetch fails
  const fallbackProjects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description:
        'A modern React portfolio built with Vite and Pico CSS, featuring responsive design and dynamic project showcase.',
      tech: [
        {
          name: 'React',
          icon: '/portfolio/icons/javascript.svg',
          iconType: 'svg',
        },
        { name: 'Vite', icon: null, iconType: null },
        { name: 'CSS', icon: null, iconType: null },
        {
          name: 'JavaScript',
          icon: '/portfolio/icons/javascript.svg',
          iconType: 'svg',
        },
      ],
      images: [],
      start_date: '2024-07-01',
      end_date: '2024-08-24',
    },
    {
      id: 2,
      title: 'Project Management Tool',
      description:
        'Internal tool for managing portfolio projects with SQLite database and JSON export functionality.',
      tech: [
        {
          name: 'Node.js',
          icon: '/portfolio/icons/javascript.svg',
          iconType: 'svg',
        },
        { name: 'Express', icon: null, iconType: null },
        { name: 'SQLite', icon: null, iconType: null },
        {
          name: 'React',
          icon: '/portfolio/icons/javascript.svg',
          iconType: 'svg',
        },
      ],
      images: [],
      start_date: '2024-08-01',
      end_date: '2024-08-24',
    },
    {
      id: 3,
      title: 'Simple Project',
      images: [],
      start_date: '2024-09-01',
      end_date: '2024-10-15',
    },
    {
      id: 4,
      title: 'Minimal Project',
      images: [],
      start_date: '2024-11-01',
    },
  ];

  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Try multiple fetch strategies for better compatibility
      const fetchStrategies = [
        './projects.json',
        '/portfolio/projects.json',
        '/projects.json',
        'projects.json',
      ];

      let projectsLoaded = false;

      for (const strategy of fetchStrategies) {
        try {
          const response = await fetch(strategy);

          if (response.ok) {
            const data = await response.json();
            setProjects(data);
            projectsLoaded = true;
            break;
          }
        } catch (strategyError) {
          // Silently continue to next strategy
        }
      }

      if (!projectsLoaded) {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      // Fallback to default projects on any error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='container'>Loading...</div>;
  }

  return (
    <div className='App'>
      <Hero />

      <div className='container'>
        <div className='section'>
          <h2>About</h2>
          <p>
            Hi, I'm Olivier, I live in Strasbourg, France, and before I lived
            around Europe in Germany and Sweden. I worked as a developer for 10
            years and I've worked in a few companies and had some pojects. This
            pages showcases a few of them with some details about how I
            approached working on those and the technologies I used.
          </p>
          <p>
            Right now I study Psychology to become a Psychotherapist, but I
            might be able to contribute to some new projects. Feel free to get
            in touch if you have some curiosity.
          </p>
        </div>

        <ProjectsList projects={projects} />

        <Contact />
      </div>
    </div>
  );
}

export default App;
