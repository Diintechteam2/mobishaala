import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const destinations = [
    { name: 'Delhi', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=300' },
    { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=300' },
    { name: 'Bengaluru', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=300' },
    { name: 'Dubai', img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=300' },
    { name: 'Singapore', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=300' },
    { name: 'Thailand', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=300' },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Top Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Col 1 - About */}
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-4">ABOUT MOBISHAALA</div>
                <ul className="space-y-2">
                  {['About Us','We Are Hiring','Mobishaala Reviews','Terms & Conditions','Privacy Policy','Support','Beware of Frauds'].map((t) => (
                    <li key={t} className="text-sm text-gray-700 hover:text-primary cursor-pointer">{t}</li>
                  ))}
                </ul>
              </div>

              {/* Col 2 - For Brands */}
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-4">FOR BRANDS</div>
                <ul className="space-y-2">
                  {['Partner With Us','Destination Marketing'].map((t) => (
                    <li key={t} className="text-sm text-gray-700 hover:text-primary cursor-pointer">{t}</li>
                  ))}
                </ul>
              </div>

              {/* Col 3 - For Learners */}
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-4">FOR LEARNERS</div>
                <ul className="space-y-2">
                  {['Gift an Experience'].map((t) => (
                    <li key={t} className="text-sm text-gray-700 hover:text-primary cursor-pointer">{t}</li>
                  ))}
                </ul>
              </div>

              {/* Col 4 - Destinations */}
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-4">POPULAR DESTINATIONS</div>
                <div className="grid grid-cols-3 gap-3">
                  {destinations.map((d) => (
                    <div key={d.name} className="relative rounded-md overflow-hidden h-16 shadow">
                      <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold tracking-wide">{d.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Separator with logo and social icons */}
          <motion.div variants={itemVariants} className="mt-10">
            <div className="h-px bg-gray-700" />
            <div className="flex items-center justify-center gap-6 -mt-3">
              <div className="px-4 bg-gray-900">
                <img src="/mobishaala.com_logo.png" alt="Mobishaala" className="h-6 w-auto opacity-90" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-6 text-gray-300">
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.34zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.09v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 5.5a1 1 0 100 2 1 1 0 000-2z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.div variants={itemVariants} className="mt-8 text-center text-gray-400 text-xs leading-relaxed max-w-5xl mx-auto">
            The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 text-center text-gray-300 text-sm">
            © {currentYear} Mobishaala.com All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
