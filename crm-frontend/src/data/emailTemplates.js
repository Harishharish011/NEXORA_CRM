// SVG Icon strings for templates and blocks
export const TemplateIconSVGs = {
  promotional: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  newsletter: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>`,
  announcement: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  event: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
};

export const BlockIconSVGs = {
  text: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  image: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  button: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5m0 0l-2-5m2 5v-7.5a1.5 1.5 0 113 0v7.5M8 10a2 2 0 100-4 2 2 0 000 4z"/></svg>`,
  divider: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12"/></svg>`,
  spacer: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>`,
};

// Email templates with pre-configured blocks
export const emailTemplates = [
  {
    id: 1,
    name: 'Promotional',
    category: 'promotional',
    thumbnail: 'promotional',
    description: 'Perfect for promotional campaigns',
    blocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Special Promotion',
        fontSize: 32,
        alignment: 'center',
        color: '#000000',
        fontWeight: 'bold',
      },
      {
        id: 'block-2',
        type: 'divider',
        color: '#e5e7eb',
        height: 2,
      },
      {
        id: 'block-3',
        type: 'text',
        content: 'Get exclusive discounts on our premium products. Limited time offer!',
        fontSize: 16,
        alignment: 'center',
        color: '#666666',
      },
      {
        id: 'block-4',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-5',
        type: 'button',
        text: 'Shop Now',
        url: 'https://example.com',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        alignment: 'center',
      },
    ],
  },
  {
    id: 2,
    name: 'Newsletter',
    category: 'newsletter',
    thumbnail: 'newsletter',
    description: 'Monthly newsletter template',
    blocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Monthly Newsletter',
        fontSize: 28,
        alignment: 'center',
        color: '#000000',
        fontWeight: 'bold',
      },
      {
        id: 'block-2',
        type: 'text',
        content: 'November 2024',
        fontSize: 14,
        alignment: 'center',
        color: '#999999',
      },
      {
        id: 'block-3',
        type: 'divider',
        color: '#e5e7eb',
        height: 2,
      },
      {
        id: 'block-4',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-5',
        type: 'text',
        content: 'This month\'s highlights:',
        fontSize: 18,
        alignment: 'left',
        color: '#000000',
        fontWeight: 'bold',
      },
      {
        id: 'block-6',
        type: 'text',
        content: '• Feature 1: New product launch\n• Feature 2: Customer success story\n• Feature 3: Industry insights',
        fontSize: 14,
        alignment: 'left',
        color: '#666666',
      },
    ],
  },
  {
    id: 3,
    name: 'Product Announcement',
    category: 'announcement',
    thumbnail: 'announcement',
    description: 'Announce new products',
    blocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Introducing Our Latest Innovation',
        fontSize: 32,
        alignment: 'center',
        color: '#000000',
        fontWeight: 'bold',
      },
      {
        id: 'block-2',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-3',
        type: 'image',
        src: 'https://via.placeholder.com/600x300?text=Product+Image',
        alt: 'Product Image',
        width: 600,
        height: 300,
      },
      {
        id: 'block-4',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-5',
        type: 'text',
        content: 'We\'re excited to launch our newest product designed to transform your workflow.',
        fontSize: 16,
        alignment: 'center',
        color: '#666666',
      },
      {
        id: 'block-6',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-7',
        type: 'button',
        text: 'Learn More',
        url: 'https://example.com/product',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        alignment: 'center',
      },
    ],
  },
  {
    id: 4,
    name: 'Event Invitation',
    category: 'event',
    thumbnail: 'event',
    description: 'Event invitation template',
    blocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'You\'re Invited!',
        fontSize: 36,
        alignment: 'center',
        color: '#000000',
        fontWeight: 'bold',
      },
      {
        id: 'block-2',
        type: 'text',
        content: 'Join us for an exclusive event',
        fontSize: 18,
        alignment: 'center',
        color: '#666666',
      },
      {
        id: 'block-3',
        type: 'divider',
        color: '#e5e7eb',
        height: 2,
      },
      {
        id: 'block-4',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-5',
        type: 'text',
        content: '📍 Location: Convention Center\n🕐 Date: December 15, 2024\n⏰ Time: 6:00 PM - 9:00 PM',
        fontSize: 14,
        alignment: 'center',
        color: '#000000',
      },
      {
        id: 'block-6',
        type: 'spacer',
        height: 20,
      },
      {
        id: 'block-7',
        type: 'button',
        text: 'RSVP Now',
        url: 'https://example.com/event',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        alignment: 'center',
      },
    ],
  },
];

// Available block types
export const blockTypes = [
  { id: 'text', name: 'Text', icon: 'text' },
  { id: 'image', name: 'Image', icon: 'image' },
  { id: 'button', name: 'Button', icon: 'button' },
  { id: 'divider', name: 'Divider', icon: 'divider' },
  { id: 'spacer', name: 'Spacer', icon: 'spacer' },
];

// Default block templates
export const getDefaultBlock = (type) => {
  const defaults = {
    text: {
      type: 'text',
      content: 'Click to edit text',
      fontSize: 16,
      alignment: 'left',
      color: '#000000',
      fontWeight: 'normal',
    },
    image: {
      type: 'image',
      src: 'https://via.placeholder.com/600x300?text=Image',
      alt: 'Image',
      width: 600,
      height: 300,
    },
    button: {
      type: 'button',
      text: 'Click Here',
      url: 'https://example.com',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      alignment: 'center',
    },
    divider: {
      type: 'divider',
      color: '#e5e7eb',
      height: 2,
    },
    spacer: {
      type: 'spacer',
      height: 20,
    },
  };

  return {
    id: `block-${Date.now()}`,
    ...defaults[type],
  };
};
