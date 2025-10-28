import { useState, useEffect, useRef } from 'react';
import { parseMarkdown } from '../utils/markdown.jsx';
import { FETCH_STRATEGIES } from '../config/constants.js';
import html2pdf from 'html2pdf.js';

const CVPage = () => {
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

        // Use absolute paths that work from any route
        const cvFetchStrategies = [
          '/data/portfolio.json',
          './data/portfolio.json',
          'data/portfolio.json',
        ];

        for (const strategy of cvFetchStrategies) {
          try {
            console.log(`Trying to fetch CV data from: ${strategy}`);
            const response = await fetch(strategy);
            
            if (!response.ok) {
              console.log(`Failed to fetch ${strategy}: ${response.status} ${response.statusText}`);
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Handle both bilingual format (with fr/en) and legacy format
            if (data && data.fr && data.en) {
              // Bilingual format - default to French
              setPortfolio(data.fr);
              dataLoaded = true;
              console.log(`Successfully loaded CV data from: ${strategy}`);
              break;
            } else if (data && data.cv) {
              // Legacy format
              setPortfolio(data);
              dataLoaded = true;
              console.log(`Successfully loaded CV data from: ${strategy}`);
              break;
            } else {
              console.log(`No CV data found in response from: ${strategy}`);
            }
          } catch (strategyError) {
            console.log(`Error fetching from ${strategy}:`, strategyError.message);
            lastError = strategyError;
            // Continue to next strategy
          }
        }

        if (!dataLoaded) {
          throw lastError || new Error('Failed to load CV data');
        }
        } catch (error) {
          setError(error);
          setPortfolio({}); // Set empty data on error
        } finally {
        setLoading(false);
      }
    };

    fetchCVData();
  }, []);

  const generatePDF = async () => {
    if (!cvDocumentRef.current) return;

    setIsGeneratingPDF(true);
    
    try {
      const opt = {
        filename: 'CV_Olivier_Rouiller.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(cvDocumentRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Download PDF Button - Fixed to the right */}
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
          fontWeight: '600',
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
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseOut={(e) => {
          if (!isGeneratingPDF) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
      >
        {isGeneratingPDF ? (
          <>
            <span>⏳</span>
            Génération...
          </>
        ) : (
          <>
            <span>📄</span>
            Télécharger PDF
          </>
        )}
      </button>

      {/* Back to Portfolio Link - Fixed below the download button */}
      <a 
        href="#/" 
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
          fontWeight: '600',
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
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
          e.target.style.backgroundColor = 'var(--primary)';
          e.target.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          e.target.style.backgroundColor = 'white';
          e.target.style.color = 'var(--primary)';
        }}
      >
        <span>←</span>
        Retour au portfolio
      </a>

      <div 
        ref={cvDocumentRef}
        style={{ 
          maxWidth: '794px', // A4 width in pixels at 96 DPI
          margin: '0 auto',
          backgroundColor: 'white',
          minHeight: '100vh',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' // Optional: add shadow to simulate document
        }}
      >
        <style>{`
         
        `}</style>
      <div className='hero' style={{ 
          padding: '1.5rem 1.5rem 0.7rem 1.5rem'
        }}>
        <div style={{ 
          maxWidth: '794px', 
          margin: '0 auto', 
          padding: '1.5rem 1.5rem 1.5rem 1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            {/* Left side - Profile and basic info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                flexShrink: 0,
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src='/data/profile/IMG-20250419-WA0003 (2).jpg'
                  alt="Olivier Rouiller"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ 
                  fontSize: '1.0rem', 
                  fontWeight: '700', 
                  margin: '0 0 0.25rem 0',
                  lineHeight: '1.2'
                }}>
                  Olivier Rouiller
                </h1>
                <p style={{ 
                  fontSize: '0.875rem', 
                  margin: '0',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.3'
                }}>
                  Étudiant en L3 de Psychologie et Psychopraticien en Formation
                </p>
              </div>
            </div>
            
            {/* Right side - Contact Information */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '0.25rem',
              textAlign: 'right',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                  14 rue Saint Erhard<br />67100 Strasbourg
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <span style={{ 
                  textDecoration: 'none',
                  fontSize: '0.75rem'
                }}>
                  06 62 91 32 03
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <a 
                  href="mailto:o.rouiller@gmail.com"
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontSize: '0.75rem'
                  }}
                >
                  o.rouiller@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <a 
                  href="https://www.olivier-psy.fr/"
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none',
                    fontSize: '0.75rem'
                  }}
                >
                  Portfolio: olivier-psy.fr
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        maxWidth: '794px', 
        margin: '0 auto', 
        padding: '0 4rem 4rem 4rem'
      }}>
        {/* CV Content Section */}
        <div style={{ 
          marginTop: '2rem',
          padding: '0',
          border: 'none'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Chargement du CV...</p>
            </div>
          ) : error ? (
            <div style={{ 
              padding: '1rem',
              margin: '1rem 0',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#991b1b'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                ⚠️ Erreur lors du chargement du CV
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                Impossible de charger le contenu du CV. Veuillez réessayer plus tard.
              </p>
            </div>
          ) : (
            <div style={{ fontSize: '0.7rem', lineHeight: '1.4' }}>
              {parseMarkdown(portfolioData.cv || '')}
            </div>
          )}
        </div>

      </div>
      </div>
    </div>
  );
};

export default CVPage;