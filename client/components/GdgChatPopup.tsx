import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Minus } from "lucide-react";

// Safe URL handling
const chatUrl =
  (import.meta.env.VITE_GDG_CHAT_URL || "https://gdgoc-ai-chatbot-3.onrender.com").toString().trim();

const GdgChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); // New state for Fullscreen toggle
  const [opacity, setOpacity] = useState(100);
  
  // Increased default height to 600px to better fit standard login forms
  const [size, setSize] = useState({ width: 400, height: 600 }); 

  const isResizingRef = useRef(false);
  const resizeOriginRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // --- Resize Logic (Bottom-Left Handle) ---
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const deltaX = resizeOriginRef.current.x - e.clientX; // Drag Left = Increase Width
      const deltaY = e.clientY - resizeOriginRef.current.y; // Drag Down = Increase Height

      setSize({
        width: Math.min(Math.max(320, resizeOriginRef.current.w + deltaX), 800),
        height: Math.min(Math.max(400, resizeOriginRef.current.h + deltaY), 900),
      });
    };

    const onMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isOpen) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isOpen]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    resizeOriginRef.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height };
    document.body.style.cursor = "nesw-resize";
    document.body.style.userSelect = "none";
  };

  const toggleChat = () => {
    if (!isRendered) setIsRendered(true);
    setIsOpen((prev) => !prev);
  };

  // Determine current dimensions based on "Maximized" state
  const currentWidth = isMaximized ? "90vw" : `${size.width}px`;
  const currentHeight = isMaximized ? "85vh" : `${size.height}px`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      
      {/* --- Chat Container --- */}
      <div
        style={{
          width: currentWidth,
          height: currentHeight,
          opacity: opacity / 100,
          display: isRendered ? "flex" : "none",
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        }}
        className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out will-change-transform dark:border-gray-700 dark:bg-gray-900"
      >
        {/* --- Header --- */}
        <div className="flex shrink-0 select-none items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">GDG Assistant</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Opacity Slider */}
            <input
              type="range"
              min="20"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-600 outline-none hover:bg-gray-300 dark:bg-gray-700"
              title="Transparency"
            />

            {/* Maximize / Minimize Button (The Fix for Login Screens) */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700"
              title={isMaximized ? "Restore size" : "Maximize view"}
            >
              {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-red-500 dark:hover:bg-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* --- Iframe Content --- */}
        {/* We add 'overflow-y-auto' here to ensure scrollbars appear if content is tall */}
        <div className="relative flex-1 bg-white overflow-y-auto">
          <iframe
            src={chatUrl}
            title="GDGoC Chatbot"
            className="h-full w-full border-0 block"
            allow="microphone; camera; clipboard-read; clipboard-write"
          />
        </div>

        {/* --- Resize Handle (Hidden if Maximized) --- */}
        {!isMaximized && (
          <div
            onMouseDown={handleResizeStart}
            className="absolute bottom-0 left-0 z-50 flex h-8 w-8 cursor-nesw-resize items-end justify-start p-1.5 opacity-40 transition hover:opacity-100"
            title="Drag to resize"
          >
            <div className="h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-gray-400"></div>
          </div>
        )}
      </div>

      {/* --- Floating Toggle Button --- */}
      <button
        onClick={toggleChat}
        className={`group flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          isOpen ? "bg-gray-700 rotate-90" : "bg-gradient-to-tr from-blue-600 to-blue-400"
        }`}
      >
        {isOpen ? (
          <X className="text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white animate-bounce-short" />
        )}
      </button>
    </div>
  );
};

export default GdgChatPopup;