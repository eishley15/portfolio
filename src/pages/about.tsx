import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import ProfileCard from '@/components/ProfileCard';
import StaggeredMenu from '../components/StaggeredMenu';
import PortfolioFooter from '../components/PortfolioFooter';
import { useNavigate } from 'react-router-dom';
import { menuItems, socialItems } from '@/data/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

const VideoModal = lazy(() => import('@/components/VideoModal'));
import {
  SiFigma,
  SiWordpress,
  SiAmazon,
  SiDigitalocean,
  SiCloudflare,
  SiPostman,
  SiNotion,
  SiGit,
  SiVercel,
  SiRaycast,
  SiShadcnui,
  SiDavinciresolve,
  SiAdobelightroom,
  SiAdobephotoshop
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

const STYLES = `
  html, body { overflow: hidden; overscroll-behavior: none; height: 100%; }

  .about-scroller {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
    transform: translateZ(0);
    contain: layout style;
    isolation: isolate;
  }
  .about-scroller::-webkit-scrollbar       { width: 3px; }
  .about-scroller::-webkit-scrollbar-track { background: transparent; }
  .about-scroller::-webkit-scrollbar-thumb { background: rgba(23,41,149,0.45); border-radius: 2px; }

  .sr {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .sr.visible { opacity: 1 !important; transform: none !important; }

  @keyframes blob {
    0%,100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
    50%      { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
  }
  .blob { animation: blob 9s ease-in-out infinite; will-change: transform; }

  @media (max-width: 768px) {
    .blob { animation: none !important; }
    .sr { transition-duration: 0.4s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .blob, .sr, .divline, .gpulse { animation: none !important; transition-duration: 0.01ms !important; }
  }

  .stat-card { transition: border-color .25s ease, transform .25s ease; }
  .stat-card:hover { border-color: rgba(23,41,149,.55); transform: translateY(-4px); }

  .spill { transition: border-color .2s, color .2s, background .2s, transform .2s; }
  .spill:hover { border-color: #172995; color: #7b9fff; background: rgba(23,41,149,.08); transform: translateY(-2px); }
  @keyframes skillIn {
    0%   { opacity: 0; transform: translateY(12px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .stile { transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .25s, box-shadow .25s; }
  .stile:hover { transform: translateY(-8px) scale(1.06); border-color: rgba(23,41,149,.55); box-shadow: 0 14px 30px rgba(23,41,149,.22); }

  .gtile { transition: transform .3s ease, box-shadow .3s ease; }
  .gtile:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(23,41,149,.22); }

  .soc { transition: border-color .2s, opacity .2s; }
  .soc:hover { border-color: #172995 !important; opacity: 1 !important; }

  .btn-p { position: relative; overflow: hidden; transition: background .3s, box-shadow .3s, transform .2s; }
  .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,254,235,.15) 50%,transparent 60%); transform:translateX(-100%); transition:transform .55s ease; }
  .btn-p:hover::after { transform: translateX(100%); }
  .btn-p:hover { background: #1f37b3; box-shadow: 0 0 32px rgba(23,41,149,.5); transform: translateY(-2px); }

  .btn-o { transition: border-color .2s, color .2s, transform .2s; }
  .btn-o:hover { border-color: #172995 !important; color: #7b9fff !important; transform: translateY(-2px); }

  @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .divline { transform-origin: center; animation: lineGrow 1s cubic-bezier(.22,1,.36,1) both; }

  @keyframes glowPulse { 0%,100%{box-shadow:0 0 18px rgba(23,41,149,.2);} 50%{box-shadow:0 0 44px rgba(23,41,149,.5);} }
  .gpulse { animation: glowPulse 3.5s ease-in-out infinite; }

  @keyframes lbIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
  .lb-backdrop { animation: fadeIn 0.2s ease both; }
  .lb-img      { animation: lbIn  0.25s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .cv-section {
    content-visibility: auto;
    contain-intrinsic-size: 0 500px;
    will-change: transform;
    transform: translateZ(0);
  }

  .about-profile-wrapper {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    border-radius: 1.25rem;
  }
  @media (max-width: 768px) {
    .about-profile-wrapper section {
      height: 320px !important;
      max-height: 360px !important;
      aspect-ratio: unset !important;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .about-profile-wrapper { max-width: 380px; width: 100%; flex-shrink: 0; }
    .about-profile-wrapper section { max-height: 420px !important; }
  }
  @media (min-width: 1025px) {
    .about-profile-wrapper { max-width: 460px; width: 100%; }
    .about-profile-wrapper section { max-height: 560px !important; }
  }

  /* ── Beyond Dev: discipline cards ── */
  .discipline-card { transition: border-color .25s, background .25s, transform .25s; }
  .discipline-card:hover { border-color: rgba(23,41,149,.5); background: rgba(23,41,149,.04); transform: translateY(-3px); }

  /* ── Beyond Dev: work tiles ── */
  .work-tile { transition: border-color .25s, transform .25s; }
  .work-tile:hover { border-color: rgba(23,41,149,.6); }
  .work-tile img { transition: transform .5s ease; }
  .work-tile:hover img { transform: scale(1.04); }

  /* ── Beyond Dev: studio banner ── */
  .studio-banner { transition: border-color .3s; }
  .studio-banner:hover { border-color: rgba(23,41,149,.75); }
  .studio-banner .studio-glow-l { transition: opacity .5s; }
  .studio-banner:hover .studio-glow-l { opacity: 0.28 !important; }
  .studio-banner .studio-glow-r { transition: opacity .5s; }
  .studio-banner:hover .studio-glow-r { opacity: 0.20 !important; }
  .studio-banner .studio-btn { transition: background .3s; }
  .studio-banner:hover .studio-btn { background: #1f37b3; }
  .studio-banner .studio-arrow { transition: transform .2s; }
  .studio-banner:hover .studio-arrow { transform: translateX(4px); }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '3',  label: 'Years Experience'  },
  { value: '8',  label: 'Projects Delivered' },
  { value: '9',  label: 'Certificates'       },
];

const SKILLS = {
  Technical: ['HTML5','CSS3','JavaScript','React','Vue.js','Angular','Node.js','Express','Tailwind CSS','Git','REST APIs','MongoDB','MySQL','Java','Python','TypeScript','WordPress'],
  Creative:  ['Web Design','UI/UX Design','Video Editing','Photo Editing','Advertisements'],
};

const HARDWARE = [
  { name: 'MacBook Pro M3 Pro', image: '/tools/macbook-pro.png'    },
  { name: 'Logitech Lift Mouse', image: '/tools/logitech-lift.png' },
  { name: 'Logitech K780',       image: '/tools/logitech-k780.png' },
  { name: 'Nvision 27"',         image: '/tools/nvision-monitor.png' },
  { name: 'Sony A7IV',           image: '/tools/sony-a7iv.webp'    },
  { name: 'DJI Mini 3',          image: '/tools/dji-mini3.png'     },
  { name: 'DJI Gimbal',          image: '/tools/dji-gimbal.png'    },
  { name: 'Sony A6400',          image: '/tools/sony-a6400.webp'   },
  { name: 'Samsung T7 SSD',      image: '/tools/samsung-t7.webp'   },
  { name: 'AirPods 3',           image: '/tools/airpods-3.webp'    },
];

const SOFTWARE = [
  { name: 'VS Code',        icon: VscVscode        },
  { name: 'Figma',          icon: SiFigma          },
  { name: 'WordPress',      icon: SiWordpress      },
  { name: 'AWS',            icon: SiAmazon         },
  { name: 'DigitalOcean',   icon: SiDigitalocean   },
  { name: 'Cloudflare',     icon: SiCloudflare     },
  { name: 'Postman',        icon: SiPostman        },
  { name: 'Notion',         icon: SiNotion         },
  { name: 'Git',            icon: SiGit            },
  { name: 'Vercel',         icon: SiVercel         },
  { name: 'Raycast',        icon: SiRaycast        },
  { name: 'Shadcn UI',      icon: SiShadcnui       },
  { name: 'DaVinci Resolve',icon: SiDavinciresolve },
  { name: 'Lightroom',      icon: SiAdobelightroom },
  { name: 'Photoshop',      icon: SiAdobephotoshop },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/kyle-payawal-612400377/', src: '/linkedin-alt.svg', alt: 'LinkedIn'  },
  { href: 'https://github.com/eishley15',                         src: '/github-alt.svg',   alt: 'GitHub'    },
  { href: 'https://www.instagram.com/payawalkyle/',               src: '/instagram.svg',    alt: 'Instagram' },
];

/* ── Beyond Dev data ── */
const DISCIPLINES = [
  { title: 'Photography', tags: 'Events · Products · Portraits' },
  { title: 'Videography', tags: 'Ads · Promos · Short Films'    },
  { title: 'Design',      tags: 'Branding · UI · Identity'      },
  { title: 'Reading',     tags: 'Tech · Business · Philosophy'  },
] as const;

type WorkItem =
  | { type: 'image'; src: string; alt: string; cat: string; title: string; delay: number }
  | { type: 'video'; src: string; alt: string; cat: string; title: string; delay: number; url: string; videoTitle: string };

const BOTTOM_WORKS: WorkItem[] = [
  { type: 'image', src: '/payawal-branding.jpg', alt: 'Payawal Branding Logo',  cat: 'Design', title: 'Branding',          delay: 260 },
  { type: 'image', src: '/product-photo.jpg',    alt: 'Product Photography',    cat: 'Photo',  title: 'Product Shot',       delay: 290 },
  { type: 'video', src: '/thumbnail.webp',       alt: 'Code Geeks',             cat: 'Video',  title: 'Code Geeks Promo',   delay: 320,
    url: 'https://www.youtube.com/embed/FdmCLOC8JEk', videoTitle: 'Code Geeks Promotional Video' },
  { type: 'image', src: '/product-photo2.jpg',   alt: 'Product Photography 2',  cat: 'Photo',  title: 'Product Shot 2',     delay: 350 },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
function useScrollReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.sr');
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(
              () => e.target.classList.add('visible'),
              Number((e.target as HTMLElement).dataset.delay || 0),
            );
            obs.unobserve(e.target);
          }
        }),
      { root: el, threshold: 0.1 },
    );
    items.forEach((i: Element) => obs.observe(i));
    return () => obs.disconnect();
  }, []);
}

const SectionHead = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="text-center mb-12">
    <p className="sr text-[#172995] text-[10px] font-bold tracking-[0.3em] uppercase" data-delay="0">{tag}</p>
    <h2 className="sr text-[#FFFEEB] text-3xl sm:text-4xl font-black tracking-tight leading-tight mt-2" data-delay="60">{title}</h2>
    {sub && <p className="sr text-gray-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed" data-delay="100">{sub}</p>}
    <div className="divline sr mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#172995] to-transparent" data-delay="140" />
  </div>
);

const Rule = () => (
  <div className="divline sr my-16 h-px bg-gradient-to-r from-transparent via-[#172995]/30 to-transparent" data-delay="0" />
);

/* Shared play-button badge used on video work tiles */
const PlayBadge = ({ size = 'lg' }: { size?: 'sm' | 'lg' }) => (
  <div
    className={`rounded-full bg-[#172995]/90 border border-[#172995] flex items-center justify-center
      group-hover:scale-110 transition-transform duration-300
      shadow-[0_0_24px_rgba(23,41,149,.55)]
      ${size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}`}
  >
    <svg
      className={`text-white ml-0.5 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

/* Arrow icon reused in buttons */
const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-3.5 h-3.5 shrink-0 ${className}`}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const About = () => {
  const navigate  = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [tab, setTab]                   = useState<keyof typeof SKILLS>('Technical');
  const [skillAnimKey, setSkillAnimKey] = useState(0);
  const activeSkills                    = SKILLS[tab] ?? [];

  const [selectedVideo, setSelectedVideo]       = useState<{ url: string; title: string } | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage]       = useState<{ src: string; alt: string } | null>(null);

  const handleTabClick = (nextTab: keyof typeof SKILLS) => {
    setTab(nextTab);
    setSkillAnimKey((prev) => prev + 1);
  };

  const openVideoModal  = (url: string, title: string) => { setSelectedVideo({ url, title }); setIsVideoModalOpen(true); };
  const closeVideoModal = () => { setIsVideoModalOpen(false); setSelectedVideo(null); };
  const openImageModal  = (src: string, alt: string) => setSelectedImage({ src, alt });
  const closeImageModal = () => setSelectedImage(null);

  useScrollReveal(scrollRef);

  usePageMeta({
    title:       'About — Kyle Payawal | Fullstack Developer',
    description: 'Learn about Kyle Payawal — a fullstack developer with 3+ years of experience building production-ready MERN/MEVN applications, deployed on AWS and DigitalOcean.',
    canonical:   '/about',
  });

  useEffect(() => {
    let s = document.getElementById('about-styles') as HTMLStyleElement | null;
    if (!s) {
      s = document.createElement('style');
      s.id = 'about-styles';
      document.head.appendChild(s);
    }
    s.textContent = STYLES;
  }, []);

  /* ── render ── */
  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#0a0a0a]" />
        <div className="blob absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#172995] opacity-[0.12] blur-[80px]" />
        <div className="blob absolute -top-10 -right-20 w-[400px] h-[400px] bg-purple-700 opacity-[0.10] blur-[80px]" style={{ animationDelay: '3s' }} />
        <div className="blob absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-blue-700 opacity-[0.10] blur-[80px]" style={{ animationDelay: '6s' }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
      </div>

      {/* Nav */}
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <StaggeredMenu
          position="right" items={menuItems} socialItems={socialItems}
          displaySocials displayItemNumbering
          menuButtonColor="#FFFEEB" openMenuButtonColor="#000000"
          changeMenuColorOnOpen colors={['#FFFEEB', '#172995']}
          logoUrl="/logo.svg" accentColor="#172995"
          onMenuOpen={() => {}} onMenuClose={() => {}} isFixed
        />
      </div>

      {/* Scroll container */}
      <div ref={scrollRef} className="about-scroller absolute inset-0 z-10 pt-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 pb-24">

          {/* ════════════════════════ HERO ════════════════════════ */}
          <section className="py-18 sm:py-20">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">

              <div className="about-profile-wrapper shrink-0">
                <ProfileCard
                  name=""
                  title="Fullstack Developer"
                  handle="payawalkyle"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/kylepayawalprofile.webp"
                  showUserInfo={false}
                  enableTilt={true}
                  enableMobileTilt={true}
                  onContactClick={() => navigate('/contact')}
                  behindGlowColor="hsla(203,100%,70%,0.6)"
                  iconUrl="/assets/demo/iconpattern.png"
                  behindGlowEnabled
                  innerGradient="linear-gradient(145deg,hsla(203,40%,45%,0.55) 0%,hsla(252,60%,70%,0.27) 100%)"
                />
              </div>

              <div className="flex-1 min-w-0 text-left max-w-[620px]">
                <p className="sr text-[#172995] text-[10px] font-bold tracking-[0.3em] uppercase mb-3" data-delay="80">
                  {'< About Me >'}
                </p>
                <h1 className="sr text-[#FFFEEB] text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-3" data-delay="140">
                  Kyle Payawal
                </h1>
                <p className="sr text-[#172995] text-xs font-bold tracking-[0.22em] uppercase mb-6" data-delay="190">
                  Always Curious. Always Learning. Always Creating.
                </p>
                <div className="sr text-gray-400 text-sm sm:text-[15px] leading-relaxed max-w-[560px] space-y-3" data-delay="240">
                  <p>
                    I'm a fullstack web developer specializing in building production-ready applications across the entire stack —
                    from responsive frontends to scalable backend APIs and cloud deployments. I work primarily with the MERN and
                    MEVN stacks, using React, Vue.js, Node.js, Express, and MongoDB to deliver complete, maintainable systems.
                  </p>
                  <p>
                    My work spans e-commerce platforms, real-time ordering systems, nonprofit management platforms, and multi-user
                    web applications — all independently deployed and maintained on AWS EC2 and DigitalOcean. I take ownership of
                    the full development lifecycle: API design, database architecture, server configuration, and DevOps. I don't
                    just write features — I ship products.
                  </p>
                </div>
              </div>
            </div>

            <div className="sr flex flex-wrap items-center justify-between gap-y-4 mt-10" data-delay="320">
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soc w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center opacity-50"
                  >
                    <img src={s.src} alt={s.alt} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="btn-o px-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 text-[11px] font-bold tracking-[0.2em] uppercase bg-transparent cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  LET'S WORK TOGETHER
                  <ArrowRight />
                </span>
              </button>
            </div>
          </section>

          {/* ════════════════════════ STATS ════════════════════════ */}
          <section className="pb-16 cv-section">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="stat-card sr text-center py-5 sm:py-8 px-2 sm:px-4 rounded-2xl bg-white/[0.025] border border-gray-800"
                  data-delay={i * 80}
                >
                  <p className="text-[#172995] text-2xl sm:text-[2.5rem] font-black leading-none">{s.value}</p>
                  <p className="text-gray-500 text-[8px] sm:text-[10px] font-semibold tracking-[0.15em] sm:tracking-[0.22em] uppercase mt-2 sm:mt-3 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════ SKILLS ════════════════════════ */}
          <Rule />
          <section className="pb-20 cv-section">
            <SectionHead
              tag="< Skills >"
              title="What I Bring to the Table"
              sub="A blend of technical depth and creative breadth — built across years of hands-on work."
            />

            <div className="sr flex justify-center gap-2 mb-8" data-delay="80">
              {(Object.keys(SKILLS) as Array<keyof typeof SKILLS>).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTabClick(t)}
                  className={`px-5 py-2 rounded-lg text-[11px] font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-200
                    ${tab === t
                      ? 'bg-[#172995] text-[#FFFEEB] border border-[#172995]'
                      : 'bg-transparent text-gray-500 border border-gray-700 hover:border-[#172995]/50 hover:text-gray-300'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div key={`${tab}-${skillAnimKey}`} className="flex flex-wrap justify-center gap-3">
              {activeSkills.map((skill, i) => (
                <span
                  key={skill}
                  className="spill px-4 py-2 border border-gray-700 text-gray-400 rounded-full text-sm cursor-default"
                  style={{ animation: 'skillIn 420ms cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${i * 55}ms` }}
                  data-delay={i * 35}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* ════════════════════════ TOOLS ════════════════════════ */}
          <Rule />
          <section className="pb-20 cv-section">
            <SectionHead
              tag="< Tools >"
              title="Tools"
              sub="The hardware and software behind my daily workflow"
            />

            <div className="mb-10">
              <p className="sr text-gray-500 text-[10px] font-bold tracking-[0.25em] uppercase text-center mb-5" data-delay="0">
                Hardware
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {HARDWARE.map((item, i) => (
                  <div
                    key={item.name}
                    className="stile sr aspect-square rounded-2xl border border-gray-800 bg-white/[0.025] flex flex-col items-center justify-center gap-2 p-3 cursor-default"
                    data-delay={i * 50}
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
                    <p className="text-gray-500 text-[9px] font-bold tracking-wider uppercase text-center leading-tight">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="sr text-gray-500 text-[10px] font-bold tracking-[0.25em] uppercase text-center mb-5" data-delay="0">
                Software
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3">
                {SOFTWARE.map((item, i) => (
                  <div
                    key={item.name}
                    className="stile sr aspect-square rounded-2xl border border-gray-800 bg-white/[0.025] flex flex-col items-center justify-center gap-2 cursor-default"
                    data-delay={(HARDWARE.length * 50) + (i * 50)}
                  >
                    <item.icon className="text-[22px] text-[#FFFEEB]" aria-hidden="true" />
                    <p className="text-gray-500 text-[9px] font-bold tracking-wider uppercase text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════ BEYOND DEV ════════════════════════ */}
          <Rule />
          <section className="pb-20 cv-section">
            <SectionHead
              tag="< Beyond Dev >"
              title="Life Outside the Code"
              sub="Code isn't the only thing I create. I shoot, direct, and design — visual storytelling is the other half of what I do."
            />

            {/* ── 1. Studio CTA Banner ── */}
            <a
              href="https://kylepayawal.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="sr studio-banner group block mb-8 rounded-2xl overflow-hidden relative
                         border border-[#172995]/30 no-underline"
              data-delay="0"
            >
              {/* bg layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#060d2e] via-[#0d1a5e] to-[#060d2e]" />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(#172995 1px,transparent 1px),linear-gradient(90deg,#172995 1px,transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              {/* ambient glow blobs */}
              <div className="studio-glow-l absolute -left-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#172995] opacity-[0.18] blur-[70px]" />
              <div className="studio-glow-r absolute -right-8  top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-purple-700 opacity-[0.10] blur-[60px]" />

              {/* content */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-7 sm:px-10 py-8 sm:py-10">
                <div>
                  <p className="text-[#172995] text-[9px] font-bold tracking-[0.4em] uppercase mb-2">
                    Creative Studio
                  </p>
                  <p className="text-[#FFFEEB] text-2xl sm:text-3xl font-black tracking-tight">
                    kylepayawal<span className="text-[#172995]">.studio</span>
                  </p>
                  <p className="text-gray-400 text-[13px] mt-2 max-w-sm leading-relaxed">
                    My dedicated creative space — photography, videography &amp; visual design.
                    The other half of what I make.
                  </p>
                </div>
                <span className="studio-btn shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl
                                 bg-[#172995] text-[#FFFEEB] text-[11px] font-bold tracking-[0.2em] uppercase">
                  VISIT STUDIO
                  <ArrowRight className="studio-arrow" />
                </span>
              </div>
            </a>

            {/* ── 2. Creative Disciplines ── */}
            <div className="sr grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10" data-delay="60">
              {DISCIPLINES.map((d) => (
                <div
                  key={d.title}
                  className="discipline-card rounded-2xl border border-gray-800 bg-white/[0.025] px-4 py-5 flex flex-col gap-2"
                >
                  <p className="text-[#FFFEEB] text-sm font-bold">{d.title}</p>
                  <p className="text-gray-600 text-[9px] font-bold tracking-widest uppercase leading-tight">{d.tags}</p>
                </div>
              ))}
            </div>

            {/* ── 3. Featured Works ── */}
            <p
              className="sr text-gray-600 text-[10px] font-bold tracking-[0.28em] uppercase text-center mb-5"
              data-delay="120"
            >
              Featured Works
            </p>

            {/* Row A — hero photo (2/3 width on md+) + featured video (1/3) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">

              {/* Hero photo */}
              <div
                onClick={() => openImageModal('/photography.jpg', 'Event Coverage')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && openImageModal('/photography.jpg', 'Event Coverage')
                }
                aria-label="Open event photography"
                className="work-tile sr group relative col-span-2 md:col-span-2 h-48 rounded-xl overflow-hidden
                           border border-gray-800/60 cursor-pointer"
                data-delay="140"
              >
                <img
                  src="/photography.jpg"
                  alt="Event Coverage"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#172995]/0 group-hover:bg-[#172995]/[0.06] transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-[#172995] text-[9px] font-bold tracking-[0.3em] uppercase">Photography</p>
                  <p className="text-[#FFFEEB] text-sm font-bold mt-0.5">Event Coverage</p>
                </div>
              </div>

              {/* Featured video */}
              <div
                onClick={() =>
                  openVideoModal(
                    'https://www.youtube.com/embed/pIeBqjktLVU',
                    'SplitSmart Video Advertisement',
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  openVideoModal(
                    'https://www.youtube.com/embed/pIeBqjktLVU',
                    'SplitSmart Video Advertisement',
                  )
                }
                aria-label="Play SplitSmart video advertisement"
                className="work-tile sr group relative col-span-2 md:col-span-1 h-48 rounded-xl overflow-hidden
                           border border-gray-800/60 cursor-pointer"
                data-delay="160"
              >
                <img
                  src="/splitsmart-video.png"
                  alt="SplitSmart Advertisement"
                  className="w-full h-full object-fill"
                  style={{ objectFit: 'cover' }} 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <PlayBadge size="lg" />
                </div>
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-[#172995] text-[9px] font-bold tracking-[0.3em] uppercase">Video</p>
                  <p className="text-[#FFFEEB] text-xs font-bold mt-0.5">SplitSmart Ad</p>
                </div>
              </div>
            </div>

            {/* Row B — 4 equal tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BOTTOM_WORKS.map((item) => (
                <div
                  key={item.title}
                  onClick={() =>
                    item.type === 'video'
                      ? openVideoModal(item.url, item.videoTitle)
                      : openImageModal(item.src, item.alt)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter' && e.key !== ' ') return;
                    item.type === 'video'
                      ? openVideoModal(item.url, item.videoTitle)
                      : openImageModal(item.src, item.alt);
                  }}
                  aria-label={item.type === 'video' ? `Play ${item.title}` : `Open ${item.title}`}
                  className="work-tile sr group relative aspect-video rounded-xl overflow-hidden
                             border border-gray-800/60 cursor-pointer"
                  data-delay={item.delay}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayBadge size="sm" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[#172995] text-[9px] font-bold tracking-[0.3em] uppercase">{item.cat}</p>
                    <p className="text-[#FFFEEB] text-[11px] font-bold mt-0.5">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── 4. See-all CTA ── */}
            <div className="sr mt-6 flex justify-center" data-delay="380">
              <a
                href="https://kylepayawal.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-o inline-flex items-center gap-2 px-6 py-3 rounded-xl
                           border border-gray-700 text-gray-500
                           text-[11px] font-bold tracking-[0.2em] uppercase no-underline"
              >
                SEE ALL WORKS AT KYLEPAYAWAL.STUDIO
                <ArrowRight />
              </a>
            </div>
          </section>

          {/* ════════════════════════ CTA ════════════════════════ */}
          <Rule />
          <section className="pb-20 cv-section">
            <div className="sr gpulse relative rounded-2xl overflow-hidden border border-[#172995]/40" data-delay="0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#060d2e] via-[#0d1a5e] to-[#060d2e]" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(#172995 1px,transparent 1px),linear-gradient(90deg,#172995 1px,transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 55% 80% at 15% 50%,rgba(23,41,149,.45) 0%,transparent 70%)' }}
              />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-8 p-12 sm:p-14">
                <div>
                  <p className="text-[#172995] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Get In Touch</p>
                  <h3 className="text-[#FFFEEB] text-3xl font-black tracking-tight leading-tight mb-3">
                    Let's Build Something<br />Great Together.
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                    Open to freelance projects, full-time opportunities, and creative collaborations.
                  </p>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <button
                    onClick={() => navigate('/contact')}
                    className="btn-p px-8 py-4 rounded-xl bg-[#172995] text-[#FFFEEB] text-xs font-bold tracking-[0.2em] uppercase border-none cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      CONTACT ME
                      <ArrowRight />
                    </span>
                  </button>
                  <a
                    href="/payawal-kyle-resume.pdf"
                    download="payawal-kyle-resume.pdf"
                    className="btn-o block text-center px-8 py-4 rounded-xl border border-gray-600 text-gray-400 text-xs font-bold tracking-[0.2em] uppercase no-underline"
                  >
                    DOWNLOAD RESUME
                  </a>
                </div>
              </div>
            </div>
          </section>

          <PortfolioFooter className="sr" dataDelay={0} linkClassName="soc opacity-35" showContactInfo={true} />

        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <Suspense fallback={null}>
          <VideoModal
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
            isOpen={isVideoModalOpen}
            onClose={closeVideoModal}
          />
        </Suspense>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="lb-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10"
          onClick={closeImageModal}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="lb-img relative flex items-center justify-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            />
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#0f0f0f] border border-gray-700
                         flex items-center justify-center text-gray-400
                         hover:text-[#FFFEEB] hover:border-[#172995] transition-all duration-200
                         cursor-pointer shadow-lg text-lg leading-none"
              aria-label="Close preview"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;