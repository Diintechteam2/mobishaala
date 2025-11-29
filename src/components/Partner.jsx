"use client"
import React from 'react';
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const Partners = ({ headline: propHeadline, stats: propStats }) => {
  const [topRowCompanies, setTopRowCompanies] = useState([])
  const [bottomRowCompanies, setBottomRowCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [headline, setHeadline] = useState(propHeadline || 'Students Working With Top Companies Like')
  const [stats, setStats] = useState(propStats || [
    { number: '220+', label: 'Hiring Partners' },
    { number: '40+', label: 'University Collabs' },
    { number: '25,000+', label: 'Careers Transformed' },
    { number: '400+', label: 'Team Size' }
  ])
  const [topWidth, setTopWidth] = useState(0)
  const [bottomWidth, setBottomWidth] = useState(0)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    fetchPartners();
    fetchSettings();
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/partners-section-settings/public`);
      const data = await response.json();
      
      if (data.success && data.data) {
        if (!propHeadline) setHeadline(data.data.headline || 'Students Working With Top Companies Like');
        if (!propStats) setStats(data.data.stats || [
          { number: '220+', label: 'Hiring Partners' },
          { number: '40+', label: 'University Collabs' },
          { number: '25,000+', label: 'Careers Transformed' },
          { number: '400+', label: 'Team Size' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching partners section settings:', error);
    }
  }

  const fetchPartners = async () => {
    try {
      setLoading(true);
      
      // Fetch institutes (Active ones will be shown as partners)
      const institutesResponse = await fetch(`${API_BASE}/api/institutes/public`);
      const institutesData = await institutesResponse.json();
      
      // Fetch additional partners
      const partnersResponse = await fetch(`${API_BASE}/api/partners/public`);
      const partnersData = await partnersResponse.json();

      // Convert institutes to partner format
      const institutePartners = (institutesData.success ? institutesData.data : [])
        .filter(inst => inst.status === 'Active' && inst.businessLogo)
        .map(inst => ({
          name: inst.businessName,
          logo: inst.businessLogo,
          row: 'top' // Default to top row for institutes
        }));

      // Get additional partners from API
      const additionalPartners = partnersData.success ? partnersData.data : [];

      // Combine all partners - use same data for both rows
      const allPartners = [...institutePartners, ...additionalPartners];
      
      // Use all partners for top row, reversed for bottom row
      setTopRowCompanies(allPartners.length > 0 ? allPartners : []);
      setBottomRowCompanies(allPartners.length > 0 ? [...allPartners].reverse() : []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      // Fallback to empty arrays on error
      setTopRowCompanies([]);
      setBottomRowCompanies([]);
    } finally {
      setLoading(false);
    }
  }

  // Duplicate enough times for seamless infinite scroll
  const duplicatedTopRow = [...topRowCompanies, ...topRowCompanies, ...topRowCompanies, ...topRowCompanies]
  const duplicatedBottomRow = [...bottomRowCompanies, ...bottomRowCompanies, ...bottomRowCompanies, ...bottomRowCompanies]

  useEffect(() => {
    // Calculate width after render
    const calculateWidths = () => {
      if (topRef.current && topRowCompanies.length > 0) {
        // Get the actual width of one set of items
        const firstItem = topRef.current.querySelector('[data-item]');
        if (firstItem) {
          const itemWidth = firstItem.offsetWidth + 16; // item width + gap
          const oneSetWidth = itemWidth * topRowCompanies.length;
          setTopWidth(oneSetWidth);
        }
      }
      if (bottomRef.current && bottomRowCompanies.length > 0) {
        const firstItem = bottomRef.current.querySelector('[data-item]');
        if (firstItem) {
          const itemWidth = firstItem.offsetWidth + 16; // item width + gap
          const oneSetWidth = itemWidth * bottomRowCompanies.length;
          setBottomWidth(oneSetWidth);
        }
      }
    };

    // Wait for images to load
    setTimeout(calculateWidths, 100);
    window.addEventListener('resize', calculateWidths);
    return () => window.removeEventListener('resize', calculateWidths);
  }, [topRowCompanies, bottomRowCompanies])

  const LogoCard = ({ company }) => (
    <motion.div
      data-item
      className="flex-shrink-0 px-6 py-4 rounded-xl bg-gradient-to-br from-primary/10 to-white border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-w-[200px]"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center h-12">
        <img
          src={company.logo || "/placeholder.svg"}
          alt={company.name}
          className="max-h-full max-w-full object-contain"
          onLoad={() => {
            // Recalculate widths when images load
            if (topRef.current && topRowCompanies.length > 0) {
              const firstItem = topRef.current.querySelector('[data-item]');
              if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 16;
                const oneSetWidth = itemWidth * topRowCompanies.length;
                setTopWidth(oneSetWidth);
              }
            }
            if (bottomRef.current && bottomRowCompanies.length > 0) {
              const firstItem = bottomRef.current.querySelector('[data-item]');
              if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 16;
                const oneSetWidth = itemWidth * bottomRowCompanies.length;
                setBottomWidth(oneSetWidth);
              }
            }
          }}
        />
      </div>
      <p className="text-sm font-semibold text-gray-700 text-center whitespace-nowrap">{company.name}</p>
    </motion.div>
  )

  const Stats = ({ number, label }) => (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{number}</div>
      <div className="text-gray-600 text-sm md:text-base font-medium">{label}</div>
    </motion.div>
  )

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {headline.includes('Like') ? (
              <>
                {headline.split('Like')[0]} <span className="text-primary">Like</span>
                {headline.split('Like')[1] && <span>{headline.split('Like')[1]}</span>}
              </>
            ) : (
              headline
            )}
            <motion.div
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <svg className="w-6 h-6 text-primary inline" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
              </svg>
            </motion.div>
          </h2>
        </motion.div>

      {/* Top Row - Scrolling Left to Right (Continuous Infinite Loop) */}
      {!loading && topRowCompanies.length > 0 && (
        <div className="mb-8 overflow-hidden relative w-full">
          <motion.div
            ref={topRef}
            className="flex gap-4"
            animate={{ 
              x: topWidth ? [-topWidth, 0] : 0 
            }}
            transition={{
              duration: topRowCompanies.length * 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            {duplicatedTopRow.map((company, idx) => (
              <LogoCard key={`top-${idx}-${company.name}-${company.logo}`} company={company} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Bottom Row - Scrolling Right to Left (Continuous Infinite Loop) */}
      {!loading && bottomRowCompanies.length > 0 && (
        <div className="mb-16 overflow-hidden relative w-full">
          <motion.div
            ref={bottomRef}
            className="flex gap-4"
            animate={{ 
              x: bottomWidth ? [0, -bottomWidth] : 0 
            }}
            transition={{
              duration: bottomRowCompanies.length * 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            {duplicatedBottomRow.map((company, idx) => (
              <LogoCard key={`bottom-${idx}-${company.name}-${company.logo}`} company={company} />
            ))}
          </motion.div>
        </div>
      )}

      {loading && (
        <div className="mb-16 text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading partners...</p>
        </div>
      )}

      {!loading && topRowCompanies.length === 0 && (
        <div className="mb-16 text-center py-12">
          <p className="text-gray-500">No partners to display</p>
        </div>
      )}

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, idx) => (
              <Stats key={idx} number={stat.number} label={stat.label} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Partners
