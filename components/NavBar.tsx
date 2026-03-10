"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarProps {
    onConnectClick?: () => void;
}

export const NavBar = ({ onConnectClick }: NavBarProps) => {
    const pathname = usePathname();

    const getLinkClass = (path: string) => {
        const isActive = pathname === path;
        return `text-[10px] md:text-xs uppercase tracking-widest cursor-pointer transition-colors font-bold pb-1 border-b ${
            isActive 
                ? 'text-[#F2F2ED] border-[#F2F2ED]' 
                : 'text-zinc-400 border-transparent hover:text-white hover:border-white'
        }`;
    };

    return (
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
            </Link>            <div className="relative group flex items-center h-full">
                <span 
                    onClick={onConnectClick}
                    className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold pb-1 border-b border-transparent hover:border-white inline-block"
                >
                    Connect
                </span>
                <div className="absolute right-0 top-full pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto flex flex-col gap-2 min-w-max items-end">
                    <a href="https://github.com/wwaiyyee" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                        GitHub ↗
                    </a>
                    <a href="https://www.linkedin.com/in/lee-wai-yee/" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                        LinkedIn ↗
                    </a>
                </div>
            </div>
        </nav>
    );
};
