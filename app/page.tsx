"use client";

import React, { useState, useEffect } from 'react';
import { HomeView } from '../components/HomeView';
import { CaseStudyView } from '../components/CaseStudyView';
import { NavBar } from '../components/NavBar';
import { LanyardModal } from '../components/Lanyard';

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeProject, setActiveProject] = useState<any>(null);
  const [isLanyardOpen, setIsLanyardOpen] = useState(false);

  useEffect(() => {
    if (activeProject) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#F2F2ED] text-[#111111] font-sans selection:bg-[#111] selection:text-[#F2F2ED] overflow-x-clip">

      {/* Mobile Work in Progress Warning (Vibe matched) */}
      <div className="md:hidden bg-[#111] text-[#F2F2ED] p-4 text-sm font-medium">
        Hi! Thanks for visiting. This is still quite a work in progress, especially for mobile! I don&apos;t want to simply resize it, so please visit on desktop for the full chaotic experience :)
      </div>

      {/* Navigation */}
      <NavBar onConnectClick={() => setIsLanyardOpen(true)} />

      {/* Lanyard Modal */}
      <LanyardModal open={isLanyardOpen} onClose={() => setIsLanyardOpen(false)} />

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
