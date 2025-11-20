import React, { useMemo, useState } from 'react';
import { useDashboardStore } from '../state/useDashboardStore';

const ModuleList = () => {
  const [search, setSearch] = useState('');
  const moduleSections = useDashboardStore((state) => state.moduleSections);
  const activeSectionId = useDashboardStore((state) => state.activeSectionId);
  const activeModuleId = useDashboardStore((state) => state.activeModuleId);
  const selectSection = useDashboardStore((state) => state.selectSection);
  const selectModule = useDashboardStore((state) => state.selectModule);
  const modules = useDashboardStore((state) => state.modules);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return moduleSections;
    const lower = search.toLowerCase();
    return moduleSections
      .map((section) => ({
        ...section,
        modules: section.modules.filter((mod) => mod.name.toLowerCase().includes(lower)),
      }))
      .filter((section) => section.modules.length > 0);
  }, [moduleSections, search]);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <input
          className="flex-1 rounded-2xl bg-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search modules…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-xs text-gray-500">{moduleSections.length} groups</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3">
        {moduleSections.map((section) => (
          <button
            key={section.id}
            onClick={() => selectSection(section.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              section.id === activeSectionId ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 mt-2">
        {filteredSections.map((section) => (
          <div key={section.id}>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              {section.label}
            </div>
            <div className="space-y-2">
              {section.modules.map((module) => {
                const meta = modules[module.id];
                return (
                  <button
                    key={module.id}
                    onClick={() => selectModule(module.id, section.id)}
                    className={`w-full text-left border rounded-2xl p-3 transition ${
                      activeModuleId === module.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{module.icon}</span>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{module.name}</div>
                          <div className="text-xs text-gray-500">{module.description}</div>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          meta?.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {meta?.status || 'draft'}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-gray-500">
                      Updated {new Date(meta?.updatedAt || '').toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleList;

