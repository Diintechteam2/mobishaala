import React, { useMemo, useState } from 'react';
import DestinationIASNavbar from './Navbar';
import DestinationIASFooter from './Footer';
import { destinationIASCourses } from './coursesData';
import { useNavigate } from 'react-router-dom';

const categories = ['UPSC', 'UPSC Optional', 'UPSC English', 'State PCS'];
const languages = ['All Languages', 'Hindi', 'English'];

const DestinationIASAllCourses = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('UPSC');
  const [language, setLanguage] = useState('All Languages');
  const [search, setSearch] = useState('');

  const filteredCourses = useMemo(() => {
    return destinationIASCourses.filter((course) => {
      const categoryMatch = course.category === category;
      const languageMatch = language === 'All Languages' || course.language === language;
      const searchMatch = course.title.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && languageMatch && searchMatch;
    });
  }, [category, language, search]);

  const handleBuy = (courseId) => {
    navigate(`/institutes/destination-ias/checkout/${courseId}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <DestinationIASNavbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">All Courses</p>
          <h1 className="text-4xl font-black text-gray-900 mt-3">Browse every Destination IAS program</h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            Filter by UPSC cohorts, optional subjects, languages or state PCS. Every course is powered by Mobishaala infrastructure with live + recorded access.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                category === cat ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center mb-8">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search course name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] border border-gray-200 rounded-xl px-4 py-2 text-sm"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col bg-white">
              <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <span>{course.category}</span>
                  <span>•</span>
                  <span>{course.phase}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600 flex-1">{course.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">{course.discount}% OFF</span>
                </div>
                <button
                  onClick={() => handleBuy(course.id)}
                  className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No courses match your filters yet.</div>
        )}
      </main>
      <DestinationIASFooter />
    </div>
  );
};

export default DestinationIASAllCourses;

