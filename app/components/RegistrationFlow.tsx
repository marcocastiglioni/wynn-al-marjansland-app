'use client';

import React, { useRef, useState } from 'react';
import { FormData } from '@/types/formData';
import { OtpResponse } from '@/types/servicesData';
import UserRegistrationForm from '@/components/UserRegistrationForm';
import OTPVerification from '@/components/OTPVerification';
import Loading from '@/components/Loading';
import { registerUser } from '@/services/registrationService';
import { sendOtp, verifyOtp } from '@/services/otpService';

const RegistrationFlow: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'phone' | 'email' | ''>('');
  const [otpResponse, setOtpResponse] = useState<OtpResponse | null>(null);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const registrationContainerRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setDeliveryMethod( deliveryMethod || '');
    setOtpDigits(otpDigits || ['', '', '', '']);
    setStep(2);
  };

  const handleNext = async () => {
    setError('');
    scrollToTop();
    
    // Request OPT Code
    if (step === 2) {
      if (!deliveryMethod) {
        setError('Please select a delivery method.');
        return;
      }

      try {
        setLoading(true);
        const response: OtpResponse = await sendOtp({
          email: formData?.email,
          phone: `${formData?.phoneCountry} ${formData?.phoneNumber}`,
          deliveryMethod,
        });
        console.log('OTP sent response:', otpResponse);
        setOtpResponse(response);
        setError('');
        setStep(3);
      } catch (err: unknown) {
        let errorMessage = 'Error sending OTP';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }

    // OPT Code Verification and 
    } else if (step === 3) {

        try {
            setLoading(true);

            if ( !otpDigits.join('') ) {
                setError(`Please enter the verification code sent to ${deliveryMethod === 'email' ? formData?.email : `${formData?.phoneCountry} ${formData?.phoneNumber}` }.`);
                setLoading(false);
                return;
            }

            const verifyResponse = await verifyOtp({
              otp: otpDigits.join(''),
            });

            if ( verifyResponse ) {

              if (!formData) {
                setLoading(false);
                setError("Form data is missing");
                return;
              }

              // User Registration
              try {
                const regResponse = await registerUser(formData);
                console.log('Registration response:', regResponse);
                setStep(4);

              } catch (err: unknown) {
                setLoading(false);
                let errorMessage = 'Registration error';
                if (err instanceof Error) {
                  errorMessage = err.message;
                }
                setError(errorMessage);
              }
            }
            setLoading(false);

        } catch (err: unknown) {
          setLoading(false);
          let errorMessage = 'OTP verification failed';
          if (err instanceof Error) {
            errorMessage = err.message;
          }
          setError(errorMessage);
        }
        return;
    }
  };

  const scrollToTop = () => {
    if (registrationContainerRef.current) {
      registrationContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setError('');
    if ( step > 1 ) setStep((prev) => prev -1);
    scrollToTop();
  };

  return (
    <>
        <div ref={registrationContainerRef} className="flex flex-col md:flex-row justify-between mb-6 md:mb-10">
            <div className='mb-6 md:mb-0'>
                <h1 className='mb-6 md:mb-8'>Registration</h1>
                {step !== 4 && <p className=''>Please enter below information to create your account.</p>}
            </div>
            <div>
                <p className='text-2xl font-sans font-medium text-[var(--healine) text-[var(--healine)] dark:text-[var(--base)]'>Step {step} of 4</p>
            </div>
        </div>
        {step === 1 && (
            <UserRegistrationForm onNext={handleFormSubmit} defaultValues={formData || undefined} scrollToTop={scrollToTop} />
        )}
        {step === 2 && formData && (
            <OTPVerification 
                step={2}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                otpError={error}
            />
        )}
        {step === 3 && formData && (
            <OTPVerification 
                step={3}
                otpDigits={otpDigits}
                setOtpDigits={setOtpDigits}
                formData={formData}
                deliveryMethod={deliveryMethod}
                otpError={error}
            />
        )}
        {step === 4 && (
            <div className="p-6 bg-white dark:bg-[var(--background)] mb-10 text-center min-h-[256px] flex justify-center items-center">
                <h3>User Registered</h3>
            </div>
        )}


        {step > 1 && <div className="flex justify-between w-full sm:w-auto flex-col sm:flex-row gap-5 sm:gap-0">
            {step !== 1 && (
                <button onClick={handleBack} className='rounded text-[var(--primary)] border border-[var(--primary)]'>Back</button>
            )}
            {step !== 4 && (
                <button onClick={handleNext} className='rounded text-white bg-[var(--primary)]'>Next</button>
            )}
        </div>}

        {loading && <Loading loading={loading} />}

    </>
  );
};

export default RegistrationFlow;
