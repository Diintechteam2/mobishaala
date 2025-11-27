import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard/overview', label: 'Overview', icon: '📊' },
  { to: '/dashboard/content', label: 'Content Studio', icon: '🧱' },
  { to: '/dashboard/institutes', label: 'Institutes', icon: '🏫' },
  { to: '/dashboard/theme', label: 'Theme', icon: '🎨' },
  { to: '/dashboard/leads', label: 'Leads', icon: '📞' },
  { to: '/dashboard/inquiries', label: 'Inquiries', icon: '🗂️' },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

const SidebarNav = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="text-sm text-gray-500 uppercase tracking-wide">Mobishaala</div>
        <div className="text-xl font-bold text-gray-900">Content Dashboard</div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pb-6">
        <div className="rounded-2xl bg-gray-100 p-4 text-xs text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">Need help?</p>
          Email <a className="text-primary font-semibold" href="mailto:studio@mobishaala.com">studio@mobishaala.com</a>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;


