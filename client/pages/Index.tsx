import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ConnectionTest from "@/components/ConnectionTest";

export default function Index() {
  const [showLoader, setShowLoader] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasSeenLoader = sessionStorage.getItem("gdgoc-loader-seen");

    if (!hasSeenLoader) {
      setShowLoader(true);
      setShowContent(false);
      // Mark that user has seen the loader in this session
      sessionStorage.setItem("gdgoc-loader-seen", "true");
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Home"
        description="Welcome to Google Developer Groups on Campus IET DAVV. Join our vibrant community of 500+ members, attend 50+ events, and work on 20+ projects. Building the future one developer at a time."
        keywords="GDGoC IET DAVV, Google Developer Groups, programming community, tech events, student developers, coding workshops, IET DAVV, Indore, technology, innovation"
      />

      {/* Loader */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        <Navigation />
        <main>
          <Hero />
          {/* Debug component - remove after fixing */}
          <div className="container mx-auto px-4 py-4">
            <ConnectionTest />
          </div>
          <About />
          <Events />
        </main>
        <Footer />
      </div>
    </div>
  );
}
