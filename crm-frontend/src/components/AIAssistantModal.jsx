import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../theme/theme';

const AIAssistantModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hi! I\'m NEXBOT AI. How can I help you today? Ask me anything about your contacts, campaigns, or analytics.',
    },
  ]);

  const quickActions = [
    'Get free training',
    'Get started free',
    'Book a demo',
    'Chat with sales'
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: message,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMsg = {
        id: messages.length + 2,
        type: 'assistant',
        text: 'Thanks for your message! This is a placeholder AI response. Backend integration coming soon.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);

    setMessage('');
    setAttachedFile(null);
  };

  const handleQuickAction = (action) => {
    setMessage(action);
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-96 h-screen max-h-screen rounded-l-2xl shadow-2xl flex flex-col"
            style={{ backgroundColor: theme.tertiary }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 border-b flex items-center justify-between"
              style={{ borderColor: theme.ui.border }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: theme.primary }}
                >
                  NB
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: theme.text.primary }}>
                    NEXBOT AI
                  </h3>
                  <p className="text-xs" style={{ color: theme.text.secondary }}>
                    Always here to help
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'text-white rounded-br-none bg-gray-500'
                        : 'rounded-bl-none text-gray-800 bg-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Actions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 mt-4"
                >
                  <p className="text-sm text-gray-600">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        onClick={() => handleQuickAction(action)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Attached File Display */}
            {attachedFile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-3 border-t flex items-center justify-between bg-gray-50"
                style={{ borderColor: theme.ui.border }}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 truncate">
                    <p className="text-xs font-medium text-gray-700 truncate">{attachedFile.name}</p>
                    <p className="text-xs text-gray-500">{(attachedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRemoveAttachment}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            )}

            {/* Input Area */}
            <div
              className="px-6 py-4 border-t"
              style={{ borderColor: theme.ui.border }}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-3 pr-20 border-2 rounded-lg focus:outline-none focus:border-black transition-all"
                  style={{
                    borderColor: '#4B5563',
                  }}
                />
                
                {/* Attachment Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAttachmentClick}
                  className="absolute right-12 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L7.172 15" />
                  </svg>
                </motion.button>

                {/* Send Icon Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="absolute right-3 p-1 text-white transition-colors"
                  style={{ color: message.trim() ? theme.primary : '#ccc' }}
                  disabled={!message.trim()}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4772922 C0.994623095,2.05458435 0.837654304,3.16346272 1.15159189,3.94894926 L3.03521743,10.4598767 C3.03521743,10.6169741 3.19218622,10.7740715 3.50612381,10.7740715 L16.6915026,11.5595584 C16.6915026,11.5595584 17.1624089,11.5595584 17.1624089,12.0308506 C17.1624089,12.5021428 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
                  </svg>
                </motion.button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="*/*"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistantModal;
