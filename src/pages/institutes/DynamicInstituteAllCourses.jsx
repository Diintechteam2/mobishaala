import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DynamicInstituteNavbar from './DynamicInstituteNavbar';
import DynamicInstituteFooter from './DynamicInstituteFooter';

// Default dummy courses
const defaultCourses = [
  {
    id: 'course-1',
    title: 'UPSC IAS Live GS P2I Foundation 2026 Fast Track',
    description: 'Batch just started • Hybrid + recordings • Daily answer reviews',
    category: 'UPSC',
    phase: 'GS P2I - 2026',
    language: 'Hindi',
    price: 21999,
    originalPrice: 70000,
    discount: 69,
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-2',
    title: 'UPSC IAS Live GS P2I Foundation 2027 Long Term',
    description: 'Mentor support + AI tracker • 900+ hours',
    category: 'UPSC',
    phase: 'GS P2I - 2027',
    language: 'English',
    price: 25999,
    originalPrice: 78000,
    discount: 63,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-3',
    title: 'UPSC Optional PSIR Mastery Program',
    description: '50 live sessions + 12 test discussions',
    category: 'UPSC Optional',
    phase: 'Optional - PSIR',
    language: 'English',
    price: 18999,
    originalPrice: 32000,
    discount: 41,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-4',
    title: 'State PCS + UPSC Combo (UPPCS / MPPSC)',
    description: 'State capsules + interview bootcamp',
    category: 'State PCS',
    phase: 'GS P2I - State',
    language: 'Hindi',
    price: 32999,
    originalPrice: 58000,
    discount: 45,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-5',
    title: 'UPSC IAS Live SIP 2026 Crash Course',
    description: 'Success in Prelims • Crash + mentorship',
    category: 'UPSC',
    phase: 'P2I - Advance',
    language: 'Hindi',
    price: 9999,
    originalPrice: 15999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-6',
    title: 'UPSC Mains Answer Writing Program',
    description: 'Daily answer practice + evaluation',
    category: 'UPSC',
    phase: 'Mains - 2025',
    language: 'English',
    price: 12999,
    originalPrice: 24000,
    discount: 46,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop'
  }
];

// Helper to format title with last 2 words highlighted
const formatTitle = (title) => {
  if (!title) return null;
  const words = title.trim().split(' ');
  if (words.length <= 2) {
    return <span className="text-primary">{title}</span>;
  }
  const mainPart = words.slice(0, -2).join(' ');
  const highlightPart = words.slice(-2).join(' ');
  return (
    <>
      {mainPart} <span className="text-primary">{highlightPart}</span>
    </>
  );
};

const DynamicInstituteAllCourses = () => {
  const { instituteId } = useParams();
  const navigate = useNavigate();

  const [institute, setInstitute] = useState(null);
  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePhase, setActivePhase] = useState('All');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const languages = ['All Languages', 'Hindi', 'English'];

  useEffect(() => {
    fetchData();
  }, [instituteId]);

  const fetchData = async () => {
    try {
      // Fetch institute details
      const instituteRes = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/public/${instituteId}`);
      if (instituteRes.ok) {
        const instituteData = await instituteRes.json();
        if (instituteData.success) {
          setInstitute(instituteData.data);
        }
      }

      // Fetch courses
      const contentRes = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/public/${instituteId}`);
      if (contentRes.ok) {
        const contentData = await contentRes.json();
        console.log('📦 All Courses - Fetched data:', contentData);
        if (contentData.success && contentData.data?.courses?.courses?.length > 0) {
          // Filter out disabled courses for public view and ensure all fields are present
          const enabledCourses = contentData.data.courses.courses
            .filter(c => c.enabled !== false)
            .map(c => ({
              ...c,
              price: Number(c.price) || 0,
              originalPrice: Number(c.originalPrice) || 0,
              discount: Number(c.discount) || 0
            }));
          console.log('✅ Enabled courses:', enabledCourses);
          setCourses(enabledCourses.length > 0 ? enabledCourses : defaultCourses);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = [...new Set(courses.map((c) => c.category).filter(Boolean))];
    return ['All', ...cats];
  }, [courses]);

  const phases = useMemo(() => {
    const coursesToFilter = activeCategory === 'All' 
      ? courses 
      : courses.filter((c) => c.category === activeCategory);
    const phaseList = [...new Set(coursesToFilter.map((c) => c.phase).filter(Boolean))];
    return ['All', ...phaseList];
  }, [courses, activeCategory]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const categoryMatch = activeCategory === 'All' || c.category === activeCategory;
      const phaseMatch = activePhase === 'All' || c.phase === activePhase;
      const languageMatch = activeLanguage === 'All Languages' || c.language === activeLanguage;
      return categoryMatch && phaseMatch && languageMatch;
    });
  }, [courses, activeCategory, activePhase, activeLanguage]);

  const handleBuy = (courseId) => {
    navigate(`/institutes/${instituteId}/checkout/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DynamicInstituteNavbar institute={institute} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f0f5ff] via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link to={`/institutes/${instituteId}`} className="text-primary hover:underline text-sm">
              ← Back to {institute?.businessName || 'Institute'}
            </Link>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Study Online</p>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                {formatTitle(`All Courses by ${institute?.businessName || 'Institute'}`)}
              </h1>
              <p className="text-gray-600 mt-2">{filteredCourses.length} courses available</p>
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 border text-primary border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2 hover:border-primary transition bg-white"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
              >
                {activeLanguage}
                <span>▾</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-44 z-10 right-0">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLanguage(lang);
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeLanguage === lang ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActivePhase('All');
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Phase Filters */}
          {phases.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {phases.map((phase) => (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    activePhase === phase
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          )}

          {/* Courses Grid */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'}
                    alt={course.title}
                    className="h-44 w-full object-cover"
                  />
                  {course.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase text-gray-500 font-semibold">{course.phase || course.category}</p>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-gray-900">
                      ₹{Number(course.price || 0).toLocaleString('en-IN')}
                    </span>
                    {course.originalPrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{Number(course.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleBuy(course.id)}
                    className="w-full border border-primary text-primary font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-white transition"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No courses found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      <DynamicInstituteFooter institute={institute} />
    </div>
  );
};

export default DynamicInstituteAllCourses;

