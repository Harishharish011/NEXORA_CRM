import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData.email, formData.password);
      navigate('/onboarding/industry');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.secondary }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: theme.tertiary }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
              Nexora CRM
            </h1>
            <p style={{ color: theme.text.secondary }}>
              {isSignup ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: errors.email ? '#EF4444' : theme.ui.border,
                  focusRing: theme.primary,
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: errors.password ? '#EF4444' : theme.ui.border,
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (Signup) */}
            {isSignup && (
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text.primary }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: errors.confirmPassword
                      ? '#EF4444'
                      : theme.ui.border,
                  }}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 rounded-lg font-semibold transition-all mt-6"
              style={{
                backgroundColor: theme.primary,
                color: theme.tertiary,
              }}
            >
              {isSignup ? 'Create Account' : 'Sign In'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div style={{ backgroundColor: theme.ui.border }} className="flex-1 h-px" />
            <span className="px-3" style={{ color: theme.text.secondary }}>
              or
            </span>
            <div style={{ backgroundColor: theme.ui.border }} className="flex-1 h-px" />
          </div>

          {/* Social Login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="button"
            className="w-full py-2 rounded-lg font-medium border transition-all flex items-center justify-center gap-2"
            style={{
              borderColor: theme.ui.border,
              color: theme.text.primary,
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p style={{ color: theme.text.secondary }}>
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setErrors({});
                }}
                className="font-semibold cursor-pointer"
                style={{ color: theme.primary }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </motion.button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: theme.text.secondary }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
