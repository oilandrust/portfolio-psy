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
        margin: [10, 10, 10, 10],
        filename: currentLang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
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

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{currentLang === 'en' ? 'Loading CV...' : 'Chargement du CV...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{currentLang === 'en' ? 'Error loading CV' : 'Erreur lors du chargement du CV'}</p>
        <Link href={`/${currentLang}/about`} style={{ marginTop: '1rem', display: 'inline-block' }}>
          {currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'}
        </Link>
      </div>
    );
  }

  const cvData = portfolioData.cv || '';
  const profile = portfolioData.profile || {};

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/${currentLang}/about`} style={{ color: '#6b7280', textDecoration: 'none' }}>
          ← {currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'}
        </Link>
        <button 
          onClick={generatePDF} 
          disabled={isGeneratingPDF}
          className="button primary"
        >
          {isGeneratingPDF 
            ? (currentLang === 'en' ? 'Generating...' : 'Génération...')
            : (currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF')
          }
        </button>
      </div>

      <div 
        ref={cvDocumentRef}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          color: '#000',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src='/data/profile/IMG-20250419-WA0003 (2).jpg'
            alt={profile?.title || 'Olivier Rouiller'}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '1rem'
            }}
          />
          <h1 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{profile?.title || 'Olivier Rouiller'}</h1>
          <p style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: '#666' }}>
            {currentLang === 'en'
              ? 'L3 Psychology Student and Psychotherapist in Training'
              : 'Étudiant en L3 de Psychologie et Psychopraticien en Formation'}
          </p>
          <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            {currentLang === 'en'
              ? `Website: https://www.olivier-psy.fr/`
              : `Site web : https://www.olivier-psy.fr/`}
          </p>
        </div>

        <div style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
          {parseMarkdown(cvData)}
        </div>
      </div>
    </div>
  );
};

export default CVPage;

