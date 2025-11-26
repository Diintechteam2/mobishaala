import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const InstituteDashboardLayout = () => {
  const { instituteId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log('🏢 InstituteDashboardLayout rendered');
  console.log('📍 Current location:', location.pathname);
  console.log('🆔 Institute ID from params:', instituteId);
  
  const instituteStr = localStorage.getItem('currentInstitute') || '{}';
  const institute = JSON.parse(instituteStr);
  
  console.log('📋 Institute data from localStorage:', institute);
  
  // If no institute data, redirect back
  useEffect(() => {
    if (!institute || !institute.instituteId) {
      console.warn('⚠️ No institute data found, redirecting to admin dashboard');
      console.warn('⚠️ Institute object:', institute);
      navigate('/dashboard/institutes');
    } else {
      console.log('✅ Institute data validated:', institute.instituteId);
    }
  }, [institute, navigate]);
  
  // Redirect to hero if on base path
  useEffect(() => {
    if (location.pathname === `/institute-dashboard/${instituteId}`) {
      console.log('🔄 Redirecting to hero page');
      navigate(`/institute-dashboard/${instituteId}/hero`, { replace: true });
    }
  }, [location.pathname, instituteId, navigate]);

  const menuItems = [
    { path: 'hero', label: 'Hero Section', icon: '🏠' },
    { path: 'courses', label: 'Courses', icon: '📚' },
    { path: 'journey', label: 'Journey/Platform', icon: '🛤️' },
    { path: 'testimonials', label: 'Testimonials', icon: '💬' },
    { path: 'faq', label: 'FAQ', icon: '❓' },
    { path: 'users', label: 'Users & Leads', icon: '👥' },
  ];

  const handleBackToAdmin = () => {
    localStorage.removeItem('currentInstitute');
    navigate('/dashboard/institutes');
  };

  if (!institute || !institute.instituteId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading institute data...</p>
          <button
            onClick={() => navigate('/dashboard/institutes')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Institute Logo and Name */}
        <div className="p-6 border-b border-gray-200">
          {institute.businessLogo && (
            <img
              src={institute.businessLogo}
              alt={institute.businessName}
              className="w-16 h-16 rounded-lg object-cover mx-auto mb-3"
            />
          )}
          <h2 className="text-lg font-bold text-gray-900 text-center">
            {institute.businessName || 'Institute'}
          </h2>
          <p className="text-xs text-gray-500 text-center mt-1">
            ID: {institute.instituteId || instituteId}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(`/institute-dashboard/${instituteId}/${item.path}`)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleBackToAdmin}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            ← Back to Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <React.Suspense fallback={
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          }>
            <Outlet />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
};

export default InstituteDashboardLayout;

