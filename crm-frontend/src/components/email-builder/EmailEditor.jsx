import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComponentLibrary from './ComponentLibrary';
import EmailCanvas from './EmailCanvas';
import BlockSettings from './BlockSettings';

const EmailEditor = ({ template, blocks, setBlocks, onBackToTemplates }) => {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [emailTitle, setEmailTitle] = useState(`${template.name} Email`);
  const [isSaved, setIsSaved] = useState(false);

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  const handleAddBlock = (newBlock) => {
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const handleRemoveBlock = (blockId) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const handleUpdateBlock = (updatedBlock) => {
    setBlocks(
      blocks.map((block) => (block.id === updatedBlock.id ? updatedBlock : block))
    );
  };

  const handleReorderBlocks = (newBlocks) => {
    setBlocks(newBlocks);
  };

  const handleSaveDraft = () => {
    // Save to localStorage for persistence
    const draft = {
      id: `draft-${Date.now()}`,
      title: emailTitle,
      template: template.id,
      blocks: blocks,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`email-draft-${draft.id}`, JSON.stringify(draft));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePreview = () => {
    alert('Preview: This will open the email in a preview window (UI only)');
  };

  const handleSendTest = () => {
    alert('Send Test: This will send a test email to your address (UI only)');
  };

  return (
    <div className="email-builder h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackToTemplates}
              className="text-sm text-gray-600 hover:text-black mb-2 flex items-center gap-2"
            >
              ← Back to Templates
            </motion.button>
            <h2 className="text-2xl font-bold text-black">{template.name} Email</h2>
          </div>
          <div className="flex items-center gap-2">
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-600 font-medium"
              >
                ✓ Draft Saved
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="email-canvas-wrapper flex-1">
        {/* Left Panel - Component Library */}
        <ComponentLibrary onAddBlock={handleAddBlock} />

        {/* Center Panel - Email Canvas */}
        <EmailCanvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onRemoveBlock={handleRemoveBlock}
          onUpdateBlock={handleUpdateBlock}
          onReorderBlocks={handleReorderBlocks}
        />

        {/* Right Panel - Block Settings */}
        <BlockSettings selectedBlock={selectedBlock} onUpdateBlock={handleUpdateBlock} />
      </div>

      {/* Footer - Action Buttons */}
      <div className="action-buttons border-t border-gray-200 bg-white">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePreview}
          className="action-btn flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveDraft}
          className="action-btn flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Draft
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSendTest}
          className="action-btn flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Test
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn primary flex items-center justify-center gap-2"
          disabled
          title="Save for later or Backend Integration"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Save & Continue
        </motion.button>
      </div>
    </div>
  );
};

export default EmailEditor;
