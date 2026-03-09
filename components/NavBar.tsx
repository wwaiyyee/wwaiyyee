import React, { useState } from 'react';
import Link from 'next/link';

export const NavBar = () => {
    return (
        <nav className="fixed top-12 right-12 z-50 flex gap-6 md:gap-8 items-center mix-blend-difference pointer-events-auto">
            <Link href="/" className="text-[10px] md:text-xs uppercase tracking-widest text-[#F2F2ED] hover:text-white cursor-pointer transition-colors font-bold">
                Home
            </Link>
            <Link href="/about" className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold">
                About
            </Link>
            <Link href="/work" className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold">
                Work
            </Link>
            <Link href="/#connect" className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold">
                Case Studies
            </Link>
            
            <div className="relative group">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold pb-1 border-b border-transparent hover:border-white">
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
            
            <div className="w-2.5 h-2.5 bg-white rounded-full ml-2"></div>
        </nav>
    );
};
