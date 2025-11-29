import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../../components/Hero';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const HeroSection = () => {
  const [settings, setSettings] = useState({
    slides: [
      {
        type: 'direct',
        tagline: "India's first AI-Enabled Education Network",
        description: "Mobishaala stands as a bridge between traditional teaching excellence and futuristic AI intelligence — enabling every educator to scale, every student to succeed, and every institute to thrive in the new digital era.",
        points: [
          "Orchestrate your institute's sales, marketing & software with AI-powered Mobishaala.",
          "Agentic AI End - to - End Support"
        ],
        image: '/mobishaalaheroimage-1.jpg',
        isActive: true
      },
      {
        type: 'institutions',
        tagline: "Empowering Institutions, Teachers & Students With Agentic AI",
        description: "AI that streamlines operations, boosts efficiency, and accelerates growth.",
        points: [
          "Automate administrative tasks and focus on what matters most.",
          "Data-driven insights to optimize performance and student outcomes."
        ],
        image: '/mobishaalaheroimage-1.jpg',
        isActive: true
      },
      {
        type: 'students',
        tagline: "Empowering Institutions, Teachers & Students With Agentic AI",
        description: "AI that personalizes learning and improves outcomes with guided support.",
        points: [
          "Personalized learning paths tailored to your pace and style.",
          "24/7 AI tutor support for instant help and guidance."
        ],
        image: '/mobishaalaheroimage-1.jpg',
        isActive: true
      },
      {
        type: 'teachers',
        tagline: "Empowering Institutions, Teachers & Students With Agentic AI",
        description: "AI that reduces workload and enhances teaching quality with smart tools.",
        points: [
          "Automated grading and assessment to save time.",
          "AI-powered content creation and lesson planning assistance."
        ],
        image: '/mobishaalaheroimage-1.jpg',
        isActive: true
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('direct');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState({});
  const [selectedWordIndices, setSelectedWordIndices] = useState([]);

  const slideTypes = [
    { id: 'direct', label: 'Direct', icon: '🏠' },
    { id: 'institutions', label: 'Institutions', icon: '🏫' },
    { id: 'students', label: 'Students', icon: '🎓' },
    { id: 'teachers', label: 'Teachers', icon: '👨‍🏫' }
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const response = await fetch(`${API_BASE}/api/hero-section-settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const formDataToSend = new FormData();
      
      // Add slides data in correct order
      const slideOrder = ['direct', 'institutions', 'students', 'teachers'];
      slideOrder.forEach((type, index) => {
        const slide = settings.slides.find(s => s.type === type);
        if (slide) {
          formDataToSend.append(`slides[${index}][type]`, slide.type);
          formDataToSend.append(`slides[${index}][tagline]`, slide.tagline);
          formDataToSend.append(`slides[${index}][description]`, slide.description);
          formDataToSend.append(`slides[${index}][isActive]`, slide.isActive.toString());
          
          // Add highlight words
          (slide.highlightWords || []).forEach((word, hIdx) => {
            if (word && word.trim()) {
              formDataToSend.append(`slides[${index}][highlightWords][${hIdx}]`, word);
            }
          });
          
          slide.points.forEach((point, pIdx) => {
            if (point && point.trim()) {
              formDataToSend.append(`slides[${index}][points][${pIdx}]`, point);
            }
          });
          
          // Add image if uploaded
          if (imageFiles[slide.type]) {
            formDataToSend.append(`slideImage_${index}`, imageFiles[slide.type]);
          }
        }
      });

      const response = await fetch(`${API_BASE}/api/hero-section-settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setError('');
        setImageFiles({});
        // Update settings with saved data immediately
        if (data.data) {
          setSettings({
            ...data.data,
            slides: data.data.slides || settings.slides
          });
        } else {
          // If no data in response, fetch fresh data
          await fetchSettings();
        }
        alert('Hero section settings saved successfully!');
      } else {
        setError(data.message || 'Failed to save settings');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Network error. Please try again.');
    }
  };

  const updateSlide = (type, field, value) => {
    setSettings(prev => {
      return {
        ...prev,
        slides: prev.slides.map(slide =>
          slide.type === type ? { ...slide, [field]: value } : slide
        )
      };
    });
  };

  const updatePoint = (type, index, value) => {
    setSettings(prev => {
      return {
        ...prev,
        slides: prev.slides.map(slide => {
          if (slide.type === type) {
            const newPoints = [...slide.points];
            newPoints[index] = value;
            return { ...slide, points: newPoints };
          }
          return slide;
        })
      };
    });
  };

  const toggleHighlightWord = (word) => {
    const highlightWords = currentSlide.highlightWords || [];
    const wordIndex = highlightWords.findIndex(hw => hw.toLowerCase() === word.toLowerCase());
    
    if (wordIndex >= 0) {
      // Remove if already highlighted
      const updated = highlightWords.filter((_, idx) => idx !== wordIndex);
      updateSlide(activeTab, 'highlightWords', updated);
    } else {
      // Add if not highlighted
      updateSlide(activeTab, 'highlightWords', [...highlightWords, word]);
    }
    setSelectedWordIndices([]);
  };

  const isWordHighlighted = (word) => {
    const highlightWords = currentSlide.highlightWords || [];
    return highlightWords.some(hw => {
      const hwLower = hw.toLowerCase();
      const wordLower = word.toLowerCase();
      return hwLower === wordLower || hwLower.includes(wordLower) || wordLower.includes(hwLower);
    });
  };

  const handleWordClick = (word, wordIndex, e) => {
    if (e.shiftKey && selectedWordIndices.length > 0) {
      // Shift+Click: Select range
      const start = Math.min(selectedWordIndices[0], wordIndex);
      const end = Math.max(selectedWordIndices[0], wordIndex);
      const tagline = currentSlide.tagline || '';
      const words = tagline.split(/\s+/).filter(w => w.trim());
      const phrase = words.slice(start, end + 1).join(' ');
      if (phrase) {
        toggleHighlightWord(phrase);
      }
    } else if (e.ctrlKey || e.metaKey) {
      // Ctrl/Cmd+Click: Multi-select
      if (selectedWordIndices.includes(wordIndex)) {
        setSelectedWordIndices(selectedWordIndices.filter(idx => idx !== wordIndex));
      } else {
        setSelectedWordIndices([...selectedWordIndices, wordIndex]);
      }
    } else {
      // Normal click: Toggle single word
      setSelectedWordIndices([wordIndex]);
      toggleHighlightWord(word);
    }
  };


  const handleImageChange = (type, file) => {
    if (file) {
      setImageFiles(prev => ({ ...prev, [type]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSlide(type, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentSlide = useMemo(() => 
    settings.slides.find(s => s.type === activeTab) || settings.slides[0],
    [settings.slides, activeTab]
  );
  
  const activeSlides = useMemo(() => 
    settings.slides.filter(s => s.isActive),
    [settings.slides]
  );
  
  const previewIndexInActive = useMemo(() => 
    activeSlides.findIndex(s => s.type === activeTab),
    [activeSlides, activeTab]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading hero section settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden">
      {/* Preview Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 w-full max-w-full overflow-hidden">
        <div className="mb-2">
          <div className="text-xs uppercase text-gray-500">Preview</div>
          <div className="text-sm font-semibold text-gray-900">Hero Section</div>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white w-full">
          <div className="overflow-hidden max-h-[400px] overflow-y-auto w-full">
            <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
              <div style={{ width: '200%' }}>
                <Hero 
                  key={`hero-preview-${activeTab}`}
                  slides={activeSlides} 
                  previewMode={true}
                  previewSlideIndex={previewIndexInActive >= 0 ? previewIndexInActive : 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs uppercase text-gray-500">Hero Section</div>
            <div className="text-sm font-semibold text-gray-900">Manage Slides</div>
          </div>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Save All Changes
          </button>
        </div>

        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs break-words">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 overflow-x-auto">
          {slideTypes.map((type) => {
            const slide = settings.slides.find(s => s.type === type.id);
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-3 py-2 text-xs font-medium rounded-t-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === type.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
                {slide && !slide.isActive && (
                  <span className="text-xs opacity-75">(Inactive)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tagline *
            </label>
            <input
              type="text"
              value={currentSlide.tagline || ''}
              onChange={(e) => updateSlide(activeTab, 'tagline', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter tagline"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Highlight Words (Click on words below to highlight them)
            </label>
            <div className="text-xs text-gray-500 mb-2">
              Click on words from the tagline to highlight them. Selected words will be highlighted in the preview.
            </div>
            
            {/* Interactive Word Selection */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="mb-2">
                <div className="text-xs text-gray-600 font-medium">Tagline Words:</div>
              </div>
              <div className="flex flex-wrap gap-1.5 items-center">
                {(currentSlide.tagline || '').split(/\s+/).map((word, idx) => {
                  if (!word.trim()) return null;
                  
                  const isHighlighted = isWordHighlighted(word);
                  const isSelected = selectedWordIndices.includes(idx);
                  
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => handleWordClick(word, idx, e)}
                      className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                        isHighlighted
                          ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                          : isSelected
                          ? 'bg-blue-300 text-blue-900 border-2 border-blue-500 hover:bg-blue-400'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-indigo-400'
                      }`}
                      title={
                        isHighlighted 
                          ? 'Click to remove highlight | Shift+Click for phrase range | Ctrl+Click to multi-select'
                          : 'Click to highlight | Shift+Click for phrase range | Ctrl+Click to multi-select'
                      }
                    >
                      {word}
                      {isHighlighted && (
                        <span className="ml-1.5 text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                💡 <strong>Tips:</strong> Click to highlight • Shift+Click for phrase range • Ctrl+Click to multi-select
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={currentSlide.description || ''}
              onChange={(e) => updateSlide(activeTab, 'description', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Points (2 points) *
            </label>
            <div className="space-y-2">
              {[0, 1].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  value={currentSlide.points?.[idx] || ''}
                  onChange={(e) => updatePoint(activeTab, idx, e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Point ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(activeTab, e.target.files[0])}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {currentSlide.image && (
              <div className="mt-2">
                <img
                  src={currentSlide.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover border border-gray-200 rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`active-${activeTab}`}
              checked={currentSlide.isActive || false}
              onChange={(e) => updateSlide(activeTab, 'isActive', e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={`active-${activeTab}`} className="text-xs text-gray-700">
              Active (Show this slide)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

