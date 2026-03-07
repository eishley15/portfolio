import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface VideoModalProps {
  videoUrl: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ videoUrl, title, isOpen, onClose }: VideoModalProps) => {
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
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.2'
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
        scale: 0.95,
        y: 20,
        duration: 0.25,
        ease: 'power2.in'
      });
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, '-=0.15');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div
        ref={contentRef}
        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(23, 41, 149, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/20 transition-all duration-300 group"
          aria-label="Close video"
        >
          <svg 
            className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {title && (
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-white text-sm font-medium">{title}</p>
          </div>
        )}

        <iframe
          src={videoUrl}
          title={title || 'Video'}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoModal;
