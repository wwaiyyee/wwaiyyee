const fs = require('fs');
let code = fs.readFileSync('app/case-studies/[id]/page.tsx', 'utf8');

// 1. replace imports
code = code.replace(
  "import { ArrowRight, ArrowUpRight, Camera, Film, Layers, Layout, Maximize2 } from 'lucide-react';",
  "import { ArrowRight, ArrowUpRight, Camera, Film, Layers, Layout, Maximize2, Lightbulb, Search, PenTool, Server, TrendingUp, ChevronDown } from 'lucide-react';"
);

// 2. Insert state into component
code = code.replace(
  "const [scrollProgress, setScrollProgress] = useState(0);",
  "const [scrollProgress, setScrollProgress] = useState(0);\n  const [openSections, setOpenSections] = useState(['premise', 'research', 'design', 'interface', 'architecture', 'impact']);\n\n  const handleToggle = (sectionId: string) => {\n    setOpenSections(prev => \n      prev.includes(sectionId) \n        ? prev.filter(id => id !== sectionId)\n        : [...prev, sectionId]\n    );\n  };"
);

// 3. Replace the entire stacked folder HTML with the new Foldable sections
const startMarker = "{/* --- STACKED FOLDER SECTION --- */}";
const endMarker = "{/* Next Project Marquee Replacement */}";

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newBlock = `        {/* --- FOLDABLE SECTIONS --- */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-10 w-full mb-32 z-10 relative">
          
          {/* Foldable Section 1: The Premise */}
          <FoldableSection 
            id="premise"
            title="The Premise" 
            icon={Lightbulb}
            iconColor="text-amber-600"
            bgColor="bg-amber-50"
            imageBorder="border-amber-200"
            summary="Setup & Objective"
            isOpen={openSections.includes('premise')}
            onClick={() => handleToggle('premise')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-300 rounded-full"></span> The Problem
                </h3>
                <p className="text-stone-600 leading-relaxed font-sans font-medium text-base">
                  {project.id === 'dopews' ? (
                    <>
                      Dengue outbreaks in Malaysia are often detected only after case numbers have already surged, leaving little time for preventive action. Existing surveillance systems mainly focus on reporting confirmed cases rather than predicting future outbreaks.<br/><br/>
                      This reactive approach means authorities only respond once transmission is already widespread, limiting the effectiveness of mosquito control and public awareness measures.<br/><br/>
                      Malaysia has experienced significant dengue fluctuations in recent years, with cases increasing from 26,301 in 2021 to over 120,000 cases in 2023, highlighting the urgent need for predictive outbreak monitoring tools.
                    </>
                  ) : (
                    <>{project.caseStudy.overview} Modern operations have become overly complex. We needed to identify core bottlenecks and redesign the conceptual framework to achieve better performance outcomes constraints.</>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-stone-300 rounded-full"></span> The Goal
                </h3>
                <p className="text-stone-600 leading-relaxed font-sans font-medium text-base">
                  {project.id === 'dopews' ? (
                    <>
                      Design an AI-driven early warning system capable of forecasting dengue outbreak risks before case escalation occurs.<br/><br/>
                      The system integrates epidemiological, environmental, and demographic data to produce 7-, 14-, and 28-day outbreak predictions, enabling authorities to respond earlier and allocate resources more effectively.<br/><br/>
                      The objective was to build a platform that shifts dengue surveillance from reactive monitoring to proactive prevention.
                    </>
                  ) : (
                    <>Design a system that reduces friction and encourages proper workflow management, integrating seamlessly with existing tools to maximize productivity while remaining intuitive.</>
                  )}
                </p>
              </div>
            </div>
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
            isOpen={openSections.includes('research')}
            onClick={() => handleToggle('research')}
          >
            <p className="text-lg leading-relaxed mb-8 text-stone-700 font-medium">
              {project.id === 'dopews' ? (
                <>
                  Research focused on understanding the limitations of existing dengue monitoring platforms and identifying gaps in decision-making workflows.<br/><br/>
                  Current surveillance tools such as iDengue primarily focus on case reporting and hotspot visualization, but lack predictive modeling and integrated environmental data. As a result, outbreak signals are typically detected only after transmission has already spread.
                </>
              ) : (
                <>We conducted qualitative interviews with targeted stakeholders across different operational fields to gather data on primary pain points.</>
              )}
            </p>

            {project.id === 'dopews' ? (
              <div className="mb-10 space-y-6">
                <h3 className="text-lg font-bold border-b border-black/10 pb-2">Key Observations</h3>
                <ul className="space-y-4 text-stone-600 leading-relaxed list-disc pl-5 font-medium text-base">
                  <li>Existing dengue monitoring platforms focus primarily on historical case reporting rather than predictive forecasting.</li>
                  <li>Environmental factors such as rainfall patterns, urban density, and historical case trends play a significant role in dengue transmission but are rarely integrated into surveillance dashboards.</li>
                  <li>Public health authorities require clear geographic risk visualization and automated alerts to support faster decision-making.</li>
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatCard value="82%" label="Reported Friction" className="bg-blue-50/50 border-blue-100" />
                <StatCard value="65%" label="Felt Overwhelmed" className="bg-blue-50/50 border-blue-100" />
                <StatCard value="90%" label="Preferred Simplicity" className="bg-blue-50/50 border-blue-100" />
              </div>
            )}

            <div className="p-6 bg-stone-100/50 rounded-lg border border-stone-200 font-mono text-sm">
              <p className="font-bold mb-2 uppercase tracking-widest text-stone-800">Recorded Insight_</p>
              <p className="italic text-stone-500 font-sans">
                {project.id === 'dopews' ? (
                  \`"Reactive surveillance detects dengue outbreaks only after cases escalate, leaving minimal lead time for preventive intervention."\`
                ) : (
                  \`"It's not just about speed. It's about clarity of information when taking crucial decisions. The current setups are just too noisy." — Stakeholder #14\`
                )}
              </p>
            </div>
          </FoldableSection>

          {/* Foldable Section 3: Design Process */}
          <FoldableSection 
            id="design"
            title="Design Process" 
            icon={PenTool}
            iconColor="text-rose-600"
            bgColor="bg-rose-50"
            imageBorder="border-rose-200"
            summary="Development & Iteration"
            isOpen={openSections.includes('design')}
            onClick={() => handleToggle('design')}
          >
            {project.id === 'dopews' ? (
              <div className="grid grid-cols-1 gap-12 items-start mb-8 text-base">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Layout className="opacity-40" /> Phase 1 — Information Architecture
                    </h3>
                    <p className="text-stone-600 max-w-3xl mb-4 leading-relaxed font-medium">The system architecture was first designed to support multiple stakeholders including public users, health authorities, and system administrators.</p>
                    <ul className="list-disc pl-5 text-stone-500 space-y-2 font-medium">
                      <li>Viewing dengue outbreak risk by location</li>
                      <li>Monitoring historical and predicted case trends</li>
                      <li>Managing system access and API integration</li>
                      <li>Providing public education on dengue prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Layers className="opacity-40" /> Phase 2 — Dashboard Design
                    </h3>
                    <p className="text-stone-600 max-w-3xl mb-4 leading-relaxed font-medium">The UI design focused on creating data-driven dashboards that prioritize clarity and actionable insights. Wireframes were developed in Figma to organize complex outbreak data into structured visual layers including heatmaps, charts, and alert indicators.</p>
                    <ul className="list-disc pl-5 text-stone-500 space-y-2 font-medium">
                      <li>Geographic risk visualization</li>
                      <li>Clear outbreak trend analysis</li>
                      <li>Minimal interface complexity</li>
                      <li>Decision-support focused layouts</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Film className="opacity-40" /> Phase 3 — Frontend Implementation
                  </h3>
                  <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                    <p className="text-stone-600 leading-relaxed font-medium mb-4">The frontend interface was implemented using React, translating design prototypes into responsive dashboard components.</p>
                    <ul className="list-disc pl-5 text-stone-500 font-medium space-y-2 mb-6">
                      <li>Dynamic dengue heatmaps</li>
                      <li>Time-series outbreak predictions</li>
                      <li>Alert notifications and reports</li>
                      <li>Administrative control panels</li>
                    </ul>
                    <p className="text-stone-600 font-medium leading-relaxed">The frontend communicates with backend APIs that generate predictions using the machine learning model.</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Layout className="opacity-40" /> Wireframing the Interface
                  </h3>
                  <p className="text-stone-600 font-medium max-w-3xl mb-8 leading-relaxed text-base">
                    Initial sketches focused on stripping away complex UI elements. We wanted the dashboard to be the sole focus, hiding secondary tools to prevent cognitive overload.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-[9/16] bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center relative overflow-hidden group hover:bg-stone-200 transition-colors">
                        <div className="absolute inset-0 border-[8px] border-white/50 m-2 rounded-md"></div>
                        <Film className="opacity-30 w-8 h-8" />
                        <div className="absolute bottom-4 left-4 text-xs font-mono opacity-50 font-bold">V{i}.0</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <Layers className="opacity-40" /> Key UX Decisions
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
                  <div className="bg-stone-100 p-8 rounded-xl h-full flex items-center justify-center border border-stone-200 relative overflow-hidden text-black">
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
              </>
            )}
          </FoldableSection>

          {/* Foldable Section 4: Final Interface */}
          <FoldableSection 
            id="interface"
            title="Final Interface" 
            icon={Layout}
            iconColor="text-indigo-600"
            bgColor="bg-indigo-50"
            imageBorder="border-indigo-200"
            summary="High Fidelity Output"
            isOpen={openSections.includes('interface')}
            onClick={() => handleToggle('interface')}
          >
            {project.id === 'dopews' ? (
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-stone-700 font-medium">The final system consists of four main application modules designed for different user roles.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-indigo-900">Dengue Heatmap Dashboard</h3>
                    <p className="text-stone-500 font-medium mb-4 text-sm">Interactive visualization showing predicted dengue outbreak risks across geographic areas.</p>
                    <ul className="list-disc pl-5 text-stone-600 font-medium space-y-2 text-sm">
                      <li>Historical dengue case trends</li>
                      <li>Predicted outbreak risk levels</li>
                      <li>Geographic hotspot maps</li>
                      <li>Time-series outbreak forecasts</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-indigo-900">API Key Management</h3>
                    <p className="text-stone-500 font-medium mb-4 text-sm">Allows developers and organizations to securely access dengue forecast data.</p>
                    <ul className="list-disc pl-5 text-stone-600 font-medium space-y-2 text-sm">
                      <li>API key generation and management</li>
                      <li>Usage tracking</li>
                      <li>Secure API authentication</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-indigo-900">Admin Dashboard</h3>
                    <p className="text-stone-500 mb-4 font-medium text-sm">Administrative panel used to manage the platform and system configurations.</p>
                    <ul className="list-disc pl-5 text-stone-600 font-medium space-y-2 text-sm">
                      <li>User management</li>
                      <li>Risk threshold configuration</li>
                      <li>Alert rule management</li>
                      <li>System monitoring</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-indigo-900">Education Hub</h3>
                    <p className="text-stone-500 mb-4 font-medium text-sm">Public information portal designed to improve awareness and prevention.</p>
                    <ul className="list-disc pl-5 text-stone-600 font-medium space-y-2 text-sm">
                      <li>Dengue prevention guidelines</li>
                      <li>Educational articles</li>
                      <li>Awareness resources</li>
                      <li>Public health information</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
                <div className="md:col-span-8 bg-stone-100 rounded-xl overflow-hidden relative group aspect-square md:aspect-auto border border-stone-200">
                  <img 
                    src={project.image} 
                    alt="App UI Hero" 
                    className="w-full h-full object-cover grayscale-[10%] opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                    <p className="font-mono text-sm mb-1 text-white/50">FIG. 1</p>
                    <p className="text-lg font-bold">Core Application Interface</p>
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-6">
                  <div className="bg-stone-100 rounded-xl overflow-hidden relative group flex-1 border border-stone-200">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" 
                      alt="App UI Detail 1" 
                      className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 border border-white/20 text-xs font-mono tracking-widest text-white backdrop-blur-md">DATA VIEW</div>
                  </div>
                  <div className="bg-white border border-stone-200 text-stone-800 rounded-xl p-8 flex-1 flex flex-col justify-between shadow-sm">
                    <div>
                      <Camera className="w-8 h-8 mb-6 text-indigo-300" />
                      <h4 className="text-lg font-bold mb-2">Minimalist Approach</h4>
                      <p className="opacity-70 text-sm leading-relaxed font-medium">
                        UI chrome was reduced by 80% compared to native apps, putting full emphasis on functionality and data blocks.
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
            isOpen={openSections.includes('architecture')}
            onClick={() => handleToggle('architecture')}
          >
            {project.id === 'dopews' ? (
              <>
                <ul className="space-y-4 font-mono text-base opacity-90 mb-8">
                  <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <span className="font-bold text-stone-500">Frontend</span>
                    <span className="text-lg text-emerald-800 font-bold">React Application</span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <span className="font-bold text-stone-500">Backend</span>
                    <span className="text-lg text-emerald-800 font-bold">Node.js API Services</span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <span className="font-bold text-stone-500">Database</span>
                    <span className="text-lg text-emerald-800 font-bold">MongoDB</span>
                  </li>
                  <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <span className="font-bold text-stone-500">Machine Learning Layer</span>
                    <span className="text-lg text-emerald-800 font-bold">Python • Scikit-learn</span>
                  </li>
                </ul>
                <div className="bg-emerald-50/50 p-8 rounded-xl border border-emerald-100 text-emerald-950">
                  <p className="opacity-90 leading-relaxed font-medium mb-6">The predictive model is based on Gradient Boosting Regressor, which captures nonlinear relationships between environmental conditions and dengue outbreaks.</p>
                  <h3 className="font-bold mb-3 uppercase tracking-wider text-sm opacity-60">Key predictive features include:</h3>
                  <ul className="list-disc pl-5 opacity-90 space-y-2 font-medium mb-4 text-base">
                    <li>Rainfall index</li>
                    <li>Urban population density</li>
                    <li>Historical dengue case trends</li>
                  </ul>
                  <p className="text-sm font-mono text-emerald-700">These variables were identified as the most significant drivers of outbreak risk.</p>
                </div>
              </>
            ) : (
              <ul className="space-y-4 font-mono text-base text-stone-600">
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">Frontend</span>
                  <span className="text-lg text-stone-800">Next.js Framework</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">Styling Structure</span>
                  <span className="text-lg text-stone-800">Tailwind CSS (Brutalist Rules)</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">Backend / Logic</span>
                  <span className="text-lg text-stone-800">Node Environments</span>
                </li>
                <li className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                  <span className="font-bold text-stone-400">State Management</span>
                  <span className="text-lg text-stone-800">React Hooks Context</span>
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
            isOpen={openSections.includes('impact')}
            onClick={() => handleToggle('impact')}
          >
            <div className="space-y-8">
              <p className="text-stone-700 leading-relaxed text-lg font-medium">
                {project.id === 'dopews' ? (
                  <>The system successfully demonstrates the feasibility of AI-driven dengue outbreak forecasting using integrated environmental and epidemiological data.</>
                ) : (
                  <>{project.caseStudy.impact} The product significantly improved user engagement and drastically cut down the time spent looking for core features.</>
                )}
              </p>

              {project.id === 'dopews' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                     <div className="bg-white border border-stone-200 p-6 shadow-sm rounded text-center md:col-span-1">
                        <div className="text-4xl font-bold text-teal-700 mb-1">82.04%</div>
                        <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Tolerance Accuracy</div>
                     </div>
                     <div className="bg-white border border-stone-200 p-6 shadow-sm rounded md:col-span-2 flex items-center text-center md:text-left">
                        <p className="text-base text-stone-600 font-medium">The prediction model achieved 82.04% tolerance accuracy, indicating strong predictive reliability within real-world outbreak prediction scenarios.</p>
                     </div>
                  </div>
                  
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 mt-8">System Impact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">Earlier detection of potential dengue outbreak risks</div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">Improved situational awareness through geographic risk visualization</div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">Data-driven decision support for public health authorities</div>
                    <div className="bg-white shadow-sm border border-stone-200 p-5 rounded text-sm text-stone-700 font-medium">Integrated public education and early warning capabilities</div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
                   <div className="bg-white border border-stone-200 p-4 shadow-sm rounded text-center">
                      <div className="text-3xl font-bold text-teal-700 mb-1">40%</div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">Time Saved</div>
                   </div>
                   <div className="bg-white border border-stone-200 p-4 shadow-sm rounded text-center">
                      <div className="text-3xl font-bold text-teal-700 mb-1">98%</div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">Usability Score</div>
                   </div>
                   <div className="bg-teal-50 border border-teal-200 p-4 rounded text-center flex flex-col justify-center relative overflow-hidden group">
                      <div className="text-teal-700 font-bold text-xl mb-1 uppercase italic tracking-tighter">Standard</div>
                      <div className="text-xs text-teal-600 uppercase tracking-wider font-bold">Adopted Industry-wide</div>
                   </div>
                </div>
              )}
            </div>
          </FoldableSection>

        </div>

` + endMarker;

  code = code.substring(0, startIndex) + newBlock + code.substring(endIndex + endMarker.length);
}

