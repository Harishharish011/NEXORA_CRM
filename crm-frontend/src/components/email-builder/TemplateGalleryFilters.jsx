import React from 'react';
import { motion } from 'framer-motion';

const TemplateGalleryFilters = ({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange }) => {
  return (
    <motion.div
      className="template-gallery-filters"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {/* Search Box */}
      <div className="gallery-search-container">
        <input
          type="text"
          className="gallery-search-input"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="gallery-search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>

      {/* Category Filters */}
      <div className="gallery-filters-wrapper">
        <div className="gallery-filters-label">Filter by Category:</div>
        <motion.div className="gallery-filters-container" layout>
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`gallery-filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TemplateGalleryFilters;
