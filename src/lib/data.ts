import {
  Server,
  Code2,
  Database,
  Layout,
  Boxes,
  Cpu,
  Globe,
  Layers,
  Shield,
  GitBranch,
  Terminal,
  ShoppingCart,
  Smartphone,
  AppWindow,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  accent: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    icon: Server,
    accent: 'from-cyan-400 to-blue-500',
    skills: [
      { name: 'ASP.NET Core MVC', icon: Layers },
      { name: 'Web API', icon: Globe },
      { name: 'C#', icon: Code2 },
      { name: 'Node.js', icon: Terminal },
      { name: 'Express.js', icon: Server },
    ],
  },
  {
    title: 'Frontend',
    icon: Layout,
    accent: 'from-emerald-400 to-teal-500',
    skills: [
      { name: 'HTML5', icon: Code2 },
      { name: 'CSS3', icon: Layout },
      { name: 'JavaScript', icon: Code2 },
      { name: 'Angular', icon: Boxes },
      { name: 'React.js', icon: Cpu },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    accent: 'from-violet-400 to-fuchsia-500',
    skills: [
      { name: 'MS SQL Server', icon: Database },
      { name: 'MongoDB', icon: Boxes },
      { name: 'Entity Framework Core', icon: GitBranch },
    ],
  },
];

export interface ProjectRepo {
  label: string;
  url: string;
}

export type ProjectGroup = 'mobile' | 'react' | 'desktop' | 'html';

export const projectGroups: { id: ProjectGroup | 'all'; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All Work', icon: LayoutGrid },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'react', label: 'React / Full Stack', icon: Globe },
  { id: 'desktop', label: 'Desktop Apps (C# / .NET)', icon: AppWindow },
  { id: 'html', label: 'HTML & CSS', icon: Code2 },
];

export interface Project {
  id: string;
  group: ProjectGroup;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: LucideIcon;
  accent: string;
  repos: ProjectRepo[];
}

