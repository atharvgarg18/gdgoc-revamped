import { useEffect, useRef, useState } from "react";
import { getEvents, Event } from "@/lib/supabase";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
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

    // Load events from Supabase
    loadEvents();

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

    const cards = document.querySelectorAll(".event-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [events]);

  const loadEvents = async () => {
    try {
      const result = await getEvents();
      if (result.success) {
        setEvents(result.data.slice(0, 4)); // Show only first 4 events on homepage
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      Workshop: "from-blue-500 to-blue-600",
      Bootcamp: "from-green-500 to-green-600",
      Seminar: "from-red-500 to-red-600",
      Sprint: "from-yellow-500 to-yellow-600",
      Competition: "from-purple-500 to-purple-600",
    };
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getEventBgColor = (type: string) => {
    const colors = {
      Workshop: "bg-blue-50",
      Bootcamp: "bg-green-50",
      Seminar: "bg-red-50",
      Sprint: "bg-yellow-50",
      Competition: "bg-purple-50",
    };
    return colors[type as keyof typeof colors] || "bg-gray-50";
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 right-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full animate-float blur-xl"></div>
        <div
          className="absolute bottom-32 left-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-yellow-400/10 to-red-400/10 rounded-full animate-float blur-xl"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full animate-float blur-xl"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 md:grid-cols-12 h-full gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-gray-400 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 left-16 w-5 h-5 bg-green-500 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute bottom-1/3 right-16 w-4 h-4 bg-blue-500 rotate-45 animate-pulse opacity-20"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="relative z-10 container-responsive">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Upcoming</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-green-600 animate-gradient-x">
                Events
              </span>
            </h2>
            <p
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Join us for exciting workshops, seminars, and hands-on sessions designed 
              to enhance your technical skills and expand your professional network.
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-4 h-4 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-4 h-4 bg-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <div
                    className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Loading amazing events...
              </h3>
            </div>
          ) : events.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="text-8xl mb-8">📅</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Exciting Events Coming Soon!
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                We're planning amazing workshops and events for our community.
                Join our WhatsApp group to be the first to know!
              </p>
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block transform hover:scale-105"
              >
                Get Notified
              </a>
            </div>
          ) : (
            /* Events Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  data-index={index}
                  className={`
                    event-card group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
                    overflow-hidden border border-white/50 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2
                    ${getEventBgColor(event.type)}
                    ${
                      visibleCards.has(index)
                        ? "animate-slide-up opacity-100"
                        : "opacity-0"
                    }
                  `}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Event Header Bar */}
                  <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(event.type)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                  <div className="p-8">
                    {/* Event Meta */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4 sm:gap-0">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getEventTypeColor(event.type)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="mr-2">
                          {event.type === "Workshop" && "🛠️"}
                          {event.type === "Bootcamp" && "🚀"}
                          {event.type === "Seminar" && "📚"}
                          {event.type === "Sprint" && "⚡"}
                          {event.type === "Competition" && "🏆"}
                        </span>
                        {event.type}
                      </div>
                      <div className="text-right text-gray-600">
                        <div className="font-semibold text-gray-900">{event.date}</div>
                        <div className="text-sm">{event.time}</div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Footer */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                        <span className="mr-2 text-xl">👥</span>
                        <span className="font-medium">{event.attendees} registered</span>
                      </div>
                      
                      {event.registration_link ? (
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r ${getEventTypeColor(event.type)} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                        >
                          <span className="mr-2">🎯</span>
                          Register Now
                        </a>
                      ) : (
                        <button className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r ${getEventTypeColor(event.type)} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                          <span className="mr-2">🎯</span>
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                  {/* Floating Decorative Element */}
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full animate-float opacity-60 shadow-lg"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  ></div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div
            className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Don't Miss Out on Our Events!
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay updated with our latest events and workshops. Join our community 
              to receive notifications about upcoming sessions and exclusive opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
              >
                Join Our Community
              </a>
              <a
                href="/events"
                className="btn-animate border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
              >
                View All Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
