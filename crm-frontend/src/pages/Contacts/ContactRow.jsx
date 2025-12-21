import React from 'react';
import { motion } from 'framer-motion';
import StatusBadge from './StatusBadge';

/**
 * ContactRow Component
 * Individual row in the contacts table
 */
const ContactRow = ({ 
  contact, 
  isSelected, 
  onSelect, 
  onView, 
  onEdit 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
    >
      {/* Checkbox */}
      <td className="px-6 py-4 w-12">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(contact.id)}
          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
        />
      </td>

      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: '#000000' }}
          >
            {contact.avatar}
          </div>
          <div>
            <p className="font-medium text-gray-900">{contact.name}</p>
            <p className="text-xs text-gray-500">{contact.email}</p>
          </div>
        </div>
      </td>

      {/* Email - Hidden on mobile */}
      <td className="px-6 py-4 hidden md:table-cell">
        <p className="text-gray-600 text-sm">{contact.email}</p>
      </td>

      {/* Company */}
      <td className="px-6 py-4 hidden lg:table-cell">
        <p className="text-gray-600 text-sm">{contact.company}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={contact.status} />
      </td>

      {/* Created Date - Hidden on mobile */}
      <td className="px-6 py-4 hidden sm:table-cell">
        <p className="text-gray-600 text-sm">{formatDate(contact.createdDate)}</p>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onView(contact)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(contact)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Edit
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default ContactRow;
