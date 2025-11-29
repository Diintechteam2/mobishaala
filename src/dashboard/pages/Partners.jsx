import React, { useState, useEffect } from 'react';
import Partner from '../../components/Partner';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    headline: 'Students Working With Top Companies Like',
    stats: [
      { number: '220+', label: 'Hiring Partners' },
      { number: '40+', label: 'University Collabs' },
      { number: '25,000+', label: 'Careers Transformed' },
      { number: '400+', label: 'Team Size' }
    ]
  });
  const [formData, setFormData] = useState({
    name: '',
    row: 'top',
    order: 0
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      // Fetch partners
      const partnersResponse = await fetch(`${API_BASE}/api/partners`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const partnersData = await partnersResponse.json();

      // Fetch institutes
      const institutesResponse = await fetch(`${API_BASE}/api/institutes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const institutesData = await institutesResponse.json();

      // Fetch settings
      const settingsResponse = await fetch(`${API_BASE}/api/partners-section-settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const settingsData = await settingsResponse.json();

      if (partnersData.success) {
        setPartners(partnersData.data || []);
      }
      if (institutesData.success) {
        setInstitutes(institutesData.data || []);
      }
      if (settingsData.success && settingsData.data) {
        setSettings({
          headline: settingsData.data.headline || 'Students Working With Top Companies Like',
          stats: settingsData.data.stats || [
            { number: '220+', label: 'Hiring Partners' },
            { number: '40+', label: 'University Collabs' },
            { number: '25,000+', label: 'Careers Transformed' },
            { number: '400+', label: 'Team Size' }
          ]
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name.trim()) {
      setError('Partner name is required');
      return;
    }

    if (!editingPartner && !logoFile) {
      setError('Logo image is required');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('row', formData.row);
      formDataToSend.append('order', formData.order.toString());
      
      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      }

      const url = editingPartner 
        ? `${API_BASE}/api/partners/${editingPartner._id}`
        : `${API_BASE}/api/partners`;
      
      const method = editingPartner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({ name: '', row: 'top', order: 0 });
        setLogoFile(null);
        setLogoPreview('');
        setEditingPartner(null);
        setIsFormOpen(false);
        fetchData();
      } else {
        setError(data.message || 'Failed to save partner');
      }
    } catch (err) {
      console.error('Error saving partner:', err);
      setError('Network error. Please try again.');
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      row: partner.row,
      order: partner.order || 0
    });
    setLogoPreview(partner.logo);
    setIsFormOpen(true);
  };

  const handleDelete = async (partnerId) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/api/partners/${partnerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        setError(data.message || 'Failed to delete partner');
      }
    } catch (err) {
      console.error('Error deleting partner:', err);
      setError('Network error. Please try again.');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleActive = async (partnerId, isActive) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/api/partners/${partnerId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        setError(data.message || 'Failed to update partner');
      }
    } catch (err) {
      console.error('Error updating partner:', err);
      setError('Network error. Please try again.');
    }
  };

  // Get active institutes as partners
  const institutePartners = institutes
    .filter(inst => inst.status === 'Active' && inst.businessLogo)
    .map(inst => ({
      _id: inst._id,
      name: inst.businessName,
      logo: inst.businessLogo,
      row: 'top',
      isActive: true,
      isInstitute: true
    }));

  // Combine all partners
  const allPartners = [...institutePartners, ...partners];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading partners...</p>
        </div>
      </div>
    );
  }

  const handleSettingsSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const response = await fetch(`${API_BASE}/api/partners-section-settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      const data = await response.json();
      if (data.success) {
        setIsSettingsOpen(false);
        fetchData();
      } else {
        setError(data.message || 'Failed to save settings');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden">
      {/* Preview Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs uppercase text-gray-500">Preview</div>
            <div className="text-sm font-semibold text-gray-900">Partners Section</div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition flex-shrink-0"
          >
            Edit Tagline/Values
          </button>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white w-full max-w-full">
          <div className="overflow-hidden max-h-[350px] overflow-y-auto w-full">
            <div className="w-full" style={{ transform: 'scale(0.45)', transformOrigin: 'top left' }}>
              <div style={{ width: '222.22%' }}>
                <Partner headline={settings.headline} stats={settings.stats} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Management */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase text-gray-500">Partners</div>
            <div className="text-sm font-semibold text-gray-900 truncate">Manage Partners</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {allPartners.length} total
            </span>
            <button
              onClick={() => {
                setEditingPartner(null);
                setFormData({ name: '', row: 'top', order: 0 });
                setLogoFile(null);
                setLogoPreview('');
                setIsFormOpen(true);
              }}
              className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
            >
              + Add Partner
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs break-words">
            {error}
          </div>
        )}

         {/* Partners List */}
         <div className="space-y-2 w-full max-w-full overflow-x-hidden">
           {/* All Partners (Same data for both rows) */}
           <div className="w-full max-w-full">
             <div className="text-xs font-semibold text-gray-700 mb-1.5">All Partners</div>
             <div className="grid gap-1.5 max-h-[300px] overflow-y-auto w-full">
               {allPartners.length === 0 ? (
                 <div className="text-xs text-gray-500 py-2 text-center border border-gray-100 rounded-lg">
                   No partners
                 </div>
               ) : (
                 allPartners
                   .sort((a, b) => {
                     if (a.isInstitute && !b.isInstitute) return -1;
                     if (!a.isInstitute && b.isInstitute) return 1;
                     return (a.order || 0) - (b.order || 0);
                   })
                   .map((partner) => (
                     <div
                       key={partner._id}
                       className="flex items-center justify-between border border-gray-100 rounded-lg p-1.5 hover:bg-gray-50 min-w-0 w-full max-w-full"
                     >
                       <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                         {partner.logo && (
                           <img
                             src={partner.logo}
                             alt={partner.name}
                             className="w-6 h-6 object-contain rounded flex-shrink-0"
                           />
                         )}
                         <div className="min-w-0 flex-1 overflow-hidden">
                           <div className="text-xs font-medium text-gray-900 truncate">{partner.name}</div>
                           <div className="text-xs text-gray-500 truncate">
                             {partner.isInstitute ? 'Institute' : 'Partner'}
                           </div>
                         </div>
                       </div>
                       <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                         {!partner.isInstitute && (
                           <>
                             <button
                               onClick={() => handleToggleActive(partner._id, partner.isActive)}
                               className={`text-xs px-1 py-0.5 rounded ${
                                 partner.isActive
                                   ? 'bg-green-100 text-green-700'
                                   : 'bg-gray-100 text-gray-700'
                               }`}
                             >
                               {partner.isActive ? '✓' : '✗'}
                             </button>
                             <button
                               onClick={() => handleEdit(partner)}
                               className="text-xs px-1 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                               title="Edit"
                             >
                               ✎
                             </button>
                             <button
                               onClick={() => handleDelete(partner._id)}
                               className="text-xs px-1 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                               title="Delete"
                             >
                               ×
                             </button>
                           </>
                         )}
                         {partner.isInstitute && (
                           <span className="text-xs text-gray-400">Auto</span>
                         )}
                       </div>
                     </div>
                   ))
               )}
             </div>
             <div className="mt-1.5 text-xs text-gray-400 italic">
               Same in both rows: Top→right, Bottom←left
             </div>
           </div>
        </div>
      </div>

      {/* Add/Edit Partner Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPartner ? 'Edit Partner' : 'Add Partner'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingPartner(null);
                  setFormData({ name: '', row: 'top', order: 0 });
                  setLogoFile(null);
                  setLogoPreview('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Row *
                </label>
                <select
                  value={formData.row}
                  onChange={(e) => setFormData({ ...formData, row: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="top">Top Row</option>
                  <option value="bottom">Bottom Row</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order (for sorting)
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo {!editingPartner && '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required={!editingPartner}
                />
                {logoPreview && (
                  <div className="mt-2">
                    <img
                      src={logoPreview}
                      alt="Preview"
                      className="w-24 h-24 object-contain border border-gray-200 rounded-lg"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  {editingPartner ? 'Update Partner' : 'Add Partner'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingPartner(null);
                    setFormData({ name: '', row: 'top', order: 0 });
                    setLogoFile(null);
                    setLogoPreview('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Editor Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Partners Section Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Students Working With Top Companies Like"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stats (4 values)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {settings.stats.map((stat, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3">
                      <div className="mb-2">
                        <label className="block text-xs text-gray-600 mb-1">Number</label>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => {
                            const newStats = [...settings.stats];
                            newStats[idx].number = e.target.value;
                            setSettings({ ...settings, stats: newStats });
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="220+"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...settings.stats];
                            newStats[idx].label = e.target.value;
                            setSettings({ ...settings, stats: newStats });
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Hiring Partners"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSettingsSave}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;

