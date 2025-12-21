import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';

const roles = [
  'Owner / Founder',
  'Executive Team',
  'Sales Manager',
  'Marketing Manager',
  'Operations / Analyst',
];

const OnboardingRole = () => {
  const navigate = useNavigate();
  const { advanceOnboarding, goBack } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    advanceOnboarding({ role: selectedRole });
    navigate('/onboarding/company');
  };

  const handleSkip = () => {
    advanceOnboarding({ role: '' });
    navigate('/onboarding/company');
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
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: theme.ui.border }} />
            </div>
            <p className="text-sm" style={{ color: theme.text.secondary }}>
              Step 2 of 4
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
              What's your role?
            </h1>
            <p style={{ color: theme.text.secondary }}>
              We'll customize features for your position
            </p>
          </div>

          {/* Roles Grid */}
          <div className="space-y-3 mb-8">
            {roles.map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role)}
                className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${
                  selectedRole === role ? 'border-black' : ''
                }`}
                style={{
                  borderColor: selectedRole === role ? theme.primary : theme.ui.border,
                  backgroundColor:
                    selectedRole === role
                      ? '#F0F0F0'
                      : theme.tertiary,
                  color: theme.text.primary,
                }}
              >
                {role}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goBack() || navigate('/onboarding/industry')}
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
              disabled={!selectedRole}
              className="flex-1 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                backgroundColor: selectedRole ? theme.primary : theme.ui.disabled,
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

export default OnboardingRole;
