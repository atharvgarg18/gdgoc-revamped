import { useState, useEffect } from "react";
import { getEvents, Event, isEventCompleted } from "@/lib/supabase";
import { handleLinkClick, isValidUrl } from "@/lib/urlUtils";
import { Calendar, Users, Clock, ExternalLink, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    loadEvents();
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
      if (result.success || result.data) {
        setEvents(result.data || []);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter(
    (event) => selectedType === "all" || event.type === selectedType,
  );

  const eventTypes = [
    { value: "all", label: "All Events", count: events.length },
    ...Array.from(new Set(events.map((e) => e.type))).map((type) => ({
      value: type,
      label: type,
      count: events.filter((e) => e.type === type).length,
    })),
  ].filter((type) => type.count > 0);

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

  const getEventBadgeColor = (type: string) => {
    const colors = {
      Workshop: "bg-blue-100 text-blue-800 border-blue-200",
      Bootcamp: "bg-green-100 text-green-800 border-green-200",
      Seminar: "bg-red-100 text-red-800 border-red-200",
      Sprint: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Competition: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getEventIcon = (type: string) => {
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
    <div className="min-h-screen">
      <SEO
        title="Events"
        description="Discover exciting workshops, seminars, and hands-on sessions organized by GDGoC IET DAVV. Join our tech events to enhance your skills and expand your network."
        keywords="GDGoC events, tech workshops, programming seminars, coding bootcamps, developer meetups, IET DAVV events, technology workshops, student events"
      />

      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Circles */}
            <div className="absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-float blur-xl"></div>
            <div
              className="absolute top-40 right-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-28 md:w-56 h-28 md:h-56 bg-gradient-to-r from-red-400/20 to-yellow-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "1s" }}
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
            <div className="absolute top-1/4 left-16 w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-blue-500 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-red-500 rotate-12 animate-bounce"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Events &</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-green-600 animate-gradient-x">
                  Workshops
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Join us for exciting workshops, seminars, and hands-on sessions
                designed to enhance your technical skills and expand your
                professional network.
              </p>

              {/* Stats */}
              <div
                className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600">
                    {events.length}+
                  </div>
                  <div className="text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">
                    {eventTypes.length - 1}
                  </div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">
                    {events.reduce((sum, event) => sum + event.attendees, 0)}+
                  </div>
                  <div className="text-gray-600">Attendees</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("events-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-animate border-2 border-green-600 text-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Explore Events
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-green-600 transition-colors cursor-pointer"
              onClick={() =>
                document
                  .getElementById("events-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section
          id="events-section"
          className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-1/3 right-20 w-6 h-6 bg-yellow-400 rotate-45 opacity-25 animate-float" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-40 left-20 w-4 h-4 bg-red-400 rounded-full opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
          </div>

          <div className="relative z-10 container-responsive">
            {/* Filter Section */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
                Explore by Category
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`
                      px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
                      ${
                        selectedType === type.value
                          ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                          : "bg-white/70 text-gray-700 hover:bg-white/90 hover:shadow-md border border-white/30"
                      }
                    `}
                  >
                    {type.label}
                    <span className="ml-2 text-xs opacity-75">
                      ({type.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-20 backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 shadow-xl">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500/30 border-t-green-500"></div>
                    <div className="absolute inset-0 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-500" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Loading amazing events...
                </h3>
              </div>
            ) : filteredEvents.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 backdrop-blur-lg bg-white/70 rounded-3xl border border-white/30 shadow-2xl">
                <div className="text-8xl mb-8 animate-bounce">📅</div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  Exciting Events Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                  We're planning amazing workshops and events for our community.
                  Stay tuned for updates!
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-medium inline-block transform hover:scale-105 group"
                >
                  <span className="relative z-10">Get Notified</span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </div>
            ) : (
              /* Enhanced Events Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => {
                  const isPassed = isEventCompleted(event.date);
                  return (
                    <div
                      key={event.id}
                      data-index={index}
                      className={`
                        event-card group relative rounded-2xl backdrop-blur-lg bg-white/80 border border-white/30 shadow-xl 
                        hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2
                        ${
                          visibleCards.has(index)
                            ? "animate-slide-up opacity-100"
                            : "opacity-0"
                        }
                        ${isPassed ? "opacity-75" : ""}
                      `}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Event Header Bar */}
                      <div
                        className={`h-2 bg-gradient-to-r ${getEventTypeColor(event.type)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      ></div>

                      {/* Event Image */}
                      {event.image && (
  <div className="relative aspect-square overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      style={{ aspectRatio: '1 / 1', width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                          {/* Event Type Badge */}
                          <div
                            className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold ${getEventBadgeColor(event.type)} shadow-lg backdrop-blur-sm`}
                          >
                            <span className="mr-1">{getEventIcon(event.type)}</span>
                            {event.type}
                          </div>

                          {/* Status Badge */}
                          {isPassed && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-gray-100/90 text-gray-600 rounded-full text-xs font-medium backdrop-blur-sm">
                              Completed
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6">
                        {/* Event Meta */}
                        <div className="flex justify-between items-start mb-4">
                          {!event.image && (
                            <div className="flex items-center gap-3">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold ${getEventBadgeColor(event.type)} shadow-lg`}
                              >
                                <span className="mr-1">{getEventIcon(event.type)}</span>
                                {event.type}
                              </div>
                              {isPassed && (
                                <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  Completed
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Date and Time */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/60 rounded-lg px-3 py-2 border border-white/30">
                            <Calendar size={16} className="text-green-600" />
                            <span className="font-semibold text-gray-900 text-sm">
                              {event.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/60 rounded-lg px-3 py-2 border border-white/30">
                            <Clock size={16} className="text-blue-600" />
                            <span className="text-sm text-gray-600">{event.time}</span>
                          </div>
                        </div>

                        {/* Event Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 leading-tight line-clamp-2">
                          {event.title}
                        </h3>

                        <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">
                          {event.description}
                        </p>

                        {/* Event Footer */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div className="flex items-center backdrop-blur-sm bg-white/60 rounded-lg px-3 py-2 border border-white/30">
                            <Users size={16} className="text-green-600 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {event.attendees} registered
                            </span>
                          </div>

                          {/* Always show registration button */}
                          <div className="w-full sm:w-auto">
                            {event.registration_link && isValidUrl(event.registration_link) ? (
                              <button
                                onClick={isPassed ? undefined : handleLinkClick(event.registration_link)}
                                disabled={isPassed}
                                className={`w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r ${getEventTypeColor(event.type)} text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm group/btn ${
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
                                className={`w-full sm:w-auto bg-gradient-to-r ${getEventTypeColor(event.type)} text-white px-4 py-2 rounded-xl font-semibold text-sm opacity-50 cursor-not-allowed`}
                              >
                                {isPassed ? 'Event Completed' : 'Registration Coming Soon'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event.type)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                      ></div>

                      {/* Floating Decorative Element */}
                      <div
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full animate-float opacity-60 shadow-lg"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container-responsive">
            <div className="text-center bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Join our community of passionate developers and participate in
                hands-on learning experiences that will accelerate your career
                growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gdsc-blue text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <a
                  href="/projects"
                  className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-lg hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  View Our Projects
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
