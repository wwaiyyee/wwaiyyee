"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Aperture } from 'lucide-react';
import { PROJECTS, ACHIEVEMENTS } from './projects';
import { Marquee } from './Marquee';

const SCATTERED_ITEMS = [
    { id: 1, src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400", type: "image", top: "5%", left: "5%", rotate: "-15deg", speed: 0.15, label: "01" },
    { id: 2, src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400", type: "image", top: "10%", right: "8%", rotate: "8deg", speed: -0.1, label: "02" },
    { id: 3, src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400", type: "image", top: "45%", left: "-5%", rotate: "12deg", speed: 0.25, label: "03" },
    { id: 4, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400", type: "image", top: "35%", right: "-2%", rotate: "-6deg", speed: -0.2, label: "04" },
    { id: 5, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400", type: "image", bottom: "10%", left: "15%", rotate: "-8deg", speed: 0.1, label: "05" },
    { id: 6, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400", type: "image", bottom: "5%", right: "15%", rotate: "15deg", speed: 0.3, label: "06" },
    { id: 7, type: "text", text: `"Code is reality."`, top: "25%", left: "25%", rotate: "-5deg", speed: 0.2 },
    { id: 8, type: "text", text: "SCENE 1", bottom: "35%", right: "25%", rotate: "10deg", speed: -0.15 },
    { id: 9, type: "scrap", top: "70%", left: "30%", rotate: "-12deg", speed: 0.35 },
    { id: 10, type: "image", src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400", top: "60%", right: "35%", rotate: "5deg", speed: -0.05, label: "07" },
];

export function HomeView({ onSelectProject }: { onSelectProject: (p: any) => void }) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const projectsRef = React.useRef<HTMLElement>(null);
    const filmStripRef = React.useRef<HTMLDivElement>(null);
    const [sectionHeight, setSectionHeight] = useState("100vh");

    // Handle scroll for scattered items and sticky project strip
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setScrollY(window.scrollY);

            if (projectsRef.current && filmStripRef.current) {
                const top = projectsRef.current.getBoundingClientRect().top;
                if (top <= 0) {
                    const scrollWidth = filmStripRef.current.scrollWidth;
                    const maxTranslate = scrollWidth - window.innerWidth;

                    const scrollOffset = Math.abs(top);
                    const translateVal = Math.min(scrollOffset, maxTranslate);

                    filmStripRef.current.style.transform = `translateX(-${translateVal}px)`;
                } else {
                    filmStripRef.current.style.transform = `translateX(0px)`;
                }
            }
        };

        const updateHeight = () => {
            if (filmStripRef.current) {
                const scrollWidth = filmStripRef.current.scrollWidth;
                const additionalScrollHeight = scrollWidth - window.innerWidth;
                setSectionHeight(`calc(100vh + ${additionalScrollHeight}px)`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateHeight);

        // Initial Calculation
        setTimeout(updateHeight, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    const perfSVG = `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='8' y='8' width='16' height='16' rx='2' fill='%23F2F2ED'/%3E%3C/svg%3E")`;

    return (
        <div className="animate-in fade-in duration-700">

            {/* --- FILM GRAIN & VIGNETTE OVERLAY --- */}
            <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-20">
                <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg' className="w-full h-full" preserveAspectRatio="none">
                    <filter id='noiseFilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* --- HERO SECTION --- */}
            <section id="top" className="relative min-h-[100vh] bg-[#F2F2ED] overflow-hidden flex flex-col items-center justify-center">

                {/* Massive Center Text */}
                <div className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none select-none mt-30 mb-64">
                    <h1 className="text-[18vw] md:text-[14vw] font-serif text-[#111111] leading-[0.8] tracking-tighter opacity-10">
                        Wai Yee
                    </h1>
                    <p className="text-[#111111] tracking-[0.5em] uppercase text-xs md:text-sm mt-8 font-mono z-30 opacity-80">
                        SOFTWARE DEVELOPER / UI/UX DESIGNER
                    </p>
                </div>

                {/* --- SCATTERED COLLAGE ELEMENTS --- */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    {SCATTERED_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="absolute pointer-events-auto transition-transform duration-75 hover:z-50 group hover:scale-110 cursor-pointer"
                            style={{
                                top: item.top,
                                left: item.left,
                                right: item.right,
                                bottom: item.bottom,
                                transform: `rotate(${item.rotate}) translateY(${scrollY * item.speed}px)`,
                            }}
                        >
                            {item.type === 'image' && (
                                <div className="relative shadow-[10px_10px_20px_rgba(0,0,0,0.15)] bg-white p-2 md:p-3 border border-black">
                                    <img src={item.src} alt="scattered" className="w-28 md:w-56 h-auto grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>


            </section>

            {/* --- ABOUT SECTION (FIELD NOTES FORMAT) --- */}
            <section id="about" className="py-32 px-6 relative overflow-hidden bg-[#F2F2ED]">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex flex-col items-center justify-center gap-6 mb-16 text-center">
                        <h3 className="text-xl md:text-2xl font-serif text-[#111] max-w-2xl px-6">
                            "Coding with a cinematic lens."
                        </h3>
                    </div>

                    {/* Field Notes Paper Container */}
                    <div
                        className="bg-white text-black p-8 md:p-16 shadow-[20px_20px_60px_rgba(0,0,0,0.1)] mx-auto max-w-3xl relative rounded-sm border-l-8 border-[#d73a3a] border-y border-r border-black"
                        style={{ fontFamily: '"Courier New", Courier, monospace' }}
                    >
                        {/* Subtle paper texture */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

                        {/* Log Header */}
                        <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
                            <div>
                                <h3 className="text-2xl font-bold uppercase tracking-widest">Developer's Log</h3>
                                <p className="text-gray-500 text-xs mt-1">BATCH NO. 2026-X</p>
                            </div>
                            <div className="text-right text-xs font-bold text-gray-500 space-y-1">
                                <p>ISO: 400</p>
                                <p>PROCESS: C-41</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm md:text-base leading-relaxed">

                            <div>
                                <p className="uppercase font-bold tracking-widest text-xs text-gray-500 mb-2">[ 01. EXPOSURE ]</p>
                                <p className="text-black font-medium">
                                    I treat every project like a carefully composed photograph. From framing the architecture (wireframing) to the final exposure (deployment), I obsess over the lighting, the focus, and the user's perspective.
                                </p>
                            </div>

                            <div>
                                <p className="uppercase font-bold tracking-widest text-xs text-gray-500 mb-2">[ 02. DEVELOPMENT ]</p>
                                <p className="text-black font-medium">
                                    My tools aren't physical lenses and chemicals. They are React, TypeScript, and Node.js. With a background forged in late-night coding sessions and rigorous algorithms, I blend technical precision with analog aesthetics.
                                </p>
                            </div>

                            <div>
                                <p className="uppercase font-bold tracking-widest text-xs text-gray-500 mb-4">[ 03. EQUIPMENT ]</p>
                                <ul className="space-y-4 text-black font-medium">
                                    <li className="flex flex-col md:flex-row md:gap-4">
                                        <span className="font-bold min-w-[120px]">FRONTEND:</span>
                                        <span className="text-gray-700">React, Next.js, Tailwind <span className="italic text-gray-500">...capturing the visual composition.</span></span>
                                    </li>
                                    <li className="flex flex-col md:flex-row md:gap-4">
                                        <span className="font-bold min-w-[120px]">BACKEND:</span>
                                        <span className="text-gray-700">Node.js, Express <span className="italic text-gray-500">...handling the raw data processing.</span></span>
                                    </li>
                                    <li className="flex flex-col md:flex-row md:gap-4">
                                        <span className="font-bold min-w-[120px]">DATABASE:</span>
                                        <span className="text-gray-700">PostgreSQL, MongoDB <span className="italic text-gray-500">...archiving the negatives.</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* --- CASE STUDY PROJECTS (Sticky Horizontal Scroll) --- */}
            <section id="projects" ref={projectsRef} className="relative bg-[#F2F2ED]" style={{ height: sectionHeight }}>

                {/* Sticky Container */}
                <div className="sticky top-0 h-screen flex flex-col justify-start pt-28 overflow-hidden">
                    <div className="relative w-full mt-12 md:mt-0">
                        {/* Moving Film Strip Container */}
                        <div ref={filmStripRef} className="w-max flex relative pt-8 pb-16 will-change-transform pl-6 md:pl-12">

                            {/* The Continuous Black Film Background — plain fill, leader is in foreground */}
                            <div className="absolute top-8 left-6 md:left-12 right-0 h-[480px] bg-black pointer-events-none z-0">
                                <div
                                    className="absolute top-4 left-0 right-0 h-8"
                                    style={{ backgroundImage: perfSVG, backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px' }}
                                ></div>
                                <div
                                    className="absolute bottom-4 left-0 right-0 h-8"
                                    style={{ backgroundImage: perfSVG, backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px' }}
                                ></div>
                            </div>

                            {/* Film Strip Foreground Content */}
                            <div className="flex gap-12 md:gap-16 relative z-10">

                                {/* Photorealistic 3D Film Canister */}
                                <div className="relative shrink-0 flex items-center justify-center z-20 h-[480px]">

                                    {/* Main Canister Body */}
                                    <div className="w-[190px] md:w-[280px] h-[510px] relative rounded-[2px] flex items-center justify-center bg-[#0a0a0a] overflow-hidden drop-shadow-2xl border-y border-black z-10">

                                        {/* Core Metallic Base Gradient (Cylindrical lighting) */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#202020] to-[#020202]"></div>

                                        {/* Specular Highlights for Cylindrical Volume */}
                                        {/* Soft large left bounce */}
                                        <div className="absolute inset-y-0 left-[6%] w-[15%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-10 blur-md"></div>
                                        {/* Sharp left edge rim light */}
                                        <div className="absolute inset-y-0 left-[10%] w-[3%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-[0.25] blur-[1px]"></div>
                                        {/* Broad smooth center-right reflection */}
                                        <div className="absolute inset-y-0 left-[25%] w-[35%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-[0.04] blur-xl"></div>

                                        {/* Extreme Edge Shadows for true cylinder falloff */}
                                        <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black via-black/90 to-transparent"></div>
                                        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black via-black/90 to-transparent"></div>

                                        {/* Top and Bottom Crimp Shadows */}
                                        <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-b from-black/80 to-transparent z-20"></div>
                                        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-t from-black/80 to-transparent z-20"></div>

                                        {/* Branding & Typography Container */}
                                        <div className="relative z-10 w-full h-full flex items-center justify-center">

                                            {/* Graphic Overlay Lines (Left edge vertical markers) */}
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center opacity-60 z-30 hidden md:flex">
                                                <Aperture className="text-gray-400 w-3 h-3 mb-4" />
                                                <div className="w-[2px] h-6 bg-[#E11D48] rounded-full"></div>
                                                <div className="w-[2px] h-6 bg-[#22C55E] rounded-full"></div>
                                                <div className="w-[2px] h-6 bg-[#2A65D6] rounded-full"></div>
                                                <Aperture className="text-gray-400 w-3 h-3 mt-4" />
                                            </div>

                                            {/* Main Rotated Typography */}
                                            <div className="flex flex-col items-center justify-center -rotate-90 origin-center absolute w-[500px]">
                                                <div className="flex flex-col items-center gap-0">
                                                    {/* Top Numbers & Barcode elements */}
                                                    <div className="flex items-center gap-10 text-gray-500 font-mono tracking-[0.4em] text-[8px] md:text-[10px] mb-2 opacity-80">
                                                        <span>0 4 - 2 6</span>
                                                        <span className="tracking-[0.1em] opacity-60">||||||||||||||||</span>
                                                    </div>

                                                    {/* Primary Brand Text */}
                                                    <h2 className="text-[4.5rem] md:text-[6.5rem] font-black text-[#F8F8F8] tracking-[-0.03em] leading-[0.85] drop-shadow-lg">
                                                        WAI YEE
                                                    </h2>

                                                    {/* Subtitle with side lines */}
                                                    <div className="flex items-center gap-4 mt-3 text-gray-300 tracking-[0.4em] font-mono text-[8px] md:text-[10px] uppercase opacity-80">
                                                        <div className="w-12 h-[1px] bg-gray-400 hidden md:block opacity-50"></div>
                                                        <span>SELECTED WORK</span>
                                                        <div className="flex gap-1.5 hidden md:flex opacity-50">
                                                            <div className="w-1.5 h-[3px] bg-gray-400"></div>
                                                            <div className="w-1.5 h-[3px] bg-gray-400"></div>
                                                            <div className="w-1.5 h-[3px] bg-gray-400"></div>
                                                            <div className="w-1.5 h-[3px] bg-gray-400"></div>
                                                            <div className="w-1.5 h-[3px] bg-gray-400"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* The Film Exit Lip (Right edge of canister where film comes out) */}
                                    <div className="absolute right-[-14px] md:right-[-20px] top-1/2 -translate-y-1/2 w-[14px] md:w-[20px] h-[486px] bg-gradient-to-r from-[#000] via-[#111] to-[#050505] border-y border-[#333] z-10 rounded-r shadow-2xl flex justify-end pr-0.5">
                                        <div className="h-full w-[2px] bg-black"></div>
                                    </div>

                                    {/* Film Shadow coming out of lip onto the film */}
                                    <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-20 h-[440px] bg-gradient-to-l from-black via-black/80 to-transparent opacity-95 pointer-events-none z-20"></div>

                                    {/* --- Top Cap Assembly --- */}
                                    <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-[218px] md:w-[320px] h-[24px] bg-gradient-to-b from-[#333] via-[#777] to-[#111] rounded-[3px] shadow-[0_5px_15px_rgba(0,0,0,0.9)] z-30 border-t border-[#888]">
                                        {/* Rim Highlights */}
                                        <div className="absolute inset-y-0 left-[10%] w-[5%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-50"></div>
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/90"></div>
                                    </div>
                                    {/* Spool Peg Base */}
                                    <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-[120px] md:w-[160px] h-[8px] bg-gradient-to-r from-[#050505] via-[#444] to-[#050505] rounded-t-sm z-20 border-t border-[#666]">
                                        <div className="absolute inset-y-0 left-[12%] w-[6%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-40"></div>
                                    </div>
                                    {/* Spool Peg Top */}
                                    <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 w-[50px] md:w-[70px] h-[8px] bg-gradient-to-r from-[#111] via-[#666] to-[#111] rounded-t-[2px] border-t border-[#999] z-10">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[3px] bg-black/90 rounded-t-full"></div>
                                        <div className="absolute inset-y-0 left-[15%] w-[10%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-50"></div>
                                    </div>

                                    {/* --- Bottom Cap Assembly --- */}
                                    <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-[218px] md:w-[320px] h-[24px] bg-gradient-to-t from-[#333] via-[#777] to-[#111] rounded-[3px] shadow-[0_-5px_15px_rgba(0,0,0,0.9)] z-30 border-b border-[#888]">
                                        {/* Rim Highlights */}
                                        <div className="absolute inset-y-0 left-[10%] w-[5%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-50"></div>
                                        <div className="absolute inset-x-0 top-0 h-[2px] bg-black/90"></div>
                                    </div>
                                    {/* Bottom Spool Peg Base */}
                                    <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[120px] md:w-[160px] h-[8px] bg-gradient-to-r from-[#050505] via-[#444] to-[#050505] rounded-b-sm z-20 border-b border-[#666]">
                                        <div className="absolute inset-y-0 left-[12%] w-[6%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-40"></div>
                                    </div>
                                    {/* Bottom Spool Peg Point */}
                                    <div className="absolute -bottom-[28px] left-1/2 -translate-x-1/2 w-[50px] md:w-[70px] h-[8px] bg-gradient-to-r from-[#111] via-[#666] to-[#111] rounded-b-[2px] border-b border-[#999] z-10">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[3px] bg-black/90 rounded-b-full"></div>
                                        <div className="absolute inset-y-0 left-[15%] w-[10%] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent opacity-50"></div>
                                    </div>

                                </div>

                                {PROJECTS.map((project, idx) => (
                                    <div key={project.id} className="w-[280px] md:w-[450px] flex flex-col shrink-0 group">

                                        {/* Content inside the 480px black film area */}
                                        <div className="h-[480px] flex flex-col justify-between py-14">
                                            <h3 className="text-white text-center font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4">
                                                {project.title}
                                            </h3>
                                            <div className="flex-grow overflow-hidden border border-gray-800 relative bg-black cursor-pointer">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <p className="text-gray-400 text-center text-[10px] md:text-xs uppercase tracking-[0.1em] mt-4 font-mono truncate px-4">
                                                {project.tagline}
                                            </p>
                                        </div>

                                        {/* External Link Section (Below the film) */}
                                        <div className="mt-8 flex justify-center">
                                            <a href="#" className="flex items-center text-[#111] font-bold tracking-widest uppercase text-[10px] md:text-xs hover:text-gray-600 transition-colors border-b border-transparent hover:border-[#111] pb-1">
                                                Check out project <ArrowUpRight size={16} className="ml-2" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                {/* Blank film end section (empty frame before leader) */}
                                <div className="w-[60px] md:w-[100px] shrink-0 h-[480px]" />

                                {/* Film End Leader + CTA wrapped together — no gap between them */}
                                <div className="flex shrink-0 h-[480px]">
                                    {/* Film End Leader */}
                                    <div className="w-40 md:w-56 h-full shrink-0 relative z-10 overflow-hidden rounded-tr-[4rem] md:rounded-tr-[6rem] bg-black">
                                        <div
                                            className="absolute top-4 left-0 right-0 w-[100%] h-8"
                                            style={{ backgroundImage: perfSVG, backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px' }}
                                        ></div>
                                        {/* Cover div to hide the rightmost perforation notch on the curved corner */}
                                        <div className="absolute top-0 right-0 w-12 h-16 bg-black z-10"></div>
                                        <div
                                            className="absolute bottom-4 left-0 w-[40%] h-8"
                                            style={{ backgroundImage: perfSVG, backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px' }}
                                        ></div>
                                        {/* Curved cutout */}
                                        <div className="absolute bottom-0 right-0 w-full h-[58%] bg-[#F2F2ED] rounded-tl-[4rem] md:rounded-tl-[6rem]"></div>
                                    </div>

                                    {/* CTA — immediately after leader, no gap */}
                                    <div className="flex flex-col items-start justify-center shrink-0 w-[320px] md:w-[420px] h-full pl-12 pr-8 bg-[#F2F2ED]">
                                        <h3 className="text-[#111] font-black tracking-tighter text-2xl md:text-4xl leading-[0.9] text-center">
                                            WANT TO KNOW MORE?<br />
                                            <a href="/work" className="underline-offset-4 decoration-[3px] hover:underline transition-all cursor-pointer">
                                                VISIT PROJECTS
                                            </a>
                                        </h3>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* --- ACHIEVEMENTS (The Exposure Logbook) --- */}
            <section id="achievements" className="py-32 px-6 bg-[#F2F2ED] relative border-t border-black">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-serif text-[#111] mb-4">Exposure Log</h2>
                        <p className="text-gray-500 tracking-[0.3em] uppercase text-xs font-mono">Archive Index & Milestones</p>
                    </div>

                    {/* The Logbook Container */}
                    <div className="bg-[#111] shadow-2xl relative rounded-b-md">

                        {/* Binder Ring / Spiral Edge Detail */}
                        <div className="absolute top-0 left-0 w-full h-6 bg-black border-b border-gray-900 flex justify-evenly items-center px-4">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="w-4 md:w-8 h-2 bg-[#111] rounded-full border border-gray-900 shadow-inner"></div>
                            ))}
                        </div>

                        <div className="p-6 md:p-12 pt-16">

                            {/* Table Header (Hidden on Mobile) */}
                            <div className="hidden md:grid grid-cols-12 gap-6 border-b-2 border-gray-700 pb-4 mb-8 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono font-bold">
                                <div className="col-span-2">Frame / Date</div>
                                <div className="col-span-4">Subject / Event</div>
                                <div className="col-span-6">Developer Notes</div>
                            </div>

                            {/* Log Entries */}
                            <div className="space-y-8 md:space-y-0">
                                {ACHIEVEMENTS.map((achieve: any, idx) => (
                                    <div
                                        key={idx}
                                        className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 md:py-8 border-b border-gray-800/50 md:border-dashed last:border-0 group hover:bg-[#111] transition-colors p-4 md:p-0 -mx-4 md:mx-0 rounded-md md:rounded-none"
                                    >

                                        {/* FRAME & YEAR */}
                                        <div className="col-span-2 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start font-mono">
                                            <div className="relative inline-block">
                                                {/* Red Grease Pencil Circle Highlight */}
                                                {achieve.highlight && (
                                                    <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                        <path
                                                            d="M 50,15 C 80,10 90,40 85,75 C 80,100 30,95 15,75 C 5,50 20,20 50,15"
                                                            fill="none"
                                                            stroke="#d73a3a"
                                                            strokeWidth="2.5"
                                                            strokeLinecap="round"
                                                            className="opacity-90 drop-shadow-[0_0_8px_rgba(215,58,58,0.4)]"
                                                        />
                                                    </svg>
                                                )}
                                                <span className={`text-2xl md:text-3xl font-bold tracking-tighter ${achieve.highlight ? 'text-white' : 'text-gray-600'}`}>
                                                    {achieve.frame}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 tracking-widest mt-0 md:mt-2">{achieve.year}</span>
                                        </div>

                                        {/* SUBJECT & EVENT */}
                                        <div className="col-span-4 flex flex-col justify-center">
                                            <h3 className={`text-xl font-serif mb-1 ${achieve.highlight ? 'text-white' : 'text-gray-300'}`}>
                                                {achieve.title}
                                            </h3>
                                            <h4 className="text-[10px] md:text-xs text-gray-500 font-mono tracking-[0.15em] uppercase">
                                                {achieve.event}
                                            </h4>
                                        </div>

                                        {/* NOTES & STAMP */}
                                        <div className="col-span-6 flex flex-col justify-center relative">
                                            <p className="text-sm text-gray-400 leading-relaxed font-sans pr-0 md:pr-12">
                                                {achieve.desc}
                                            </p>

                                            {/* Red "SELECT" Stamp on Hover for Highlighted items */}
                                            {achieve.highlight && (
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                                                    <span className="text-[#d73a3a] border-2 border-[#d73a3a] px-3 py-1 text-[10px] tracking-[0.4em] font-black font-mono uppercase rotate-[-15deg] inline-block shadow-[0_0_10px_rgba(215,58,58,0.2)]">
                                                        Selected
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FOOTER */}
            < footer id="connect" className="border-t border-black bg-[#111] text-[#F2F2ED] p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0" >
                <div className="max-w-md">
                    <h2 className="text-4xl font-bold mb-6">Everything you do, do it with care.</h2>
                    <p className="text-gray-400">If you're feeling like life needs a bit more chaos, then feel free to scroll back to the top!</p>
                </div>

                <div className="flex gap-8 text-lg font-medium">
                    <a href="#" className="hover:italic hover:text-red-400">Email</a>
                    <a href="#" className="hover:italic hover:text-red-400">LinkedIn</a>
                    <a href="#" className="hover:italic hover:text-red-400">GitHub</a>
                </div>
            </footer >
        </div >
    );
}
