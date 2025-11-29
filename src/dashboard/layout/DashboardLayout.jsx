import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import TopBar from '../components/TopBar';

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar pathname={location.pathname} />
        <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-6 lg:py-6 min-w-0 max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


