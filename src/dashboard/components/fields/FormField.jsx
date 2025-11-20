import React from 'react';
import { Controller } from 'react-hook-form';
import RepeaterField from './RepeaterField';

const baseClass =
  'w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary';

const FormField = ({ field, control, register, path }) => {
  const name = path ? `${path}.${field.name}` : field.name;

  if (field.type === 'object') {
    return (
      <div className="border border-dashed border-gray-200 rounded-2xl p-3 space-y-3">
        <div className="text-xs font-semibold text-gray-500 uppercase">{field.label}</div>
        {field.fields.map((child) => (
          <FormField key={child.name} field={child} control={control} register={register} path={name} />
        ))}
      </div>
    );
  }

  if (field.type === 'repeater') {
    return <RepeaterField field={field} control={control} name={name} register={register} />;
  }

  if (field.type === 'textarea') {
    return (
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        <textarea rows={field.rows || 3} className={`${baseClass} mt-1`} {...register(name)} placeholder={field.placeholder} />
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        <select className={`${baseClass} mt-1`} {...register(name)}>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'color') {
    return (
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        <div className="flex items-center gap-2 mt-1">
          <Controller
            name={name}
            control={control}
            render={({ field: controllerField }) => (
              <input
                type="color"
                className="w-12 h-10 rounded-xl border border-gray-200 bg-white"
                {...controllerField}
              />
            )}
          />
          <input className={`${baseClass}`} {...register(name)} placeholder="#a90f35" />
        </div>
      </label>
    );
  }

  if (field.type === 'number') {
    return (
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        <input
          type="number"
          min={field.min}
          max={field.max}
          className={`${baseClass} mt-1`}
          {...register(name, { valueAsNumber: true })}
        />
      </label>
    );
  }

  return (
    <label className="block text-sm font-medium text-gray-700">
      {field.label}
      <input type="text" className={`${baseClass} mt-1`} {...register(name)} placeholder={field.placeholder} />
    </label>
  );
};

export default FormField;

