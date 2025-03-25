import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import PhoneNumberInput from '@/app/components/PhoneNumberInput';
import { UserFormData } from '@/app/types/formData';

// Wrapper to provide react-hook-form context
const Wrapper: React.FC<{ defaultValues?: Partial<UserFormData>; children: React.ReactNode }> = ({ children, defaultValues }) => {
  const methods = useForm<UserFormData>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('PhoneNumberInput Component', () => {
  const defaultProps = {
    label: 'Phone Number',
    countryName: 'phoneCountry',
    phoneName: 'phoneNumber',
    errorCountry: '',
    errorPhone: '',
  };

  test('Should do a basic renders of label, select, phone input, and span correctly', () => {
    render(
      <Wrapper defaultValues={{ phoneCountry: '', phoneNumber: '' }}>
        <PhoneNumberInput {...defaultProps} />
      </Wrapper>
    );
    // Check that the label is rendered
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
    // Check that the select is rendered (by role "combobox")
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    // Check that the phone input is rendered
    expect(screen.getByPlaceholderText(/Phone number/i)).toBeInTheDocument();
    // The span should be rendered (even if initially empty)
    expect(screen.getByTestId('country-code-display')).toBeInTheDocument();
  });

  test('Shold updates the displayed country code when a country is selected', () => {
    // Render with empty initial values.
    render(
      <Wrapper defaultValues={{ phoneCountry: '', phoneNumber: '' }}>
        <PhoneNumberInput {...defaultProps} />
      </Wrapper>
    );

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: '+1' } });
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  test('Should focuses the select when phone input is empty after clicking on the container', () => {
    render(
      <Wrapper defaultValues={{ phoneCountry: '', phoneNumber: '' }}>
        <PhoneNumberInput {...defaultProps} />
      </Wrapper>
    );

    const container = screen.getByText(/Phone Number/i).parentElement;
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    const focusSpy = jest.spyOn(selectElement, 'focus');
    fireEvent.click(container!);
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('Should not trigger select focus when clicking on phone input', () => {
    render(
      <Wrapper defaultValues={{ phoneCountry: '', phoneNumber: '' }}>
        <PhoneNumberInput {...defaultProps} />
      </Wrapper>
    );
    const phoneInput = screen.getByPlaceholderText(/Phone number/i);
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    const focusSpy = jest.spyOn(selectElement, 'focus');
    fireEvent.click(phoneInput);
    expect(focusSpy).not.toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
