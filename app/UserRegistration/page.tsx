import CTA from '../components/CTA';
import RegistrationFlow from '@/components/RegistrationFlow';

const UserRegistrationPage: React.FC = () => {
    return (
        <>
            <div className='max-w-[630px] flex flex-col justify-center m-auto px-4 lg:px-0 py-15'>
                <RegistrationFlow />
            </div>

            {/* CTA Banner for Newsletter Susbcription */}
            <CTA />
        </>
    )
}

export default UserRegistrationPage;