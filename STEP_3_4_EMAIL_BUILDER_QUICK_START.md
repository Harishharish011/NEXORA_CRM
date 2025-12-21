# STEP 3.4 EMAIL BUILDER - QUICK START GUIDE

## 🚀 Getting Started

### Route
```
http://localhost:5173/app/email-builder
```

### What You'll See
1. **Template Selection Screen**: 4 professional email templates
2. **Email Editor**: 3-panel layout for building custom emails

---

## 📋 TEMPLATES AVAILABLE

| Template | Icon | Description | Blocks |
|----------|------|-------------|--------|
| **Promotional** | 🎉 | Special offers & discounts | 5 blocks |
| **Newsletter** | 📰 | Monthly updates & highlights | 6 blocks |
| **Product Announcement** | 🚀 | New product launches | 7 blocks |
| **Event Invitation** | 📅 | Event details & RSVP | 7 blocks |

---

## 🛠️ HOW TO USE

### Step 1: Select a Template
```
1. Click any template card on the main screen
2. Editor opens with template blocks pre-loaded
3. You can immediately edit or add more blocks
```

### Step 2: Edit Block Content
```
1. Click any block in the email canvas (center)
2. Block settings appear in right panel
3. Edit content, colors, sizes, etc.
4. Changes update instantly in canvas
```

### Step 3: Add New Blocks
```
1. Click a block type in Component Library (left)
   - Text: Headers, body text
   - Image: Product images
   - Button: Call-to-action buttons
   - Divider: Visual separators
   - Spacer: Add vertical space
2. Block appears at bottom of email
3. Settings panel opens automatically
```

### Step 4: Reorder Blocks
```
1. Hover over a block in canvas
2. Drag handle appears on left side
3. Click and drag up/down to reorder
4. Drop to place block in new position
```

### Step 5: Remove Blocks
```
1. Click any block in canvas to select it
2. Red "✕" button appears (top right of block)
3. Click to remove block
```

### Step 6: Save Your Work
```
1. Click "💾 Save Draft" button (bottom)
2. Toast shows "✓ Draft Saved"
3. Email saved to browser localStorage
4. You can close and resume later
```

---

## ⚙️ BLOCK SETTINGS REFERENCE

### TEXT BLOCK
```
✓ Text Content (textarea)
✓ Font Size (10-48px, slider)
✓ Alignment (left, center, right)
✓ Font Weight (normal, bold, 600)
✓ Text Color (color picker + hex input)
```

### IMAGE BLOCK
```
✓ Image URL (https://...)
✓ Alt Text (for accessibility)
✓ Width (px)
✓ Height (px)
```

### BUTTON BLOCK
```
✓ Button Text
✓ Button URL (where to link)
✓ Alignment (left, center, right)
✓ Background Color (color picker)
✓ Text Color (color picker)
```

### DIVIDER BLOCK
```
✓ Divider Color (color picker)
✓ Divider Height (1-10px)
```

### SPACER BLOCK
```
✓ Spacer Height (5-100px, slider)
```

---

## 🎯 COMMON TASKS

### Create a Custom Email from Scratch
```
1. Select any template
2. Delete unwanted template blocks (click ✕)
3. Add custom blocks using Component Library
4. Edit each block's content and styling
5. Click Save Draft when done
```

### Edit Template Content
```
1. Select template
2. Click on a block (e.g., the main heading)
3. Edit the text content in Settings panel
4. Modify colors, sizes as needed
5. Repeat for other blocks
```

### Add Brand Colors
```
1. Select template
2. Click each block that needs color change
3. Use Color Picker in Settings (left side of hex input)
4. Pick your brand color
5. Repeat for all text and buttons
```

### Create Email with Custom Image
```
1. Select template
2. Click Image block (or add one from Library)
3. Paste image URL in "Image URL" field
4. Adjust width/height as needed
5. Add text blocks below image
6. Save Draft
```

---

## 🎨 DESIGN TIPS

✨ **Professional Emails**
- Use 2-3 complementary colors maximum
- Keep text sizes readable (16px minimum for body)
- Add dividers between sections
- Use spacers for breathing room
- Center align important headlines

📱 **Mobile-Friendly**
- Keep email width at 600px (automatic)
- Use clear, readable fonts
- Buttons should be at least 44px tall
- Don't use very long lines of text
- Test layout on mobile after editing

🎯 **CTA Buttons**
- Use contrasting button colors
- Keep button text short and action-focused
- "Learn More", "Shop Now", "RSVP" work well
- Position buttons prominently

---

## ❓ FAQ

**Q: Can I save my email?**
A: Yes! Click "Save Draft" button. Emails are saved to your browser's localStorage.

**Q: Can I delete a block?**
A: Yes! Click the block, then click the red "✕" button that appears.

**Q: Can I undo changes?**
A: Go back to templates (← button) and re-select the template to start over.

**Q: Can I send emails from here?**
A: Not yet. "Send Test" is a UI placeholder. Full integration coming soon.

**Q: Can I add custom HTML?**
A: Not in this version. Use the visual blocks only.

**Q: Are my drafts saved permanently?**
A: Drafts are saved in your browser. Clearing browser data will remove them.

**Q: Can I export the email?**
A: Exporting is not available in this version.

**Q: Can I use custom fonts?**
A: Currently supports system fonts. Advanced typography coming soon.

---

## 🔧 KEYBOARD SHORTCUTS

Currently, no keyboard shortcuts are implemented. All actions use:
- Mouse click
- Drag and drop
- On-screen buttons

---

## 📱 DEVICE SUPPORT

| Device | Layout | Status |
|--------|--------|--------|
| Desktop (1200px+) | 3-panel layout | ✅ Full featured |
| Tablet (768-1199px) | Simplified layout | ✅ Functional |
| Mobile (<768px) | Single column | ✅ Optimized |

---

## 🐛 TROUBLESHOOTING

**Issue**: Settings panel not updating  
**Solution**: Click on the block again to refresh

**Issue**: Colors not saving  
**Solution**: Wait for toast to show "Draft Saved" then refresh

**Issue**: Blocks look different on mobile  
**Solution**: Email width is fixed at 600px. Use responsive text sizes

**Issue**: Can't see all settings  
**Solution**: Scroll down in settings panel on the right

**Issue**: Dragging blocks doesn't work  
**Solution**: Look for drag handle (small line on left), drag from there

---

## 📞 SUPPORT

For issues or feature requests, contact the development team.

---

**Last Updated**: December 17, 2025  
**Version**: 1.0 (Production)  
**Status**: ✅ Fully Functional
