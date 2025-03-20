import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, error, register, ...rest }) => {
  return (
    <div className="flex flex-col flex-1 mb-6">
      {label && <label htmlFor={name} className="mb-[6px]">{label}</label>}
      <input
        id={name}
        className="bg-white border border-[var(--border)] text-[#1D1F22] placeholder:text-[#999999] py-4 px-2 md:px-5"
        placeholder={rest.placeholder}
        {...register(name)}
        {...rest}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
