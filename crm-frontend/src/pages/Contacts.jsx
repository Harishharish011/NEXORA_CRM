import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import ContactsTable from '../components/contacts/ContactsTable';
import AddContactModal from '../components/contacts/AddContactModal';
import { PageLoader, SkeletonLoader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/FormElements';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import { contactsMockData, statusOptions, companyOptions } from '../data/contactsMockData';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate initial data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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

  const handleSaveContact = async (formData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Page Loading State */}
      {isLoading && <PageLoader />}

      {!isLoading && (
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
          <Button
            onClick={() => handleOpenModal()}
            isLoading={false}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Contact
          </Button>
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
              aria-label="Search contacts"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 bg-white cursor-pointer"
              aria-label="Filter contacts by status"
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
              aria-label="Filter contacts by company"
            >
              {companyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="sm:col-span-2 lg:col-span-1"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </motion.div>

        {/* Empty State - No Contacts */}
        {contacts.length === 0 && (
          <EmptyState
            title="No contacts yet"
            description="Get started by adding your first contact to manage leads and customers."
            preset="contacts"
            primaryAction={{
              label: 'Add First Contact',
              onClick: () => handleOpenModal()
            }}
          />
        )}

        {/* Filtered Results Empty State */}
        {contacts.length > 0 && filteredContacts.length === 0 && (
          <EmptyState
            title="No contacts found"
            description="Try adjusting your search or filters to find what you're looking for."
            preset="search"
            primaryAction={{
              label: 'Clear Filters',
              onClick: handleClearFilters
            }}
          />
        )}

        {/* Contacts Table - Only show if there are filtered results */}
        {filteredContacts.length > 0 && (
          <SectionErrorBoundary
            fallbackTitle="Failed to load contacts"
            fallbackDescription="There was a problem displaying your contacts."
          >
            <ContactsTable
              contacts={filteredContacts}
              selectedContacts={selectedContacts}
              onSelectContact={handleSelectContact}
              onSelectAll={handleSelectAll}
              onView={handleViewContact}
              onEdit={handleOpenModal}
              isLoading={false}
            />
          </SectionErrorBoundary>
        )}
      </div>
      )}

      {/* Add/Edit Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        initialData={editingContact}
        isLoading={isSubmitting}
      />
    </PageWrapper>
  );
};

export default Contacts;
