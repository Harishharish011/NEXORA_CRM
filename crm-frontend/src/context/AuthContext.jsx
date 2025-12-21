import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

const defaultAuthState = {
  isAuthenticated: false,
  isDemoMode: false,
  user: null,
  isOnboardingCompleted: false,
  onboardingStep: 0,
  onboardingData: {
    email: '',
    password: '',
    industry: '',
    role: '',
    companyName: '',
    companyWebsite: '',
  },
};

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [authState, setAuthState] = useState(() => {
    try {
      const savedAuth = localStorage.getItem('nexora_auth_state');
      return savedAuth ? JSON.parse(savedAuth) : defaultAuthState;
    } catch (error) {
      console.error('Failed to parse auth state from localStorage:', error);
      return defaultAuthState;
    }
  });

  // Persist authState to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('nexora_auth_state', JSON.stringify(authState));
    } catch (error) {
      console.error('Failed to save auth state to localStorage:', error);
    }
  }, [authState]);

  const login = useCallback((email, password) => {
    // Mock authentication
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isDemoMode: false,
      user: { email, name: email.split('@')[0] },
      isOnboardingCompleted: false,
      onboardingStep: 1,
      onboardingData: { ...prev.onboardingData, email, password },
    }));
  }, []);

  const startDemo = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isDemoMode: true,
      user: { name: 'Demo User' },
    }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nexora_auth_state');
    setAuthState(defaultAuthState);
  }, []);

  const updateOnboardingData = useCallback((data) => {
    setAuthState((prev) => ({
      ...prev,
      onboardingData: { ...prev.onboardingData, ...data },
    }));
  }, []);

  const advanceOnboarding = useCallback((stepData) => {
    setAuthState((prev) => ({
      ...prev,
      onboardingData: { ...prev.onboardingData, ...stepData },
      onboardingStep: prev.onboardingStep + 1,
    }));
  }, []);

  const goBack = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      onboardingStep: Math.max(0, prev.onboardingStep - 1),
    }));
  }, []);

  const skipOnboarding = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      onboardingStep: 0,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      isOnboardingCompleted: true,
      onboardingStep: 0,
    }));
  }, []);

  const value = {
    ...authState,
    login,
    startDemo,
    logout,
    updateOnboardingData,
    advanceOnboarding,
    goBack,
    skipOnboarding,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
