const fs = require('fs');
let code = fs.readFileSync('app/case-studies/[id]/page.tsx', 'utf8');

const helpersStart = code.indexOf('function FoldableSection');

if (helpersStart !== -1) {
  const newHelpers = `function FoldableSection({ id, title, icon: Icon, iconColor, bgColor, imageBorder, summary, isOpen, onClick, children }: any) {
  const words = title.split(' ');
  const hasSplit = words.length > 1;
  const topText = hasSplit ? words.slice(0, Math.ceil(words.length / 2)).join(' ') : '';
  const bottomText = hasSplit ? words.slice(Math.ceil(words.length / 2)).join(' ') : words[0];

  return (
    <div className="w-full flex flex-col mt-12 mb-8 group">
      {topText && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-stone-900 pb-4">
          {topText}
        </h2>
      )}
      <div className="h-[1px] w-full bg-[#111111]/20"></div>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-6">
        <div className="md:w-1/3 flex-shrink-0">
           {bottomText && (
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-stone-900">
               {bottomText}
             </h2>
           )}
        </div>
        <div className="md:w-2/3 text-stone-600 leading-relaxed font-sans text-[15px] md:text-base font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, className }: { value: string, label: string, className?: string }) {
  return (
    <div className={\`bg-white p-4 border border-stone-200 rounded-xl text-center shadow-sm \${className || ''}\`}>
      <div className="text-3xl font-serif font-bold text-[#111111] mb-1">{value}</div>
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
