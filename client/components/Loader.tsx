import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for 3 seconds to match the GIF duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-white z-50 animate-opacity transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* GDSC IIITA Loader GIF */}
        <div className="flex justify-center mb-8">
          <img
            src="https://gdsc.iiita.ac.in/static/media/gdsc-loader.c4dc897894a7a1e2b603.gif"
            alt="GDGoC Loading Animation"
            className="w-64 h-auto"
          />
        </div>

        {/* Loading Text */}
        <div className="text-2xl font-bold text-gray-800">
          <span className="text-gdsc-blue">GDGoC</span> IET DAVV
        </div>
        <div className="text-gray-600 mt-2">Loading amazing experiences...</div>
      </div>
    </div>
  );
}
