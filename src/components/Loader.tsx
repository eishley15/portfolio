import CircularText from './CircularText';
  
export default function Loader() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#0a0a0a] z-50 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#172995] via-[#0a0a0a] to-[#0a0a0a] opacity-30 animate-pulse"></div>
      
      {/* Circular text spinner */}
      <div className="relative z-10 animate-fade-in">
        <CircularText
          text="KYLE*PAYAWAL*PORTFOLIO*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class scale-110 md:scale-125 lg:scale-150"
        />
      </div>

      {/* Loading text below */}
      <div className="absolute bottom-20 text-[#FFFEEB] text-sm md:text-base font-light tracking-widest animate-pulse">
        LOADING...
      </div>

      {/* Optional: Progress dots */}
      <div className="absolute bottom-12 flex space-x-2">
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-[#FFFEEB] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}