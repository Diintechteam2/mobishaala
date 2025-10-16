import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Demo', href: '#demo' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' }
    ],
    social: [
      { name: 'LinkedIn', href: '#', icon: '💼' },
      { name: 'Twitter', href: '#', icon: '🐦' },
      { name: 'YouTube', href: '#', icon: '📺' },
      { name: 'Instagram', href: '#', icon: '📷' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gray-900 relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-16"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-2">
              <div className="mb-">
                <img 
                  src="/mAInslogo_withoutBackground.png" 
                  alt="mAIns Logo" 
                  className="h-24 w-auto"
                />
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Revolutionizing UPSC/PCS Mains preparation with AI-powered evaluation and expert mentorship. 
                Write smarter, rank higher.
              </p>
              <div className="flex space-x-4">
                {footerLinks.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-primary hover:text-black transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div variants={itemVariants} className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 mb-12"
          >
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Stay Updated with mAIns
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Get the latest tips, strategies, and updates for UPSC/PCS Mains preparation delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300 text-sm sm:text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6 py-3 text-sm sm:text-base"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © {currentYear} mAIns.ai — Powered by Expert Mentors + AI
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-primary transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-primary rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-40 right-40 w-1.5 h-1.5 bg-primary rounded-full opacity-25 animate-float-fast"></div>
    </footer>
  );
};

export default Footer;
