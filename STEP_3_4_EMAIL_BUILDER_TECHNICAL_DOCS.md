# STEP 3.4 EMAIL BUILDER - TECHNICAL DOCUMENTATION

## 📂 FILE STRUCTURE

```
crm-frontend/
├── src/
│   ├── components/
│   │   └── email-builder/
│   │       ├── EmailBuilder.jsx          (Main orchestrator - 75 lines)
│   │       ├── EmailEditor.jsx           (Editor layout - 139 lines)
│   │       ├── TemplateSelector.jsx      (Template cards - 47 lines)
│   │       ├── ComponentLibrary.jsx      (Block library - 43 lines)
│   │       ├── EmailCanvas.jsx           (Canvas area - 60 lines)
│   │       ├── BlockRenderer.jsx         (Block rendering - 80 lines)
│   │       ├── BlockSettings.jsx         (Settings panel - 283 lines)
│   │       └── EmailBuilder.css          (All styling - 500+ lines)
│   ├── pages/
│   │   └── EmailBuilder.jsx              (Page wrapper - 7 lines) ✅ UPDATED
│   ├── data/
│   │   └── emailTemplates.js             (Template data - 136 lines) ✅ NEW
│   ├── routes/
│   │   └── AppRoutes.jsx                 (Already configured with route)
│   └── ...
```

## 🔗 ROUTING

**Route**: `/app/email-builder`

**Handler**: 
```jsx
src/pages/EmailBuilder.jsx
  └── src/components/email-builder/EmailBuilder.jsx
      ├── TemplateSelector (initial view)
      └── EmailEditor (after template selected)
```

**Already configured** in `AppRoutes.jsx`:
```jsx
<Route path="/app/email-builder" element={<EmailBuilder />} />
```

## 🎯 COMPONENT HIERARCHY

```
EmailBuilder (State: selectedTemplate, blocks)
│
├─ Header
│  └─ Page title & subtitle
│
├─ TemplateSelector
│  └─ 4 Template Cards
│     └─ onClick → sets selectedTemplate
│
└─ EmailEditor (When template selected)
   │
   ├─ Header (with back button)
   │
   ├─ Main Editor (3-panel layout)
   │  │
   │  ├─ ComponentLibrary (left)
   │  │  └─ 5 Block Type Buttons
   │  │     └─ onClick → calls onAddBlock()
   │  │
   │  ├─ EmailCanvas (center)
   │  │  └─ Reorder.Group (drag-drop)
   │  │     └─ Reorder.Item x N (each block)
   │  │        └─ BlockRenderer
   │  │           └─ Renders block based on type
   │  │
   │  └─ BlockSettings (right)
   │     └─ Dynamic settings based on selectedBlock
   │        ├─ TextSettings
   │        ├─ ImageSettings
   │        ├─ ButtonSettings
   │        ├─ DividerSettings
   │        └─ SpacerSettings
   │
   └─ Footer (Action Buttons)
      ├─ Preview button
      ├─ Save Draft button
      ├─ Send Test button
      └─ Save & Continue button
```

## 📊 STATE MANAGEMENT

### EmailBuilder Component State
```jsx
const [selectedTemplate, setSelectedTemplate] = useState(null);
const [blocks, setBlocks] = useState([]);
```

### EmailEditor Component State
```jsx
const [selectedBlockId, setSelectedBlockId] = useState(null);
const [emailTitle, setEmailTitle] = useState('Email Title');
const [isSaved, setIsSaved] = useState(false);
```

### Data Flow
```
User Action
    ↓
Component Updates State
    ↓
Component Re-renders
    ↓
Props Updated for Child Components
    ↓
UI Updates (Framer Motion animations)
    ↓
localStorage Updated (on Save Draft)
```

## 🔄 DATA STRUCTURES

### Template Object
```javascript
{
  id: 1,
  name: 'Promotional',
  category: 'promotional',
  thumbnail: '🎉',
  description: 'Perfect for promotional campaigns',
  blocks: [
    { id: 'block-1', type: 'text', content: '...', fontSize: 32, ... },
    { id: 'block-2', type: 'divider', color: '#e5e7eb', height: 2 },
    ...
  ]
}
```

