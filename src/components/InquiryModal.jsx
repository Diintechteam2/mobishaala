import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'https://mobishaala-backend-zcxm.onrender.com';

const initialForm = {
  name: '',
  businessName: '',
  businessEmail: '',
  whatsappNumber: '',
};

const InquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetState = () => {
    setFormData(initialForm);
    setFeedback({ type: '', message: '' });
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    resetState();
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const { name, businessName, businessEmail, whatsappNumber } = formData;
    if (!name || !businessName || !businessEmail || !whatsappNumber) {
      setFeedback({ type: 'error', message: 'All fields are required.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ type: '', message: '' });
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website_cta',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      setFeedback({
        type: 'success',
        message: 'Thanks! Our team will get in touch within a few minutes.',
      });
      setFormData(initialForm);
    } catch (error) {
      console.error('Inquiry submission failed:', error);
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to submit right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-2xl uppercase text-primary font-semibold">Book A Demo</p>
                <h3 className="text-2xl font-bold text-gray-900"></h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Close inquiry form"
                disabled={isSubmitting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="px-6 py-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700 flex flex-col gap-2">
                  Full Name*
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="e.g., Nikhil Sharma"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700 flex flex-col gap-2">
                  Institution Name*
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Institute / Coaching name"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700 flex flex-col gap-2">
                Institution Email*
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="you@institute.com"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700 flex flex-col gap-2">
                  WhatsApp Number*
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>
              {feedback.message && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    feedback.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-red-50 text-red-600 border border-red-100'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Our Team will reach out to you confirm your booking slot.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Now'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;



