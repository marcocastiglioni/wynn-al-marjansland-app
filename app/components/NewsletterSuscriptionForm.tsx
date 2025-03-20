interface NewsletterSuscriptionFormProps {
    variation?: 'horizontal' | 'vertical';
}

const NewsletterSuscriptionForm: React.FC<NewsletterSuscriptionFormProps> = ({ variation = 'horizontal' }) => {
    return (
        <div className={`flex lg:w-full md:flex-[10%] justify-center lg:justify-between border border-[#E8E9E9] rounded px-5 py-3 gap-4 ${variation === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
            <input className="text-[14px] max-w-[187] w-full" placeholder="Your email address" />
            <button className="text-[#006F62] border border=[#006F62] rounded text-[14px] font-normal p-3">Join the Newsletter</button>
        </div>
    )
};

export default NewsletterSuscriptionForm;