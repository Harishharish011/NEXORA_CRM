/**
 * Global Theme Configuration
 * Extracted from landing page for consistency
 * All CRM components use this centralized theme
 */

export const theme = {
  // Primary colors from landing page
  primary: '#000000',        // Black - primary brand color
  secondary: '#E6E6E6',      // Light gray - background
  tertiary: '#FFFFFF',       // White - content areas
  
  // Text colors
  text: {
    primary: '#000000',      // Black text
    secondary: '#666666',    // Gray text
    light: '#FFFFFF',        // White text
  },
  
  // UI colors
  ui: {
    hover: '#333333',        // Hover state for buttons
    border: '#D0D0D0',       // Border color
    disabled: '#CCCCCC',     // Disabled state
    icon: '#666666',         // Icon color
  },
  
  // Semantic colors
  semantic: {
    success: '#10B981',      // Green - success/positive
    warning: '#F59E0B',      // Amber - warning
    error: '#EF4444',        // Red - error/danger
    info: '#3B82F6',         // Blue - information
  },
  
  // Gradients
  gradients: {
    dark: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
    light: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
  }
};

/**
 * Tailwind color override
 * Use in tailwind.config.js: extend.colors
 */
export const tailwindColors = {
  'nexora-black': theme.primary,
  'nexora-gray': theme.secondary,
  'nexora-text': theme.text.primary,
  'nexora-border': theme.ui.border,
  'nexora-success': theme.semantic.success,
  'nexora-warning': theme.semantic.warning,
  'nexora-error': theme.semantic.error,
  'nexora-info': theme.semantic.info,
};

export default theme;
