import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import InstituteDashboardLayout from './layout/InstituteDashboardLayout';
import HeroEditor from './pages/HeroEditor';
import CoursesEditor from './pages/CoursesEditor';
import AllCoursesPreview from './pages/AllCoursesPreview';
import CheckoutEditor from './pages/CheckoutEditor';
import JourneyEditor from './pages/JourneyEditor';
import TestimonialsEditor from './pages/TestimonialsEditor';
import FAQEditor from './pages/FAQEditor';
import UsersCenter from './pages/UsersCenter';
import FooterEditor from './pages/FooterEditor';

const InstituteDashboardApp = () => {
  const location = useLocation();
  console.log('📱 InstituteDashboardApp rendered');
  console.log('📍 Current pathname:', location.pathname);
  
  return (
    <Routes>
      <Route path=":instituteId/*" element={<InstituteDashboardLayout />}>
        <Route index element={<Navigate to="hero" replace />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="courses" element={<CoursesEditor />} />
        <Route path="all-courses" element={<AllCoursesPreview />} />
        <Route path="checkout/:courseId" element={<CheckoutEditor />} />
        <Route path="journey" element={<JourneyEditor />} />
        <Route path="testimonials" element={<TestimonialsEditor />} />
        <Route path="faq" element={<FAQEditor />} />
        <Route path="footer" element={<FooterEditor />} />
        <Route path="users" element={<UsersCenter />} />
      </Route>
    </Routes>
  );
};

export default InstituteDashboardApp;
