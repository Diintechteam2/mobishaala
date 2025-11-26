import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DynamicInstituteHero from './DynamicInstituteHero';
import DynamicInstituteCourses from './DynamicInstituteCourses';
import DynamicInstituteJourney from './DynamicInstituteJourney';
import DynamicInstituteTestimonials from './DynamicInstituteTestimonials';
import DynamicInstituteFAQ from './DynamicInstituteFAQ';
import DynamicInstituteNavbar from './DynamicInstituteNavbar';
import DynamicInstituteFooter from './DynamicInstituteFooter';

const DynamicInstitutePage = () => {
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInstituteData();
  }, [instituteId]);

  const fetchInstituteData = async () => {
    try {
      setLoading(true);
      
      // Fetch institute basic info
      const instituteResponse = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/public/${instituteId}`);
      const instituteData = await instituteResponse.json();
      
      if (!instituteData.success) {
        throw new Error('Institute not found');
      }
      
      setInstitute(instituteData.data);
      
      // Fetch institute content (optional - will use defaults if not found)
      try {
        const contentResponse = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institute-content/public/${instituteId}`);
        const contentData = await contentResponse.json();
        
        if (contentData.success) {
          setContent(contentData.data);
        } else {
          // If content doesn't exist, use null (will show defaults)
          setContent(null);
        }
      } catch (contentErr) {
        // If content fetch fails, use defaults
        console.log('Content not found, using defaults');
        setContent(null);
      }
    } catch (err) {
      console.error('Error fetching institute data:', err);
      setError(err.message || 'Failed to load institute page');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading institute page...</p>
        </div>
      </div>
    );
  }

  if (error || !institute) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Institute Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The institute you are looking for does not exist.'}</p>
          <a href="/institutes" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to Institutes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <DynamicInstituteNavbar institute={institute} />
      <main>
        <DynamicInstituteHero institute={institute} content={content} />
        <DynamicInstituteCourses institute={institute} content={content} />
        <DynamicInstituteJourney institute={institute} content={content} />
        <DynamicInstituteTestimonials institute={institute} content={content} />
        <DynamicInstituteFAQ institute={institute} content={content} />
      </main>
      <DynamicInstituteFooter institute={institute} />
    </div>
  );
};

export default DynamicInstitutePage;

