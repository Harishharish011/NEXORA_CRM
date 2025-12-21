import React from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import BlockRenderer from './BlockRenderer';

const EmailCanvas = ({ blocks, selectedBlockId, onSelectBlock, onRemoveBlock, onUpdateBlock, onReorderBlocks }) => {
  return (
    <div className="email-canvas">
      <motion.div
        className="email-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Reorder.Group
          axis="y"
          values={blocks}
          onReorder={onReorderBlocks}
          className="w-full"
        >
          <AnimatePresence mode="popLayout">
            {blocks.map((block) => (
              <Reorder.Item
                key={block.id}
                value={block}
                className={`email-block ${selectedBlockId === block.id ? 'selected' : ''}`}
                onClick={() => onSelectBlock(block.id)}
              >
                <div className="block-drag-handle" title="Drag to reorder" />

                <BlockRenderer
                  block={block}
                  isSelected={selectedBlockId === block.id}
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBlock(block.id);
                  }}
                  className="block-remove-btn px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                  title="Remove block"
                >
                  ✕
                </motion.button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>
    </div>
  );
};

export default EmailCanvas;
