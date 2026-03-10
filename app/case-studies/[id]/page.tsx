"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Film,
  Layers,
  Layout,
  Maximize2,
  Lightbulb,
  Search,
  PenTool,
  Server,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { PROJECTS } from "@/components/projects";
import { NavBar } from "@/components/NavBar";
import { NextProjectMarquee } from "@/components/NextProjectMarquee";

export default function CaseStudy() {
  const params = useParams();
  const id = params?.id as string;

  // Find the selected project or fallback to the first one
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];

  // Find next project for the footer link
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [openSections, setOpenSections] = useState([
    "premise",
    "research",
    "design",
    "interface",
    "architecture",
    "impact",
  ]);

  const handleToggle = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  // Inject Google Font for the elegant Serif look
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(totalScroll / windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f6f1] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#F2F2ED]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `,
        }}
      />
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
              <span className="text-zinc-400 text-3xl md:text-5xl font-light tracking-tighter mb-4 block font-mono">
                /{project.number}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] mb-6 uppercase">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed uppercase tracking-wider text-sm font-bold">
                {project.tagline}
              </p>
            </div>

            {/* Metadata / Specs (Film theme) */}
            <div className="flex flex-col gap-6 text-sm border-l border-[#111111]/10 pl-8 font-mono text-zinc-600 w-full md:max-w-[300px] lg:max-w-[400px] shrink-0">
              <div>
                <p className="text-[#111111] mb-1 font-bold">ROLE</p>
                <p className="leading-relaxed">{project.roles}</p>
              </div>
              <div>
                <p className="text-[#111111] mb-1 font-bold">TOOLS</p>
                <p className="leading-relaxed text-wrap break-words">
                  {(project as any).tools || "Figma, Framer, React"}
                </p>
              </div>

              {(project as any).achievements && (
                <div className="mt-2 pt-4 border-t border-[#111111]/10">
                  <p className="text-[#111111] mb-1 font-bold">ACHIEVEMENTS</p>
                  <p className="opacity-80 leading-relaxed font-sans text-sm">
                    {(project as any).achievements}
                  </p>
                </div>
              )}
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

        {/* --- FOLDABLE SECTIONS --- */}
        <div className="w-full px-6 md:px-10 flex flex-col gap-8 md:gap-10 mb-32 z-10 relative">
          {/* Foldable Section 1: The Premise */}
          <FoldableSection
            id="premise"
            title="The Premise"
            icon={Lightbulb}
            iconColor="text-amber-600"
            bgColor="bg-amber-50"
            imageBorder="border-amber-200"
            summary="Setup & Objective"
            isOpen={openSections.includes("premise")}
            onClick={() => handleToggle("premise")}
          >
            {project.id === "dopews" ? (
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#111111] rounded-full"></span>{" "}
                    The Problem
                  </h3>
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <p className="text-stone-600 leading-relaxed font-sans font-medium text-base">
                        Dengue outbreaks in Malaysia are often detected only
                        after case numbers have already surged, leaving little
                        time for preventive action. Existing surveillance
                        systems mainly focus on reporting confirmed cases rather
                        than predicting future outbreaks.
                        <br />
                        <br />
                        This reactive approach means authorities only respond
                        once transmission is already widespread, limiting the
                        effectiveness of mosquito control and public awareness
                        measures.
                        <br />
                        <br />
                        Malaysia has experienced significant dengue fluctuations
                        in recent years, highlighting the urgent need for
                        predictive outbreak monitoring tools.
                      </p>
                    </div>
                    <div className="w-full lg:w-72 flex-shrink-0">
                      <div className="bg-[#111111] border border-[#111111] p-6 rounded-2xl relative overflow-hidden group">
                        <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                          <p className="text-xs font-bold text-[#f9f6f1]/50 uppercase tracking-widest mb-1">
                            2021
                          </p>
                          <p className="text-2xl font-black text-white mb-6 font-mono tracking-tighter">
                            26,301{" "}
                            <span className="text-sm font-medium text-[#f9f6f1]/60 font-sans tracking-normal">
                              cases
                            </span>
                          </p>

                          <div className="flex items-center gap-2 mb-6">
                            <div className="h-[1px] flex-1 bg-white/20"></div>
                            <div className="text-[10px] font-bold text-[#f9f6f1] uppercase tracking-widest bg-white/10 px-2 py-1 rounded-full border border-white/20">
                              Surge
                            </div>
                            <div className="h-[1px] flex-1 bg-white/20"></div>
                          </div>

                          <p className="text-xs font-bold text-[#f9f6f1]/50 uppercase tracking-widest mb-1">
                            2023
                          </p>
                          <p className="text-4xl lg:text-5xl font-black text-white font-mono tracking-tighter">
                            120K+{" "}
                            <span className="text-sm font-medium text-[#f9f6f1]/60 font-sans tracking-normal block mt-1">
                              cases
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-[#111111]/10"></div>

                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#111111] rounded-full"></span>{" "}
                    The Goal
                  </h3>
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <p className="text-stone-600 leading-relaxed font-sans font-medium text-base">
                        Design an AI-driven early warning system capable of
                        forecasting dengue outbreak risks before case escalation
                        occurs.
                        <br />
                        <br />
                        The system integrates epidemiological, environmental,
                        and demographic data to produce predictive outbreak
                        forecasts, enabling authorities to respond earlier and
                        allocate resources more effectively.
                        <br />
                        <br />
                        The objective was to build a platform that shifts dengue
                        surveillance from proactive monitoring to proactive
                        prevention.
                      </p>
                    </div>
                    <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3">
                      <div className="bg-transparent border border-[#111111]/20 p-4 rounded-xl flex items-center gap-4 group hover:bg-[#111111]/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center font-black text-xl text-[#f9f6f1] font-mono group-hover:scale-110 transition-transform">
                          7
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#111111] text-sm">
                            Day Forecast
                          </span>
                          <span className="text-xs text-[#111111]/60 font-medium tracking-wide">
                            Short-term
                          </span>
                        </div>
                      </div>
                      <div className="bg-transparent border border-[#111111]/20 p-4 rounded-xl flex items-center gap-4 group hover:bg-[#111111]/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center font-black text-xl text-[#f9f6f1] font-mono group-hover:scale-110 transition-transform">
                          14
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#111111] text-sm">
                            Day Forecast
                          </span>
                          <span className="text-xs text-[#111111]/60 font-medium tracking-wide">
                            Mid-term
                          </span>
                        </div>
                      </div>
                      <div className="bg-transparent border border-[#111111]/20 p-4 rounded-xl flex items-center gap-4 group hover:bg-[#111111]/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center font-black text-xl text-[#f9f6f1] font-mono group-hover:scale-110 transition-transform">
                          28
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#111111] text-sm">
                            Day Forecast
                          </span>
                          <span className="text-xs text-[#111111]/60 font-medium tracking-wide">
                            Long-term
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : project.id === "twinkle" ? (
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start w-full">
                <div className="md:w-[250px] shrink-0">
                  <h3 className="text-2xl md:text-4xl font-serif font-black italic tracking-tighter leading-[1.1] text-[#111111]">
                    Identifying
                    <br />
                    the Opportunity
                  </h3>
                </div>
                <div className="md:flex-1 flex flex-col gap-6 text-[#111111]/70 font-medium text-base md:text-lg leading-relaxed">
                  <p>
                    Traditional learning environments often struggle to support children with different cognitive needs, particularly neurodiverse learners such as children with ADHD.
                  </p>
                  <p>
                    Many educational platforms rely on static content or repetitive exercises that fail to maintain attention or provide meaningful engagement. As a result, students quickly lose focus, and learning becomes frustrating rather than motivating.
                  </p>
                  <p>
                    The opportunity was to design a playful, interactive learning experience that combines storytelling, visual feedback, and game mechanics to make learning engaging and accessible.
                  </p>
                  <p>
                    The premise was simple: create a 3D interactive environment where children can learn through exploration, curiosity, and playful interaction rather than passive instruction.
                  </p>
                </div>
              </div>
            ) : null}
          </FoldableSection>

          {/* Foldable Section 2: Research */}
          <FoldableSection
            id="research"
            title="Research Data"
            icon={Search}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
            imageBorder="border-blue-200"
            summary="Discovery Phase"
            isOpen={openSections.includes("research")}
            onClick={() => handleToggle("research")}
          >
            {project.id === "dopews" ? (
              <div className="flex flex-col gap-12">
                <p className="text-xl md:text-3xl font-medium leading-tight tracking-tight text-[#111111] max-w-4xl">
                  Current platforms only report{" "}
                  <span className="line-through decoration-[#111111]/30 opacity-60">
                    historical data
                  </span>
                  . Outbreak signals are typically detected{" "}
                  <span className="italic font-serif">after</span> transmission
                  has already spread.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#111111]/10">
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col gap-6 group hover:bg-[#111111] transition-colors relative">
                    <div className="text-4xl font-black font-mono text-[#111111]/10 group-hover:text-[#f9f6f1]/20 transition-colors">
                      01
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-wider mb-2 text-[#111111] group-hover:text-[#f9f6f1] transition-colors">
                        Reactive vs Predictive
                      </h4>
                      <p className="font-medium text-sm text-[#111111]/60 group-hover:text-[#f9f6f1]/60 transition-colors leading-relaxed">
                        Most dashboards focus on case reporting rather than
                        predictive forecasting.
                      </p>
                    </div>
                  </div>
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col gap-6 group hover:bg-[#111111] transition-colors relative">
                    <div className="text-4xl font-black font-mono text-[#111111]/10 group-hover:text-[#f9f6f1]/20 transition-colors">
                      02
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-wider mb-2 text-[#111111] group-hover:text-[#f9f6f1] transition-colors">
                        Fragmented Variables
                      </h4>
                      <p className="font-medium text-sm text-[#111111]/60 group-hover:text-[#f9f6f1]/60 transition-colors leading-relaxed">
                        Rainfall patterns and urban density play massive roles
                        but lack integration.
                      </p>
                    </div>
                  </div>
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col gap-6 group hover:bg-[#111111] transition-colors relative">
                    <div className="text-4xl font-black font-mono text-[#111111]/10 group-hover:text-[#f9f6f1]/20 transition-colors">
                      03
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-wider mb-2 text-[#111111] group-hover:text-[#f9f6f1] transition-colors">
                        Vague Interventions
                      </h4>
                      <p className="font-medium text-sm text-[#111111]/60 group-hover:text-[#f9f6f1]/60 transition-colors leading-relaxed">
                        Authorities require better geographic visualization to
                        make fast decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-[#111111] text-[#f9f6f1] relative shadow-xl">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#f9f6f1]/20" />
                  <p className="font-bold mb-6 uppercase tracking-widest text-[#f9f6f1]/50 text-xs font-mono">
                    Recorded Insight_
                  </p>
                  <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#f9f6f1]/90">
                    "Reactive surveillance detects dengue outbreaks only after
                    cases escalate, leaving minimal lead time for preventive
                    intervention."
                  </p>
                </div>
              </div>
            ) : project.id === "twinkle" ? (
              <div className="flex flex-col gap-12">
                <p className="text-xl md:text-3xl font-medium leading-tight tracking-tight text-[#111111] max-w-4xl">
                  Research focused on understanding how <span className="italic font-serif">neurodiverse children</span> engage with educational content and identifying the factors that influence their motivation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#111111]/10">
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-[#111111] transition-colors h-48">
                    <div className="text-3xl font-serif font-black text-[#111111] group-hover:text-[#f9f6f1] transition-colors mb-4">
                      Instant Feedback
                    </div>
                    <div className="text-xs tracking-wide font-medium text-[#111111]/70 group-hover:text-[#f9f6f1]/70 transition-colors">
                      Children remain engaged longer when activities provide immediate visual cues.
                    </div>
                  </div>
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-[#111111] transition-colors h-48">
                    <div className="text-3xl font-serif font-black text-[#111111] group-hover:text-[#f9f6f1] transition-colors mb-4">
                      Active Exploration
                    </div>
                    <div className="text-xs tracking-wide font-medium text-[#111111]/70 group-hover:text-[#f9f6f1]/70 transition-colors">
                      Interactive environments help sustain attention by turning learning into play.
                    </div>
                  </div>
                  <div className="border-r border-b border-[#111111]/10 p-6 md:p-8 flex flex-col items-center justify-center text-center group hover:bg-[#111111] transition-colors h-48">
                    <div className="text-3xl font-serif font-black text-[#111111] group-hover:text-[#f9f6f1] transition-colors mb-4">
                      Gradual Progress
                    </div>
                    <div className="text-xs tracking-wide font-medium text-[#111111]/70 group-hover:text-[#f9f6f1]/70 transition-colors">
                      Task motivation is sustained by breaking challenges into manageable visual blocks.
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-[#111111] text-[#f9f6f1] relative shadow-xl">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#f9f6f1]/20" />
                  <p className="font-bold mb-6 uppercase tracking-widest text-[#f9f6f1]/50 text-xs font-mono">
                    Recorded Insight_
                  </p>
                  <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#f9f6f1]/90">
                    "Learning environments should adapt to how children naturally engage with the world — through curiosity, play, and interaction."
                  </p>
                </div>
              </div>
            ) : null}
          </FoldableSection>

          {/* Foldable Section 3: Design Process */}
          <FoldableSection
            id="design"
            title="Design Process"
            icon={Layers}
            iconColor="text-stone-800"
            bgColor="bg-stone-50"
            imageBorder="border-stone-200"
            summary="Development & Iteration"
            isOpen={openSections.includes("design")}
            onClick={() => handleToggle("design")}
          >
            {project.id === "dopews" ? (
              <div className="flex flex-col relative w-full pt-4 group/timeline">
                {/* Timeline Line */}
                <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-px bg-[#111111]/20"></div>
                {/* Timeline Progress Transition */}
                <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-px bg-[#111111] origin-top scale-y-0 group-hover/timeline:scale-y-100 transition-transform duration-[1500ms] ease-in-out"></div>

                {/* Phase 1 */}
                <div className="flex gap-8 md:gap-12 relative group mb-12 transform transition-all duration-700">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f9f6f1] border-2 border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#f9f6f1] transition-colors shadow-sm">
                      <span className="font-mono font-bold text-sm md:text-base">
                        P1
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      Information Architecture
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Structuring the system for multi-stakeholder
                            support, mapping required data flows for public vs
                            authoritative access.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Risk
                              <br />
                              Geolocation
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Case
                              <br />
                              Trends
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-8 md:gap-12 relative group mb-12 transform transition-all duration-700 delay-100">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f9f6f1] border-2 border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#f9f6f1] transition-colors shadow-sm">
                      <span className="font-mono font-bold text-sm md:text-base">
                        P2
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      Dashboard Design
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Designing data-driven layouts prioritizing
                            actionable insights, using Figma to organize layers
                            of complex outbreak metrics.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Decision Focus
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Minimalist UI
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-8 md:gap-12 relative group mb-4 transform transition-all duration-700 delay-200">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-[#111111] flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                      <span className="font-mono font-bold text-sm md:text-base text-[#f9f6f1]">
                        P3
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      Frontend Implementation
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Translating high-fidelity prototypes into responsive
                            React components integrated with ML-backed backend
                            APIs.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Dynamic
                              <br />
                              Heatmaps
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Time-series
                              <br />
                              Forecast
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : project.id === "twinkle" ? (
              <div className="flex flex-col relative w-full pt-4 group/timeline">
                {/* Timeline Line */}
                <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-px bg-[#111111]/20"></div>
                {/* Timeline Progress Transition */}
                <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-px bg-[#111111] origin-top scale-y-0 group-hover/timeline:scale-y-100 transition-transform duration-[1500ms] ease-in-out"></div>
                
                {/* Phase 1 */}
                <div className="flex gap-8 md:gap-12 relative group mb-12 transform transition-all duration-700">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f9f6f1] border-2 border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#f9f6f1] transition-colors shadow-sm">
                      <span className="font-mono font-bold text-sm md:text-base">
                        P1
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      Learning Mechanics
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Structuring the activities for immediate feedback and progressive disclosure, ensuring interactions sustain attention without cognitive overload.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Instant
                              <br />
                              Feedback
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Active
                              <br />
                              Explore
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-8 md:gap-12 relative group mb-12 transform transition-all duration-700 delay-100">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#f9f6f1] border-2 border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#f9f6f1] transition-colors shadow-sm">
                      <span className="font-mono font-bold text-sm md:text-base">
                        P2
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      Environment Design
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Designing immersive 3D safe spaces. Using Figma to block out environments emphasizing cozy, consistent layouts with minimal visual noise.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              3D Content
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Typography
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-8 md:gap-12 relative group mb-4 transform transition-all duration-700 delay-200">
                  <div className="w-14 md:w-20 flex-shrink-0 flex justify-center z-10 relative">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-[#111111] flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                      <span className="font-mono font-bold text-sm md:text-base text-[#f9f6f1]">
                        P3
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 pr-2 md:pr-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-[#111111] group-hover:tracking-widest transition-all duration-500">
                      WebGL Rendering
                    </h3>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[#111111]/80 font-bold text-sm leading-relaxed mb-6">
                            Translating 3D environments into responsive React components seamlessly integrated with Three.js rendering loops for high performance.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <Layers size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Three.js
                              <br />
                              Shaders
                            </span>
                          </div>
                          <div className="border border-[#111111]/20 p-3 flex flex-col justify-center items-center text-center gap-2 hover:bg-[#111111] hover:text-[#f9f6f1] transition-colors">
                            <TrendingUp size={18} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              Game
                              <br />
                              Hooks
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                  <div className="md:col-span-4 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-4xl font-serif font-black italic mb-4 leading-tight">
                      Wireframing
                      <br />
                      the Interface
                    </h3>
                    <p className="text-stone-600 font-medium leading-relaxed text-sm lg:text-base">
                      Focusing on stripping away complex UI elements to reduce
                      cognitive overload and enforce purely data-driven
                      interaction models.
                    </p>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] bg-[#111111] border border-[#111111] flex items-center justify-center relative overflow-hidden group transition-all hover:scale-105"
                      >
                        <div className="absolute inset-0 border-[6px] border-white/10 m-2"></div>
                        <Film className="opacity-10 w-8 h-8 text-white" />
                        <div className="absolute bottom-3 left-4 text-xs font-mono opacity-50 font-bold text-white">
                          V{i}.0
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-[#111111]/10"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="bg-[#111111] rounded-2xl h-80 flex items-center justify-center relative overflow-hidden text-black shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="w-48 h-64 bg-[#f9f6f1] shadow-2xl border flex flex-col relative z-10 p-2 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                      <div className="flex-1 bg-[#111111]/5 relative flex items-center justify-center border border-[#111111]/20">
                        <div className="w-12 h-12 border border-[#111111]/30 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#111111] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter text-[#111111] flex items-center gap-3">
                      Key UX Decisions
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div className="border-l-2 border-[#111111] pl-6 py-1">
                        <h4 className="font-bold text-sm mb-2 uppercase tracking-widest text-[#111111]">
                          Progressive Disclosure
                        </h4>
                        <p className="text-[#111111]/60 text-sm leading-relaxed font-medium">
                          Users are only shown tools as they become relevant,
                          drastically reducing UI noise and improving onboarding
                          success rates.
                        </p>
                      </div>
                      <div className="border-l-2 border-[#111111]/30 hover:border-[#111111] transition-colors pl-6 py-1">
                        <h4 className="font-bold text-sm mb-2 uppercase tracking-widest text-[#111111]">
                          Component Library Scaling
                        </h4>
                        <p className="text-[#111111]/60 text-sm leading-relaxed font-medium">
                          Mapped out a global design system strictly adhering to
                          our geometric aesthetic constraints for brutalist
                          efficiency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </FoldableSection>

          {/* Foldable Section 4: Final Interface */}
          <FoldableSection
            id="interface"
            title="Final Interface"
            icon={Layout}
            iconColor="text-stone-800"
            bgColor="bg-stone-50"
            imageBorder="border-stone-200"
            summary=""
            isOpen={openSections.includes("interface")}
            onClick={() => handleToggle("interface")}
            isFullWidth={true}
          >
            {project.id === "dopews" ? (
              <DopewsFinalInterface />
            ) : project.id === "twinkle" ? (
              <TwinkleFinalInterface />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
                <div className="md:col-span-8 bg-stone-100 rounded-xl overflow-hidden relative group flex-1 border border-stone-200">
                  <img
                    src={project.image}
                    alt="App UI Hero"
                    className="w-full h-full object-cover grayscale-[10%] opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                    <p className="font-mono text-sm mb-1 text-white/50">
                      FIG. 1
                    </p>
                    <p className="text-lg font-bold">
                      Core Application Interface
                    </p>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-6">
                  <div className="bg-stone-100 rounded-xl overflow-hidden relative group flex-1 border border-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                      alt="App UI Detail 1"
                      className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 border border-white/20 text-xs font-mono tracking-widest text-white backdrop-blur-md">
                      DATA VIEW
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200 text-stone-800 rounded-xl p-8 flex-1 flex flex-col justify-between shadow-sm">
                    <div>
                      <Camera className="w-8 h-8 mb-6 text-indigo-300" />
                      <h4 className="text-lg font-bold mb-2">
                        Minimalist Approach
                      </h4>
                      <p className="opacity-70 text-sm leading-relaxed font-medium">
                        UI chrome was reduced by 80% compared to native apps,
                        putting full emphasis on functionality and data blocks.
                      </p>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-mono text-indigo-600 hover:text-indigo-800 transition-colors mt-6 uppercase tracking-widest font-bold">
                      View Prototype <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FoldableSection>

          {/* Foldable Section 5: Architecture */}
          <FoldableSection
            id="architecture"
            title="Architecture"
            icon={Server}
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
            imageBorder="border-emerald-200"
            summary="System Architecture"
            isOpen={openSections.includes("architecture")}
            onClick={() => handleToggle("architecture")}
          >
            {project.id === "dopews" ? (
              <ul className="space-y-4 font-mono text-base text-[#111111]">
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Frontend
                  </span>
                  <span className="text-lg font-bold">React Application</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Backend
                  </span>
                  <span className="text-lg font-bold">
                    Node.js API Services
                  </span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Database
                  </span>
                  <span className="text-lg font-bold">MongoDB</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Machine Learning Layer
                  </span>
                  <span className="text-lg font-bold">
                    Python • Scikit-learn
                  </span>
                </li>
              </ul>
            ) : project.id === "twinkle" ? (
              <ul className="space-y-4 font-mono text-base text-[#111111]">
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Frontend
                  </span>
                  <span className="text-lg font-bold">React Application</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    3D Rendering
                  </span>
                  <span className="text-lg font-bold">
                    Three.js
                  </span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    WebGL Layer
                  </span>
                  <span className="text-lg font-bold">WebGL</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#111111]/10 pb-3 gap-2 group hover:border-[#111111]/30 transition-colors">
                  <span className="font-bold text-[#111111]/50 uppercase tracking-widest text-sm">
                    Game Logic
                  </span>
                  <span className="text-lg font-bold">
                    React Hooks & Three.js utilities
                  </span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-4 font-mono text-base text-stone-600">
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">Frontend</span>
                  <span className="text-lg text-stone-800">
                    Next.js Framework
                  </span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">
                    Styling Structure
                  </span>
                  <span className="text-lg text-stone-800">
                    Tailwind CSS (Brutalist Rules)
                  </span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">
                    Backend / Logic
                  </span>
                  <span className="text-lg text-stone-800">
                    Node Environments
                  </span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">
                    State Management
                  </span>
                  <span className="text-lg text-stone-800">
                    React Hooks Context
                  </span>
                </li>
              </ul>
            )}
          </FoldableSection>

          {/* Foldable Section 6: Impact & Results */}
          <FoldableSection
            id="impact"
            title="Impact"
            icon={TrendingUp}
            iconColor="text-teal-600"
            bgColor="bg-teal-50"
            imageBorder="border-teal-200"
            summary="Results & Value"
            isOpen={openSections.includes("impact")}
            onClick={() => handleToggle("impact")}
          >
            <div className="space-y-8">
              <p className="text-stone-700 leading-relaxed text-lg font-medium">
                {project.id === "dopews" ? (
                  <>
                    The system successfully demonstrates the feasibility of
                    AI-driven dengue outbreak forecasting using integrated
                    environmental and epidemiological data.
                  </>
                ) : project.id === "twinkle" ? (
                  <span className="text-[#111111]">
                    Selected as Top 15 Finalist in Cursor × Anthropic Hackathon under the 3D Experience track. Built entirely using 3D web technologies, the project demonstrated high performance and engagement during the public presentation.
                  </span>
                ) : (
                  <>
                    {project.caseStudy.impact} The product significantly
                    improved user engagement and drastically cut down the time
                    spent looking for core features.
                  </>
                )}
              </p>

              {project.id === "dopews" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] text-center md:col-span-1">
                      <div className="text-4xl font-black text-[#111111] mb-1">
                        82.04%
                      </div>
                      <div className="text-xs text-[#111111]/60 uppercase tracking-widest font-bold">
                        Tolerance Accuracy
                      </div>
                    </div>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] md:col-span-2 flex items-center text-center md:text-left">
                      <p className="text-base text-[#111111]/80 font-bold">
                        The prediction model achieved 82.04% tolerance accuracy,
                        indicating strong predictive reliability within
                        real-world outbreak prediction scenarios.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 mt-8">
                    System Impact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">
                      Earlier detection of potential dengue outbreak risks
                    </div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">
                      Improved situational awareness through geographic risk
                      visualization
                    </div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">
                      Data-driven decision support for public health authorities
                    </div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">
                      Integrated public education and early warning capabilities
                    </div>
                  </div>
                </>
              ) : project.id === "twinkle" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] text-center">
                      <div className="text-4xl font-black text-[#111111] mb-1">
                        Top 15
                      </div>
                      <div className="text-xs text-[#111111]/60 uppercase tracking-widest font-bold">
                        Finalist in Cursor × Anthropic Hackathon
                      </div>
                    </div>
                    <div className="bg-[#f9f6f1] border-2 border-[#111111] p-6 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] flex items-center justify-center text-center">
                      <p className="text-base text-[#111111]/80 font-bold">
                        Built entirely using 3D web technologies, demonstrating high performance and engagement.
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </FoldableSection>
        </div>

        {/* Next Project Marquee Replacement */}
        <NextProjectMarquee />
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function FoldableSection({
  id,
  title,
  icon: Icon,
  iconColor,
  bgColor,
  imageBorder,
  summary,
  isOpen,
  onClick,
  children,
  isFullWidth,
}: any) {
  return (
    <div className="w-full flex flex-col">
      {/* Header / Toggle Area (Title and Double Line) */}
      <button
        onClick={onClick}
        className="w-full text-left group focus:outline-none flex flex-col"
      >
        <div className="flex justify-between items-end mb-1 px-1 w-full">
          <h2 className="text-2xl font-serif font-bold text-stone-800 group-hover:text-red-800 transition-colors">
            {title}
          </h2>
        </div>
        {/* Double line from reference image */}
        <div className="h-1 w-full border-t border-b border-stone-300 group-hover:border-stone-400 transition-colors"></div>
      </button>

      {/* Expandable Content Area */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-clip min-h-0">
          {/* Spacing is handled exclusively inside the expandable area using padding to avoid outer margin collapsing issues */}
          {isFullWidth ? (
            <div className="w-full pt-6 pb-0 px-1">
              <div
                className={`w-full transition-opacity duration-700 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                {children}
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 pt-6 pb-2 px-1">
              {/* Visual/Icon Side */}
              <div className="md:w-1/3 flex-shrink-0">
                <div
                  className={`transition-transform duration-500 ${isOpen ? "translate-y-0" : "translate-y-4"}`}
                >
                  <span className="font-sans text-stone-800 text-2xl md:text-4xl font-bold">
                    {summary}
                  </span>
                </div>
              </div>
              {/* Text Content Side */}
              <div
                className={`md:w-2/3 text-stone-700 leading-relaxed text-lg transition-opacity duration-700 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-white p-4 border border-stone-200 rounded text-center shadow-sm ${className || ""}`}
    >
      <div className="text-3xl font-serif font-bold text-teal-700 mb-1">
        {value}
      </div>
      <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  );
}

function DecisionItem({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-stone-300 before:rounded-full">
      <h4 className="font-bold text-lg mb-1 uppercase tracking-wider text-stone-800">
        {title}
      </h4>
      <p className="opacity-80 text-sm leading-relaxed font-medium">{desc}</p>
    </li>
  );
}

function DopewsFinalInterface() {
  const containerRef = useRef<HTMLElement>(null);

  // Setup scroll tracking for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate transforms for the images
  const img1Y = useTransform(scrollYProgress, [0.05, 0.30], ["0vh", "-200vh"]);
  const img2Y = useTransform(scrollYProgress, [0.38, 0.63], ["0vh", "-200vh"]);
  const img3Y = useTransform(scrollYProgress, [0.70, 0.95], ["0vh", "-200vh"]);

  // Calculate opacities for the descriptions
  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.10, 0.30, 0.38, 0.58], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.43, 0.63, 0.70, 0.90], [0, 1, 1, 0]);
  const text4Opacity = useTransform(scrollYProgress, [0.75, 0.95, 1], [0, 1, 1]);

  const images = [
    "/dopews-my/DOPEWS-heatmap.png",
    "/dopews-my/dopews-admin%20dashaboard.png",
    "/dopews-my/dopews-api.png",
    "/dopews-my/DOPEWS-education.png",
  ];

  return (
    <div className="flex flex-col relative w-full pt-0">
      <style>{`
        .font-serif-custom {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
      <div className="relative w-full text-[#111111] bg-transparent">
        <section ref={containerRef as any} className="relative h-[250vh] w-full max-w-7xl mx-auto flex justify-center">
          <div className="sticky top-[5vh] h-[95vh] w-full overflow-hidden flex flex-col items-center justify-start pt-2 px-[5vw] md:px-[8vw]">
            {/* Image Stack */}
            <div className="relative w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[55vw] xl:w-[50vw] max-w-4xl z-10 flex flex-col items-center">
              {/* Base image - dictates size of the stack */}
              <div className="relative w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                <div className="relative w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                  <img
                    src={images[3]}
                    alt="DOPEWS App 4"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <motion.div
                style={{ y: img3Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[2]}
                      alt="DOPEWS App 3"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img2Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[1]}
                      alt="DOPEWS App 2"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img1Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[0]}
                      alt="DOPEWS App 1"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Image Descriptions (Crossfading) */}
            <div className="relative w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[55vw] xl:w-[50vw] max-w-4xl mt-6 md:mt-8 h-[20vh] max-h-[160px] flex justify-center items-start text-center z-10 font-sans">
              <motion.div
                style={{ opacity: text1Opacity }}
                className="absolute top-0 left-0 w-full"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  1. Dengue Risk Heatmap
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The Dengue Risk Heatmap uses a map-centered interface with color-coded risk levels to visualize predicted outbreak areas. Supporting analytics, forecast controls, and driver insights help users quickly understand spatial risk patterns and make informed public health decisions.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text2Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  2. Admin Dashboard
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The Admin Dashboard adopts a structured table-based layout to efficiently manage system users and roles. Features such as search, filtering, and role actions allow administrators to monitor activity, maintain security, and control platform access effectively.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text3Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  3. API Key Management / API Playground
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The API Playground provides developers with an interactive interface to test endpoints and access dengue data programmatically. Integrated documentation, authentication guidance, and JSON examples simplify integration and encourage external application development.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text4Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  4. Dengue Education Hub
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The Dengue Education Hub presents educational articles in a searchable, content-focused layout to improve public awareness. Filtering, sorting, and visual materials help users easily access reliable dengue prevention knowledge and health information.
                </p>
              </motion.div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}


function TwinkleFinalInterface() {
  const containerRef = useRef<HTMLElement>(null);

  // Setup scroll tracking for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate transforms for the images
  const img1Y = useTransform(scrollYProgress, [0.05, 0.20], ["0vh", "-200vh"]);
  const img2Y = useTransform(scrollYProgress, [0.24, 0.39], ["0vh", "-200vh"]);
  const img3Y = useTransform(scrollYProgress, [0.43, 0.58], ["0vh", "-200vh"]);
  const img4Y = useTransform(scrollYProgress, [0.62, 0.77], ["0vh", "-200vh"]);
  const img5Y = useTransform(scrollYProgress, [0.81, 0.96], ["0vh", "-200vh"]);

  // Calculate opacities for the descriptions
  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.10, 0.20, 0.24, 0.34], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.29, 0.39, 0.43, 0.53], [0, 1, 1, 0]);
  const text4Opacity = useTransform(scrollYProgress, [0.48, 0.58, 0.62, 0.72], [0, 1, 1, 0]);
  const text5Opacity = useTransform(scrollYProgress, [0.67, 0.77, 0.81, 0.91], [0, 1, 1, 0]);
  const text6Opacity = useTransform(scrollYProgress, [0.86, 0.96, 1], [0, 1, 1]);
                                                                                
  const images = [
    "/twinkle/twinkle-prompt.png",
    "/twinkle/twinkle-room.png",
    "/twinkle/twinkle-book.png",
    "/twinkle/twinkle-math.png",
    "/twinkle/twinkle-dylexia.png",
    "/twinkle/twinkle-talking.png",
  ];

  return (
    <div className="flex flex-col relative w-full pt-0">
      <style>{`
        .font-serif-custom {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
      <div className="relative w-full text-[#111111] bg-transparent">
        <section ref={containerRef as any} className="relative h-[350vh] w-full max-w-7xl mx-auto flex justify-center">
          <div className="sticky top-[5vh] h-[95vh] w-full overflow-hidden flex flex-col items-center justify-start pt-2 px-[5vw] md:px-[8vw]">
            {/* Image Stack */}
            <div className="relative w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[55vw] xl:w-[50vw] max-w-4xl z-10 flex flex-col items-center">
              {/* Base image - dictates size of the stack */}
              <div className="relative w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                <div className="relative w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                  <img
                    src={images[5]}
                    alt="Twinkle App 6"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <motion.div
                style={{ y: img5Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[4]}
                      alt="Twinkle App 5"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img4Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[3]}
                      alt="Twinkle App 4"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img3Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[2]}
                      alt="Twinkle App 3"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img2Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[1]}
                      alt="Twinkle App 2"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img1Y }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="w-full rounded-2xl bg-[#f9f6f1] p-2 md:p-3 border border-[#111111]/20 shadow-sm">
                  <div className="w-full overflow-hidden rounded-xl border border-[#111111]/10 bg-white aspect-[2880/1554]">
                    <img
                      src={images[0]}
                      alt="Twinkle App 1"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Image Descriptions (Crossfading) */}
            <div className="relative w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[55vw] xl:w-[50vw] max-w-4xl mt-6 md:mt-8 h-[20vh] max-h-[160px] flex justify-center items-start text-center z-10 font-sans">
              <motion.div
                style={{ opacity: text1Opacity }}
                className="absolute top-0 left-0 w-full"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  1. Prompt Interface
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The initial prompt interface sets the stage for the customized educational experience, tailoring the interactions to each child's specific learning needs before they enter the game world.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text2Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  2. Room Interface
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The room interface simulates a cozy learning environment with interactive objects and characters. This familiar setting helps children feel comfortable, promotes exploration, and visually organizes learning activities within a playful game-like space.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text3Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  3. Vocal Book (Listening & Pronunciation)
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The vocal book focuses on auditory learning by allowing children to listen to words and repeat them. Large typography, audio playback, and simple interactions support pronunciation practice and early language development.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text4Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  4. Math Game
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The math activity uses a running game mechanic where children select the correct answer while progressing through a 3D environment. This gamified approach improves engagement, motivation, and learning retention.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text5Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  5. Dyslexia Book
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The dyslexia reading book incorporates specialized typography, color highlights, and structured sentence presentation to support children with reading difficulties. The design improves readability and helps learners process words more comfortably.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: text6Opacity }}
                className="absolute top-0 left-0 w-full pointer-events-none"
              >
                <h4 className="text-xl md:text-2xl font-bold text-[#111111] mb-2 font-serif-custom">
                  6. Talking to the Avatar
                </h4>
                <p className="text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-4xl mx-auto">
                  The avatar interaction feature enables conversational learning through a friendly animated character. This design encourages engagement, builds emotional connection, and allows children to practice communication in a supportive environment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


