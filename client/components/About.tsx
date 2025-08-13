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
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "500+", label: "Active Members", color: "text-gdsc-blue" },
    { number: "50+", label: "Events Hosted", color: "text-gdsc-red" },
    { number: "20+", label: "Projects Built", color: "text-gdsc-yellow" },
    { number: "100+", label: "Skills Taught", color: "text-gdsc-green" },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
    },
    {
      icon: "👥",
      title: "Community Driven",
      description:
        "Building a strong network of developers who support and learn from each other.",
    },
    {
      icon: "💡",
      title: "Skill Development",
      description:
        "Providing hands-on workshops and real-world projects to enhance technical skills.",
    },
    {
      icon: "⭐",
      title: "Excellence",
      description:
        "Striving for excellence in everything we do, from events to projects to community building.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-r from-gdsc-blue to-gdsc-red rounded-full opacity-20 animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-gradient-to-r from-gdsc-yellow to-gdsc-green rotate-45 opacity-25 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 bg-gdsc-red rounded-full opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 right-10 w-10 h-10 bg-gradient-to-r from-gdsc-green to-gdsc-blue rounded-full opacity-20 animate-float" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gdsc-yellow rotate-45 opacity-25 animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-gradient-to-r from-gdsc-red to-gdsc-yellow rounded-full opacity-15 animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-4">
              About GDGoC IET DAVV
            </h2>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gdsc-yellow rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gdsc-red rotate-45 animate-pulse opacity-50" style={{ animationDelay: "0.5s" }}></div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Google Developer Groups on Campus at IET DAVV is a vibrant community
            of passionate students building the future through technology,
            innovation, and collaborative learning.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative text-center p-6 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-gdsc-blue to-gdsc-red rounded-full opacity-60 group-hover:animate-ping"></div>
              <div
                className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.number}
              </div>
              <div className="text-gray-700 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-2xl backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating decoration */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gdsc-blue rounded-full opacity-40 group-hover:animate-bounce"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gdsc-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="relative group p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl text-center mb-16 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-6 left-6 w-3 h-3 bg-gdsc-blue rounded-full animate-ping" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-12 right-8 w-2 h-2 bg-gdsc-red rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-gdsc-yellow rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-6 right-6 w-3 h-3 bg-gdsc-green rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-8">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
              We're built different, so we build different. Our mission is to
              empower future developers by bringing students passionate about
              technology together and helping them grow their skills in tech,
              regardless of background.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gradient-to-r from-gdsc-blue to-gdsc-red text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-red-600 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a
                href="/events"
                onClick={() => window.scrollTo(0, 0)}
                className="relative overflow-hidden border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-xl hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/20"
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="relative group p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl text-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gdsc-blue/5 via-gdsc-red/5 to-gdsc-green/5 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gdsc-green via-gdsc-yellow to-gdsc-red bg-clip-text text-transparent mb-8">
              Our Values
            </h3>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
              We believe you don't need to code to be a developer. We develop both
              products and people by making Google technologies accessible to
              everyone through workshops, events, and more. Dreamers, problem
              solvers, and tinkerers: That's who we are.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: "Innovation", color: "from-gdsc-blue to-blue-600" },
                { value: "Collaboration", color: "from-gdsc-green to-green-600" },
                { value: "Learning", color: "from-gdsc-red to-red-600" },
                { value: "Inclusivity", color: "from-gdsc-yellow to-yellow-600" },
                { value: "Excellence", color: "from-purple-500 to-purple-600" },
              ].map((item, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${item.color} text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 cursor-default`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
