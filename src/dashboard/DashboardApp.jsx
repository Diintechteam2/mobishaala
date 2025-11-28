import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Overview from './pages/Overview';
import ContentStudio from './pages/ContentStudio';
import Institutes from './pages/Institutes';
import Theme from './pages/Theme';
import Leads from './pages/Leads';
import Settings from './pages/Settings';
import Inquiries from './pages/Inquiries';
import Payments from './pages/Payments';

const DashboardApp = () => (
  <Routes>
    <Route 
      path="" 
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<Overview />} />
      <Route path="content" element={<ContentStudio />} />
      <Route path="institutes" element={<Institutes />} />
      <Route path="theme" element={<Theme />} />
      <Route path="leads" element={<Leads />} />
      <Route path="payments" element={<Payments />} />
      <Route path="inquiries" element={<Inquiries />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="overview" replace />} />
    </Route>
  </Routes>
);

export default DashboardApp;

