import React, { useState, useEffect } from 'react';

const EditInstituteForm = ({ isOpen, onClose, institute, onSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessOwnerName: '',
    businessNumber: '',
    businessEmail: '',
    businessGSTNumber: '',
    businessPANNumber: '',
    businessMobileNumber: '',
    businessCategory: '',
    city: '',
    pinCode: '',
    businessAddress: '',
    businessWebsite: '',
    businessYouTubeChannel: '',
    annualTurnoverRange: '',
    status: 'Draft'
  });

  const [files, setFiles] = useState({
    businessLogo: null,
    instituteImage: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (institute) {
      setFormData({
        businessName: institute.businessName || '',
        businessOwnerName: institute.businessOwnerName || '',
        businessNumber: institute.businessNumber || '',
        businessEmail: institute.businessEmail || '',
        businessGSTNumber: institute.businessGSTNumber || '',
        businessPANNumber: institute.businessPANNumber || '',
        businessMobileNumber: institute.businessMobileNumber || '',
        businessCategory: institute.businessCategory || '',
        city: institute.city || '',
        pinCode: institute.pinCode || '',
        businessAddress: institute.businessAddress || '',
        businessWebsite: institute.businessWebsite || '',
        businessYouTubeChannel: institute.businessYouTubeChannel || '',
        annualTurnoverRange: institute.annualTurnoverRange || '',
        status: institute.status || 'Draft'
      });
    }
  }, [institute]);

  const categories = [
    'Education',
    'Coaching',
    'Training',
    'E-Learning',
    'Other'
  ];

  const turnoverRanges = [
    'Less than 10 Lakhs',
    '10 Lakhs - 50 Lakhs',
    '50 Lakhs - 1 Crore',
    '1 Crore - 5 Crores',
    '5 Crores - 10 Crores',
    'More than 10 Crores'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (files.businessLogo) {
        formDataToSend.append('businessLogo', files.businessLogo);
      }
      if (files.instituteImage) {
        formDataToSend.append('instituteImage', files.instituteImage);
      }

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/${institute.instituteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.message || 'Failed to update institute');
      }
    } catch (err) {
      console.error('Error updating institute:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !institute) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Institute</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Owner Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessOwnerName"
                value={formData.businessOwnerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  name="businessLogo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="edit-businessLogo"
                />
                <label
                  htmlFor="edit-businessLogo"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {institute.businessLogo && !files.businessLogo && (
                    <img src={institute.businessLogo} alt="Logo" className="w-16 h-16 object-cover rounded mb-2" />
                  )}
                  <span className="text-sm text-gray-600">
                    {files.businessLogo ? files.businessLogo.name : 'Change logo'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institute Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  name="instituteImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="edit-instituteImage"
                />
                <label
                  htmlFor="edit-instituteImage"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {institute.instituteImage && !files.instituteImage && (
                    <img src={institute.instituteImage} alt="Institute" className="w-16 h-16 object-cover rounded mb-2" />
                  )}
                  <span className="text-sm text-gray-600">
                    {files.instituteImage ? files.instituteImage.name : 'Change image'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Institute'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInstituteForm;

