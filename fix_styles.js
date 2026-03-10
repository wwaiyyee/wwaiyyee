const fs = require('fs');
let code = fs.readFileSync('app/case-studies/[id]/page.tsx', 'utf8');

const helpersStart = code.indexOf('function FoldableSection');

if (helpersStart !== -1) {
  const newHelpers = `function FoldableSection({ id, title, icon: Icon, iconColor, bgColor, imageBorder, summary, isOpen, onClick, children }: any) {
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
          <div className={\`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 \${
            isOpen 
              ? 'border-red-800 bg-red-50 text-red-800' 
              : 'border-stone-300 text-stone-400 group-hover:border-red-800 group-hover:text-red-800'
          }\`}>
            <ArrowRight className={\`w-4 h-4 transition-transform duration-300 \${isOpen ? '-rotate-90' : 'rotate-90'}\`} />
          </div>
        </div>
        {/* Double line from reference image */}
        <div className="h-1 w-full border-t border-b border-stone-300 group-hover:border-stone-400 transition-colors"></div>
      </button>

      {/* Expandable Content Area */}
      <div 
        className={\`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out \${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }\`}
      >
        <div className="overflow-hidden min-h-0">
          {/* Spacing is handled exclusively inside the expandable area using padding to avoid outer margin collapsing issues */}
          <div className="flex flex-col md:flex-row gap-8 pt-6 pb-2 px-1">
            {/* Visual/Icon Side */}
            <div className="md:w-1/3 flex-shrink-0">
              <div className={\`w-full h-full min-h-[200px] rounded-lg \${bgColor} border \${imageBorder} flex flex-col items-center justify-center p-6 text-center shadow-sm transition-transform duration-500 \${isOpen ? 'translate-y-0' : 'translate-y-4'}\`}>
                <Icon className={\`w-16 h-16 \${iconColor} mb-4\`} strokeWidth={1.5} />
                <span className={\`font-serif text-lg font-medium \${iconColor}\`}>{summary}</span>
              </div>
            </div>
            {/* Text Content Side */}
            <div className={\`md:w-2/3 text-stone-700 leading-relaxed text-lg transition-opacity duration-700 delay-100 \${isOpen ? 'opacity-100' : 'opacity-0'}\`}>
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
    <div className={\`bg-white p-4 border border-stone-200 rounded text-center shadow-sm \${className || ''}\`}>
      <div className="text-3xl font-serif font-bold text-teal-700 mb-1">{value}</div>
      <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  );
}

function DecisionItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-stone-300 before:rounded-full">
      <h4 className="font-bold text-lg mb-1 uppercase tracking-wider text-stone-800">{title}</h4>
      <p className="opacity-80 text-sm leading-relaxed font-medium">{desc}</p>
    </li>
  );
}
`;
  code = code.substring(0, helpersStart) + newHelpers;
  fs.writeFileSync('app/case-studies/[id]/page.tsx', code);
}
