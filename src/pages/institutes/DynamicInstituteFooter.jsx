import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const defaultQuickLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const SOCIAL_PLATFORMS = [
  { id: 'youtube', Icon: FaYoutube, colorClass: 'hover:text-red-500' },
  { id: 'instagram', Icon: FaInstagram, colorClass: 'hover:text-pink-500' },
  { id: 'facebook', Icon: FaFacebook, colorClass: 'hover:text-blue-500' },
  { id: 'x', Icon: FaXTwitter, colorClass: 'hover:text-white' },
];

const DynamicInstituteFooter = ({ institute, content }) => {
  const footerData = content?.footer || {};
  const quickLinks =
    footerData.quickLinks && footerData.quickLinks.length > 0
      ? footerData.quickLinks
      : defaultQuickLinks;
  const socialLinks = footerData.socialLinks || [];

  const urlByPlatform = socialLinks.reduce((acc, item) => {
    const key = (item.platform || '').toLowerCase();
    if (key && item.url) {
      acc[key] = item.url;
    }
    return acc;
  }, {});

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Institute branding */}
          <div>
            {institute?.businessLogo && (
              <img
                src={institute.businessLogo}
                alt={institute.businessName}
                className="h-12 w-auto mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">
              {institute?.businessName || 'Institute'}
            </h3>
            <p className="text-gray-400 text-sm">
              {institute?.businessAddress || ''}
            </p>
          </div>

          {/* Quick links – in-page navigation */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li>{institute?.businessEmail || ''}</li>
              <li>{institute?.businessMobileNumber || ''}</li>
              {institute?.businessWebsite && (
                <li>
                  <a
                    href={institute.businessWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Website
                  </a>
                </li>
              )}
            </ul>

            <div>
              <h5 className="font-semibold mb-2 text-sm">Follow Us</h5>
              <div className="flex flex-wrap items-center gap-3 text-xl text-gray-400">
                {SOCIAL_PLATFORMS.map(({ id, Icon, colorClass }) => {
                  let url = urlByPlatform[id];
                  if (!url && id === 'youtube' && institute?.businessYouTubeChannel) {
                    url = institute.businessYouTubeChannel;
                  }
                  if (!url) return null;
                  return (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${colorClass}`}
                      aria-label={id}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Powered by Mobishaala */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p className="font-semibold text-white mb-2">
                Powered by Mobishaala
              </p>
              <a
                href="https://www.mobishaala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <img
                  src="/mobishaala.com_logo.png"
                  alt="Mobishaala"
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {institute?.businessName || 'Institute'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DynamicInstituteFooter;

