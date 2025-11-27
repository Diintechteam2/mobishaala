import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const defaultQuickLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const SOCIAL_PLATFORMS = [
  { id: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { id: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { id: 'facebook', label: 'Facebook', Icon: FaFacebook },
  { id: 'x', label: 'X (Twitter)', Icon: FaXTwitter },
];

const FooterPreview = ({ institute, footer }) => {
  const quickLinks =
    footer.quickLinks && footer.quickLinks.length > 0
      ? footer.quickLinks
      : defaultQuickLinks;
  const socialLinks = footer.socialLinks || [];

  const urlByPlatform = socialLinks.reduce((acc, item) => {
    const key = (item.platform || '').toLowerCase();
    if (key && item.url) acc[key] = item.url;
    return acc;
  }, {});

  return (
    <footer className="bg-gray-900 text-white rounded-2xl overflow-hidden">
      <div className="px-6 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            {institute?.businessLogo && (
              <img
                src={institute.businessLogo}
                alt={institute.businessName}
                className="h-10 w-auto mb-3 rounded-md bg-white/5 p-1 object-contain"
              />
            )}
            <h3 className="text-base font-semibold mb-1">
              {institute?.businessName || 'Institute'}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2">
              {institute?.businessAddress || 'Institute address appears here'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {quickLinks.map((link, idx) => (
                <li key={idx}>{link.label || 'Link label'}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <ul className="space-y-1 text-xs text-gray-400 mb-3">
              <li>{institute?.businessEmail || 'email@institute.com'}</li>
              <li>{institute?.businessMobileNumber || '+91-XXXXXXXXXX'}</li>
              {institute?.businessWebsite && (
                <li>Website: {institute.businessWebsite}</li>
              )}
            </ul>
            <div>
              <h5 className="font-semibold mb-1 text-xs">Follow Us</h5>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                {SOCIAL_PLATFORMS.map(({ id, Icon, label }) => {
                  let url = urlByPlatform[id];
                  if (!url && id === 'youtube' && institute?.businessYouTubeChannel) {
                    url = institute.businessYouTubeChannel;
                  }
                  if (!url) return null;
                  return (
                    <span key={id} className="inline-flex items-center gap-1.5">
                      <span className="text-base">
                        <Icon />
                      </span>
                      <span className="text-[11px]">{label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between text-xs text-gray-400">
            <div>
              <p className="font-semibold text-white mb-2">
                Powered by Mobishaala
              </p>
              <div className="inline-flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">M</span>
                </div>
                <span>Mobishaala logo preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 px-6 py-3 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} {institute?.businessName || 'Institute'}.
        All rights reserved.
      </div>
    </footer>
  );
};

const FooterEditor = () => {
  const { instituteId } = useParams();
  const institute = useMemo(
    () => JSON.parse(localStorage.getItem('currentInstitute') || '{}'),
    []
  );

  const [footer, setFooter] = useState({
    quickLinks: defaultQuickLinks,
    socialLinks: SOCIAL_PLATFORMS.map((p) => ({
      platform: p.id,
      label: p.label,
      url: '',
    })),
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instituteId]);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to admin dashboard first');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        const footerData = data.data.footer || {};
        const savedSocial = footerData.socialLinks || [];
        const mergedSocial = SOCIAL_PLATFORMS.map((p) => {
          const match =
            savedSocial.find(
              (s) =>
                (s.platform || '').toLowerCase() === p.id ||
                (s.label || '').toLowerCase() === p.label.toLowerCase()
            ) || {};
          return {
            platform: p.id,
            label: p.label,
            url: match.url || '',
          };
        });
        setFooter({
          quickLinks:
            footerData.quickLinks && footerData.quickLinks.length > 0
              ? footerData.quickLinks
              : defaultQuickLinks,
          socialLinks: mergedSocial,
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load footer settings.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuickLink = (index, field, value) => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addQuickLink = () => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { label: '', href: '#courses' }],
    }));
  };

  const removeQuickLink = (index) => {
    setFooter((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, idx) => idx !== index),
    }));
  };

  const updateSocialUrl = (index, value) => {
    setFooter((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((item, idx) =>
        idx === index ? { ...item, url: value } : item
      ),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('authToken');
      const payload = {
        footer: {
          quickLinks: footer.quickLinks,
          socialLinks: footer.socialLinks,
        },
      };

      const response = await fetch(
        `https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess('Footer updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save footer.');
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
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        <p className="mt-2 text-gray-600">Loading Footer...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Footer</h1>
          <p className="text-sm text-gray-500">
            Control quick links and social profiles shown at the bottom of your
            public institute page.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {saving ? 'Saving...' : 'Save Footer'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Live Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
          <span className="text-sm text-gray-500">Visible to visitors</span>
        </div>
        <FooterPreview institute={institute} footer={footer} />
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Quick Links
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            These links scroll to sections on your institute page. Use hashes
            like <code className="px-1 py-0.5 bg-gray-100 rounded">#courses</code>,{' '}
            <code className="px-1 py-0.5 bg-gray-100 rounded">#testimonials</code>,{' '}
            <code className="px-1 py-0.5 bg-gray-100 rounded">#faq</code>.
          </p>
          <div className="space-y-3">
            {footer.quickLinks.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
              >
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) =>
                      updateQuickLink(idx, 'label', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Courses"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Target (hash)
                  </label>
                  <input
                    type="text"
                    value={item.href || ''}
                    onChange={(e) =>
                      updateQuickLink(idx, 'href', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="#courses"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeQuickLink(idx)}
                    className="px-3 py-2 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addQuickLink}
            className="mt-4 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            + Add Quick Link
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Social Links
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Add URLs for your official profiles. Icons for YouTube, Instagram,
            Facebook and X will always show (if URL is filled).
          </p>
          <div className="space-y-3">
            {footer.socialLinks.map((item, idx) => (
              <div
                key={item.platform}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
              >
                <div className="md:col-span-2 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
                    {item.label.charAt(0)}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-gray-800">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {item.platform.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-600 mb-1">
                    Profile URL
                  </label>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => updateSocialUrl(idx, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;


