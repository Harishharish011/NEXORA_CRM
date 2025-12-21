/**
 * Analytics Mock Data
 * Contains all static/mock data for analytics dashboard UI
 */

export const analyticsKPIData = [
  {
    id: 1,
    title: 'Total Leads',
    value: '8,420',
    change: '+15.3%',
    trend: 'up',
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  {
    id: 2,
    title: 'Emails Sent',
    value: '52,340',
    change: '+22.1%',
    trend: 'up',
    color: '#F59E0B',
    bgColor: '#FFFBEB'
  },
  {
    id: 3,
    title: 'Open Rate',
    value: '34.8%',
    change: '+4.2%',
    trend: 'up',
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  {
    id: 4,
    title: 'Click-through Rate',
    value: '12.5%',
    change: '+2.8%',
    trend: 'up',
    color: '#8B5CF6',
    bgColor: '#F5F3FF'
  },
  {
    id: 5,
    title: 'Active Campaigns',
    value: '18',
    change: '-3.2%',
    trend: 'down',
    color: '#EC4899',
    bgColor: '#FDF2F8'
  },
  {
    id: 6,
    title: 'Conversion Rate',
    value: '5.2%',
    change: '+1.5%',
    trend: 'up',
    color: '#06B6D4',
    bgColor: '#ECFDF5'
  }
];

export const emailEngagementData = [
  { week: 'Week 1', opens: 2400, clicks: 1200, bounces: 400 },
  { week: 'Week 2', opens: 3100, clicks: 1800, bounces: 300 },
  { week: 'Week 3', opens: 2800, clicks: 1500, bounces: 350 },
  { week: 'Week 4', opens: 3900, clicks: 2200, bounces: 250 },
  { week: 'Week 5', opens: 4200, clicks: 2400, bounces: 280 }
];

export const campaignPerformanceData = [
  { name: 'Summer Sale', performance: 85, revenue: '$24,500' },
  { name: 'Fall Collection', performance: 72, revenue: '$18,200' },
  { name: 'Winter Promo', performance: 91, revenue: '$32,800' },
  { name: 'Spring Launch', performance: 68, revenue: '$15,600' },
  { name: 'Holiday Special', performance: 88, revenue: '$28,300' }
];

export const leadSourceData = [
  { name: 'Email', value: 35, color: '#F59E0B' },
  { name: 'Social Media', value: 28, color: '#3B82F6' },
  { name: 'Organic Search', value: 20, color: '#10B981' },
  { name: 'Paid Ads', value: 12, color: '#8B5CF6' },
  { name: 'Referral', value: 5, color: '#EC4899' }
];

export const engagementTableData = [
  {
    id: 1,
    campaignName: 'Summer Sale 2024',
    channel: 'Email',
    opens: 4521,
    clicks: 1234,
    engagementRate: '34.8%'
  },
  {
    id: 2,
    campaignName: 'Product Launch',
    channel: 'Social',
    opens: 8920,
    clicks: 2145,
    engagementRate: '28.5%'
  },
  {
    id: 3,
    campaignName: 'Fall Collection',
    channel: 'Email',
    opens: 3240,
    clicks: 892,
    engagementRate: '31.2%'
  },
  {
    id: 4,
    campaignName: 'Holiday Special',
    channel: 'Email',
    opens: 6180,
    clicks: 1845,
    engagementRate: '37.4%'
  },
  {
    id: 5,
    campaignName: 'Black Friday',
    channel: 'Social',
    opens: 12540,
    clicks: 3450,
    engagementRate: '42.1%'
  },
  {
    id: 6,
    campaignName: 'Spring Refresh',
    channel: 'Email',
    opens: 2890,
    clicks: 620,
    engagementRate: '28.9%'
  },
  {
    id: 7,
    campaignName: 'Flash Sale',
    channel: 'Social',
    opens: 5620,
    clicks: 1456,
    engagementRate: '35.7%'
  },
  {
    id: 8,
    campaignName: 'Customer Retention',
    channel: 'Email',
    opens: 1890,
    clicks: 384,
    engagementRate: '26.4%'
  }
];
