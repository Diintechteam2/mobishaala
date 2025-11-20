import React, { useState } from 'react';
import { useDashboardStore } from '../state/useDashboardStore';

const Institutes = () => {
  const institutes = useDashboardStore((state) => state.institutes);
  const upsertInstitute = useDashboardStore((state) => state.upsertInstitute);
  const [form, setForm] = useState({ id: '', name: '', owner: '', status: 'Draft' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return;
    upsertInstitute({ ...form, leadsThisWeek: 0 });
    setForm({ id: '', name: '', owner: '', status: 'Draft' });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 h-fit">
        <div className="text-sm font-semibold text-gray-900 mb-2">Add / Update institute</div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block text-sm">
            Slug (e.g. destination-ias)
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.id}
              onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Institute name
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Owner
            <input
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.owner}
              onChange={(e) => setForm((prev) => ({ ...prev, owner: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            Status
            <select
              className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option>Draft</option>
              <option>Live</option>
              <option>Archived</option>
            </select>
          </label>
          <button className="w-full rounded-2xl bg-primary text-white text-sm font-semibold py-2">Save</button>
        </form>
      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase text-gray-500">Institutes</div>
            <div className="text-lg font-semibold text-gray-900">Workspace list</div>
          </div>
          <span className="text-xs text-gray-500">{institutes.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Owner</th>
                <th className="py-2">Status</th>
                <th className="py-2">Leads/week</th>
              </tr>
            </thead>
            <tbody>
              {institutes.map((inst) => (
                <tr key={inst.id} className="border-t border-gray-100">
                  <td className="py-2 font-semibold text-gray-900">{inst.name}</td>
                  <td className="py-2 text-gray-500">{inst.owner || 'Unassigned'} </td>
                  <td className="py-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        inst.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500">{inst.leadsThisWeek ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Institutes;

