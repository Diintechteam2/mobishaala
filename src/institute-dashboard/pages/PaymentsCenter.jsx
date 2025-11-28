import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mobishaala-backend-zcxm.onrender.com';

const PaymentsCenter = () => {
  const { instituteId } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/payments/institute/${instituteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to fetch payments');
        }
        setPayments(data.data || []);
      } catch (err) {
        console.error('Institute payments error:', err);
        setError(err.message || 'Unable to fetch payments');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [instituteId]);

  const statusColors = {
    initiated: 'bg-gray-100 text-gray-700',
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">Payments</p>
        <h1 className="text-2xl font-bold text-gray-900">Student Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track every Paytm initiation so your sales team can follow up instantly.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-3xl p-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading payments…</p>
        ) : payments.length === 0 ? (
          <p className="text-sm text-gray-500">No payments recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Updated</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.orderId} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{payment.studentName}</div>
                      <div className="text-xs text-gray-500">{payment.studentEmail}</div>
                    </td>
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
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(payment.updatedAt).toLocaleString()}
                    </td>
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

export default PaymentsCenter;



