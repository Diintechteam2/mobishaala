import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TabNavigation from './components/TabNavigation';
import HomeInstitutesView from './components/HomeInstitutesView';
import InstitutesView from './components/InstitutesView';
import StudentsView from './components/StudentsView';
import PublicationsView from './components/PublicationsView';
import Footer from './components/Footer';
import DashboardApp from './dashboard/DashboardApp';
import InstituteDashboardApp from './institute-dashboard/InstituteDashboardApp';
import Login from './dashboard/pages/Login';
import PrivacyPolicy from './components/PrivacyPolicy';
import InquiryModal from './components/InquiryModal';

// Page placeholders
import Products from './menu/Products';
import PartnersPage from './menu/Partners';
import Resources from './menu/Resources';
import About from './menu/About';
import ComingSoon from './menu/ComingSoon';

// Student pages
import StudentsProducts from './menu/students/StudentsProducts';
import StudentsPartners from './menu/students/StudentsPartners';
import StudentsResources from './menu/students/StudentsResources';
import StudentsAbout from './menu/students/StudentsAbout';

// Publications pages
import PublicationsResearch from './menu/publications/PublicationsResearch';
import PublicationsJournals from './menu/publications/PublicationsJournals';
import PublicationsResources from './menu/publications/PublicationsResources';
import PublicationsAbout from './menu/publications/PublicationsAbout';

import DestinationIASPage from './pages/institutes/destinationIAS/DestinationIASPage';
import DestinationIASAllCourses from './pages/institutes/destinationIAS/DestinationIASAllCourses';
import DestinationIASCheckout from './pages/institutes/destinationIAS/DestinationIASCheckout';
import ShashiKarnaPage from './pages/institutes/shashiKarna/ShashiKarnaPage';
import ShashiKarnaAllCourses from './pages/institutes/shashiKarna/ShashiKarnaAllCourses';
import ShashiKarnaCheckout from './pages/institutes/shashiKarna/ShashiKarnaCheckout';
import DslEnglishPage from './pages/institutes/dslEnglish/DslEnglishPage';
import DslEnglishAllCourses from './pages/institutes/dslEnglish/DslEnglishAllCourses';
import DslEnglishCheckout from './pages/institutes/dslEnglish/DslEnglishCheckout';
import ExamDrishtiPage from './pages/institutes/examDrishti/ExamDrishtiPage';
import ExamDrishtiAllCourses from './pages/institutes/examDrishti/ExamDrishtiAllCourses';
import ExamDrishtiCheckout from './pages/institutes/examDrishti/ExamDrishtiCheckout';
import DynamicInstitutePage from './pages/institutes/DynamicInstitutePage';
import DynamicInstituteAllCourses from './pages/institutes/DynamicInstituteAllCourses';
import DynamicInstituteCheckout from './pages/institutes/DynamicInstituteCheckout';
import DynamicCourseDetails from './pages/institutes/DynamicCourseDetails';

