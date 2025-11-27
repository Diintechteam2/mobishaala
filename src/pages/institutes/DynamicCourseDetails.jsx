import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DynamicInstituteNavbar from './DynamicInstituteNavbar';
import DynamicInstituteFooter from './DynamicInstituteFooter';
import { destinationIASCourses } from './destinationIAS/coursesData';
import { dslEnglishCourses } from './dslEnglish/coursesData';
import { examDrishtiCourses } from './examDrishti/coursesData';
import { shashiKarnaCourses } from './shashiKarna/coursesData';

const staticCourseCollections = {
  'destination-ias': destinationIASCourses,
  'dsl-english': dslEnglishCourses,
  examdrishti: examDrishtiCourses,
  'shashi-karna': shashiKarnaCourses,
};

const normalizeCourse = (course) => ({
  ...course,
  price: Number(course.price) || 0,
  originalPrice: Number(course.originalPrice) || 0,
  discount: Number(course.discount) || 0,
  mode: course.mode || 'Online',
  language: course.language === 'All Languages' ? 'Bilingual' : (course.language || 'Hindi'),
});

const formatInstituteName = (slug = '') =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const DynamicCourseDetails = () => {
  const { instituteId, courseId } = useParams();
  const navigate = useNavigate();
  const [institute, setInstitute] = useState(null);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instituteId, courseId]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const [instituteRes, contentRes] = await Promise.allSettled([
        fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/public/${instituteId}`),
        fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/public/${instituteId}`),
      ]);

      if (instituteRes.status === 'fulfilled' && instituteRes.value.ok) {
        const instituteData = await instituteRes.value.json();
        if (instituteData.success) {
          setInstitute(instituteData.data);
        }
      }

      let normalizedCourses = [];
      if (contentRes.status === 'fulfilled' && contentRes.value.ok) {
        const contentData = await contentRes.value.json();
        if (contentData.success && contentData.data?.courses?.courses?.length > 0) {
          normalizedCourses = contentData.data.courses.courses
            .filter((item) => item.enabled !== false)
            .map(normalizeCourse);
        }
      }

      if (!normalizedCourses.length && staticCourseCollections[instituteId]) {
          normalizedCourses = staticCourseCollections[instituteId].map(normalizeCourse);
          if (!institute) {
            setInstitute({ businessName: formatInstituteName(instituteId) });
          }
      }

      if (!normalizedCourses.length) {
        setError('Course not found.');
        setCourse(null);
        setCourses([]);
      } else {
        setCourses(normalizedCourses);
        const foundCourse = normalizedCourses.find((item) => item.id === courseId) || normalizedCourses[0];
        setCourse(foundCourse);
      }
    } catch (err) {
      console.error('Course details error:', err);
      setError('Unable to load course details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const relatedCourses = useMemo(() => {
    if (!course) return [];
    return courses
      .filter((item) => item.id !== course.id && (course.category ? item.category === course.category : true))
      .slice(0, 4);
  }, [course, courses]);

  const handleBuy = () => {
    navigate(`/institutes/${instituteId}/checkout/${courseId}`);
  };

  const handleRelatedView = (targetCourseId) => {
    navigate(`/institutes/${instituteId}/course/${targetCourseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-2xl font-bold text-gray-900">{error || 'Course not available'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:border-primary hover:text-primary transition"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DynamicInstituteNavbar institute={institute} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#f0f5ff] via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm">
            <Link to={`/institutes/${instituteId}`} className="text-primary hover:underline">
              {institute?.businessName || formatInstituteName(instituteId)}
            </Link>{' '}
            /{' '}
            <Link to={`/institutes/${instituteId}/courses`} className="text-primary hover:underline">
              Courses
            </Link>{' '}
            / <span className="text-gray-500">{course.title}</span>
          </nav>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
              <img
                src={course.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'}
                alt={course.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {course.phase || course.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {course.language}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {course.mode}
                  </span>
                </div>
                <h1 className="text-3xl font-black text-gray-900">{course.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black text-gray-900">
                    ₹{Number(course.price).toLocaleString('en-IN')}
                  </span>
                  {course.originalPrice > 0 && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{Number(course.originalPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                  {course.discount > 0 && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {course.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleBuy}
                    className="rounded-2xl bg-primary text-white font-semibold py-3 px-6 hover:bg-primary-dark transition shadow-lg"
                  >
                    Enroll / Buy Now
                  </button>
                  <button
                    onClick={() => navigate(`/institutes/${instituteId}`)}
                    className="rounded-2xl border border-gray-200 text-gray-700 font-semibold py-3 px-6 hover:border-primary hover:text-primary transition"
                  >
                    View institute
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Course Snapshot</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Category</span>
                  <span className="text-gray-900">{course.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Phase</span>
                  <span className="text-gray-900">{course.phase || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Language</span>
                  <span className="text-gray-900">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Mode</span>
                  <span className="text-gray-900">{course.mode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">More options</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">Related Courses</h2>
            </div>
            <Link
              to={`/institutes/${instituteId}/courses`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Browse all courses →
            </Link>
          </div>

          {relatedCourses.length === 0 ? (
            <div className="text-center text-gray-500 border border-dashed border-gray-200 rounded-3xl py-12">
              <p>More courses coming soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {relatedCourses.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5 space-y-3">
                    <p className="text-xs uppercase text-gray-500 font-semibold">{item.phase || item.category}</p>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                        {item.language}
                      </span>
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                        {item.mode || 'Online'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-gray-900">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleRelatedView(item.id)}
                        className="border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition"
                      >
                        VIEW DETAILS
                      </button>
                      <button
                        onClick={() => navigate(`/institutes/${instituteId}/checkout/${item.id}`)}
                        className="border border-primary text-primary font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-white transition"
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <DynamicInstituteFooter institute={institute} />
    </div>
  );
};

export default DynamicCourseDetails;


