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
      description: "We embrace cutting-edge technologies and innovative solutions to solve real-world problems.",
    },
    {
      icon: "👥",
      title: "Community Driven",
      description: "Building a strong network of developers who support and learn from each other.",
    },
    {
      icon: "💡",
      title: "Skill Development",
      description: "Providing hands-on workshops and real-world projects to enhance technical skills.",
    },
    {
      icon: "⭐",
      title: "Excellence",
      description: "Striving for excellence in everything we do, from events to projects to community building.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About GDGoC IET DAVV
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Google Developer Groups on Campus at IET DAVV is a vibrant community
            of passionate students building the future through technology,
            innovation, and collaborative learning.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
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
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-200 text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            We're built different, so we build different. Our mission is to empower 
            future developers by bringing students passionate about technology together 
            and helping them grow their skills in tech, regardless of background.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gdsc-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Join Our Community
            </a>
            <a
              href="/events"
              onClick={() => window.scrollTo(0, 0)}
              className="border-2 border-gdsc-blue text-gdsc-blue px-6 py-3 rounded-lg hover:bg-gdsc-blue hover:text-white transition-colors duration-300 font-medium"
            >
              Explore Events
            </a>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-200 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Values
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            We believe you don't need to code to be a developer. We develop both 
            products and people by making Google technologies accessible to everyone 
            through workshops, events, and more. Dreamers, problem solvers, and 
            tinkerers: That's who we are.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Innovation",
              "Collaboration", 
              "Learning",
              "Inclusivity",
              "Excellence",
            ].map((value, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
