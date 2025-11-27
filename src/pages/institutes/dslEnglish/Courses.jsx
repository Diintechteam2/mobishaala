import React, { useMemo, useState } from 'react';
import { dslEnglishCourses } from './coursesData';
import { Link, useNavigate } from 'react-router-dom';

const categories = ['Spoken English', 'UPSC Interview', 'State PCS Interview', 'Corporate'];
const baseLanguageOptions = ['Hindi', 'English', 'Bilingual'];
const baseModeOptions = ['Online', 'Offline', 'Hybrid', 'Books'];

const DslEnglishCourses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Spoken English');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('All Modes');
  const [modeMenuOpen, setModeMenuOpen] = useState(false);

  const languages = useMemo(() => {
    const set = new Set(baseLanguageOptions);
    dslEnglishCourses.forEach((course) => {
      const normalizedLanguage = course.language === 'All Languages' ? 'Bilingual' : (course.language || 'Hindi');
      set.add(normalizedLanguage);
    });
    return ['All Languages', ...Array.from(set)];
  }, []);

  const modeOptions = useMemo(() => {
    const set = new Set(baseModeOptions);
    dslEnglishCourses.forEach((course) => set.add(course.mode || 'Online'));
    return ['All Modes', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return dslEnglishCourses.filter((course) => {
      const normalizedLanguage = course.language === 'All Languages' ? 'Bilingual' : (course.language || 'Hindi');
      const courseMode = course.mode || 'Online';
      const categoryMatch = course.category === activeCategory;
      const languageMatch = activeLanguage === 'All Languages' || normalizedLanguage === activeLanguage;
      const modeMatch = activeMode === 'All Modes' || courseMode === activeMode;
      return categoryMatch && languageMatch && modeMatch;
    });
  }, [activeCategory, activeLanguage, activeMode]);

  const handleBuy = (courseId) => {
    navigate(`/institutes/dsl-english/checkout/${courseId}`);
  };

  const handleViewDetails = (courseId) => {
    navigate(`/institutes/dsl-english/course/${courseId}`);
  };

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Study Online</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Popular <span className="text-primary">Communication Cohorts</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
              >
                {activeLanguage} <span>▾</span>
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-44 z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLanguage(lang);
                        setLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${activeLanguage === lang ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2"
                onClick={() => setModeMenuOpen((prev) => !prev)}
              >
                {activeMode} <span>▾</span>
              </button>
              {modeMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-44 z-10">
                  {modeOptions.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setActiveMode(mode);
                        setModeMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${activeMode === mode ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                activeCategory === category ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {filtered.slice(0, 4).map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
                <img src={course.image} alt={course.title} className="h-44 w-full object-cover" />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {course.discount}% OFF
                </span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs uppercase text-gray-500 font-semibold">{course.phase}</p>
                <h3 className="text-base font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {course.language === 'All Languages' ? 'Bilingual' : course.language}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {course.mode || 'Online'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleViewDetails(course.id)}
                    className="border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition"
                  >
                    VIEW DETAILS
                  </button>
                  <button
                    onClick={() => handleBuy(course.id)}
                    className="border border-primary text-primary font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-white transition"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between text-sm font-semibold text-primary">
          <Link to="/institutes/dsl-english/courses" className="flex items-center gap-2">
            View all Courses <span>→</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500">←</button>
            <button className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-500">→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DslEnglishCourses;

