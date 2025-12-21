import React from 'react';

/**
 * Spinner Loader Component
 * Used for button-level and small loading states
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <div className={`inline-flex ${sizeClasses[size]} ${className}`}>
      <svg
        className="animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

/**
 * Skeleton Loader Component
 * Used for page-level and card-level loading states
 */
export const SkeletonLoader = ({ 
  type = 'card', 
  count = 3,
  className = '' 
}) => {
  if (type === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-gray-100 rounded animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-12 flex-shrink-0" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/5" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
      </div>
    );
  }

  return null;
};

/**
 * Page Loader Component
 * Full page loading state with centered spinner
 */
export const PageLoader = ({ 
  message = 'Loading...', 
  fullHeight = true 
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullHeight ? 'h-screen' : 'h-64'
      } w-full`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Spinner size="lg" className="text-blue-600 mb-4" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

/**
 * Button Loader State
 * Shows spinner inside button while loading
 */
export const ButtonLoader = ({ 
  loading = false, 
  children,
  disabled = false,
  ...props 
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`inline-flex items-center gap-2 ${
        loading || disabled ? 'opacity-75 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {loading && <Spinner size="sm" className="text-current" />}
      {children}
    </button>
  );
};

/**
 * Minimal Loader
 * Tiny inline loader
 */
export const MinimalLoader = ({ inline = true }) => {
  return (
    <div className={inline ? 'inline-block' : 'block'}>
      <Spinner size="sm" className="text-gray-400 animate-spin" />
    </div>
  );
};

export default Spinner;
