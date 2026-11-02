export type PortfolioProject = {
  id: string;
  title: string;
  number: string;
  arcana: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  stack: string[];
  contribution: string;
  images: { src: string; alt: string }[];
  links: { label: string; href: string }[];
};

export const profile = {
  name: "Lee Wai Yee",
  email: "wwaiyyee@gmail.com",
  github: "https://github.com/wwaiyyee",
  linkedin: "https://www.linkedin.com/in/lee-wai-yee/",
  location: "Kuala Lumpur / Petaling Jaya, Malaysia",
  degree: "Bachelor of Computer Science (Artificial Intelligence)",
  university: "Taylor’s University",
  graduation: "2026",
  honours: "First Class Honours",
  cgpa: "3.78 / 4.00",
  availability: "Available from November 2026",
};

export const projects: PortfolioProject[] = [
  {
    id: "twinkle", title: "Twinkle", number: "01", arcana: "XVII · The Star",
    category: "Interactive learning / 3D", year: "2025",
    summary: "A playful 3D learning space for neurodiverse children, bringing storytelling, voice, and conversational AI into one world.",
    role: "Creative technology & frontend development",
    stack: ["React", "Three.js", "WebGL", "Figma"],
    contribution: "Exploring how accessible interfaces, 3D interaction, and visual feedback can make learning more engaging. Built as a collaborative hackathon prototype.",
    images: [
      { src: "/twinkle/twinkle-room.png", alt: "Twinkle’s interactive 3D learning room" },
      { src: "/twinkle/twinkle-landing.png", alt: "Twinkle learning platform introduction" },
      { src: "/twinkle/twinkle-book.png", alt: "Twinkle’s illustrated vocabulary storybook" },
    ],
    links: [
      { label: "Explore prototype", href: "https://cursorhack-twinkle.vercel.app" },
      { label: "Watch demo", href: "https://www.youtube.com/watch?v=sECy8B561VM" },
    ],
  },
  {
    id: "intellibox", title: "IntelliBox", number: "02", arcana: "I · The Magician",
    category: "AI agents / Workflow automation", year: "2025",
    summary: "An AI agent workspace that brings multi-model tools, conversational workflows, and an agent marketplace together.",
    role: "UI/UX design",
    stack: ["AI agents", "Workflow automation", "Figma"],
    contribution: "Designing clear interaction flows for coordinating AI agents, from a unified chat workspace to discovering tools in the marketplace.",
    images: [
      { src: "/intellibox/intellibox-chat.png", alt: "IntelliBox’s multi-agent chat workspace" },
      { src: "/intellibox/intellibox-landing.png", alt: "IntelliBox introduction and agent workspace" },
      { src: "/intellibox/intellibox-marketplace.png", alt: "IntelliBox agent marketplace interface" },
    ],
    links: [{ label: "View repository", href: "https://github.com/Jay-366/techtrove2.0" }],
  },
  {
    id: "dopews-my", title: "DOPEWS-MY", number: "03", arcana: "X · Wheel of Fortune",
    category: "Applied machine learning / Data", year: "2026",
    summary: "A data-driven dashboard for exploring dengue outbreak risk in Malaysia through forecasts, hotspot maps, and public information.",
    role: "UI/UX design & frontend development",
    stack: ["React", "Python", "Scikit-learn", "Node.js", "MongoDB"],
    contribution: "Turning forecast and environmental data into readable interfaces, with a focus on geographic exploration and making complex risk information easier to understand.",
    images: [
      { src: "/dopews-my/DOPEWS-heatmap.png", alt: "DOPEWS-MY geographic dengue hotspot dashboard" },
      { src: "/dopews-my/DOPEWS-landing.png", alt: "DOPEWS-MY dengue prediction platform homepage" },
      { src: "/dopews-my/DOPEWS-education.png", alt: "DOPEWS-MY public dengue awareness interface" },
    ],
    links: [{ label: "View repository", href: "https://github.com/Cedctf/fyp" }],
  },
  {
    id: "intellitrade", title: "IntelliTrade", number: "04", arcana: "XXI · The World",
    category: "AI marketplace / Web3", year: "2025",
    summary: "A decentralized AI-agent marketplace connecting agent discovery, direct chat, ownership, and cross-chain payments.",
    role: "UI/UX design",
    stack: ["AI agents", "Web3", "IPFS", "Figma"],
    contribution: "Designing the experience of discovering, subscribing to, and interacting with AI agents across a connected marketplace.",
    images: [
      { src: "/intellitrade/intellitrade-marketplace.jpeg", alt: "IntelliTrade AI-agent marketplace" },
      { src: "/intellitrade/intellitrade-landing.jpeg", alt: "IntelliTrade decentralized marketplace homepage" },
      { src: "/intellitrade/intellitrade-chat.png", alt: "IntelliTrade direct agent conversation interface" },
    ],
    links: [
      { label: "Explore prototype", href: "https://intellitrade-theta.vercel.app/" },
      { label: "View showcase", href: "https://ethglobal.com/showcase/intellitrade-a31dd" },
    ],
  },
  {
    id: "ethclbet", title: "ETHCLBET", number: "05", arcana: "A connected perspective",
    category: "Web3 / Prediction markets", year: "2025",
    summary: "A prediction-market aggregation project that brings cross-platform markets and probability comparisons into one interface.",
    role: "Collaborative hackathon project",
    stack: ["Web3", "Blockchain", "Market aggregation"],
    contribution: "Exploring how information from separate prediction platforms can be brought together into a readable, connected experience.",
    images: [
      { src: "/ethclbet/ethclbet-landing.png", alt: "ETHCLBET prediction market aggregation platform" },
      { src: "/ethclbet/ethclbet-market.png", alt: "ETHCLBET market comparison interface" },
    ],
    links: [{ label: "View repository", href: "https://github.com/cedctf/ethclbet" }],
  },
];

export const chapters = [
  {
    id: "builder", label: "The Builder", subtitle: "Code, AI & the possibilities in between",
    text: "I’m a recent AI graduate drawn to the space between an idea and something that works in the real world. My interests span computer vision, LLMs, AI agents, backend development, and the engineering that brings them together.",
  },
  {
    id: "reader", label: "The Reader", subtitle: "A little space for intuition",
    text: "Away from the technical side of things, I enjoy tarot reading. The images and stories offer a different kind of perspective—a little space to reflect, ask questions, and stay curious.",
  },
  {
    id: "wanderer", label: "The Wanderer", subtitle: "New places, different perspectives",
    text: "Travel and photography are the other ways I explore. I like having a reason to slow down, notice the details, and see things from a different angle. That curiosity follows me back to the things I build.",
  },
] as const;

export const interests = ["Computer vision", "LLMs & AI agents", "Backend systems", "AI automation", "Software engineering"];

export function findProject(id: string | null) {
  const aliases: Record<string, string> = { dopews: "dopews-my", "01": "dopews-my", "02": "twinkle", "03": "intellitrade", "04": "intellibox" };
  return projects.find((project) => project.id === (id ? aliases[id] ?? id : ""));
}
