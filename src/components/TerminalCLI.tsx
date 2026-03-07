import { useState, useRef, useEffect, useCallback } from 'react';

interface Line {
  type: 'input' | 'output' | 'error' | 'ascii';
  text: string;
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '┌─────────────────────────────────────────┐',
    '│           AVAILABLE COMMANDS            │',
    '├─────────────────────────────────────────┤',
    '│  help       — show this list            │',
    '│  about      — who is Kyle               │',
    '│  projects   — featured work             │',
    '│  skills     — tech stack                │',
    '│  contact    — get in touch              │',
    '│  hire me    — make a good decision      │',
    '│  clear      — clear terminal            │',
    '└─────────────────────────────────────────┘',
  ],

  about: () => [
    '> Kyle Payawal — Fullstack Developer',
    '> Based in Concepcion, Tarlac, Philippines',
    '> Specializing in MERN & MEVN stacks',
    '> Ships production-ready apps on AWS EC2 & DigitalOcean',
    '> "I don\'t just write features — I ship products."',
    '> Currently: Open to full-time & freelance work',
  ],

  projects: () => [
    '> IMMFI            — Nonprofit donation & volunteer platform',
    '   Stack: React · Node.js · MongoDB · AWS EC2',
    '   Live:  https://immfi.org',
    '',
    '> Buffs Chicken    — Restaurant ordering platform w/ real-time notifications',
    '   Stack: Nuxt.js · Node.js · Socket.IO · DigitalOcean',
    '   Live:  https://buffschicken.com',
    '',
    '> Ben Ibe          — Flower shop e-commerce with email OTP',
    '   Stack: React · Node.js · MongoDB · AWS EC2',
    '   Repo:  https://github.com/eishley15/ben-ibe-website',
    '',
    '> Splitsmart       — Group expense-splitting app (like Splitwise)',
    '   Stack: Vue.js · Node.js · MongoDB',
  ],

  skills: () => [
    '> Frontend:   React · Vue.js · Nuxt.js · TypeScript · Tailwind CSS',
    '> Backend:    Node.js · Express · REST APIs · Socket.IO',
    '> Database:   MongoDB · MySQL',
    '> DevOps:     AWS EC2 · DigitalOcean · Nginx · Vercel · Git',
    '> Tools:      Figma · VS Code · Postman · Cloudflare',
    '> Creative:   Figma · DaVinci Resolve · Lightroom · Photoshop',
  ],

  contact: () => [
    '> Email:     payawalkyle@gmail.com',
    '> LinkedIn:  linkedin.com/in/kyle-payawal-612400377',
    '> GitHub:    github.com/eishley15',
    '> Instagram: instagram.com/payawalkyle',
    '> Location:  Concepcion, Tarlac, Philippines',
  ],

  'hire me': () => [
    '',
    '  ██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗██╗',
    '  ██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝██║',
    '  ███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  ██║',
    '  ██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  ╚═╝',
    '  ██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗██╗',
    '  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝     ╚═╝╚══════╝╚═╝',
    '',
    '  You\'ve made an excellent decision.',
    '  Initiating onboarding sequence...',
    '',
    '  [████████████████████] 100%',
    '',
    '  ✓ Strong fullstack skills — VERIFIED',
    '  ✓ Production deployments — VERIFIED',
    '  ✓ Attention to detail — CLEARLY YES',
    '  ✓ Good taste — RUNNING THIS TERMINAL PROVES IT',
    '',
    '  → payawalkyle@gmail.com',
    '',
  ],
};

const BOOT_LINES = [
  'KYLE_PAYAWAL_OS v1.0.0 — Fullstack Developer Edition',
  'Booting system...',
  'Loading modules: React · Node.js · MongoDB · AWS',
  'All systems operational.',
  'Type "help" to see available commands.',
  '',
];

export default function TerminalCLI() {
  const [lines, setLines] = useState<Line[]>(
    BOOT_LINES.map((t) => ({ type: 'output', text: t }))
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    const inputLine: Line = { type: 'input', text: `> ${raw.trim()}` };

    if (cmd === 'clear') {
      setLines([{ type: 'output', text: 'Terminal cleared.' }]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const output: Line[] = handler().map((t) => ({ type: 'ascii', text: t }));
      setLines((prev) => [...prev, inputLine, ...output]);
    } else {
      setLines((prev) => [
        ...prev,
        inputLine,
        { type: 'error', text: `Command not found: "${raw.trim()}". Type "help" for options.` },
      ]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg
                   bg-[#0a0a0a]/90 border border-[#172995]/60 text-[#7cfc00] text-xs
                   font-mono tracking-widest uppercase backdrop-blur-sm
                   hover:border-[#172995] hover:shadow-[0_0_16px_rgba(23,41,149,0.5)]
                   transition-all duration-200 cursor-pointer"
        aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
      >
        <span className="text-[#172995] select-none">{isOpen ? '✕' : '>'}</span>
        {isOpen ? 'CLOSE' : 'TERMINAL'}
      </button>

      <div
        className="fixed bottom-[4.5rem] left-6 z-40 transition-all duration-300 origin-bottom-left"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.85) translateY(12px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="w-[420px] max-w-[calc(100vw-3rem)] rounded-xl overflow-hidden border border-[#172995]/50"
          style={{
            background: 'rgba(6,6,20,0.96)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 0 1px rgba(23,41,149,0.2), 0 24px 60px rgba(0,0,0,0.8)',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#172995]/25 bg-[#0a0a0a]/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="flex-1 text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase select-none">
              kyle@portfolio ~ terminal
            </p>
          </div>

          <div className="h-64 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed space-y-0.5 scrollbar-thin"
               style={{ scrollbarColor: 'rgba(23,41,149,0.4) transparent' }}>
            {lines.map((line, i) => (
              <p
                key={i}
                className={
                  line.type === 'input'
                    ? 'text-[#FFFEEB]'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'ascii'
                    ? 'text-[#7cfc00] whitespace-pre'
                    : 'text-[#172995]'
                }
              >
                {line.text || '\u00A0'}
              </p>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-[#172995]/20">
            <span className="text-[#172995] font-mono text-xs select-none">{'>'}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              className="flex-1 bg-transparent text-[#FFFEEB] font-mono text-xs
                         outline-none border-none placeholder-gray-700 caret-[#172995]"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            <span
              className="w-2 h-3.5 bg-[#7cfc00] rounded-[1px] select-none"
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          </div>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </>
  );
}
