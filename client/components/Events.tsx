import { useEffect, useRef, useState } from "react";
import { getEvents, Event, isEventCompleted } from "@/lib/supabase";
import { Calendar, Users, Clock, ExternalLink } from "lucide-react";
import { handleLinkClick, isValidUrl } from "@/lib/urlUtils";

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

  const getEventGradient = (type: string) => {
    const gradients = {
      Workshop: "from-blue-500 to-blue-600",
      Bootcamp: "from-green-500 to-green-600",
      Seminar: "from-red-500 to-red-600",
      Sprint: "from-yellow-500 to-yellow-600",
      Competition: "from-purple-500 to-purple-600",
    };
    return gradients[type as keyof typeof gradients] || "from-gray-500 to-gray-600";
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      Workshop: "bg-blue-100 text-blue-800 border-blue-200",
      Bootcamp: "bg-green-100 text-green-800 border-green-200",
      Seminar: "bg-red-100 text-red-800 border-red-200",
      Sprint: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Competition: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getEventTypeIcon = (type: string) => {
    const icons = {
      Workshop: "🛠️",
      Bootcamp: "🚀",
      Seminar: "📚",
      Sprint: "⚡",
      Competition: "🏆",
    };
    return icons[type as keyof typeof icons] || "📅";
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 bg-gradient-to-br from-white via-red-50/20 to-yellow-50/30 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-16 w-10 h-10 bg-gradient-to-r from-gdsc-red to-gdsc-yellow rounded-full opacity-20 animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-1/3 left-12 w-6 h-6 bg-gdsc-blue rotate-45 opacity-25 animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-32 right-20 w-8 h-8 bg-gradient-to-r from-gdsc-green to-gdsc-blue rounded-full opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-16 left-16 w-4 h-4 bg-gdsc-yellow rounded-full opacity-35 animate-float" style={{ animationDelay: "0.8s" }}></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-r from-gdsc-red to-gdsc-green rounded-full opacity-15 animate-float" style={{ animationDelay: "3s" }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative mb-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gdsc-red via-gdsc-yellow to-gdsc-green bg-clip-text text-transparent mb-4">
              Upcoming Events
            </h2>
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-gdsc-blue rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gdsc-green rotate-45 animate-pulse opacity-50" style={{ animationDelay: "0.5s" }}></div>
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
              <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-gdsc-red animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
            </div>
            <p className="text-gray-700 font-medium">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="relative text-center py-20 backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-8 left-8 w-3 h-3 bg-gdsc-blue rounded-full animate-ping" style={{ animationDelay: "0s" }}></div>
              <div className="absolute top-12 right-12 w-2 h-2 bg-gdsc-red rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
              <div className="absolute bottom-12 left-16 w-2 h-2 bg-gdsc-yellow rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-gdsc-green rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-8xl mb-8 transform hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gdsc-blue to-gdsc-green bg-clip-text text-transparent mb-6">
                Exciting Events Coming Soon!
              </h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
                We're planning amazing workshops and events for our community.
                Join our WhatsApp group to be the first to know!
              </p>
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gradient-to-r from-gdsc-green to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl inline-block group"
              >
                <span className="relative z-10">Get Notified</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>
          </div>
        ) : (
          /* Enhanced Events Grid */
          <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 mb-12">
            {events.map((event, index) => {
              const isPassed = isEventCompleted(event.date);
              return (
                <div
                  key={event.id}
                  className={`relative group p-6 md:p-8 rounded-2xl backdrop-blur-lg bg-white/80 border border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  } ${isPassed ? "opacity-90" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Colored top accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getEventGradient(event.type)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  ></div>

                  {/* Gradient overlay on hover - Fixed to prevent disappearing */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getEventGradient(event.type)} opacity-0 group-hover:opacity-[0.01] transition-opacity duration-500 rounded-2xl pointer-events-none`}
                  ></div>

                  <div className="relative z-10">
                    {/* Event Header - Mobile Optimized */}
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-xl text-xs md:text-sm font-semibold border-2 ${getEventTypeColor(event.type)} shadow-lg group-hover:scale-105 transition-transform duration-300`}
                        >
                          <span className="mr-2">
                            {getEventTypeIcon(event.type)}
                          </span>
                          {event.type}
                        </div>
                        {isPassed && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="backdrop-blur-sm bg-white/60 rounded-lg px-3 py-2 border border-white/30">
                        <div className="font-bold text-gray-900 text-sm md:text-lg">
                          {event.date}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">
                          {event.time}
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <h3
                      className={`text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${getEventGradient(event.type)} transition-all duration-300`}
                    >
                      {event.title}
                    </h3>

                    <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                      {event.description}
                    </p>

                    {/* Event Footer - Always show registration buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="flex items-center backdrop-blur-sm bg-white/70 rounded-lg px-3 py-2 border border-white/30">
                        <Users size={16} className="mr-2 text-gdsc-green" />
                        <span className="font-bold text-gray-900 text-sm">
                          {event.attendees} registered
                        </span>
                      </div>

                      {/* Show registration button for all events, but disable for past events */}
                      <div className="w-full sm:w-auto">
                        {event.registration_link && isValidUrl(event.registration_link) ? (
                          <button
                            onClick={isPassed ? undefined : handleLinkClick(event.registration_link)}
                            disabled={isPassed}
                            className={`w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r ${getEventGradient(event.type)} text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base group/btn ${
                              isPassed ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <span>{isPassed ? 'Registration Closed' : 'Register Now'}</span>
                            {!isPassed && (
                              <ExternalLink
                                size={14}
                                className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                              />
                            )}
                          </button>
                        ) : (
                          <button
                            disabled
                            className={`w-full sm:w-auto bg-gradient-to-r ${getEventGradient(event.type)} text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base opacity-50 cursor-not-allowed`}
                          >
                            {isPassed ? 'Event Completed' : 'Registration Coming Soon'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Floating decorative element */}
                  <div
                    className={`absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-r ${getEventGradient(event.type)} rounded-full opacity-60 group-hover:animate-bounce`}
                  ></div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="relative group p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-gradient-to-br from-white/70 to-white/50 border border-white/30 shadow-2xl text-center overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-6 left-6 w-3 h-3 bg-gdsc-red rounded-full animate-ping" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-12 right-8 w-2 h-2 bg-gdsc-yellow rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-gdsc-green rounded-full animate-ping" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-6 right-6 w-3 h-3 bg-gdsc-blue rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gdsc-red via-gdsc-yellow to-gdsc-green bg-clip-text text-transparent mb-6">
              Don't Miss Out on Our Events!
            </h3>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
              Stay updated with our latest events and workshops. Join our
              community to receive notifications about upcoming sessions and
              exclusive opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gradient-to-r from-gdsc-green to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a
                href="/events"
                onClick={() => window.scrollTo(0, 0)}
                className="relative overflow-hidden border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-xl hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/20"
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
