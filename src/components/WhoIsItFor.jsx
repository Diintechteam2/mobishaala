import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhoIsItFor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const audiences = [
    {
      title: "UPSC Mains Aspirants",
      description: "Perfect for serious candidates preparing for the most prestigious civil service examination in India.",
      features: ["Comprehensive GS coverage", "Essay writing practice", "Ethics case studies", "Previous year analysis"],
      icon: "🎯",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "PCS Candidates",
      description: "State civil service aspirants who need focused preparation for their specific state requirements.",
      features: ["State-specific content", "Regional focus", "Local governance topics", "State current affairs"],
      icon: "🏛️",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Coaching Institutes",
      description: "Partner with us to provide your students with cutting-edge AI-powered evaluation tools.",
      features: ["Bulk licensing", "Custom branding", "Analytics dashboard", "Student progress reports"],
      icon: "🏫",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Self-learners",
      description: "Independent learners who prefer structured guidance without traditional classroom constraints.",
      features: ["Flexible scheduling", "Personalized learning", "24/7 access", "Self-paced modules"],
      icon: "📚",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Who is{' '}
            <span className="gradient-text">mAIns</span>{' '}
            for?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Whether you're a serious aspirant, coaching institute, or self-learner, mAIns adapts to your needs
          </motion.p>
        </motion.div>

        {/* Audience Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 h-full hover:border-primary transition-all duration-300 relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${audience.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {audience.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {audience.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative z-10 mb-6">
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                    {audience.description}
                  </p>
                </div>

                {/* Features */}
                <div className="relative z-10">
                  <h4 className="font-semibold text-white mb-4">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {audience.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-t-full transition-all duration-300 group-hover:w-full"></div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-30"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Not sure if mAIns is right for you?
            </h3>
            <p className="text-gray-300 mb-6">
              Take our quick assessment to get personalized recommendations based on your current preparation level and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Take Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
