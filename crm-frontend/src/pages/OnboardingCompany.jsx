import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';

const OnboardingCompany = () => {
  const navigate = useNavigate();
  const { advanceOnboarding, completeOnboarding, goBack } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
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

    if (
      formData.companyWebsite &&
      !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
        formData.companyWebsite
      )
    ) {
      newErrors.companyWebsite = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      advanceOnboarding(formData);
      completeOnboarding();
      navigate('/app/dashboard');
    }
  };

  const handleSkip = () => {
    advanceOnboarding({
      companyName: '',
      companyWebsite: '',
    });
    completeOnboarding();
    navigate('/app/dashboard');
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
        className="w-full max-w-2xl"
      >
        {/* Card */}
        <div
          className="rounded-2xl shadow-lg p-8"
          style={{ backgroundColor: theme.tertiary }}
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.primary }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.primary }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.primary }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
            </div>
            <p className="text-sm" style={{ color: theme.text.secondary }}>
              Step 3 of 4
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
              Tell us about your company
            </h1>
            <p style={{ color: theme.text.secondary }}>
              (Optional - you can skip this step)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="space-y-4 mb-8">
            {/* Company Name */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your company name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: theme.ui.border,
                }}
              />
            </div>

            {/* Company Website */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: errors.companyWebsite
                    ? '#EF4444'
                    : theme.ui.border,
                }}
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-sm mt-1">{errors.companyWebsite}</p>
              )}
            </div>
          </form>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goBack() || navigate('/onboarding/role')}
              className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{
                borderColor: theme.ui.border,
                color: theme.text.primary,
              }}
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSkip}
              className="flex-1 py-3 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: theme.ui.border,
                color: theme.text.primary,
              }}
            >
              Skip & Continue
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="flex-1 py-3 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: theme.primary,
                color: theme.tertiary,
              }}
            >
              Complete Setup
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingCompany;
