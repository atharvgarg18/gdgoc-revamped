import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function Index() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <div className="min-h-screen">
      {/* Loader */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Events />
        </main>
        <Footer />
      </div>
    </div>
  );
}
