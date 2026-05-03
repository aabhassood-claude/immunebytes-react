// ============================================================
// CHROME-DATA — content for the 7 chrome / top-level pages
// ============================================================

export const DATA_AUDIT = {
  stats: [
    { value: "1125+",    label: "Total Number of Audits"     },
    { value: "2500+",    label: "Total Vulnerabilities Found"},
    { value: "100,000+", label: "Lines of Code Audited"      },
    { value: "40+",      label: "Chains Supported"           },
  ],
  severity: [
    { label: "High Severity",         count: 400, percent: 37.4, color: "#E13B33" },
    { label: "Medium Severity",       count: 210, percent: 19.6, color: "#F7931E" },
    { label: "Low Severity",          count: 287, percent: 26.8, color: "#F5C518" },
    { label: "Informational",         count: 173, percent: 16.2, color: "#74BF00" },
  ],
  platforms: [
    { label: "Ethereum", count: 601, percent: 42.3, color: "#E13B33" },
    { label: "BSC",      count: 364, percent: 25.6, color: "#F7931E" },
    { label: "Polygon",  count: 193, percent: 13.6, color: "#F5C518" },
    { label: "Others",   count: 263, percent: 18.5, color: "#74BF00" },
  ],
  platformTints: {
    "Ethereum":   { bg: "rgb(239 246 255)", text: "rgb(29 78 216)",   dot: "#3b82f6" },
    "Solana":     { bg: "rgb(245 243 255)", text: "rgb(109 40 217)",  dot: "#8b5cf6" },
    "Vanarchain": { bg: "rgb(240 253 250)", text: "rgb(15 118 110)",  dot: "#14b8a6" },
    "Cronos":     { bg: "rgb(236 254 255)", text: "rgb(14 116 144)",  dot: "#06b6d4" },
    "Polygon":    { bg: "rgb(245 243 255)", text: "rgb(91 33 182)",   dot: "#7c3aed" },
  },
  projects: [
    { logo: "EP", name: "EPIC",              date: "3/28/2025",  platform: "Ethereum",   tags: ["L1", "+1"] },
    { logo: "AG", name: "AgAu",              date: "10/18/2025", platform: "Ethereum",   tags: ["Institutional", "+1"] },
    { logo: "CF", name: "Collect Foundation",date: "11/29/2025", platform: "Ethereum",   tags: ["L1"] },
    { logo: "PN", name: "Plume Network",     date: "2/03/2025",  platform: "Ethereum",   tags: ["L1"] },
    { logo: "CT", name: "Cross The Ages",    date: "7/28/2025",  platform: "Solana",     tags: ["L1"] },
    { logo: "CS", name: "cSigma Finance",    date: "5/31/2024",  platform: "Ethereum",   tags: ["Institutional"] },
    { logo: "SC", name: "SmartCredit",       date: "2/17/2024",  platform: "Ethereum",   tags: ["DApp"] },
    { logo: "VN", name: "Vanar",             date: "2/12/2024",  platform: "Vanarchain", tags: ["Blockchain Audit"] },
    { logo: "CR", name: "Creampan",          date: "10/28/2023", platform: "Cronos",     tags: ["DeFi"] },
    { logo: "UW", name: "Uwerx",             date: "9/11/2023",  platform: "Polygon",    tags: ["Token"] },
  ],
  pageMeta: { rowsTotal: 104, pagesTotal: 11, pageCurrent: 1 },
};

export const DATA_CLIENTELE = {
  ourClientsHead: {
    title: "Our Clients",
    sub: "Trusted by global teams for a security-first approach. ImmuneBytes has completed 1,000+ engagements securing applications, protocols and AI systems across Web3 and enterprise ecosystems.",
  },
  clients: [
    "BOSON","POLYTRADE","truefi","GoodDollar","MAHADAO","VANAR",
    "E.Money","Demex","cSigma","ethernity","plume","BONFI",
    "XTransfer","quidax","SmartCredit","NEAR","STADER","EPIC",
  ],
  testimonialsHead: {
    title: "What Our Clients Trust us with",
    sub: "Our clients trust us to deliver reliable solutions with measurable results.",
  },
  videos: [
    { name: "Dr. Gabriel Allred", role: "Founder",                    company: "Bixxter Labs",       hue: 142 },
    { name: "Adam Boudjemaa",     role: "Lead Blockchain Developer",  company: "Polytrade Finance",  hue:  18 },
    { name: "J\u00e9r\u00e9mie Lepetit",    role: "Co-Founder & CEO",           company: "Metarwind",          hue: 222 },
    { name: "Ebrahiem Mohamed",   role: "Founder",                    company: "Ethereum STX",       hue: 280 },
  ],
  texts: [
    { name: "Dheeraj Borra", role: "Co-Founder", company: "Stader Labs", initials: "DB", dark: true, quote: "ImmuneBytes demonstrated the perfect blend of expertise, commitment, and accountability, resulting in an audit that surpassed expectations." },
    { name: "Aruje Jahan", role: "Product Owner", company: "LoX", initials: "AJ", dark: false, quote: "We partnered with ImmuneBytes for a security audit of our products. Their expertise and professionalism instilled confidence throughout the process." },
    { name: "Mac P.", role: "Chief Engineer", company: "Ethernity", initials: "MP", dark: false, quote: "We are thoroughly impressed by their team, who left no scope for a communication gap and provided a quick turnaround time." },
    { name: "Yog Shrusti", role: "Co-Founder & CEO", company: "Farmsent", initials: "YS", dark: true, quote: "Robots can do audits, but the personal touch makes a difference. That\u2019s why we love ImmuneBytes!" },
  ],
};

