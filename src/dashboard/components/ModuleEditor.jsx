import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDashboardStore } from '../state/useDashboardStore';
import FormField from './fields/FormField';

const findModuleSchema = (sections, moduleId) => {
  for (const section of sections) {
    const match = section.modules.find((module) => module.id === moduleId);
    if (match) return match;
  }
  return null;
};

const ModuleEditor = () => {
  const moduleSections = useDashboardStore((state) => state.moduleSections);
  const activeModuleId = useDashboardStore((state) => state.activeModuleId);
  const modules = useDashboardStore((state) => state.modules);
  const updateModuleData = useDashboardStore((state) => state.updateModuleData);
  const publishModule = useDashboardStore((state) => state.publishModule);

  const moduleSchema = findModuleSchema(moduleSections, activeModuleId);
  const moduleEntry = modules[activeModuleId];
  const form = useForm({
    defaultValues: moduleEntry?.data || {},
  });
  const { control, register, reset, watch } = form;
  const skipNextSyncRef = useRef(true);

  const prevModuleIdRef = useRef(null);

  useEffect(() => {
    if (!moduleEntry) return;
    if (prevModuleIdRef.current !== activeModuleId) {
      prevModuleIdRef.current = activeModuleId;
      skipNextSyncRef.current = true;
      reset(moduleEntry.data || {});
    }
  }, [moduleEntry, activeModuleId, reset]);

  useEffect(() => {
    if (!moduleEntry) return () => {};
    const subscription = watch((value) => {
      if (skipNextSyncRef.current) {
        skipNextSyncRef.current = false;
        return;
      }
      updateModuleData(activeModuleId, value);
    });
    return () => subscription.unsubscribe();
  }, [watch, activeModuleId, updateModuleData, moduleEntry]);

  if (!moduleSchema) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500">
        Select a module to start editing.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-widest text-gray-500">{moduleSchema.audience} module</div>
        <div className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          {moduleSchema.icon}
          {moduleSchema.name}
        </div>
        <p className="text-sm text-gray-500">{moduleSchema.description}</p>
      </div>
      <div className="grid gap-4">
        {(moduleSchema.fields || []).map((field) => (
          <FormField key={field.name} field={field} control={control} register={register} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => publishModule(activeModuleId)}
          className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
        >
          Mark as Published
        </button>
        <div className="text-xs text-gray-500">
          Last updated {new Date(moduleEntry?.updatedAt || '').toLocaleTimeString()} ·{' '}
          <span className="font-semibold">{moduleEntry?.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ModuleEditor;

