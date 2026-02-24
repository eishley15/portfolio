import { useEffect, useState, useRef } from 'react';
import ProfileCard from '@/components/ProfileCard';
import StaggeredMenu from '../components/StaggeredMenu';
import PortfolioFooter from '../components/PortfolioFooter';
import { useNavigate } from 'react-router-dom';
import {
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiDavinciresolve
} from 'react-icons/si';

/* ─── Injected CSS (only what Tailwind can't do) ─── */
const STYLES = `
  html, body { overflow: hidden; overscroll-behavior: none; height: 100%; }

  .about-scroller {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
  }
  .about-scroller::-webkit-scrollbar       { width: 3px; }
  .about-scroller::-webkit-scrollbar-track { background: transparent; }
  .about-scroller::-webkit-scrollbar-thumb { background: rgba(23,41,149,0.45); border-radius: 2px; }

  /* Scroll-reveal */
  .sr {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .sr.visible { opacity: 1 !important; transform: none !important; }

  /* Blob morph */
  @keyframes blob {
    0%,100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
    50%      { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
  }
  .blob { animation: blob 9s ease-in-out infinite; }

  /* Stat card */
  .stat-card { transition: border-color .25s ease, transform .25s ease; }
  .stat-card:hover { border-color: rgba(23,41,149,.55); transform: translateY(-4px); }

  /* Skill pill */
  .spill { transition: border-color .2s, color .2s, background .2s, transform .2s; }
  .spill:hover { border-color: #172995; color: #7b9fff; background: rgba(23,41,149,.08); transform: translateY(-2px); }
  @keyframes skillIn {
    0% { opacity: 0; transform: translateY(12px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Stack tile */
  .stile { transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .25s, box-shadow .25s; }
  .stile:hover { transform: translateY(-8px) scale(1.06); border-color: rgba(23,41,149,.55); box-shadow: 0 14px 30px rgba(23,41,149,.22); }

  /* Gallery tile */
  .gtile { transition: transform .3s ease, box-shadow .3s ease; }
  .gtile:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(23,41,149,.22); }

  /* Social icon */
  .soc { transition: border-color .2s, opacity .2s; }
  .soc:hover { border-color: #172995 !important; opacity: 1 !important; }

  /* Primary button */
  .btn-p { position: relative; overflow: hidden; transition: background .3s, box-shadow .3s, transform .2s; }
  .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,254,235,.15) 50%,transparent 60%); transform:translateX(-100%); transition:transform .55s ease; }
  .btn-p:hover::after { transform: translateX(100%); }
  .btn-p:hover { background: #1f37b3; box-shadow: 0 0 32px rgba(23,41,149,.5); transform: translateY(-2px); }

  /* Outline button */
  .btn-o { transition: border-color .2s, color .2s, transform .2s; }
  .btn-o:hover { border-color: #172995 !important; color: #7b9fff !important; transform: translateY(-2px); }

  /* Divider grow */
  @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .divline { transform-origin: center; animation: lineGrow 1s cubic-bezier(.22,1,.36,1) both; }

  /* CTA glow */
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 18px rgba(23,41,149,.2);} 50%{box-shadow:0 0 44px rgba(23,41,149,.5);} }
  .gpulse { animation: glowPulse 3.5s ease-in-out infinite; }
`;

/* ─── Data ─── */
const STATS = [
  { value: '4+',  label: 'Years Experience'   },
  { value: '15+', label: 'Projects Delivered'  },
  { value: '7',   label: 'Certificates'        },
];

const SKILLS = {
  Technical: ['HTML5','CSS3','JavaScript','React','Vue.js','Node.js','Express','Tailwind CSS','Git','REST APIs'],
  Creative:  ['Web Design','UI/UX Design','Video Editing','Photo Editing','Advertisements','Product Photography'],
  Tools:     ['Figma','DaVinci Resolve','Adobe Photoshop','Adobe Lightroom','Adobe Premiere Pro'],
};

const STACKS = [
  { name: 'React', icon: SiReact },
  { name: 'Vue', icon: SiVuedotjs },
  { name: 'Node', icon: SiNodedotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Figma', icon: SiFigma },
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'Premiere', icon: SiAdobepremierepro },
  { name: 'DaVinci', icon: SiDavinciresolve },
];

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/kyle-payawal-612400377/', src: '/linkedin-alt.svg', alt: 'LinkedIn'  },
  { href: 'https://github.com/eishley15',                         src: '/github-alt.svg',   alt: 'GitHub'    },
  { href: 'https://www.instagram.com/payawalkyle/',               src: '/instagram.svg',    alt: 'Instagram' },
];

