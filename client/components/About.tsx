import { useEffect, useRef, useState } from "react";
import { Users, Target, Lightbulb, Award } from "lucide-react";

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
      icon: Target,
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Building a strong network of developers who support and learn from each other.",
    },
    {
      icon: Lightbulb,
      title: "Skill Development",
      description:
        "Providing hands-on workshops and real-world projects to enhance technical skills.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Striving for excellence in everything we do, from events to projects to community building.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 overflow-hidden"
    >
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-r from-gdsc-blue to-gdsc-red rounded-full opacity-15 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-r from-gdsc-green to-gdsc-yellow rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-4 h-4 bg-gdsc-yellow rotate-45 opacity-25 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-4">
              About GDGoC IET DAVV
            </h2>
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
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`relative group p-8 rounded-2xl backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 text-gdsc-blue mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gdsc-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission & Values Combined */}
        <div className="relative group p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl text-center overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-8">
              Our Mission & Values
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Mission
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  We're built different, so we build different. Our mission is
                  to empower future developers by bringing students passionate
                  about technology together and helping them grow their skills
                  in tech, regardless of background.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Values</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe you don't need to code to be a developer. We
                  develop both products and people by making Google technologies
                  accessible to everyone through workshops, events, and more.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Innovation",
                    "Collaboration",
                    "Learning",
                    "Inclusivity",
                    "Excellence",
                  ].map((value, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gdsc-blue to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join Our Community
              </a>
              <a
                href="/events"
                onClick={() => window.scrollTo(0, 0)}
                className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-xl hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
