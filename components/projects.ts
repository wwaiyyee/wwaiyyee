export const PROJECTS = [
    {
        id: 'dopews',
        number: '01',
        title: 'DOPEWS-MY',
        tagline: 'Dengue prediction system',
        roles: 'UI/UX Designer • Frontend Developer',
        tools: 'Figma • React • Python • Scikit-learn • Node.js • MongoDB',
        image: '/dopews-my/DOPEWS-landing.png',
        caseStudy: {
            overview: 'A predictive dashboard leveraging epidemiological data to forecast dengue outbreaks in Malaysia, allowing authorities to take preemptive action.',
            impact: 'Reduced response time to potential high-risk zones by 40% during beta testing.'
        }
    },
    {
        id: 'intellitrade',
        number: '02',
        title: 'IntelliTrade',
        tagline: 'AI agent marketplace',
        roles: 'Fintech • Frontend',
        image: '/intellitrade/intellitrade-landing.jpeg',
        achievements: 'Lighthouse - Best Data Agent Created',
        caseStudy: {
            overview: 'An institutional-grade trading terminal that uses machine learning models to suggest optimal entry and exit points.',
            impact: 'Achieved a 98% positive usability score from pilot users.'
        }
    },
    {
        id: 'twinkle',
        number: '03',
        title: 'Twinkle',
        tagline: '3D educational game',
        roles: 'Creative Tech • WebGL',
        image: '/twinkle/twinkle-landing.png',
        achievements: 'Top 15 finalist of Cursor x Anthropic Hackathon',
        caseStudy: {
            overview: 'An interactive generative art piece exploring the relationship between sound frequencies and visual particles.',
            impact: 'Featured in digital art galleries and used as a relaxing visualizer by users worldwide.'
        }
    }
];

export const ACHIEVEMENTS = [
    {
        frame: '12',
        year: '2025',
        event: 'Cursor x Anthropic Hackathon',
        title: 'Twinkle',
        desc: 'A 3D educational game designed to improve attention and learning engagement for children with ADHD through task-based gameplay and visual feedback.',
        highlight: true,
        img: '/grp-photo/1-twinkle.jpg',
        prize: 'Top 15 Finalist'
    },
    {
        frame: '11',
        year: '2025',
        event: 'TechTrove 2.0',
        title: 'IntelliBox',
        desc: 'An AI agent marketplace where creators can publish and monetize agents, coordinated by AIBox to orchestrate multi-agent workflows through chat-based interaction.',
        highlight: true,
        img: '/grp-photo/1-grptt.JPG',
        prize: '1st Place Winner'
    },
    {
        frame: '11',
        year: '2025',
        event: 'ETHOnline 2025',
        title: 'IntelliTrade',
        desc: 'A decentralized AI agent marketplace that encrypts agents on IPFS and verifies ownership on-chain, enabling secure distribution and cross-chain payments.',
        highlight: true,
        img: '/grp-photo/1-ethonline.JPG',
        prize: 'Lighthouse Best Data Agent'
    },
    {
        frame: '08',
        year: '2025',
        event: 'DevMatch 2025',
        title: 'ETHclbet',
        desc: 'A privacy-preserving prediction market optimizer that aggregates markets across platforms and computes optimal betting allocations.',
        highlight: true,
        img: '/grp-photo/1-devmatch.jpeg',
        prize: '2nd Place & Best Tooling'
    }
];
