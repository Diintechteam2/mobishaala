"use client"
import React from 'react';
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const Partners = () => {
  const topRowCompanies = [
    { name: "Giant Eagle", logo: "/giant-eagle-logo.jpg" },
    { name: "Anywhere", logo: "/anywhere-logo.jpg" },
    { name: "Backbase", logo: "/backbase-logo.jpg" },
    { name: "Swiggy", logo: "/generic-food-delivery-logo.png" },
    { name: "Landmark", logo: "/landmark-group-logo.jpg" },
    { name: "Muthoot", logo: "/muthoot-finance-logo.jpg" },
  ]

  const bottomRowCompanies = [
    { name: "TVS", logo: "/tvs-logo.jpg" },
    { name: "Microsoft", logo: "/microsoft-logo.png" },
    { name: "Amazon", logo: "/amazon-logo.png" },
    { name: "Walmart", logo: "/generic-retail-logo.png" },
    { name: "Thomson Reuters", logo: "/generic-news-logo.png" },
    { name: "JCPenney", logo: "/jcpenney-logo.jpg" },
  ]

  const duplicatedTopRow = [...topRowCompanies, ...topRowCompanies, ...topRowCompanies]
  const duplicatedBottomRow = [...bottomRowCompanies, ...bottomRowCompanies, ...bottomRowCompanies]

  const [topWidth, setTopWidth] = useState(0)
  const [bottomWidth, setBottomWidth] = useState(0)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (topRef.current) {
      const itemWidth = topRef.current.offsetWidth / duplicatedTopRow.length
      setTopWidth(itemWidth * topRowCompanies.length)
    }
    if (bottomRef.current) {
      const itemWidth = bottomRef.current.offsetWidth / duplicatedBottomRow.length
      setBottomWidth(itemWidth * bottomRowCompanies.length)
    }
  }, [])

  const LogoCard = ({ company }) => (
    <motion.div
      className="flex-shrink-0 px-6 py-4 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 hover:border-purple-400 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-w-max"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center h-12">
        <img
          src={company.logo || "/placeholder.svg"}
          alt={company.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="text-sm font-semibold text-gray-700 text-center">{company.name}</p>
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
    <section className=" md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header */}
      <motion.div
        className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Students Working With Top Companies <span className="text-purple-600">Like</span>
        </h2>
        <motion.div
          className="inline-block ml-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg className="w-6 h-6 text-gray-400 inline" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Top Row - Scrolling Left to Right */}
      <div className="mb-8 overflow-hidden">
        <motion.div
          ref={topRef}
          className="flex gap-4"
          animate={{ x: topWidth ? [-topWidth, 0] : 0 }}
          transition={{
            duration: 50,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {duplicatedTopRow.map((company, idx) => (
            <LogoCard key={`top-${idx}`} company={company} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Scrolling Right to Left */}
      <div className="mb-16 overflow-hidden">
        <motion.div
          ref={bottomRef}
          className="flex gap-4"
          animate={{ x: bottomWidth ? [0, -bottomWidth] : 0 }}
          transition={{
            duration: 50,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {duplicatedBottomRow.map((company, idx) => (
            <LogoCard key={`bottom-${idx}`} company={company} />
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Stats number="220+" label="Hiring Partners" />
        <Stats number="40+" label="University Collabs" />
        <Stats number="25,000+" label="Careers Transformed" />
        <Stats number="400+" label="Team Size" />
      </motion.div>
    </section>
  )
}

export default Partners
