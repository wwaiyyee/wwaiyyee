"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanyardModal } from './Lanyard';

interface NavBarProps {
    onConnectClick?: () => void;
}

export const NavBar = ({ onConnectClick }: NavBarProps) => {
    const pathname = usePathname();
    const [isLanyardOpen, setIsLanyardOpen] = useState(false);

    const handleConnectClick = () => {
        if (onConnectClick) {
            onConnectClick();
        } else {
            setIsLanyardOpen(true);
        }
    };

    const getLinkClass = (path: string) => {
        const isActive = pathname === path;
        return `text-[10px] md:text-xs uppercase tracking-widest cursor-pointer transition-colors font-bold pb-1 border-b ${
            isActive 
                ? 'text-[#F2F2ED] border-[#F2F2ED]' 
                : 'text-zinc-400 border-transparent hover:text-white hover:border-white'
        }`;
    };

    return (
        <>
            <nav className="fixed top-12 right-12 z-50 flex gap-6 md:gap-8 items-center mix-blend-difference pointer-events-auto whitespace-nowrap">
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