export const projects: Project[] = [
  {
    id: '01',
    group: 'react',
    title: 'SupplyChain ERP',
    category: 'Full-Stack Enterprise System',
    description:
      'Built a full-stack ERP system with a RESTful Core API backend, Angular admin dashboard, and React portal. Implemented JWT-based authentication and role-based access control across the entire platform.',
    highlights: [
      'RESTful Core API backend',
      'Angular admin dashboard + React portal',
      'JWT auth & role-based access control',
    ],
    tags: ['.NET Core', 'Angular', 'React', 'JWT', 'REST API'],
    icon: Boxes,
    accent: 'from-cyan-500/20 to-blue-600/10',
    repos: [
      { label: 'Core API', url: 'https://github.com/TahminaKhanNipa10-Codes/SupplyChain-ERP-CoreAPI' },
      { label: 'Angular Admin', url: 'https://github.com/TahminaKhanNipa10-Codes/SupplyChain-ERP-AngularAdmin' },
      { label: 'React Portal', url: 'https://github.com/TahminaKhanNipa10-Codes/SuperShop-ERP-ReactPortal' },
    ],
  },
  {
    id: '02',
    group: 'desktop',
    title: 'NexusRetailERP',
    category: 'Retail ERP System',
    description:
      'Designed an end-to-end Retail ERP system using ASP.NET MVC with Entity Framework Code-First approach. Built dedicated modules for inventory management and sales tracking with real-time reporting.',
    highlights: [
      'ASP.NET MVC + EF Code-First',
      'Inventory management module',
      'Sales tracking & reporting',
    ],
    tags: ['ASP.NET MVC', 'EF Core', 'C#', 'SQL Server'],
    icon: Layers,
    accent: 'from-emerald-500/20 to-teal-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/NexusRetailERP-mvc-cf' },
    ],
  },
  {
    id: '03',
    group: 'react',
    title: 'Full-Stack MERN E-Commerce',
    category: 'E-Commerce Platform',
    description:
      'Developed a full-featured e-commerce application using MongoDB, Express.js, React, and Node.js with a centralized admin panel for inventory control, order management, and product catalog.',
    highlights: [
      'MERN stack architecture',
      'Centralized admin panel',
      'Inventory & order management',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    icon: ShoppingCart,
    accent: 'from-violet-500/20 to-fuchsia-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/Full-Stack-MERN-E-Commerce-Platform' },
    ],
  },
  {
    id: '04',
    group: 'mobile',
    title: 'Smart Health Community',
    category: 'Mobile Health Application',
    description:
      'A mobile application that connects users in a health-focused community, bringing together the features that make everyday health management more social and accessible.',
    highlights: [
      'Native mobile application',
      'Community-driven health features',
    ],
    tags: ['Mobile App', 'Health', 'Community'],
    icon: Smartphone,
    accent: 'from-sky-500/20 to-cyan-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/smart-health-community-mobileapp' },
    ],
  },
  {
    id: '05',
    group: 'desktop',
    title: 'Project Apex',
    category: 'Windows Desktop Application',
    description:
      'A Windows desktop application built with C# and Windows Forms, developed as a hands-on desktop project in the .NET ecosystem.',
    highlights: [
      'Windows Forms user interface',
      'C# application logic',
    ],
    tags: ['Windows Forms', 'C#', '.NET'],
    icon: AppWindow,
    accent: 'from-amber-500/20 to-orange-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/project-apex' },
    ],
  },
  {
    id: '06',
    group: 'html',
    title: 'Landing Page',
    category: 'Internship Project',
    description:
      'A responsive landing page built with semantic HTML and modern CSS as part of the web development internship track.',
    highlights: [
      'Semantic HTML structure',
      'Responsive CSS layout',
    ],
    tags: ['HTML5', 'CSS3'],
    icon: Layout,
    accent: 'from-rose-500/15 to-orange-500/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/OIBSIP/tree/main/WebDev-L1-LandingPage' },
    ],
  },
  {
    id: '07',
    group: 'html',
    title: 'Login System',
    category: 'Internship Project',
    description:
      'A login interface with form validation and styled authentication screens, built with HTML and CSS during the web development internship.',
    highlights: [
      'Styled login and sign-up forms',
      'Client-side form validation',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    icon: Shield,
    accent: 'from-emerald-500/15 to-teal-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/OIBSIP/tree/main/WebDev-L2-LoginSystem' },
    ],
  },
  {
    id: '08',
    group: 'html',
    title: 'To-Do Web App',
    category: 'Internship Project',
    description:
      'A to-do web application for adding, completing, and removing tasks, built with HTML, CSS, and JavaScript during the web development internship.',
    highlights: [
      'Add, complete, and delete tasks',
      'Clean, responsive interface',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    icon: GitBranch,
    accent: 'from-cyan-500/15 to-sky-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/OIBSIP/tree/main/WebDev-L2-ToDoWebApp' },
    ],
  },
  {
    id: '09',
    group: 'html',
    title: 'Tribute Page',
    category: 'Internship Project',
    description:
      'A styled tribute page layout built with HTML and CSS during the web development internship.',
    highlights: [
      'Semantic page structure',
      'Typography and layout styling',
    ],
    tags: ['HTML5', 'CSS3'],
    icon: Layers,
    accent: 'from-fuchsia-500/15 to-rose-600/10',
    repos: [
      { label: 'View on GitHub', url: 'https://github.com/TahminaKhanNipa10-Codes/OIBSIP/tree/main/WebDev-L2-TributePage' },
    ],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tahminakhan-nipa/', icon: 'linkedin' as const },
  { label: 'GitHub', href: 'https://github.com/TahminaKhanNipa10-Codes/', icon: 'github' as const },
];

export const platformLinks = {
  upwork: 'https://www.upwork.com/freelancers/~01c2b462025e7e18dc',
  fiverr: 'https://www.fiverr.com/s/2pQA78N',
};
