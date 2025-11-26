import React from 'react';
import { Link } from 'react-router-dom';

const DynamicInstituteNavbar = ({ institute }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            {institute?.businessLogo && (
              <img src={institute.businessLogo} alt={institute.businessName} className="h-10 w-10 rounded-lg object-cover" />
            )}
            <span className="text-xl font-bold text-gray-900">{institute?.businessName || 'Institute'}</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="#courses" className="text-gray-700 hover:text-primary font-medium">Courses</Link>
            <Link to="#testimonials" className="text-gray-700 hover:text-primary font-medium">Testimonials</Link>
            <Link to="#faq" className="text-gray-700 hover:text-primary font-medium">FAQ</Link>
            <a href={`tel:${institute?.businessMobileNumber}`} className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DynamicInstituteNavbar;

