import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardSwap, { Card } from '../components/CardSwap';
import FlowingMenu from '../components/FlowingMenu';
import StaggeredMenu from '../components/StaggeredMenu';
import PortfolioFooter from '../components/PortfolioFooter';
import { projects, getProjectMenuItems } from '@/data/projects';
import { menuItems, socialItems } from '@/data/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

const ProjectModal = lazy(() => import('../components/ProjectModal'));

const STYLES = `
  /* Scroll-reveal */
  .sr {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .sr.visible { opacity: 1 !important; transform: none !important; }

  /* Fade animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .p-fade-up { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .p-fade-in { animation: fadeIn 0.6s ease both; }

  /* Divider grow */
  @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .divline { transform-origin: center; animation: lineGrow 1s cubic-bezier(.22,1,.36,1) both; }

  /* Mobile: reduce animation complexity */
  @media (max-width: 768px) {
    .p-fade-up { animation-duration: 0.3s; }
    .p-fade-in { animation-duration: 0.3s; }
    .sr { transition-duration: 0.3s; }
  }

  @media (prefers-reduced-motion: reduce) {
    .p-fade-up, .p-fade-in, .sr, .divline {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function useScrollReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.sr');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target as HTMLElement;
          setTimeout(() => target.classList.add('visible'), Number(target.dataset.delay || 0));
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    items.forEach((i: Element) => obs.observe(i));
    return () => obs.disconnect();
  }, []);
}

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const [lastTapped, setLastTapped] = useState<number | null>(null);
  const [firstTap, setFirstTap] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  usePageMeta({
    title: 'Projects — Kyle Payawal | Fullstack Developer',
    description: 'Browse fullstack web development projects by Kyle Payawal — e-commerce platforms, nonprofit systems, restaurant ordering apps, and more.',
    canonical: '/projects',
  });
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const projectParam = searchParams.get('project');
    if (projectParam) {
      const project = projects.find(p => p.link.includes(projectParam));
      if (project) {
        setSelectedProject(project);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);
  
  const openProjectModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    const projectSlug = project.link.split('/').pop();
    setSearchParams({ project: projectSlug || '' });
  };
  
  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setSearchParams({});
  };

  useEffect(() => {
    if (!document.getElementById('projects-styles')) {
      const s = document.createElement('style');
      s.id = 'projects-styles';
      s.textContent = STYLES;
      document.head.appendChild(s);
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const t = setTimeout(() => setMounted(true), 40);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  useScrollReveal(containerRef);

  const handleCardTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < -50) {
      setActiveProject((p) => (p + 1) % projects.length);
    } else if (dx > 50) {
      setActiveProject((p) => (p - 1 + projects.length) % projects.length);
    }
  };

  const getCardDimensions = () => {
    const { width: w, height: h } = windowSize;

    if (w < 640) {
      const mobileW = Math.min(300, Math.floor(w * 0.88));
      const mobileH = Math.min(300, Math.floor(h * 0.55));
      return { width: mobileW, height: mobileH };
    }

    if (h < 500) {
      if (w < 1024) return { width: 280, height: 200 };
      return { width: 400, height: 240 };
    }

    if (h < 600) {
      if (w < 1024) return { width: 300, height: 230 };
      return { width: 460, height: 300 };
    }

    if (h < 700) {
      if (w < 1024) return { width: 340, height: 270 };
      return { width: 520, height: 360 };
    }

    if (h < 850) {
      if (w < 1024) return { width: 380, height: 320 };
      return { width: 620, height: 460 };
    }

    if (w < 1024) return { width: 420, height: 360 };
    return { width: 800, height: 600 };
  };

  const cardDims = getCardDimensions();

  const getMenuHeight = () => {
    const { width: w, height: h } = windowSize;
    if (w < 640) return 'h-[260px]';
    if (h < 500) return 'h-[200px]';
    if (h < 600) return 'h-[240px]';
    if (h < 700) return 'h-[300px]';
    if (h < 850) return 'h-[420px]';
    if (w < 1024) return 'h-[500px]';
    return 'h-[600px]';
  };

  const getCardTransform = () => {
    const { width: w, height: h } = windowSize;
    if (w < 640) return 'translate-x-0 translate-y-0';
    if (w < 1024) return 'translate-x-[2%] translate-y-[0%]';
    // Short screens: no upward lift, card stays flush to bottom-right
    if (h < 600) return 'translate-x-[2%] translate-y-[0%]';
    if (h < 700) return 'translate-x-[3%] translate-y-[0%]';
    if (h < 850) return 'translate-x-[4%] translate-y-[-8%]';
    return 'translate-x-[5%] translate-y-[-15%]';
  };

  const getCardPosition = () => {
    const { width: w } = windowSize;

    if (w < 640) {
      return {
        position: 'absolute' as const,
        top: 'calc(50vh + 162px)',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 'auto'
      };
    }

    return {
      position: 'absolute' as const,
      bottom: 0,
      right: 0,
      top: 'auto',
      left: 'auto'
    };
  };

  const getTitleSize = () => {
    const { width: w, height: h } = windowSize;
    if (w < 640) return 'text-xl';
    if (h < 500) return 'text-lg';
    if (h < 600) return 'text-xl';
    if (h < 700) return 'text-2xl';
    if (w < 1024) return 'text-3xl';
    return 'text-4xl';
  };

  const getTitleTop = () => {
    const { width: w, height: h } = windowSize;
    if (w < 640) return '56px';
    if (w < 1024) return '68px';
    if (h < 500) return '52px';
    if (h < 600) return '56px';
    if (h < 700) return '64px';
    if (h < 850) return 'calc(50vh - 320px)';
    return 'calc(50vh - 420px)';
  };

  const showSubtitle = windowSize.height >= 560;

  const isMobile = windowSize.width < 640;

  const dl = (ms: number) => ({ animationDelay: `${ms}ms` });
  const cls = (base: string) => `${base} ${mounted ? '' : 'opacity-0'}`;

  const projectMenuItems = getProjectMenuItems();

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh', height: '100vh', position: 'absolute', top: 0, left: 0, overflowX: 'hidden', overflowY: isMobile ? 'auto' : 'hidden', overscrollBehavior: 'none' }}>

      <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#0a0a0a]"></div>

        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#172995] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulance type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#FFFEEB"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#FFFEEB', '#172995']}
          logoUrl="/logo.svg"
          accentColor="#172995"
          onMenuOpen={() => {}}
          onMenuClose={() => {}}
          isFixed={true}
        />
      </div>

      {/* ── MOBILE LAYOUT: stacked column, zero overlap ─────────────────── */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            paddingTop: '72px',
            paddingBottom: '0px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Title */}
          <div style={{ padding: '12px 16px', textAlign: 'center', width: '100%' }}>
            <p className={cls('p-fade-up text-[#172995] text-[9px] font-bold tracking-[0.25em] uppercase')} style={dl(0)}>
              {'< Portfolio >'}
            </p>
            <h2 className={cls(`p-fade-up text-[#FFFEEB] ${getTitleSize()} font-black tracking-tight leading-tight mt-1.5`)} style={dl(60)}>
              MY BEST WORK SO FAR
            </h2>
            <div className={cls('divline mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-[#172995] to-transparent')} style={dl(140)} />
          </div>

          {/* FlowingMenu — full width, relative, in document flow */}
          <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '260px', flexShrink: 0 }}>
            <FlowingMenu
              items={projectMenuItems}
              speed={6}
              textColor="#fff"
              bgColor="transparent"
              marqueeBgColor="#172995"
              marqueeTextColor="#FFFEEB"
              borderColor="#333"
              activeItem={activeProject}
              onItemHover={() => {}}
              onItemLeave={() => {}}
              onItemClick={(index) => {
                if (lastTapped === index) {
                  openProjectModal(projects[index]);
                  setLastTapped(null);
                } else {
                  setActiveProject(index);
                  setLastTapped(index);
                  if (!firstTap) setFirstTap(true);
                }
              }}
            />
          </div>

          {/* Tap hint — fades out after first tap */}
          <p
            style={{
              opacity: firstTap ? 0 : 0.5,
              transition: 'opacity 0.5s ease',
              fontSize: '0.7rem',
              color: '#888',
              marginTop: '8px',
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
              textAlign: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            Tap a project to preview →
          </p>

          {/* CardSwap — slides in via height + opacity transition on first tap */}
          <div
            style={{
              width: '90vw',
              maxWidth: '340px',
              height: lastTapped !== null ? `${cardDims.height}px` : '0px',
              overflow: 'visible',
              opacity: lastTapped !== null ? 1 : 0,
              pointerEvents: lastTapped !== null ? 'auto' : 'none',
              transition: 'height 0.35s cubic-bezier(0.22,1,0.36,1), margin-top 0.35s ease, opacity 0.35s ease',
              marginTop: lastTapped !== null ? '16px' : '0px',
              position: 'relative',
              zIndex: 1,
            }}
            onTouchStart={handleCardTouchStart}
            onTouchEnd={handleCardTouchEnd}
          >
            <div style={{ width: `${cardDims.width}px`, height: `${cardDims.height}px`, perspective: '1900px', margin: '0 auto' }}>
              <CardSwap
                cardDistance={20}
                verticalDistance={0}
                delay={999999}
                pauseOnHover={false}
                activeCardIndex={activeProject}
                width={cardDims.width}
                height={cardDims.height}
              >
                {projects.map((project, idx) => (
                  <Card key={idx} customClass="bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a1a2e]/95 border-[#172995] backdrop-blur-md shadow-2xl cursor-pointer transition-all duration-500">
                    <div
                      onClick={() => openProjectModal(project)}
                      className="group w-full h-full p-4 flex flex-col justify-between gap-2 transition-all duration-300 relative"
                    >
                      <div className="flex-shrink-0">
                        <p className="text-[#172995] text-[9px] font-bold tracking-[0.25em] uppercase mb-1">
                          Project {String(idx + 1).padStart(2, '0')}
                        </p>
                        <h3 className="text-[#FFFEEB] text-lg font-black tracking-tight mb-1.5 leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-full flex-1 min-h-0 rounded-lg overflow-hidden border border-[#172995]/40 shadow-xl">
                        <div className="bg-[#1a1a2e] px-2 py-1.5 flex items-center gap-1.5 border-b border-[#172995]/20">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                          </div>
                          <div className="ml-1 flex-1 bg-[#0a0a0a] rounded px-2 py-0.5 flex items-center">
                            <span className="text-gray-500 text-[8px] truncate">{project.url}</span>
                          </div>
                        </div>
                        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[#172995] text-[10px] font-mono tracking-widest uppercase">
                          tap to view details →
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>

          {/* Swipe dots — visible when card is showing */}
          {lastTapped !== null && (
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <div className="flex gap-1.5">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProject(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === activeProject ? '20px' : '6px',
                        height: '6px',
                        background: i === activeProject ? '#172995' : 'rgba(255,255,255,0.2)',
                      }}
                      aria-label={`Project ${i + 1}`}
                    />
                  ))}
                </div>
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-[9px] font-mono tracking-widest uppercase">swipe to navigate</p>
            </div>
          )}

          {/* Footer — in flow at bottom of mobile scrollable content */}
          <div className="w-full px-3 mt-2">
            <PortfolioFooter
              className={cls('p-fade-in')}
              style={dl(200)}
              dataDelay={0}
              linkClassName="opacity-35 hover:opacity-75 transition-opacity duration-200"
              textClassName="text-[10px]"
              showContactInfo={false}
            />
          </div>
        </div>
      )}

      {/* ── DESKTOP LAYOUT: absolute-positioned layers (unchanged) ──────── */}
      {!isMobile && (
        <div
          className="absolute left-0 right-0 z-20 text-center"
          style={{ top: getTitleTop() }}
        >
          <div className="px-4 sm:px-6 md:px-8">
            <p className={cls('p-fade-up text-[#172995] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase')} style={dl(0)}>
              {'< Portfolio >'}
            </p>
            <h2 className={cls(`p-fade-up text-[#FFFEEB] ${getTitleSize()} font-black tracking-tight leading-tight mt-1.5 sm:mt-2`)} style={dl(60)}>
              MY BEST WORK SO FAR
            </h2>
            {showSubtitle && (
              <p className={cls('p-fade-up text-gray-500 text-[11px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed')} style={dl(100)}>
                Hover over the menu items to explore my featured projects
              </p>
            )}
            <div className={cls('divline mx-auto mt-2 sm:mt-3 md:mt-4 h-px w-12 sm:w-14 md:w-16 bg-gradient-to-r from-transparent via-[#172995] to-transparent')} style={dl(140)} />
          </div>
        </div>
      )}

      {!isMobile && (
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full ${getMenuHeight()} z-[5]`}>
          <div className="w-full h-full">
            <FlowingMenu
              items={projectMenuItems}
              speed={10}
              textColor="#fff"
              bgColor="transparent"
              marqueeBgColor="#172995"
              marqueeTextColor="#FFFEEB"
              borderColor="#333"
              activeItem={activeProject}
              onItemHover={(index) => {
                setActiveProject(index);
              }}
              onItemLeave={() => {
                setActiveProject(0);
              }}
              onItemClick={(index) => {
                openProjectModal(projects[index]);
              }}
            />
          </div>
        </div>
      )}

      {!isMobile && (
        <div
          className="transform z-10 sm:p-0"
          style={getCardPosition()}
          onTouchStart={handleCardTouchStart}
          onTouchEnd={handleCardTouchEnd}
        >
          <div className={`transform ${getCardTransform()}`}>
            <div className="relative" style={{ width: `${cardDims.width}px`, height: `${cardDims.height}px`, perspective: '1900px' }}>
              <CardSwap
                cardDistance={40}
                verticalDistance={50}
              delay={999999}
              pauseOnHover={true}
              activeCardIndex={activeProject}
              width={cardDims.width}
              height={cardDims.height}
            >
              {projects.map((project, idx) => (
                <Card key={idx} customClass="bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a1a2e]/95 border-[#172995] backdrop-blur-md shadow-2xl cursor-pointer transition-all duration-500 hover:border-[#172995]/80 hover:shadow-[0_0_30px_rgba(23,41,149,0.3)]">
                  <div 
                    onClick={() => openProjectModal(project)}
                    className="group w-full h-full p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between gap-2 sm:gap-3 transition-all duration-300 relative"
                  >
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#172995] text-[#FFFEEB] px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                        <span>View Details</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <p className="text-[#172995] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 group-hover:text-[#1a30b0] transition-colors duration-300">
                        Project {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-[#FFFEEB] text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight mb-1.5 sm:mb-2 leading-tight group-hover:text-white transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="w-full flex-1 min-h-0 rounded-lg sm:rounded-xl overflow-hidden border border-[#172995]/40 shadow-xl transition-all duration-300 group-hover:border-[#172995]/80 group-hover:shadow-[0_0_20px_rgba(23,41,149,0.4)]">
                      <div className="bg-[#1a1a2e] px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 border-b border-[#172995]/20">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="ml-1 sm:ml-2 flex-1 bg-[#0a0a0a] rounded px-2 py-0.5 sm:py-1 flex items-center">
                          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-600 mr-1 sm:mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-gray-500 text-[8px] sm:text-[10px] truncate">
                            {project.url}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#172995]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
      )}

      {!isMobile && (
        <div className="absolute inset-x-0 bottom-0 z-30 px-3 sm:px-6 md:px-8 pb-1.5 sm:pb-2">
          <PortfolioFooter
            className={cls('p-fade-in')}
            style={dl(200)}
            dataDelay={0}
            linkClassName="opacity-35 hover:opacity-75 transition-opacity duration-200"
            textClassName="text-[10px] sm:text-xs"
            showContactInfo={true}
          />
        </div>
      )}

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeProjectModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Projects;