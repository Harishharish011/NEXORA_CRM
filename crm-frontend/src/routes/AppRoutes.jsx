import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import OnboardingIndustry from '../pages/OnboardingIndustry';
import OnboardingRole from '../pages/OnboardingRole';
import OnboardingCompany from '../pages/OnboardingCompany';
import Dashboard from '../pages/Dashboard';
import Contacts from '../pages/Contacts';
import Campaigns from '../pages/Campaigns';
import SocialPosting from '../pages/SocialPosting';
import EmailBuilder from '../pages/EmailBuilder';
import Scheduler from '../pages/Scheduler';
import Analytics from '../pages/Analytics';
import Integrations from '../pages/Integrations';
import Service from '../pages/Service';
import Automation from '../pages/Automation';

const AppRoutes = () => {
  const { isAuthenticated, isDemoMode, isOnboardingCompleted } = useAuth();

  // Protected route for onboarding - users must be authenticated (non-demo) but not yet completed onboarding
  const OnboardingRoute = ({ element }) => {
    // Demo users should never access onboarding
    if (isDemoMode) return <Navigate to="/app/dashboard" replace />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (isOnboardingCompleted) return <Navigate to="/app/dashboard" replace />;
    return element;
  };

  // Protected route for dashboard - demo users OR (authenticated AND completed onboarding)
  const DashboardRoute = ({ element }) => {
    // Demo mode users bypass onboarding check
    if (isDemoMode) return element;
    // Authenticated users need to complete onboarding
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!isOnboardingCompleted) return <Navigate to="/onboarding/industry" replace />;
    return element;
  };

  // Protected route wrapper for app shell
  const AppShellRoute = ({ element }) => {
    // Demo mode users bypass onboarding check
    if (isDemoMode) return element;
    // Authenticated users need to complete onboarding
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!isOnboardingCompleted) return <Navigate to="/onboarding/industry" replace />;
    return element;
  };

  return (
    <Routes>
      {/* Auth Routes - only accessible if not authenticated */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/onboarding/industry" replace /> : <Login />} 
      />

      {/* Onboarding Routes - only accessible if authenticated but not completed onboarding */}
      <Route
        path="/onboarding/industry"
        element={<OnboardingRoute element={<OnboardingIndustry />} />}
      />
      <Route
        path="/onboarding/role"
        element={<OnboardingRoute element={<OnboardingRole />} />}
      />
      <Route
        path="/onboarding/company"
        element={<OnboardingRoute element={<OnboardingCompany />} />}
      />

      {/* App Routes - with Layout - only accessible if authenticated AND onboarding completed */}
      <Route element={<AppShellRoute element={<Layout />} />}>
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/contacts" element={<Contacts />} />
        <Route path="/contacts" element={<Navigate to="/app/contacts" replace />} />
        <Route path="/app/campaigns" element={<Campaigns />} />
        <Route path="/campaigns" element={<Navigate to="/app/campaigns" replace />} />
        <Route path="/app/social-posting" element={<SocialPosting />} />
        <Route path="/social-posting" element={<Navigate to="/app/social-posting" replace />} />
        <Route path="/app/email-builder" element={<EmailBuilder />} />
        <Route path="/email-builder" element={<Navigate to="/app/email-builder" replace />} />
        <Route path="/app/scheduler" element={<Scheduler />} />
        <Route path="/scheduler" element={<Navigate to="/app/scheduler" replace />} />
        <Route path="/app/analytics" element={<Analytics />} />
        <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
        <Route path="/app/integrations" element={<Integrations />} />
        <Route path="/integrations" element={<Navigate to="/app/integrations" replace />} />
        <Route path="/app/service" element={<Service />} />
        <Route path="/service" element={<Navigate to="/app/service" replace />} />
        <Route path="/app/automation" element={<Automation />} />
        <Route path="/automation" element={<Navigate to="/app/automation" replace />} />
      </Route>

      {/* Default redirect for app paths */}
      <Route path="/app/*" element={<DashboardRoute element={<Navigate to="/app/dashboard" replace />} />} />
    </Routes>
  );
};

export default AppRoutes;
