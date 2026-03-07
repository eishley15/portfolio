import { useState, useEffect } from 'react';
import StaggeredMenu from '../components/StaggeredMenu';
import PortfolioFooter from '../components/PortfolioFooter';
import { menuItems, socialItems } from '@/data/navigation';
import { usePageMeta } from '@/hooks/usePageMeta';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ANIM_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.7); }
    70%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }

  .c-fade-up   { animation: fadeUp      0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .c-fade-in   { animation: fadeIn      0.6s  ease both; }
  .c-slide-l   { animation: slideInLeft 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .c-slide-r   { animation: slideInRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .c-success   { animation: successPop  0.5s  cubic-bezier(0.22,1,0.36,1) both; }

  .c-input:focus {
    box-shadow: 0 0 0 1px #172995, 0 0 20px rgba(23,41,149,0.2);
  }

  .c-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg,transparent 40%,rgba(255,254,235,.14) 50%,transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.55s ease;
  }
  .c-btn:hover::after { transform: translateX(100%); }
  .c-btn:hover { box-shadow: 0 0 28px rgba(23,41,149,.45); }

  .c-info-row { transition: transform 0.2s ease; }
  .c-info-row:hover { transform: translateX(5px); }

  .c-social { transition: transform 0.2s ease, border-color 0.2s ease; }
  .c-social:hover { transform: translateY(-3px); }
`;

const Contact = () => {
  const [formData, setFormData]   = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [hasError, setHasError]   = useState(false);
  const [mounted, setMounted]     = useState(false);

  usePageMeta({
    title: 'Contact — Kyle Payawal | Fullstack Developer',
    description: "Get in touch with Kyle Payawal — open to freelance projects, full-time opportunities, and creative collaborations.",
    canonical: '/contact',
  });

  useEffect(() => {
    if (!document.getElementById('contact-anim')) {
      const s = document.createElement('style');
      s.id = 'contact-anim';
      s.textContent = ANIM_STYLES;
      document.head.appendChild(s);
    }
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!import.meta.env.VITE_WEB3FORMS_KEY) {
      setHasError(true);
      return;
    }
    setSending(true);
    setHasError(false);
    try {
      const data = new FormData(e.currentTarget);
      if (!formData.subject) data.set('subject', 'Portfolio Contact Form');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      label: 'Email', value: 'payawalkyle@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: 'Location', value: 'Concepcion, Tarlac',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      label: 'Availability', value: 'Open to work & Available for freelance',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const dl = (ms: number) => ({ animationDelay: `${ms}ms` });
  const cls = (base: string) => `${base} ${mounted ? '' : 'opacity-0'}`;

  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>

      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f23] to-[#0a0a0a]" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#172995] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }}>
        <StaggeredMenu
          position="right" items={menuItems} socialItems={socialItems}
          displaySocials displayItemNumbering
          menuButtonColor="#FFFEEB" openMenuButtonColor="#000000"
          changeMenuColorOnOpen colors={['#FFFEEB', '#172995']}
          logoUrl="/logo.svg" accentColor="#172995"
          onMenuOpen={() => {}} onMenuClose={() => {}} isFixed
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-16 overflow-y-auto">
        <div className="w-full max-w-6xl flex flex-col gap-10 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div className="flex flex-col justify-center items-start">

            <p className={`text-left ${cls('c-fade-up')}`} style={{ ...dl(80), color: '#172995', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {'<Get In Touch>'}
            </p>

            <h1 className="text-[#FFFEEB] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-left w-full">
              {['LET\'S BUILD', 'SOMETHING', 'GREAT.'].map((word, i) => (
                <span
                  key={word}
                  className={`block text-left ${mounted ? 'c-fade-up' : 'opacity-0'}`}
                  style={{
                    ...dl(160 + i * 90),
                    ...(i === 1 ? { WebkitTextStroke: '1px #172995', color: 'transparent' } : {}),
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className={`text-gray-400 text-sm leading-relaxed max-w-sm mb-10 text-left ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(430)}>
              Have a project in mind, a question, or just want to connect? I'm always open to new collaborations and opportunities.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {contactInfo.map((item, i) => (
                <div
                  key={item.label}
                  className={`c-info-row flex items-center gap-4 group ${mounted ? 'c-slide-l' : 'opacity-0'}`}
                  style={dl(510 + i * 80)}
                >
                  <div className="w-10 h-10 rounded-lg border border-[#172995]/40 flex items-center justify-center text-[#172995] group-hover:bg-[#172995]/10 transition-colors duration-200 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-500 text-xs uppercase tracking-widest text-left">{item.label}</p>
                    <p className="text-[#FFFEEB] text-sm font-medium text-left">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex gap-4 ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(770)}>
              {[
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/kyle-payawal-612400377/', src: '/linkedin-alt.svg' },
                { label: 'GitHub',    href: 'https://github.com/eishley15',                         src: '/github-alt.svg'   },
                { label: 'Instagram', href: 'https://www.instagram.com/payawalkyle/',               src: '/instagram.svg'    },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="c-social w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#172995]">
                  <img src={s.src} alt={s.label} className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          <div className={`flex flex-col justify-center ${mounted ? 'c-slide-r' : 'opacity-0'}`} style={dl(200)}>
            {submitted ? (
              <div className="c-success flex flex-col items-center justify-center text-center gap-6 py-20">
                <div className="w-16 h-16 rounded-full border border-[#172995] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#172995" strokeWidth="1.5" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#FFFEEB] text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">Thanks for reaching out. I'll get back to you shortly.</p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', subject:'', message:'' }); }}
                  className="mt-4 px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-[#172995] hover:text-[#172995] transition-colors text-sm font-semibold tracking-wider"
                >
                  <span className="inline-flex items-center gap-2">
                    SEND ANOTHER
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY ?? ''} />
                <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {([
                    { name: 'name' as const,  label: 'Name',  type: 'text',  placeholder: 'Javi Torres'      },
                    { name: 'email' as const, label: 'Email', type: 'email', placeholder: 'javi@example.com' },
                  ] as const).map((field, i) => (
                    <div key={field.name} className={`relative ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(320 + i * 70)}>
                      <label htmlFor={field.name}
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs tracking-widest uppercase ${
                          focused === field.name || formData[field.name] ? 'top-2 text-[#172995]' : 'top-1/2 -translate-y-1/2 text-gray-500'
                        }`}>
                        {field.label}
                      </label>
                      <input
                        id={field.name} name={field.name} type={field.type}
                        value={formData[field.name]} onChange={handleChange}
                        onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)}
                        required placeholder={field.placeholder}
                        className="c-input w-full bg-white/[0.03] border border-gray-800 rounded-lg px-4 pt-7 pb-3 text-[#FFFEEB] text-sm focus:outline-none focus:border-[#172995] transition-all duration-200 placeholder-transparent"
                      />
                    </div>
                  ))}
                </div>

                <div className={`relative ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(460)}>
                  <label htmlFor="subject"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs tracking-widest uppercase ${
                      focused === 'subject' || formData.subject ? 'top-2 text-[#172995]' : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }`}>
                    Subject
                  </label>
                  <input id="subject" name="subject" type="text" value={formData.subject}
                    onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                    required placeholder="Project inquiry"
                    className="c-input w-full bg-white/[0.03] border border-gray-800 rounded-lg px-4 pt-7 pb-3 text-[#FFFEEB] text-sm focus:outline-none focus:border-[#172995] transition-all duration-200 placeholder-transparent"
                  />
                </div>

                <div className={`relative ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(540)}>
                  <label htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs tracking-widest uppercase ${
                      focused === 'message' || formData.message ? 'top-3 text-[#172995]' : 'top-5 text-gray-500'
                    }`}>
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message}
                    onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    required placeholder="Tell me about your project..."
                    className="c-input w-full bg-white/[0.03] border border-gray-800 rounded-lg px-4 pt-8 pb-3 text-[#FFFEEB] text-sm focus:outline-none focus:border-[#172995] transition-all duration-200 resize-none placeholder-transparent"
                  />
                </div>

                {hasError && (
                  <p className="text-red-400 text-xs text-center -mb-2">
                    Something went wrong. Please try again or email me directly at payawalkyle@gmail.com
                  </p>
                )}
                <div className={`flex items-center gap-4 mt-2 ${mounted ? 'c-fade-up' : 'opacity-0'}`} style={dl(620)}>
                  <div className="flex-1 h-px bg-gray-800" />
                  <button type="submit" disabled={sending}
                    className="c-btn relative px-8 py-3 bg-[#172995] text-[#FFFEEB] rounded-lg text-sm font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-[#1f37b3] disabled:opacity-60">
                    <span className={`transition-opacity duration-200 ${sending ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="inline-flex items-center gap-2">
                        SEND MESSAGE
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                      </span>
                    </span>
                    {sending && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 animate-spin text-[#FFFEEB]" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          </div>

          <PortfolioFooter
            className={mounted ? 'c-fade-in' : 'opacity-0'}
            textClassName="text-xs text-gray-700"
            contactClassName="text-xs text-gray-700"
            linkClassName="opacity-40 hover:opacity-75 transition-opacity"
            style={dl(860)}
            showContactInfo={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;