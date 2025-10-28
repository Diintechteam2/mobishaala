"use client"
import React from 'react';
import { motion } from "framer-motion"

const Highlight = ({ children }) => (
  <motion.span
    className="px-3 py-1 rounded-md bg-primary text-white font-bold"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    {children}
  </motion.span>
)

const StatCard = ({ title, value, sub, delay }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg px-5 py-4 backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  >
    <div className="text-xs text-gray-500 font-medium">{title}</div>
    <div className="text-3xl font-bold text-gray-900 mt-1">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-2">{sub}</div>}
  </motion.div>
)

const OfferCard = ({ delay }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-5 backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  >
    <div className="text-xs text-gray-600 font-medium mb-2">Latest Publication</div>
    <div className="text-gray-900 text-sm font-semibold">
      <span className="text-blue-500 font-bold text-base">NEW</span> Research Paper Available
    </div>
    <div className="text-xs text-gray-500 mt-3 font-medium">Download our latest study:</div>
    <div className="text-xs font-mono font-bold bg-gray-100 inline-block px-3 py-2 rounded mt-2 text-gray-900">
      AI-EDU-2024.pdf
    </div>
  </motion.div>
)

const PublicationsHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="publications-home" className="pt-[150px] md:pt-32 pb-0 md:pb-0 bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Headline and CTAs */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight"
              variants={itemVariants}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Highlight>Research</Highlight>
                <span>&</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Highlight>Publications</Highlight>
                <span>Hub</span>
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-lg md:text-xl mt-6 max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              Access cutting-edge research papers, academic publications, and educational insights from leading experts in the field.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="mt-8 flex items-center gap-4" variants={itemVariants}>
              <motion.button
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Publications
              </motion.button>
              <motion.div
                className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-7 w-7 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Image with Floating Cards */}
          <motion.div
            className="relative h-96 md:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Image */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=700&fit=crop"
                alt="Research and publications"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient (lighter for light theme) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </motion.div>

            {/* Stat Card - Top Right */}
            <div className="absolute -top-4 -right-4 md:top-8 md:right-0 w-56 md:w-64 z-10">
              <StatCard title="Papers published" value="150+" delay={0.5} />
            </div>

            {/* Offer Card - Bottom Left */}
            <div className="absolute -bottom-6 -left-4 md:bottom-12 md:left-0 w-72 md:w-80 z-10">
              <OfferCard delay={0.7} />
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-1/4 -left-8 w-20 h-20 bg-primary rounded-full opacity-20 blur-2xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-8 w-24 h-24 bg-primary-dark rounded-full opacity-20 blur-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PublicationsHero
