import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (import.meta.env.MODE === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
          <div className="max-w-md w-full bg-base-100 rounded-lg shadow-lg p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-base-content">Oops! Something went wrong</h2>
                <p className="text-base-content/60">
                  We encountered an unexpected error. Don't worry, your data is safe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={this.handleRetry}
                  className="btn btn-primary flex-1 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                
                <Link
                  to="/"
                  className="btn btn-outline flex-1 gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>

              {import.meta.env.MODE === 'development' && this.state.error && (
                <details className="w-full text-left">
                  <summary className="cursor-pointer text-sm text-base-content/60 hover:text-base-content">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-3 bg-base-200 rounded text-xs font-mono overflow-auto">
                    <div className="text-error font-semibold mb-2">Error:</div>
                    <div className="mb-4">{this.state.error.toString()}</div>
                    <div className="text-error font-semibold mb-2">Stack Trace:</div>
                    <div>{this.state.errorInfo.componentStack}</div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
