import { useState, useEffect, useCallback, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tabs from './components/Tabs';
import AboutTab from './components/AboutTab';
import InterestsTab from './components/InterestsTab';
import FormationsTab from './components/FormationsTab';
import ExperienceTab from './components/ExperienceTab';
import LecturesTab from './components/LecturesTab';
import ContactTab from './components/ContactTab';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import LanguageSwitcher from './components/LanguageSwitcher';
import CVPage from './pages/CVPage';
import { FETCH_STRATEGIES, ERROR_MESSAGES, LOADING_STATES } from './config/constants.js';
import { handleAsyncOperation, retryOperation, fetchWithTimeout } from './utils/errorHandling.js';

function App() {
  // Fallback portfolio data in case fetch fails
  const fallbackPortfolio = useMemo(() => ({
    profile: {
      title: "Olivier Rouiller",
      subtitle: "Étudiant en L3 de Psychologie en reprise d'études",
      about: "Bonjour, je suis étudiant en Psychologie à l'université de Strasbourg. J'ai un fort intérêt pour la psychothérapie et je souhaite compléter un Master en psychologie clinique pour devenir psychologue."
    },
    interests: [
      {
        id: 1,
        title: "Psychothérapie Somatique",
        description: "Approches thérapeutiques intégrant le corps et l'esprit"
      },
      {
        id: 2,
        title: "Neuropsychologie",
        description: "Compréhension des mécanismes cérébraux en thérapie"
      },
      {
        id: 3,
        title: "Approches Psychodynamiques",
        description: "Exploration des processus inconscients et relationnels"
      },
      {
        id: 4,
        title: "Pleine Conscience",
        description: "Pratiques de méditation et d'attention consciente"
      },
      {
        id: 5,
        title: "Pratiques Relationnelles",
        description: "Développement de compétences thérapeutiques relationnelles"
      },
      {
        id: 6,
        title: "États de Conscience en Psychothérapie",
        description: "Exploration des états modifiés de conscience thérapeutiques"
      }
    ],
    experience: [
      {
        title: "Stagiaire en Psychologie",
        company: "Cabinet de psychothérapie",
        period: "2024 - Présent",
        description: "Observation et participation aux séances de psychothérapie"
      }
    ],
    experiences: [],
    readings: [],
    formations: ''
  }), []);

  // Initialize language from localStorage or default to 'fr'
  const [currentLang, setCurrentLang] = useState(() => {
    const savedLang = localStorage.getItem('portfolio-lang');
    return (savedLang === 'en' || savedLang === 'fr') ? savedLang : 'fr';
  });
  const [portfolioData, setPortfolioData] = useState({ fr: fallbackPortfolio, en: fallbackPortfolio });
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [interests, setInterests] = useState(fallbackPortfolio.interests);
  const [formations, setFormations] = useState(fallbackPortfolio.formations);
  const [experiences, setExperiences] = useState(fallbackPortfolio.experiences || []);
  const [readings, setReadings] = useState(fallbackPortfolio.readings);
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
            
            // Handle both bilingual format (with fr/en) and legacy format
            if (data && data.fr && data.en) {
              // New bilingual format
              setPortfolioData({ fr: data.fr, en: data.en });
              portfolioLoaded = true;
              break;
            } else if (data && data.profile && data.interests && Array.isArray(data.interests)) {
              // Legacy format - use for both languages
              setPortfolioData({ fr: data, en: data });
              portfolioLoaded = true;
              break;
            }
          } catch (strategyError) {
            lastError = strategyError;
            // Continue to next strategy
          }
        }

        if (!portfolioLoaded) {
          throw lastError || new Error(ERROR_MESSAGES.FETCH_INTERESTS_FAILED);
        }
      };

      await retryOperation(fetchStrategy, 2, 1000);
      setLoadingState(LOADING_STATES.SUCCESS);
    } catch (error) {
      const userFriendlyError = await handleAsyncOperation(
        () => Promise.reject(error),
        'fetchPortfolio',
        {
          fallbackMessage: ERROR_MESSAGES.FETCH_INTERESTS_FAILED,
          additionalInfo: { fallbackUsed: true }
        }
      ).catch(e => e);
      
      setError(userFriendlyError);
      setPortfolioData({ fr: fallbackPortfolio, en: fallbackPortfolio });
      setPortfolio(fallbackPortfolio);
      setInterests(fallbackPortfolio.interests);
      setFormations(fallbackPortfolio.formations);
      setExperiences(fallbackPortfolio.experiences || []);
      setReadings(fallbackPortfolio.readings || []);
      setLoadingState(LOADING_STATES.ERROR);
    }
  }, [fallbackPortfolio, currentLang]);

  // Function to switch language
  const switchLanguage = useCallback((lang) => {
    setCurrentLang(lang);
    localStorage.setItem('portfolio-lang', lang);
    const langData = portfolioData[lang] || portfolioData.fr;
    setPortfolio(langData);
    setInterests(langData.interests);
    setFormations(langData.formations || '');
    setExperiences(langData.experiences || []);
    setReadings(langData.readings || []);
  }, [portfolioData]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Update portfolio when language changes
  useEffect(() => {
    if (portfolioData.fr && portfolioData.en) {
      switchLanguage(currentLang);
    }
  }, [currentLang, portfolioData, switchLanguage]);

  // Shared layout component for all tab routes
  const PortfolioLayout = () => (
    <>
      {loadingState === LOADING_STATES.LOADING ? (
        <div className='container'>
          <LoadingSpinner 
            size="large" 
            message="Loading portfolio..." 
          />
        </div>
      ) : (
        <>
          <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.COMPONENT}>
            <Hero profile={portfolio.profile} quotes={portfolio.quotes || []} />
          </ErrorBoundary>

          <div className='container'>
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
                  Showing fallback data. You can try refreshing the page.
                </p>
              </div>
            )}

            <ErrorBoundary fallbackMessage="Unable to load tabs. Please refresh the page.">
              <Tabs>
                <AboutTab profile={portfolio.profile} />
                <InterestsTab interests={interests} />
                <FormationsTab formations={formations} />
                <ExperienceTab experiences={experiences} />
                <LecturesTab readings={readings} />
                <ContactTab />
              </Tabs>
            </ErrorBoundary>

            <Footer />
          </div>
          
          <LanguageSwitcher currentLang={currentLang} onSwitch={switchLanguage} />
        </>
      )}
    </>
  );

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/cv" element={<CVPage />} />
          <Route path="/about" element={<PortfolioLayout />} />
          <Route path="/interests/:id" element={<PortfolioLayout />} />
          <Route path="/interests" element={<PortfolioLayout />} />
          <Route path="/formations" element={<PortfolioLayout />} />
          <Route path="/experience" element={<PortfolioLayout />} />
          <Route path="/lectures/:id" element={<PortfolioLayout />} />
          <Route path="/lectures" element={<PortfolioLayout />} />
          <Route path="/contact" element={<PortfolioLayout />} />
          <Route path="/" element={<Navigate to="/about" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
