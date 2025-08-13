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
    { number: "500+", label: "Active Members", color: "text-blue-500" },
    { number: "50+", label: "Events Hosted", color: "text-green-500" },
    { number: "20+", label: "Projects Built", color: "text-red-500" },
    { number: "100+", label: "Skills Taught", color: "text-yellow-500" },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Innovation First",
      color: "from-blue-500 to-blue-600",
      description:
        "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
    },
    {
      icon: "👥",
      title: "Community Driven",
      color: "from-green-500 to-green-600",
      description:
        "Building a strong network of developers who support and learn from each other.",
    },
    {
      icon: "💡",
      title: "Skill Development",
      color: "from-red-500 to-red-600",
      description:
        "Providing hands-on workshops and real-world projects to enhance technical skills.",
    },
    {
      icon: "⭐",
      title: "Excellence",
      color: "from-yellow-500 to-yellow-600",
      description:
        "Striving for excellence in everything we do, from events to projects to community building.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-red-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/3 animate-float">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rotate-45 opacity-20"></div>
        </div>
        <div className="absolute top-3/4 right-1/4 animate-float-delayed">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-1/2 left-10 animate-pulse">
          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 opacity-30"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 bg-[size:60px_60px] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900">About</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-gradient-x">
                GDGoC IET DAVV
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Google Developer Groups on Campus at IET DAVV is a vibrant
              community of passionate students building the future through
              technology, innovation, and collaborative learning.
            </p>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative p-6">
                  <div
                    className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid with Advanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 4) * 200}ms` }}
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Feature Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                
                {/* Feature Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement with Enhanced Design */}
        <div className={`relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/30 text-center shadow-2xl transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5 rounded-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h3>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
              To create an inclusive environment where students can learn,
              build, and grow together. We believe in the power of
              collaboration, continuous learning, and using technology to make a
              positive impact in our community and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a
                href="/events"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative overflow-hidden border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-blue-600 hover:text-white"
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>

        {/* Core Values with Floating Design */}
        <div className={`mt-20 text-center transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '1400ms' }}>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Core Values
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Innovation",
              "Collaboration",
              "Learning",
              "Inclusivity",
              "Excellence",
            ].map((value, index) => (
              <span
                key={index}
                className="group relative px-6 py-3 bg-white/30 backdrop-blur-md text-gray-800 rounded-full text-lg font-semibold border border-white/40 hover:bg-white/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{value}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
