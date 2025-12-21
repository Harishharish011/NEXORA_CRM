import React from 'react';

/**
 * Empty State Component
 * Display friendly message when no data is available
 * 
 * Usage:
 * <EmptyState 
 *   icon="📭"
 *   title="No contacts yet"
 *   description="Add your first contact to get started"
 *   action={{ label: 'Add Contact', onClick: () => {} }}
 * />
 */
export const EmptyState = ({
  icon = '📭',
  title = 'No data found',
  description = 'Get started by creating your first item',
  action = null,
  secondaryAction = null,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      role="status"
      aria-label={`Empty state: ${title}`}
    >
      {/* Icon */}
      <div className="text-5xl mb-4 opacity-60">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center">
        {action && (
          <button
            onClick={action.onClick}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            aria-label={action.label}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition"
            aria-label={secondaryAction.label}
          >
            {secondaryAction.icon && <span className="mr-2">{secondaryAction.icon}</span>}
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Empty State Variants
 */
export const EmptyStates = {
  /**
   * No Contacts
   */
  noContacts: {
    icon: '👥',
    title: 'No contacts yet',
    description: 'Create your first contact to start building relationships',
  },

  /**
   * No Campaigns
   */
  noCampaigns: {
    icon: '📧',
    title: 'No campaigns yet',
    description: 'Launch your first campaign to engage your audience',
  },

  /**
   * No Templates
   */
  noTemplates: {
    icon: '📋',
    title: 'No templates yet',
    description: 'Create reusable templates to save time',
  },

  /**
   * No Analytics
   */
  noAnalytics: {
    icon: '📊',
    title: 'No data to display',
    description: 'Start a campaign to track engagement metrics',
  },

  /**
   * No Email Builder
   */
  noEmailBuilder: {
    icon: '✉️',
    title: 'Create your first email',
    description: 'Build engaging emails to connect with your audience',
  },

  /**
   * No Results
   */
  noResults: {
    icon: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search criteria',
  },

  /**
   * Error State
   */
  error: {
    icon: '⚠️',
    title: 'Something went wrong',
    description: 'We encountered an error. Please try again.',
  },

  /**
   * No Permission
   */
  noPermission: {
    icon: '🔒',
    title: 'Access denied',
    description: 'You don\'t have permission to view this content',
  },
};

/**
 * Search Empty State
 * Show when search returns no results
 */
export const SearchEmptyState = ({ 
  query = '', 
  onClear = null 
}) => {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try a different search term.`}
      action={
        onClear
          ? { label: 'Clear Search', onClick: onClear, icon: '✕' }
          : null
      }
    />
  );
};

/**
 * Error Empty State
 * Show when an error occurred
 */
export const ErrorEmptyState = ({ 
  message = 'Something went wrong',
  onRetry = null 
}) => {
  return (
    <EmptyState
      icon="⚠️"
      title="Error"
      description={message}
      action={
        onRetry
          ? { label: 'Try Again', onClick: onRetry, icon: '🔄' }
          : null
      }
    />
  );
};

/**
 * No Permission Empty State
 * Show when user lacks access
 */
export const NoPermissionEmptyState = ({ 
  message = 'You don\'t have permission to view this content'
}) => {
  return (
    <EmptyState
      icon="🔒"
      title="Access Denied"
      description={message}
    />
  );
};

export default EmptyState;
