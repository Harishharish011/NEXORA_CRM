import React from 'react';

const BlockRenderer = ({ block, isSelected }) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        return (
          <div
            className="text-block"
            style={{
              fontSize: `${block.fontSize}px`,
              textAlign: block.alignment,
              color: block.color,
              fontWeight: block.fontWeight,
            }}
          >
            {block.content}
          </div>
        );

      case 'image':
        return (
          <div className="image-block w-full">
            <img
              src={block.src}
              alt={block.alt}
              style={{
                width: block.width ? `${block.width}px` : '100%',
                height: block.height ? `${block.height}px` : 'auto',
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x300?text=Image+Error';
              }}
            />
          </div>
        );

      case 'button':
        return (
          <div style={{ textAlign: block.alignment }}>
            <button
              className="button-block"
              style={{
                backgroundColor: block.backgroundColor,
                color: block.textColor,
              }}
              disabled
            >
              {block.text}
            </button>
          </div>
        );

      case 'divider':
        return (
          <div
            className="divider-block"
            style={{
              height: `${block.height}px`,
              backgroundColor: block.color,
            }}
          />
        );

      case 'spacer':
        return (
          <div
            style={{
              height: `${block.height}px`,
            }}
          />
        );

      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div className={isSelected ? 'ring-2 ring-black ring-opacity-20 rounded' : ''}>
      {renderBlock()}
    </div>
  );
};

export default BlockRenderer;