// 4. Replace Helper Components section at the bottom
const helpersIdx = code.indexOf("// --- HELPER COMPONENTS ---");
if (helpersIdx !== -1) {
  code = code.substring(0, helpersIdx) + 
`// --- HELPER COMPONENTS ---

function FoldableSection({ id, title, icon: Icon, iconColor, bgColor, imageBorder, summary, isOpen, onClick, children }: any) {
  return (
    <div className="w-full flex flex-col">
      {/* Header / Toggle Area */}
      <button 
        onClick={onClick}
        className="w-full text-left group focus:outline-none flex flex-col cursor-pointer"
      >
        <div className="flex justify-between items-end mb-2 px-1 w-full">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#111111] group-hover:opacity-70 transition-opacity">
            {title}
          </h2>
          <div className={\`w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 \${
            isOpen 
              ? 'bg-[#111111] text-[#F2F2ED]' 
              : 'text-[#111111] group-hover:bg-[#111111]/5'
          }\`}>
            <ArrowRight className={\`w-6 h-6 transition-transform duration-300 \${isOpen ? '-rotate-90' : 'rotate-90'}\`} />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#111111]/20 to-transparent"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#111111]/20 to-transparent mt-1"></div>
      </button>

      {/* Expandable Content Area */}
      <div 
        className={\`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out \${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }\`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="flex flex-col md:flex-row gap-8 pt-8 pb-4 px-1">
            <div className="md:w-[250px] flex-shrink-0">
              <div className={\`w-full h-full min-h-[160px] rounded-xl \${bgColor} border \${imageBorder} flex flex-col items-center justify-center p-6 text-center transition-transform duration-500 \${isOpen ? 'translate-y-0' : 'translate-y-4'}\`}>
                <Icon className={\`w-12 h-12 \${iconColor} mb-4 opacity-80\`} strokeWidth={1.5} />
                <span className={\`font-mono text-[10px] tracking-[0.2em] uppercase font-bold \${iconColor}\`}>{summary}</span>
              </div>
            </div>
            <div className={\`flex-1 text-[#111111] transition-opacity duration-700 delay-100 \${isOpen ? 'opacity-100' : 'opacity-0'}\`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, className }: { value: string, label: string, className?: string }) {
  return (
    <div className={\`p-6 rounded-xl text-center transition-all duration-300 border \${className || 'border-stone-200 bg-white'}\`}>
      <span className="text-4xl font-black italic tracking-tighter text-[#111111] mb-2 block">{value}</span>
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}

function DecisionItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#111111]/30 before:rounded-full">
      <h4 className="font-bold text-lg mb-1 uppercase tracking-wider text-[#111111]">{title}</h4>
      <p className="text-zinc-600 text-sm leading-relaxed font-medium">{desc}</p>
    </li>
  );
}
`;
}

fs.writeFileSync('app/case-studies/[id]/page.tsx', code);
console.log("Success");
