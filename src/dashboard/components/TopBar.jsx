import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../state/useDashboardStore';

const TopBar = ({ pathname }) => {
  const navigate = useNavigate();
  const breakpoint = useDashboardStore((state) => state.preview.breakpoint);
  const setPreviewOption = useDashboardStore((state) => state.setPreviewOption);

  const segments = pathname.replace('/dashboard', '').split('/').filter(Boolean);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between sticky top-0">
      <div>
        <div className="text-xs uppercase tracking-widest text-gray-500">Dashboard</div>
        <div className="text-lg font-semibold text-gray-900 capitalize">
          {segments.length ? segments.join(' / ') : 'overview'}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-gray-500 px-2">Preview:</label>
        {['mobile', 'tablet', 'desktop'].map((bp) => (
          <button
            key={bp}
            onClick={() => setPreviewOption('breakpoint', bp)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              breakpoint === bp ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {bp.charAt(0).toUpperCase() + bp.slice(1)}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </span>
            {user.email || 'User'}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

