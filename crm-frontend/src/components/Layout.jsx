import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PageWrapper from './PageWrapper';
import theme from '../theme/theme';
import { useSidebar } from '../context/SidebarContext';

const Layout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="relative w-full h-screen bg-gray-50" style={{ backgroundColor: theme.ui.background }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Main Content - Offset by sidebar width and navbar height */}
      <main 
        className={`absolute top-16 right-0 bottom-0 overflow-y-auto px-6 py-6 transition-all duration-300 ${
          isCollapsed ? 'left-20' : 'left-64'
        }`}
        style={{ backgroundColor: '#E5E7EB' }}
      >
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
    </div>
  );
};

export default Layout;
