const fs = require('fs');

const path = 'app/work/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Strip out the old PROJECTS array
const startIdx = content.indexOf('const PROJECTS = [');
const endIdx = content.indexOf('];\n\nconst WorkPage = () => {') + '];'.length;

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

// add import
content = before.replace("import { NavBar } from '../../components/NavBar';", "import { NavBar } from '../../components/NavBar';\nimport { WORK_PROJECTS as PROJECTS } from '../../data/work-projects';") + after;

fs.writeFileSync(path, content);
