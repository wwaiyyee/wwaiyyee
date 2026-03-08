"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from './projects';
import { Marquee } from './Marquee';

const SCATTERED_ITEMS = [
    { id: 1, src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400", type: "image", top: "5%", left: "5%", rotate: "-15deg", speed: 0.15, label: "01" },
    { id: 2, src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400", type: "image", top: "10%", right: "8%", rotate: "8deg", speed: -0.1, label: "02" },
    { id: 3, src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400", type: "image", top: "45%", left: "-5%", rotate: "12deg", speed: 0.25, label: "03" },
    { id: 4, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400", type: "image", top: "35%", right: "-2%", rotate: "-6deg", speed: -0.2, label: "04" },
    { id: 5, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400", type: "image", bottom: "10%", left: "15%", rotate: "-8deg", speed: 0.1, label: "05" },
    { id: 6, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400", type: "image", bottom: "15%", right: "15%", rotate: "15deg", speed: 0.3, label: "06" },
    { id: 7, type: "text", text: `"Code is reality."`, top: "25%", left: "25%", rotate: "-5deg", speed: 0.2 },
    { id: 8, type: "text", text: "SCENE 1", bottom: "35%", right: "25%", rotate: "10deg", speed: -0.15 },
    { id: 9, type: "scrap", top: "70%", left: "30%", rotate: "-12deg", speed: 0.35 },
    { id: 10, type: "image", src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400", top: "60%", right: "35%", rotate: "5deg", speed: -0.05, label: "07" },
];

export function HomeView({ onSelectProject }: { onSelectProject: (p: any) => void }) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // Handle scroll for scattered items
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <section id="top" className="relative min-h-[120vh] bg-[#F2F2ED] overflow-hidden flex flex-col items-center justify-center border-b border-black">

                {/* Massive Center Text */}
                <div className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none select-none my-64">
                    <h1 className="text-[18vw] md:text-[14vw] font-serif text-[#111111] leading-[0.8] tracking-tighter opacity-10">
                        DIRECTOR
                    </h1>
                    <p className="text-[#111111] tracking-[0.5em] uppercase text-xs md:text-sm mt-8 font-mono z-30 opacity-80">
                        Creative Portfolio
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
                                    {item.label && <div className="absolute -bottom-3 -right-3 bg-[#111] text-white text-[10px] font-bold font-mono px-2 py-1 shadow-md">{item.label}</div>}
                                </div>
                            )}
                            {item.type === 'text' && (
                                <div className="bg-white p-3 md:p-5 shadow-xl border border-black flex items-center justify-center">
                                    <p className="font-mono text-[10px] md:text-xs text-[#111] font-bold uppercase tracking-wider">{item.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
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
