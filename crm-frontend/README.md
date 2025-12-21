# Nexora CRM - Frontend

Modern React landing page and CRM interface for Nexora CRM platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── Avatar.jsx
│   ├── ChatBotBadge.jsx
│   └── ChatWindow.jsx
├── pages/            # Page components (for routing)
├── routes/           # Route configuration
├── data/             # Static data & constants
├── assets/           # Images, fonts, icons
├── utils/            # Utility functions
│   └── sendMessage.js # Chat API integration (stub)
├── App.jsx           # Main component
├── main.jsx          # React entry point
└── index.css         # Global styles
```

## Technologies

- **React 18.2** - UI framework
- **Vite 4.5** - Build tool
- **Tailwind CSS 3.3** - Styling
- **Framer Motion 10.16** - Animations
- **Spline** - 3D models
- **Swiper 10.3** - Carousels

## Features

### Landing Page
- Hero section with 3D Spline model
- Navigation bar with scroll animations
- Feature showcase cards
- AI features section
- Footer with social links

### Chatbot (NEXBOT)
- Floating chat button (bottom-right)
- Chat window with animations
- Quick action buttons
- Typing indicator
- File attachment UI
- Responsive design

### Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Smooth animations

## Configuration

### Tailwind CSS
Customize in `tailwind.config.js`:
- Colors, fonts, spacing
- Custom utilities

### Vite
Configure in `vite.config.js`:
- Port, build options
- Environment variables

## Styling

### Global Styles (`index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.button-style-black { ... }
```

## Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## API Integration

### Chat API (`utils/sendMessage.js`)

Currently a stub. To integrate with backend:

```javascript
export async function sendMessage(text) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  return response.json();
}
```

## Components

### ChatBotBadge
- Floating button with avatar
- Shows/hides chat window
- Auto-dismissing tooltip

### ChatWindow
- Message display
- Input field with send button
- File attachment
- Quick action buttons
- Typing indicator

### Avatar
- SVG component
- 40x40 icon
- Customizable colors

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Future Enhancements

- [ ] React Router integration
- [ ] User authentication
- [ ] Real API integration
- [ ] Dashboard pages
- [ ] Contact management
- [ ] Deal tracking
- [ ] Task management
- [ ] Real chatbot AI

## Performance Optimization

- Code splitting with React.lazy
- Image optimization
- CSS minification
- Tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind styles not appearing
- Clear cache: `npm run build`
- Check `tailwind.config.js` content paths
- Restart dev server

## Contributing

1. Create components in `/components`
2. Update imports in `App.jsx`
3. Test responsive design
4. Maintain consistent styling

## License

MIT

---

**Status**: ✅ Production Ready (except for backend integration)
**Last Updated**: December 16, 2025
