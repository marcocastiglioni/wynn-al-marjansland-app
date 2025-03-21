export interface SendOtpData {
    email?: string;
    phone?: string;
    deliveryMethod: 'phone' | 'email';
}

export interface OtpResponse {
    message: string;
    deliveryMethod: 'phone' | 'email';
}

export interface VerifyOtpData {
    otp: string;
}

export interface VerifyOtpResponse {
    message: string;
    verified: boolean;
}

export interface RegistrationResponse {
  message: string;
  data: FormData;
}
