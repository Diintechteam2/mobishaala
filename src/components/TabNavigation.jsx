import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'institutes', label: 'Institutes' },
    { id: 'students', label: 'Students' },
    { id: 'publications', label: 'Publications' }
  ];


  return (
    <div className="bg-gray-50 border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-4 px-1 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
