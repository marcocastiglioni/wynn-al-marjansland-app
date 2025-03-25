import { UserFormData } from "@/app/types/formData";
import { UseFormRegister } from "react-hook-form";

export const registerStub = ((name: string ) => {
    return {
      onChange: jest.fn(() => Promise.resolve(true)),
      onBlur: jest.fn(() => Promise.resolve(true)),
      ref: jest.fn(),
      name,
    };
  }) as unknown as UseFormRegister<UserFormData>;