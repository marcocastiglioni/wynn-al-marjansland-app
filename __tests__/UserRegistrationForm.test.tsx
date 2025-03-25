import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserRegistrationForm from '@/app/components/UserRegistrationForm';
import { UserFormData } from '@/app/types/formData';

describe('UserRegistrationForm Component', () => {
  const onNextMock = jest.fn();
  const scrollToTopMock = jest.fn();

  beforeEach(() => {
    onNextMock.mockClear();
    scrollToTopMock.mockClear();
  });

  test('Should submits the form with correct values', async () => {
    render(<UserRegistrationForm onNext={onNextMock} scrollToTop={scrollToTopMock} />);

    const user = userEvent.setup();

    // Personal Info
    await user.type(screen.getByLabelText(/First Name/i), 'John');
    await user.type(screen.getByLabelText(/Last Name/i), 'Doe');

    // Gender select
    const genderSelect = screen.getByLabelText(/Gender/i) as HTMLSelectElement;
    fireEvent.change(genderSelect, { target: { value: 'female' } });

    // Country select
    const countrySelectCandidates = screen.getAllByLabelText(/Country/i);
    const countrySelect = countrySelectCandidates.find(
      (el) => el.getAttribute('id') === 'country'
    ) as HTMLSelectElement;
    expect(countrySelect).toBeInTheDocument();
    fireEvent.change(countrySelect, { target: { value: 'US' } });

    // Contact Details
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');

    // Phone number fields
    const phoneCountrySelect = screen.getByRole('combobox', { name: /phoneCountry/i }) as HTMLSelectElement;
    if (phoneCountrySelect) {
      fireEvent.change(phoneCountrySelect, { target: { value: '+1' } });
    }
    await user.type(screen.getByPlaceholderText(/Phone number/i), '1234567890');

    // Terms and Conditions checkbox
    const termsCheckbox = screen.getByRole('checkbox', { name: /I agree to the terms/i });
    fireEvent.click(termsCheckbox);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onNextMock).toHaveBeenCalledTimes(1);
    });

    const submittedData: UserFormData = onNextMock.mock.calls[0][0];
    expect(submittedData.firstName).toBe('John');
    expect(submittedData.lastName).toBe('Doe');
    expect(submittedData.gender).toBe('female');
    expect(submittedData.country).toBe('US');
    expect(submittedData.email).toBe('john@example.com');
    expect(submittedData.phoneNumber).toBe('1234567890');
    expect(submittedData.terms).toBe(true);
  });
});
