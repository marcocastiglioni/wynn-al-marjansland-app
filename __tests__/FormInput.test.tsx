import { render, screen } from "@testing-library/react";
import FormInput from "@/app/components/FormInput";
import { UserFormData, FormInputProps } from "@/app/types/formData";
import { registerStub } from "./helpers/testHelpers";

describe('Input Label Component', () => {
    const defaultProps: FormInputProps<UserFormData> = {
        label: "First Name",
        name: "firstName",
        error: "",
        register: registerStub,
        placeholder: "Enter first name"
    };

    test('Input and label should renders', () => {
        render(<FormInput {...defaultProps} />);
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter first name/i)).toBeInTheDocument();
    })
});