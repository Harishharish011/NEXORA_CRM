import React, { useState, useCallback, useContext, createContext } from 'react';

/**
 * Toast Context
 * Global state management for toasts
 */
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * Toast Provider Component
 * Wrap your app with this to enable toast notifications
 */
export const ToastProvider = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, options = {}) => {
      const {
        type = 'info', // 'success', 'error', 'warning', 'info'
        duration = 4000,
        action = null,
      } = options;

      const id = Date.now();
      const toast = { id, message, type, action };

      setToasts((prev) => [...prev, toast].slice(-maxToasts));

      if (duration) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = (message, options) =>
    addToast(message, { ...options, type: 'success' });
  const error = (message, options) =>
    addToast(message, { ...options, type: 'error', duration: 5000 });
  const warning = (message, options) =>
    addToast(message, { ...options, type: 'warning' });
  const info = (message, options) =>
    addToast(message, { ...options, type: 'info' });

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Individual Toast Component
 */
const Toast = ({ id, message, type = 'info', action, onClose }) => {
  const typeConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✓',
      iconColor: 'text-green-600',
      textColor: 'text-gray-900',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '✕',
      iconColor: 'text-red-600',
      textColor: 'text-gray-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠',
      iconColor: 'text-yellow-600',
      textColor: 'text-gray-900',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ',
      iconColor: 'text-blue-600',
      textColor: 'text-gray-900',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-4 shadow-lg flex items-start gap-3 animate-in slide-in-from-top-2`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <span className={`font-bold text-lg flex-shrink-0 ${config.iconColor}`}>
        {config.icon}
      </span>

      {/* Message */}
      <div className="flex-1">
        <p className={`text-sm font-medium ${config.textColor}`}>{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-semibold underline hover:no-underline"
            style={{ color: config.iconColor.split('-')[1] }}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

/**
 * Toast Container Component
 * Displays all toasts
 */
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm pointer-events-none"
      aria-live="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            action={toast.action}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Standalone Toast Component
 * Use without provider for simple notifications
 */
export const SimpleToast = ({
  show = true,
  message = 'Notification',
  type = 'info',
  onClose = () => {},
  duration = 4000,
}) => {
  const [visible, setVisible] = useState(show);

  React.useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  const typeConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✓',
      iconColor: 'text-green-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '✕',
      iconColor: 'text-red-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '⚠',
      iconColor: 'text-yellow-600',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ',
      iconColor: 'text-blue-600',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-4 shadow-lg flex items-center gap-3`}
      role="alert"
      aria-live="polite"
    >
      <span className={`font-bold text-lg ${config.iconColor}`}>{config.icon}</span>
      <p className="text-sm font-medium text-gray-900">{message}</p>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="ml-auto text-gray-400 hover:text-gray-600 transition"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastProvider;
