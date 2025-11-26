import React, { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

const DynamicInstituteCourses = ({ institute, content }) => {
  const navigate = useNavigate();
  const coursesData = content?.courses || {};
  
  // Use custom courses if available, otherwise use defaults
  // Filter out disabled courses for public view
  const allCourses = coursesData.courses?.length > 0 
    ? coursesData.courses.map(c => ({
        ...c,
        price: Number(c.price) || 0,
        originalPrice: Number(c.originalPrice) || 0,
        discount: Number(c.discount) || 0,
        enabled: c.enabled !== false
      }))
    : defaultCourses;
  const courses = allCourses.filter(c => c.enabled !== false);
  const title = coursesData.title || 'Explore our most Popular Courses';
  const subtitle = coursesData.subtitle || 'Study Online';
  
  console.log('🎓 DynamicInstituteCourses - Courses:', courses);

  const [activeCategory, setActiveCategory] = useState('All');
  const [activePhase, setActivePhase] = useState('All');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('All Languages');

  const languages = ['All Languages', 'Hindi', 'English'];

  const categories = useMemo(() => {
    const cats = [...new Set(courses.map((c) => c.category).filter(Boolean))];
    return ['All', ...cats];
  }, [courses]);

  // Get phases based on active category
  const phases = useMemo(() => {
    const coursesToFilter = activeCategory === 'All' 
      ? courses 
      : courses.filter((c) => c.category === activeCategory);
    const phaseList = [...new Set(coursesToFilter.map((c) => c.phase).filter(Boolean))];
    return ['All', ...phaseList];
  }, [courses, activeCategory]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const categoryMatch = activeCategory === 'All' || course.category === activeCategory;
      const languageMatch = activeLanguage === 'All Languages' || course.language === activeLanguage;
      const phaseMatch = activePhase === 'All' || course.phase === activePhase;
      return categoryMatch && languageMatch && phaseMatch;
    });
  }, [courses, activeCategory, activeLanguage, activePhase]);

  const handleBuy = (courseId) => {
    // Navigate to checkout page
    if (institute?.instituteId) {
      navigate(`/institutes/${institute.instituteId}/checkout/${courseId}`);
    } else {
      alert('Course enrollment coming soon!');
    }
  };

  return (
    <section className="py-16 bg-white" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{formatTitle(title)}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="px-4 py-2 border text-primary border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2 hover:border-primary transition"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
              >
                {activeLanguage}
                <span>▾</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-44 z-10">
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
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setActivePhase('All');
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                activeCategory === category
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Phase Filters */}
        {phases.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-6">
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
          {filteredCourses.slice(0, 4).map((course) => (
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

        {/* Footer Navigation */}
        <div className="mt-10 flex items-center justify-between text-sm font-semibold text-primary">
          <Link 
            to={`/institutes/${institute?.instituteId}/courses`}
            className="flex items-center gap-2 hover:underline"
          >
            View all Courses <span>→</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">
              ←
            </button>
            <button className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicInstituteCourses;
