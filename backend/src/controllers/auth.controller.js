/**
 * Authentication Controller
 * Handles signup, login, and onboarding logic
 */

const User = require('../models/User.model');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/token');

/**
 * Signup Controller
 * POST /api/auth/signup
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please log in.',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      onboardingCompleted: false,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error during signup.',
    });
  }
};

/**
 * Login Controller
 * POST /api/auth/login
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error during login.',
    });
  }
};

/**
 * Complete Onboarding Controller
 * POST /api/auth/onboarding
 * Protected route - requires JWT token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const completeOnboarding = async (req, res) => {
  try {
    const { industry, role, companyName, companyUrl } = req.body;
    const userId = req.userId;

    // Validation
    if (!industry || !role || !companyName || !companyUrl) {
      return res.status(400).json({
        success: false,
        message: 'All fields (industry, role, companyName, companyUrl) are required.',
      });
    }

    // Update user with onboarding information
    const user = await User.findByIdAndUpdate(
      userId,
      {
        industry,
        role,
        companyName,
        companyUrl,
        onboardingCompleted: true,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          industry: user.industry,
          role: user.role,
          companyName: user.companyName,
          companyUrl: user.companyUrl,
          onboardingCompleted: user.onboardingCompleted,
        },
      },
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error during onboarding.',
    });
  }
};

module.exports = {
  signup,
  login,
  completeOnboarding,
};
