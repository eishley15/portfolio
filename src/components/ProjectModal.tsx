import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current && backdropRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      tl.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          scale: 0.8, 
          rotationX: -15,
          y: 50,
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotationX: 0,
          y: 0,
          duration: 0.6, 
          ease: 'power3.out',
        },
        '-=0.2'
      );

      const sections = contentRef.current.querySelectorAll('.modal-section');
      tl.fromTo(
        sections,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08,
          ease: 'power2.out' 
        },
        '-=0.3'
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isClosing) return;
    
    setIsClosing(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        onClose();
      }
    });

    if (contentRef.current && backdropRef.current) {
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      });
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, '-=0.2');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const getTechByCategory = (category: string) => 
    project.technologies.filter(tech => tech.category === category);

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div
        ref={contentRef}
        className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, #0d0d0d 0%, #111111 100%)',
          boxShadow: '0 0 0 1px rgba(23,41,149,0.25), 0 40px 80px rgba(0,0,0,0.7)',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#172995]/60 transition-all duration-200 text-gray-400 hover:text-white text-sm"
          aria-label="Close modal"
        >
          &#x2715;
        </button>

        <div className="modal-section relative w-full h-52 sm:h-64 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
          <div className="absolute bottom-5 left-6 right-12">
            <h2 className="text-[#FFFEEB] text-3xl sm:text-4xl font-black tracking-tight leading-none">
              {project.name}
            </h2>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 space-y-8 pt-6">

          <div className="modal-section flex flex-wrap gap-3">
            {project.teamSize && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <svg className="w-3.5 h-3.5 text-[#172995]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300 text-xs font-medium">{project.teamSize}-Person Team</span>
              </div>
            )}
            {project.deployment && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <svg className="w-3.5 h-3.5 text-[#172995]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
                <span className="text-gray-300 text-xs font-medium">{project.deployment.platform}</span>
              </div>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#172995]/50 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5 text-[#172995]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-gray-300 text-xs font-medium">{project.url}</span>
              </a>
            )}
          </div>

          <div className="h-px bg-white/[0.06]" />

          <div className="modal-section p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] text-center">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#172995] mb-1">My Role</p>
            <p className="text-[#FFFEEB] text-lg font-bold leading-tight mb-1">{project.role}</p>
            {project.contributions && (
              <p className="text-gray-400 text-sm leading-relaxed">{project.contributions}</p>
            )}
          </div>

          <div className="modal-section space-y-2">
            <SectionLabel>Overview</SectionLabel>
            <p className="text-gray-400 text-[15px] leading-relaxed">{project.description}</p>
          </div>

          {project.technologies.length > 0 && (
            <div className="modal-section space-y-4">
              <SectionLabel>Tech Stack</SectionLabel>
              <div className="space-y-3">
                {getTechByCategory('frontend').length > 0 && (
                  <TechRow label="Frontend" techs={getTechByCategory('frontend')} />
                )}
                {getTechByCategory('backend').length > 0 && (
                  <TechRow label="Backend" techs={getTechByCategory('backend')} />
                )}
                {getTechByCategory('database').length > 0 && (
                  <TechRow label="Database" techs={getTechByCategory('database')} />
                )}
                {getTechByCategory('deployment').length > 0 && (
                  <TechRow label="Deployment" techs={getTechByCategory('deployment')} />
                )}
                {getTechByCategory('tools').length > 0 && (
                  <TechRow label="Tools" techs={getTechByCategory('tools')} />
                )}
              </div>
            </div>
          )}

          {project.responsibilities.length > 0 && (
            <div className="modal-section space-y-3">
              <SectionLabel>Responsibilities</SectionLabel>
              <ul className="space-y-2">
                {project.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#172995] shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.features.length > 0 && (
            <div className="modal-section space-y-3">
              <SectionLabel>Key Features</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#172995] shrink-0" />
                    <p className="text-gray-400 text-sm leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <div className="modal-section space-y-3 text-left">
              <SectionLabel>Challenges &amp; Solutions</SectionLabel>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full border border-[#172995] shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.outcomes && project.outcomes.length > 0 && (
            <div className="modal-section space-y-3 text-left">
              <SectionLabel>Outcomes</SectionLabel>
              <ul className="space-y-2">
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.githubUrl || project.liveUrl) && (
            <div className="modal-section flex flex-wrap gap-3 pt-5 border-t border-white/[0.06]">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-[#FFFEEB] text-sm font-medium transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#172995] hover:bg-[#1f35c0] text-[#FFFEEB] text-sm font-medium transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Site
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#172995]">{children}</p>
);

const TechRow = ({ label, techs }: { label: string; techs: { name: string }[] }) => (
  <div className="flex items-start gap-3">
    <span className="shrink-0 mt-0.5 text-[10px] font-bold tracking-wider uppercase text-gray-600 w-20">{label}</span>
    <div className="flex flex-wrap gap-1.5">
      {techs.map((tech, idx) => (
        <span
          key={idx}
          className="px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-md text-gray-300 text-xs font-medium"
        >
          {tech.name}
        </span>
      ))}
    </div>
  </div>
);

export default ProjectModal;
