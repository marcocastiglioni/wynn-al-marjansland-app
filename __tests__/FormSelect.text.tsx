import FormSelect from "@/app/components/FormSelect";
import { FormSelectProps, UserFormData } from "@/app/types/formData";
import { registerStub } from "./helpers/testHelpers";
import { fireEvent, render, screen } from "@testing-library/react";
import { UseFormRegister } from "react-hook-form";

describe('Form Select Component', () => {
    const options = [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'},
        {value: 'other', label: 'Other'},
    ];

    const defaultProps: FormSelectProps<UserFormData> = {
        label: 'Gender',
        name: 'gender',
        error: '',
        register: registerStub,
        options,
        placeholder: 'Select gender',
    };
    
    test('Form Select Component should renders label and select element with placeholder and options', () => {
        render(<FormSelect {...defaultProps} />);
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(screen.getByText(/Select gender/i)).toBeInTheDocument();
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        })
    });

    test('Displays error message when error prop is provided', () => {
        render(<FormSelect {...defaultProps} error="Gender is required" />);
        expect(screen.getByText(/Gender is required/i)).toBeInTheDocument();
    });

    test('Selector calls onChange when visitor selects an option', () => {
        const onChangeMock = jest.fn(() => Promise.resolve(true));
        const registerWithMock = ((name: string) => ({
            onChange: onChangeMock,
            onBlur: jest.fn(() => Promise.resolve(true)),
            ref: jest.fn(),
            name,
        })) as unknown as UseFormRegister<UserFormData>;
        
        render(<FormSelect {...defaultProps} register={registerWithMock} />);
        const selectElement = screen.getByLabelText(/Gender/i);
        fireEvent.change( selectElement, { target: { value: 'female' }});
        expect(onChangeMock).toHaveBeenCalled();
    });
});