"use client"
import React from 'react';
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const StudentsPartner = () => {
  const topRowCompanies = [
    { name: "IIT Delhi", logo: "/iit-delhi-logo.jpg" },
    { name: "IIT Bombay", logo: "/iit-bombay-logo.jpg" },
    { name: "IIT Madras", logo: "/iit-madras-logo.jpg" },
    { name: "IISc Bangalore", logo: "/iisc-logo.jpg" },
    { name: "NIT Trichy", logo: "/nit-trichy-logo.jpg" },
    { name: "BITS Pilani", logo: "/bits-pilani-logo.jpg" },
  ]

  const bottomRowCompanies = [
    { name: "IIM Ahmedabad", logo: "/iim-ahmedabad-logo.jpg" },
    { name: "IIM Bangalore", logo: "/iim-bangalore-logo.jpg" },
    { name: "IIM Calcutta", logo: "/iim-calcutta-logo.jpg" },
    { name: "XLRI Jamshedpur", logo: "/xlri-logo.jpg" },
    { name: "ISB Hyderabad", logo: "/isb-logo.jpg" },
    { name: "SP Jain", logo: "/sp-jain-logo.jpg" },
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
      className="flex-shrink-0 px-6 py-4 rounded-xl bg-gradient-to-br from-primary/10 to-white border border-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-w-max"
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
    <section className=" md:py-32 bg-gradient-to-b from-white via-primary/5 to-white">
      {/* Header */}
      <motion.div
        className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Learn from <span className="text-primary">Top Institutes</span>
          <motion.div
          className="inline-block ml-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg className="w-6 h-6 text-primary inline" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        </h2>
        
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
        <Stats number="50+" label="Partner Institutes" />
        <Stats number="500+" label="Expert Faculty" />
        <Stats number="10,000+" label="Students Enrolled" />
        <Stats number="95%" label="Success Rate" />
      </motion.div>
    </section>
  )
}

export default StudentsPartner
