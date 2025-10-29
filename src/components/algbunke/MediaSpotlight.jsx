"use client"
import React from 'react';
import { useMemo, useState } from "react"
import { motion } from "framer-motion"

const MediaSpotlight = () => {
  const items = useMemo(
    () => [
      {
        image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop",
        title: "We aim to be the gurukula of tech",
        source: "FINANCIAL EXPRESS",
        date: "August 25, 2025",
        sourceColor: "#FF9500",
      },
      {
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
        title: "Futurense Launches India's First AI Think Tank, The Futurense Leadership Council",
        source: "PR Newswire",
        date: "November 28, 2024",
        sourceColor: "#FF9500",
      },
      {
        image: "https://images.unsplash.com/photo-1504718855392-c0f33b372e72?q=80&w=1600&auto=format&fit=crop",
        title: "Futurense & IIT Jodhpur launch India's first tech-MBA",
        source: "The Statesman",
        date: "March 15, 2024",
        sourceColor: "#FF9500",
      },
      {
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
        title: "From students to job-ready candidates; Education in the age of AI",
        source: "YOURSTORY",
        date: "Feb 20, 2024",
        sourceColor: "#FF0000",
      },
    ],
    [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const cardsPerView = 3
  const cardWidthPercent = 100 / items.length
  const maxIndex = Math.max(0, items.length - cardsPerView)

  const goToSlide = (i) => {
    setCurrentIndex(Math.min(Math.max(i, 0), maxIndex))
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Media Spotlight</h2>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-5 md:gap-6"
            animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ width: `${items.length * cardWidthPercent}%` }}
          >
            {items.map((it, i) => (
              <div key={i} className="shrink-0" style={{ width: `${cardWidthPercent}%` }}>
                <motion.div
                  className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={it.image || "/placeholder.svg"}
                      alt={it.title}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Source Badge */}
                    <div
                      className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-white text-xs font-bold"
                      style={{ backgroundColor: it.sourceColor }}
                    >
                      {it.source}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-3 sm:mb-4 flex-grow line-clamp-3">
                      {it.title}
                    </h3>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 sm:pt-4 border-t border-gray-200">
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">{it.source}</span>
                      <span className="text-xs sm:text-sm text-gray-500">{it.date}</span>
                    </div>

                    {/* Read More Link */}
                    <button className="mt-3 sm:mt-4 text-[#a90f35] hover:text-[#8a0a2a] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors">
                      Read More
                      <span>→</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots - One dot per card */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 md:mt-10">
          {items.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "bg-[#a90f35] w-2.5 h-2.5 sm:w-3 sm:h-3"
                  : "bg-gray-300 hover:bg-gray-400 w-2 h-2 sm:w-2.5 sm:h-2.5"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8 md:mt-10">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-400 text-gray-900 font-semibold text-sm sm:text-base rounded-full hover:bg-gray-50 transition-colors duration-300">
            View All Press & Media Articles
          </button>
        </div>
      </div>
    </section>
  )
}

export default MediaSpotlight
