"use client";

import React, { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight, Cloud, Mountain, Snowflake, CircleDot, Sparkles } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import Link from 'next/link';

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
    <div className="bg-[#E5E5E5] text-[#111] font-sans selection:bg-black selection:text-white relative" style={{ overflowX: 'clip' }}>
      
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
            <div className="text-center w-full">I BELIEVE IN</div>
            <div className="text-center w-full flex items-center justify-center gap-2 md:gap-6 whitespace-nowrap">
              <span>THE POWER</span>
              {/* This empty span acts as the exact "hole" for the image */}
              <span style={{ width: `${finalImgWidth}vw` }}></span>
              <span>OF</span>
            </div>
            <div className="text-center w-full">TURNING IDEAS</div>
            <div className="text-center w-full">INTO IMPACT</div>
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
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop"
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
      <div className="relative z-20 bg-[#E5E5E5] px-6 pb-16 md:pb-24 pt-10 md:pt-20" id="about">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
           <div className="md:w-5/12">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                WE OFFER 360° <br/> DIGITAL STRATEGY <br/> & ENGINEERING.
              </h2>
           </div>
           <div className="md:w-7/12 text-lg md:text-2xl font-medium leading-relaxed text-neutral-700">
              <p className="mb-8">
                With a broad range of experience, I turn complex business challenges into clear, actionable strategies that drive growth. Every line of code and design decision is guided by insight, data, and creativity.
              </p>
              <p className="mb-12">
                Designed to build strong brands, reach the right audiences, and create measurable, lasting impact in the digital landscape.
              </p>

              <Link href="/work" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b-2 border-[#111] pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                Check out my previous work <ArrowUpRight size={18} strokeWidth={3} />
              </Link>
           </div>
        </div>
      </div>

      {/* --- SKILLS / CLIENTS LOGO GRID --- */}
      <div className="relative z-20 bg-gradient-to-b from-[#E5E5E5] to-[#dce4f0] px-6 pt-12 md:pt-16 pb-24 md:pb-40" id="skills">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-12 w-full items-center justify-items-center text-neutral-800 mix-blend-multiply">
              
              {/* Row 1 */}
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <Mountain size={28} className="fill-current" />
                <span className="font-bold text-xl tracking-tight">Red Bull</span>
              </div>
              <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-2xl font-black tracking-tighter lowercase">
                <Cloud size={32} className="fill-current" />
                salesforce
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-black text-3xl tracking-widest flex items-start">
                AMD<div className="w-2 h-2 bg-current ml-1 mt-1"></div>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-bold text-2xl tracking-tight lowercase">
                coinbase
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-medium text-2xl tracking-widest lowercase">
                cādence
              </div>

              {/* Row 2 */}
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-bold text-lg tracking-tight flex items-center gap-2">
                ai.io <span className="w-px h-4 bg-current opacity-30"></span> intel<div className="w-1.5 h-1.5 bg-current -ml-1 mt-2"></div>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-black text-2xl tracking-widest uppercase">
                SAMSUNG
              </div>
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="flex gap-0.5">
                   <div className="w-1.5 h-6 bg-current transform skew-y-12"></div>
                   <div className="w-1.5 h-8 bg-current transform skew-y-12 -mt-1"></div>
                   <div className="w-1.5 h-10 bg-current transform skew-y-12 -mt-2"></div>
                </div>
                <div className="text-xs font-bold leading-tight">Yolo Federal<br/><span className="font-medium">Credit Union</span></div>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-light tracking-widest uppercase text-sm flex items-center gap-2">
                <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-current">
                   <div className="w-1 h-3 bg-current"></div>
                </div> 
                Space Needle
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-serif text-sm text-center uppercase relative pt-4">
                <Snowflake size={20} className="absolute top-0 left-1/2 -translate-x-1/2" />
                The Art Of Living
              </div>

              {/* Row 3 */}
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-serif text-xl tracking-widest uppercase">
                Life House
              </div>
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-bold text-xl lowercase">
                <Sparkles size={20} className="fill-current" /> percipio
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-bold text-xl lowercase tracking-tighter">
                middle
              </div>
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-medium text-lg">
                <CircleDot size={20} /> OneLine <span className="text-[10px] tracking-widest uppercase mt-1">Health</span>
              </div>
              <div className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer font-black text-2xl tracking-widest uppercase">
                DressX
              </div>

            </div>
        </div>
      </div>
      
    </div>
  );
}

