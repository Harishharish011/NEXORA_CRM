import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';

const SocialPosting = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('all');

  const platforms = [
    { id: 'instagram', label: 'Instagram', color: '#E1306C' },
    { id: 'twitter', label: 'Twitter', color: '#1DA1F2' },
    { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
    { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  ];

  const posts = [
    { id: 1, title: 'Summer Sale Announcement', platforms: ['instagram', 'twitter'], scheduled: 'Jun 15, 2024', status: 'Scheduled' },
    { id: 2, title: 'Product Feature Showcase', platforms: ['linkedin', 'facebook'], scheduled: 'Jun 12, 2024', status: 'Published' },
    { id: 3, title: 'Team Culture Post', platforms: ['instagram'], scheduled: 'Jun 20, 2024', status: 'Draft' },
  ];

  return (
    <PageWrapper
      title="Social Posting"
      description="Schedule and publish content across social media platforms."
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-black text-white rounded-lg font-semibold mb-8 hover:bg-gray-900"
      >
        + New Post
      </motion.button>

      {/* Platform Filters */}
      <div className="mb-8 flex gap-3 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedPlatform('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedPlatform === 'all'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          All Platforms
        </motion.button>
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPlatform(platform.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedPlatform === platform.id
                ? 'text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedPlatform === platform.id ? platform.color : 'inherit',
            }}
          >
            {platform.label}
          </motion.button>
        ))}
      </div>

      {/* Posts List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="bg-white rounded-lg p-6 border cursor-pointer"
            style={{ borderColor: theme.ui.border }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black mb-2">{post.title}</h3>
                <div className="flex gap-2 mb-3">
                  {post.platforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId);
                    return (
                      <span
                        key={platformId}
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: platform?.color }}
                      >
                        {platform?.label}
                      </span>
                    );
                  })}
                </div>
                <p className="text-gray-600 text-sm">Scheduled: {post.scheduled}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor:
                    post.status === 'Published' ? '#D1FAE5' :
                    post.status === 'Scheduled' ? '#FEF3C7' :
                    '#E5E7EB',
                  color:
                    post.status === 'Published' ? '#065F46' :
                    post.status === 'Scheduled' ? '#92400E' :
                    '#374151',
                }}
              >
                {post.status}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </PageWrapper>
  );
};

export default SocialPosting;
