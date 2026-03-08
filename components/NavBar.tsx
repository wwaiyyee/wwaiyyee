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
            <div className="relative group">
                <div className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium cursor-pointer">Connect</div>
                <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto flex flex-row gap-2 min-w-max">
                    <a href="https://github.com/wwaiyyee" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/lee-wai-yee/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-transparent border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </nav>
    );
};
