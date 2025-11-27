import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

// Default dummy courses for preview
const defaultCourses = [
  {
    id: 'course-1',
    title: 'UPSC IAS Live GS P2I Foundation 2026 Fast Track',
    description: 'Batch just started • Hybrid + recordings • Daily answer reviews',
    category: 'UPSC',
    phase: 'GS P2I - 2026',
    language: 'Hindi',
    mode: 'Hybrid',
    price: 21999,
    originalPrice: 70000,
    discount: 69,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-2',
    title: 'UPSC IAS Live GS P2I Foundation 2027 Long Term',
    description: 'Mentor support + AI tracker • 900+ hours',
    category: 'UPSC',
    phase: 'GS P2I - 2027',
    language: 'English',
    mode: 'Online',
    price: 25999,
    originalPrice: 78000,
    discount: 63,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-3',
    title: 'UPSC Optional PSIR Mastery Program',
    description: '50 live sessions + 12 test discussions',
    category: 'UPSC Optional',
    phase: 'Optional - PSIR',
    language: 'English',
    mode: 'Online',
    price: 18999,
    originalPrice: 32000,
    discount: 41,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop'
  },
  {
    id: 'course-4',
    title: 'State PCS + UPSC Combo (UPPCS / MPPSC)',
    description: 'State capsules + interview bootcamp',
    category: 'State PCS',
    phase: 'GS P2I - State',
    language: 'Hindi',
    mode: 'Offline',
    price: 32999,
    originalPrice: 58000,
    discount: 45,
    enabled: true,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop'
  }
];

const defaultTitle = 'Explore our most Popular Courses';
const defaultSubtitle = 'Study Online';

const languageOptions = ['Hindi', 'English', 'Bilingual'];
const modeOptions = ['Online', 'Offline', 'Hybrid', 'Books'];

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

