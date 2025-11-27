"use client"
import React, { useState } from 'react';
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
    <div className="text-xs text-gray-600 font-medium mb-2">Realtime Enrollments</div>
    <div className="text-gray-900 text-sm font-semibold">
      <span className="text-primary font-bold text-base">+48%</span> conversion lift
    </div>
    <div className="text-xs text-gray-500 mt-3 font-medium">Triggered nudges & call orchestration</div>
  </motion.div>
)

const Hero = ({ onOpenInquiry }) => {
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')

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

  const featureHighlights = [
    "Orchestrate your institute's sales, marketing & software with AI-powered Mobishaala.",
    'Agentic AI End - to - End Support',
    // 'Track applications, nudges, and payments from one agentic command center.'
  ]

  const handleCallRequest = (event) => {
    event.preventDefault()
    if (!phoneNumber.trim()) {
      setFeedbackMessage('Please enter a valid mobile number.')
      return
    }
    setIsSubmitting(true)
    setFeedbackMessage('')

    // Placeholder async hook – integrate API later.
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedbackMessage('Thanks! Our team will reach out shortly.')
      setPhoneNumber('')
    }, 800)
  }

  const closePopup = () => {
    setIsCallPopupOpen(false)
    setPhoneNumber('')
    setFeedbackMessage('')
    setIsSubmitting(false)
  }

  return (
    <section id="home" className="pt-[60px] md:pt-16 pb-0 md:pb-0 bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Headline and CTAs */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Main Headline */}
            <motion.h1
              className="text-3xl sm:text-5xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight"
              variants={itemVariants}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Highlight>India's first</Highlight>
                <span>AI-Enabled</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Highlight>Education Network</Highlight>
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-lg md:text-xl mt-6 max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              Mobishaala stands as a bridge between traditional teaching excellence and futuristic AI intelligence — enabling every educator to scale, every student to succeed, and every institute to thrive in the new digital era.
            </motion.p>

            <motion.ul className="mt-6 space-y-3 text-gray-600 text-base" variants={itemVariants}>
              {featureHighlights.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div className="mt-8 flex flex-wrap items-center gap-4" variants={itemVariants}>
              <motion.button
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => onOpenInquiry?.()}
              >
                Book A Demo
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-bold text-lg bg-white shadow-lg hover:bg-primary hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCallPopupOpen(true)}
                aria-label="Get a call back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.57 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.14a2 2 0 0 1 2.11-.45c.84.27 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"
                  />
                </svg>
                <span>Get a Call</span>
              </motion.button>
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
                src="/mobishaalaheroimage-1.jpg"
                alt="Growth team using Mobishaala"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </motion.div>

            {/* Stat Card - Top Right */}
            {/* <div className="absolute -top-4 -right-4 md:top-8 md:right-0 w-56 md:w-64 z-10">
              <StatCard title="Calls orchestrated" value="330 / week" sub="AI-routed + human follow-ups" delay={0.5} />
            </div> */}

            {/* Offer Card - Bottom Left */}
            {/* <div className="absolute -bottom-6 -left-4 md:bottom-12 md:left-0 w-72 md:w-80 z-10">
              <OfferCard delay={0.7} />
            </div> */}

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

      {isCallPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-primary font-semibold">Talk To Us</p>
                <h3 className="text-2xl font-bold text-gray-900">Request a Call Back</h3>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={closePopup}
                aria-label="Close request form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Drop your mobile number and our counselor desk will reach out within minutes.
            </p>
            <form className="space-y-4" onSubmit={handleCallRequest}>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
                <input
                  type="tel"
                  inputMode="tel"
                  maxLength={15}
                  placeholder="Enter your mobile number"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
              {feedbackMessage && (
                <p className={`text-sm ${feedbackMessage.startsWith('Thanks') ? 'text-green-600' : 'text-red-600'}`}>
                  {feedbackMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-3 text-white font-semibold hover:bg-primary-dark transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Connecting…' : 'Get a Call'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Hero
