import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface FormData  {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  terms: boolean
};

export interface FormInputProps<T extends FieldValues = FormData> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: string;
  error?: string;
  register: UseFormRegister<T>;
  placeholder?: string;
}

export interface OptionItem {
  value: string;
  label: string;
  flag?: string;
}

export interface FormSelectProps<T extends FieldValues = FormData> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: OptionItem[];
  error?: string;
  register: UseFormRegister<T>;
  placeholder?: string;
}

export interface UserRegistrationFormProps {
  onNext: ( data: FormData ) => void;
  defaultValues?: FormData;
}

export interface CountryData {
  value: string;
  code: string;
  phoneRegex: string;
  countryCodeRegex: string;
}