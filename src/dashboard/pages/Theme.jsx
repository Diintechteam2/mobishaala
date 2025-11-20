import React from 'react';
import { useDashboardStore } from '../state/useDashboardStore';

const Theme = () => {
  const theme = useDashboardStore((state) => state.theme);
  const updateTheme = useDashboardStore((state) => state.updateTheme);

  const updateColor = (key, value) => {
    updateTheme({ colors: { ...theme.colors, [key]: value } });
  };

  const updateTypography = (key, value) => {
    updateTheme({ typography: { ...theme.typography, [key]: value } });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4">
        <div>
          <div className="text-xs uppercase text-gray-500">Colors</div>
          <div className="text-lg font-semibold text-gray-900">Design tokens</div>
        </div>
        {Object.entries(theme.colors).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span className="capitalize">{key}</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value}
                onChange={(e) => updateColor(key, e.target.value)}
                className="w-10 h-10 rounded-xl border border-gray-200"
              />
              <input
                value={value}
                onChange={(e) => updateColor(key, e.target.value)}
                className="rounded-2xl border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
          </label>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4">
        <div>
          <div className="text-xs uppercase text-gray-500">Typography</div>
          <div className="text-lg font-semibold text-gray-900">Scale</div>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Font family
          <input
            value={theme.typography.fontFamily}
            onChange={(e) => updateTypography('fontFamily', e.target.value)}
            className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Base size
          <input
            type="number"
            value={theme.typography.baseSize}
            onChange={(e) => updateTypography('baseSize', Number(e.target.value))}
            className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Radius
          <input
            type="number"
            value={theme.typography.radius}
            onChange={(e) => updateTypography('radius', Number(e.target.value))}
            className="mt-1 w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm"
          />
        </label>
      </div>
    </div>
  );
};

export default Theme;

