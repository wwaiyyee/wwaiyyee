"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    id: "01",
    title: "INTELLIBOX AI",
    summary: "An award-winning hardware-software integration that utilizes machine learning to optimize home energy consumption. Winner of TechTrove 2.0.",
    year: "2025",
    tags: ["Product Design", "AI / ML"],
    // Supporting 5+ images per project
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1600"
    ]
  },
  {
    id: "02",
    title: "DOPEWS-MY",
    summary: "A localized digital workspace platform tailored for the Malaysian creative industry, focusing on community collaboration and resource sharing.",
    year: "2024",
    tags: ["UI/UX", "Web3"],
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1522542550221-31fd19255a7a?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600"
    ]
  }
];

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
          projectIndex: projectIndex
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
        if (child.tagName.toLowerCase() === 'SECTION') {
          const childCenter = child.offsetTop + child.offsetHeight / 2;
          const distance = Math.abs(scrollCenter - childCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = sectionIndex;
          }
          sectionIndex++;
        }
      });

      if (closestIndex !== activeSlideIndex && closestIndex >= 0 && closestIndex < allSlides.length) {
        setActiveSlideIndex(closestIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeSlideIndex, allSlides.length]);

  return (
    <div className="bg-[#F2F2ED] text-[#111111] min-h-screen font-sans overflow-hidden flex flex-col selection:bg-[#111111] selection:text-[#F2F2ED]">
      
      {/* --- TOP LEFT: MAIN TITLE --- */}
      <div className="fixed top-12 left-12 z-50 max-w-sm pointer-events-auto">
        <h1 className="text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
          Wai Yee's<br />Works
        </h1>
        <button className="mt-8 border border-zinc-300 rounded-full px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-[#111111] hover:text-[#F2F2ED] transition-all flex items-center gap-2">
          Contact ↗
        </button>
      </div>

      {/* --- TOP RIGHT: NAV --- */}
      <nav className="fixed top-12 right-12 z-50 flex gap-6 pointer-events-auto">
        <span className="text-[10px] uppercase tracking-widest font-bold border-b border-[#111111]">Projects</span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#111111] cursor-pointer transition-colors" onClick={() => window.location.href='/about'}>About</span>
        <div className="w-2.5 h-2.5 bg-[#111111] rounded-full ml-4"></div>
      </nav>

      {/* --- BOTTOM LEFT: PROJECT TITLE --- */}
      <div className="fixed bottom-12 left-12 z-50 pointer-events-none">
        <div key={activeProject.id} className="animate-fade-in-up">
           <p className="text-[#111111] font-mono text-[10px] mb-1 tracking-widest uppercase">Project {activeProject.id}</p>
           <h2 className="text-5xl font-bold uppercase tracking-tighter leading-none italic pointer-events-auto">
             {activeProject.title}
           </h2>
        </div>
      </div>

      {/* --- CENTER SCROLLABLE CONTENT --- */}
      <main 
        ref={scrollContainerRef}
        className="flex-grow h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide px-4 md:px-0 py-[35vh] flex flex-col gap-12 md:gap-24 relative"
      >
        {allSlides.map((slide, index) => (
          <section 
            key={`${slide.id}-${index}`}
            className="flex items-center justify-center snap-center shrink-0 w-full"
          >
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white group transition-all duration-700">
              <img 
                src={slide.currentImage} 
                alt={slide.title}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </section>
        ))}
      </main>

      {/* --- RIGHT SIDEBAR: DESCRIPTIONS --- */}
      <aside className="fixed right-12 top-1/2 -translate-y-1/2 w-64 z-40 pointer-events-none">
        <div className="space-y-12 transition-all duration-500 pointer-events-auto" key={activeProject.id}>
          
          {/* Project Counter */}
          <div className="text-6xl font-light tracking-tighter flex items-baseline">
            <span className="font-medium">0{activeProject.projectIndex + 1}</span>
            <span className="text-zinc-200 mx-2 text-4xl italic">/</span>
            <span className="text-zinc-300 text-4xl font-medium">0{PROJECTS.length}</span>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold block">Role / Summary</label>
            <p className="text-[11px] leading-relaxed text-zinc-500 font-light">
              {activeProject.summary}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 block mb-1">Year</label>
              <p className="text-[10px] font-mono">{activeProject.year}</p>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 block mb-2">Expertise</label>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag: string) => (
                  <span key={tag} className="text-[8px] border border-zinc-200 px-3 py-1 rounded-full text-zinc-400 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111] hover:opacity-70 transition-opacity">
            View Case Study
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </aside>

      {/* Footer Decoration */}
      <div className="fixed bottom-12 right-12 z-50 text-[8px] uppercase tracking-[0.4em] text-zinc-300 flex items-center gap-4 pointer-events-none">
        <span>Y. 2025</span>
        <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
        <span>N. 0{activeProject.projectIndex + 1}</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default WorkPage;
