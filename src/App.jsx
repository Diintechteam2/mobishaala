import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TabNavigation from './components/TabNavigation';
import InstitutesView from './components/InstitutesView';
import StudentsView from './components/StudentsView';
import PublicationsView from './components/PublicationsView';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

// Page placeholders
import Home from './menu/Home';
import Products from './menu/Products';
import PartnersPage from './menu/Partners';
import Resources from './menu/Resources';
import About from './menu/About';
import ComingSoon from './menu/ComingSoon';

// Student pages
import StudentsHome from './menu/students/StudentsHome';
import StudentsProducts from './menu/students/StudentsProducts';
import StudentsPartners from './menu/students/StudentsPartners';
import StudentsResources from './menu/students/StudentsResources';
import StudentsAbout from './menu/students/StudentsAbout';

// Publications pages
import PublicationsHome from './menu/publications/PublicationsHome';
import PublicationsResearch from './menu/publications/PublicationsResearch';
import PublicationsJournals from './menu/publications/PublicationsJournals';
import PublicationsResources from './menu/publications/PublicationsResources';
import PublicationsAbout from './menu/publications/PublicationsAbout';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [activeTab, setActiveTab] = useState('institutes');
  // Keep tab context in sync on non-home routes based on pathname
  useEffect(() => {
    if (isHome) return;
    const path = location.pathname || '';
    if (path.startsWith('/students')) {
      setActiveTab('students');
    } else if (path.startsWith('/publications')) {
      setActiveTab('publications');
    } else {
      setActiveTab('institutes');
    }
  }, [location.pathname, isHome]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };


  return (
    <div className="App overflow-x-hidden">
      {isHome ? (
        <>
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <Navbar activeTab={activeTab} />
          {activeTab === 'institutes' ? <InstitutesView /> : 
           activeTab === 'students' ? <StudentsView /> : 
           <PublicationsView />}
        </>
      ) : (
        <>
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          <Navbar activeTab={activeTab} />
          <div className="pt-36">
            <Routes>
              {/* Footer Links */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* Institute Pages */}
              <Route path="/products" element={<Products />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              
              {/* Student Pages */}
              <Route path="/students" element={<StudentsHome />} />
              <Route path="/students/products" element={<StudentsProducts />} />
              <Route path="/students/partners" element={<StudentsPartners />} />
              <Route path="/students/resources" element={<StudentsResources />} />
              <Route path="/students/about" element={<StudentsAbout />} />
              
              {/* Publications Pages */}
              <Route path="/publications" element={<PublicationsHome />} />
              <Route path="/publications/research" element={<PublicationsResearch />} />
              <Route path="/publications/journals" element={<PublicationsJournals />} />
              <Route path="/publications/resources" element={<PublicationsResources />} />
              <Route path="/publications/about" element={<PublicationsAbout />} />
              
              {/* Subpages */}
              <Route path="/institutes" element={<ComingSoon title="For Institutes" />} />
              <Route path="/teachers" element={<ComingSoon title="For Individual Teachers" />} />
              <Route path="/aggregators" element={<ComingSoon title="For Coaching Aggregators" />} />
              <Route path="/blogs" element={<ComingSoon title="Blogs & Articles" />} />
              <Route path="/case-studies" element={<ComingSoon title="Case Studies" />} />
              <Route path="/success-stories" element={<ComingSoon title="Success Stories" />} />
              <Route path="/help-center" element={<ComingSoon title="Help Center / FAQs" />} />
              <Route path="/video-tutorials" element={<ComingSoon title="Video Tutorials" />} />
              <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
              <Route path="/about-mobishaala" element={<ComingSoon title="About Mobishaala" />} />
              <Route path="/leadership" element={<ComingSoon title="Leadership Team" />} />
              <Route path="/milestones" element={<ComingSoon title="Milestones / Partners" />} />
            </Routes>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}