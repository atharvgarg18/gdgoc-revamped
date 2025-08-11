import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gdsc-blue rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gdsc-red rotate-45 animate-float opacity-50" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-gdsc-yellow rounded-full animate-float opacity-70" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 right-10 w-8 h-8 bg-gdsc-green rounded-full animate-float opacity-40" style={{ animationDelay: "0.5s" }}></div>
        
        {/* Large decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-gdsc-blue/10 to-gdsc-blue/5 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-gdsc-green/10 to-gdsc-green/5 rounded-full"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-gray-400"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Google Developer Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-8 h-8 rounded-full bg-gdsc-blue animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gdsc-red animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-8 h-8 rounded-full bg-gdsc-yellow animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                <div className="w-8 h-8 rounded-full bg-gdsc-green animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">Google Developer</span>
            <span className="block text-gdsc-blue">Groups on Campus</span>
            <span className="block text-lg sm:text-xl lg:text-2xl font-normal mt-4 text-gray-600">
              IET DAVV, Indore
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us to learn, build, and grow together. We're here to help you develop your technical skills 
            and connect with like-minded developers in the community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join Our Community
            </button>
            <button className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full text-lg font-semibold hover:bg-gdsc-blue hover:text-white transition-all duration-300">
              Explore Events
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gdsc-blue">500+</div>
              <div className="text-gray-600">Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gdsc-red">50+</div>
              <div className="text-gray-600">Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gdsc-yellow">20+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gdsc-green">100+</div>
              <div className="text-gray-600">Workshops</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
