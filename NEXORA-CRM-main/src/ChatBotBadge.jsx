import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import Avatar from './Avatar';

const ChatBotBadge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      {/* Badge */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        onDoubleClick={() => setIsOpen(false)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-xl ring-2 ring-orange-200 flex items-center justify-center z-40 hover:shadow-2xl transition-shadow"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <Avatar />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-24 right-6 bg-white px-4 py-2 rounded-lg shadow-lg z-30 max-w-xs"
          >
            <p className="text-sm text-gray-700">Want to chat about Nexora? I'm an AI chatbot here to help...</p>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotBadge;
