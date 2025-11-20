import React, { useState } from 'react';
import { useDashboardStore } from '../state/useDashboardStore';

const Leads = () => {
  const leads = useDashboardStore((state) => state.leads);
  const addLead = useDashboardStore((state) => state.addLead);

  const [form, setForm] = useState({ name: '', route: '', source: '', status: 'New' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    addLead(form);
    setForm({ name: '', route: '', source: '', status: 'New' });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 h-fit">
        <div className="text-sm font-semibold text-gray-900 mb-2">Manual lead</div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block text-sm">
            Name
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Route/source page
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.route}
              onChange={(e) => setForm((prev) => ({ ...prev, route: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Source note
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.source}
              onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Status
            <select
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </label>
          <button className="w-full rounded-2xl bg-primary text-white text-sm font-semibold py-2">Add lead</button>
        </form>
      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase text-gray-500">Lead inbox</div>
            <div className="text-lg font-semibold text-gray-900">Recent submissions</div>
          </div>
          <span className="text-xs text-gray-500">{leads.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Route</th>
                <th className="py-2">Source</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => (
                <tr key={`${lead.name}-${idx}`} className="border-t border-gray-100">
                  <td className="py-2 font-semibold text-gray-900">{lead.name}</td>
                  <td className="py-2 text-gray-500">{lead.route}</td>
                  <td className="py-2 text-gray-500">{lead.source}</td>
                  <td className="py-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;

