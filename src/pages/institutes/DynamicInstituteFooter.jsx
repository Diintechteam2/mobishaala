import React from 'react';
import { Link } from 'react-router-dom';

const DynamicInstituteFooter = ({ institute }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            {institute?.businessLogo && (
              <img src={institute.businessLogo} alt={institute.businessName} className="h-12 w-auto mb-4" />
            )}
            <h3 className="text-xl font-bold mb-4">{institute?.businessName || 'Institute'}</h3>
            <p className="text-gray-400 text-sm">{institute?.businessAddress || ''}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="#courses" className="hover:text-white">Courses</Link></li>
              <li><Link to="#testimonials" className="hover:text-white">Testimonials</Link></li>
              <li><Link to="#faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{institute?.businessEmail || ''}</li>
              <li>{institute?.businessMobileNumber || ''}</li>
              {institute?.businessWebsite && (
                <li><a href={institute.businessWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-white">Website</a></li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            {institute?.businessYouTubeChannel && (
              <a href={institute.businessYouTubeChannel} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                YouTube Channel
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {institute?.businessName || 'Institute'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default DynamicInstituteFooter;

