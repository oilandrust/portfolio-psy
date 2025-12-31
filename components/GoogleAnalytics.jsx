'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_MEASUREMENT_ID = 'G-FNBWP8C58K';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip initial mount to avoid duplicate tracking (initial page load is already tracked)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Check if tracking is excluded
    if (typeof window === 'undefined') return;
    
    const isExcluded = localStorage.getItem('ga_exclude') === 'true';
    if (isExcluded) return;

    // Wait for gtag to be available (it loads asynchronously)
    const sendPageView = () => {
      if (!window.gtag || typeof window.gtag !== 'function') {
        // If gtag is not ready, try again after a short delay
        setTimeout(sendPageView, 100);
        return;
      }

      // Get the current URL
      const url = window.location.pathname + window.location.search;

      // Send pageview event
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    sendPageView();
  }, [pathname]);

  return null;
}

