import React, { useMemo } from 'react';
import { useDashboardStore } from '../state/useDashboardStore';
import { previewRegistry } from './preview/PreviewRegistry';

const breakpointMap = {
  mobile: 420,
  tablet: 768,
  desktop: 1240,
};

const PreviewPane = () => {
  const moduleSections = useDashboardStore((state) => state.moduleSections);
  const modules = useDashboardStore((state) => state.modules);
  const audience = useDashboardStore((state) => state.audience);
  const breakpoint = useDashboardStore((state) => state.preview.breakpoint);

  const modulesToRender = useMemo(() => {
    return moduleSections
      .flatMap((section) => section.modules)
      .filter((module) => module.audience === audience || module.audience === 'global');
  }, [moduleSections, audience]);

  return (
    <div className="h-full flex flex-col rounded-3xl border border-gray-200 bg-gray-100">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase text-gray-500">Preview</div>
          <div className="font-semibold text-gray-900">/{audience === 'home' ? '' : audience}</div>
        </div>
        <div className="text-xs text-gray-500">
          {breakpoint} · {breakpointMap[breakpoint]}px wide
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div
          className="mx-auto space-y-4"
          style={{
            width: breakpointMap[breakpoint],
          }}
        >
          {modulesToRender.map((module) => {
            const Component = previewRegistry[module.previewComponent] || (() => null);
            return <Component key={module.id} data={modules[module.id]?.data || {}} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;

