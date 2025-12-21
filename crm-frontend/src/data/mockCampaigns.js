/**
 * Campaigns Mock Data
 * Static data for campaigns list, table, and modals
 * Ready for API integration in backend phase
 */

export const mockCampaigns = [
  {
    id: 1,
    name: 'Spring Product Launch',
    type: 'Email',
    status: 'Active',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    description: 'Email campaign for Q1 product launch targeting existing customers',
    createdDate: '2024-11-15'
  },
  {
    id: 2,
    name: 'Holiday Season Sale',
    type: 'Social',
    status: 'Active',
    startDate: '2024-12-10',
    endDate: '2025-01-05',
    description: 'Multi-channel social media campaign for holiday promotions',
    createdDate: '2024-11-10'
  },
  {
    id: 3,
    name: 'Black Friday Campaign',
    type: 'Ads',
    status: 'Completed',
    startDate: '2024-11-25',
    endDate: '2024-11-29',
    description: 'Paid ad campaign across Google and Meta platforms',
    createdDate: '2024-11-01'
  },
  {
    id: 4,
    name: 'Lead Nurture Automation',
    type: 'Automation',
    status: 'Draft',
    startDate: '2024-12-15',
    endDate: '2025-03-15',
    description: 'Automated email drip campaign for lead nurturing',
    createdDate: '2024-11-20'
  },
  {
    id: 5,
    name: 'Customer Retention Program',
    type: 'Email',
    status: 'Paused',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    description: 'Email series to engage and retain existing customers',
    createdDate: '2024-10-25'
  },
  {
    id: 6,
    name: 'Q1 Content Marketing',
    type: 'Social',
    status: 'Draft',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    description: 'Organic social media content strategy for Q1 2025',
    createdDate: '2024-11-18'
  },
  {
    id: 7,
    name: 'Referral Incentive Program',
    type: 'Automation',
    status: 'Active',
    startDate: '2024-12-01',
    endDate: '2025-12-31',
    description: 'Automated referral tracking and reward distribution system',
    createdDate: '2024-11-12'
  },
  {
    id: 8,
    name: 'Brand Awareness Initiative',
    type: 'Ads',
    status: 'Completed',
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    description: 'Display and video ads for brand awareness campaign',
    createdDate: '2024-10-01'
  },
  {
    id: 9,
    name: 'Product Feedback Survey',
    type: 'Email',
    status: 'Active',
    startDate: '2024-11-20',
    endDate: '2024-12-20',
    description: 'Customer feedback survey to gather product insights',
    createdDate: '2024-11-15'
  },
  {
    id: 10,
    name: 'New Year New You Campaign',
    type: 'Social',
    status: 'Draft',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    description: 'Seasonal campaign targeting New Year resolutions',
    createdDate: '2024-11-25'
  }
];

/**
 * Campaign type options
 */
export const campaignTypeOptions = [
  'All',
  'Email',
  'Social',
  'Ads',
  'Automation'
];

/**
 * Campaign status options
 */
export const campaignStatusOptions = [
  'All',
  'Draft',
  'Active',
  'Paused',
  'Completed'
];

/**
 * Get status color configuration
 * Used in status badges for consistent styling
 */
export const getStatusColor = (status) => {
  const colors = {
    'Draft': { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
    'Active': { bg: '#ECFDF5', text: '#047857', border: '#10B981' },
    'Paused': { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
    'Completed': { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' }
  };
  return colors[status] || { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' };
};

export default mockCampaigns;
