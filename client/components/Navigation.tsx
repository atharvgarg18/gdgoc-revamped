import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 md:space-x-3 group"
            >
              <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gdsc-blue group-hover:animate-pulse"></div>
                <div
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gdsc-red group-hover:animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gdsc-yellow group-hover:animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gdsc-green group-hover:animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
              </div>
              <span className="font-bold text-base md:text-lg text-gray-800">
                GDGoC <span className="text-gdsc-blue">IET DAVV</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                to="/"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                Home
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/about"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/about") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                About
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/about") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/events"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/events") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                Events
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/events") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/team"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/team") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                Team
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/team") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/gallery"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/gallery") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                Gallery
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/gallery") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/contact"
                className={`relative text-sm xl:text-base font-medium transition-all duration-300 hover:text-gdsc-blue ${
                  isActiveRoute("/contact") ? "text-gdsc-blue" : "text-gray-700"
                } group`}
              >
                Contact
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gdsc-blue transition-all duration-300 group-hover:w-full ${
                    isActiveRoute("/contact") ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gdsc-blue text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-full hover:bg-blue-600 transition-all duration-300 text-sm xl:text-base font-medium shadow-lg hover:shadow-xl touch-target"
              >
                Join Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "top-2.5"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div
            className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl transform transition-all duration-300 ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            <div className="container-responsive py-6">
              <div className="space-y-4">
                <Link
                  to="/"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/about")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/events"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/events")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/team"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/team")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  Team
                </Link>
                <Link
                  to="/gallery"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/gallery")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target ${
                    isActiveRoute("/contact")
                      ? "bg-gdsc-blue text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gdsc-blue"
                  }`}
                >
                  Contact
                </Link>

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gdsc-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors touch-target"
                  >
                    Join Our Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
