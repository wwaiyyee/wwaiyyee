"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { NavBar } from '../../components/NavBar';
import { WORK_PROJECTS as PROJECTS } from '../../data/work-projects';



const WorkPage = () => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const scrollContainerRef = useRef<HTMLElement>(null);

	// Flatten projects into a single array of slides for the scrollable area
	const allSlides = useMemo(() => {
		const slides: any[] = [];
		PROJECTS.forEach((project, projectIndex) => {
			project.images.forEach((img, imgIndex) => {
				slides.push({
					...project,
					currentImage: img,
					imageNumber: imgIndex + 1,
					totalImages: project.images.length,
					projectIndex: projectIndex,
				});
			});
		});
		return slides;
	}, []);

	const activeProject = allSlides[activeSlideIndex] || allSlides[0];

	useEffect(() => {
		const handleScroll = (e: any) => {
			const container = e.target;
			const scrollCenter = container.scrollTop + container.clientHeight / 2;

			let closestIndex = activeSlideIndex;
			let minDistance = Infinity;

			// Ensure we only check the sections, subtracting the final spacer div if necessary
			let sectionIndex = 0;
			Array.from(container.children).forEach((child: any) => {
				if (child.tagName.toLowerCase() === 'section') {
					const childCenter = child.offsetTop + child.offsetHeight / 2;
					const distance = Math.abs(scrollCenter - childCenter);
					if (distance < minDistance) {
						minDistance = distance;
						closestIndex = sectionIndex;
					}
					sectionIndex++;
				}
			});

			if (
				closestIndex !== activeSlideIndex &&
				closestIndex >= 0 &&
				closestIndex < allSlides.length
			) {
				setActiveSlideIndex(closestIndex);
			}
		};

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll, { passive: true });
		}
             return () => container?.removeEventListener('scroll', handleScroll);
    }, [activeSlideIndex, allSlides.length]);

    const isDark = activeProject.projectIndex % 2 !== 0;

        return (
                <div className={`min-h-screen font-sans overflow-hidden flex flex-col transition-colors duration-700 ${isDark ? "bg-[#111111] text-[#f9f6f1] selection:bg-[#f9f6f1] selection:text-[#111]" : "bg-gradient-to-b from-[#f9f6f1] to-[#dce4f0] text-[#111111] selection:bg-[#111111] selection:text-[#F2F2ED]"}`}>
                        <NavBar />			{/* --- TOP LEFT: MAIN TITLE --- */}
			<div className="fixed top-24 left-6 md:top-12 md:left-12 z-50 max-w-[200px] md:max-w-sm pointer-events-auto">
				<h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
					Wai Yee's
					<br />
					Works
				</h1>
				{activeProject.links && activeProject.links.length > 0 && (
					<div className="mt-4 md:mt-8 flex flex-col gap-2 md:gap-3">
						{activeProject.links.map((link: { label: string; url: string }, i: number) => (
							<a
								key={i}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`border rounded-full px-4 py-2 md:px-6 md:py-2 text-[8px] md:text-[10px] uppercase tracking-widest transition-all flex items-center justify-between gap-2 w-fit ${isDark ? "border-zinc-700 hover:bg-[#f9f6f1] hover:text-[#111]" : "border-zinc-300 hover:bg-[#111111] hover:text-[#F2F2ED]"}`}
							>
								{link.label} ↗
							</a>
						))}
					</div>
				)}
			</div>

			{/* --- BOTTOM LEFT: PROJECT TITLE --- */}
			<div className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-50 pointer-events-none">
				<div key={activeProject.id} className="animate-fade-in-up">
					<p className={`font-mono text-[8px] md:text-[10px] mb-1 tracking-widest uppercase transition-colors duration-700 ${isDark ? "text-zinc-400" : "text-[#111111]"}`}>
						Project {activeProject.id}
					</p>
					                                     <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none not-italic pointer-events-auto">
						{activeProject.title}
					</h2>
				</div>
			</div>

                        {/* --- CENTER SCROLLABLE CONTENT --- */}
                        <main
                                ref={scrollContainerRef}
                                className="flex-grow h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide px-4 md:px-0 py-[20vh] md:py-[35vh] flex flex-col gap-16 md:gap-24 relative z-40"
                        >
                                {allSlides.map((slide, index) => (
                                        <section
                                                key={`${slide.id}-${index}`}
                                                className="flex flex-col items-center justify-center snap-center shrink-0 w-full"
                                        >
                                                <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-md lg:max-w-lg aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white group transition-all duration-700">
                                                        <img
                                                                src={slide.currentImage}
                                                                alt={slide.title}
                                                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                                                        />
                                                </div>

                                                {/* Mobile Description */}
                                                <div className="md:hidden mt-6 w-full max-w-[320px] sm:max-w-[380px] pointer-events-auto">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className={`text-xl font-light ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>{String(slide.projectIndex + 1).padStart(2, '0')}<span className="text-zinc-400 mx-1">/</span><span className="text-zinc-500 text-sm">{String(PROJECTS.length).padStart(2, '0')}</span></span>
                                                    </div>
                                                    
                                                    {slide.imageNumber === 1 ? (
                                                        <p className="text-[11px] leading-relaxed font-light whitespace-pre-wrap text-justify text-zinc-500">
                                                            {slide.summary}
                                                        </p>
                                                    ) : (
                                                        slide.descriptions && slide.descriptions[slide.imageNumber - 1] && (
                                                            <p className="text-[11px] leading-relaxed font-light whitespace-pre-wrap text-justify text-zinc-500">
                                                                {slide.descriptions[slide.imageNumber - 1]}
                                                            </p>
                                                        )
                                                    )}
                                                    
                                                    {slide.imageNumber === 1 && (
                                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                                            {slide.tags.map((tag: string) => (
                                                                <span key={tag} className="text-[8px] border px-2 py-0.5 rounded-full uppercase tracking-widest border-zinc-400/30 text-zinc-500">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    
                                                    {slide.imageNumber === 1 && ['01', '02'].includes(slide.id) && (
                                                        <Link href={`/case-studies/${slide.id === '01' ? 'dopews' : 'twinkle'}`} className={`mt-4 group flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-70 transition-opacity ${isDark ? "text-[#f9f6f1]" : "text-[#111111]"}`}>
                                                                Case Study
                                                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </Link>
                                                    )}
                                                </div>
                                        </section>
                                ))}
                        </main>			{/* --- RIGHT SIDEBAR: DESCRIPTIONS --- */}
			<aside className="hidden md:block fixed right-12 top-1/2 -translate-y-1/2 w-64 z-40 pointer-events-none">
				<div
					className="space-y-12 transition-all duration-500 pointer-events-auto"
					key={activeProject.id}
				>
					{/* Project Counter with Interactive Select Jump */}
					<div className="text-6xl font-light tracking-tighter flex items-baseline relative group cursor-pointer" title="Jump to project">
						<div className="relative inline-block">
							<span className="font-medium hover:opacity-70 transition-opacity">
										{String(activeProject.projectIndex + 1).padStart(2, '0')}
									</span>
									<select
										className="absolute inset-x-0 w-[40px] left-1/2 -translate-x-1/2 opacity-0 cursor-pointer text-black text-[30px] aspect-square"
										value={activeProject.projectIndex}
										onChange={(e) => {
											const targetProjectIndex = parseInt(e.target.value);
											const targetSlideIndex = allSlides.findIndex(s => s.projectIndex === targetProjectIndex);
											if (targetSlideIndex !== -1 && scrollContainerRef.current) {
												const sections = Array.from(scrollContainerRef.current.children).filter(child => (child as HTMLElement).tagName.toLowerCase() === 'section') as HTMLElement[];
												const targetSection = sections[targetSlideIndex];
												if (targetSection) {
													scrollContainerRef.current.scrollTo({
														top: targetSection.offsetTop - (scrollContainerRef.current.clientHeight / 2) + (targetSection.clientHeight / 2),
														behavior: 'smooth'
													});
												}
											}
										}}
									>
										{PROJECTS.map((p, idx) => (
											<option className="text-[10px] text-center" key={p.id} value={idx}>
												{String(idx + 1).padStart(2, '0')}
											</option>
										))}
									</select>
						</div>
						<span className="text-zinc-200 mx-2 text-4xl italic">/</span>
						<span className="text-zinc-300 text-4xl font-medium">
							{String(PROJECTS.length).padStart(2, '0')}
						</span>
					</div>

					{/* Summary */}
										<div className="space-y-4">
											<label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">
												Summary
											</label>
											<p className="text-[11px] leading-relaxed text-zinc-500 font-light whitespace-pre-wrap text-justify">
												{activeProject.summary}
											</p>
										</div>

										{/* Description */}
										{activeProject.imageNumber > 1 && activeProject.descriptions && activeProject.descriptions[activeProject.imageNumber - 1] && (
											<div className="space-y-4 animate-fade-in-up">
												<label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">
													Description
												</label>
												<p className="text-[11px] leading-relaxed text-zinc-500 font-light whitespace-pre-wrap text-justify">
													{activeProject.descriptions[activeProject.imageNumber - 1]}
												</p>
											</div>
										)}

					{/* Details */}
					<div className="space-y-6">
						<div>
							<label className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 block mb-1">
								Year
							</label>
							<p className="text-[10px] font-mono">{activeProject.year}</p>
						</div>
						<div>
							<div className="flex flex-wrap gap-2">
								{activeProject.tags.map((tag: string) => (
									<span
										key={tag}
										className="text-[8px] border border-zinc-200 px-3 py-1 rounded-full text-zinc-400 uppercase tracking-widest"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>

                                        {/* CTA */}
                                        {['01', '02'].includes(activeProject.id) && (
                                                <Link href={`/case-studies/${activeProject.id === '01' ? 'dopews' : 'twinkle'}`} className={`group flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-70 transition-opacity ${isDark ? "text-[#f9f6f1]" : "text-[#111111]"}`}>
                                                        View Case Study
                                                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </Link>
                                        )}
                                </div>
                        </aside>							{/* Footer Decoration */}
							<div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 text-[8px] uppercase tracking-[0.4em] text-zinc-400 md:text-zinc-300 flex items-center gap-2 md:gap-4 pointer-events-none">
				<span>Y. 2025</span>
				<div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
				<span>N. 0{activeProject.projectIndex + 1}</span>
			</div>

			<style
				dangerouslySetInnerHTML={{
					__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }    
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;      
        }
      `,
				}}
			/>
		</div>
	);
};

export default WorkPage;

