import React from 'react';
import { motion } from 'framer-motion';

const GalleryTemplateCard = ({ template, onSelect }) => {
  const categoryColorMap = {
    'Promotional': '#EF4444',
    'Newsletter': '#3B82F6',
    'Product Announcement': '#8B5CF6',
    'Event Invitation': '#F59E0B',
  };

  const categoryColor = categoryColorMap[template.category] || '#6B7280';

  const handleUseTemplate = () => {
    onSelect(template);
  };

  // Render a simplified preview of the template design
  const renderPreview = () => {
    const previewBlocks = template.blocks.slice(0, 3);
    return (
      <div className="gallery-preview-container">
        {previewBlocks.map((block, idx) => {
          if (block.type === 'text') {
            return (
              <div
                key={idx}
                className="preview-text"
                style={{
                  color: block.color || '#1F2937',
                  fontSize: `${Math.min(block.fontSize || 14, 18)}px`,
                  fontWeight: block.fontWeight || '400',
                  textAlign: block.alignment || 'center',
                  marginBottom: '6px',
                  wordBreak: 'break-word',
                  fontFamily: block.fontFamily || 'system-ui',
                }}
              >
                {block.content.substring(0, 35)}
              </div>
            );
          }
          if (block.type === 'divider') {
            return (
              <div
                key={idx}
                style={{
                  height: `${block.height || 1}px`,
                  backgroundColor: block.color || '#e5e7eb',
                  margin: '6px 0',
                }}
              />
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <motion.div
      className="gallery-template-card"
      whileHover={{ y: -8, boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Thumbnail Preview */}
      <div
        className="gallery-card-thumbnail"
        style={{ backgroundColor: template.colors.background }}
      >
        <div className="gallery-card-preview-content">
          {renderPreview()}
        </div>
      </div>

      {/* Card Info */}
      <div className="gallery-card-info">
        <div className="gallery-card-header">
          <h3 className="gallery-card-name">{template.name}</h3>
          <motion.div
            className="gallery-category-badge"
            style={{ backgroundColor: categoryColor }}
            whileHover={{ scale: 1.05 }}
          >
            {template.category}
          </motion.div>
        </div>

        <p className="gallery-card-description">{template.description}</p>

        {/* Enhanced CTA Button */}
        <motion.button
          className="gallery-use-template-btn"
          onClick={handleUseTemplate}
          style={{
            borderColor: template.colors.primary,
            color: template.colors.primary,
            backgroundColor: '#FFFFFF',
          }}
          whileHover={{ 
            backgroundColor: template.colors.primary, 
            color: '#FFFFFF',
          }}
          whileTap={{ 
            scale: 0.96,
            backgroundColor: template.colors.primary,
            color: '#FFFFFF',
          }}
        >
          Use Template
        </motion.button>
      </div>

      {/* Color Indicator Dots */}
      <div className="gallery-color-indicators">
        <motion.div 
          className="gallery-color-dot" 
          style={{ backgroundColor: template.colors.primary }}
          whileHover={{ scale: 1.2 }}
        />
        <motion.div 
          className="gallery-color-dot" 
          style={{ backgroundColor: template.colors.accent }}
          whileHover={{ scale: 1.2 }}
        />
        <motion.div 
          className="gallery-color-dot" 
          style={{ backgroundColor: template.colors.background, border: '1px solid #e5e7eb' }}
          whileHover={{ scale: 1.2 }}
        />
      </div>
    </motion.div>
  );
};

export default GalleryTemplateCard;
