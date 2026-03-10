import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, X, Briefcase } from 'lucide-react';

export function LanyardModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const userData = {
        name: "Lee Wai Yee",
        photo: "/profile pic.jpeg",
        githubUrl: "https://github.com/wwaiyyee",
        linkedinUrl: "https://linkedin.com/in/lee-wai-yee",
    };

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    if (!open) return null;

    return <PhysicsLanyard userData={userData} onClose={onClose} />;
}


/* ==============================================================
 * ULTRA-FAST DOM VERLET PHYSICS SIMULATION
 * ============================================================== */

function PhysicsLanyard({ userData, onClose }: any) {
    const pathRef = useRef<SVGPathElement>(null);
    const shadowRef = useRef<SVGPathElement>(null);
    const highlightRef = useRef<SVGPathElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Physics Simulation State
    const segmentCount = 10;
    const segmentLength = 18; // 10 * 18 = 180px drop
    const points = useRef(Array.from({ length: segmentCount }, () => ({ x: 0, y: 0, ox: 0, oy: 0 })));
    const mousePos = useRef({ x: typeof window !== 'undefined' ? document.documentElement.clientWidth / 2 : 500, y: 0 });
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const cardVel = useRef({ spin: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    useEffect(() => {
        let animationFrameId: number;
        const originY = -20;

        // Init rope high up so it realistically drops in
        points.current.forEach((p, i) => {
            p.x = document.documentElement.clientWidth / 2;
            p.y = -400 + i * segmentLength;
            p.ox = p.x;
            p.oy = p.y;
        });

        const updatePhysics = () => {
            const currentOriginX = document.documentElement.clientWidth / 2;

            // 1. Verlet Integration (Gravity & Inertia)
            for (let i = 1; i < segmentCount; i++) {
                const p = points.current[i];
                const vx = (p.x - p.ox) * 0.92; // Friction
                const vy = (p.y - p.oy) * 0.92;

                p.ox = p.x;
                p.oy = p.y;

                p.x += vx;
                p.y += vy + 1.5; // Gravity
            }

            // 2. Constraints Solver (Rigidity & Dragging)
            for (let iter = 0; iter < 12; iter++) {
                // Pin Top firmly to the center
                points.current[0].x = currentOriginX;
                points.current[0].y = originY;

                // Pin Bottom if dragging
                if (isDragging.current) {
                    const last = points.current[segmentCount - 1];
                    last.x = mousePos.current.x - dragOffset.current.x;
                    last.y = mousePos.current.y - dragOffset.current.y;
                }

                // Maintain Rope Segment Distances
                for (let i = 0; i < segmentCount - 1; i++) {
                    const p1 = points.current[i];
                    const p2 = points.current[i + 1];
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist === 0) continue;

                    const diff = segmentLength - dist;
                    const percent = diff / dist / 2;
                    const offsetX = dx * percent;
                    const offsetY = dy * percent;

                    if (i !== 0) {
                        p1.x -= offsetX;
                        p1.y -= offsetY;
                    }
                    if (i + 1 !== segmentCount - 1 || !isDragging.current) {
                        p2.x += offsetX;
                        p2.y += offsetY;
                    }
                }
            }

            // 3. Render Visuals (Direct DOM manipulation for 60fps)
            // Draw a realistic lanyard loop (down the left side, up the right side)
            let pathStr = '';
            for (let i = 0; i < segmentCount; i++) {
                const p = points.current[i];
                // Widen the loop significantly at the top so it looks like a neck strap
                const offsetX = Math.max(0, (segmentCount - 1 - i) * 25);
                pathStr += `${i === 0 ? 'M' : 'L'} ${p.x - offsetX} ${p.y} `;
            }
            for (let i = segmentCount - 1; i >= 0; i--) {
                const p = points.current[i];
                const offsetX = Math.max(0, (segmentCount - 1 - i) * 25);
                pathStr += `L ${p.x + offsetX} ${p.y} `;
            }

            if (pathRef.current) pathRef.current.setAttribute('d', pathStr);
            if (shadowRef.current) shadowRef.current.setAttribute('d', pathStr);
            if (highlightRef.current) highlightRef.current.setAttribute('d', pathStr);

            if (cardRef.current) {
                const last = points.current[segmentCount - 1];
                const prev = points.current[segmentCount - 2];

                // Z-Rotation (Swing angle)
                let angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
                const maxSwing = Math.PI / 3;
                angle = Math.max(-maxSwing, Math.min(maxSwing, angle));
                const rotZ = angle * (180 / Math.PI);

                // Y-Rotation (Spin momentum)
                const vx = last.x - last.ox;
                if (!isDragging.current) {
                    cardVel.current.spin += vx * 0.08;
                } else {
                    cardVel.current.spin *= 0.8; // Dampen spin while holding
                }
                cardVel.current.spin *= 0.94; // Spin friction
                const rotY = cardVel.current.spin;

                // Apply 3D Transform
                cardRef.current.style.transform = `translate(${last.x}px, ${last.y - 10}px) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`;
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        updatePhysics();

        // Global mouse tracking for gentle sway when not dragging
        const handleGlobalMove = (e: MouseEvent) => {
            if (!isDragging.current) {
                mousePos.current = { x: e.clientX, y: e.clientY };
            }
        };
        window.addEventListener('mousemove', handleGlobalMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleGlobalMove);
        };
    }, []);

    // --- Interaction Handlers ---
    const handlePointerDown = (e: React.PointerEvent) => {
        // Don't drag if clicking a button or link
        if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) return;

        isDragging.current = true;
        const last = points.current[segmentCount - 1];
        dragOffset.current = {
            x: e.clientX - last.x,
            y: e.clientY - last.y
        };
        e.currentTarget.setPointerCapture(e.pointerId);
        e.preventDefault(); // Stop text selection
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging.current) {
            mousePos.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (isDragging.current) {
            isDragging.current = false;
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    const handleCardMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setGlare({ x, y, opacity: 0.6 });
    };

    return (
        <div className="fixed inset-0 z-[500] flex items-start justify-center h-[100dvh] w-full" style={{ perspective: '1200px' }}>
            {/* Dimmed Background */}
            <div
                className="absolute inset-0 w-full h-full transition-opacity animate-in fade-in duration-500"
                style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)' }}
                onClick={onClose}
            ></div>

            {/* Dynamic 3D SVG Rope (Black Lanyard Style) */}
            <svg className="absolute inset-0 w-full h-full z-10 overflow-visible pointer-events-none">
                {/* Shadow */}
                <path ref={shadowRef} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="32" className="blur-md" transform="translate(0, 15)" />
                {/* Main Base  - dark grey/black for lanyard */}
                <path id="lanyardPath" ref={pathRef} fill="none" stroke="#18181b" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
                {/* Highlight Layer - slight sheen */}
                <path ref={highlightRef} fill="none" stroke="#27272a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Fabric Text Loop */}
                <text fill="#a1a1aa" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="0.3em">
                    <textPath href="#lanyardPath" startOffset="50%" textAnchor="middle">
                        {" LEE WAI YEE  •  PORTFOLIO  • ".repeat(6)}
                    </textPath>
                </text>
            </svg>

            {/* Draggable Card Assembly */}
            <div
                ref={cardRef}
                className="absolute top-0 left-0 z-20 pointer-events-auto origin-[50%_10px]"
                style={{
                    marginLeft: '-160px', // Half of width
                    width: '320px',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* Clip connector */}
                <div className="relative mx-auto w-14 h-20 flex flex-col items-center drop-shadow-xl z-20 -mb-6 pointer-events-none">
                    {/* D-Ring Top */}
                    <div className="w-8 h-8 rounded-full border-[5px] border-zinc-700 shadow-inner"></div>
                    {/* Neck */}
                    <div className="w-4 h-6 bg-gradient-to-b from-zinc-600 to-zinc-800 -mt-2 z-10"></div>
                    {/* Clamp Base */}
                    <div className="w-14 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-lg border border-zinc-500 shadow-[0_5px_15px_rgba(0,0,0,0.4)] relative flex items-center justify-center -mt-1">
                        <div className="w-10 h-2 bg-zinc-200 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"></div>
                        {/* Pin going through the card hole */}
                        <div className="absolute -bottom-6 w-3 h-8 bg-zinc-700 rounded-b-xl shadow-md"></div>
                    </div>
                </div>

                {/* The ID Badge Container */}
                <div
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={() => setGlare(prev => ({ ...prev, opacity: 0 }))}
                    className="relative w-full bg-[#f9f6f1] rounded-[1.5rem] overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-200 cursor-grab active:cursor-grabbing group select-none pb-8"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Card Hole Punch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-3 bg-zinc-900 rounded-full shadow-[inset_0_4px_4px_rgba(0,0,0,0.8)] z-30"></div>

                    {/* Interactive Plastic Glare Overlay */}
                    <div
                        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-[1.5rem]"
                        style={{
                            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
                            mixBlendMode: 'hard-light'
                        }}
                    />

                    {/* Profile Photo */}
                    <div className="flex-1 px-8 pt-10 pb-6 flex flex-col items-center relative z-20 w-full">
                        <div className="relative w-32 h-32 rounded-full bg-slate-50 shadow-[0_8px_20px_rgba(0,0,0,0.15)] border-[6px] border-slate-200 mb-6 group-hover:scale-105 transition-transform duration-300">
                            <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover rounded-full pointer-events-none" draggable="false" />
                        </div>

                        {/* Profile Info */}
                        <h2 className="text-4xl font-serif tracking-tight text-[#111] text-center mb-6">
                            {userData.name}
                        </h2>

                        {/* Action Links */}
                        <div className="w-full space-y-3 relative z-30 mt-2">
                            <a
                                href={userData.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-3 px-6 bg-[#111] text-white rounded-xl hover:bg-gray-800 transition-colors font-mono tracking-widest shadow-md active:scale-95 group/btn"
                            >
                                <Github className="w-5 h-5 mr-3 group-hover/btn:text-gray-400 transition-colors" /> GITHUB
                            </a>
                            <a
                                href={userData.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-3 px-6 bg-[#0A66C2] text-white rounded-xl hover:bg-[#004182] transition-colors font-mono tracking-widest shadow-md active:scale-95 group/btn"
                            >
                                <Linkedin className="w-5 h-5 mr-3 group-hover/btn:text-blue-300 transition-colors" /> LINKEDIN
                            </a>
                        </div>
                    </div>

                    {/* Close Button on Card */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-white text-gray-600 rounded-full transition-colors z-50 shadow-sm border border-gray-300 active:scale-95"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
