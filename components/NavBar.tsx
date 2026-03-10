"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanyardModal } from './Lanyard';
import { Menu, X } from 'lucide-react';

interface NavBarProps {
    onConnectClick?: () => void;
}

export const NavBar = ({ onConnectClick }: NavBarProps) => {
    const pathname = usePathname();
    const [isLanyardOpen, setIsLanyardOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleConnectClick = () => {
        setIsMobileMenuOpen(false);
        if (onConnectClick) {
            onConnectClick();
        } else {
            setIsLanyardOpen(true);
        }
    };

    const getLinkClass = (path: string, isMobile = false) => {
        const isActive = pathname === path;
        const sizeClass = isMobile ? 'text-sm' : 'text-[10px] md:text-xs';
        return `${sizeClass} uppercase tracking-widest cursor-pointer transition-colors font-bold pb-1 border-b ${
            isActive 
                ? 'text-[#F2F2ED] border-[#F2F2ED]' 
                : 'text-zinc-400 border-transparent hover:text-white hover:border-white'
        }`;
    };

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <button 
                className="fixed top-8 right-6 z-[60] md:hidden mix-blend-difference text-[#F2F2ED] p-2 pointer-events-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Full-Screen Menu */}
            <nav className={`fixed inset-0 bg-[#111111]/98 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out md:hidden pointer-events-auto ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                <Link href="/" className={getLinkClass('/', true)} onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/about" className={getLinkClass('/about', true)} onClick={() => setIsMobileMenuOpen(false)}>
                    About
                </Link>
                <Link href="/work" className={getLinkClass('/work', true)} onClick={() => setIsMobileMenuOpen(false)}>
                    Work
                </Link>
                <Link href="/case-studies" className={getLinkClass('/case-studies', true)} onClick={() => setIsMobileMenuOpen(false)}>
                    Case Studies
                </Link>            
                <span
                    onClick={handleConnectClick}
                    className="text-sm uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold pb-1 border-b border-transparent hover:border-white inline-block"
                >
                    Connect
                </span>
            </nav>

            {/* Desktop Nav */}
            <nav className="fixed top-12 right-12 z-50 hidden md:flex gap-6 md:gap-8 items-center mix-blend-difference pointer-events-auto whitespace-nowrap">
                <Link href="/" className={getLinkClass('/')}>
                    Home
                </Link>
                <Link href="/about" className={getLinkClass('/about')}>
                    About
                </Link>
                <Link href="/work" className={getLinkClass('/work')}>
                    Work
                </Link>
                <Link href="/case-studies" className={getLinkClass('/case-studies')}>
                    Case Studies
                </Link>            
                <div className="relative group flex items-center h-full">
                    <span
                        onClick={handleConnectClick}
                        className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold pb-1 border-b border-transparent hover:border-white inline-block"
                    >
                        Connect
                    </span>
                </div>
            </nav>

            {/* Render Lanyard outside of the mix-blend-difference nav to prevent rendering issues */}
            <LanyardModal open={isLanyardOpen} onClose={() => setIsLanyardOpen(false)} />
        </>
    );
};