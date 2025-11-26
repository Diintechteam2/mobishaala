import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const CheckoutEditor = () => {
  const { instituteId, courseId } = useParams();
  const institute = useMemo(() => JSON.parse(localStorage.getItem('currentInstitute') || '{}'), []);

  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  // Demo form state for preview
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notes: '',
    mode: 'Online'
  });

  useEffect(() => {
    fetchData();
  }, [instituteId, courseId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🛒 Checkout - Fetched data:', data);
        if (data.success && data.data) {
          const courses = (data.data.courses?.courses || []).map(c => ({
            ...c,
            price: Number(c.price) || 0,
            originalPrice: Number(c.originalPrice) || 0,
            discount: Number(c.discount) || 0
          }));
          setAllCourses(courses);
          const foundCourse = courses.find((c) => c.id === courseId);
          console.log('🎯 Found course:', foundCourse);
          
          if (foundCourse) {
            setCourse(foundCourse);
          } else {
            setCourse({
              id: courseId,
              title: 'UPSC IAS Live GS P2I Foundation 2026 Fast Track',
              description: 'Batch just started • Hybrid + recordings • Daily answer reviews',
              category: 'UPSC',
              phase: 'GS P2I - 2026',
              price: 21999,
              originalPrice: 70000,
              discount: 69,
              image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop'
            });
          }
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setCourse({
        id: courseId,
        title: 'UPSC IAS Live GS P2I Foundation 2026 Fast Track',
        description: 'Batch just started • Hybrid + recordings • Daily answer reviews',
        category: 'UPSC',
        phase: 'GS P2I - 2026',
        price: 21999,
        originalPrice: 70000,
        discount: 69,
        image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (field, value) => {
    setCourse((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'price' || field === 'originalPrice') {
        const price = field === 'price' ? Number(value) : Number(prev.price);
        const originalPrice = field === 'originalPrice' ? Number(value) : Number(prev.originalPrice);
        if (originalPrice > 0 && price > 0) {
          updated.discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        }
      }
      return updated;
    });
  };

  const handleSaveCourse = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('authToken');
      
      // Ensure numeric fields are properly typed
      const courseToSave = {
        ...course,
        price: Number(course.price) || 0,
        originalPrice: Number(course.originalPrice) || 0,
        discount: Number(course.discount) || 0
      };
      
      // Update the course in allCourses array
      const updatedCourses = allCourses.map(c => 
        c.id === courseToSave.id ? courseToSave : c
      ).map(c => ({
        ...c,
        price: Number(c.price) || 0,
        originalPrice: Number(c.originalPrice) || 0,
        discount: Number(c.discount) || 0
      }));
      
      // If course doesn't exist in array, add it
      if (!allCourses.find(c => c.id === courseToSave.id)) {
        updatedCourses.push(courseToSave);
      }

      const payload = {
        courses: { 
          courses: updatedCourses 
        }
      };
      
      console.log('💾 Checkout - Saving course:', payload);

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('✅ Checkout - Save response:', data);
      
      if (data.success) {
        setSuccess('Course details saved successfully!');
        setAllCourses(updatedCourses);
        setCourse(courseToSave);
        setIsEditingCourse(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      console.error('Checkout save error:', err);
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading Checkout Preview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link to={`/institute-dashboard/${instituteId}/courses`} className="text-indigo-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Courses Editor
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Checkout Page Preview</h1>
          <p className="text-sm text-gray-500">Preview and edit how students will see the checkout page</p>
        </div>
        <button
          onClick={() => setIsEditingCourse(!isEditingCourse)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {isEditingCourse ? 'Close Editor' : '✏️ Edit Course Details'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>
      )}

      {/* Edit Course Panel */}
      {isEditingCourse && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Course Details</h3>
          <p className="text-sm text-gray-500 mb-4">Changes here will update how this course appears on checkout page</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input
                type="text"
                value={course?.title || ''}
                onChange={(e) => handleCourseChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={course?.description || ''}
                onChange={(e) => handleCourseChange('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={course?.category || ''}
                onChange={(e) => handleCourseChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <input
                type="text"
                value={course?.phase || ''}
                onChange={(e) => handleCourseChange('phase', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={course?.price || 0}
                onChange={(e) => handleCourseChange('price', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={course?.originalPrice || 0}
                onChange={(e) => handleCourseChange('originalPrice', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            {course?.discount > 0 && (
              <div className="md:col-span-2">
                <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded">
                  {course.discount}% OFF (Auto-calculated)
                </span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setIsEditingCourse(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCourse}
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Checkout Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-primary p-4">
          <p className="text-white text-center text-sm font-medium">🎉 Live Checkout Preview - This is how students will see the checkout page</p>
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left Side - Course Summary */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 relative">
                {/* Edit indicator */}
                {!isEditingCourse && (
                  <button
                    onClick={() => setIsEditingCourse(true)}
                    className="absolute top-4 right-4 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-200 transition"
                  >
                    ✏️ Edit
                  </button>
                )}
                
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Checkout</p>
                <h2 className="text-2xl font-black text-gray-900 mt-2 pr-16">{course?.title || 'Course Title'}</h2>
                <img 
                  src={course?.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'} 
                  alt={course?.title} 
                  className="w-full h-48 object-cover rounded-2xl mt-4" 
                />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course?.category || 'Category'}</span>
                    {course?.phase && (
                      <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">
                        {course.phase}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-gray-900">
                      ₹{Number(course?.price || 0).toLocaleString('en-IN')}
                    </span>
                    {course?.originalPrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{Number(course.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                    {course?.discount > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
                        {course.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{course?.description}</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 pt-3 border-t border-gray-200">
                    <li>Mobishaala secure payment gateway</li>
                    <li>Instant course activation after payment</li>
                    <li>EMI & UPI options available</li>
                  </ul>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
                <p className="text-sm font-semibold uppercase text-primary">Enter details</p>
                <h3 className="text-xl font-black text-gray-900 mt-2">Reserve your seat</h3>
                <form className="mt-4 grid grid-cols-1 gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="+91"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">City / State</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="Delhi, Bihar..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Mode</label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option>Online</option>
                      <option>Offline</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Notes for mentor</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Share your attempt, timeline or doubts"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-primary text-white font-semibold py-3 rounded-xl shadow hover:bg-primary-dark transition"
                  >
                    Continue to Secure Payment
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    You will receive a payment gateway link powered by Mobishaala to complete the purchase.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutEditor;