### Block Object
```javascript
{
  id: 'block-1234567890',
  type: 'text', // or 'image', 'button', 'divider', 'spacer'
  // Type-specific properties:
  // Text:
  content: 'Sample text',
  fontSize: 16,
  alignment: 'left',
  color: '#000000',
  fontWeight: 'normal',
  
  // Image:
  src: 'https://...',
  alt: 'Description',
  width: 600,
  height: 300,
  
  // Button:
  text: 'Click Here',
  url: 'https://...',
  backgroundColor: '#000000',
  textColor: '#ffffff',
  
  // Divider:
  color: '#e5e7eb',
  height: 2,
  
  // Spacer:
  height: 20
}
```

### Draft Object (localStorage)
```javascript
{
  id: 'draft-1702832400000',
  title: 'Promotional Email',
  template: 1,
  blocks: [...],
  savedAt: '2025-12-17T20:40:00.000Z'
}
```

## 💾 FUNCTIONS & METHODS

### emailTemplates.js

#### `emailTemplates` (Array)
- **Type**: Array of template objects
- **Length**: 4 templates
- **Used by**: TemplateSelector

#### `blockTypes` (Array)
- **Type**: Array of block type definitions
- **Used by**: ComponentLibrary
- **Properties**: id, name, icon

#### `getDefaultBlock(type)`
- **Parameters**: blockType (string)
- **Returns**: Block object with default values
- **Used by**: ComponentLibrary when adding block
```javascript
getDefaultBlock('text') → {
  id: 'block-1702832400000',
  type: 'text',
  content: 'Click to edit text',
  fontSize: 16,
  alignment: 'left',
  color: '#000000',
  fontWeight: 'normal'
}
```

### EmailBuilder.jsx

#### `handleTemplateSelect(template)`
- **Purpose**: Set selected template and load its blocks
- **Parameters**: template object
- **Action**: Updates selectedTemplate and blocks state

#### `handleBackToTemplates()`
- **Purpose**: Return to template selector
- **Action**: Clears selectedTemplate and blocks

### EmailEditor.jsx

#### `handleAddBlock(newBlock)`
- **Purpose**: Add new block to email
- **Triggers**: ComponentLibrary button click
- **Action**: Appends block and selects it

#### `handleRemoveBlock(blockId)`
- **Purpose**: Delete block from email
- **Triggers**: Block's remove button click
- **Action**: Removes block and clears selection

#### `handleUpdateBlock(updatedBlock)`
- **Purpose**: Update block properties
- **Triggers**: BlockSettings form changes
- **Action**: Updates block in blocks array

#### `handleReorderBlocks(newBlocks)`
- **Purpose**: Handle drag-and-drop reordering
- **Triggers**: Framer Motion Reorder
- **Action**: Reorders blocks array

#### `handleSaveDraft()`
- **Purpose**: Save email to localStorage
- **Action**: Creates draft object, stores in localStorage
- **Feedback**: Toast notification "✓ Draft Saved"

#### `handlePreview()`
- **Purpose**: Open email preview (UI placeholder)
- **Current**: Shows alert

#### `handleSendTest()`
- **Purpose**: Send test email (UI placeholder)
- **Current**: Shows alert

### TemplateSelector.jsx

No external functions - purely presentational component

### ComponentLibrary.jsx

#### `handleAddBlock(blockType)`
- **Purpose**: Create and add new block
- **Triggers**: Block type button click
- **Action**: Calls `getDefaultBlock()`, then `onAddBlock()`

### EmailCanvas.jsx

#### Reorder Integration
- **Library**: Framer Motion Reorder
- **Purpose**: Enable drag-and-drop block reordering
- **Event**: `onReorder={onReorderBlocks}`

### BlockRenderer.jsx

#### `renderBlock()`
- **Purpose**: Render block based on type
- **Logic**: Switch statement on block.type
- **Returns**: JSX element specific to block type

### BlockSettings.jsx

#### `handleChange(field, value)`
- **Purpose**: Update block property in real-time
- **Action**: Updates formData, calls onUpdateBlock
- **Trigger**: Any input/select change

#### `renderSettings()`
- **Purpose**: Return settings UI for selected block
- **Logic**: Switch on block type
- **Returns**: JSX with type-specific controls