const CoursesEditor = () => {
  const { instituteId } = useParams();
  const institute = useMemo(() => JSON.parse(localStorage.getItem('currentInstitute') || '{}'), []);

  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    courses: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePhase, setActivePhase] = useState('All');
  const [uploadingImage, setUploadingImage] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null); // Course being edited
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    phase: '',
    language: 'Hindi',
    mode: 'Online',
    price: 0,
    originalPrice: 0,
    discount: 0,
    enabled: true,
    image: ''
  });

  useEffect(() => {
    fetchContent();
  }, [instituteId]);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to admin dashboard first');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Fetched courses data:', data);
      if (data.success && data.data) {
        const coursesData = data.data.courses || {};
        const courses = (coursesData.courses || []).map(c => ({
          ...c,
          price: Number(c.price) || 0,
          originalPrice: Number(c.originalPrice) || 0,
          discount: Number(c.discount) || 0,
          enabled: c.enabled !== false,
          mode: c.mode || 'Online',
          language: c.language === 'All Languages' ? 'Bilingual' : (c.language || 'Hindi')
        }));
        console.log('📋 Processed courses:', courses);
        setContent({
          title: coursesData.title || '',
          subtitle: coursesData.subtitle || '',
          courses: courses
        });
      }
    } catch (err) {
      console.error('Error fetching content:', err);
      setError(err.message || 'Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  // Reset new course form
  const resetNewCourseForm = () => {
    setNewCourse({
      title: '',
      description: '',
      category: '',
      phase: '',
      language: 'Hindi',
      mode: 'Online',
      price: 0,
      originalPrice: 0,
      discount: 0,
      enabled: true,
      image: ''
    });
  };

  // Add new course
  const handleAddCourse = () => {
    if (!newCourse.title) {
      setError('Please enter course title');
      return;
    }
    
    console.log('➕ Adding new course - Raw data:', newCourse);
    
    const courseToAdd = {
      ...newCourse,
      id: Date.now().toString(),
      price: Number(newCourse.price) || 0,
      originalPrice: Number(newCourse.originalPrice) || 0,
      discount: newCourse.originalPrice > 0 && newCourse.price > 0 
        ? Math.round(((newCourse.originalPrice - newCourse.price) / newCourse.originalPrice) * 100)
        : 0
    };
    
    console.log('✅ Course to add:', courseToAdd);
    
    setContent((prev) => ({
      ...prev,
      courses: [...prev.courses, courseToAdd]
    }));
    
    resetNewCourseForm();
    setShowAddForm(false);
    setSuccess('Course added! Don\'t forget to save changes.');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Update existing course
  const updateCourse = (courseId, field, value) => {
    console.log(`🔄 Updating course ${courseId} - ${field}:`, value);
    setContent((prev) => ({
      ...prev,
      courses: prev.courses.map((course) => {
        if (course.id !== courseId) return course;
        const updated = { ...course, [field]: value };
        if (field === 'price' || field === 'originalPrice') {
          const price = field === 'price' ? Number(value) : Number(course.price);
          const originalPrice = field === 'originalPrice' ? Number(value) : Number(course.originalPrice);
          console.log(`💰 Calculating discount - Price: ${price}, Original: ${originalPrice}`);
          if (originalPrice > 0 && price > 0) {
            updated.discount = Math.round(((originalPrice - price) / originalPrice) * 100);
            console.log(`✅ Discount calculated: ${updated.discount}%`);
          }
        }
        console.log('📝 Updated course:', updated);
        return updated;
      })
    }));
  };

  // Delete course
  const deleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setContent((prev) => ({
        ...prev,
        courses: prev.courses.filter((c) => c.id !== courseId)
      }));
      setEditingCourse(null);
      setSuccess('Course deleted! Don\'t forget to save changes.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Toggle course enabled/disabled
  const toggleCourseStatus = (courseId) => {
    setContent((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => 
        c.id === courseId ? { ...c, enabled: !c.enabled } : c
      )
    }));
  };

  // Handle course image upload
  const handleImageUpload = async (courseId, file) => {
    if (!file) return;
    
    setUploadingImage(courseId);
    
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('courseImage', file);

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/upload-course-image/${instituteId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned an invalid response. Please make sure the backend server is running.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        updateCourse(courseId, 'image', data.imageUrl);
        setSuccess('Image uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setError(err.message || 'Failed to upload image.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUploadingImage(null);
    }
  };

  // Handle new course image upload
  const handleNewCourseImageUpload = async (file) => {
    if (!file) return;
    
    setUploadingImage('new');
    
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('courseImage', file);

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/upload-course-image/${instituteId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend server not running');
      }

      const data = await response.json();
      if (data.success) {
        setNewCourse(prev => ({ ...prev, image: data.imageUrl }));
        setSuccess('Image uploaded!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to upload image');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUploadingImage(null);
    }
  };

  // Save all changes
  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('authToken');
      
      // Ensure all numeric fields are properly typed
      const coursesToSave = content.courses.map(c => ({
        ...c,
        price: Number(c.price) || 0,
        originalPrice: Number(c.originalPrice) || 0,
        discount: Number(c.discount) || 0,
        enabled: c.enabled !== false
      }));
      
      const payload = {
        courses: {
          title: content.title,
          subtitle: content.subtitle,
          courses: coursesToSave
        }
      };
      
      console.log('➡️ API CALL: PUT https://mobishaala-backend-zcxm.onrender.com/api/institute-content/' + instituteId);
      console.log('📤 Request payload:', payload);
      
      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/${instituteId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('⬅️ API RESPONSE:', data);
      
      if (data.success) {
        setSuccess('All changes saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
        // Refresh data from server
        fetchContent();
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Preview data
  const hasCustomCourses = content.courses?.length > 0;
  const previewData = {
    title: content.title || defaultTitle,
    subtitle: content.subtitle || defaultSubtitle,
    courses: hasCustomCourses ? content.courses : defaultCourses
  };

  // Filters
  const categories = useMemo(() => {
    const cats = [...new Set(previewData.courses.map((c) => c.category).filter(Boolean))];
    return ['All', ...cats];
  }, [previewData.courses]);

  const phases = useMemo(() => {
    const coursesToFilter = activeCategory === 'All' 
      ? previewData.courses 
      : previewData.courses.filter((c) => c.category === activeCategory);
    const phaseList = [...new Set(coursesToFilter.map((c) => c.phase).filter(Boolean))];
    return ['All', ...phaseList];
  }, [previewData.courses, activeCategory]);

  const filteredCourses = useMemo(() => {
    return previewData.courses.filter((c) => {
      const categoryMatch = activeCategory === 'All' || c.category === activeCategory;
      const phaseMatch = activePhase === 'All' || c.phase === activePhase;
      return categoryMatch && phaseMatch;
    });
  }, [previewData.courses, activeCategory, activePhase]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-2 text-gray-600">Loading Courses Section...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses Section</h1>
          <p className="text-sm text-gray-500">
            {hasCustomCourses ? `${content.courses.length} courses (${content.courses.filter(c => c.enabled).length} enabled)` : 'Showing default courses'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            + Add New Course
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>
      )}

      {/* Section Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Section Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Section Title</label>
            <input
              type="text"
              name="title"
              value={content.title}
              onChange={handleSectionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., Explore our most Popular Courses"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Section Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={content.subtitle}
              onChange={handleSectionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., Study Online"
            />
          </div>
        </div>
      </div>

      {/* Add New Course Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Course</h3>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  resetNewCourseForm();
                }} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., UPSC IAS Live GS P2I Foundation 2026"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Batch just started • Hybrid + recordings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., UPSC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                <input
                  type="text"
                  value={newCourse.phase}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, phase: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., GS P2I - 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={newCourse.language}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {languageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Course</label>
                <select
                  value={newCourse.mode}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, mode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {modeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleNewCourseImageUpload(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                  disabled={uploadingImage === 'new'}
                />
                {uploadingImage === 'new' && <p className="text-xs text-indigo-600 mt-1">Uploading...</p>}
                {newCourse.image && <img src={newCourse.image} alt="Preview" className="h-16 w-24 object-cover rounded mt-2" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => {
                    const price = Number(e.target.value);
                    const originalPrice = Number(newCourse.originalPrice);
                    const discount = originalPrice > 0 && price > 0 
                      ? Math.round(((originalPrice - price) / originalPrice) * 100)
                      : 0;
                    setNewCourse(prev => ({ ...prev, price, discount }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="21999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={newCourse.originalPrice}
                  onChange={(e) => {
                    const originalPrice = Number(e.target.value);
                    const price = Number(newCourse.price);
                    const discount = originalPrice > 0 && price > 0 
                      ? Math.round(((originalPrice - price) / originalPrice) * 100)
                      : 0;
                    setNewCourse(prev => ({ ...prev, originalPrice, discount }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="70000"
                />
              </div>
              {newCourse.discount > 0 && (
                <div className="md:col-span-2">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                    {newCourse.discount}% OFF (Auto-calculated)
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetNewCourseForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Course</h3>
              <button onClick={() => setEditingCourse(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            
            {(() => {
              const course = content.courses.find(c => c.id === editingCourse);
              if (!course) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={course.description}
                      onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={course.category}
                      onChange={(e) => updateCourse(course.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                    <input
                      type="text"
                      value={course.phase}
                      onChange={(e) => updateCourse(course.id, 'phase', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={course.language}
                      onChange={(e) => updateCourse(course.id, 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {languageOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Course</label>
                    <select
                      value={course.mode || 'Online'}
                      onChange={(e) => updateCourse(course.id, 'mode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {modeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(course.id, e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                      disabled={uploadingImage === course.id}
                    />
                    {uploadingImage === course.id && <p className="text-xs text-indigo-600 mt-1">Uploading...</p>}
                    {course.image && <img src={course.image} alt="Preview" className="h-16 w-24 object-cover rounded mt-2" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={course.price}
                      onChange={(e) => updateCourse(course.id, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={course.originalPrice}
                      onChange={(e) => updateCourse(course.id, 'originalPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  {course.discount > 0 && (
                    <div className="md:col-span-2">
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                        {course.discount}% OFF (Auto-calculated)
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => deleteCourse(editingCourse)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Delete Course
              </button>
              <button
                onClick={() => setEditingCourse(null)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Done Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
          <span className="text-sm text-gray-500">Click on course card to edit</span>
        </div>
        
        <section className="py-8 bg-white rounded-2xl border border-gray-100">
          <div className="max-w-full mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">{previewData.subtitle}</p>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">{formatTitle(previewData.title)}</h2>
              </div>
            </div>

            {/* Category Filters */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setActivePhase('All'); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      activeCategory === cat
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Phase Filters */}
            {phases.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
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
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition relative ${
                    course.enabled === false ? 'border-red-300' : 'border-gray-200 hover:shadow-lg'
                  }`}
                >
                  {/* Image with Admin Actions Overlay */}
                  <div className="relative group">
                    <img
                      src={course.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800'}
                      alt={course.title}
                      className={`h-32 w-full object-cover ${course.enabled === false ? 'opacity-50' : ''}`}
                    />
                    {course.discount > 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {course.discount}% OFF
                      </span>
                    )}
                    
                    {/* Disabled Badge */}
                    {course.enabled === false && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        DISABLED
                      </div>
                    )}

                    {/* Admin Actions - Only on image hover */}
                    {hasCustomCourses && (
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingCourse(course.id)}
                          className="px-4 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-semibold hover:bg-gray-100 w-24"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => toggleCourseStatus(course.id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-semibold w-24 ${
                            course.enabled === false 
                              ? 'bg-green-500 text-white hover:bg-green-600' 
                              : 'bg-yellow-500 text-white hover:bg-yellow-600'
                          }`}
                        >
                          {course.enabled === false ? '✓ Enable' : '⏸ Disable'}
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 w-24"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Content - Always accessible */}
                  <div className={`p-4 space-y-2 ${course.enabled === false ? 'opacity-50' : ''}`}>
                    <p className="text-xs uppercase text-gray-500 font-semibold">{course.phase || course.category}</p>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{course.title || 'Course Title'}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{course.description || 'Course description...'}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-gray-900">
                        ₹{Number(course.price || 0).toLocaleString('en-IN')}
                      </span>
                      {course.originalPrice > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{Number(course.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/institute-dashboard/${instituteId}/checkout/${course.id}`}
                      className="block w-full border border-primary text-primary font-semibold py-2 rounded-xl text-sm text-center hover:bg-primary hover:text-white transition"
                    >
                      BUY NOW → Preview Checkout
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
              <Link 
                to={`/institute-dashboard/${instituteId}/all-courses`}
                className="flex items-center gap-2 hover:underline"
              >
                View all Courses →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursesEditor;
