/**
 * Contacts Mock Data
 * Static data for contacts list, table, and modals
 * Ready for API integration in backend phase
 */

export const contactsMockData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    company: 'Acme Corporation',
    status: 'Customer',
    phone: '+1 (555) 123-4567',
    createdDate: '2024-11-15',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@techstartup.io',
    company: 'TechStartup Inc',
    status: 'Lead',
    phone: '+1 (555) 234-5678',
    createdDate: '2024-11-18',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@enterprise.com',
    company: 'Enterprise Solutions',
    status: 'Prospect',
    phone: '+1 (555) 345-6789',
    createdDate: '2024-11-20',
    avatar: 'ER'
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.thompson@retail.com',
    company: 'Retail Chain LLC',
    status: 'Customer',
    phone: '+1 (555) 456-7890',
    createdDate: '2024-11-12',
    avatar: 'DT'
  },
  {
    id: 5,
    name: 'Jessica Liu',
    email: 'jessica.liu@finance.org',
    company: 'Finance Group',
    status: 'Lead',
    phone: '+1 (555) 567-8901',
    createdDate: '2024-11-25',
    avatar: 'JL'
  },
  {
    id: 6,
    name: 'Robert Martinez',
    email: 'robert.martinez@healthcare.net',
    company: 'Healthcare Plus',
    status: 'Customer',
    phone: '+1 (555) 678-9012',
    createdDate: '2024-11-10',
    avatar: 'RM'
  },
  {
    id: 7,
    name: 'Amanda Foster',
    email: 'amanda.foster@media.co',
    company: 'Media Networks',
    status: 'Prospect',
    phone: '+1 (555) 789-0123',
    createdDate: '2024-11-22',
    avatar: 'AF'
  },
  {
    id: 8,
    name: 'Christopher Davis',
    email: 'christopher.davis@consulting.com',
    company: 'Consulting Group',
    status: 'Lead',
    phone: '+1 (555) 890-1234',
    createdDate: '2024-11-16',
    avatar: 'CD'
  },
  {
    id: 9,
    name: 'Victoria Wong',
    email: 'victoria.wong@ecommerce.io',
    company: 'E-Commerce Plus',
    status: 'Customer',
    phone: '+1 (555) 901-2345',
    createdDate: '2024-11-08',
    avatar: 'VW'
  },
  {
    id: 10,
    name: 'James Anderson',
    email: 'james.anderson@manufacturing.com',
    company: 'Manufacturing Corp',
    status: 'Prospect',
    phone: '+1 (555) 012-3456',
    createdDate: '2024-11-19',
    avatar: 'JA'
  }
];

export const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Lead', label: 'Lead' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Prospect', label: 'Prospect' }
];

export const companyOptions = [
  { value: 'all', label: 'All Companies' },
  { value: 'Acme Corporation', label: 'Acme Corporation' },
  { value: 'TechStartup Inc', label: 'TechStartup Inc' },
  { value: 'Enterprise Solutions', label: 'Enterprise Solutions' },
  { value: 'Retail Chain LLC', label: 'Retail Chain LLC' },
  { value: 'Finance Group', label: 'Finance Group' },
  { value: 'Healthcare Plus', label: 'Healthcare Plus' },
  { value: 'Media Networks', label: 'Media Networks' },
  { value: 'Consulting Group', label: 'Consulting Group' },
  { value: 'E-Commerce Plus', label: 'E-Commerce Plus' },
  { value: 'Manufacturing Corp', label: 'Manufacturing Corp' }
];

export const emptyStateMessage = {
  title: 'No contacts found',
  description: 'Create your first contact to get started',
  icon: 'contacts'
};
