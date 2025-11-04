'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div style={{
          padding: '2rem',
          margin: '1rem 0',
          border: '1px solid #e74c3c',
          borderRadius: '8px',
          backgroundColor: '#fdf2f2',
          color: '#721c24'
        }}>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: '#e74c3c',
            fontSize: '1.25rem'
          }}>
            ⚠️ Something went wrong
          </h3>
          
          <p style={{ 
            margin: '0 0 1rem 0',
            lineHeight: '1.5'
          }}>
            {this.props.fallbackMessage || 
              'An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.'}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#e74c3c',
                border: '1px solid #e74c3c',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Refresh Page
            </button>
          </div>
          
          {typeof process !== 'undefined' && process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <summary style={{ 
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ 
                fontSize: '0.75rem',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                margin: 0
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
