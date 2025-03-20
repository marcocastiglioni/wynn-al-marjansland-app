'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchNavigationData } from '@/app/services/navigationService';
import { NavigationData } from '@/types/navigation';

const Header: React.FC = () => {
    const [ isMobileMenuOpen, setMobileMenuOpen ] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const { data } = useQuery<NavigationData, Error>({ 
        queryKey: ['navigation'], 
        queryFn: fetchNavigationData, 
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24 * 7,
        refetchOnWindowFocus: false,
    });

    return (
        <header className="sticky top-0 z-50 p-4 sm:py-6 sm:px-15 bg-white dark:bg-black shadow-md">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full flex justify-between">
                
                {/* Logo */}
                <div className="flex-shrink-0 ">
                    <Link href="/" aria-label="Inicio">
                        <Image
                        src="/logo.svg"
                        alt="Wynn Al Marjan Island logo"
                        width={150}
                        height={150}
                        className={`object-contain transition-all duration-300 h-full w-full`}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex space-x-8 items-center">
                {data?.header.map(( item, index ) => (
                    <Link key={index} href={item.link} className="text-base uppercase font-medium text-[var(--foreground)] dark:text-white hover:underline">
                        {item.title}
                    </Link>
                ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-[var(--foreground)] dark:text-white hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary-color)]"
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Abrir menú</span>
                        {isMobileMenuOpen ? (
                        <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        ) : (
                        <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <nav id="mobile-menu" className="lg:hidden bg-white dark:bg-[var(--primary-variant-8)] h-screen py-15 flex flex-col gap-8">
                    {data?.header.map(( item, index ) => (
                        <Link key={index} href={item.link} className="text-base uppercase font-medium text-[var(--foreground)] dark:text-white hover:text-[var(--primary-color-hover)]">
                            {item.title}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
};

export default Header;
