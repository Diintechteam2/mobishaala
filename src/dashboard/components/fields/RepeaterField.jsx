import React from 'react';
import { useFieldArray } from 'react-hook-form';
import FormField from './FormField';

const RepeaterField = ({ field, control, name, register }) => {
  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <div className="border border-gray-200 rounded-2xl p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-700">{field.label}</div>
          {field.description && <p className="text-xs text-gray-500">{field.description}</p>}
        </div>
        <button
          type="button"
          onClick={() => append(field.fields ? {} : '')}
          className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          Add
        </button>
      </div>
      <div className="space-y-3">
        {fields.map((item, index) => (
          <div key={item.id} className="border border-dashed border-gray-200 rounded-2xl p-3 space-y-3 relative">
            <div className="text-xs font-semibold text-gray-500">
              {field.itemLabel || 'Item'} #{index + 1}
            </div>
            {field.fields ? (
              field.fields.map((child) => (
                <FormField
                  key={child.name}
                  field={child}
                  control={control}
                  register={register}
                  path={`${name}.${index}`}
                />
              ))
            ) : (
              <input className="w-full rounded-2xl border border-gray-200 px-3 py-2 text-sm" {...register(`${name}.${index}`)} />
            )}
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-xs text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="text-xs text-gray-400 border border-dashed border-gray-200 rounded-2xl p-3 text-center">
            No items yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default RepeaterField;

