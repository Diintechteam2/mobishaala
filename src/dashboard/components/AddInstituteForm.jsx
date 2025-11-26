import React, { useState } from 'react';

const AddInstituteForm = ({ isOpen, onClose, onSuccess }) => {
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

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append files if selected
      if (files.businessLogo) {
        formDataToSend.append('businessLogo', files.businessLogo);
      }
      if (files.instituteImage) {
        formDataToSend.append('instituteImage', files.instituteImage);
      }

      const response = await fetch('https://mobishaala-backend-zcxm.onrender.com/api/institutes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({
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
        setFiles({
          businessLogo: null,
          instituteImage: null
        });
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to create institute');
      }
    } catch (err) {
      console.error('Error creating institute:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Institute</h2>
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
            {/* Business Name */}
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
                placeholder="Enter business name"
              />
            </div>

            {/* Business Owner Name */}
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
                placeholder="Enter owner name"
              />
            </div>

            {/* Business Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter business number"
              />
            </div>

            {/* Business Email */}
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
                placeholder="Enter business email"
              />
            </div>

            {/* Business GST Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business GST Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessGSTNumber"
                value={formData.businessGSTNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none uppercase"
                placeholder="Enter GST number"
              />
            </div>

            {/* Business PAN Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business PAN Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessPANNumber"
                value={formData.businessPANNumber}
                onChange={handleChange}
                required
                maxLength={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none uppercase"
                placeholder="Enter PAN number"
              />
            </div>

            {/* Business Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="businessMobileNumber"
                value={formData.businessMobileNumber}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Category <span className="text-red-500">*</span>
              </label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter city"
              />
            </div>

            {/* Pin Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
                maxLength={6}
                pattern="[0-9]{6}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter 6-digit PIN code"
              />
            </div>

            {/* Business Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Website
              </label>
              <input
                type="url"
                name="businessWebsite"
                value={formData.businessWebsite}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="https://example.com"
              />
            </div>

            {/* Business YouTube Channel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business YouTube Channel
              </label>
              <input
                type="url"
                name="businessYouTubeChannel"
                value={formData.businessYouTubeChannel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="https://youtube.com/channel/..."
              />
            </div>

            {/* Annual Turnover Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Turnover Range
              </label>
              <select
                name="annualTurnoverRange"
                value={formData.annualTurnoverRange}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">Select Turnover Range</option>
                {turnoverRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter complete business address"
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Logo */}
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
                  id="businessLogo"
                />
                <label
                  htmlFor="businessLogo"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {files.businessLogo ? files.businessLogo.name : 'No file chosen'}
                  </span>
                </label>
              </div>
            </div>

            {/* Institute Image */}
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
                  id="instituteImage"
                />
                <label
                  htmlFor="instituteImage"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {files.instituteImage ? files.instituteImage.name : 'No file chosen'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
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
              {loading ? 'Creating...' : 'Add Institute'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstituteForm;

