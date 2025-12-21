import React from 'react';
import { motion } from 'framer-motion';
import ContactRow from './ContactRow';

/**
 * ContactsTable Component
 * Main table displaying list of contacts
 */
const ContactsTable = ({ 
  contacts, 
  selectedContacts, 
  onSelectContact, 
  onSelectAll,
  onView,
  onEdit,
  isLoading = false
}) => {
  const isAllSelected = contacts.length > 0 && selectedContacts.length === contacts.length;
  const isSomeSelected = selectedContacts.length > 0 && selectedContacts.length < contacts.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
            <tr>
              {/* Select All Checkbox */}
              <th className="px-6 py-4 text-left w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={() => onSelectAll(!isAllSelected)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </th>

              {/* Name Header */}
              <th className="px-6 py-4 text-left">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</p>
              </th>

              {/* Email Header - Hidden on mobile */}
              <th className="px-6 py-4 text-left hidden md:table-cell">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</p>
              </th>

              {/* Company Header - Hidden on tablet */}
              <th className="px-6 py-4 text-left hidden lg:table-cell">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</p>
              </th>

              {/* Status Header */}
              <th className="px-6 py-4 text-left">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</p>
              </th>

              {/* Date Header - Hidden on mobile */}
              <th className="px-6 py-4 text-left hidden sm:table-cell">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</p>
              </th>

              {/* Actions Header */}
              <th className="px-6 py-4 text-left">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</p>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td colSpan="7" className="px-6 py-4">
                    <div className="h-16 bg-gray-100 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : contacts.length > 0 ? (
              // Contact rows
              contacts.map((contact, index) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  isSelected={selectedContacts.includes(contact.id)}
                  onSelect={onSelectContact}
                  onView={onView}
                  onEdit={onEdit}
                />
              ))
            ) : (
              // Empty state
              <tr>
                <td colSpan="7" className="px-6 py-12">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <p className="text-gray-600 font-medium">No contacts found</p>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer - Row count */}
      {contacts.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{contacts.length}</span> contact{contacts.length !== 1 ? 's' : ''}
            {selectedContacts.length > 0 && (
              <span className="ml-2">• <span className="font-semibold">{selectedContacts.length}</span> selected</span>
            )}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ContactsTable;
