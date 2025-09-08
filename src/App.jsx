import { useState, useEffect, useCallback, useMemo } from 'react';
import ProjectsList from './components/ProjectsList';
import Hero from './components/Hero';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { FETCH_STRATEGIES, ERROR_MESSAGES, LOADING_STATES } from './config/constants.js';
import { handleAsyncOperation, retryOperation, fetchWithTimeout } from './utils/errorHandling.js';

function App() {
  // Fallback portfolio data in case fetch fails
  const fallbackPortfolio = useMemo(() => ({
    profile: {
      title: "John Doe",
      subtitle: "Full Stack Developer",
      about: "Hi, I'm John, a passionate full stack developer with experience in modern web technologies. I enjoy building scalable applications and solving complex problems through clean, efficient code.\n\nThis portfolio showcases some of my recent projects and the technologies I've worked with. Feel free to get in touch if you'd like to collaborate or have any questions."
    },
    projects: [
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
    ]
  }), []);

  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [projects, setProjects] = useState(fallbackPortfolio.projects);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.LOADING);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    setLoadingState(LOADING_STATES.LOADING);
    setError(null);

    try {
      const fetchStrategy = async () => {
        let portfolioLoaded = false;
        let lastError = null;

        for (const strategy of FETCH_STRATEGIES) {
          try {
            const response = await fetchWithTimeout(strategy, {}, 5000);
            const data = await response.json();
            
            if (data && data.profile && data.projects && Array.isArray(data.projects)) {
              setPortfolio(data);
              setProjects(data.projects);
              portfolioLoaded = true;
              break;
            }
          } catch (strategyError) {
            lastError = strategyError;
            // Continue to next strategy
          }
        }

        if (!portfolioLoaded) {
          throw lastError || new Error(ERROR_MESSAGES.FETCH_PROJECTS_FAILED);
        }
      };

      await retryOperation(fetchStrategy, 2, 1000);
      setLoadingState(LOADING_STATES.SUCCESS);
    } catch (error) {
      const userFriendlyError = await handleAsyncOperation(
        () => Promise.reject(error),
        'fetchPortfolio',
        {
          fallbackMessage: ERROR_MESSAGES.FETCH_PROJECTS_FAILED,
          additionalInfo: { fallbackUsed: true }
        }
      ).catch(e => e);
      
      setError(userFriendlyError);
      setPortfolio(fallbackPortfolio);
      setProjects(fallbackPortfolio.projects);
      setLoadingState(LOADING_STATES.ERROR);
    }
  }, [fallbackPortfolio]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  if (loadingState === LOADING_STATES.LOADING) {
    return (
      <div className='container'>
        <LoadingSpinner 
          size="large" 
          message="Loading portfolio..." 
        />
      </div>
    );
  }

  return (
    <div className='App'>
      <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.COMPONENT}>
        <Hero profile={portfolio.profile} />
      </ErrorBoundary>

      <div className='container'>
        <ErrorBoundary fallbackMessage="Unable to load about section. Please refresh the page.">
          <div className='section'>
            <h2>About</h2>
            <div style={{ whiteSpace: 'pre-line' }}>
              {portfolio.profile.about}
            </div>
          </div>
        </ErrorBoundary>

        {error && (
          <div style={{
            padding: '1rem',
            margin: '1rem 0',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#991b1b'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
              ⚠️ {error.message}
            </p>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Showing fallback projects. You can try refreshing the page.
            </p>
          </div>
        )}

        <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.PROJECTS}>
          <ProjectsList projects={projects} />
        </ErrorBoundary>

        <ErrorBoundary fallbackMessage="Unable to load contact section. Please refresh the page.">
          <Contact />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
