import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TemplateGalleryFilters from './TemplateGalleryFilters';
import GalleryTemplateCard from './GalleryTemplateCard';
import { galleryTemplates, getGalleryTemplatesByCategory, getGalleryCategories } from '../../data/galleryTemplates';

const TemplateGallery = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getGalleryCategories();

  const filteredTemplates = useMemo(() => {
    let templates = getGalleryTemplatesByCategory(selectedCategory);

    if (searchQuery.trim()) {
      templates = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return templates;
  }, [selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="template-gallery-section">
      {/* Gallery Header */}
      <motion.div
        className="gallery-section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="gallery-section-title">Choose a Template</h2>
        <p className="gallery-section-description">
          Select from our professionally designed email templates to get started
        </p>
      </motion.div>

      {/* Filter Section */}
      <TemplateGalleryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Templates Grid */}
      <motion.div
        className="gallery-templates-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTemplates.length > 0 ? (
          <motion.div className="gallery-templates-grid">
            {filteredTemplates.map((template) => (
              <motion.div key={template.id} variants={itemVariants}>
                <GalleryTemplateCard
                  template={template}
                  onSelect={onSelectTemplate}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="gallery-no-templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="gallery-empty-state">
              <div className="gallery-empty-icon">📧</div>
              <h3>No templates found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Counter */}
      {filteredTemplates.length > 0 && (
        <motion.div
          className="gallery-results-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
        </motion.div>
      )}
    </div>
  );
};

export default TemplateGallery;
