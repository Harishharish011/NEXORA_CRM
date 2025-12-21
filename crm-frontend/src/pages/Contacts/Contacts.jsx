import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper';
import ContactsTable from './ContactsTable';
import AddContactModal from './AddContactModal';
import { contactsMockData, statusOptions, companyOptions } from '../../data/contactsMockData';

/**
 * Contacts Page / Module
 * Main contacts management interface
 * - Display list of contacts
 * - Search and filter functionality
 * - Add/Edit contact modal
 * - Bulk selection support
 */
const Contacts = () => {
  const [contacts, setContacts] = useState(contactsMockData);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;

      // Company filter
      const matchesCompany = companyFilter === 'all' || contact.company === companyFilter;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [contacts, searchQuery, statusFilter, companyFilter]);

  // Handle select single contact
  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  // Handle select all contacts
  const handleSelectAll = (isSelected) => {
    setSelectedContacts(isSelected ? filteredContacts.map(c => c.id) : []);
  };

  // Handle add/edit contact
  const handleOpenModal = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
    }
    setIsModalOpen(true);
  };

  const handleSaveContact = (formData) => {
    if (editingContact) {
      // Update existing contact
      setContacts(prev =>
        prev.map(c => c.id === editingContact.id ? { ...c, ...formData } : c)
      );
    } else {
      // Add new contact
      const newContact = {
        id: Math.max(...contacts.map(c => c.id), 0) + 1,
        ...formData,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        createdDate: new Date().toISOString().split('T')[0]
      };
      setContacts(prev => [newContact, ...prev]);
    }
    setIsModalOpen(false);
    setEditingContact(null);
  };

  // Handle view contact
  const handleViewContact = (contact) => {
    setViewingContact(contact);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCompanyFilter('all');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || companyFilter !== 'all';

  return (
    <PageWrapper
      title="Contacts"
      description="Manage your leads and customers"
    >
      <div className="space-y-6 pb-8">
        {/* Header with Add Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-4 flex-wrap"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Contacts</h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Contact
          </motion.button>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-4 space-y-4"
        >
          {/* Search Input */}
          <div className="relative">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 bg-white cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Company Filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 bg-white cursor-pointer"
            >
              {companyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearFilters}
                className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors sm:col-span-2 lg:col-span-1"
              >
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Contacts Table */}
        <ContactsTable
          contacts={filteredContacts}
          selectedContacts={selectedContacts}
          onSelectContact={handleSelectContact}
          onSelectAll={handleSelectAll}
          onView={handleViewContact}
          onEdit={handleOpenModal}
        />
      </div>

      {/* Add/Edit Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        initialData={editingContact}
      />
    </PageWrapper>
  );
};

export default Contacts;
