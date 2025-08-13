import { useEffect, useRef, useState } from "react";
import { getEvents, Event } from "@/lib/supabase";

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
        // Use data whether from database or fallback
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
      Workshop: "from-blue-500 to-blue-600",
      Bootcamp: "from-green-500 to-green-600",
      Seminar: "from-red-500 to-red-600",
      Sprint: "from-yellow-500 to-yellow-600",
      Competition: "from-purple-500 to-purple-600",
    };
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getEventTypeIcon = (type: string) => {
    const icons = {
      Workshop: "🛠️",
      Bootcamp: "⚡",
      Seminar: "📚",
      Sprint: "🏃‍♂️",
      Competition: "🏆",
    };
    return icons[type as keyof typeof icons] || "📅";
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-60 left-20 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/3 right-1/3 animate-float">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rotate-45 opacity-20"></div>
        </div>
        <div className="absolute top-2/3 left-1/4 animate-float-delayed">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-1/4 left-1/2 animate-pulse">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900">Upcoming</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 animate-gradient-x">
                Events
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join us for exciting workshops, seminars, and hands-on sessions
              designed to enhance your technical skills and expand your
              professional network.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full border-4 border-pink-200 border-t-pink-600 animate-ping opacity-20"></div>
            </div>
            <p className="text-xl text-gray-600 font-medium">
              Loading amazing events...
            </p>
          </div>
        ) : events.length === 0 ? (
          /* Empty State with Enhanced Design */
          <div
            className={`text-center py-20 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-8xl mb-8 animate-bounce">🎉</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Exciting Events Coming Soon!
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We're planning amazing workshops and events for our community.
              Join our WhatsApp group to be the first to know!
            </p>
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-block"
            >
              <span className="relative z-10">Get Notified</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        ) : (
          /* Events Grid with Enhanced Design */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Event Type Badge */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                  <div
                    className={`h-2 bg-gradient-to-r ${getEventTypeColor(event.type)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  ></div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getEventTypeColor(event.type)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="mr-2 text-base">
                          {getEventTypeIcon(event.type)}
                        </span>
                        {event.type}
                      </div>
                    </div>
                    <div className="text-right text-gray-700">
                      <div className="font-semibold text-gray-900">
                        {event.date}
                      </div>
                      <div className="text-sm">{event.time}</div>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-purple-600 transition-colors duration-300">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {event.description}
                </p>

                {/* Event Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        <span>👥</span>
                      </div>
                      <div>
                        <span className="font-medium">
                          {event.attendees} registered
                        </span>
                      </div>
                    </div>
                  </div>

                  {event.registration_link ? (
                    <a
                      href={event.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative overflow-hidden px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r ${getEventTypeColor(event.type)} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Register Now</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </span>
                    </a>
                  ) : (
                    <button
                      className={`group relative overflow-hidden px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r ${getEventTypeColor(event.type)} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Register Now</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section with Enhanced Design */}
        <div
          className={`relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/30 text-center shadow-2xl transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay:
              events.length > 0 ? `${events.length * 200 + 400}ms` : "600ms",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-3xl"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Don't Miss Out on Our Events!
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Stay updated with our latest events and workshops. Join our
              community to receive notifications about upcoming sessions and
              exclusive opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a
                href="/events"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative overflow-hidden border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-purple-600 hover:text-white"
              >
                <span className="relative z-10">View All Events</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