## 🎨 CSS CLASSES

### Layout Classes
```css
.email-builder              /* Main container */
.email-builder-sidebar     /* Left panel */
.email-builder-main        /* Right container */
.email-canvas-wrapper      /* 3-panel flex container */
.email-canvas              /* Center canvas area */
.email-content             /* White email container */
```

### Block Classes
```css
.email-block               /* Individual block container */
.email-block.selected      /* Selected state */
.email-block.hover         /* Hover state */
.block-drag-handle         /* Drag indicator */
.block-remove-btn          /* Remove button */
```

### Component Classes
```css
.component-library         /* Left library panel */
.block-item                /* Individual block button */
.settings-panel            /* Right settings panel */
.template-selector         /* Grid of templates */
.template-card             /* Individual template */
.action-buttons            /* Footer button group */
```

### Settings Classes
```css
.setting-group             /* Label + input pair */
.setting-label             /* Input label */
.setting-input             /* Text input */
.setting-textarea          /* Text area */
.setting-select            /* Dropdown select */
.color-picker-group        /* Color input + hex */
.color-input               /* Color picker */
```

## 🔌 INTEGRATION POINTS

### Existing App Integration
- ✅ Route: `/app/email-builder` (configured in AppRoutes.jsx)
- ✅ Layout: Uses PageWrapper component
- ✅ Sidebar: Not modified, remains fixed
- ✅ Navbar: Not modified, remains fixed
- ✅ Theme: Uses existing theme colors
- ✅ Auth: Uses existing authentication (no changes needed)

### Future Backend Integration Points

1. **Save Email Template**
```javascript
// In EmailEditor.jsx, replace handleSaveDraft:
async function handleSaveTemplate() {
  const response = await api.post('/emails', {
    title: emailTitle,
    template: template.id,
    blocks: blocks,
    content: renderEmailAsHTML(blocks)
  });
  setEmailId(response.id);
}
```

2. **Load Saved Email**
```javascript
useEffect(() => {
  if (emailId) {
    api.get(`/emails/${emailId}`).then(email => {
      setEmailTitle(email.title);
      setBlocks(email.blocks);
    });
  }
}, [emailId]);
```

3. **Send Test Email**
```javascript
async function handleSendTest() {
  const response = await api.post('/emails/send-test', {
    blocks: blocks,
    to: currentUser.email
  });
  showToast('Test email sent!');
}
```

4. **List Saved Templates**
```javascript
async function loadSavedTemplates() {
  const templates = await api.get('/emails');
  setSavedTemplates(templates);
}
```

## 🚀 DEPLOYMENT CHECKLIST

- ✅ All components created and working
- ✅ CSS styling complete and responsive
- ✅ No console errors or warnings
- ✅ Build passes (npm run build)
- ✅ Animations smooth (60fps)
- ✅ Mobile responsive verified
- ✅ Drag-and-drop functional
- ✅ Settings updates real-time
- ✅ Draft saving works
- ✅ Route configured
- ✅ Documentation complete

## 📋 DEPENDENCIES

### npm Packages Required
```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "framer-motion": "^10.0.0"
}
```

### CSS Framework
- Tailwind CSS (already in project)

### Optional Tools (Future)
- React Hook Form (for advanced forms)
- Axios (for API calls)
- React Query (for data fetching)

## 🧪 TESTING SUGGESTIONS

### Unit Tests
- BlockRenderer: Test each block type renders correctly
- BlockSettings: Test settings values update correctly
- ComponentLibrary: Test new block creation

### Integration Tests
- Template selection → blocks load
- Block addition → appears in canvas
- Block editing → updates in canvas
- Block reordering → persists order
- Save draft → localStorage updated

### E2E Tests
- Complete workflow: Select template → Edit → Save
- Mobile responsive: Test on multiple viewports
- Browser compatibility: Chrome, Firefox, Safari

## 📚 ADDITIONAL RESOURCES

### Framer Motion Docs
- https://www.framer.com/motion/

### React Docs
- https://react.dev/

### Tailwind CSS
- https://tailwindcss.com/

### localStorage API
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

**Document Version**: 1.0  
**Last Updated**: December 17, 2025  
**Status**: Complete and Ready for Reference
