import { ERROR_MESSAGES, DEV_CONFIG } from '../config/constants.js';

/**
 * Logs errors with appropriate level based on environment
 * @param {Error} error - The error to log
 * @param {string} context - Context where the error occurred
 * @param {Object} additionalInfo - Additional information to log
 */
export const logError = (error, context = 'Unknown', additionalInfo = {}) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    ...additionalInfo,
  };

  if (DEV_CONFIG.LOG_LEVEL === 'debug') {
    console.group(`🚨 Error in ${context}`);
    console.error('Error:', error);
    console.error('Additional Info:', additionalInfo);
    console.error('Full Error Info:', errorInfo);
    console.groupEnd();
  } else {
    console.error(`Error in ${context}:`, error.message);
  }

  // In production, you might want to send this to an error tracking service
  // Example: Sentry.captureException(error, { extra: errorInfo });
};

/**
 * Creates a user-friendly error message
 * @param {Error} error - The original error
 * @param {string} fallbackMessage - Fallback message if error type is unknown
 * @returns {string} User-friendly error message
 */
export const createUserFriendlyMessage = (error, fallbackMessage = ERROR_MESSAGES.GENERIC_ERROR) => {
  if (!error) return fallbackMessage;

  // Network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Media loading errors
  if (error.name === 'MediaError' || error.message.includes('media')) {
    return ERROR_MESSAGES.MEDIA_LOAD_ERROR;
  }

  // Return the original message if it's user-friendly, otherwise use fallback
  return error.message && error.message.length < 100 ? error.message : fallbackMessage;
};

/**
 * Handles async operations with proper error handling
 * @param {Function} asyncFn - The async function to execute
 * @param {string} context - Context for error logging
 * @param {Object} options - Options for error handling
 * @returns {Promise} Promise that resolves with result or rejects with handled error
 */
export const handleAsyncOperation = async (asyncFn, context, options = {}) => {
  try {
    return await asyncFn();
  } catch (error) {
    logError(error, context, options.additionalInfo);
    
    // Create user-friendly error
    const userFriendlyError = new Error(
      createUserFriendlyMessage(error, options.fallbackMessage)
    );
    userFriendlyError.originalError = error;
    userFriendlyError.context = context;
    
    throw userFriendlyError;
  }
};

/**
 * Retry mechanism for failed operations
 * @param {Function} operation - The operation to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Promise that resolves with result or rejects after max retries
 */
export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        logError(error, 'RetryOperation', { 
          maxRetries, 
          finalAttempt: true 
        });
        break;
      }
      
      logError(error, 'RetryOperation', { 
        attempt, 
        maxRetries, 
        willRetry: true 
      });
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};

/**
 * Validates if an error is a network error
 * @param {Error} error - The error to check
 * @returns {boolean} True if it's a network error
 */
export const isNetworkError = (error) => {
  return (
    error.name === 'TypeError' && 
    (error.message.includes('fetch') || error.message.includes('network'))
  );
};

/**
 * Validates if an error is a timeout error
 * @param {Error} error - The error to check
 * @returns {boolean} True if it's a timeout error
 */
export const isTimeoutError = (error) => {
  return error.name === 'TimeoutError' || error.message.includes('timeout');
};

/**
 * Creates a timeout promise that rejects after specified time
 * @param {number} ms - Timeout in milliseconds
 * @param {string} message - Timeout message
 * @returns {Promise} Promise that rejects after timeout
 */
export const createTimeout = (ms, message = 'Operation timed out') => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const timeoutError = new Error(message);
      timeoutError.name = 'TimeoutError';
      reject(timeoutError);
    }, ms);
  });
};

/**
 * Wraps a fetch operation with timeout and error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise} Promise that resolves with response or rejects with error
 */
export const fetchWithTimeout = async (url, options = {}, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`Request to ${url} timed out after ${timeoutMs}ms`);
      timeoutError.name = 'TimeoutError';
      throw timeoutError;
    }
    
    throw error;
  }
};
