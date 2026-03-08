import React from 'react';

export const NavBar = () => {
    return (
        <nav className="fixed top-6 w-full px-6 md:px-12 flex justify-between items-center z-50 mix-blend-difference">
            <div className="font-bold text-xl md:text-2xl tracking-tighter hover:italic cursor-pointer transition-all text-white">
                Portfolio
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-12 text-sm md:text-base font-medium text-white">
                <a href="#about" className="hover:line-through">About</a>
                <a href="#work" className="hover:line-through">Work</a>
                <a href="#connect" className="hover:line-through">Case Studies</a>
            </div>
            <div className="flex gap-2">
                <div className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">Connect</div>
            </div>
        </nav>
    );
};
