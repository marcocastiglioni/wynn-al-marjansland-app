import React from 'react';
import { FormSelectProps } from '@/types/formData';
import { FieldValues } from 'react-hook-form';

const FormSelect = <T extends FieldValues = FormData>({ 
  label, 
  name, 
  options, 
  error, 
  register, 
  placeholder, 
  ...rest 
}: FormSelectProps<T>) => {
  const registeredProps = register(name);
  return (
    <div className="flex flex-col flex-1 mb-6">
      <label htmlFor={name} className="mb-[6px]">{label}</label>
      <select
        id={name}
        className="bg-white dark:bg-[var(--input-dark)] border border-[var(--border)] text-[#1D1F22] placeholder:text-[#999999] py-4 px-2 md:px-5"
        {...register(name)}
        {...rest}
        {...registeredProps}
      >
        <option value="" className='text-[#1D1F22] placeholder:text-[#999999]'>{placeholder ? placeholder : `Select ${label}...`}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className='text-[#1D1F22]'>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default FormSelect;
