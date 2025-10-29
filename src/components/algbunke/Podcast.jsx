"use client"
import React from "react"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"

const Podcast = () => {
  const items = useMemo(
    () => [
      {
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop",
        title: "Raghav Gupta Shares NEW HACKS For New Age Career – AI, Tech, Money | TRS",
        subtitle: "ft. Ranveer Allahbadia | Beer Biceps & Raghav Gupta",
      },
      {
        image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop",
        title: "The REAL Reason Why Students Aren't Job-Ready",
        subtitle: "ft. Ansh Mehra & Raghav Gupta",
      },
      {
        image: "https://images.unsplash.com/photo-1581090468348-1e7eab36f69b?q=80&w=1600&auto=format&fit=crop",
        title: "Mashable Mornings – Futurense Technologies",
        subtitle: "ft. Siddhaarth Aalambayan & Raghav Gupta",
      },
      {
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
        title: "English Speaking Course, Rapidex Book & more",
        subtitle: "ft. The Lallantop & Raghav Gupta",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Listen To Our <span className="text-[#a90f35] italic">Podcast</span>
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
            From industry insights to personal stories of transformation, tune into the podcasts where our mission,
            mentors, and learners take center stage.
          </p>
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
                  {/* Video Thumbnail */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-video">
                    <img
                      src={it.image || "/placeholder.svg"}
                      alt={it.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#a90f35] ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2 sm:mb-3 flex-grow line-clamp-2">
                      {it.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2">{it.subtitle}</p>
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
      </div>
    </section>
  )
}

export default Podcast
