import { useEffect, useRef, useState } from "react";
import { Event } from "@shared/admin-types";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fetch events
    fetchEvents();

    return () => observer.disconnect();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Enhanced Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gdsc-blue/5 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gdsc-red/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gdsc-yellow/5 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gdsc-green/5 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 h-full gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-gray-400 animate-pulse" 
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Section Header with enhanced animations */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
              Upcoming <span className="text-gdsc-blue animate-pulse">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Join us for exciting workshops, seminars, and hands-on sessions designed to 
              enhance your technical skills and expand your network.
            </p>
          </div>

          {/* Events Grid with staggered animations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-105 ${
                  isVisible ? "animate-slide-up" : "opacity-0"
                } group`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)"
                }}
              >
                <div className={`h-2 ${
                  event.color === "gdsc-blue" ? "bg-gdsc-blue" :
                  event.color === "gdsc-red" ? "bg-gdsc-red" :
                  event.color === "gdsc-yellow" ? "bg-gdsc-yellow" :
                  "bg-gdsc-green"
                } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                
                <div className="p-6 relative">
                  {/* Subtle background pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-transparent rounded-bl-full"></div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 group-hover:scale-110 ${
                      event.color === "gdsc-blue" ? "bg-gdsc-blue/10 text-gdsc-blue" :
                      event.color === "gdsc-red" ? "bg-gdsc-red/10 text-gdsc-red" :
                      event.color === "gdsc-yellow" ? "bg-gdsc-yellow/10 text-gdsc-yellow" :
                      "bg-gdsc-green/10 text-gdsc-green"
                    }`}>
                      {event.type}
                    </span>
                    <div className="text-right text-sm text-gray-500">
                      <div className="transform group-hover:scale-105 transition-transform duration-300">{event.date}</div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300" style={{ animationDelay: "0.1s" }}>{event.time}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gdsc-blue transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      <span className="mr-1 transform group-hover:scale-125 transition-transform duration-300">👥</span>
                      {event.attendees} registered
                    </div>
                    <button className={`text-white px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 hover:shadow-lg ${
                      event.color === "gdsc-blue" ? "bg-gdsc-blue hover:bg-blue-600" :
                      event.color === "gdsc-red" ? "bg-gdsc-red hover:bg-red-600" :
                      event.color === "gdsc-yellow" ? "bg-gdsc-yellow hover:bg-yellow-600" :
                      "bg-gdsc-green hover:bg-green-600"
                    }`}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center mt-16">
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-slide-up">
                Don't Miss Out on Our Events!
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Stay updated with our latest events and workshops. Join our community 
                to receive notifications about upcoming sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gdsc-blue text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-up inline-block"
                  style={{ animationDelay: "0.4s" }}
                >
                  Join Our Community
                </a>
                <button className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-3 rounded-full hover:bg-gdsc-blue hover:text-white transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
