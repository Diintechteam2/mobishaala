import React, { useState, useEffect } from 'react';
import AddInstituteForm from '../components/AddInstituteForm';
import InstituteActions from '../components/InstituteActions';
import EditInstituteForm from '../components/EditInstituteForm';

const Institutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [error, setError] = useState('');

  const fetchInstitutes = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      const response = await fetch('https://mobishaala-backend-zcxm.onrender.com/api/institutes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setInstitutes(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch institutes');
      }
    } catch (err) {
      console.error('Error fetching institutes:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleFormSuccess = () => {
    fetchInstitutes(); // Refresh the list
  };

  const handleStatusChange = async (instituteId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login again');
        return;
      }

      // Validate status value
      const validStatuses = ['Draft', 'Active', 'Archived'];
      if (!validStatuses.includes(newStatus)) {
        setError('Invalid status value');
        return;
      }

      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/${instituteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        fetchInstitutes();
        setError(''); // Clear any previous errors
      } else {
        setError(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message || 'Network error. Please try again.');
    }
  };

  const handleDelete = async (instituteId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/institutes/${instituteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchInstitutes();
      } else {
        setError(data.message || 'Failed to delete institute');
      }
    } catch (err) {
      console.error('Error deleting institute:', err);
      setError('Network error. Please try again.');
    }
  };

  const handleEdit = (institute) => {
    setEditingInstitute(institute);
  };

  const handleEditSuccess = () => {
    setEditingInstitute(null);
    fetchInstitutes();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading institutes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase text-gray-500">Institutes</div>
            <div className="text-lg font-semibold text-gray-900">Workspace list</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{institutes.length} total</span>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Institute
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {institutes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No institutes found</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Add Your First Institute
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                  <th className="py-3">Institute ID</th>
                  <th className="py-3">Business Name</th>
                  <th className="py-3">Owner</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">City</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Created</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((inst) => (
                  <tr key={inst._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <span className="font-mono text-xs font-semibold text-indigo-600">
                        {inst.instituteId}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-gray-900">
                      {inst.businessLogo && (
                        <img
                          src={inst.businessLogo}
                          alt={inst.businessName}
                          className="inline-block w-8 h-8 rounded-full mr-2 object-cover"
                        />
                      )}
                      {inst.businessName}
                    </td>
                    <td className="py-3 text-gray-500">{inst.businessOwnerName}</td>
                    <td className="py-3 text-gray-500">{inst.businessEmail}</td>
                    <td className="py-3 text-gray-500">{inst.city}</td>
                    <td className="py-3 text-gray-500">{inst.businessCategory}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          inst.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : inst.status === 'Archived'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {inst.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs">
                      {new Date(inst.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <InstituteActions
                        institute={inst}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        onRefresh={fetchInstitutes}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddInstituteForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {editingInstitute && (
        <EditInstituteForm
          isOpen={!!editingInstitute}
          institute={editingInstitute}
          onClose={() => setEditingInstitute(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default Institutes;

