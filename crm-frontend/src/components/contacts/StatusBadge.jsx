import React from 'react';

/**
 * StatusBadge Component
 * Displays contact status with appropriate color and styling
 */
const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'customer':
        return {
          bgColor: '#ECFDF5',
          textColor: '#047857',
          borderColor: '#D1FAE5'
        };
      case 'lead':
        return {
          bgColor: '#EFF6FF',
          textColor: '#1e40af',
          borderColor: '#DBEAFE'
        };
      case 'prospect':
        return {
          bgColor: '#FFFBEB',
          textColor: '#b45309',
          borderColor: '#FEE3C3'
        };
      default:
        return {
          bgColor: '#F3F4F6',
          textColor: '#4B5563',
          borderColor: '#E5E7EB'
        };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold border"
      style={{
        backgroundColor: styles.bgColor,
        color: styles.textColor,
        borderColor: styles.borderColor
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
