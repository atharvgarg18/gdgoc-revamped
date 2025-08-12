import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 },
    );

    const cards = document.querySelectorAll(".about-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isVisible]);

  const features = [
    {
      icon: "🚀",
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Building a strong network of developers who support and learn from each other.",
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
    },
    {
      icon: "🎯",
      title: "Skill Development",
      description: "Providing hands-on workshops and real-world projects to enhance technical skills.",
      color: "from-red-500 to-red-600",
      bg: "bg-red-50",
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Striving for excellence in everything we do, from events to projects to community building.",
      color: "from-yellow-500 to-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members", color: "text-blue-600" },
    { number: "50+", label: "Events Hosted", color: "text-green-600" },
    { number: "20+", label: "Projects Built", color: "text-red-600" },
    { number: "100+", label: "Skills Taught", color: "text-yellow-600" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full animate-float blur-xl"></div>
        <div
          className="absolute top-40 right-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-red-400/10 to-yellow-400/10 rounded-full animate-float blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full animate-float blur-xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 md:grid-cols-16 h-full gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-gray-400 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-1/4 left-16 w-4 h-4 bg-blue-500 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute top-1/3 right-16 w-6 h-6 bg-green-500 rotate-45 animate-pulse opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="relative z-10 container-responsive">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">About</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-gradient-x">
                GDGoC IET DAVV
              </span>
            </h2>
            <p
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Google Developer Groups on Campus at IET DAVV is a vibrant community of passionate students 
              building the future through technology, innovation, and collaborative learning.
            </p>
          </div>

          {/* Stats Section */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                data-index={index}
                className={`
                  about-card group relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
                  ${feature.bg} border border-white/50 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2
                  ${
                    visibleCards.has(index)
                      ? "animate-slide-up opacity-100"
                      : "opacity-0"
                  }
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div
            className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              To create an inclusive environment where students can learn, build, and grow together. 
              We believe in the power of collaboration, continuous learning, and using technology 
              to make a positive impact in our community and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
              >
                Join Our Community
              </a>
              <a
                href="/events"
                className="btn-animate border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
              >
                Explore Events
              </a>
            </div>
          </div>

          {/* Values Section */}
          <div
            className="mt-16 text-center animate-slide-up"
            style={{ animationDelay: "1s" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Our Core Values
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Innovation", "Collaboration", "Learning", "Inclusivity", "Excellence"].map((value, index) => (
                <span
                  key={index}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
