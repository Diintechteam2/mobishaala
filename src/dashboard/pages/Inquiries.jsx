import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';
const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'converted', label: 'Converted' },
  { value: 'archived', label: 'Archived' },
];

const statusStyles = {
  new: 'bg-primary/10 text-primary',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-gray-100 text-gray-500',
};

const formatDateTime = (isoString) => {
  try {
    return new Date(isoString).toLocaleString();
  } catch {
    return '—';
  }
};

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchInquiries = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('You need to be logged in to view inquiries.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE}/api/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const raw = await response.text();
        console.error('Unexpected inquiries response:', raw);
        throw new Error('Unexpected response from server. Please log in again or check the backend.');
      }

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to fetch inquiries');
      }

      setInquiries(data.data || []);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      setError(err.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const summary = useMemo(() => {
    return inquiries.reduce(
      (acc, inquiry) => {
        acc.total += 1;
        acc.byStatus[inquiry.status] = (acc.byStatus[inquiry.status] || 0) + 1;
        return acc;
      },
      { total: 0, byStatus: {} }
    );
  }, [inquiries]);

  const handleStatusChange = async (inquiryId, nextStatus) => {
    if (!nextStatus || updatingId) return;
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Missing auth token.');
      return;
    }

    try {
      setUpdatingId(inquiryId);
      const response = await fetch(`${API_BASE}/api/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const raw = await response.text();
        console.error('Unexpected update response:', raw);
        throw new Error('Unexpected response from server while updating status.');
      }

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update status');
      }

      setInquiries((prev) =>
        prev.map((item) => (item._id === inquiryId ? data.data : item))
      );
    } catch (err) {
      console.error('Status update failed:', err);
      setError(err.message || 'Unable to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Admin inbox</p>
          <h1 className="text-2xl font-bold text-gray-900">Website inquiries</h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-4">
          <p className="text-xs uppercase text-gray-500">Total</p>
          <p className="text-3xl font-bold text-gray-900">{summary.total}</p>
        </div>
        {statusOptions.map((option) => (
          <div key={option.value} className="rounded-3xl border border-gray-100 bg-white p-4">
            <p className="text-xs uppercase text-gray-500">{option.label}</p>
            <p className="text-3xl font-bold text-gray-900">
              {summary.byStatus[option.value] || 0}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs uppercase text-gray-500">Submissions</p>
            <p className="text-lg font-semibold text-gray-900">{inquiries.length} entries</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Business</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">WhatsApp</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                    No inquiries yet. Once visitors submit the "Start for free" form, they’ll show up here.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-900">{inquiry.name}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.businessName}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.businessEmail}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.whatsappNumber}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[inquiry.status] || 'bg-gray-100 text-gray-600'}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formatDateTime(inquiry.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <select
                        className="rounded-2xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700"
                        value={inquiry.status}
                        onChange={(event) => handleStatusChange(inquiry._id, event.target.value)}
                        disabled={updatingId === inquiry._id}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;



