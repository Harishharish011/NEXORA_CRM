import React from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Button Component
 * Supports loading states, disabled states, accessibility, and feedback
 */
export const Button = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  ariaLabel = '',
  ariaDescribedBy = '',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-black hover:bg-gray-900 text-white focus:ring-gray-700 disabled:hover:bg-black',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 disabled:hover:bg-gray-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:hover:bg-red-600',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const isDisabled = loading || disabled;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : '')}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="inline-block animate-spin">
          <svg
            className="w-4 h-4"
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
        </span>
      )}
      {children}
    </motion.button>
  );
};

/**
 * Input Component with accessibility
 */
export const Input = ({
  label,
  id,
  error = '',
  required = false,
  disabled = false,
  placeholder = '',
  type = 'text',
  helpText = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-offset-0'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : ''}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          ✕ {error}
        </p>
      )}
      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea Component with accessibility
 */
export const Textarea = ({
  label,
  id,
  error = '',
  required = false,
  disabled = false,
  placeholder = '',
  rows = 4,
  helpText = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
          error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-offset-0'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : ''}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          ✕ {error}
        </p>
      )}
      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
};

/**
 * Select Component with accessibility
 */
export const Select = ({
  label,
  id,
  options = [],
  error = '',
  required = false,
  disabled = false,
  helpText = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 focus:ring-offset-0'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : ''}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          ✕ {error}
        </p>
      )}
      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
};

/**
 * Checkbox Component with accessibility
 */
export const Checkbox = ({
  label,
  id,
  checked = false,
  onChange,
  disabled = false,
  error = '',
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`w-4 h-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed ${
          error
            ? 'border-red-300 text-red-600'
            : 'border-gray-300 text-blue-600'
        }`}
        aria-invalid={!!error}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-sm font-medium cursor-pointer ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="ml-2 text-sm text-red-600">✕ {error}</p>
      )}
    </div>
  );
};

/**
 * Success Feedback Component
 */
export const SuccessMessage = ({ message, onDismiss }) => {
  return (
    <div
      className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
      role="status"
      aria-live="polite"
    >
      <span className="text-green-600 font-bold text-lg">✓</span>
      <div className="flex-1">
        <p className="text-sm text-green-700 font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-green-600 hover:text-green-700 transition"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * Error Message Component
 */
export const ErrorMessage = ({ message, onDismiss, retry = null }) => {
  return (
    <div
      className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
      role="alert"
      aria-live="assertive"
    >
      <span className="text-red-600 font-bold text-lg">✕</span>
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{message}</p>
        {retry && (
          <button
            onClick={retry.onClick}
            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium underline"
          >
            {retry.label || 'Try Again'}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-700 transition"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * Warning Message Component
 */
export const WarningMessage = ({ message, onDismiss }) => {
  return (
    <div
      className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3"
      role="status"
      aria-live="polite"
    >
      <span className="text-yellow-600 font-bold text-lg">⚠</span>
      <p className="text-sm text-yellow-700 font-medium">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto text-yellow-600 hover:text-yellow-700 transition"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * Badge Component
 */
export const Badge = ({ 
  label, 
  variant = 'blue', // 'blue', 'green', 'red', 'yellow', 'gray'
  size = 'md'
}) => {
  const variants = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-block rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {label}
    </span>
  );
};

export default Button;
