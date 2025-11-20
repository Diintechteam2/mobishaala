import React from 'react';
import { useDashboardStore } from '../state/useDashboardStore';

const Overview = () => {
  const modules = useDashboardStore((state) => state.modules);
  const leads = useDashboardStore((state) => state.leads);
  const institutes = useDashboardStore((state) => state.institutes);

  const publishedCount = Object.values(modules).filter((module) => module.status === 'published').length;
  const draftCount = Object.values(modules).length - publishedCount;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white border border-gray-200 rounded-3xl p-4">
          <div className="text-xs uppercase text-gray-500">Published modules</div>
          <div className="text-3xl font-bold text-gray-900">{publishedCount}</div>
          <p className="text-sm text-gray-500">Content blocks live on site</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-4">
          <div className="text-xs uppercase text-gray-500">Draft modules</div>
          <div className="text-3xl font-bold text-gray-900">{draftCount}</div>
          <p className="text-sm text-gray-500">Need review / publish</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-4">
          <div className="text-xs uppercase text-gray-500">Active leads</div>
          <div className="text-3xl font-bold text-gray-900">{leads.length}</div>
          <p className="text-sm text-gray-500">Captured past 7 days</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase text-gray-500">Institutes</div>
              <div className="text-lg font-semibold text-gray-900">Microsites</div>
            </div>
            <span className="text-xs text-primary font-semibold">{institutes.length} total</span>
          </div>
          <div className="space-y-3 text-sm">
            {institutes.map((inst) => (
              <div key={inst.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-3">
                <div>
                  <div className="font-semibold text-gray-900">{inst.name}</div>
                  <div className="text-xs text-gray-500">Owner: {inst.owner}</div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    inst.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {inst.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase text-gray-500">Latest leads</div>
              <div className="text-lg font-semibold text-gray-900">CRM feed</div>
            </div>
            <span className="text-xs text-primary font-semibold">Realtime</span>
          </div>
          <div className="space-y-3 text-sm">
            {leads.slice(0, 5).map((lead, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl p-3">
                <div className="font-semibold text-gray-900">{lead.name}</div>
                <div className="text-xs text-gray-500">{lead.route}</div>
                <div className="text-xs text-gray-500">Source: {lead.source}</div>
                <div className="mt-1 text-xs font-semibold text-primary">{lead.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

