"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Aperture, X } from 'lucide-react';
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
    const [hoveredAchieve, setHoveredAchieve] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Camera State
    const [isSnapping, setIsSnapping] = useState(false);
    const [photoPrinted, setPhotoPrinted] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const handleSnapPhoto = () => {
        if (photoPrinted) return;
        setIsSnapping(true);
        setTimeout(() => {
            setIsSnapping(false);
            setPhotoPrinted(true);
        }, 150); // fast crisp flash duration
    };
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

            {/* --- ACHIEVEMENTS (Full Width Table with Hover Image Effect) --- */}
            <section id="achievements" className="py-32 bg-[#F2F2ED] relative cursor-default">
                <div className="px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#111] mb-4">Exposure Log</h2>
                        <p className="text-gray-500 tracking-[0.3em] uppercase text-xs font-mono">Archive Index & Milestones</p>
                    </div>
                </div>

                {/* Full Width Table Container */}
                <div
                    className="w-full border-t border-black"
                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                    {/* Table Header (Hidden on Mobile) */}
                    <div className="hidden md:flex w-full px-12 py-4 border-b border-black text-[10px] text-gray-400 uppercase tracking-[0.2em] font-mono font-bold bg-[#E8E8E2]">
                        <div className="w-2/12">Frame / Date</div>
                        <div className="w-4/12">Subject / Event</div>
                        <div className="w-5/12">Developer Notes</div>
                        <div className="w-1/12 text-right">Status</div>
                    </div>

                    {/* Table Rows */}
                    {ACHIEVEMENTS.map((achieve: any, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredAchieve(idx)}
                            onMouseLeave={() => setHoveredAchieve(null)}
                            className="w-full px-6 md:px-12 py-8 border-b border-black hover:bg-[#111] transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 relative z-10"
                        >

                            {/* FRAME & YEAR */}
                            <div className="w-full md:w-2/12 font-mono flex md:block items-center gap-4">
                                <span className={`text-2xl md:text-3xl font-bold tracking-tighter transition-colors duration-300 ${achieve.highlight ? 'text-[#111] group-hover:text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {achieve.frame}
                                </span>
                                <span className="text-xs text-gray-500 tracking-widest block md:mt-1 group-hover:text-gray-400 transition-colors duration-300">{achieve.year}</span>
                            </div>

                            {/* SUBJECT & EVENT */}
                            <div className="w-full md:w-4/12 flex flex-col justify-center pr-4">
                                <h3 className={`text-xl font-serif mb-1 transition-colors duration-300 ${achieve.highlight ? 'text-[#111] group-hover:text-white' : 'text-[#333] group-hover:text-gray-300'}`}>
                                    {achieve.title}
                                </h3>
                                <h4 className="text-[10px] md:text-xs text-gray-500 font-mono tracking-[0.15em] uppercase group-hover:text-gray-400 transition-colors duration-300">
                                    {achieve.event}
                                </h4>
                            </div>

                            {/* NOTES */}
                            <div className="w-full md:w-5/12 pr-4">
                                <p className="text-sm text-gray-600 leading-relaxed font-sans group-hover:text-gray-400 transition-colors duration-300">
                                    {achieve.desc}
                                </p>
                            </div>

                            {/* STATUS/HIGHLIGHT */}
                            <div className="w-full md:w-1/12 flex justify-start md:justify-end items-center mt-4 md:mt-0">
                                <ArrowUpRight size={16} className="text-[#111] group-hover:text-gray-400 transition-colors duration-300 hidden md:block" />
                            </div>

                        </div>
                    ))}
                </div>

                {/* Floating Cursor Image Effect */}
                <div
                    className="fixed pointer-events-none z-[100] overflow-hidden border border-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#F2F2ED]"
                    style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        width: '320px',
                        height: '220px',
                        transform: `translate(-50%, -50%) scale(${hoveredAchieve !== null ? 1 : 0.8}) rotate(${hoveredAchieve !== null ? (hoveredAchieve % 2 === 0 ? '2deg' : '-2deg') : '0deg'})`,
                        opacity: hoveredAchieve !== null ? 1 : 0,
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    }}
                >
                    {hoveredAchieve !== null && ACHIEVEMENTS[hoveredAchieve] && (
                        <div className="w-full h-full p-2 flex flex-col">
                            {/* Image Header */}
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-[8px] font-mono font-bold tracking-widest text-[#111]">
                                    TAKE {ACHIEVEMENTS[hoveredAchieve].frame}
                                </span>
                                <span className="text-[8px] font-mono tracking-widest text-[#111]">
                                    {ACHIEVEMENTS[hoveredAchieve].year}
                                </span>
                            </div>

                            {/* Inner Image Frame */}
                            <div className="flex-1 border border-black overflow-hidden relative grayscale contrast-125">
                                <img
                                    src={ACHIEVEMENTS[hoveredAchieve].img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[#111] mix-blend-color opacity-20 pointer-events-none"></div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Flash Effect */}
            <div className={`fixed inset-0 bg-white z-[999] pointer-events-none transition-opacity duration-500 ease-out ${isSnapping ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* 6. THE FINAL EXPOSURE (Footer) */}
            <footer id="connect" className="border-t border-black bg-[#111] text-[#F2F2ED] py-32 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center mb-16 px-6 relative z-20">
                    <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white">The Final Exposure</h2>
                    <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Capture the moment • Print Resume</p>
                </div>

                {/* Interactive Camera */}
                <div className="relative w-[280px] h-[200px] md:w-[320px] md:h-[220px] mt-8 mb-32 z-20">

                    {/* The Printed Polaroid (Resume) */}
                    <div
                        className={`absolute left-1/2 w-[220px] md:w-[240px] bg-[#F2F2ED] p-3 shadow-2xl flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 pointer-events-auto ${photoPrinted ? 'translate-y-[150px] md:translate-y-[170px] -translate-x-1/2 opacity-100 rotate-[-2deg]' : 'translate-y-0 -translate-x-1/2 opacity-0'}`}
                        style={{ bottom: '20px' }}
                    >
                        {/* Polaroid Image Area (Resume Preview) */}
                        <div className="w-full h-[180px] bg-[#ddd] border border-black/10 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                            <span className="font-serif text-black text-2xl font-bold italic mb-2">Resume</span>
                            <span className="font-mono text-gray-500 text-[10px] tracking-widest uppercase border-t border-gray-400 pt-2">Chloe Lee</span>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex gap-2 w-full">
                            <button onClick={() => setIsResumeModalOpen(true)} className="flex-1 text-center bg-[#111] text-white text-[10px] py-3 font-mono font-bold tracking-widest hover:bg-gray-800 transition-colors">REVIEW</button>
                            <a href="/Resume.pdf" download className="flex-1 text-center border-2 border-[#111] text-[#111] text-[10px] py-3 font-mono font-bold tracking-widest hover:bg-[#e0e0e0] transition-colors">DOWNLOAD</a>
                        </div>
                    </div>

                    {/* The Camera Body */}
                    <div className="absolute inset-0 bg-[#222] border-t-4 border-[#333] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 flex flex-col items-center justify-center">
                        {/* Top Viewfinder bump */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2a2a2a] rounded-t-lg border-t-2 border-[#333]"></div>

                        {/* Shutter Button */}
                        <button
                            onClick={handleSnapPhoto}
                            disabled={photoPrinted || isSnapping}
                            className={`absolute -top-4 right-8 md:right-10 w-12 h-6 rounded-t-full transition-all duration-150 ${isSnapping || photoPrinted ? 'bg-red-900 translate-y-2' : 'bg-[#d73a3a] hover:bg-red-500 hover:-translate-y-1 cursor-pointer'} border-b-4 border-red-950`}
                            aria-label="Snap Photo"
                        ></button>

                        {/* Flash Component */}
                        <div className="absolute top-6 left-6 w-12 h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded-sm border border-gray-600 flex items-center justify-center">
                            <div className="w-10 h-4 bg-yellow-100/40 rounded-sm"></div>
                        </div>

                        {/* Branding / Details */}
                        <div className="absolute top-6 right-6 text-[8px] font-mono text-gray-500 tracking-widest uppercase">
                            TYPE-01
                        </div>

                        {/* Main Lens */}
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[10px] border-[#111] bg-gradient-to-br from-gray-700 to-black shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center relative mt-4">
                            {/* Inner Lens Rings */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-600/30 bg-black flex items-center justify-center relative overflow-hidden">
                                {/* Aperture Blades Simulation */}
                                <Aperture className="w-10 h-10 text-gray-800 opacity-50 absolute" />
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0a0a0a] z-10"></div>
                                {/* Glass Reflection */}
                                <div className="absolute top-2 right-4 w-8 h-8 bg-white/10 rounded-full blur-[2px] z-20"></div>
                            </div>
                        </div>

                        {/* Bottom Output Slot */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-48 h-3 bg-black rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] border-b border-gray-700/30"></div>
                    </div>
                </div>
            </footer>

            {/* Resume Modal Overlay */}
            {isResumeModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12">
                    <div
                        className="absolute inset-0 z-0 cursor-pointer"
                        onClick={() => setIsResumeModalOpen(false)}
                        aria-label="Close modal background"
                    ></div>

                    <div className="relative z-10 w-full h-full max-w-6xl max-h-[90vh] bg-[#F2F2ED] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-[#E8E8E2]">
                            <div className="font-mono text-sm tracking-widest uppercase font-bold text-[#111]">
                                DOCUMENT / RESUME.PDF
                            </div>
                            <button
                                onClick={() => setIsResumeModalOpen(false)}
                                className="p-2 hover:bg-gray-300 rounded-full transition-colors text-[#111]"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 w-full bg-gray-200">
                            <iframe
                                src="/Resume.pdf"
                                className="w-full h-full border-none"
                                title="Resume PDF"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
