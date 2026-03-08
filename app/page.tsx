"use client";

import React, { useState, useEffect } from 'react';
import { HomeView } from '../components/HomeView';
import { CaseStudyView } from '../components/CaseStudyView';

import { NavBar } from '../components/NavBar';

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    if (activeProject) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#F2F2ED] text-[#111111] font-sans selection:bg-[#111] selection:text-[#F2F2ED] overflow-x-hidden">

      {/* Mobile Work in Progress Warning (Vibe matched) */}
      <div className="md:hidden bg-[#111] text-[#F2F2ED] p-4 text-sm font-medium">
        Hi! Thanks for visiting. This is still quite a work in progress, especially for mobile! I don't want to simply resize it, so please visit on desktop for the full chaotic experience :)
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main Container */}
      <main>
        {activeProject ? (
          <CaseStudyView project={activeProject} onBack={() => setActiveProject(null)} />
        ) : (
          <HomeView onSelectProject={setActiveProject} />
        )}
      </main>
    </div>
  );
}