export const DATA_ABOUT = {
  intro: "ImmuneBytes is an experienced security-first services firm, embedding cybersecurity at the core of technology and business decisions\u2014moving beyond reactive compliance to deliver proactive, resilient, and trusted systems built for real-world risk.",
  mission: { title: "MISSION", body: "To embed security at the foundation of every digital system by delivering rigorous assessments, proactive defense strategies, and engineering-led expertise that strengthen resilience across Web3, AI, and enterprise environments.", icon: "Rocket" },
  vision: { title: "VISION", body: "To become a globally trusted security-first partner, enabling organizations to innovate confidently by making protection, resilience, and trust integral to every technology decision.", icon: "Telescope" },
  values: [
    { title: "Security First, Always",    desc: "Protection is not an afterthought." },
    { title: "Engineering Rigor",         desc: "We believe in methodical, evidence-based assessments." },
    { title: "Client Partnership",        desc: "We work alongside teams, not just for them." },
    { title: "Proactive Mindset",         desc: "We think like attackers to strengthen systems." },
    { title: "Continuous Learning",       desc: "Threat landscapes evolve \u2014 so do we." },
    { title: "Integrity & Transparency",  desc: "Clear findings, honest communication." },
  ],
  founder: { name: "Aabhas Sood", role: "Founder & CEO", bio: "As the Founder & CEO of ImmuneBytes, I lead one of the fastest-growing blockchain security firms focused on smart contract audits, penetration testing, and security consulting for DeFi, dApps, NFTs, and digital wallet ecosystems.", initials: "AS" },
  team: [
    { name: "M. Jariruddin", role: "Security Engineer",    initials: "MJ" },
    { name: "Kaif Ahmed",    role: "Security Engineer",    initials: "KA" },
    { name: "Sheetal Sinha", role: "Business Development", initials: "SS" },
  ],
  joinTeam: { title: "Join our team", sub: "Our philosophy is simple \u2014 hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.", cta: "Write an email to hr@immunebytes.com", href: "mailto:hr@immunebytes.com" },
};

export const DATA_ENGAGEMENT = [
  { title: "Fixed Price Audit", desc: "Get a comprehensive security audit with predictable costs.", bestFor: ["One-time audits","Pre-launch Security Reviews","Compliance requirements"], cta: "Send Query", href: "#contact" },
  { title: "Retainer", desc: "Ongoing security partnership for continuous protection.", bestFor: ["Protocols in active development","Evolving Codebases","Long-term Security Needs"], cta: "Send Query", href: "#contact" },
  { title: "Pay Per Vulnerability (PPV)", desc: "Low upfront cost with severity-based payouts.", bestFor: ["Budget-conscious Projects","Early-stage Startups","Experimental Protocols"], cta: "Send Query", href: "#contact" },
];

export const DATA_ENGAGEMENT_HELP = {
  title: "Need help deciding", desc: "Not sure which engagement model fits your project?",
  bestFor: ["Schedule Consultation","Contact Sales"],
  cta: "View Pricing Calculator", href: "/pricing", calculatorVariant: true,
};

