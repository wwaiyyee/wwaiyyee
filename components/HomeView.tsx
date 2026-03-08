"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from './projects';
import { Marquee } from './Marquee';

export function HomeView({ onSelectProject }: { onSelectProject: (p: any) => void }) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <div className="animate-in fade-in duration-700">

            {/* 1. HERO SECTION (Spatial UI inspired by reference image) */}
            <section className="relative w-full h-[90vh] min-h-[750px] flex items-center justify-center overflow-hidden bg-[#F2F2ED] border-b border-black px-6 md:px-12">


                {/* --- Floating UI Elements (Background layer) --- */}
                {/* Left side thumbnails */}
                <div className="absolute left-[2%] lg:left-[5%] top-[25%] flex-col gap-4 hidden md:flex z-0">
                    <div className="w-32 lg:w-40 h-28 rounded-2xl bg-gray-300 overflow-hidden shadow-sm relative">
                        <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                        <img src={PROJECTS[0].image} className="w-full h-full object-cover opacity-90" alt="thumbnail" />
                    </div>
                    <div className="w-32 lg:w-40 h-32 rounded-2xl bg-[#D1D5DB] overflow-hidden shadow-sm relative group">
                        <div className="absolute inset-0 bg-green-500/30 mix-blend-overlay"></div>
                        <img src={PROJECTS[2].image} className="w-full h-full object-cover opacity-80 filter grayscale group-hover:grayscale-0 transition-all" alt="thumbnail" />
                    </div>
                </div>

                {/* Right side thumbnails */}
                <div className="absolute right-[2%] lg:right-[5%] top-[30%] flex-col gap-4 hidden md:flex z-0">
                    <div className="w-36 lg:w-48 h-32 rounded-2xl bg-gray-300 overflow-hidden shadow-sm relative">
                        <img src={PROJECTS[1].image} className="w-full h-full object-cover opacity-90" alt="thumbnail" />
                    </div>
                    <div className="w-24 h-24 rounded-2xl bg-[#E5E7EB] shadow-sm flex items-center justify-center">
                        <span className="text-4xl font-light text-gray-400">+</span>
                    </div>
                </div>

                {/* Bottom Left Panel (AI Agent style) */}
                <div className="absolute left-[2%] lg:left-[5%] bottom-[8%] w-64 p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hidden lg:block z-0">
                    <p className="text-xs font-mono uppercase tracking-widest mb-3 ml-2 text-gray-500">Toolkit</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-10 rounded-xl bg-blue-500/80 text-white flex items-center justify-center text-xs font-medium">Figma</div>
                        <div className="h-10 rounded-xl bg-teal-500/80 text-white flex items-center justify-center text-xs font-medium">React</div>
                        <div className="h-10 rounded-xl bg-gray-300/80 text-gray-700 flex items-center justify-center text-xs font-medium">Next.js</div>
                        <div className="h-10 rounded-xl bg-[#e6c100]/80 text-gray-900 flex items-center justify-center text-xs font-medium">JS/TS</div>
                    </div>
                </div>



                {/* --- Main Central Canvas --- */}
                <div className="relative z-10 w-full max-w-[850px] aspect-square md:aspect-video lg:aspect-[16/9] rounded-[2rem] bg-[#111111] shadow-2xl flex flex-col items-center justify-center overflow-hidden border border-gray-800">

                    {/* Subtle glowing orbs in the background of the dark canvas */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    {/* Inner Floating Toolbars */}
                    <div className="absolute top-6 flex gap-2 z-20">
                        <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            UI/UX
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-gray-300">
                            Frontend
                        </div>
                    </div>

                    {/* Central Content (Name, Tagline, Line Drawing) */}
                    <div className="relative z-20 flex flex-col items-center text-center px-6 md:px-12 mt-8">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#F2F2ED] mb-4 tracking-tight">Lee Wai Yee</h1>
                        <p className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-[0.2em] mb-12 max-w-lg leading-relaxed">
                            Designing data-driven digital products
                        </p>

                        {/* Abstract Line Drawing SVG */}
                        <svg className="w-64 md:w-[400px] h-24 stroke-[#F2F2ED]/60 fill-none" viewBox="0 0 400 100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 0 50 C 100 -20, 150 120, 250 50 S 350 -20, 400 50" />
                            <path d="M 50 50 C 120 10, 180 90, 280 50" className="stroke-[#F2F2ED]/20" strokeDasharray="4 4" />
                            <path d="M 100 50 C 150 30, 200 70, 250 50" className="stroke-[#F2F2ED]/40" />
                            <circle cx="250" cy="50" r="3" className="fill-[#F2F2ED]/60" />
                            <circle cx="400" cy="50" r="2" className="fill-[#F2F2ED]/60" />
                        </svg>
                    </div>
                </div>

                {/* --- Bottom Center Floating Prompt Bar --- */}
                <div className="absolute bottom-[2%] md:bottom-[6%] z-30 w-[95%] md:w-[600px] p-4 rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col gap-3">
                    <p className="px-2 text-sm md:text-base font-serif text-gray-700 leading-relaxed italic">
                        "Build elegant, expressive, and visually striking software experiences that empower users through clarity."
                    </p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center border border-white text-gray-500 font-bold hover:bg-white transition-colors">+</button>
                            <button className="px-4 h-10 rounded-full bg-white/60 flex items-center justify-center border border-white text-gray-600 text-sm font-medium gap-2 hover:bg-white transition-colors">
                                <span className="w-4 h-4 rounded-sm bg-gray-300"></span> Projects
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                const workElement = document.getElementById('work');
                                if (workElement) {
                                    workElement.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center hover:bg-gray-800 transition-all shadow-md group"
                        >
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

            </section>

            {/* 2. MARQUEE SECTION */}
            <Marquee text="— Lee Wai Yee — Grew up in a restaurant — Digital world — Nasi Lemak — Night owl — More coffee — Even more coffee — The Black Axe! " />

            {/* 3. CHAOTIC NUMBERS GRID */}
            <section className="py-24 px-6 md:px-12 flex flex-wrap gap-4 md:gap-8 justify-center opacity-30">
                {[...Array(18)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-7xl font-bold font-serif hover:text-red-500 transition-colors cursor-crosshair">
                        {i + 1}
                    </span>
                ))}
            </section>

            {/* 4. WORK SECTION (Brutalist List) */}
            <section id="work" className="border-t border-black">
                <div className="p-6 md:p-12 border-b border-black">
                    <h2 className="text-sm font-mono uppercase tracking-widest">Selected Works (3)</h2>
                </div>

                <div className="relative">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => onSelectProject(project)}
                            onMouseEnter={() => setHoveredProject(project.image)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className="group border-b border-black p-6 md:p-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-[#111] hover:text-[#F2F2ED] transition-colors duration-300"
                        >
                            <div className="flex items-baseline gap-6 md:gap-12 mb-4 md:mb-0 relative z-10">
                                <span className="text-2xl md:text-4xl font-serif text-gray-400 group-hover:text-gray-500 transition-colors">{project.number}</span>
                                <h3 className="text-4xl md:text-7xl font-bold tracking-tighter">{project.title}</h3>
                            </div>
                            <div className="flex flex-col md:items-end z-10">
                                <p className="text-lg md:text-2xl italic">{project.tagline}</p>
                                <p className="text-sm font-mono uppercase tracking-widest mt-2 opacity-50">{project.roles}</p>
                            </div>
                        </div>
                    ))}

                    {/* Floating Image Reveal on Hover (Desktop only) */}
                    {hoveredProject && (
                        <div className="hidden md:block pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] aspect-video z-0 overflow-hidden mix-blend-difference">
                            <img
                                src={hoveredProject}
                                alt="Project Preview"
                                className="w-full h-full object-cover filter grayscale opacity-80"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* 5. CHAOS / ABOUT SECTION */}
            <section id="about" className="px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                    <h2 className="text-5xl font-bold tracking-tighter mb-12 hover:italic">What's their deal?</h2>
                    <div className="space-y-4 text-xl border-l-4 border-black pl-6">
                        <p className="font-bold">About me</p>
                        <p className="opacity-50 line-through">What I look for</p>
                        <p className="italic">Impactful work</p>
                        <p className="italic">Meaningful work</p>
                        <p>Diversed team of talented folks</p>
                        <p className="font-bold mt-8 flex items-center gap-2 cursor-pointer hover:underline">
                            let's chat! <ArrowUpRight className="w-5 h-5" />
                        </p>
                    </div>
                    <div className="mt-16 w-48 h-48 bg-gray-300 border border-black border-dashed flex items-center justify-center p-4 text-center text-sm font-mono text-gray-500">
                        [Insert a "I need to chat with you" giphy here]
                    </div>
                </div>

                <div className="font-serif text-lg md:text-2xl leading-relaxed text-gray-600">
                    <span className="text-black">🎶</span>
                    <br /><br />
                    Almost heaven, West Virginia. Blue Ridge Mountains Shenandoah River. Life is old there. Older than the trees. Younger than the mountains. Growin like a breeze...
                    <br /><br />
                    Country Roads, take me home. To the place I belong West Virginia, mountain momma. Take me home, country roads.
                    <br /><br />
                    <span className="text-black">🎶</span>
                </div>
            </section>

            {/* 6. FOOTER */}
            <footer id="connect" className="border-t border-black bg-[#111] text-[#F2F2ED] p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
                <div className="max-w-md">
                    <h2 className="text-4xl font-bold mb-6">Everything you do, do it with care.</h2>
                    <p className="text-gray-400">If you're feeling like life needs a bit more chaos, then feel free to scroll back to the top!</p>
                </div>

                <div className="flex gap-8 text-lg font-medium">
                    <a href="#" className="hover:italic hover:text-red-400">Email</a>
                    <a href="#" className="hover:italic hover:text-red-400">LinkedIn</a>
                    <a href="#" className="hover:italic hover:text-red-400">GitHub</a>
                </div>
            </footer>
        </div>
    );
}
