import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function CaseStudyView({ project, onBack }: { project: any, onBack: () => void }) {
    return (
        <div className="animate-in slide-in-from-bottom-12 duration-700 bg-[#111] text-[#f9f6f1] min-h-screen">

            {/* Brutalist Sticky Header */}
            <div className="sticky top-0 z-50 flex justify-between items-center p-6 border-b border-[#333] bg-[#111] font-mono text-sm uppercase tracking-widest">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
                <span>{project.number} / {project.title}</span>
            </div>

            <div className="p-6 md:p-12 lg:p-24">
                {/* Massive Title */}
                <h1 className="text-[12vw] leading-none font-bold tracking-tighter mb-12 uppercase mix-blend-difference">
                    {project.title}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-4 space-y-8 font-mono text-sm uppercase text-gray-400">
                        <div>
                            <span className="block mb-2 text-white">Role</span>
                            {project.roles}
                        </div>
                        <div>
                            <span className="block mb-2 text-white">Context</span>
                            Product Design & Engineering
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                            {project.tagline}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-serif max-w-3xl">
                            {project.caseStudy.overview}
                        </p>
                    </div>
                </div>

                {/* Huge Image Reveal */}
                <div className="w-full aspect-video border border-[#333] mb-24 overflow-hidden group">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                </div>

                {/* Impact Section */}
                <div className="border-t border-[#333] pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">The Impact</h3>
                    <p className="text-2xl md:text-4xl font-serif text-gray-400 leading-tight">
                        "{project.caseStudy.impact}"
                    </p>
                </div>
            </div>
        </div>
    );
}
