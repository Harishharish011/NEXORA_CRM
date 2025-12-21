import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import theme from '../theme/theme';
import AIAssistantModal from './AIAssistantModal';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isCollapsed } = useSidebar();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll on main content area
  useEffect(() => {
    const mainContent = document.querySelector('main');
    
    const handleScroll = () => {
      if (mainContent) {
        setIsScrolled(mainContent.scrollTop > 10);
      }
    };

    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Generate initials from user email or name
  const getInitials = () => {
    if (!user) return 'U';
    
    if (user.name && user.name.length > 0) {
      // If name exists, use first letters of words
      const words = user.name.split(' ');
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return words[0].substring(0, 2).toUpperCase();
    }
    
    if (user.email) {
      // Extract from email: take first two characters before '@'
      const beforeAt = user.email.split('@')[0];
      // If email format has dot (first.last), take first letter of each
      if (beforeAt.includes('.')) {
        const parts = beforeAt.split('.');
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      // Otherwise take first two characters
      return beforeAt.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  };

  // Generate consistent background color based on user email
  const getAvatarColor = () => {
    if (!user?.email) return theme.primary;
    
    // Generate hash from email for consistent color
    let hash = 0;
    for (let i = 0; i < user.email.length; i++) {
      hash = user.email.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Array of professional colors matching theme
    const colors = [
      '#000000', // Black (primary)
      '#1f2937', // Dark gray
      '#374151', // Gray
      '#4b5563', // Blue-gray
      '#2d3748', // Slate
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 h-16 border-b z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/40 backdrop-blur-md' : 'bg-white'
      } ${isCollapsed ? 'left-20' : 'left-64'}`}
      style={{ borderColor: theme.ui.border }}
    >
      <div className="h-full px-8 flex items-center justify-between gap-8">
        {/* Search Bar */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={searchFocus ? { scale: 1.02 } : { scale: 1 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search contacts, campaigns..."
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className="w-full px-4 py-2 pr-10 rounded-lg border transition-all duration-200 focus:outline-none"
              style={{
                borderColor: searchFocus ? theme.primary : theme.ui.border,
                boxShadow: searchFocus ? `0 0 0 2px ${theme.primary}20` : 'none',
              }}
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 ml-0">
          {/* AI Assistant Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAIOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: theme.primary,
              color: theme.tertiary,
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="hidden md:inline text-sm">AI Assistant</span>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-8" style={{ backgroundColor: theme.ui.border }} />

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          {/* Calls */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.button>

          {/* Help */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-8" style={{ backgroundColor: theme.ui.border }} />

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: getAvatarColor() }}
              >
                {getInitials()}
              </div>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50"
                  style={{ borderColor: theme.ui.border }}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: theme.ui.border }}>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || user?.email || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                  </div>

                  <div className="p-4 space-y-3">
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors text-sm"
                    >
                      Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors text-sm"
                    >
                      Settings
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors text-sm border-t pt-3 font-medium"
                      style={{ borderColor: theme.ui.border }}
                    >
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </motion.div>
  );
};

export default Navbar;
