import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import CampaignTable from '../components/campaigns/CampaignTable';
import CreateCampaignModal from '../components/campaigns/CreateCampaignModal';
import { PageLoader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/FormElements';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import { mockCampaigns, campaignTypeOptions, campaignStatusOptions } from '../data/mockCampaigns';

/**
 * Campaigns Page / Module
 * Main campaigns management interface
 * - Display list of campaigns
 * - Search and filter functionality
 * - Create/Edit campaign modal
 * - Bulk selection support
 */
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [viewingCampaign, setViewingCampaign] = useState(null);
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

  // Filter campaigns based on search and filters
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      // Search query filter - searches name and description
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.description.toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = typeFilter === 'All' || campaign.type === typeFilter;

      // Status filter
      const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [campaigns, searchQuery, typeFilter, statusFilter]);

  // Handle open modal for creating new campaign
  const handleOpenModal = () => {
    setEditingCampaign(null);
    setIsModalOpen(true);
  };

  // Handle open modal for editing campaign
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  // Handle view campaign
  const handleViewCampaign = (campaign) => {
    setViewingCampaign(campaign);
    // In production, would open a view modal or detail page
  };

  // Handle save campaign
  const handleSaveCampaign = async (formData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (editingCampaign) {
        // Update existing campaign
        setCampaigns(campaigns.map(c =>
          c.id === editingCampaign.id ? { ...c, ...formData } : c
        ));
      } else {
        // Create new campaign
        const newCampaign = {
          id: Math.max(...campaigns.map(c => c.id), 0) + 1,
          ...formData,
          createdDate: new Date().toISOString().split('T')[0]
        };
        setCampaigns([newCampaign, ...campaigns]);
      }
      setIsModalOpen(false);
      setEditingCampaign(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setStatusFilter('All');
    setSelectedCampaigns([]);
  };

  return (
    <PageWrapper title="Campaigns" subtitle="Create and manage your marketing campaigns">
      {/* Page Loading State */}
      {isLoading && <PageLoader />}

      {!isLoading && (
      <div className="space-y-6">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-1">
              {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Button
            onClick={handleOpenModal}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Campaign
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search campaigns by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-500"
              aria-label="Search campaigns"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              aria-label="Filter campaigns by type"
            >
              {campaignTypeOptions.map(type => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : `Type: ${type}`}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              aria-label="Filter campaigns by status"
            >
              {campaignStatusOptions.map(status => (
                <option key={status} value={status}>{status === 'All' ? 'All Statuses' : `Status: ${status}`}</option>
              ))}
            </select>

            {/* Clear Filters Button */}
            {(searchQuery || typeFilter !== 'All' || statusFilter !== 'All') && (
              <Button
                variant="secondary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Empty State - No Campaigns */}
        {campaigns.length === 0 && (
          <EmptyState
            title="No campaigns yet"
            description="Create your first campaign to start reaching your audience."
            preset="campaigns"
            primaryAction={{
              label: 'Create Campaign',
              onClick: handleOpenModal
            }}
          />
        )}

        {/* Filtered Results Empty State */}
        {campaigns.length > 0 && filteredCampaigns.length === 0 && (
          <EmptyState
            title="No campaigns found"
            description="Try adjusting your search or filters to find what you're looking for."
            preset="search"
            primaryAction={{
              label: 'Clear Filters',
              onClick: handleClearFilters
            }}
          />
        )}

        {/* Campaign Table - Only show if there are filtered results */}
        {filteredCampaigns.length > 0 && (
          <SectionErrorBoundary
            fallbackTitle="Failed to load campaigns"
            fallbackDescription="There was a problem displaying your campaigns."
          >
            <CampaignTable
              campaigns={filteredCampaigns}
              onView={handleViewCampaign}
              onEdit={handleEditCampaign}
            />
          </SectionErrorBoundary>
        )}
      </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCampaign}
        initialData={editingCampaign}
        isLoading={isSubmitting}
      />
    </PageWrapper>
  );
};

export default Campaigns;
