export default function Loader() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#0a0a0a] z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#172995] via-[#0a0a0a] to-[#0a0a0a] opacity-30 animate-pulse"></div>

      <div className="relative z-10" style={{ width: 160, height: 160 }}>
        <svg viewBox="0 0 160 160" width="160" height="160" style={{ animation: 'loaderSpin 12s linear infinite' }}>
          <defs>
            <path id="lc" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
          </defs>
          <text fill="#FFFEEB" fontSize="11.5" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="4">
            <textPath href="#lc">KYLE * PAYAWAL * PORTFOLIO *</textPath>
          </text>
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#172995',
            borderRightColor: '#172995',
            animation: 'loaderSpin 0.8s linear infinite'
          }} />
        </div>
      </div>

      <div className="absolute bottom-20 text-[#FFFEEB] text-sm font-light tracking-widest animate-pulse">
        LOADING...
      </div>

      <div className="absolute bottom-12 flex space-x-2">
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>

      <style>{`@keyframes loaderSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