const PageSection = ({ children }) => (
  <div className="pt-24">
    {children}
  </div>
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isInstituteDashboardRoute = location.pathname.startsWith('/institute-dashboard');
  const isInstituteDetailRoute = location.pathname.startsWith('/institutes/') && location.pathname !== '/institutes';
  const [activeTab, setActiveTab] = useState('home');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  // Keep tab context in sync on non-home routes based on pathname
  useEffect(() => {
    if (isDashboardRoute) {
      return;
    }
    if (isHome) {
      if (activeTab !== 'home') {
        setActiveTab('home');
      }
      return;
    }
    const path = location.pathname || '';
    if (path.startsWith('/students')) {
      setActiveTab('students');
    } else if (path.startsWith('/publications')) {
      setActiveTab('publications');
    } else {
      setActiveTab('institutes');
    }
  }, [location.pathname, isHome, activeTab, isDashboardRoute]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [location.pathname]);

  const tabRoutes = {
    home: '/',
    institutes: '/institutes',
    students: '/students',
    publications: '/publications'
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const target = tabRoutes[tabId] || '/';
    if (location.pathname !== target) {
      navigate(target);
    }
  };


  const openInquiryModal = () => setIsInquiryModalOpen(true);
  const closeInquiryModal = () => setIsInquiryModalOpen(false);

  if (isDashboardRoute || isInstituteDashboardRoute || location.pathname === '/login') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardApp />} />
          <Route path="/institute-dashboard/*" element={<InstituteDashboardApp />} />
        </Routes>
      </div>
    );
  }

  let content = null;

  if (isInstituteDetailRoute) {
    content = (
      <Routes>
        {/* Legacy static routes - Must come before dynamic route */}
        <Route path="/institutes/destination-ias" element={<DestinationIASPage />} />
        <Route path="/institutes/destination-ias/courses" element={<DestinationIASAllCourses />} />
        <Route path="/institutes/destination-ias/checkout/:courseId" element={<DestinationIASCheckout />} />
        <Route path="/institutes/shashi-karna" element={<ShashiKarnaPage />} />
        <Route path="/institutes/shashi-karna/courses" element={<ShashiKarnaAllCourses />} />
        <Route path="/institutes/shashi-karna/checkout/:courseId" element={<ShashiKarnaCheckout />} />
        <Route path="/institutes/dsl-english" element={<DslEnglishPage />} />
        <Route path="/institutes/dsl-english/courses" element={<DslEnglishAllCourses />} />
        <Route path="/institutes/dsl-english/checkout/:courseId" element={<DslEnglishCheckout />} />
        <Route path="/institutes/examdrishti" element={<ExamDrishtiPage />} />
        <Route path="/institutes/examdrishti/courses" element={<ExamDrishtiAllCourses />} />
        <Route path="/institutes/examdrishti/checkout/:courseId" element={<ExamDrishtiCheckout />} />
        {/* Dynamic Institute Routes - Catches all other institute IDs */}
        <Route path="/institutes/:instituteId" element={<DynamicInstitutePage />} />
        <Route path="/institutes/:instituteId/courses" element={<DynamicInstituteAllCourses />} />
        <Route path="/institutes/:instituteId/course/:courseId" element={<DynamicCourseDetails />} />
        <Route path="/institutes/:instituteId/checkout/:courseId" element={<DynamicInstituteCheckout />} />
      </Routes>
    );
  } else if (isHome) {
    content = (
      <>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onLogoClick={() => handleTabChange('home')}
          isHomeActive={activeTab === 'home'}
        />
        <Navbar activeTab={activeTab} onOpenInquiry={openInquiryModal} />
        <HomeInstitutesView onOpenInquiry={openInquiryModal} />
      </>
    );
  } else {
    content = (
      <>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onLogoClick={() => handleTabChange('home')}
          isHomeActive={activeTab === 'home'}
        />
        <Navbar activeTab={activeTab} onOpenInquiry={openInquiryModal} />
        <Routes>
          {/* Footer Links */}
          <Route path="/privacy-policy" element={<PageSection><PrivacyPolicy /></PageSection>} />
          {/* Institute Pages */}
          <Route path="/products" element={<PageSection><Products /></PageSection>} />
          <Route path="/partners" element={<PageSection><PartnersPage /></PageSection>} />
          <Route path="/resources" element={<PageSection><Resources /></PageSection>} />
          <Route path="/about" element={<PageSection><About /></PageSection>} />
          
          {/* Student Pages */}
          <Route path="/students" element={<StudentsView />} />
          <Route path="/students/products" element={<StudentsProducts />} />
          <Route path="/students/partners" element={<StudentsPartners />} />
          <Route path="/students/resources" element={<StudentsResources />} />
          <Route path="/students/about" element={<StudentsAbout />} />
          
          {/* Publications Pages */}
          <Route path="/publications" element={<PublicationsView />} />
          <Route path="/publications/research" element={<PublicationsResearch />} />
          <Route path="/publications/journals" element={<PublicationsJournals />} />
          <Route path="/publications/resources" element={<PublicationsResources />} />
          <Route path="/publications/about" element={<PublicationsAbout />} />
          
          {/* Institute redesigned page */}
          <Route path="/institutes" element={<InstitutesView />} />
          {/* Subpages */}
          <Route path="/teachers" element={<PageSection><ComingSoon title="For Individual Teachers" /></PageSection>} />
          <Route path="/aggregators" element={<PageSection><ComingSoon title="For Coaching Aggregators" /></PageSection>} />
          <Route path="/blogs" element={<PageSection><ComingSoon title="Blogs & Articles" /></PageSection>} />
          <Route path="/case-studies" element={<PageSection><ComingSoon title="Case Studies" /></PageSection>} />
          <Route path="/success-stories" element={<PageSection><ComingSoon title="Success Stories" /></PageSection>} />
          <Route path="/help-center" element={<PageSection><ComingSoon title="Help Center / FAQs" /></PageSection>} />
          <Route path="/video-tutorials" element={<PageSection><ComingSoon title="Video Tutorials" /></PageSection>} />
          <Route path="/contact" element={<PageSection><ComingSoon title="Contact Us" /></PageSection>} />
          <Route path="/about-mobishaala" element={<PageSection><ComingSoon title="About Mobishaala" /></PageSection>} />
          <Route path="/leadership" element={<PageSection><ComingSoon title="Leadership Team" /></PageSection>} />
          <Route path="/milestones" element={<PageSection><ComingSoon title="Milestones / Partners" /></PageSection>} />
        </Routes>
      </>
    );
  }

  return (
    <div className="App overflow-x-hidden">
      {content}
      <InquiryModal isOpen={isInquiryModalOpen} onClose={closeInquiryModal} />
      {!isInstituteDetailRoute && <Footer />}
    </div>
  );
}