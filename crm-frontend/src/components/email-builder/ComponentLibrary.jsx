import React from 'react';
import { motion } from 'framer-motion';
import { blockTypes, BlockIconSVGs, getDefaultBlock } from '../../data/emailTemplates';

const ComponentLibrary = ({ onAddBlock }) => {
  const handleAddBlock = (blockType) => {
    const newBlock = getDefaultBlock(blockType);
    onAddBlock(newBlock);
  };

  return (
    <div className="component-library flex flex-col">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
        <h3 className="text-sm font-bold text-black">Add Blocks</h3>
      </div>

      <div className="flex-1 flex flex-col">
        {blockTypes.map((blockType) => (
          <motion.button
            key={blockType.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAddBlock(blockType.id)}
            className="block-item"
            title={`Add ${blockType.name} block`}
          >
            <div
              className="block-icon text-gray-700"
              dangerouslySetInnerHTML={{ __html: BlockIconSVGs[blockType.icon] }}
            />
            <div className="text-xs font-medium text-black">{blockType.name}</div>
          </motion.button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          Click blocks to add them to your email
        </p>
      </div>
    </div>
  );
};

export default ComponentLibrary;
