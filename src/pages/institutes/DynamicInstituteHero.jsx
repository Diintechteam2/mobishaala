import React, { useState } from 'react';

// Helper function to format headline with last 2 words in primary color
const formatHeadline = (headline) => {
  if (!headline) return null;
  const words = headline.trim().split(' ');
  if (words.length <= 2) {
    return <span className="text-primary">{headline}</span>;
  }
  const mainPart = words.slice(0, -2).join(' ');
  const highlightPart = words.slice(-2).join(' ');
  return (
    <>
      {mainPart} <span className="text-primary">{highlightPart}</span>
    </>
  );
};

const defaultFocusOptions = [
  'UPSC CSE Integrated',
  'UPSC Prelims Booster',
  'UPSC Optional Mentorship',
  'UPPCS Foundation',
  'MPPSC Crash Course'
];

const DynamicInstituteHero = ({ institute, content }) => {
  const focusOptions = content?.hero?.focusOptions?.length
    ? content.hero.focusOptions
    : defaultFocusOptions;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    focus: focusOptions[0] || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Get hero data from content or use defaults
  const heroData = content?.hero || {};
  const badge = heroData.badge || `${institute?.businessName || 'Institute'} • Mobishaala Network`;
  const headline = heroData.headline || `Welcome to ${institute?.businessName || 'Our Institute'}`;
  const description = heroData.description || institute?.businessDescription || 'Join us for quality education and training.';
  const backgroundImage = heroData.backgroundImage || institute?.instituteImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600';
  const stats = heroData.stats?.length
    ? heroData.stats
    : [
        {
          topLabel: 'Results 2024',
          value: '37',
          label: 'Selections in UPSC CSE & State PCS'
        },
        {
          topLabel: 'Live Cohorts',
          value: '14',
          label: 'Integrated + Optional'
        }
      ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://mobishaala-backend-zcxm.onrender.com/api/leads/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instituteId: institute?.instituteId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          focusArea: formData.focus,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit request');
      }

      setSuccess('Request received! Our counsellor will call you shortly.');
      setFormData({ name: '', email: '', phone: '', focus: focusOptions[0] || '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-[#f0f5ff] via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 bg-white/80 rounded-full shadow text-sm font-semibold text-primary mb-5">
              {badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {formatHeadline(headline)}
            </h1>
            <p className="text-lg text-gray-600 mt-5 max-w-xl">
              {description}
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {stats.map((stat, index) => {
                const topLabel = stat.topLabel || stat.heading || stat.label || 'Results';
                const bottomLabel = stat.bottomLabel || stat.description || stat.label || '';
                return (
                  <div key={index} className="bg-white rounded-3xl p-5 shadow border border-primary/10">
                    <p className="text-xs font-semibold text-primary uppercase">{topLabel}</p>
                    <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500">{bottomLabel}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="institute-form" className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <p className="text-sm font-semibold text-primary uppercase">Book a Counselling Call</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Plan your journey</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  {success}
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Focus Area</label>
                <select
                  name="focus"
                  value={formData.focus}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {focusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-md hover:bg-primary-dark transition disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Request Callback'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive WhatsApp / Call updates from {institute?.businessName || 'us'}.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicInstituteHero;

