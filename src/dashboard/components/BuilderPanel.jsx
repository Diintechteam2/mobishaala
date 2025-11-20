import React from 'react';
import ModuleEditor from './ModuleEditor';
import PreviewPane from './PreviewPane';

const BuilderPanel = () => {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="bg-white border border-gray-200 rounded-3xl p-5">
        <ModuleEditor />
      </div>
      <PreviewPane />
    </div>
  );
};

export default BuilderPanel;

