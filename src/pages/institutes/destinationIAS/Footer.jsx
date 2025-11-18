import React from 'react';

const DestinationIASFooter = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Destination IAS</p>
        <h3 className="text-2xl font-black mt-2">UPSC & PCS Leadership Lab</h3>
        <p className="text-gray-400 mt-3">A-17, Mukherjee Nagar, Delhi • info@destinationias.in • +91 98211 77881</p>
      </div>
      <div>
        <p className="font-semibold text-sm text-gray-300">Quick Links</p>
        <ul className="mt-3 space-y-2 text-gray-400 text-sm">
          <li><a href="#courses" className="hover:text-white">Courses</a></li>
          <li><a href="#journey" className="hover:text-white">Journey</a></li>
          <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
          <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
        </ul>
      </div>
      <div>
        <p className="font-semibold text-sm text-gray-300">Powered by</p>
        <p className="text-xl font-black text-white mt-2">Mobishaala</p>
        <p className="text-gray-500 text-sm mt-1">Mobishaala powers Destination IAS digital campus, payments and analytics.</p>
      </div>
    </div>
    <div className="border-t border-white/10">
      <p className="text-center text-gray-500 text-sm py-4">© {new Date().getFullYear()} Destination IAS. All rights reserved.</p>
    </div>
  </footer>
);

export default DestinationIASFooter;

