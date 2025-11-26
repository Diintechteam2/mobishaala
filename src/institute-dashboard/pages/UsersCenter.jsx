import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UsersCenter = () => {
  const { instituteId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [callbacks, setCallbacks] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState('callback');

  useEffect(() => {
    fetchLeads();
  }, [instituteId]);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://mobishaala-backend-zcxm.onrender.com/api/leads/${instituteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch leads');
      }

      const data = await response.json();
      if (data.success) {
        setCallbacks(data.data.callbacks || []);
        setPurchases(data.data.purchases || []);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderLeadTable = (items, type) => {
    if (!items.length) {
      return (
        <div className="text-center py-10 text-gray-500 border border-dashed border-gray-200 rounded-2xl">
          No {type === 'callback' ? 'callback requests' : 'course purchases'} yet.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Contact</th>
              {type === 'callback' ? (
                <th className="px-4 py-3">Focus Area</th>
              ) : (
                <>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Price</th>
                </>
              )}
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.map((lead) => (
              <tr key={lead._id}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{lead.name}</p>
                  {lead.city && <p className="text-xs text-gray-500">{lead.city}</p>}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-800">{lead.phone}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                </td>
                {type === 'callback' ? (
                  <td className="px-4 py-3 text-sm text-gray-700">{lead.focusArea || '-'}</td>
                ) : (
                  <>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{lead.courseTitle || 'Course'}</p>
                      <p className="text-xs text-gray-500">{lead.mode || 'Online'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold text-gray-900">
                        ₹{Number(lead.price || 0).toLocaleString('en-IN')}
                      </p>
                      {lead.originalPrice > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{Number(lead.originalPrice).toLocaleString('en-IN')}
                        </p>
                      )}
                    </td>
                  </>
                )}
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(lead.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Leads</h1>
          <p className="text-sm text-gray-500">
            Track callback requests and course purchase intents submitted from your landing pages.
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Callback Requests</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{callbacks.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Course Purchase Intents</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{purchases.length}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="border-b border-gray-100 px-4 py-2 flex gap-2">
          <button
            onClick={() => setActiveTab('callback')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'callback'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Request Call ({callbacks.length})
          </button>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeTab === 'purchase'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Course Purchase ({purchases.length})
          </button>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading leads...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-500">{error}</div>
          ) : activeTab === 'callback' ? (
            renderLeadTable(callbacks, 'callback')
          ) : (
            renderLeadTable(purchases, 'purchase')
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersCenter;

