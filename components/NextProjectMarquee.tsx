import React from 'react';
import Link from 'next/link';
import { PROJECTS } from './projects';

export const NextProjectMarquee = () => {
    // Generate some display constraints to simulate the masonry effect
    const staggerOffsets = ['mt-0', 'mt-32', 'mt-12', 'mt-48', 'mt-20'];
    
    // Map existing PROJECTS to the marquee structure
    const caseStudies = PROJECTS.map((project, index) => ({
        id: project.id,
        number: project.number,
        title: project.title,
        subtitle: project.tagline,
        roles: project.roles,
        image: project.image,
        offsetY: staggerOffsets[index % staggerOffsets.length],
    }));

    // We duplicate the array to ensure a perfectly seamless infinite scroll loop
    // Add multiple duplicates if the list is small to ensure continuous looping on wide screens
    const duplicatedStudies = [...caseStudies, ...caseStudies, ...caseStudies, ...caseStudies];

    return (
        <>
            <style>
                {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: infinite-scroll 60s linear infinite;
            width: max-content;
          }
        `}
            </style>

            <section className="relative w-full overflow-hidden pt-12 pb-0 bg-[#F2F2ED] text-[#111111] selection:bg-[#111111] selection:text-[#F2F2ED] z-10">

                {/* Header Section (Constrained) */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 relative z-10 w-full">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        More <br/><span className="text-zinc-400">Projects</span>
                    </h2>
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#111111]/10 to-transparent mt-8"></div>
                </div>

                {/* Marquee Track Container (Full Width) */}
                <div className="relative w-full overflow-hidden flex items-start pb-4">

                    {/* Scrolling Track */}
                    <div className="flex animate-marquee gap-8 px-6">
                        {duplicatedStudies.map((study, index) => (
                            <Link href={`/case-studies/${study.id}`} key={`${study.id}-${index}`}>
                                <div
                                    className={`group relative flex flex-col w-[200px] md:w-[260px] flex-shrink-0 cursor-pointer ${study.offsetY}`}
                                >
                                    {/* Image Container with Hover Effect */}
                                    <div className="relative overflow-hidden w-full aspect-[4/5] mb-4 border border-[#111111]/10">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col space-y-1">
                                        <h3 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase text-[#111111] group-hover:opacity-70 transition-opacity duration-300">
                                            {study.title}
                                        </h3>
                                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">
                                            {study.subtitle}
                                        </p>
                                        <p className="text-[9px] uppercase font-mono text-zinc-400">
                                            [{study.roles}]
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
};