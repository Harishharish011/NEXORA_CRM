import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BlockSettings = ({ selectedBlock, onUpdateBlock }) => {
  const [formData, setFormData] = useState(selectedBlock || {});

  useEffect(() => {
    setFormData(selectedBlock || {});
  }, [selectedBlock]);

  if (!selectedBlock) {
    return (
      <div className="settings-panel flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-sm font-medium">Select a block to edit</p>
        </div>
      </div>
    );
  }

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateBlock(updated);
  };

  const renderSettings = () => {
    switch (selectedBlock.type) {
      case 'text':
        return (
          <>
            <div className="setting-group">
              <label className="setting-label">Text Content</label>
              <textarea
                className="setting-textarea"
                value={formData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Enter text content..."
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Font Size</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="10"
                  max="48"
                  value={formData.fontSize || 16}
                  onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-[40px]">
                  {formData.fontSize}px
                </span>
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">Alignment</label>
              <select
                className="setting-select"
                value={formData.alignment || 'left'}
                onChange={(e) => handleChange('alignment', e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Font Weight</label>
              <select
                className="setting-select"
                value={formData.fontWeight || 'normal'}
                onChange={(e) => handleChange('fontWeight', e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="600">Semi-bold</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Text Color</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  className="color-input"
                  value={formData.color || '#000000'}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
                <input
                  type="text"
                  className="setting-input flex-1"
                  value={formData.color || '#000000'}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div className="setting-group">
              <label className="setting-label">Image URL</label>
              <input
                type="text"
                className="setting-input"
                value={formData.src || ''}
                onChange={(e) => handleChange('src', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Alt Text</label>
              <input
                type="text"
                className="setting-input"
                value={formData.alt || ''}
                onChange={(e) => handleChange('alt', e.target.value)}
                placeholder="Image description"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Width (px)</label>
              <input
                type="number"
                className="setting-input"
                value={formData.width || 600}
                onChange={(e) => handleChange('width', parseInt(e.target.value))}
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Height (px)</label>
              <input
                type="number"
                className="setting-input"
                value={formData.height || 300}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
              />
            </div>
          </>
        );

      case 'button':
        return (
          <>
            <div className="setting-group">
              <label className="setting-label">Button Text</label>
              <input
                type="text"
                className="setting-input"
                value={formData.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="Click Here"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Button URL</label>
              <input
                type="text"
                className="setting-input"
                value={formData.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Alignment</label>
              <select
                className="setting-select"
                value={formData.alignment || 'center'}
                onChange={(e) => handleChange('alignment', e.target.value)}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="setting-group">
              <label className="setting-label">Background Color</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  className="color-input"
                  value={formData.backgroundColor || '#000000'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
                <input
                  type="text"
                  className="setting-input flex-1"
                  value={formData.backgroundColor || '#000000'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">Text Color</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  className="color-input"
                  value={formData.textColor || '#ffffff'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                />
                <input
                  type="text"
                  className="setting-input flex-1"
                  value={formData.textColor || '#ffffff'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'divider':
        return (
          <>
            <div className="setting-group">
              <label className="setting-label">Divider Color</label>
              <div className="color-picker-group">
                <input
                  type="color"
                  className="color-input"
                  value={formData.color || '#e5e7eb'}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
                <input
                  type="text"
                  className="setting-input flex-1"
                  value={formData.color || '#e5e7eb'}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
              </div>
            </div>

            <div className="setting-group">
              <label className="setting-label">Divider Height (px)</label>
              <input
                type="number"
                className="setting-input"
                min="1"
                max="10"
                value={formData.height || 2}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
              />
            </div>
          </>
        );

      case 'spacer':
        return (
          <div className="setting-group">
            <label className="setting-label">Spacer Height (px)</label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="5"
                max="100"
                value={formData.height || 20}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 min-w-[50px]">
                {formData.height}px
              </span>
            </div>
          </div>
        );

      default:
        return <div className="text-sm text-gray-600">No settings available</div>;
    }
  };

  return (
    <motion.div
      className="settings-panel p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200 mb-4">
        <h3 className="text-sm font-bold text-black">
          {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)} Settings
        </h3>
      </div>

      <div className="space-y-4">{renderSettings()}</div>
    </motion.div>
  );
};

export default BlockSettings;
