import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';

const industries = [
  'Technology & IT Services',
  'Computer Software',
  'Marketing & Advertising',
  'E-commerce & Retail',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Manufacturing',
];

const OnboardingIndustry = () => {
  const navigate = useNavigate();
  const { advanceOnboarding, skipOnboarding } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const handleContinue = () => {
    advanceOnboarding({ industry: selectedIndustry });
    navigate('/onboarding/role');
  };

  const handleSkip = () => {
    advanceOnboarding({ industry: '' });
    navigate('/onboarding/role');
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
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
            </div>
            <p className="text-sm" style={{ color: theme.text.secondary }}>
              Step 1 of 4
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
              What industry are you in?
            </h1>
            <p style={{ color: theme.text.secondary }}>
              Help us tailor your experience to your needs
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {industries.map((industry) => (
              <motion.button
                key={industry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedIndustry(industry)}
                className={`p-4 rounded-lg border-2 text-left font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'border-black'
                    : ''
                }`}
                style={{
                  borderColor: selectedIndustry === industry ? theme.primary : theme.ui.border,
                  backgroundColor:
                    selectedIndustry === industry
                      ? '#F0F0F0'
                      : theme.tertiary,
                  color: theme.text.primary,
                }}
              >
                {industry}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSkip}
              className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{
                borderColor: theme.ui.border,
                color: theme.text.primary,
              }}
            >
              Skip & Continue
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={!selectedIndustry}
              className="flex-1 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                backgroundColor: selectedIndustry ? theme.primary : theme.ui.disabled,
                color: theme.tertiary,
              }}
            >
              Continue
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingIndustry;
