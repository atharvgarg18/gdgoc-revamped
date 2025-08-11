import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
            </div>
            <span className="font-bold text-lg text-gray-800">
              GDGoC <span className="text-gdsc-blue">IET DAVV</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              About
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              Events
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              Team
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gdsc-blue transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gdsc-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors inline-block"
            >
              Join Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                About
              </Link>
              <Link
                to="/events"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                Events
              </Link>
              <Link
                to="/team"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                Team
              </Link>
              <Link
                to="/gallery"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-gdsc-blue"
              >
                Contact
              </Link>
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 bg-gdsc-blue text-white rounded-lg"
              >
                Join Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
