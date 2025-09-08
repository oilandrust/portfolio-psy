// Application constants and configuration

// API and Data Fetching
export const FETCH_STRATEGIES = [
  './data/portfolio.json',
  '/portfolio/data/portfolio.json',
  '/data/portfolio.json',
  'data/portfolio.json',
];

// Media Configuration
export const MEDIA_CONFIG = {
  IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  VIDEO_EXTENSIONS: ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
  THUMBNAIL_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
};

// UI Configuration
export const UI_CONFIG = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
  ANIMATION_DURATION: 200, // ms
  DEBOUNCE_DELAY: 300, // ms
  CAROUSEL_AUTOPLAY_DELAY: 5000, // ms
};

// Styling Constants
export const STYLES = {
  COLORS: {
    PRIMARY: '#2563eb',
    PRIMARY_HOVER: '#1d4ed8',
    SUCCESS: '#059669',
    SUCCESS_HOVER: '#047857',
    ERROR: '#e74c3c',
    WARNING: '#f59e0b',
    MUTED: '#6b7280',
    MUTED_BORDER: '#e2e8f0',
  },
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    XXL: '3rem',
  },
  BORDER_RADIUS: {
    SM: '4px',
    MD: '6px',
    LG: '8px',
    XL: '12px',
  },
  SHADOWS: {
    SM: '0 1px 3px rgba(0, 0, 0, 0.1)',
    MD: '0 4px 12px rgba(0, 0, 0, 0.15)',
    LG: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  FETCH_PROJECTS_FAILED: 'Failed to load portfolio. Please try refreshing the page.',
  MEDIA_LOAD_ERROR: 'Failed to load media. The file may be corrupted or missing.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  FALLBACK_MESSAGES: {
    PROJECTS: 'Unable to load projects. Showing fallback content.',
    MEDIA: 'Media failed to load. Please try again later.',
    COMPONENT: 'This component encountered an error. Please refresh the page.',
  },
};

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Project Configuration
export const PROJECT_CONFIG = {
  DEFAULT_IMAGE_LAYOUT: 'grid',
  MAX_PROJECTS_PER_PAGE: 50,
  SORT_ORDER: 'desc', // 'asc' or 'desc'
  DATE_FORMAT: 'YYYY-MM-DD',
};

// Contact Configuration
export const CONTACT_CONFIG = {
  EMAIL: 'o.rouiller@gmail.com',
  SUBJECT_PREFIX: 'Portfolio Contact: ',
};

// Development Configuration
export const DEV_CONFIG = {
  SHOW_ERROR_DETAILS: typeof process !== 'undefined' && process.env.NODE_ENV === 'development',
  LOG_LEVEL: typeof process !== 'undefined' && process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  ENABLE_PERFORMANCE_MONITORING: typeof process !== 'undefined' && process.env.NODE_ENV === 'development',
};
