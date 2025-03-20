import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
  flag?: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Option[];
  error?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, error, register, placeholder, ...rest }) => {
  return (
    <div className="flex flex-col flex-1 mb-6">
      <label htmlFor={name} className="mb-[6px]">{label}</label>
      <select
        id={name}
        className="bg-white border border-[var(--border)] text-[#1D1F22] placeholder:text-[#999999] py-4 px-2 md:px-5"
        {...register(name)}
        {...rest}
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
