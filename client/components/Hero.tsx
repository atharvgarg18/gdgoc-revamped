import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes - Better mobile scaling */}
        <div className="absolute top-16 md:top-20 left-4 md:left-10 w-3 h-3 md:w-4 md:h-4 bg-gdsc-blue rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-32 md:top-40 right-8 md:right-20 w-4 h-4 md:w-6 md:h-6 bg-gdsc-red rotate-45 animate-float opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 md:bottom-40 left-8 md:left-20 w-3 h-3 md:w-5 md:h-5 bg-gdsc-yellow rounded-full animate-float opacity-70"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-16 md:bottom-20 right-4 md:right-10 w-5 h-5 md:w-8 md:h-8 bg-gdsc-green rounded-full animate-float opacity-40"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Large decorative circles - Better mobile scaling */}
        <div className="absolute -top-8 md:-top-10 -right-8 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-gdsc-blue/10 to-gdsc-blue/5 rounded-full"></div>
        <div className="absolute -bottom-8 md:-bottom-10 -left-8 md:-left-10 w-36 h-36 md:w-60 md:h-60 bg-gradient-to-tr from-gdsc-green/10 to-gdsc-green/5 rounded-full"></div>

        {/* Grid pattern - Responsive */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 md:grid-cols-12 h-full gap-2 md:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-gray-400"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center container-responsive">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Google Developer Logo with enhanced mobile scaling */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-blue animate-pulse"></div>
                <div
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-red animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-yellow animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-green animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Heading with better mobile typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            <span className="block">Google Developer</span>
            <span className="block text-gdsc-blue">Groups on Campus</span>
            <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-normal mt-3 md:mt-4 text-gray-600">
              IET DAVV, Indore
            </span>
          </h1>

          {/* Subtitle with better mobile spacing */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Join us to learn, build, and grow together. We're here to help you
            develop your technical skills and connect with like-minded
            developers in the community.
          </p>

          {/* CTA Buttons with better mobile layout */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4 sm:px-0">
            <a
              href="https://chat.whatsapp.com/DjVwm5za2GZIlSvr8OXS3M?mode=ems_copy_t"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animate w-full sm:w-auto bg-gdsc-blue text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl text-center touch-target"
            >
              Join Our Community
            </a>
            <a
              href="/events"
              className="btn-animate w-full sm:w-auto border-2 border-gdsc-blue text-gdsc-blue px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-gdsc-blue hover:text-white transition-all duration-300 touch-target"
            >
              Explore Events
            </a>
          </div>

          {/* Stats with responsive grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold text-gdsc-blue group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-600 text-sm md:text-base">Members</div>
            </div>
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold text-gdsc-red group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-600 text-sm md:text-base">Events</div>
            </div>
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold text-gdsc-yellow group-hover:scale-110 transition-transform duration-300">
                20+
              </div>
              <div className="text-gray-600 text-sm md:text-base">Projects</div>
            </div>
            <div className="group">
              <div className="text-2xl md:text-3xl font-bold text-gdsc-green group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                Workshops
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-gdsc-blue transition-colors cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="w-1 h-2 md:h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
