import React from 'react';

/**
 * Error Boundary Component
 * Catches React component errors and displays fallback UI
 * 
 * Usage:
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Optional: Send to error tracking service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          fallback={this.props.fallback}
          showDetails={this.props.showDetails ?? true}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error Fallback UI
 */
const ErrorFallback = ({
  error,
  errorInfo,
  onReset,
  fallback,
  showDetails = true,
}) => {
  // Use custom fallback if provided
  if (fallback) {
    return fallback({ error, reset: onReset });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try refreshing the page or contact
          support if the problem persists.
        </p>

        {/* Error Details (Dev mode) */}
        {showDetails && error && (
          <details className="text-left bg-gray-100 rounded-lg p-4 mb-6">
            <summary className="cursor-pointer font-mono text-sm text-gray-700 hover:text-gray-900">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-48 whitespace-pre-wrap break-words">
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            aria-label="Try again"
          >
            Try Again
          </button>

          <a
            href="/"
            className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * Inline Error Boundary
 * For non-critical sections that shouldn't crash the whole page
 */
export class InlineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Inline error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium mb-2">
            Failed to load this section
          </p>
          <button
            onClick={this.handleReset}
            className="text-sm text-red-600 hover:text-red-700 font-medium underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Section Error Boundary
 * For medium-level sections like cards or panels
 */
export class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Section error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Failed to load this section
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Please try refreshing or contact support.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-medium transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Component Boundary
 * For components that load data asynchronously
 */
export const AsyncBoundary = ({ 
  children, 
  loading = false, 
  error = null, 
  onRetry = null,
  loadingComponent = null,
  errorComponent = null,
}) => {
  if (loading) {
    return loadingComponent || <div>Loading...</div>;
  }

  if (error) {
    return (
      errorComponent || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-700 text-sm mb-3">{error.message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm text-red-600 hover:text-red-700 font-medium underline"
            >
              Try again
            </button>
          )}
        </div>
      )
    );
  }

  return children;
};

export default ErrorBoundary;
