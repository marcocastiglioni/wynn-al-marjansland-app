import React from 'react';
import { FormInputProps } from '@/types/formData';
import { FieldValues } from 'react-hook-form';

const FormInput = <T extends FieldValues = FormData>({ label, name, error, register, ...rest }: FormInputProps<T>) => {
  const registeredProps = register(name);
  return (
    <div className="flex flex-col flex-1 mb-6">
      {label && <label htmlFor={name as string} className="mb-[6px]">{label}</label>}
      <input
        id={name as string}
        className="bg-white border border-[var(--border)] text-[#1D1F22] placeholder:text-[#999999] py-4 px-2 md:px-5"
        placeholder={rest.placeholder}
        {...rest}
        {...registeredProps}
        />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
