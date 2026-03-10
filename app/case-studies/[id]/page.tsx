"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Camera, Film, Layers, Layout, Maximize2 } from 'lucide-react';
import { PROJECTS } from '@/components/projects';
import { NavBar } from '@/components/NavBar';
import { NextProjectMarquee } from '@/components/NextProjectMarquee';

export default function CaseStudy() {
  const params = useParams();
  const id = params?.id as string;
  
  // Find the selected project or fallback to the first one
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  
  // Find next project for the footer link
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(totalScroll / windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#F2F2ED]">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      <NavBar />
      
      {/* Scroll Progress Line */}
      <div className="fixed top-0 right-0 w-1 h-full bg-[#111111]/5 z-50">
        <div 
          className="w-full bg-[#111111] transition-all duration-75 ease-out" 
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto pb-0 pt-20">
        
        {/* Hero Section (Scrolls normally) */}
        <section className="px-6 md:px-10 pt-16 pb-24 relative z-0">
          <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-12">
            <div className="max-w-4xl">
              <span className="text-zinc-400 text-3xl md:text-5xl font-light tracking-tighter mb-4 block font-mono">/{project.number}</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] mb-6 uppercase">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed uppercase tracking-wider text-sm font-bold">
                {project.tagline}
              </p>
            </div>
            
            {/* Metadata / Specs (Film theme) */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm border-l border-[#111111]/10 pl-8 font-mono text-zinc-600 shrink-0">
              <div>
                <p className="text-[#111111] mb-1 font-bold">ROLE</p>
                <p>{project.roles}</p>
              </div>
              <div>
                <p className="text-[#111111] mb-1 font-bold">DURATION</p>
                <p>12 Weeks</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#111111] mb-1 font-bold">TOOLS</p>
                <p>Figma, Framer, React</p>
              </div>
              <div className="col-span-2 mt-2 pt-4 border-t border-[#111111]/10">
                <p className="text-xs">FILE: ARCHIVE_LOG_{project.number}</p>
                <p className="text-xs">STATUS: DECLASSIFIED</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-[21/9] bg-zinc-200 rounded-xl overflow-hidden group">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale-[30%] contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute top-4 left-4 text-white/70 font-mono text-xs mix-blend-difference">
              REC // 00:00:00:00
            </div>
            <div className="absolute bottom-4 right-4 text-white/70 font-mono text-xs mix-blend-difference">
              ISO 400 / f1.4 / 1/250
            </div>
          </div>
        </section>

        {/* --- STACKED FOLDER SECTION --- */}
        <div className="relative w-full px-2 md:px-6">
          
          {/* Folder 1: The Premise */}
          <FolderSection index={0} tabId="FILE_01" title="The Premise" bgClass="bg-white" textClass="text-[#111111]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-4xl font-bold tracking-tight mb-2 uppercase italic font-black">The Premise</h2>
                <p className="opacity-50 font-mono text-sm uppercase tracking-widest">Setup & Objective</p>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-current rounded-full"></span> The Problem
                  </h3>
                  <p className="opacity-80 leading-relaxed font-medium">
                    {project.caseStudy.overview} Modern operations have become overly complex. We needed to identify core bottlenecks and redesign the conceptual framework to achieve better performance outcomes constraints.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-current rounded-full"></span> The Goal
                  </h3>
                  <p className="opacity-80 leading-relaxed font-medium">
                    Design a system that reduces friction and encourages proper workflow management, integrating seamlessly with existing tools to maximize productivity while remaining intuitive.
                  </p>
                </div>
              </div>
            </div>
          </FolderSection>

          {/* Folder 2: Research */}
          <FolderSection index={1} tabId="FILE_02" title="Research Data" bgClass="bg-[#111111]" textClass="text-[#F2F2ED]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <h2 className="text-4xl font-bold tracking-tight mb-2 uppercase italic font-black">Research</h2>
                <p className="opacity-60 font-mono text-sm uppercase tracking-widest">Discovery Phase</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-xl leading-relaxed mb-8 opacity-90 font-medium">
                  We conducted qualitative interviews with targeted stakeholders across different operational fields to gather data on primary pain points.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-[#F2F2ED]">
                  <StatCard value="82%" label="Reported Friction" className="bg-white/10 border-white/20 hover:border-white/50" />
                  <StatCard value="65%" label="Felt Overwhelmed" className="bg-white/10 border-white/20 hover:border-white/50" />
                  <StatCard value="90%" label="Preferred Simplicity" className="bg-white/10 border-white/20 hover:border-white/50" />
                </div>

                <div className="p-6 bg-white/5 rounded-lg border border-white/10 font-mono text-sm opacity-90">
                  <p className="font-bold mb-2 uppercase tracking-widest text-[#F2F2ED]">Recorded Insight_</p>
                  <p className="italic">"It's not just about speed. It's about clarity of information when taking crucial decisions. The current setups are just too noisy." — Stakeholder #14</p>
                </div>
              </div>
            </div>
          </FolderSection>

          {/* Folder 3: Design Process */}
          <FolderSection index={2} tabId="FILE_03" title="Design Process" bgClass="bg-[#E5E5E0]" textClass="text-[#111111]">
            <div className="mb-12">
              <h2 className="text-4xl font-bold tracking-tight mb-2 uppercase italic font-black">Process</h2>
              <p className="opacity-60 font-mono text-sm uppercase tracking-widest">Development & Iteration</p>
            </div>

            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Layout className="opacity-60" /> Wireframing the Interface
              </h3>
              <p className="opacity-80 max-w-3xl mb-8 leading-relaxed font-medium">
                Initial sketches focused on stripping away complex UI elements. We wanted the dashboard to be the sole focus, hiding secondary tools to prevent cognitive overload.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[9/16] bg-[#111111]/5 border border-[#111111]/10 rounded-lg flex items-center justify-center relative overflow-hidden group hover:bg-[#111111]/10 transition-colors">
                    <div className="absolute inset-0 border-[8px] border-white/50 m-2 rounded-md"></div>
                    <Film className="opacity-30 w-8 h-8" />
                    <div className="absolute bottom-4 left-4 text-xs font-mono opacity-50 font-bold">V{i}.0</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Layers className="opacity-60" /> Key UX Decisions
                </h3>
                <ul className="space-y-6">
                  <DecisionItem 
                    title="Progressive Disclosure" 
                    desc="Users are only shown tools as they become relevant. Reducing the initial toolbar elements completely altered the onboarding success rate."
                  />
                  <DecisionItem 
                    title="Component Library Scaling" 
                    desc="Mapped out a global design system strictly adhering to our geometric aesthetic constraints to enforce brutalist but clean interface usage."
                  />
                </ul>
              </div>
              <div className="bg-[#111111]/5 p-8 rounded-xl h-full flex items-center justify-center border border-[#111111]/10 relative overflow-hidden">
                <div className="w-48 h-72 bg-[#f9f6f1]/90 shadow-2xl rounded-3xl border-4 border-[#111111]/80 flex flex-col relative z-10 p-2">
                    <div className="flex-1 bg-[#111111]/90 rounded-2xl relative flex items-center justify-center">
                      <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-16 flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#111111]/10 rounded-full"></div>
                    </div>
                </div>
              </div>
            </div>
          </FolderSection>

          {/* Folder 4: Final UI */}
          <FolderSection index={3} tabId="FILE_04" title="Final Interface" bgClass="bg-[#111111]" textClass="text-[#F2F2ED]">
            <div className="flex justify-between items-end mb-12">
               <div>
                <h2 className="text-4xl font-bold tracking-tight mb-2 uppercase italic font-black">Interface</h2>
                <p className="opacity-50 font-mono text-sm uppercase tracking-widest">High Fidelity Output</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-white/5 rounded-xl overflow-hidden relative group aspect-square md:aspect-auto border border-white/10">
                <img 
                  src={project.image} 
                  alt="App UI Hero" 
                  className="w-full h-full object-cover grayscale-[30%] opacity-80 transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                  <p className="font-mono text-sm mb-1 text-white/50">FIG. 1</p>
                  <p className="text-lg font-bold">Core Application Interface</p>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="bg-white/5 rounded-xl overflow-hidden relative group flex-1 border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" 
                    alt="App UI Detail 1" 
                    className="w-full h-full object-cover grayscale-[50%] opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 border border-white/20 text-xs font-mono tracking-widest text-white backdrop-blur-md">DATA VIEW</div>
                </div>
                <div className="bg-white/10 border border-white/10 text-white rounded-xl p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <Camera className="w-8 h-8 mb-6 opacity-50" />
                    <h4 className="text-xl font-bold mb-2">Minimalist Approach</h4>
                    <p className="opacity-70 text-sm leading-relaxed">
                      UI chrome was reduced by 80% compared to native apps, putting full emphasis on functionality and data blocks.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-mono hover:text-white/60 transition-colors mt-6 uppercase tracking-widest">
                    View Prototype <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </FolderSection>

          {/* Folder 5: Architecture */}
          <FolderSection index={4} tabId="FILE_05" title="Architecture" bgClass="bg-[#DDDDDD]" textClass="text-[#111111]">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold tracking-tight mb-8 border-b border-[#111111]/20 pb-4 uppercase italic font-black">System Architecture</h2>
              <ul className="space-y-6 font-mono text-lg opacity-90">
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-4 gap-2">
                  <span className="font-bold text-[#111111]/60">Frontend</span>
                  <span className="text-xl">Next.js Framework</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-4 gap-2">
                  <span className="font-bold text-[#111111]/60">Styling Structure</span>
                  <span className="text-xl">Tailwind CSS (Brutalist Rules)</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-4 gap-2">
                  <span className="font-bold text-[#111111]/60">Backend / Logic</span>
                  <span className="text-xl">Node Environments</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-4 gap-2">
                  <span className="font-bold text-[#111111]/60">State Management</span>
                  <span className="text-xl">React Hooks Context</span>
                </li>
              </ul>
            </div>
          </FolderSection>

          {/* Folder 6: Impact & Results */}
          <FolderSection index={5} tabId="FILE_06" title="Impact" bgClass="bg-[#111111]" textClass="text-[#F2F2ED]">
            <div className="max-w-5xl">
              <h2 className="text-4xl font-bold tracking-tight mb-8 border-b border-white/20 pb-4 uppercase italic font-black">Results</h2>
              <div className="space-y-10">
                <p className="opacity-90 leading-relaxed text-xl font-medium max-w-3xl">
                  {project.caseStudy.impact} The product significantly improved user engagement and drastically cut down the time spent looking for core features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                      <p className="text-5xl font-bold mb-2">40%</p>
                      <p className="text-sm font-mono opacity-60 uppercase tracking-wider">Time Saved</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                      <p className="text-5xl font-bold mb-2">98%</p>
                      <p className="text-sm font-mono opacity-60 uppercase tracking-wider">Usability Score</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-lg flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <StarIcon size={120} />
                      </div>
                      <p className="text-2xl font-bold mb-2">Industry Standard</p>
                      <p className="text-sm font-mono opacity-60 uppercase tracking-wider">Adopted widely</p>
                   </div>
                </div>
              </div>
            </div>
          </FolderSection>
          
          {/* --- SCROLL RUNWAY SPACER --- */}
          {/* This empty space ensures the final "Impact" folder has enough vertical room to fully reach its sticky position and properly overlap the Architecture folder before the footer scrolls into view. */}
          <div className="h-[100vh] w-full pointer-events-none"></div>

        </div>

        {/* Next Project Marquee Replacement */}
        <NextProjectMarquee />

      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function FolderSection({ tabId, title, bgClass, textClass, index, children }: { tabId: string, title: string, bgClass: string, textClass: string, index: number, children: React.ReactNode }) {
  // Calculate dynamic sticky offset. Ensures tabs are staggered vertically.
  // 12px initial padding + 40px height per tab.
  const topOffset = 12 + (index * 44);

  return (
    <div 
      className="sticky w-full" 
      style={{ 
        top: `${topOffset}px`, 
        zIndex: index + 10,
      }}
    >
      {/* Folder Tab */}
      <div className="flex w-full">
        <div 
          className={`${bgClass} ${textClass} px-6 py-2 rounded-t-xl text-xs font-mono tracking-widest border-t border-x border-[#111111]/20 shadow-[0_-5px_15px_rgba(0,0,0,0.15)] flex gap-4 w-max relative z-10 uppercase`}
          style={{ marginLeft: `${index * 2}rem` }} 
        >
          <span className="opacity-50">{tabId} //</span>
          <span className="font-bold">{title}</span>
        </div>
      </div>

      {/* Folder Body */}
      <div 
        className={`${bgClass} ${textClass} w-full rounded-2xl rounded-tl-none border top-border-enhance border-[#111111]/20 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] pb-32 pt-16 px-6 md:px-12 relative -mt-[1px] overflow-y-auto no-scrollbar`}
        style={{ height: `calc(100vh - ${topOffset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

function StatCard({ value, label, className }: { value: string, label: string, className?: string }) {
  return (
    <div className={`border p-6 rounded-lg shadow-sm flex flex-col justify-center text-center transition-all duration-300 ${className || 'border-[#111111]/10 bg-white group hover:border-[#111111]'}`}>
      <span className="text-4xl font-bold tracking-tighter mb-2 transform transition-transform origin-bottom hover:scale-110">{value}</span>
      <span className="text-sm font-mono opacity-80">{label}</span>
    </div>
  );
}

function DecisionItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-current before:rounded-full">
      <h4 className="font-bold text-lg mb-1 uppercase tracking-wider">{title}</h4>
      <p className="opacity-80 text-sm leading-relaxed font-medium">{desc}</p>
    </li>
  );
}

function StarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}
