"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InstitutesShowcase = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      // Fetch only Active institutes for public display
      const response = await fetch('https://mobishaala-backend-zcxm.onrender.com/api/institutes/public');
      const data = await response.json();
      
      if (data.success) {
        // Filter only Active institutes
        const activeInstitutes = data.data.filter(inst => inst.status === 'Active');
        setInstitutes(activeInstitutes);
      } else {
        // Fallback to empty array if API fails
        setInstitutes([]);
      }
    } catch (error) {
      console.error('Error fetching institutes:', error);
      // Fallback to empty array on error
      setInstitutes([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Our institutes</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
              Trusted by category leaders
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Each institute gets a bespoke workspace, dedicated WhatsApp + calling numbers, branded apps and
              real-time analytics dashboard.
            </p>
          </div>
          <button className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold">
            View full customer list
            <span>→</span>
          </button>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-gray-600">Loading institutes...</p>
          </div>
        ) : institutes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No active institutes available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {institutes.map((institute, index) => (
              <Link 
                key={institute._id || institute.instituteId} 
                to={`/institutes/${institute.instituteId}`} 
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
              >
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-lg group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="h-64 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${institute.instituteImage || institute.businessLogo || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop'})` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-2xl border border-white/50 overflow-hidden bg-white/10 backdrop-blur">
                        <img 
                          src={institute.businessLogo || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop'} 
                          alt={institute.businessName} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{institute.businessName}</h3>
                        <p className="text-sm text-white/80">{institute.businessCategory || 'Education Institute'}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-white/80">
                      <p>• {institute.city || 'Location'}</p>
                      <p>• {institute.businessCategory || 'Category'}</p>
                      <p>• {institute.status === 'Active' ? 'Active' : 'Available'}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InstitutesShowcase;

