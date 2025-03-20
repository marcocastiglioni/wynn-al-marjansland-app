'use client';

import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Controller, useFormContext } from 'react-hook-form';
import countryOptions from '@/data/countries.json';

interface Country {
  value: string;
  label: string;
  code: string;
  mask: string;
  flag?: string;
}

interface PhoneNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  countryName: string;
  phoneName: string;
  errorCountry?: string;
  errorPhone?: string;
  cssModifier?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  countryName,
  phoneName,
  errorCountry,
  errorPhone,
  cssModifier = "",
  ...rest
}) => {
  
  const { control, watch, setValue } = useFormContext();
  const countries: Country[] = countryOptions;
  const [selectedCountry, setSelectedCountry] = useState<Country |  null>(null);

  const countryValue = watch(countryName);
  
  useEffect(() => {
    if (countryValue) {
      const found = countries.find(c => c.code === countryValue);
      setSelectedCountry(found || null);
    } else {
      setSelectedCountry(null);
    }
  }, [countryValue, countries]);


  return (
    <div className={`flex flex-col flex-1 ${cssModifier}`}>
      <label className="mb-2">{label}</label>
      <div className="flex space-x-2 py-2 md:p-5 items-center bg-white border border-gray-300">
        
      <Controller
          name={countryName}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value, ref } }) => (
            <select
              id={countryName}
              ref={ref}
              value={value}
              onChange={(e) => {
                const selected = countries.find((c) => c.code === e.target.value) || null;
                setSelectedCountry(selected);
                onChange(selected ? selected.code : "");
              }}
              className="text-[32px] text-[#1D1F22] "
            >
              <option></option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag ? country.flag : country.label}
                </option>
              ))}
            </select>
          )}
        />
        
        <span className="text-[#1D1F22] placeholder:text-[#999999]">{selectedCountry ? selectedCountry.code : ''}</span>
        
        <Controller
          name={phoneName}
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <IMaskInput
              mask={selectedCountry ? selectedCountry.mask : ''}
              lazy={false} 
              placeholderChar="_"
              placeholder="Phone number"
              unmask={true}
              onAccept={(val: string) => onChange(val)}
              onBlur={onBlur}
              value={value}
              inputRef={ref}
              disabled={!selectedCountry}
              className="text-[#1D1F22] placeholder:text-[#999999]"
              {...rest}
            />
          )}
        />
      </div>
      {errorCountry && <p className="text-red-500 text-sm mt-1">{errorCountry}</p>}
      {errorPhone && <p className="text-red-500 text-sm mt-1">{errorPhone}</p>}
    </div>
  );
};

export default PhoneNumberInput;
