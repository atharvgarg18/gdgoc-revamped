import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gdsc-blue/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gdsc-red/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gdsc-yellow/10 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-gdsc-green/10 rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">
                  <div className="w-4 h-4 rounded-full bg-gdsc-blue"></div>
                  <div className="w-4 h-4 rounded-full bg-gdsc-red"></div>
                  <div className="w-4 h-4 rounded-full bg-gdsc-yellow"></div>
                  <div className="w-4 h-4 rounded-full bg-gdsc-green"></div>
                </div>
                <span className="font-bold text-xl">
                  GDGoC <span className="text-gdsc-blue">IET DAVV</span>
                </span>
              </Link>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                Building the future one developer at a time. Join our community of passionate 
                students learning and growing together through technology.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gdsc-blue rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white font-bold">📧</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gdsc-red rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white font-bold">📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gdsc-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white font-bold">💬</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gdsc-green rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="text-white font-bold">🌐</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-gdsc-blue">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/team" className="text-gray-300 hover:text-white transition-colors">Our Team</Link></li>
                <li><Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-gdsc-green">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Learning Path</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Code of Conduct</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h3 className="font-bold text-lg mb-4">Stay in the Loop</h3>
              <p className="text-gray-300 mb-6">Get notified about our latest events and workshops</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gdsc-blue text-white"
                />
                <button className="bg-gdsc-blue px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Google Developer Groups on Campus IET DAVV. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated decoration at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gdsc-blue via-gdsc-green via-gdsc-yellow to-gdsc-red animate-gradient-x bg-[length:200%_100%]"></div>
    </footer>
  );
}
