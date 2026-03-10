"use client";

import React, { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Cloud, Mountain, Snowflake, CircleDot, Sparkles } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import Link from 'next/link';
import { 
  SiPython, SiOpenjdk, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiNodedotjs, SiFlutter, SiPhp, SiHtml5, SiAndroid, SiTensorflow, SiScikitlearn, 
  SiPandas, SiNumpy, SiMongodb, SiMysql, SiEthereum, SiGit, SiGithub, 
  SiVercel, SiFigma, SiCanva 
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

// --- Custom Hook for GSAP-like Smooth Scrubbing ---
const useSmoothScroll = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let animationFrameId: number;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const update = () => {
      // Lerp (Linear Interpolation) for smooth movement
      currentScroll += (targetScroll - currentScroll) * 0.08;
      
      // Update state if difference is noticeable
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        setScrollPos(currentScroll);
      } else if (currentScroll !== targetScroll) {
        currentScroll = targetScroll; // prevent endless loop
        setScrollPos(targetScroll);
      }
      
      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return scrollPos;
};

// --- Helper Functions ---
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// --- Easing Function ---
const easeInOutCubic = (x: number) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export default function AboutPage() {
  const scrollY = useSmoothScroll();
  const [windowDims, setWindowDims] = useState({ w: 1000, h: 800 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDims({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial call
    if (typeof window !== 'undefined') {
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Animation Calculations ---
  // The hero animation takes place over 2.0x the screen height (giving it plenty of room to finish first)
  const heroScrollRange = windowDims.h * 2.0;
  const rawProgress = windowDims.h > 0 ? clamp(scrollY / heroScrollRange, 0, 1) : 0;
  
  // Phase 1 (0 to 0.45): Image moves up to overlap and cover the name completely
  const pOverlap = easeInOutCubic(clamp(rawProgress / 0.45, 0, 1));
  // Phase 2 (0.45 to 1.0): Image shrinks and locks into the quote gap
  const pShrink = easeInOutCubic(clamp((rawProgress - 0.45) / 0.55, 0, 1));

  // Initial bounds (Step 1)
  const initImgWidth = isMobile ? 96 : 94;
  const initImgHeight = isMobile ? 85 : 85;
  const initImgTop = isMobile ? 92 : 92;
  
  // Overlap bounds (moves up to cover name, keeps same size)
  const midImgWidth = initImgWidth;
  const midImgHeight = initImgHeight;
  const midImgTop = 50;

  // Final gap dimensions to fit inside the text hole
  const finalImgWidth = isMobile ? 35 : 22;
  const finalImgHeight = isMobile ? 10 : 12;
  const finalImgTop = 46;

  // Calculate current sizes based on phases
  const currentImgWidth = pShrink > 0 ? lerp(midImgWidth, finalImgWidth, pShrink) : lerp(initImgWidth, midImgWidth, pOverlap);
  const currentImgHeight = pShrink > 0 ? lerp(midImgHeight, finalImgHeight, pShrink) : lerp(initImgHeight, midImgHeight, pOverlap);
  const currentImgTop = pShrink > 0 ? lerp(midImgTop, finalImgTop, pShrink) : lerp(initImgTop, midImgTop, pOverlap);
  const currentImgRadius = pShrink > 0 ? lerp(0.5, 2, pShrink) : 0.5; // Keeps rounded corner consistently

  // Opacity & Movement Calculations
  // Name stays completely solid and fixed in place, waiting for the image to physically cover it.
  // It instantly hides right as the image starts shrinking so it doesn't show up again behind the quote.
  const nameOpacity = pShrink > 0 ? 0 : 1;
  const nameTranslateY = 0; // Stays pinned!

  const quoteOpacity = pShrink > 0 ? clamp(pShrink * 1.5, 0, 1) : 0;
  const quoteScale = pShrink;

  return (
    <div className="bg-[#f9f6f1] text-[#111] font-sans selection:bg-black selection:text-white relative" style={{ overflowX: 'clip' }}>
      
      {/* --- Navigation --- */}
      <NavBar />

      {/* --- HERO & SCROLL SEQUENCE --- */}
      {/* 400vh container gives us 300vh of actual scroll distance. 
          The animation finishes at 200vh, leaving an intentional 100vh 'pause' 
          where the screen is completely locked before you can scroll away! */}
      <div style={{ height: '400vh' }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
          
          {/* 1. Giant Name (At the top, fades out exactly in center) */}
          <h1 className="absolute flex justify-center gap-4 md:gap-10 tracking-tighter font-black uppercase z-0 whitespace-nowrap"
              style={{
                fontSize: isMobile ? '16vw' : '15.5vw',
                lineHeight: '0.8',
                top: isMobile ? '12vh' : '12vh',
                left: '50%',
                transform: `translateX(-50%) translateY(${nameTranslateY}vh)`,
                opacity: nameOpacity,
                letterSpacing: '-0.03em'
              }}>
            <span>LEE</span>
            <span>WAI</span>
            <span>YEE</span>
          </h1>

          {/* 2. Expanding Quote (Fades in, image locks into the middle) */}
          <div className="absolute w-full flex flex-col items-center justify-center font-black uppercase tracking-tighter z-0 pointer-events-none"
               style={{
                 fontSize: isMobile ? '11vw' : '9vw',
                 lineHeight: '0.9',
                 opacity: quoteOpacity,
                 transform: `scale(${0.95 + (quoteScale * 0.05)})`
               }}>
            <div className="text-center w-full">IDEAS ARE JUST</div>
            <div className="text-center w-full">THE BEGINNING</div>
            <div className="text-center w-full">BUILDING THEM</div>
            <div className="text-center w-full">IS THE STORY</div>
          </div>

          {/* 3. The Hero Image (Starts below the name, shrinks and moves up into the quote gap) */}
          <div className="absolute z-10 overflow-hidden"
               style={{
                 width: `${currentImgWidth}vw`,
                 height: `${currentImgHeight}vh`,
                 top: `${currentImgTop}vh`,
                 left: '50%',
                 transform: 'translate(-50%, -50%)',
                 borderRadius: `${currentImgRadius}rem`,
               }}>
            <img 
              src="/grp-photo/1-wy1.JPG"
              alt="My Profile"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${lerp(1.1, 1, Math.max(pOverlap, pShrink))})`, // Slight inner parallax scale bounds
                transformOrigin: 'center center'
              }}
            />
          </div>

        </div>
      </div>

      {/* --- BRIEF INTRODUCTION SECTION --- */}
      <div className="relative z-20 bg-[#f9f6f1] px-6 pb-16 md:pb-24 pt-10 md:pt-20" id="about">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
           <div className="md:w-5/12 sticky top-32">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                DESIGNING <br/> & BUILDING <br/> INTELLIGENT <br/> DIGITAL PRODUCTS.
              </h2>
           </div>
           <div className="md:w-7/12 text-lg md:text-2xl font-medium leading-relaxed text-neutral-700">
              <p className="mb-8">
                I'm a computer science student passionate about building products where technology and user experience work together. My work spans full-stack development, artificial intelligence, and interface design — transforming complex ideas into systems that are both technically robust and intuitive to use.
              </p>
              <p className="mb-8">
                I enjoy designing and developing solutions that combine data, algorithms, and thoughtful interaction design, from AI-driven platforms and decentralized systems to interactive web applications and experimental prototypes built through research projects and hackathons.
              </p>
              <p className="mb-12">
                Every project is an opportunity to explore how engineering and design can work together to create technology that is functional, meaningful, and impactful.
              </p>

              <Link href="/work" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b-2 border-[#111] pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                Browse the archive <ArrowUpRight size={18} strokeWidth={3} />
              </Link>
           </div>
        </div>
      </div>

      {/* --- SKILLS / CLIENTS LOGO GRID --- */}
      <div className="relative z-20 bg-gradient-to-b from-[#f9f6f1] to-[#dce4f0] px-6 pt-12 md:pt-16 pb-24 md:pb-40" id="skills">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-12 w-full items-center justify-items-center text-neutral-800 mix-blend-multiply">
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiPython className="text-xl" /> Python
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiOpenjdk className="text-xl" /> Java
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiJavascript className="text-xl" /> JavaScript
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiTypescript className="text-xl" /> TypeScript
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiReact className="text-xl" /> React
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiNextdotjs className="text-xl" /> Next.js
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiTailwindcss className="text-xl" /> Tailwind CSS
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiNodedotjs className="text-xl" /> Node.js
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiFlutter className="text-xl" /> Flutter
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiAndroid className="text-xl" /> Java Mobile
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiPhp className="text-xl" /> PHP
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiHtml5 className="text-xl" /> HTML
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <TbApi className="text-xl" /> REST APIs
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiTensorflow className="text-xl" /> TensorFlow
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiScikitlearn className="text-xl" /> Scikit-learn
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiPandas className="text-xl" /> Pandas
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiNumpy className="text-xl" /> NumPy
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiMongodb className="text-xl" /> MongoDB
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiMysql className="text-xl" /> MySQL
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiEthereum className="text-xl" /> Ethereum
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiGit className="text-xl" /> Git
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiGithub className="text-xl" /> GitHub
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiVercel className="text-xl" /> Vercel
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiFigma className="text-xl" /> Figma
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity font-bold text-lg tracking-tight flex items-center gap-2">
                <SiCanva className="text-xl" /> Canva
              </div>
            </div>
        </div>
      </div>
      
    </div>
  );
}

