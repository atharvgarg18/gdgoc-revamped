import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About <span className="text-gdsc-blue">GDSC IET DAVV</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Google Developer Student Clubs are university-based community groups for students 
              interested in Google developer technologies.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Building the Future, One Developer at a Time
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At GDSC IET DAVV, we believe in the power of learning together. Our community 
                is designed to help students bridge the gap between theory and practice through 
                hands-on workshops, projects, and events.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We focus on practical learning experiences that prepare students for real-world 
                challenges while fostering innovation and collaboration within our campus community.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gdsc-blue/5 transition-colors">
                  <div className="w-12 h-12 bg-gdsc-blue rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">💻</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Hands-on Learning</h4>
                  <p className="text-sm text-gray-600 mt-1">Practical workshops and coding sessions</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gdsc-red/5 transition-colors">
                  <div className="w-12 h-12 bg-gdsc-red rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">🤝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Community</h4>
                  <p className="text-sm text-gray-600 mt-1">Connect with like-minded developers</p>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Elements */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-gdsc-blue to-blue-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                    <h4 className="font-bold text-lg mb-2">Technical Workshops</h4>
                    <p className="text-sm opacity-90">Learn cutting-edge technologies</p>
                  </div>
                  <div className="bg-gradient-to-br from-gdsc-green to-green-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                    <h4 className="font-bold text-lg mb-2">Project Building</h4>
                    <p className="text-sm opacity-90">Build real-world applications</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gradient-to-br from-gdsc-red to-red-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                    <h4 className="font-bold text-lg mb-2">Networking</h4>
                    <p className="text-sm opacity-90">Connect with industry experts</p>
                  </div>
                  <div className="bg-gradient-to-br from-gdsc-yellow to-yellow-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
                    <h4 className="font-bold text-lg mb-2">Career Growth</h4>
                    <p className="text-sm opacity-90">Prepare for tech careers</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gdsc-blue rounded-full animate-float opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gdsc-yellow rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
