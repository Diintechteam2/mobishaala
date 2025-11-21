import React from 'react';
import ModuleList from '../components/ModuleList';
import BuilderPanel from '../components/BuilderPanel';

const ContentStudio = () => {
  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="h-[calc(100vh-180px)]">
        <ModuleList />
      </div>
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-4">
          <div className="text-sm font-semibold text-gray-900">Content Builder</div>
          <p className="text-xs text-gray-500">
            Select a module to edit fields on the left. Preview reflects selected audience + breakpoint.
          </p>
        </div>
        <BuilderPanel />
      </div>
    </div>
  );
};

export default ContentStudio;


