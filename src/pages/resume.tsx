import { useEffect, useState } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import PortfolioFooter from '../components/PortfolioFooter';

const ANIM_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes bannerReveal {
    from { opacity: 0; transform: translateY(-20px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(23,41,149,0.25); }
    50%       { box-shadow: 0 0 45px rgba(23,41,149,0.55), 0 0 80px rgba(23,41,149,0.15); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  @keyframes dotPop {
    from { opacity: 0; transform: scale(0); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmerText {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .r-banner     { animation: bannerReveal 0.8s cubic-bezier(0.22,1,0.36,1) both; }
  .r-fade-up    { animation: fadeUp       0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .r-fade-in    { animation: fadeIn       0.6s  ease both; }
  .r-slide-l    { animation: slideInLeft  0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .r-slide-r    { animation: slideInRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .r-line       { animation: lineGrow     0.8s  cubic-bezier(0.22,1,0.36,1) both; }
  .r-dot        { animation: dotPop       0.4s  cubic-bezier(0.34,1.56,0.64,1) both; }
  .r-glow       { animation: glowPulse 3s ease-in-out infinite; }

  .r-shimmer-text {
    background: linear-gradient(90deg, #FFFEEB 0%, #fff 38%, #7b9fff 50%, #fff 62%, #FFFEEB 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 5s linear infinite;
    animation-delay: 1s;
  }

  .r-card {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .r-card:hover {
    border-color: rgba(23,41,149,0.35);
    box-shadow: 0 4px 30px rgba(23,41,149,0.08);
  }

  .r-entry {
    transition: background 0.2s ease;
    border-radius: 10px;
  }
  .r-entry:hover {
    background: rgba(23,41,149,0.04);
  }

  .r-cert-row {
    transition: background 0.2s ease, padding-left 0.2s ease;
  }
  .r-cert-row:hover {
    background: rgba(23,41,149,0.05);
    padding-left: 6px;
  }

  .r-dl-btn {
    position: relative;
    overflow: hidden;
    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  }
  .r-dl-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,254,235,0.14) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.55s ease;
  }
  .r-dl-btn:hover::after { transform: translateX(100%); }
  .r-dl-btn:hover {
    background: #1f37b3;
    box-shadow: 0 0 32px rgba(23,41,149,0.5);
    transform: translateY(-2px);
  }

  .r-scroll {
    scroll-behavior: smooth;
    overscroll-behavior: none;
  }
  .r-scroll::-webkit-scrollbar       { width: 4px; }
  .r-scroll::-webkit-scrollbar-track { background: transparent; }
  .r-scroll::-webkit-scrollbar-thumb { background: rgba(23,41,149,0.35); border-radius: 2px; }

  .r-stat-card {
    background: rgba(23,41,149,0.18);
    border: 1px solid rgba(23,41,149,0.45);
    box-shadow: 0 4px 24px rgba(23,41,149,0.15), inset 0 1px 0 rgba(255,254,235,0.06);
    backdrop-filter: blur(8px);
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }
  .r-stat-card:hover {
    background: rgba(23,41,149,0.28);
    border-color: rgba(23,41,149,0.7);
    box-shadow: 0 8px 32px rgba(23,41,149,0.3), inset 0 1px 0 rgba(255,254,235,0.08);
    transform: translateY(-2px);
  }

  /* Print Styles */
  @media print {
    @page {
      size: A4;
      margin: 0.5in;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
    
    /* Hide elements that shouldn't print */
    .no-print,
    .r-dl-btn,
    nav,
    footer {
      display: none !important;
    }
    
    /* Remove animations for print */
    * {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    
    /* Adjust colors for print */
    .bg-\\[\\#0a0a0a\\],
    .bg-gradient-to-br {
      background: white !important;
    }
    
    .text-\\[\\#FFFEEB\\] {
      color: #000 !important;
    }
    
    .text-gray-400,
    .text-gray-500,
    .text-gray-600 {
      color: #333 !important;
    }
    
    .border-gray-800 {
      border-color: #ddd !important;
    }
    
    /* Ensure content fits on page */
    .r-scroll {
      overflow: visible !important;
      height: auto !important;
    }
    
    /* Better spacing for print */
    .mb-6 { margin-bottom: 1rem !important; }
    .gap-6 { gap: 1rem !important; }
  }
`;

const education = [
  {
    period: '2023 – Present',
    title: 'Bachelor of Science in Information Technology',
    subtitle: 'Specialization in Web Development',
    institution: 'Holy Angel University',
    location: 'Angeles City, Philippines',
  },
  {
    period: '2021 – 2023',
    title: 'Senior High School',
    subtitle: 'Science, Technology, Engineering, and Mathematics',
    institution: 'Holy Angel University',
    location: 'Angeles City, Philippines',
  },
];

const experience = [
  {
    period: '2025 – Present',
    title: 'Marketing Officer',
    org: 'Code Geeks',
  },
  {
    period: '2021 – Present',
    title: 'Freelance Photographer, Videographer, & Editor',
    org: 'Self-Employed',
  },
  {
    period: '2024 – 2025',
    title: 'External Communications Councilor',
    org: 'College Student Council - School of Computing',
  },
];

const certifications = [
  { name: 'Content Marketing',                             issuer: 'Hubspot'        },
  { name: 'Digital Marketing',                             issuer: 'Hubspot'        },
  { name: 'SEO',                                           issuer: 'Hubspot'        },
  { name: 'Design Thinking',                               issuer: 'Simplilearn'    },
  { name: 'Introduction to Graphic Design',                issuer: 'Simplilearn'    },
  { name: 'Website UI/UX',                                 issuer: 'Simplilearn'    },
  { name: 'Backend, APIs',                                 issuer: 'FreeCodeCamp'   },
  { name: 'Responsive Design',                             issuer: 'FreeCodeCamp'   },
  { name: 'JavaScript Algorithms',                         issuer: 'FreeCodeCamp'   },
];

const awards = [
  { period: '2024', title: "Dean's Lister",      institution: 'Holy Angel University' },
  { period: '2025', title: "President's Lister", institution: 'Holy Angel University' },
];

const stats = [
  { value: '5',  label: 'Years Creative' },
  { value: '9',  label: 'Certifications' },
  { value: '2',  label: 'Honors'         },
  { value: '3',  label: 'Roles Held'     },
];

const dl = (ms) => ({ animationDelay: `${ms}ms` });

const SectionLabel = ({ children, mounted, delay }) => (
  <div
    className={`flex items-center gap-3 mb-5 ${mounted ? 'r-slide-l' : 'opacity-0'}`}
    style={dl(delay)}
  >
    <div className="w-1 h-4 rounded-full bg-[#172995]" />
    <h2 className="text-gray-300 text-xs font-bold tracking-[0.25em] uppercase">{children}</h2>
    <div
      className={`flex-1 h-px bg-gradient-to-r from-[#172995]/50 to-transparent ${mounted ? 'r-line' : 'opacity-0'}`}
      style={dl(delay + 120)}
    />
  </div>
);

const Badge = ({ text }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#172995]/15 border border-[#172995]/25 text-[#7b9fff] text-[10px] font-semibold tracking-widest uppercase">
    {text}
  </span>
);

const TimelineItem = ({ period, title, subtitle, meta, isLast, mounted, delay }) => (
  <div className={`flex gap-0 ${mounted ? 'r-fade-up' : 'opacity-0'}`} style={dl(delay)}>
    <div className="flex flex-col items-center mr-5 pt-1" style={{ width: '16px', minWidth: '16px' }}>
      <div
        className={`w-2.5 h-2.5 rounded-full border-2 border-[#172995] bg-[#172995]/30 shrink-0 ${mounted ? 'r-dot' : 'opacity-0'}`}
        style={dl(delay + 80)}
      />
      {!isLast && (
        <div
          className="mt-2 flex-1"
          style={{
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(23,41,149,0.6), rgba(23,41,149,0.08))',
            borderRadius: '1px',
            minHeight: '32px',
          }}
        />
      )}
    </div>
    <div className={`r-entry flex-1 pb-7 px-3 pt-0.5 text-left ${isLast ? 'pb-0' : ''}`}>
      <Badge text={period} />
      <p className="text-[#FFFEEB] font-semibold text-sm mt-2 leading-snug text-left">{title}</p>
      {subtitle && <p className="text-gray-400 text-xs mt-1 leading-relaxed text-left">{subtitle}</p>}
      {meta    && <p className="text-gray-600 text-xs mt-0.5 text-left">{meta}</p>}
    </div>
  </div>
);

const Resume = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!document.getElementById('resume-anim')) {
      const s = document.createElement('style');
      s.id = 'resume-anim';
      s.textContent = ANIM_STYLES;
      document.head.appendChild(s);
    }
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
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
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>

      <div className="no-print absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#0a0a0a]" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#172995] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />
      </div>

      <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }}>
        <StaggeredMenu
          position="right" items={menuItems} socialItems={socialItems}
          displaySocials displayItemNumbering
          menuButtonColor="#FFFEEB" openMenuButtonColor="#000000"
          changeMenuColorOnOpen colors={['#FFFEEB', '#172995']}
          logoUrl="/logo.svg" accentColor="#172995"
          onMenuOpen={() => {}} onMenuClose={() => {}} isFixed
        />
      </div>

      <div className="r-scroll absolute inset-0 z-10 overflow-y-auto pt-20 pb-24 px-6 sm:px-10 md:px-16 lg:px-24">

        <div
          className={`relative rounded-2xl overflow-hidden mb-10 ${mounted ? 'r-banner' : 'opacity-0'}`}
          style={{ ...dl(40), minHeight: '200px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#060d2e] via-[#0d1a5e] to-[#060d2e]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(#172995 1px,transparent 1px),linear-gradient(90deg,#172995 1px,transparent 1px)', backgroundSize: '44px 44px' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 90% at 15% 50%, rgba(23,41,149,0.38) 0%, transparent 70%)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-2/5 opacity-[0.15]"
            style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(23,41,149,1) 100%)' }}
          />
          <div className="r-glow absolute inset-0 rounded-2xl pointer-events-none" style={{ border: '1px solid rgba(23,41,149,0.5)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-8 p-8 md:p-12">
            <div className="flex-1 text-left">
              <p
                className={`text-[#7b9fff] text-[10px] font-bold tracking-[0.35em] uppercase mb-3 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
                style={dl(180)}
              >
                Curriculum Vitae
              </p>
              <h1
                className={`r-shimmer-text text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-4 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
                style={dl(240)}
              >
                GET TO KNOW<br />MY BACKGROUND
              </h1>
              <p
                className={`text-gray-500 text-sm max-w-md leading-relaxed mb-6 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
                style={dl(320)}
              >
                Frontend Developer · Student · Creator based in Concepcion, Tarlac.<br />
                Always Curious. Always Learning. Always Creating.
              </p>
              <div className={`flex flex-wrap gap-2 ${mounted ? 'r-fade-up' : 'opacity-0'}`} style={dl(400)}>
                {[
                  { icon: '📞', label: '0976-118-7923'         },
                  { icon: '✉',  label: 'payawalkyle@gmail.com' },
                  { icon: '📍', label: 'Concepcion, Tarlac'    },
                ].map((c) => (
                  <span
                    key={c.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-400 text-xs hover:border-[#172995]/40 transition-colors"
                  >
                    <span className="text-[11px]">{c.icon}</span>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 shrink-0 ${mounted ? 'r-slide-r' : 'opacity-0'}`} style={dl(280)}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`r-stat-card text-center px-5 py-4 rounded-xl cursor-default ${mounted ? 'r-fade-up' : 'opacity-0'}`}
                  style={dl(340 + i * 55)}
                >
                  <p className="text-[#FFFEEB] text-2xl font-black leading-none">{s.value}</p>
                  <p className="text-[#7b9fff] text-[10px] tracking-widest uppercase mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <SectionLabel mounted={mounted} delay={480}>Education</SectionLabel>
            <div
              className={`r-card bg-white/[0.025] border border-gray-800/80 rounded-2xl px-6 pt-6 pb-2 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
              style={dl(540)}
            >
              {education.map((item, i) => (
                <TimelineItem
                  key={i}
                  period={item.period}
                  title={item.title}
                  subtitle={item.subtitle}
                  meta={`${item.institution} · ${item.location}`}
                  isLast={i === education.length - 1}
                  mounted={mounted}
                  delay={600 + i * 110}
                />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel mounted={mounted} delay={500}>Experience</SectionLabel>
            <div
              className={`r-card bg-white/[0.025] border border-gray-800/80 rounded-2xl px-6 pt-6 pb-2 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
              style={dl(560)}
            >
              {experience.map((item, i) => (
                <TimelineItem
                  key={i}
                  period={item.period}
                  title={item.title}
                  subtitle={item.org}
                  isLast={i === experience.length - 1}
                  mounted={mounted}
                  delay={620 + i * 100}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div>
            <SectionLabel mounted={mounted} delay={700}>Certifications</SectionLabel>
            <div
              className={`r-card bg-white/[0.025] border border-gray-800/80 rounded-2xl overflow-hidden ${mounted ? 'r-fade-up' : 'opacity-0'}`}
              style={dl(760)}
            >
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className={`r-cert-row flex items-center gap-4 px-6 py-4 border-b border-gray-800/50 last:border-b-0 ${mounted ? 'r-slide-l' : 'opacity-0'}`}
                  style={dl(800 + i * 50)}
                >
                  <div
                    className="shrink-0 self-stretch"
                    style={{
                      width: '2px',
                      background: 'linear-gradient(to bottom, #172995, rgba(23,41,149,0.15))',
                      borderRadius: '1px',
                    }}
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-[#FFFEEB] text-sm font-medium leading-snug">{cert.name}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel mounted={mounted} delay={720}>Awards</SectionLabel>
            <div
              className={`r-card bg-white/[0.025] border border-gray-800/80 rounded-2xl px-6 pt-6 pb-2 ${mounted ? 'r-fade-up' : 'opacity-0'}`}
              style={dl(780)}
            >
              {awards.map((award, i) => (
                <TimelineItem
                  key={i}
                  period={award.period}
                  title={award.title}
                  subtitle={award.institution}
                  isLast={i === awards.length - 1}
                  mounted={mounted}
                  delay={840 + i * 110}
                />
              ))}
              <div
                className={`flex items-center gap-3 mt-2 mb-5 p-4 rounded-xl bg-[#172995]/06 border border-[#172995]/15 ${mounted ? 'r-fade-in' : 'opacity-0'}`}
                style={dl(1080)}
              >
                <div className="w-9 h-9 rounded-lg bg-[#172995]/12 border border-[#172995]/20 flex items-center justify-center shrink-0">
                  <span className="text-base">🏆</span>
                </div>
                <div>
                  <p className="text-gray-300 text-xs font-semibold">Academic Excellence</p>
                  <p className="text-gray-600 text-xs mt-0.5">Holy Angel University · 2023–2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex justify-center mb-10 no-print ${mounted ? 'r-fade-up' : 'opacity-0'}`} style={dl(1180)}>
          <a
            href="/payawal-kyle-resume.pdf"
            download="payawal-kyle-resume.pdf"
            className="r-dl-btn flex items-center gap-3 px-10 py-4 bg-[#172995] text-[#FFFEEB] rounded-xl text-sm font-bold tracking-[0.2em] uppercase cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
            </svg>
            Download Resume
          </a>
        </div>

        <PortfolioFooter
          className={`no-print ${mounted ? 'r-fade-in' : 'opacity-0'}`}
          textClassName="text-xs text-gray-700"
          contactClassName="text-xs text-gray-700"
          linkClassName="opacity-40 hover:opacity-75 transition-opacity"
          style={dl(1260)}
          showContactInfo={true}
        />

      </div>
    </div>
  );
};

export default Resume;