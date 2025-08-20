import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Update year dynamically
    setCurrentYear(new Date().getFullYear());

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-gray-900 text-white overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 md:w-32 h-20 md:h-32 bg-gdsc-blue/10 rounded-full animate-float"></div>
        <div
          className="absolute top-20 right-20 w-16 md:w-24 h-16 md:h-24 bg-gdsc-red/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 md:w-16 h-12 md:h-16 bg-gdsc-yellow/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 right-1/3 w-24 md:w-40 h-24 md:h-40 bg-gdsc-green/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 md:grid-cols-12 h-full gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-gray-400 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container-responsive py-12 md:py-16">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="relative group">
                {/* Logo and text - slides left and fades out on hover */}
                <Link to="/" className="flex items-center space-x-3 mb-6 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-x-full">
                  <img
                    src="https://www.dscvit.com/newlogo.svg"
                    alt="GDGoC IET DAVV Logo"
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                  <span className="font-bold text-lg md:text-xl">
                    GDGoC <span className="text-gdsc-blue">IET DAVV</span>
                  </span>
                </Link>
                
                {/* Developer Credits - slides in from right to replace logo */}
                <div className="absolute left-0 top-0 flex items-center space-x-3 mb-6 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <Link to="/">
                    <img
                      src="https://www.dscvit.com/newlogo.svg"
                      alt="GDGoC IET DAVV Logo"
                      className="w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <span className="font-bold text-lg md:text-xl">
                    Developed by <span className="text-gdsc-blue">
                      <a
                        href="https://www.linkedin.com/in/atharvgrg/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200"
                      >
                        Atharv Garg
                      </a>
                    </span> & <span className="text-gdsc-green">
                      <a
                        href="https://www.linkedin.com/in/darpan-porwal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition-colors duration-200"
                      >
                        Darpan Porwal
                      </a>
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6 text-sm md:text-base">
                Building the future one developer at a time. Join our community
                of passionate students learning and growing together through
                technology and innovation.
              </p>

              {/* Enhanced Social Links */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3">Connect with us</p>
                <SocialIcons
                  links={{
                    instagram: "https://www.instagram.com/gdgoc.ietdavv/?hl=en",
                    linkedin: "https://in.linkedin.com/company/gdgoc-iet-davv",
                    whatsapp:
                      "https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa",
                  }}
                  size="md"
                  variant="footer"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-gdsc-blue">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/events"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources & Join */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-gdsc-green">
                Get Involved
              </h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Join Community
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:gdsc@ietdavv.edu.in"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    Google Developers
                  </a>
                </li>
                <li>
                  <a
                    href="https://ietdavv.edu.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm md:text-base hover:translate-x-1 transform inline-block"
                  >
                    IET DAVV
                  </a>
                </li>
              </ul>

              {/* CTA Button */}
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate inline-block bg-gdsc-blue text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Join Now
              </a>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © {currentYear} Google Developer Groups on Campus IET DAVV.
                  All rights reserved.
                </p>
                <div className="flex space-x-4 md:space-x-6">
                  <a
                    href="mailto:gdsc@ietdavv.edu.in"
                    className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Back to top button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn-animate w-10 h-10 bg-gdsc-blue/20 hover:bg-gdsc-blue rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg"
                aria-label="Back to top"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated decoration at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gdsc-blue via-gdsc-green via-gdsc-yellow to-gdsc-red animate-gradient-x bg-[length:200%_100%]"></div>
    </footer>
  );
}
