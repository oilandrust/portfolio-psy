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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
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

  const generatePDF = async () => {
    if (!cvDocumentRef.current) return;

    setIsGeneratingPDF(true);
    try {
      // Dynamically import html2pdf only on client side
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        filename: currentLang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { useCORS: true, letterRendering: true, scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(cvDocumentRef.current).save();
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert(currentLang === 'en' ? 'Error generating PDF' : 'Erreur lors de la génération du PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const profile = portfolioData.profile || {};
  const cvData = portfolioData.cv || '';

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed actions on the right */}
      <button
        onClick={generatePDF}
        disabled={isGeneratingPDF || loading}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
          opacity: isGeneratingPDF ? 0.7 : 1,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseOver={(e) => {
          if (!isGeneratingPDF) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseOut={(e) => {
          if (!isGeneratingPDF) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
      >
        {isGeneratingPDF ? (
          <>
            <span>⏳</span>
            {currentLang === 'en' ? 'Generating...' : 'Génération...'}
          </>
        ) : (
          <>
            <span>📄</span>
            {currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF'}
          </>
        )}
      </button>

      <Link
        href={`/${currentLang}/about`}
        className="button outline"
        style={{
          position: 'fixed',
          top: '6rem',
          right: '2rem',
          zIndex: 1000,
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'white',
          border: '2px solid var(--primary)',
          color: 'var(--primary)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.backgroundColor = 'var(--primary)';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = 'var(--primary)';
        }}
      >
        <span>←</span>
        {currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'}
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
        <div className='hero' style={{ padding: '1.5rem 1.5rem 0.7rem 1.5rem' }}>
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

