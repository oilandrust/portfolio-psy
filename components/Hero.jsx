'use client';

import { useState } from 'react';
import Link from 'next/link';

const Hero = ({ profile, quotes = [], currentLang = 'fr' }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className='hero'>
      <div className='container'>
        <div className='hero-profile'>
          <img
            src='/data/profile/IMG-20250419-WA0003 (2).jpg'
            alt={profile?.title || 'John Doe'}
          />
        </div>
        <div className='hero-content'>
          <h1>{profile?.title || 'John Doe'}</h1>
          <p>{profile?.subtitle || 'Full Stack Developer'}</p>
          <Link href={`/${currentLang}/cv`} className="button primary">
            CV Complet
          </Link>
        </div>
      </div>
      {quotes.length > 0 && (
        <div className='hero-quote'>
          <div className='container'>
            <div className='quote-carousel'>
              <button 
                className='quote-nav quote-nav-left' 
                onClick={prevQuote}
                aria-label="Quote précédente"
              >
                ‹
              </button>
              <blockquote className='quote-content'>
                <p className='quote-text'>
                  "{currentQuote?.text}"
                </p>
                <cite className='quote-author'>— {currentQuote?.author}</cite>
              </blockquote>
              <button 
                className='quote-nav quote-nav-right' 
                onClick={nextQuote}
                aria-label="Quote suivante"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
