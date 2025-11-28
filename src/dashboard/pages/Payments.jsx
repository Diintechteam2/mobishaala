import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const Payments = () => {
  const [institutes, setInstitutes] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingInstitutes, setLoadingInstitutes] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('authToken');

  const fetchInstitutes = async () => {
    if (!token) return;
    setLoadingInstitutes(true);
    try {
      const response = await fetch(`${API_BASE}/api/institutes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load institutes');
      }
      setInstitutes(data.data || []);
    } catch (err) {
      console.error('Institutes fetch error:', err);
      setError(err.message || 'Unable to fetch institutes');
    } finally {
      setLoadingInstitutes(false);
    }
  };

  const fetchPayments = async () => {
    if (!token) return;
    setLoadingPayments(true);
    try {
      const response = await fetch(`${API_BASE}/api/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to fetch payments');
      }
      setPayments(data.data || []);
    } catch (err) {
      console.error('Payments fetch error:', err);
      setError(err.message || 'Unable to fetch payments');
    } finally {
      setLoadingPayments(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchPayments();
  }, []);

  const handleToggle = async (instituteId, enabled) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}/api/institutes/${instituteId}/payment-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paytmEnabled: enabled }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to update settings');
      }
      setInstitutes((prev) =>
        prev.map((inst) =>
          inst.instituteId === instituteId
            ? { ...inst, paymentSettings: { ...inst.paymentSettings, paytmEnabled: enabled } }
            : inst
        )
      );
    } catch (err) {
      console.error('Toggle payment error:', err);
      setError(err.message || 'Unable to update payment settings');
    }
  };

  const statusColors = {
    initiated: 'bg-gray-100 text-gray-700',
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Payment settings</p>
          <h1 className="text-2xl font-bold text-gray-900">Paytm Gateway Control</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            fetchInstitutes();
            fetchPayments();
          }}
          className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Institutes</p>
            <h2 className="text-lg font-semibold text-gray-900">Enable / Disable Paytm</h2>
          </div>
        </div>
        {loadingInstitutes ? (
          <p className="text-sm text-gray-500">Loading institutes…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-3 px-4">Institute</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Paytm</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((inst) => (
                  <tr key={inst.instituteId} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{inst.businessName}</div>
                      <div className="text-xs text-gray-500">#{inst.instituteId}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{inst.city}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {inst.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                          inst.paymentSettings?.paytmEnabled
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        onClick={() => handleToggle(inst.instituteId, !inst.paymentSettings?.paytmEnabled)}
                      >
                        {inst.paymentSettings?.paytmEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Recent payments</p>
            <h2 className="text-lg font-semibold text-gray-900">{payments.length} entries</h2>
          </div>
        </div>
        {loadingPayments ? (
          <p className="text-sm text-gray-500">Loading payments…</p>
        ) : payments.length === 0 ? (
          <p className="text-sm text-gray-500">No payments recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Institute</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Order</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.orderId} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{payment.studentName}</div>
                      <div className="text-xs text-gray-500">{payment.studentEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{payment.instituteId}</td>
                    <td className="py-3 px-4 text-gray-600">{payment.courseTitle}</td>
                    <td className="py-3 px-4 text-gray-900 font-semibold">
                      ₹{Number(payment.amount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[payment.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{payment.orderId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;