/* ─── Scroll Reveal ─── */
function useScrollReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.sr');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), Number((e.target as HTMLElement).dataset.delay || 0));
          obs.unobserve(e.target);
        }
      }),
      { root: el, threshold: 0.08 }
    );
    items.forEach((i: Element) => obs.observe(i));
    return () => obs.disconnect();
  }, []);
}

/* ─── Section Heading — centered ─── */
const SectionHead = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="text-center mb-12">
    <p className="sr text-[#172995] text-[10px] font-bold tracking-[0.3em] uppercase" data-delay="0">{tag}</p>
    <h2 className="sr text-[#FFFEEB] text-3xl sm:text-4xl font-black tracking-tight leading-tight mt-2" data-delay="60">{title}</h2>
    {sub && <p className="sr text-gray-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed" data-delay="100">{sub}</p>}
    <div className="divline sr mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#172995] to-transparent" data-delay="140" />
  </div>
);

/* ─── Horizontal Rule ─── */
const Rule = () => (
  <div className="divline sr my-16 h-px bg-gradient-to-r from-transparent via-[#172995]/30 to-transparent" data-delay="0" />
);

/* ─── Main ─── */
const About = () => {
  const navigate  = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<keyof typeof SKILLS>('Technical');
  const [skillAnimKey, setSkillAnimKey] = useState(0);
  const activeSkills = SKILLS[tab] ?? [];

  const handleTabClick = (nextTab: keyof typeof SKILLS) => {
    setTab(nextTab);
    setSkillAnimKey((prev) => prev + 1);
  };

  useScrollReveal(scrollRef);

  useEffect(() => {
    if (!document.getElementById('about-styles')) {
      const s = document.createElement('style');
      s.id = 'about-styles';
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  const menuItems = [
    { label: 'Home',     ariaLabel: 'Go to home page',   link: '/'         },
    { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
    { label: 'About',    ariaLabel: 'Learn about us',    link: '/about'    },
    { label: 'Contact',  ariaLabel: 'Get in touch',      link: '/contact'  },
    { label: 'Resume',   ariaLabel: 'View our resume',   link: '/resume'   },
  ];
  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'GitHub',    link: 'https://github.com'    },
    { label: 'LinkedIn',  link: 'https://linkedin.com'  },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#0a0a0a]" />
        <div className="blob absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#172995] opacity-[0.12] blur-[80px]" />
        <div className="blob absolute -top-10 -right-20 w-[400px] h-[400px] bg-purple-700 opacity-[0.10] blur-[80px]" style={{ animationDelay: '3s' }} />
        <div className="blob absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-blue-700 opacity-[0.10] blur-[80px]" style={{ animationDelay: '6s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* ── Nav ── */}
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

      {/* ── Scroll container ── */}
      <div ref={scrollRef} className="about-scroller absolute inset-0 z-10 pt-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 pb-24">
          <section className="py-18 sm:py-20">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

              <div className="shrink-0 w-full max-w-[420px] lg:max-w-[460px] mx-auto lg:mx-0">
                <ProfileCard
                  name=""
                  title="Frontend Developer"
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
                I’m a 3rd-year Web Development student at Holy Angel University with experience in building responsive and high-performance web applications. I specialize in HTML, CSS, and JavaScript, and work with modern frameworks like React, Vue, and Angular, using stacks such as MERN and MEVN. My recent projects include an e-commerce website with real-time WebSocket notifications and a donation platform for a non-profit organization.
                </p>
                <p>
                Curiosity drives everything I do — it’s what pushes me to explore new technologies, solve problems creatively, and build solutions that make an impact. Whether it’s deploying apps on AWS and DigitalOcean or experimenting with my own home NAS setup, I’m always eager to learn and improve. For me, web development is more than just coding — it’s a continuous journey of learning, discovery, and creation.
                </p>
                </div>
              </div>
            </div>

            {/* Socials + CTA - Aligned horizontally */}
            <div className="sr flex flex-wrap items-center justify-between gap-y-4 mt-10" data-delay="320">
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="soc w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center opacity-50">
                    <img src={s.src} alt={s.alt} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="btn-o px-5 py-2.5 rounded-lg border border-gray-600 text-gray-400 text-[11px] font-bold tracking-[0.2em] uppercase bg-transparent cursor-pointer"
              >
                LET'S WORK TOGETHER →
              </button>
            </div>
          </section>
          <section className="pb-16">
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <div key={s.label}
                  className="stat-card sr text-center py-8 px-4 rounded-2xl bg-white/[0.025] border border-gray-800"
                  data-delay={i * 80}>
                  <p className="text-[#172995] text-[2.5rem] font-black leading-none">{s.value}</p>
                  <p className="text-gray-500 text-[10px] font-semibold tracking-[0.22em] uppercase mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          <Rule />
          <section className="pb-20">
            <SectionHead
              tag="< Skills >"
              title="What I Bring to the Table"
              sub="A blend of technical depth and creative breadth — built across years of hands-on work."
            />

            {/* Tabs — centered */}
            <div className="sr flex justify-center gap-2 mb-8" data-delay="80">
              {(Object.keys(SKILLS) as Array<keyof typeof SKILLS>).map((t) => (
                <button key={t} onClick={() => handleTabClick(t)}
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

            {/* Pills — centered */}
            <div key={`${tab}-${skillAnimKey}`} className="flex flex-wrap justify-center gap-3">
              {activeSkills.map((skill, i) => (
                <span key={skill}
                  className="spill px-4 py-2 border border-gray-700 text-gray-400 rounded-full text-sm cursor-default"
                  style={{ animation: 'skillIn 420ms cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${i * 55}ms` }}
                  data-delay={i * 35}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <Rule />
          <section className="pb-20">
            <SectionHead
              tag="< Stack >"
              title="Tools & Technologies"
              sub="The technologies I reach for every day to design, build, and ship."
            />
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {STACKS.map((s, i) => (
                <div key={s.name}
                  className="stile sr aspect-square rounded-2xl border border-gray-800 bg-white/[0.025] flex flex-col items-center justify-center gap-2 cursor-default"
                  data-delay={i * 50}>
                  <s.icon className="text-[22px] text-[#FFFEEB]" aria-hidden="true" />
                  <p className="text-gray-500 text-[9px] font-bold tracking-wider uppercase text-center">{s.name}</p>
                </div>
              ))}
            </div>
          </section>

          <Rule />
          <section className="pb-20">
            <SectionHead
              tag="< Beyond Dev >"
              title="Life Outside the Editor"
              sub="Photography, videography, sports, and adventures — the creative fuel behind every line of code."
            />

            <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: '210px 210px' }}>

              {/* Big left tile — row-span-2 */}
              <div className="gtile sr row-span-2 rounded-2xl border border-gray-800/60 relative flex flex-col items-center justify-end pb-6 overflow-hidden"
                data-delay="0">
                <img src="/photography.webp" alt="Photography" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <p className="text-[#FFFEEB] text-sm font-bold tracking-[0.15em] uppercase relative z-10">Photography</p>
                <p className="text-gray-400 text-xs relative z-10">Freelance · Events · Products</p>
              </div>

              {/* Top right */}
              <div className="gtile sr rounded-2xl border border-gray-800/60 relative flex flex-col items-center justify-end pb-4 overflow-hidden"
                data-delay="80">
                <img src="/thumbnail.webp" alt="Video Editing" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <p className="text-[#FFFEEB] text-xs font-bold tracking-[0.15em] uppercase relative z-10">Video Editing</p>
              </div>

              {/* Bottom-right 2×1 sub-grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Design', image: '/design.webp' },
                  { label: 'Reading', image: '/reading.webp' },
                ].map((t, i) => (
                  <div key={t.label}
                    className="gtile sr rounded-2xl border border-gray-800/60 relative flex flex-col items-center justify-end pb-3 overflow-hidden"
                    data-delay={160 + i * 80}>
                    <img src={t.image} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <p className="text-[#FFFEEB] text-[11px] font-bold tracking-[0.15em] uppercase relative z-10">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Rule />
          <section className="pb-20">
            <div className="sr gpulse relative rounded-2xl overflow-hidden border border-[#172995]/40" data-delay="0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#060d2e] via-[#0d1a5e] to-[#060d2e]" />
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'linear-gradient(#172995 1px,transparent 1px),linear-gradient(90deg,#172995 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 55% 80% at 15% 50%,rgba(23,41,149,.45) 0%,transparent 70%)' }} />

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
                    CONTACT ME →
                  </button>
                  <a href="/payawal-kyle-resume.pdf" download="payawal-kyle-resume.pdf"
                    className="btn-o block text-center px-8 py-4 rounded-xl border border-gray-600 text-gray-400 text-xs font-bold tracking-[0.2em] uppercase no-underline">
                    DOWNLOAD RESUME
                  </a>
                </div>
              </div>
            </div>
          </section>

          <PortfolioFooter className="sr" dataDelay={0} linkClassName="soc opacity-35" showContactInfo={true} />

        </div>
      </div>
    </div>
  );
};

export default About;