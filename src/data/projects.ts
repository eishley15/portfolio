import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 0,
    name: 'IMMFI',
    description: 'IMMFI is a full-stack donation and volunteer management platform built for a non-profit organization. The website allows supporters to donate, register as volunteers, and stay updated through blog posts and announcements, while providing administrators with a centralized system to manage donations, volunteers, and communications.',
    shortDescription: 'Full-stack nonprofit platform for managing donations, volunteers, and communications.',
    image: '/immfi.webp',
    link: '/projects/immfi',
    url: 'immfi.org',

    role: 'Fullstack Developer',
    teamSize: 3,
    responsibilities: [
      'Designed and developed the backend API using Node.js and Express',
      'Implemented database schema and data handling using MongoDB',
      'Integrated frontend React components with backend API endpoints',
      'Built the donation submission system and donor data storage',
      'Developed the admin dashboard for managing volunteers, donations, and blog posts',
      'Implemented automated email sending for donation receipts and thank-you messages',
      'Designed printable reporting formats for volunteer lists and donation records with sorting and filtering',
      'Managed deployment and server configuration using AWS EC2 and Nginx',
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'AWS EC2', category: 'deployment' },
      { name: 'Nginx', category: 'deployment' },
    ],
    deployment: {
      platform: 'AWS EC2',
      details: 'Deployed and configured production server using AWS EC2 with Nginx as a reverse proxy.',
      url: 'https://immfi.org',
    },
    contributions: 'Solely responsible for the full backend architecture, API development, database design, admin dashboard, automated email workflows, and deployment configuration.',

    githubUrl: '',
    liveUrl: 'https://immfi.org',

    features: [
      'Donation submission system with donor data storage',
      'Volunteer registration and tracking',
      'Admin dashboard for managing donations, volunteers, and blog content',
      'Blog publishing system via the admin panel',
      'Automated email receipts and thank-you messages for donors',
      'Printable and sortable donation and volunteer reports',
    ],
    challenges: [
      'Initially attempted to integrate PayMongo for online donations, but the integration required additional business verification and compliance steps that delayed development. Resolved by implementing an alternative approach using GCash QR and bank transfer details, while still collecting donor information through the website so administrators could track donations and send receipts manually.',
    ],
    outcomes: [
      'Successfully deployed a production-ready nonprofit website',
      'Implemented a working donation tracking and volunteer management system',
      'Enabled administrators to manage content and communications without developer intervention',
    ],
  },
  {
    id: 1,
    name: 'Buffs Chicken',
    description: 'Buffs Chicken is a full-stack restaurant website and online ordering platform developed for a local restaurant in Angeles City. Users can browse menu items, place orders online, view restaurant events, and read blog updates. The platform uses Nuxt.js with server-side rendering for improved SEO and performance. It includes an admin dashboard, real-time order notifications via Socket.IO, server-side image compression, email OTP verification, and a restaurant open/close scheduling system.',
    shortDescription: 'Full-stack restaurant ordering platform with real-time notifications, SSR, and an admin dashboard.',
    image: '/buffs.webp',
    link: '/projects/buffs',
    url: 'buffschicken.com',

    role: 'Fullstack Developer',
    teamSize: 4,
    responsibilities: [
      'Integrated the Nuxt frontend with backend REST API endpoints built with Express',
      'Developed backend logic for the online ordering system',
      'Built the admin dashboard for managing menu items, blog posts, events, and customer orders',
      'Implemented real-time order notifications using Socket.IO WebSockets',
      'Implemented server-side image upload validation and compression using Multer',
      'Built an event posting system with calendar integration for customers',
      'Implemented email OTP verification to validate customer orders and reduce fake submissions',
      'Integrated Resend API for transactional email delivery',
      'Performed SEO optimization using Nuxt server-side rendering and metadata management',
      'Optimized application performance to run on limited cloud server resources',
      'Deployed and configured the production environment using DigitalOcean and Nginx',
    ],
    technologies: [
      { name: 'Vue.js', category: 'frontend' },
      { name: 'Nuxt.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'Socket.IO', category: 'backend' },
      { name: 'Multer', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'DigitalOcean', category: 'deployment' },
      { name: 'Nginx', category: 'deployment' },
      { name: 'Resend', category: 'tools' },
    ],
    deployment: {
      platform: 'DigitalOcean Droplet',
      details: 'Deployed on a DigitalOcean Droplet using Nginx as a reverse proxy. The server started at 512MB RAM, which caused build failures, and was upgraded to 1GB RAM to support the production build process.',
      url: 'https://buffschicken.com',
    },
    contributions: 'Responsible for system integration, core feature implementation, deployment, optimization, and all backend infrastructure.',

    githubUrl: 'https://github.com/chrztyn/Buffs-Chicken-Website.git',
    liveUrl: 'https://buffschicken.com',

    features: [
      'Online ordering system for restaurant customers',
      'Admin dashboard for managing menu items, blog posts, and events',
      'Real-time order notifications using Socket.IO WebSockets',
      'Real-time order status updates broadcasted to both administrators and customers',
      'Restaurant open/close scheduling system controlling when orders can be placed',
      'Event posting system with calendar display for users',
      'Image upload with server-side compression and validation',
      'Email OTP verification system to prevent fake or invalid orders',
      'SEO-optimized pages using Nuxt server-side rendering',
    ],
    challenges: [
      'AWS account verification issues prevented the original infrastructure from being created — migrated deployment to DigitalOcean as a solution.',
      'The initial 512MB RAM droplet caused production build failures due to insufficient memory — resolved by upgrading the server to 1GB RAM.',
      'DigitalOcean blocks outbound SMTP ports by default, preventing the original SMTP-based email service from functioning — resolved by migrating to the Resend email API.',
    ],
    outcomes: [
      'The website is indexed and searchable on Google',
      'Achieved strong performance scores in Google PageSpeed Insights',
      'Provided the restaurant with a functional online ordering system and digital presence',
      'Improved operational efficiency by enabling staff to manage orders and content through the admin dashboard',
    ],
  },
  {
    id: 2,
    name: 'Ben Ibe',
    description: 'Ben Ibe is a full-stack flower shop e-commerce website that allows customers to browse floral arrangements, place orders, and receive email OTP verification to confirm their orders. The platform includes a dedicated admin dashboard where staff can manage the product catalog and handle order fulfillment — from accepting or cancelling orders to notifying customers when their arrangement is ready for pick-up.',
    shortDescription: 'Full-stack flower shop e-commerce platform with order management and email OTP verification.',
    image: '/benibe.webp',
    link: '/projects/benibe',
    url: 'github.com/eishley15/ben-ibe-website',

    role: 'Full-Stack Developer',
    teamSize: 2,
    responsibilities: [
      'Solely responsible for the full implementation of the website based on the Figma design',
      'Developed all frontend components and pages using React',
      'Built all backend API endpoints using Node.js and Express',
      'Designed and managed the MongoDB database schema',
      'Implemented the email OTP verification system for order confirmation',
      'Built the admin dashboard with full CRUD functionality for product and order management',
      'Deployed the application on AWS EC2',
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'Nodemailer', category: 'tools' },
      { name: 'AWS EC2', category: 'deployment' },
    ],
    deployment: {
      platform: 'AWS EC2',
      details: 'Deployed on AWS EC2 (subsequently decommissioned).',
    },
    contributions: 'Solely responsible for all frontend development, backend API, database design, email OTP system, admin dashboard, and deployment.',

    githubUrl: 'https://github.com/eishley15/ben-ibe-website.git',

    features: [
      'Product catalog with search and sort functionality',
      'Customer order placement system',
      'Email OTP verification to confirm orders',
      'Admin dashboard with full CRUD for product management',
      'Admin order management — view, accept, or cancel orders',
      'Pick-up ready notifications sent to customers by admin',
    ],
    challenges: [
      'Some Figma design elements were complex to translate accurately into functional UI components.',
      'The original design was not built with mobile responsiveness in mind, requiring extra effort to address layout and styling inconsistencies across screen sizes.',
    ],
    outcomes: [
      'Successfully delivered a fully functional e-commerce platform for a local flower shop',
      'Implemented an end-to-end order workflow with email confirmation',
      'Provided an admin system for real-time product and order management',
    ],
  },
  {
    id: 3,
    name: 'Splitsmart',
    description: 'Splitsmart is a full-stack expense-splitting web application that enables groups of users to track shared bills and expenses, similar to Splitwise. Users can create groups, log expenses, and split costs among members. The platform features a dashboard for an overview of balances, group activity, and individual expense history — making it easy to manage who owes what across multiple groups.',
    shortDescription: 'Full-stack group expense-splitting app with dashboards, group management, and persistent user profiles.',
    image: '/splitsmart.webp',
    link: '/projects/splitsmart',
    url: 'github.com/chrztyn/6WCSERVER-Final-Project',

    role: 'Full-Stack Developer',
    teamSize: 5,
    responsibilities: [
      'Integrated the Vue.js frontend with the backend REST API',
      'Implemented application-wide error handling across the full stack',
      'Debugged and resolved frontend and backend issues throughout development',
      'Fixed profile image persistence bug by triggering image fetch on login rather than only on profile page load',
      'Implemented search functionality for expenses, member names, and groups',
    ],
    technologies: [
      { name: 'Vue.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'AWS EC2', category: 'deployment' },
      { name: 'Nginx', category: 'deployment' },
    ],
    deployment: {
      platform: 'AWS EC2',
      details: 'Deployed on AWS EC2 with Nginx as a reverse proxy (subsequently decommissioned).',
    },
    contributions: 'Responsible for frontend-backend integration, full-stack error handling, debugging, profile image persistence fix, and search functionality.',

    githubUrl: 'https://github.com/chrztyn/6WCSERVER-Final-Project.git',

    features: [
      'Group creation and shared expense tracking',
      'Bill splitting calculations across group members',
      'Dashboard with balance overview, group activity, and expense history',
      'Multi-user authentication',
      'Profile image upload with persistent session loading',
      'Search functionality for expenses, member names, and groups',
    ],
    challenges: [
      'Profile image persistence: Uploaded images would vanish on page refresh. Traced the issue to the image only being fetched when the profile page loaded — fixed by triggering the image fetch immediately on user login so it persisted across the session.',
      'Dashboard performance: The Vue.js dashboard was component-heavy with many resources loading simultaneously, causing slowdowns. Worked on optimizing component load and resource management.',
      'Deployment issues: The AWS EC2 deployment had backend connectivity problems and mobile styling inconsistencies that required post-deployment debugging.',
    ],
    outcomes: [
      'Successfully delivered a working expense-splitting platform with real-time group management',
      'Resolved persistent profile image bug improving overall user session consistency',
      'Delivered a fully integrated frontend-backend architecture across a 5-person team',
    ],
  },
];

export const getProjectMenuItems = () => projects.map(project => ({
  link: project.link,
  text: project.name,
  image: project.image
}));
