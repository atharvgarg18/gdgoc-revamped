import { useEffect, useRef, useState } from "react";
import { getEvents, Event, isEventCompleted } from "@/lib/supabase";
import { Calendar, Users, Clock, ExternalLink } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
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

    loadEvents();

    return () => observer.disconnect();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await getEvents();

      if (result.success || result.data) {
        const eventsData = result.data || [];
        setEvents(eventsData.slice(0, 4)); // Show only first 4 events on homepage
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.warn("Error loading events, using fallback data");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      Workshop: "bg-blue-100 text-blue-800 border-blue-200",
      Bootcamp: "bg-green-100 text-green-800 border-green-200",
      Seminar: "bg-red-100 text-red-800 border-red-200",
      Sprint: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Competition: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getEventTypeIcon = (type: string) => {
    return <Calendar size={16} />;
  };


  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-br from-white via-red-50/20 to-yellow-50/30 overflow-hidden"
    >
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 right-16 w-6 h-6 bg-gradient-to-r from-gdsc-red to-gdsc-yellow rounded-full opacity-20 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-16 left-16 w-4 h-4 bg-gdsc-blue rounded-full opacity-25 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-8 h-8 bg-gradient-to-r from-gdsc-green to-gdsc-blue rounded-full opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gdsc-red via-gdsc-yellow to-gdsc-green bg-clip-text text-transparent mb-4">
              Upcoming Events
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us for exciting workshops, seminars, and hands-on sessions
            designed to enhance your technical skills and expand your
            professional network.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12 backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 shadow-xl">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gdsc-blue/30 border-t-gdsc-blue mx-auto mb-4"></div>
            </div>
            <p className="text-gray-700 font-medium">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="relative text-center py-16 backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl rounded-3xl">
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 text-gray-400">
                <Calendar size={64} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gdsc-blue to-gdsc-green bg-clip-text text-transparent mb-6">
                Exciting Events Coming Soon!
              </h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                We're planning amazing workshops and events for our community.
                Join our WhatsApp group to be the first to know!
              </p>
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gdsc-green to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                Get Notified
              </a>
            </div>
          </div>
        ) : (
          /* Events Grid - Mobile Optimized */
          <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 mb-12">
            {events.map((event, index) => {
              const isPassed = isEventCompleted(event.date);
              return (
                <div
                  key={event.id}
                  className={`relative group p-6 md:p-8 rounded-2xl backdrop-blur-lg bg-white/70 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  } ${isPassed ? "opacity-75" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative z-10">
                    {/* Event Header - Mobile Optimized */}
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-xl text-xs md:text-sm font-semibold border-2 ${getEventTypeColor(event.type)} shadow-lg`}
                        >
                          <span className="mr-2">{getEventTypeIcon(event.type)}</span>
                          {event.type}
                        </div>
                        {isPassed && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="backdrop-blur-sm bg-white/50 rounded-lg px-3 py-2 border border-white/30">
                        <div className="font-bold text-gray-900 text-sm md:text-lg">
                          {event.date}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium flex items-center">
                          <Clock size={12} className="mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gdsc-blue transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                      {event.description}
                    </p>

                    {/* Event Footer - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div className="flex items-center backdrop-blur-sm bg-white/60 rounded-lg px-3 py-2 border border-white/30">
                        <Users size={16} className="mr-2 text-gdsc-green" />
                        <span className="font-bold text-gray-900 text-sm">
                          {event.attendees} registered
                        </span>
                      </div>

                      {!isPassed && (
                        <div className="w-full sm:w-auto">
                          {event.registration_link ? (
                            <a
                              href={event.registration_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-gdsc-blue to-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                            >
                              <span>Register Now</span>
                              <ExternalLink size={14} className="ml-2" />
                            </a>
                          ) : (
                            <button className="w-full sm:w-auto bg-gradient-to-r from-gdsc-blue to-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
                              Register Now
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Single CTA */}
        <div className="text-center">
          <a
            href="/events"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center bg-gradient-to-r from-gdsc-red to-red-600 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Events
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
