import React from 'react';

interface PortfolioFooterProps {
  className?: string;
  textClassName?: string;
  linkClassName?: string;
  contactClassName?: string;
  showContactInfo?: boolean;
  year?: number;
  authorName?: string;
  phone?: string;
  email?: string;
  dataDelay?: number;
  style?: React.CSSProperties;
}

const socials = [
  { href: 'https://www.linkedin.com/in/kyle-payawal-612400377/', src: '/linkedin-alt.svg', alt: 'linkedin' },
  { href: 'https://github.com/eishley15', src: '/github-alt.svg', alt: 'github' },
  { href: 'https://www.instagram.com/payawalkyle/', src: '/instagram.svg', alt: 'instagram' }
];

const PortfolioFooter: React.FC<PortfolioFooterProps> = ({
  className,
  textClassName = 'text-xs text-gray-700',
  linkClassName = 'opacity-40 hover:opacity-75 transition-opacity',
  contactClassName = 'text-xs text-gray-600',
  showContactInfo = true,
  year = new Date().getFullYear(),
  authorName = 'Kyle Payawal',
  phone = '0976-118-7923',
  email = 'payawalkyle@gmail.com',
  dataDelay,
  style
}) => {
  return (
    <footer
      className={`border-t border-gray-800/50 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${className || ''}`.trim()}
      data-delay={dataDelay}
      style={style}
    >
      <p className={textClassName}>© Copyright {year}. Made by {authorName}</p>

      {showContactInfo && (
        <div className={`flex items-center divide-x divide-gray-800 gap-0 ${contactClassName}`.trim()}>
          <span className="pr-4 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .64 2.57 2 2 0 0 1-.45 2.11L7.91 8.4A16 16 0 0 0 15.6 16l.92-.88a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.57.64A2 2 0 0 1 23 17.18z"/></svg>
            {phone}
          </span>
          <span className="pl-4 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {email}
          </span>
        </div>
      )}

      <div className="flex gap-4">
        {socials.map((social) => (
          <a key={social.alt} href={social.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            <img src={social.src} alt={social.alt} className="w-4 h-4" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default PortfolioFooter;
