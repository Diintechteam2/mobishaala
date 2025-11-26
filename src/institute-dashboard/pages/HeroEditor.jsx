import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

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

const defaultBackgroundImage = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600';
const defaultBadge = 'Destination IAS • Mobishaala UPSC Network';
const defaultHeadline = 'Full Stack UPSC + PCS Mastery for Serious Aspirants';
const defaultDescription =
  'Access Delhi faculty, hybrid answer writing labs, personalised mentors and AI feedback dashboards. Build your attempt the right way within 9 months.';
const defaultHeroStats = [
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
const defaultFocusOptions = [
  'UPSC CSE Integrated',
  'UPSC Prelims Booster',
  'UPSC Optional Mentorship',
  'UPPCS Foundation',
  'MPPSC Crash Course'
];

const HeroEditor = () => {
  const { instituteId } = useParams();
  const institute = useMemo(() => JSON.parse(localStorage.getItem('currentInstitute') || '{}'), []);

  const [content, setContent] = useState({
    badge: '',
    headline: '',
    description: '',
    backgroundImage: '',
    stats: [
      { topLabel: '', label: '', value: '' },
      { topLabel: '', label: '', value: '' }
    ],
    focusOptions: defaultFocusOptions
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [instituteId]);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to admin dashboard first');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        const heroData = data.data.hero || {};
        setContent({
          badge: heroData.badge || '',
          headline: heroData.headline || '',
          description: heroData.description || '',
          backgroundImage: heroData.backgroundImage || '',
          stats:
            heroData.stats?.length > 0
              ? heroData.stats
              : [
                  { topLabel: '', label: '', value: '' },
                  { topLabel: '', label: '', value: '' }
                ],
          focusOptions: heroData.focusOptions?.length ? heroData.focusOptions : defaultFocusOptions
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat))
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContent((prev) => ({ ...prev, backgroundImageFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();

      const heroData = {
        ...content,
        backgroundImage: content.backgroundImageFile ? '' : content.backgroundImage
      };
      formData.append('hero', JSON.stringify(heroData));

      if (content.backgroundImageFile) {
        formData.append('backgroundImage', content.backgroundImageFile);
      }

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Hero section updated successfully!');
        if (data.data.hero.backgroundImage) {
          setContent((prev) => ({
            ...prev,
            backgroundImage: data.data.hero.backgroundImage,
            backgroundImageFile: null
          }));
        }
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to update');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading Hero Section...</p>
        <p className="mt-1 text-xs text-gray-400">Institute ID: {instituteId}</p>
      </div>
    );
  }

  const hasCustomStats =
    content.stats?.length && content.stats.some((stat) => stat.value && (stat.topLabel || stat.label));

  const heroPreviewData = {
    badge: content.badge || defaultBadge,
    headline: content.headline || defaultHeadline,
    description: content.description || defaultDescription,
    backgroundImage: content.backgroundImage || defaultBackgroundImage,
    stats: hasCustomStats ? content.stats : defaultHeroStats,
    focusOptions: content.focusOptions?.length ? content.focusOptions : defaultFocusOptions,
    instituteName: institute?.businessName || 'Institute'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-sm text-gray-500">Institute ID: {instituteId}</p>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          {isEditing ? 'Close Editor' : 'Edit Hero Section'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
          <span className="text-sm text-gray-500">Visible to visitors</span>
        </div>
        <HeroPreview data={heroPreviewData} />
      </div>

      {isEditing && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Hero Content</h3>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
              <input
                type="text"
                name="badge"
                value={content.badge}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="e.g., Destination IAS • Mobishaala UPSC Network"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                name="headline"
                value={content.headline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Main headline text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={content.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Description text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
              {content.backgroundImage && !content.backgroundImageFile && (
                <img src={content.backgroundImage} alt="Background" className="w-full h-48 object-cover rounded-lg mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statistics</label>
              <div className="grid grid-cols-2 gap-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={stat.topLabel || ''}
                    onChange={(e) => handleStatChange(index, 'topLabel', e.target.value)}
                    placeholder="Top label (e.g., Results 2024)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={stat.label || ''}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    placeholder="Description (e.g., Selections in UPSC...)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const HeroPreview = ({ data }) => {
  return (
    <section className="pt-12 pb-6 bg-gradient-to-b from-[#f0f5ff] via-white to-white relative overflow-hidden rounded-2xl border border-gray-100">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 bg-white/80 rounded-full shadow text-sm font-semibold text-primary mb-5">
              {data.badge}
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">{formatHeadline(data.headline)}</h1>
            <p className="text-lg text-gray-600 mt-5">{data.description}</p>
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {data.stats.map((stat, index) => {
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
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 pointer-events-none opacity-90">
            <p className="text-sm font-semibold text-primary uppercase">Book a Counselling Call</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Plan your journey</h3>
            <form className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  disabled
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-400"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  disabled
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-400"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  disabled
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-400"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Focus Area</label>
                <select
                  disabled
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-400"
                >
                  {data.focusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                disabled
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow-md opacity-70 cursor-not-allowed"
              >
                Request Callback
              </button>
              <p className="text-xs text-gray-500 text-center">
                Preview of how visitors will see this section.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEditor;

