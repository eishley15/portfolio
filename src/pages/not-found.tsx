import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: '404 — Page Not Found | Kyle Payawal',
    description: "This page doesn't exist. Head back to Kyle Payawal's portfolio.",
    canonical: '/404',
  });

  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(23,41,149,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <Link to="/" style={{ position: 'absolute', top: '24px', left: '24px', opacity: 0.7 }}>
        <img src="/logo.svg" alt="Kyle Payawal logo" style={{ width: '36px', height: '36px' }} />
      </Link>

      <p
        style={{ color: '#172995', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.25rem' }}
      >
        {'< 404 >'}
      </p>

      <h1
        style={{ color: '#FFFEEB', fontSize: 'clamp(5rem, 20vw, 14rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', margin: 0 }}
      >
        404
      </h1>

      <p
        style={{ color: 'rgba(255,254,235,0.45)', fontSize: '1rem', fontWeight: 400, marginTop: '1rem', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '360px', lineHeight: 1.6 }}
      >
        Looks like this page went missing. Maybe it never existed, or it moved somewhere else.
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 2rem',
          background: '#172995',
          color: '#FFFEEB',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#1f37b3';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(23,41,149,0.5)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#172995';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0 }}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Back to Home
      </Link>

      <div
        style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'linear-gradient(#172995 1px,transparent 1px),linear-gradient(90deg,#172995 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }}
      />
    </div>
  );
}
