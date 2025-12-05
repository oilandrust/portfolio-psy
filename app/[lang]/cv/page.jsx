'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { parseMarkdown } from '../../../utils/markdown.jsx';
import Link from 'next/link';

const CVPage = () => {
  const params = useParams();
  const currentLang = params?.lang || 'fr';
  const [portfolioData, setPortfolio] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cvDocumentRef = useRef(null);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        setLoading(true);
        setError(null);

        let dataLoaded = false;
        let lastError = null;

        const cvFetchStrategies = [
          '/data/portfolio.json',
          './data/portfolio.json',
          'data/portfolio.json',
        ];

        for (const strategy of cvFetchStrategies) {
          try {
            const response = await fetch(strategy);
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.fr && data.en) {
              const langData = data[currentLang] || data.fr;
              setPortfolio(langData);
              dataLoaded = true;
              break;
            } else if (data && data.cv) {
              setPortfolio(data);
              dataLoaded = true;
              break;
            }
          } catch (strategyError) {
            lastError = strategyError;
          }
        }

        if (!dataLoaded) {
          throw lastError || new Error('Failed to load CV data');
        }
      } catch (error) {
        setError(error);
        setPortfolio({});
      } finally {
        setLoading(false);
      }
    };

    fetchCVData();
  }, [currentLang]);

  const handleDownloadPDF = () => {
    const pdfUrl = currentLang === 'en' ? '/CV_Olivier_Rouiller_EN.pdf' : '/CV_Olivier_Rouiller.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = currentLang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const profile = portfolioData.profile || {};
  const cvData = portfolioData.cv || '';

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed actions on the right */}
      <button
        onClick={handleDownloadPDF}
        disabled={loading}
        aria-label={currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF'}
        title={currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF'}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          backgroundColor: 'white',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#666',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.color = '#333';
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#666';
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>

      <Link
        href={`/${currentLang}/about`}
        aria-label={currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'}
        title={currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'}
        style={{
          position: 'fixed',
          top: '6rem',
          right: '2rem',
          zIndex: 1000,
          textDecoration: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#666',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          padding: 0
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.color = '#333';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#666';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
      </Link>

      {/* Document container */}
      <div 
        ref={cvDocumentRef}
        style={{ 
          maxWidth: '794px',
          margin: '0 auto',
          backgroundColor: 'white',
          minHeight: '100vh',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div className='hero cv-hero' style={{ padding: '1.5rem 1.5rem 0.7rem 1.5rem' }}>
          <div style={{ maxWidth: '794px', margin: '0 auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              {/* Left - avatar and name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <img
                    src='/data/profile/IMG-20250419-WA0003 (2).jpg'
                    alt={profile?.title || 'Olivier Rouiller'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem 0', lineHeight: '1.2' }}>
                    {profile?.title || 'Olivier Rouiller'}
                  </h1>
                  <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                    {currentLang === 'en'
                      ? 'L3 Psychology Student and Psychotherapist in Training'
                      : 'Étudiant en L3 de Psychologie et Psychopraticien en Formation'}
                  </p>
                </div>
              </div>
              {/* Right - contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'right', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                    14 rue Saint Erhard<br />67100 Strasbourg
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <span style={{ textDecoration: 'none', fontSize: '0.75rem' }}>
                    06 62 91 32 03
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <a href='mailto:o.rouiller@gmail.com' style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.75rem' }}>
                    o.rouiller@gmail.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <a href='https://www.olivier-psy.fr/' style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.75rem' }}>
                    Portfolio: olivier-psy.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CV content */}
        <div style={{ maxWidth: '794px', margin: '0 auto', padding: '0 4rem 4rem 4rem' }}>
          <div style={{ marginTop: '2rem', padding: 0, border: 'none' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>{currentLang === 'en' ? 'Loading CV...' : 'Chargement du CV...'}</p>
              </div>
            ) : error ? (
              <div style={{ padding: '1rem', margin: '1rem 0', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#991b1b' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                  ⚠️ {currentLang === 'en' ? 'Error loading CV' : 'Erreur lors du chargement du CV'}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  {currentLang === 'en' 
                    ? 'Unable to load CV content. Please try again later.'
                    : 'Impossible de charger le contenu du CV. Veuillez réessayer plus tard.'}
                </p>
              </div>
            ) : (
              <div style={{ fontSize: '0.7rem', lineHeight: '1.4' }}>
                {parseMarkdown(cvData)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;

