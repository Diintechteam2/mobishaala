import React, { useState } from 'react';

const Settings = () => {
  const [toggles, setToggles] = useState({
    autosave: true,
    approvals: false,
    betaFeatures: true,
  });

  const toggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4">
        <div>
          <div className="text-xs uppercase text-gray-500">Workflow</div>
          <div className="text-lg font-semibold text-gray-900">Automation</div>
        </div>
        {[
          { key: 'autosave', label: 'Autosave drafts', description: 'Auto push changes every 30s.' },
          {
            key: 'approvals',
            label: 'Require approvals',
            description: 'Editors submit for review before publishing.',
          },
          { key: 'betaFeatures', label: 'Beta components', description: 'Show experimental modules in library.' },
        ].map((item) => (
          <label key={item.key} className="flex items-center justify-between border border-gray-100 rounded-2xl p-3">
            <div>
              <div className="font-semibold text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
            <button
              type="button"
              onClick={() => toggle(item.key)}
              className={`w-12 h-6 rounded-full transition ${
                toggles[item.key] ? 'bg-primary' : 'bg-gray-200'
              } relative`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transform transition ${
                  toggles[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4">
        <div>
          <div className="text-xs uppercase text-gray-500">Integrations</div>
          <div className="text-lg font-semibold text-gray-900">Webhook endpoints</div>
        </div>
        <div className="text-sm text-gray-600">
          Use the following placeholders when wiring Node backend webhooks. Replace with production URLs when ready.
        </div>
        <ul className="text-sm text-gray-800 space-y-2">
          <li>
            Leads webhook:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded-lg">POST /api/webhooks/leads</code>
          </li>
          <li>
            Publish webhook:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded-lg">POST /api/webhooks/publish</code>
          </li>
          <li>
            Asset webhook:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded-lg">POST /api/webhooks/assets</code>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;


