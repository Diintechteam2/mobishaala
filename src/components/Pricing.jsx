import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Starter",
      price: { monthly: 499, annual: 399 },
      description: "Perfect for individual aspirants starting their journey",
      features: [
        "5 answer evaluations per month",
        "AI-powered feedback",
        "Basic progress tracking",
        "Daily practice prompts",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Pro",
      price: { monthly: 999, annual: 799 },
      description: "For serious aspirants who want comprehensive preparation",
      features: [
        "Unlimited answer evaluations",
        "Expert mentor feedback",
        "Advanced progress analytics",
        "Priority evaluation (4 hours)",
        "Essay writing practice",
        "Ethics case studies",
        "24/7 chat support",
        "Personal study plan"
      ],
      popular: true,
      color: "from-primary to-primary-dark"
    },
    {
      name: "Institutional",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For coaching institutes and organizations",
      features: [
        "Bulk student licensing",
        "Custom branding options",
        "Advanced analytics dashboard",
        "Student progress reports",
        "API integration",
        "Dedicated account manager",
        "Training and onboarding",
        "Custom feature development"
      ],
      popular: false,
      color: "from-green-500 to-emerald-500"
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
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-gray-900 relative overflow-hidden">
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
            Simple.{' '}
            <span className="gradient-text">Transparent.</span>{' '}
            Affordable.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Choose the plan that fits your preparation needs and budget
          </motion.p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full p-1 flex w-full max-w-[320px] sm:max-w-none">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                !isAnnual
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                isAnnual
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Annual
              <span className="hidden sm:inline-block ml-2 text-sm bg-green-500 text-black px-2 py-1 rounded-full whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className={`relative group ${
                plan.popular ? 'lg:transform lg:scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-2 rounded-full text-sm font-bold z-10 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Card */}
              <div className={`bg-gray-800 bg-opacity-50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary shadow-2xl shadow-primary/20' 
                  : 'border-gray-700 hover:border-primary'
              }`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-2">
                    {typeof plan.price[isAnnual ? 'annual' : 'monthly'] === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-white">₹</span>
                        <span className="text-5xl font-bold text-white">
                          {plan.price[isAnnual ? 'annual' : 'monthly']}
                        </span>
                        <span className="text-gray-300">/mo</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">Custom</span>
                    )}
                  </div>
                  
                  {typeof plan.price[isAnnual ? 'annual' : 'monthly'] === 'number' && (
                    <p className="text-gray-400 text-sm">
                      {isAnnual ? 'Billed annually' : 'Billed monthly'}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-black">✓</div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  {plan.name === "Institutional" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary w-full"
                    >
                      Contact Sales
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full font-semibold px-6 py-3 rounded-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-primary text-black hover:bg-primary-dark'
                          : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black'
                      }`}
                    >
                      {plan.name === "Starter" ? "Start Free Trial" : "Get Started"}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Plan?
            </h3>
            <p className="text-gray-300 mb-6">
              We offer custom pricing for large groups, educational institutions, and special requirements
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Talk to Our Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
