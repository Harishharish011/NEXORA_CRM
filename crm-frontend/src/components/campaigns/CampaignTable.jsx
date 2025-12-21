import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getStatusColor } from '../../data/mockCampaigns';

/**
 * CampaignTable Component
 * Displays campaigns in a table format
 * Features: sorting, filtering, actions
 */
const CampaignTable = ({ 
  campaigns, 
  isLoading = false, 
  onView, 
  onEdit 
}) => {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);

  // Check if all campaigns are selected
  const isAllSelected = campaigns.length > 0 && selectedCampaigns.length === campaigns.length;
  const isSomeSelected = selectedCampaigns.length > 0 && selectedCampaigns.length < campaigns.length;

  // Handle select all
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(campaigns.map(c => c.id));
    }
  };

  // Handle select single campaign
  const handleSelectCampaign = (campaignId) => {
    setSelectedCampaigns(prev =>
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get campaign type badge color
  const getTypeColor = (type) => {
    const typeColors = {
      'Email': 'bg-blue-100 text-blue-800 border-blue-300',
      'Social': 'bg-purple-100 text-purple-800 border-purple-300',
      'Ads': 'bg-pink-100 text-pink-800 border-pink-300',
      'Automation': 'bg-green-100 text-green-800 border-green-300'
    };
    return typeColors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Empty state
  if (campaigns.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-600">Create your first campaign to get started</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto bg-white rounded-lg border border-gray-200"
    >
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={el => {
                  if (el) {
                    el.indeterminate = isSomeSelected;
                  }
                }}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Campaign Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Start Date</th>
            <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">End Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {campaigns.map((campaign, index) => {
            const statusColor = getStatusColor(campaign.status);
            const isSelected = selectedCampaigns.includes(campaign.id);

            return (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleSelectCampaign(campaign.id)}
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectCampaign(campaign.id)}
                    onClick={e => e.stopPropagation()}
                    className="rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  <div className="text-xs text-gray-600">{campaign.description.substring(0, 40)}...</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getTypeColor(campaign.type)}`}>
                    {campaign.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full border"
                    style={{
                      backgroundColor: statusColor.bg,
                      color: statusColor.text,
                      borderColor: statusColor.border
                    }}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(campaign.startDate)}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                  {formatDate(campaign.endDate)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onView(campaign)}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(campaign)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Edit
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      {/* Table footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
        <span>{selectedCampaigns.length} of {campaigns.length} selected</span>
        <span>{campaigns.length} total campaigns</span>
      </div>
    </motion.div>
  );
};

export default CampaignTable;
