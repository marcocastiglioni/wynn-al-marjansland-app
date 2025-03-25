import { object, string, boolean } from 'yup';
import { UserFormData, CountryData } from '@/types/formData';
import countries from '@/data/countries.json';

const phoneCountryValidation = string()
  .required('Country Code is required')
  .test('valid-country-code', 'Invalid Country Code', function (value) {
    return countries.some((c: CountryData) => c.code === value);
  });

const phoneNumberValidation = string()
  .required('Phone Number is required')
  .test('valid-phone', 'Invalid Phone Number', function (value) {
    const { phoneCountry } = this.parent as UserFormData;
    const country = countries.find((c: CountryData) => c.code === phoneCountry);
    if (!country) return false;
    const regex = new RegExp(country.phoneRegex);
    return regex.test(value || '');
  });

export const registrationSchema = object({
  firstName: string().required('Name is required'),
  lastName: string().required('Last name is required'),
  gender: string()
    .oneOf(['male', 'female', 'other'], 'Gender must be Male, Female or Other')
    .required('Gender is required'),
  country: string().required('Country is required'),
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  phoneCountry: phoneCountryValidation,
  phoneNumber: phoneNumberValidation,
  terms: boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
    .defined(),
}).required();
