/**
 * Contact Routes
 * Defines all contact management API endpoints
 * All routes are protected with JWT authentication
 */

const express = require('express');
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * All contact routes are protected - require JWT token
 */

/**
 * Create Contact
 * POST /api/contacts
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { firstName, lastName?, email?, phone?, company?, jobTitle?, status?, tags? }
 */
router.post('/', authMiddleware, createContact);

/**
 * Get All Contacts
 * GET /api/contacts
 * Headers: { Authorization: "Bearer <token>" }
 * Returns: All contacts owned by the logged-in user, sorted by latest first
 */
router.get('/', authMiddleware, getAllContacts);

/**
 * Get Single Contact
 * GET /api/contacts/:id
 * Headers: { Authorization: "Bearer <token>" }
 * Returns: Contact details if owned by the logged-in user
 */
router.get('/:id', authMiddleware, getContactById);

/**
 * Update Contact
 * PUT /api/contacts/:id
 * Headers: { Authorization: "Bearer <token>" }
 * Body: { firstName?, lastName?, email?, phone?, company?, jobTitle?, status?, tags? }
 * Note: Only the user who created the contact can update it
 */
router.put('/:id', authMiddleware, updateContact);

/**
 * Delete Contact
 * DELETE /api/contacts/:id
 * Headers: { Authorization: "Bearer <token>" }
 * Note: Only the user who created the contact can delete it
 */
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;
