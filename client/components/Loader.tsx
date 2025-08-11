import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [loadingText, setLoadingText] = useState("GOOGLE");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingText("DEVELOPER"), 1000);
    const timer2 = setTimeout(() => setLoadingText("STUDENT"), 2000);
    const timer3 = setTimeout(() => setLoadingText("CLUBS"), 3000);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-white z-50 animate-opacity transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* GDSC Logo Animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="flex space-x-1">
              <div className="w-6 h-6 rounded-full bg-gdsc-blue animate-pulse"></div>
              <div className="w-6 h-6 rounded-full bg-gdsc-red animate-pulse delay-150"></div>
              <div className="w-6 h-6 rounded-full bg-gdsc-yellow animate-pulse delay-300"></div>
              <div className="w-6 h-6 rounded-full bg-gdsc-green animate-pulse delay-450"></div>
            </div>
          </div>
        </div>
        
        {/* Animated Text */}
        <div className="text-4xl font-bold text-gray-800 min-h-[2.5rem] flex items-center justify-center">
          <span 
            key={loadingText}
            className={`inline-block animate-scale-in ${
              loadingText === "GOOGLE" ? "text-gdsc-blue" :
              loadingText === "DEVELOPER" ? "text-gdsc-green" :
              loadingText === "STUDENT" ? "text-gdsc-yellow" :
              "text-gdsc-red"
            }`}
          >
            {loadingText}
          </span>
        </div>
        
        {/* Loading Bar */}
        <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gdsc-blue via-gdsc-green via-gdsc-yellow to-gdsc-red animate-gradient-x bg-[length:200%_100%]"></div>
        </div>
      </div>
    </div>
  );
}