export const DATA_CALCULATOR = {
  steps: ["Service","Scope","Details","Estimate"],
  services: [
    { id: "pentest", title: "Penetration Testing", desc: "Web, mobile & desktop security assessments", icon: "Globe" },
    { id: "web3",    title: "Web3 Security",       desc: "Smart contracts, protocols & DApp audits",   icon: "Shield" },
    { id: "ai",      title: "AI Security",         desc: "LLMs, agents & AI infrastructure reviews",   icon: "Bot" },
  ],
  subServiceMap: {
    pentest: ["Web Application Testing","Mobile Application Testing","Desktop Application Testing"],
    web3: ["Smart Contract Audit","Protocol & Infrastructure Audit","Wallet Security"],
    ai: ["AI Agent Audit","Chatbot Security","LLM Integration Audit","Automation & Workflow Audit"],
  },
  complexity: ["Static Website","Basic CRUD App","Multi-user with auth","E-commerce / SaaS","Enterprise System"],
  testingDepth: [
    { id: "blackbox",      title: "Black-box only",                     hint: "Standard" },
    { id: "blackbox-arch", title: "Black-box + Architecture Review",    hint: "Deeper" },
  ],
  documentationOptions: [
    { id: "comprehensive", title: "Comprehensive documentation available", hint: "Reduces cost by 5%",   tone: "good" },
    { id: "partial",       title: "Partial documentation available",       hint: "Standard rate",        tone: "neutral", default: true },
    { id: "limited",       title: "Limited / No documentation",            hint: "Increases cost by 10%",tone: "bad" },
  ],
  auditHistoryOptions: [
    { id: "first",   title: "First-time audit",                            hint: "Standard rate",        tone: "neutral", default: true },
    { id: "reaudit", title: "Previously audited (re-audit after changes)", hint: "15% discount",         tone: "good" },
    { id: "loyal",   title: "Previously audited by ImmuneBytes",           hint: "30% loyalty discount", tone: "good" },
  ],
  commsOptions: ["Email","Slack","Telegram","Phone"],
};

export const DATA_BLOG = {
  categories: ["All","Blockchain","Case Study","Ecosystems","Game Theory","Protocol Face-off","Stablecoins","Wallet Security","Web3 Security"],
  posts: [
    { title: "Alchemy\u2019s Modular Account: Technical Deep Dive into ERC-6900", topic: "Web3 Wallets", category: "Wallet Security", date: "31 Jul 2025", excerpt: "ERC-6900 introduces a plugin architecture for smart accounts." },
    { title: "The Signature Trap: Why Wallet UX Is Failing Users in Web3", topic: "Wallet Security", category: "Wallet Security", date: "31 Jul 2025", excerpt: "Blind signing, EIP-712 confusion, and phishing-by-design." },
    { title: "Quantum-Resistant Smart Contract Audits", topic: "Web3 Security", category: "Web3 Security", date: "17 Jul 2025", excerpt: "Post-quantum cryptography is closer than the timelines suggest." },
    { title: "Web3 Frontends: The New Playground for Hackers", topic: "Web3 Security", category: "Web3 Security", date: "14 Jul 2025", excerpt: "The contract is hardened, but the frontend serves a different ABI." },
    { title: "Smart Contract Audits to Next-Gen Tech: The AI/ML Systems", topic: "AI & Web3 Security", category: "Web3 Security", date: "16 Jul 2025", excerpt: "When ML models drive on-chain decisions, the audit boundary moves." },
    { title: "Orca Whirlpools vs Uniswap V3", topic: "Protocol Face-Off", category: "Protocol Face-off", date: "3 Jul 2025", excerpt: "Concentrated liquidity, two implementations, two security profiles." },
    { title: "Stablecoins Under Stress", topic: "Stablecoins", category: "Stablecoins", date: "30 Jun 2025", excerpt: "Peg mechanics break in predictable patterns." },
    { title: "Analyzing Upgradability Patterns Across Blockchains", topic: "Blockchain", category: "Blockchain", date: "26 Jun 2025", excerpt: "Proxy storage, beacon, diamond \u2014 every upgrade pattern carries different invariants." },
    { title: "Solana VS Near Blockchain", topic: "Blockchain", category: "Protocol Face-off", date: "19 Jun 2025", excerpt: "Two performant chains, two execution models." },
    { title: "How to Write Comprehensive Audit Reports", topic: "Web3 Security", category: "Web3 Security", date: "16 Jun 2025", excerpt: "After 1,000+ engagements, this is what makes a finding actually fix-able." },
  ],
  pageCurrent: 1, pagesTotal: 4,
};

export const DATA_CONTACT = {
  getInTouch: {
    title: "Get in Touch with Our Security Experts",
    sub: "Your security is our priority. Reach out through any of the channels below.",
    company: "ImmuneBytes Pvt. Ltd.",
    address: "B1/622, Janakpuri, New Delhi - 110058",
    email: "info@immunebytes.com",
    phone: "+91 7303699708",
  },
  form: {
    title: "Have a Query in Mind?",
    sub: "Write us a message, we\u2019ll contact you soon.",
    categories: ["Web3 Security Audit","Web2 / Penetration Testing","AI Security Audit","Security Consultancy","Partnership / Other"],
  },
};
