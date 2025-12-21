import React from 'react';
import { motion } from 'framer-motion';
import { emailTemplates, TemplateIconSVGs } from '../../data/emailTemplates';

const TemplateSelector = ({ onSelectTemplate }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      <motion.div
        className="template-selector"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {emailTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={item}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(template)}
            className="template-card"
          >
            <div className="template-thumbnail text-gray-700">
              <div
                style={{ width: '32px', height: '32px' }}
                dangerouslySetInnerHTML={{ __html: TemplateIconSVGs[template.thumbnail] }}
              />
            </div>
            <div className="template-name">{template.name}</div>
            <div className="template-description">{template.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TemplateSelector;
