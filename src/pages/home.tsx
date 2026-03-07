import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import StaggeredMenu from '../components/StaggeredMenu';
import DecryptedText from '@/components/DecryptedText';
import AnimatedContent from '@/components/AnimatedContent';
import FadeContent from '@/components/FadeContent';
import TerminalCLI from '@/components/TerminalCLI';
import { menuItems, socialItems } from '@/data/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

const FaultyTerminal = lazy(() => import('../components/FaultyTerminal'));

const TerminalPlaceholder = () => (
  <div style={{ width: '100%', height: '100%', background: '#020b2e' }} />
);

export default function Home() {
  usePageMeta({
    title: 'Kyle Payawal | Fullstack Developer',
    description: 'Fullstack Developer specializing in React, Node.js, and design-driven web experiences. Available for full-time and freelance work.',
    canonical: '/',
  });

  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Suspense fallback={<TerminalPlaceholder />}>
          <FaultyTerminal
            scale={3.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#172995"
            mouseReact
            mouseStrength={0.5}
            pageLoadAnimation
            brightness={0.6}
          />
        </Suspense>
      </div>

      <div style={{ position: 'relative', zIndex: 30, pointerEvents: 'none' }}>
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

      <div className="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-end items-start pointer-events-none
                      p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20
                      pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="text-left mb-4 sm:mb-6 md:mb-8 max-w-full">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] 
                         text-[#FFFEEB] font-bold tracking-tight leading-none
                         -mb-2 sm:-mb-3 md:-mb-4 lg:-mb-5">
            <DecryptedText
              text="KYLE PAYAWAL"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
            />
          </h1>

          <h2 className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.5rem] lg:text-[3.5rem] xl:text-[5rem] 
                         text-[#FFFEEB] font-normal mb-0 tracking-tight leading-tight">
            <DecryptedText
              text="WHERE DESIGN MEETS CODE"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
            />
          </h2>

          <p className="text-[0.75rem] sm:text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]
                        text-[#172995] font-semibold tracking-[0.15em] uppercase mt-2 mb-0">
            Fullstack Developer &middot; Open to Work
          </p>

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <span className="inline-block pointer-events-auto mt-4 sm:mt-6">
                <button
                  className="rounded-lg border border-[#222] text-[#222] font-medium
                             px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base
                             bg-[#FFFEEB] shadow-sm transition-colors duration-200
                             hover:border-[#172995] hover:text-[#172995] hover:bg-[#cfd8fc]
                             cursor-pointer"
                >
                  Available for hire →
                </button>
              </span>
            </Link>
          </AnimatedContent>
        </div>

        <FadeContent blur={true} duration={1000} initialOpacity={0}>
          <div className="flex space-x-4 sm:space-x-6 pointer-events-auto ml-0 sm:ml-1">
            <Link to="https://www.linkedin.com/in/kyle-payawal-612400377/" target="_blank" style={{ textDecoration: 'none' }}>
              <img
                src="/linkedin-alt.svg"
                alt="linkedin logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link to="https://github.com/eishley15" target="_blank" style={{ textDecoration: 'none' }}>
              <img
                src="/github-alt.svg"
                alt="github logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link to="https://www.instagram.com/payawalkyle/" target="_blank" style={{ textDecoration: 'none' }}>
              <img
                src="/instagram.svg"
                alt="instagram logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
        </FadeContent>
      </div>

      <TerminalCLI />
    </div>
  );
}
