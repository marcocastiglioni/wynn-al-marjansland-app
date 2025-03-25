import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@/utils/validationSchema';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import genderOptionsData from '@/data/gender.json';
import countryOptions from '@/data/countries.json';
import { UserFormData, UserRegistrationFormProps } from '../types/formData';

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({ onNext, defaultValues, scrollToTop }) => {
    const methods = useForm<UserFormData>({
        resolver: yupResolver(registrationSchema),
        mode: 'onBlur',
        defaultValues,
    });

    const onSubmit = (data: UserFormData) => {
        onNext(data);
        if ( scrollToTop ) scrollToTop();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <h2>Personal Info</h2>
                <div className='flex md:gap-6 flex-col md:flex-row'>

                    {/* First Name */}
                    <FormInput
                        label="First Name"
                        name="firstName"
                        placeholder="Enter first name..."
                        register={methods.register}
                        error={methods.formState.errors.firstName?.message}
                    />

                    {/* Last Name */}
                    <FormInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter last name..."
                        register={methods.register}
                        error={methods.formState.errors.lastName?.message}
                    />
                </div>

                {/* Gender */}
                <FormSelect
                    label="Gender"
                    name="gender"
                    options={genderOptionsData}
                    register={methods.register}
                    error={methods.formState.errors.gender?.message}
                />

                {/* Country Field */}
                <FormSelect
                    label="Country"
                    name="country"
                    options={countryOptions}
                    register={methods.register}
                    error={methods.formState.errors.country?.message}
                    placeholder="Select residence country..."
                />

                <h2 className='mt-2'>Contact Details</h2>

                {/* Email Field */}
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address..."
                    register={methods.register}
                    error={methods.formState.errors.email?.message}
                />

                {/* Phone Number field */}
                <PhoneNumberInput
                    label="Phone Number"
                    countryName="phoneCountry"
                    phoneName="phoneNumber"
                    errorCountry={methods.formState.errors.phoneCountry?.message as string}
                    errorPhone={methods.formState.errors.phoneNumber?.message as string}
                    cssModifier="mb-6 md:mb-8"
                />

                {/* Terms and Conditions and Privacy Policy */}
                <div className='mb-[43px]'>
                    <label><input type="checkbox" {...methods.register('terms')} className='mr-2' />I agree to the terms and conditions and privacy policy</label>
                    {methods.formState.errors.terms && <p className="text-red-500 mt-1 text-sm">{methods.formState.errors.terms.message}</p>}
                </div>
                
                <button type="submit" className='bg-[var(--primary)] text-white rounded'>Next</button>

            </form>
        </FormProvider>
    )
}

export default UserRegistrationForm;