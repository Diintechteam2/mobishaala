import React, { useMemo, useState } from 'react';
import { destinationIASCourses } from './coursesData';
import { Link, useNavigate } from 'react-router-dom';

const categories = ['UPSC', 'UPSC Optional', 'UPSC English', 'State PCS'];
const languages = ['All Languages', 'Hindi', 'English'];

const DestinationIASCourses = () => {
  const [activeCategory, setActiveCategory] = useState('UPSC');
  const [activeLanguage, setActiveLanguage] = useState('All Languages');
  const [activePhase, setActivePhase] = useState('All');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const navigate = useNavigate();
  const filteredCourses = useMemo(() => {
    return destinationIASCourses.filter((course) => {
      const categoryMatch = course.category === activeCategory;
      const languageMatch = activeLanguage === 'All Languages' || course.language === activeLanguage;
      const phaseMatch = activePhase === 'All' || course.phase === activePhase;
      return categoryMatch && languageMatch && phaseMatch;
    });
  }, [activeCategory, activeLanguage, activePhase]);

  const phaseFilters = useMemo(() => {
    const phases = destinationIASCourses
      .filter((course) => course.category === activeCategory)
      .map((course) => course.phase);
    return ['All', ...Array.from(new Set(phases))];
  }, [activeCategory]);

  const handleBuy = (courseId) => {
    navigate(`/institutes/destination-ias/checkout/${courseId}`);
  };

  return (
    <section className="py-16 bg-white" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">Study Online</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Explore our most <span className="text-primary">Popular Courses</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2"
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
                      className={`block w-full text-left px-4 py-2 text-sm ${activeLanguage === lang ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {lang}
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
              onClick={() => { setActiveCategory(category); setActivePhase('All'); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                activeCategory === category ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {phaseFilters.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                activePhase === phase ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {filteredCourses.slice(0, 4).map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="relative">
                <img src={course.image} alt={course.title} className="h-44 w-full object-cover" />
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {course.discount}% OFF
                </span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs uppercase text-gray-500 font-semibold">{course.phase}</p>
                <h3 className="text-base font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
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

        <div className="mt-10 flex items-center justify-between text-sm font-semibold text-primary">
          <Link to="/institutes/destination-ias/courses" className="flex items-center gap-2">
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

export default DestinationIASCourses;

