/**
 * Dashboard Mock Data
 * Contains all static/mock data for dashboard UI
 * This will be replaced with real API calls in backend integration phase
 */

export const statCardsData = [
  {
    id: 1,
    title: 'Total Contacts',
    value: '12,450',
    change: '+8.5%',
    trend: 'up',
    icon: 'contacts',
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  {
    id: 2,
    title: 'Active Campaigns',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: 'campaigns',
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  {
    id: 3,
    title: 'Emails Sent',
    value: '48,230',
    change: '+5.2%',
    trend: 'up',
    icon: 'email',
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '3.24%',
    change: '+1.2%',
    trend: 'up',
    icon: 'conversion',
    color: '#8B5CF6',
    bgColor: '#F5F3FF'
  }
];

export const recentActivityData = [
  {
    id: 1,
    type: 'Contact Added',
    description: '150 new contacts imported from Excel',
    timestamp: '2 hours ago',
    icon: 'contact',
    color: '#3B82F6'
  },
  {
    id: 2,
    type: 'Campaign Created',
    description: 'New email campaign "Winter Sale" scheduled',
    timestamp: '4 hours ago',
    icon: 'campaign',
    color: '#10B981'
  },
  {
    id: 3,
    type: 'Email Sent',
    description: 'Newsletter sent to 5,230 subscribers',
    timestamp: '6 hours ago',
    icon: 'email',
    color: '#F59E0B'
  },
  {
    id: 4,
    type: 'Campaign Completed',
    description: '"Fall Promotion" campaign ended with 42% engagement',
    timestamp: '1 day ago',
    icon: 'success',
    color: '#10B981'
  },
  {
    id: 5,
    type: 'Integration Connected',
    description: 'Slack integration successfully configured',
    timestamp: '2 days ago',
    icon: 'integration',
    color: '#8B5CF6'
  }
];

export const quickActionsData = [
  {
    id: 1,
    label: 'Add Contact',
    icon: 'addContact',
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  {
    id: 2,
    label: 'Create Campaign',
    icon: 'createCampaign',
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  {
    id: 3,
    label: 'Schedule Email',
    icon: 'scheduleEmail',
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  }
];

export const performanceMetricsData = {
  title: 'Performance Overview',
  subtitle: 'Last 30 days',
  metrics: [
    {
      label: 'Email Deliverability',
      value: '98.5%',
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
    {
      label: 'Campaign Engagement',
      value: '24.5%',
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      label: 'Customer Retention',
      value: '92%',
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    }
  ]
};
