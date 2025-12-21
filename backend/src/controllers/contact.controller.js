/**
 * Contact Controller
 * Handles all CRUD operations for contacts
 * Ensures users can only access their own contacts
 */

const Contact = require('../models/Contact.model');

/**
 * Create a new contact
 * POST /api/contacts
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, jobTitle, status, tags } = req.body;
    const userId = req.userId;

    // Validation: firstName is required
    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: 'First name is required.',
      });
    }

    // Create contact object
    const contactData = {
      owner: userId,
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      email: email ? email.toLowerCase().trim() : undefined,
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      jobTitle: jobTitle ? jobTitle.trim() : undefined,
      status: status || 'Lead',
      tags: tags || [],
    };

    // Remove undefined fields
    Object.keys(contactData).forEach(
      (key) => contactData[key] === undefined && delete contactData[key]
    );

    // Create contact in database
    const contact = new Contact(contactData);
    await contact.save();

    return res.status(201).json({
      success: true,
      message: 'Contact created successfully.',
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error('Create contact error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating contact.',
    });
  }
};

/**
 * Get all contacts for the logged-in user
 * GET /api/contacts
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getAllContacts = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all contacts for the user, sorted by latest first
    const contacts = await Contact.find({ owner: userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully.',
      data: {
        contacts,
        count: contacts.length,
      },
    });
  } catch (error) {
    console.error('Get all contacts error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving contacts.',
    });
  }
};

/**
 * Get a single contact by ID
 * GET /api/contacts/:id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format.',
      });
    }

    // Find contact
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    // Authorization check: user can only access their own contacts
    if (contact.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this contact.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact retrieved successfully.',
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error('Get contact error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving contact.',
    });
  }
};

/**
 * Update a contact
 * PUT /api/contacts/:id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format.',
      });
    }

    // Find contact
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    // Authorization check: user can only update their own contacts
    if (contact.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this contact.',
      });
    }

    // Prepare fields that can be updated
    const allowedFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'company',
      'jobTitle',
      'status',
      'tags',
    ];

    // Update only allowed fields
    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        if (field === 'email') {
          contact[field] = updateData[field].toLowerCase().trim();
        } else if (field === 'tags') {
          contact[field] = updateData[field];
        } else if (typeof updateData[field] === 'string') {
          contact[field] = updateData[field].trim();
        } else {
          contact[field] = updateData[field];
        }
      }
    });

    // Save updated contact
    await contact.save();

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully.',
      data: {
        contact,
      },
    });
  } catch (error) {
    console.error('Update contact error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating contact.',
    });
  }
};

/**
 * Delete a contact
 * DELETE /api/contacts/:id
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID format.',
      });
    }

    // Find contact
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    // Authorization check: user can only delete their own contacts
    if (contact.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this contact.',
      });
    }

    // Delete the contact
    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully.',
      data: {
        contactId: id,
      },
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error deleting contact.',
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
