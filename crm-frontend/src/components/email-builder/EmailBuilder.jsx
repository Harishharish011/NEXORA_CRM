import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../PageWrapper';
import TemplateSelector from './TemplateSelector';
import TemplateGallery from './TemplateGallery';
import EmailEditor from './EmailEditor';
import './EmailBuilder.css';

const EmailBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [blocks, setBlocks] = useState([]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setBlocks([...template.blocks]);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setBlocks([]);
  };

  return (
    <PageWrapper>
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-black">Email Builder</h1>
            <p className="text-gray-600 mt-2">Design and manage your email campaigns</p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedTemplate ? (
              <motion.div
                key="templates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full overflow-y-auto"
              >
                <div>
                  {/* Existing 4 Template Components */}
                  <TemplateSelector onSelectTemplate={handleTemplateSelect} />
                  
                  {/* NEW: Template Gallery Below */}
                  <TemplateGallery onSelectTemplate={handleTemplateSelect} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <EmailEditor
                  template={selectedTemplate}
                  blocks={blocks}
                  setBlocks={setBlocks}
                  onBackToTemplates={handleBackToTemplates}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmailBuilder;
