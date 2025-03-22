'use client';

import React, { useEffect, useState } from 'react';
import { FormData } from '@/types/formData';

interface OTPVerificationProps {
  step: number;
  deliveryMethod?: 'phone' | 'email' | '';
  setDeliveryMethod?: (value: 'phone' | 'email' | '') => void;
  otpDigits?: string[];
  setOtpDigits?: (value: string[]) => void;
  formData?: FormData;
  otpError?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = (props) => {
  const { step, deliveryMethod, setDeliveryMethod, otpDigits, setOtpDigits, formData, otpError } = props;
  const [ error, setError ] = useState(otpError || "");
  const deliveryDestination = deliveryMethod === 'email' ? formData?.email : `${formData?.phoneCountry} ${formData?.phoneNumber}`;

  useEffect(()=>{
    setError(otpError || "");
  },[otpError])

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setDeliveryMethod) {
      setDeliveryMethod(e.target.value as 'phone' | 'email');
      setError('');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (otpDigits && setOtpDigits) {
      const newOtp = [...otpDigits];
      newOtp[index] = value.replace(/\D/g, '');
      setOtpDigits(newOtp);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[var(--background)] mb-10">
      {step === 2 && (
        <div className='flex flex-col items-center'>
          <h3 className='mb-4'>Send Code</h3>
          <p className="mb-5">How would you like to receive the code?</p>
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:gap-5">
            <label className="py-4 sm:py-7 pr-8 pl-4 font-mono font-semibold">
              <input
                type="radio"
                name="deliveryMethod"
                value="phone"
                checked={deliveryMethod === 'phone'}
                onChange={handleDeliveryChange}
                className="mr-2"
              />
              Send to Phone
            </label>
            <label className="py-4 sm:py-7 pr-8 pl-4 font-mono font-semibold">
              <input
                type="radio"
                name="deliveryMethod"
                value="email"
                checked={deliveryMethod === 'email'}
                onChange={handleDeliveryChange}
                className="mr-2"
              />
              Send to Email
            </label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
      )}
      {step === 3 && (
        <div className='flex flex-col items-center'>
          <h3 className='mb-4'>Please check your {deliveryMethod}.</h3>
          <p className="mb-5">We&apos;ve sent a code to {deliveryDestination}</p>
          <div className="flex justify-center space-x-3 mb-4">
            {otpDigits &&
              otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className={`w-[80px] h-[80px] text-center border-1 rounded-lg text-[var(--border-secondary)] text-[48px] font-semibold ${error ? 'border-red-500' : 'border-[var(--border-secondary)]'}`}
                />
              ))}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <p>Didn’t get a code? <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                alert('Code resent'); 
              }} 
              className="text-blue-500 underline"
            >
              Click to resend
            </a>
          </p>
          
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
