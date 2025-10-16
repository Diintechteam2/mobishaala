import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-background to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight break-words"
          >
            Write{' '}
            <span className="gradient-text">Smarter.</span>
            <br />
            Rank{' '}
            <span className="gradient-text">Higher.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Join thousands of successful aspirants who transformed their Mains preparation with AI-powered evaluation and expert mentorship
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-base sm:text-xl px-8 py-4 sm:px-10 sm:py-5"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-base sm:text-xl px-8 py-4 sm:px-10 sm:py-5"
            >
              Schedule a Live Demo
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-300">Active Aspirants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">6 Hours</div>
              <div className="text-gray-300">Average Evaluation Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </motion.div>

          {/* Additional Features */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              What You Get with Your Free Trial
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">3 Free Answer Evaluations</h4>
                    <p className="text-gray-300 text-sm">Experience our AI + expert evaluation system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">Daily Practice Prompts</h4>
                    <p className="text-gray-300 text-sm">Curated questions from previous years</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">Progress Dashboard</h4>
                    <p className="text-gray-300 text-sm">Track your improvement over time</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">Expert Feedback</h4>
                    <p className="text-gray-300 text-sm">Detailed insights from UPSC veterans</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">Mobile App Access</h4>
                    <p className="text-gray-300 text-sm">Practice anywhere, anytime</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-white">No Credit Card Required</h4>
                    <p className="text-gray-300 text-sm">Start your journey risk-free</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <p className="text-lg text-gray-400">
              Ready to transform your UPSC/PCS Mains preparation?{' '}
              <span className="text-primary font-semibold">Start your free trial today!</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
