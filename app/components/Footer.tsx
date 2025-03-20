'use client';

import { useQuery } from "@tanstack/react-query";
import { NavigationData } from "@/types/navigation";
import { fetchNavigationData } from "@/services/navigationService";
import Link from "next/link";

const Footer: React.FC = () => {

    const { data } = useQuery<NavigationData, Error>({
        queryKey: ['navigation'],
        queryFn: fetchNavigationData,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24 * 7,
        refetchOnWindowFocus: false,
    })

    return (
        <footer className="bg-[#5A3A27] md:min-h-[360px] ">
            <div className="md:max-w-[1120px] md:m-auto px-4 py-10 text-white font-12">
                <div className="lg:max-h-[178px] mb-10 md:mb-15 flex flex-col sm:flex-row sm:flex-1 sm:justify-evenly lg:justify-between">
                    <nav className="flex flex-col flex-wrap gap-2 lg:grid lg:grid-flow-col lg:grid-rows-6 w-full mb-10 md:mb-0 sm:flex-1 md:flex-auto">
                    {data?.footer.map((item, index)=>(
                        <Link
                            key={index}
                            href={item.link}
                            className="text-[11px] flex-0"
                        >
                            {item.title}
                        </Link>
                    ))}
                    </nav>
                    <div className="text-[11px] lg:w-[25%] flex-1 sm:w-auto sm:flex-none">
                        <p className="lg:mb-3">Wynn and Encore Las Vegas</p>
                        <p className="lg:mb-3">3131 Las Vegas Blvd. Las Vegas, NV 89109</p>
                        <p className="lg:mb-7 mb-10"><Link href={"tel:+1 (702) 770-7000"}>+1 (702) 770-7000</Link></p>
                        <p className="lg:mb-3 mb-2">Connect with us.</p>
                        <nav className="flex gap-2 md:justify-between">
                            <Link href={''} aria-label="Facebook" className="bg-white rounded-full w-[27px] h-[27px] flex items-center justify-center">
                                <span className="sr-only">Facebook</span>
                                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.92321 15.8772V8.80481H0.553467V5.99438H2.92321V3.78002C2.92321 1.37417 4.39387 0.0646973 6.54116 0.0646973C7.57001 0.0646973 8.45364 0.141907 8.71008 0.175879V2.68982H7.22088C6.053 2.68982 5.82746 3.24573 5.82746 4.05797V5.99438H8.46291L8.10142 8.80481H5.82746V15.8772" fill="black"/>
                                </svg>
                            </Link>
                            <Link href={''} aria-label="Google Play Store" className="bg-white rounded-full w-[27px] h-[27px] flex items-center justify-center">
                                <span className="sr-only">Google Play Store</span>                                
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.78545 5.38518V8.96152C1.78545 9.43713 1.41156 9.81701 0.9357 9.81701C0.462933 9.81701 0.00561523 9.43405 0.00561523 8.96152V5.38518C0.00561523 4.91884 0.462933 4.53588 0.9357 4.53588C1.40229 4.53588 1.78545 4.91884 1.78545 5.38518ZM2.11916 10.2339C2.11916 10.7404 2.52704 11.1481 3.0338 11.1481H3.64871L3.65798 13.0351C3.65798 14.1747 5.36365 14.1654 5.36365 13.0351V11.1481H6.51312V13.0351C6.51312 14.1685 8.22806 14.1716 8.22806 13.0351V11.1481H8.85224C9.35281 11.1481 9.76069 10.7404 9.76069 10.2339V4.69338H2.11916V10.2339ZM9.78232 4.39381H2.08517C2.08517 3.07199 2.87621 1.92311 4.0504 1.32396L3.46022 0.233766C3.3737 0.0824354 3.59309 -0.0133043 3.66725 0.116408L4.2667 1.21587C5.34511 0.737172 6.58419 0.761879 7.61315 1.21587L8.20952 0.119496C8.28677 -0.0133044 8.50307 0.0855237 8.41655 0.236854L7.82636 1.32396C8.99129 1.92311 9.78232 3.07199 9.78232 4.39381ZM4.50772 2.67976C4.50772 2.50372 4.36558 2.35548 4.18327 2.35548C4.00714 2.35548 3.86809 2.50372 3.86809 2.67976C3.86809 2.8558 4.01023 3.00404 4.18327 3.00404C4.36558 3.00404 4.50772 2.8558 4.50772 2.67976ZM8.01176 2.67976C8.01176 2.50372 7.86962 2.35548 7.69658 2.35548C7.51427 2.35548 7.37214 2.50372 7.37214 2.67976C7.37214 2.8558 7.51427 3.00404 7.69658 3.00404C7.86962 3.00404 8.01176 2.8558 8.01176 2.67976ZM10.9411 4.53588C10.4745 4.53588 10.0913 4.90957 10.0913 5.38518V8.96152C10.0913 9.43713 10.4745 9.81701 10.9411 9.81701C11.4169 9.81701 11.8712 9.43405 11.8712 8.96152V5.38518C11.8712 4.90957 11.4138 4.53588 10.9411 4.53588Z" fill="black"/>
                                </svg>
                            </Link>
                            <Link href={''} aria-label="Apple Store" className="bg-white rounded-full w-[27px] h-[27px] flex items-center justify-center">
                                <span className="sr-only">Apple Store</span>                                
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.1517 7.36439C10.1456 6.23096 10.6582 5.37548 11.6959 4.74545C11.1153 3.91467 10.2382 3.45759 9.08008 3.36803C7.9837 3.28156 6.78541 4.00732 6.34686 4.00732C5.88361 4.00732 4.8212 3.39891 3.98734 3.39891C2.26403 3.42671 0.432617 4.77324 0.432617 7.51263C0.432617 8.32179 0.580859 9.15874 0.877344 10.0204C1.27266 11.1538 2.69949 13.9334 4.18809 13.887C4.96636 13.8685 5.51609 13.3342 6.52908 13.3342C7.51118 13.3342 8.02076 13.887 8.8886 13.887C10.3896 13.8654 11.6805 11.3391 12.0573 10.2026C10.0437 9.25448 10.1517 7.42307 10.1517 7.36439ZM8.40372 2.29327C9.24685 1.29264 9.16964 0.381567 9.14493 0.0541992C8.40064 0.0974365 7.53898 0.560693 7.04792 1.13204C6.50746 1.74354 6.18936 2.5002 6.2573 3.35259C7.06337 3.41436 7.7984 3.00051 8.40372 2.29327Z" fill="black"/>
                                </svg>
                            </Link>
                            <Link href={''} aria-label="Instagram" className="bg-white rounded-full w-[27px] h-[27px] flex items-center justify-center">
                                <span className="sr-only">Instagram</span>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.55343 3.4224C5.58821 3.4224 4.00304 5.00674 4.00304 6.97094C4.00304 8.93515 5.58821 10.5195 7.55343 10.5195C9.51866 10.5195 11.1038 8.93515 11.1038 6.97094C11.1038 5.00674 9.51866 3.4224 7.55343 3.4224ZM7.55343 9.27796C6.28345 9.27796 5.24522 8.24336 5.24522 6.97094C5.24522 5.69853 6.28036 4.66393 7.55343 4.66393C8.82651 4.66393 9.86165 5.69853 9.86165 6.97094C9.86165 8.24336 8.82342 9.27796 7.55343 9.27796ZM12.0772 3.27724C12.0772 3.73741 11.7064 4.10493 11.2491 4.10493C10.7886 4.10493 10.4209 3.73432 10.4209 3.27724C10.4209 2.82016 10.7917 2.44956 11.2491 2.44956C11.7064 2.44956 12.0772 2.82016 12.0772 3.27724ZM14.4286 4.11728C14.3761 3.00855 14.1227 2.02645 13.3101 1.21729C12.5005 0.408139 11.5179 0.154892 10.4086 0.0993011C9.26529 0.0344452 5.83849 0.0344452 4.6952 0.0993011C3.58899 0.151804 2.60637 0.405051 1.79371 1.21421C0.98104 2.02336 0.730752 3.00547 0.675132 4.11419C0.610242 5.25689 0.610242 8.68191 0.675132 9.82461C0.727662 10.9333 0.98104 11.9154 1.79371 12.7246C2.60637 13.5338 3.5859 13.787 4.6952 13.8426C5.83849 13.9074 9.26529 13.9074 10.4086 13.8426C11.5179 13.7901 12.5005 13.5368 13.3101 12.7246C14.1196 11.9154 14.373 10.9333 14.4286 9.82461C14.4935 8.68191 14.4935 5.25998 14.4286 4.11728ZM12.9516 11.0507C12.7106 11.656 12.244 12.1224 11.6353 12.3663C10.7238 12.7277 8.56077 12.6443 7.55343 12.6443C6.5461 12.6443 4.38002 12.7246 3.47157 12.3663C2.86593 12.1254 2.39934 11.6591 2.15523 11.0507C1.79371 10.1396 1.87714 7.97776 1.87714 6.97094C1.87714 5.96413 1.7968 3.79918 2.15523 2.8912C2.39625 2.28587 2.86284 1.81953 3.47157 1.57555C4.38311 1.21421 6.5461 1.29759 7.55343 1.29759C8.56077 1.29759 10.7268 1.21729 11.6353 1.57555C12.2409 1.81644 12.7075 2.28279 12.9516 2.8912C13.3132 3.80227 13.2297 5.96413 13.2297 6.97094C13.2297 7.97776 13.3132 10.1427 12.9516 11.0507Z" fill="black"/>
                                </svg>
                            </Link>
                            <Link href={''} aria-label="X" className="bg-white rounded-full w-[27px] h-[27px] flex items-center justify-center">
                                <span className="sr-only">X</span>                                
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9442 0.547119H14.1246L9.36235 5.98884L14.9647 13.3948H10.5792L7.14181 8.90427L3.21339 13.3948H1.02991L6.12264 7.57318L0.751953 0.547119H5.24863L8.35245 4.65157L11.9442 0.547119ZM11.1783 12.0915H12.3859L4.59081 1.78247H3.29369L11.1783 12.0915Z" fill="black"/>
                                </svg>
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className="md:text-center flex flex-col md:gap-[10px]">
                    <p className="text-[12px]">Do Not Sell Or Share My Data</p>
                    <p className="text-[12px]">© 2024 Wynn Resorts Holdings, LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;