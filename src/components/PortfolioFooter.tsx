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
  year = 2025,
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
          <span className="pr-4">📞 {phone}</span>
          <span className="pl-4">✉ {email}</span>
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
