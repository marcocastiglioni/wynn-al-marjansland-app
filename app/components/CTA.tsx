import NewsletterSuscriptionForm from "./NewsletterSuscriptionForm";

const CTA = () => {
    return (
        <div className="bg-white py-5 flex justify-center">
            <div className="max-w-[1300px] w-full flex flex-col lg:flex-row justify-around items-center px-4 lg:px-0">
                <h2 className="text-[21px] border-none lg:m-0 p-0 flex-1 lg:w-full lg:max-w-1/3">Get News & Updates</h2>
                <p className="text-[#565759] mb-8 lg:m-0 lg:pr-8 lg:w-full lg:max-w-1/3">Get latest developments and exciting news on how we are shaping the future!</p>
                <NewsletterSuscriptionForm />
            </div>
        </div>
    )
}

export default CTA;