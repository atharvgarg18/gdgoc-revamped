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
    { number: "500+", label: "Active Members", color: "text-gdsc-blue", bgColor: "from-blue-500 to-blue-600" },
    { number: "50+", label: "Events Hosted", color: "text-gdsc-red", bgColor: "from-red-500 to-red-600" },
    { number: "20+", label: "Projects Built", color: "text-gdsc-yellow", bgColor: "from-yellow-500 to-yellow-600" },
    { number: "100+", label: "Skills Taught", color: "text-gdsc-green", bgColor: "from-green-500 to-green-600" },
  ];

  const features = [
    {
      icon: Target,
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
      color: "from-blue-500 to-blue-600",
      hoverColor: "group-hover:text-blue-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Building a strong network of developers who support and learn from each other.",
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:text-green-600"
    },
    {
      icon: Lightbulb,
      title: "Skill Development",
      description:
        "Providing hands-on workshops and real-world projects to enhance technical skills.",
      color: "from-yellow-500 to-yellow-600",
      hoverColor: "group-hover:text-yellow-600"
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Striving for excellence in everything we do, from events to projects to community building.",
      color: "from-red-500 to-red-600",
      hoverColor: "group-hover:text-red-600"
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 overflow-hidden"
    >
      {/* Enhanced Background Elements with Colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-r from-gdsc-blue to-gdsc-red rounded-full opacity-15 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-gdsc-yellow to-gdsc-green rotate-45 opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-r from-gdsc-green to-gdsc-yellow rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-4 h-4 bg-gdsc-red rotate-45 opacity-25 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-16 w-10 h-10 bg-gradient-to-r from-gdsc-blue to-gdsc-green rounded-full opacity-15 animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 gap-4 h-full">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-gray-300 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Enhanced Animation */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-4 animate-gradient-x">
              About GDGoC IET DAVV
            </h2>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gdsc-yellow rounded-full animate-ping opacity-60"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gdsc-green rotate-45 animate-pulse opacity-50"></div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Google Developer Groups on Campus at IET DAVV is a vibrant community
            of passionate students building the future through technology,
            innovation, and collaborative learning.
          </p>
        </div>

        {/* Enhanced Stats with Colors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`relative text-center p-6 rounded-2xl backdrop-blur-lg bg-white/80 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Colored top border */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${stat.bgColor} rounded-b-full`}></div>
              
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative z-10">
                <div
                  className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-700 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
              
              {/* Decorative corner element */}
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r ${stat.bgColor} rounded-full opacity-60 group-hover:animate-ping`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced Features Grid with Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`relative group p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Colored side accent */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b ${feature.color} rounded-r-full transition-all duration-500 group-hover:h-24`}></div>
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                
                <div className="relative z-10 pl-4">
                  <div className={`w-12 h-12 text-gray-600 mb-6 transform group-hover:scale-110 transition-all duration-300 ${feature.hoverColor}`}>
                    <IconComponent size={48} />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 ${feature.hoverColor}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Floating decorative element */}
                <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full opacity-40 group-hover:animate-bounce`}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Mission & Values with Subtle Animation */}
        <div className="relative group p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-gradient-to-br from-white/80 to-white/60 border border-white/30 shadow-2xl overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-6 left-6 w-2 h-2 bg-gdsc-blue rounded-full animate-ping"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-12 right-8 w-1 h-1 bg-gdsc-red rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-8 left-12 w-1 h-1 bg-gdsc-green rounded-full animate-ping"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-6 right-6 w-2 h-2 bg-gdsc-yellow rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-green bg-clip-text text-transparent mb-8 animate-gradient-x">
              Our Mission & Values
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="group/card">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gdsc-blue to-gdsc-red rounded-full flex items-center justify-center mr-3">
                    <Target size={16} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 group-hover/card:text-gdsc-blue transition-colors duration-300">
                    Mission
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We're built different, so we build different. Our mission is
                  to empower future developers by bringing students passionate
                  about technology together and helping them grow their skills
                  in tech, regardless of background.
                </p>
              </div>
              
              <div className="group/card">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gdsc-green to-gdsc-yellow rounded-full flex items-center justify-center mr-3">
                    <Award size={16} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 group-hover/card:text-gdsc-green transition-colors duration-300">
                    Values
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe you don't need to code to be a developer. We
                  develop both products and people by making Google technologies
                  accessible to everyone through workshops, events, and more.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "Innovation", color: "from-blue-500 to-blue-600" },
                    { value: "Collaboration", color: "from-green-500 to-green-600" },
                    { value: "Learning", color: "from-red-500 to-red-600" },
                    { value: "Inclusivity", color: "from-yellow-500 to-yellow-600" },
                    { value: "Excellence", color: "from-purple-500 to-purple-600" },
                  ].map((item, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-medium rounded-full transform hover:scale-105 transition-transform duration-300 shadow-lg`}
                    >
                      {item.value}
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
                className="group/btn relative overflow-hidden bg-gradient-to-r from-gdsc-blue to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
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
      </div>
    </section>
  );
}
