import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';

const Integrations = () => {
  const [connectedServices, setConnectedServices] = React.useState(['slack', 'mailchimp']);

  const availableIntegrations = [
    { id: 'slack', name: 'Slack', description: 'Send notifications to Slack channels', icon: null, connected: true },
    { id: 'mailchimp', name: 'Mailchimp', description: 'Sync email campaigns and subscribers', icon: null, connected: true },
    { id: 'zapier', name: 'Zapier', description: 'Automate workflows across apps', icon: null, connected: false },
    { id: 'stripe', name: 'Stripe', description: 'Track payments and subscriptions', icon: null, connected: false },
    { id: 'google-sheets', name: 'Google Sheets', description: 'Export data to Google Sheets', icon: null, connected: false },
    { id: 'hubspot', name: 'HubSpot', description: 'Integrate with HubSpot CRM', icon: null, connected: false },
    { id: 'salesforce', name: 'Salesforce', description: 'Sync data with Salesforce', icon: null, connected: false },
    { id: 'twilio', name: 'Twilio', description: 'Send SMS notifications', icon: null, connected: false },
  ];

  const toggleIntegration = (id) => {
    setConnectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((service) => service !== id)
        : [...prev, id]
    );
  };

  return (
    <PageWrapper
      title="Integrations"
      description="Connect third-party services to enhance your CRM."
    >
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-black">Available Integrations</h3>
          <span className="text-sm text-gray-600">
            {connectedServices.length} of {availableIntegrations.length} connected
          </span>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {availableIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`rounded-lg border p-6 cursor-pointer transition-all ${
              connectedServices.includes(integration.id)
                ? 'bg-black border-black text-white'
                : 'bg-white text-black hover:border-gray-400'
            }`}
            style={{
              borderColor: connectedServices.includes(integration.id)
                ? 'black'
                : theme.ui.border,
            }}
          >
            <div className="flex justify-between items-start mb-4">
              {integration.icon && <span className="text-3xl">{integration.icon}</span>}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleIntegration(integration.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  connectedServices.includes(integration.id)
                    ? 'bg-white border-white'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                {connectedServices.includes(integration.id) && (
                  <span className="text-black text-sm font-bold">✓</span>
                )}
              </motion.button>
            </div>
            <h4 className="font-bold text-lg mb-2">{integration.name}</h4>
            <p
              className="text-sm"
              style={{
                color: connectedServices.includes(integration.id) ? '#E0E0E0' : '#6B7280',
              }}
            >
              {integration.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleIntegration(integration.id)}
              className={`w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                connectedServices.includes(integration.id)
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'border border-current hover:bg-gray-50'
              }`}
            >
              {connectedServices.includes(integration.id) ? 'Connected' : 'Connect'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Connected Services Details */}
      {connectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-lg border p-6"
          style={{ borderColor: theme.ui.border }}
        >
          <h3 className="text-lg font-bold text-black mb-4">Connected Services</h3>
          <div className="space-y-3">
            {connectedServices.map((serviceId, index) => {
              const service = availableIntegrations.find((s) => s.id === serviceId);
              return (
                <motion.div
                  key={serviceId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {service?.icon && <span className="text-2xl">{service?.icon}</span>}
                    <div>
                      <p className="font-semibold text-black">{service?.name}</p>
                      <p className="text-xs text-gray-600">Last synced: 2 minutes ago</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 text-sm font-medium border rounded text-black hover:bg-white transition-colors"
                    style={{ borderColor: theme.ui.border }}
                  >
                    Settings
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </PageWrapper>
  );
};

export default Integrations;
