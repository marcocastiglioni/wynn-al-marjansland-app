import { SendOtpData, OtpResponse, VerifyOtpData, VerifyOtpResponse } from '@/types/servicesData';

export async function sendOtp(data: SendOtpData): Promise<OtpResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send OTP: ${errorBody}`);
  }
  return response.json();
}
  
export async function verifyOtp(data: VerifyOtpData): Promise<VerifyOtpResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OTP verification failed: ${errorBody}`);
  }
  return response.json();
}
