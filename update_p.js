const fs = require('fs');

const file = 'app/case-studies/[id]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard paragraphs by adding text-justify
// We match <p className="... leading-relaxed ..."> where it doesn't already have text-justify
// But let's avoid uppercase (which are usually labels/subtitles) and font-mono
content = content.replace(/<p className="(.*?)"/g, (match, classes) => {
    if (classes.includes('text-justify')) return match;
    
    // Check if it's likely a body text paragraph
    // Usually has leading-relaxed or text-base or text-lg or text-sm
    // avoid uppercase, font-mono, font-bold if it's a short title
    if (!classes.includes('uppercase') && !classes.includes('font-mono') && !classes.includes('font-black') && !classes.includes('italic')) {
        // Just add text-justify to all paragraphs that meet the above criteria
        // Let's also check if it contains leading-relaxed or text that suggests a body block
        // Actually, user said "all the paragraphs in case study id page".
        
        // Let's exclude ones that are clearly just labels, like ROLE and TOOLS
        if (classes.includes('mb-1 font-bold') && classes.includes('text-[#111111]')) {
            return match; // Keep as is for labels like "ROLE"
        }
        
        return `<p className="${classes} text-justify"`;
    }
    return match;
});

fs.writeFileSync(file, content);
console.log("Updated case-studies page.");
