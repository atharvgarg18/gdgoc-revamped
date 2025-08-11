import { useEffect, useRef, useState } from "react";
import { getEvents, Event } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface EventFilter {
  type: string;
  label: string;
  color: string;
}

const eventFilters: EventFilter[] = [
  { type: "all", label: "All Events", color: "gdsc-blue" },
  { type: "Workshop", label: "Workshops", color: "gdsc-blue" },
  { type: "Bootcamp", label: "Bootcamps", color: "gdsc-green" },
  { type: "Seminar", label: "Seminars", color: "gdsc-red" },
  { type: "Hackathon", label: "Hackathons", color: "gdsc-yellow" },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
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
      { threshold: 0.1 },
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
  }, [filteredEvents]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.type === activeFilter));
    }
    setVisibleCards(new Set()); // Reset visible cards when filter changes
  }, [events, activeFilter]);

  const loadEvents = async () => {
    setIsLoading(true);
    const result = await getEvents();
    if (result.success) {
      setEvents(result.data);
    }
    setIsLoading(false);
  };

  // Auto-refresh events every 30 seconds to pick up real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      loadEvents();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (filterType: string) => {
    setActiveFilter(filterType);
  };

  const getEventTypeStats = () => {
    const stats: { [key: string]: number } = {};
    events.forEach(event => {
      stats[event.type] = (stats[event.type] || 0) + 1;
    });
    return stats;
  };

  const stats = getEventTypeStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 md:top-20 left-4 md:left-10 w-4 h-4 md:w-6 md:h-6 bg-gdsc-blue rounded-full animate-float opacity-60"></div>
          <div
            className="absolute top-32 md:top-40 right-8 md:right-20 w-5 h-5 md:w-8 md:h-8 bg-gdsc-red rotate-45 animate-float opacity-50"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 md:bottom-40 left-8 md:left-20 w-6 h-6 md:w-10 md:h-10 bg-gdsc-yellow rounded-full animate-float opacity-70"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-16 md:bottom-20 right-4 md:right-10 w-8 h-8 md:w-12 md:h-12 bg-gdsc-green rounded-full animate-float opacity-40"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Large decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 md:w-60 md:h-60 bg-gradient-to-br from-gdsc-blue/10 to-gdsc-blue/5 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 md:w-80 md:h-80 bg-gradient-to-tr from-gdsc-green/10 to-gdsc-green/5 rounded-full"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 md:grid-cols-12 h-full gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-gray-400"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 container-responsive text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* GDSC Logo */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-blue animate-pulse"></div>
                  <div
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-red animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-yellow animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <div
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gdsc-green animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Events & <span className="text-gdsc-blue">Workshops</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Join us for exciting workshops, seminars, hackathons, and hands-on sessions designed to enhance your technical skills and expand your network in the developer community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="group">
                <div className="text-2xl md:text-3xl font-bold text-gdsc-blue group-hover:scale-110 transition-transform duration-300">
                  {events.length}+
                </div>
                <div className="text-gray-600 text-sm md:text-base">Total Events</div>
              </div>
              <div className="group">
                <div className="text-2xl md:text-3xl font-bold text-gdsc-red group-hover:scale-110 transition-transform duration-300">
                  {stats.Workshop || 0}
                </div>
                <div className="text-gray-600 text-sm md:text-base">Workshops</div>
              </div>
              <div className="group">
                <div className="text-2xl md:text-3xl font-bold text-gdsc-yellow group-hover:scale-110 transition-transform duration-300">
                  {stats.Bootcamp || 0}
                </div>
                <div className="text-gray-600 text-sm md:text-base">Bootcamps</div>
              </div>
              <div className="group">
                <div className="text-2xl md:text-3xl font-bold text-gdsc-green group-hover:scale-110 transition-transform duration-300">
                  {stats.Hackathon || 0}
                </div>
                <div className="text-gray-600 text-sm md:text-base">Hackathons</div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section ref={sectionRef} className="py-16 md:py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 md:top-20 left-4 md:left-10 w-20 md:w-32 h-20 md:h-32 bg-gdsc-blue/5 rounded-full animate-float"></div>
          <div
            className="absolute top-32 md:top-40 right-8 md:right-20 w-16 md:w-24 h-16 md:h-24 bg-gdsc-red/5 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 md:bottom-32 left-8 md:left-1/4 w-24 md:w-40 h-24 md:h-40 bg-gdsc-yellow/5 rounded-full animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute bottom-10 md:bottom-20 right-4 md:right-1/3 w-18 md:w-28 h-18 md:h-28 bg-gdsc-green/5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 container-responsive">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Filter Buttons */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
                Explore Our <span className="text-gdsc-blue">Events</span>
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                {eventFilters.map((filter) => (
                  <button
                    key={filter.type}
                    onClick={() => handleFilterChange(filter.type)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 touch-target ${
                      activeFilter === filter.type
                        ? `text-white shadow-lg ${
                            filter.color === "gdsc-blue"
                              ? "bg-gdsc-blue"
                              : filter.color === "gdsc-red"
                                ? "bg-gdsc-red"
                                : filter.color === "gdsc-yellow"
                                  ? "bg-gdsc-yellow"
                                  : "bg-gdsc-green"
                          }`
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gdsc-blue hover:text-gdsc-blue"
                    }`}
                  >
                    {filter.label}
                    {filter.type !== "all" && stats[filter.type] && (
                      <span className="ml-2 text-sm">({stats[filter.type]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            {isLoading ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 bg-gdsc-red rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-gdsc-yellow rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-gdsc-green rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Loading Events...
                </h3>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 bg-gdsc-red rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-gdsc-yellow rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-gdsc-green rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {activeFilter === "all" ? "Exciting Events Coming Soon!" : `No ${activeFilter}s Found`}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {activeFilter === "all" 
                    ? "We're planning amazing workshops and events for our community." 
                    : `We're working on organizing ${activeFilter.toLowerCase()}s. Check back soon!`}
                </p>
                {activeFilter !== "all" && (
                  <button
                    onClick={() => handleFilterChange("all")}
                    className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-6 py-3 rounded-full hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium"
                  >
                    View All Events
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    data-index={index}
                    className={`event-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover ${
                      visibleCards.has(index)
                        ? "animate-slide-up opacity-100"
                        : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)",
                    }}
                  >
                    <div
                      className={`h-2 ${
                        event.color === "gdsc-blue"
                          ? "bg-gdsc-blue"
                          : event.color === "gdsc-red"
                            ? "bg-gdsc-red"
                            : event.color === "gdsc-yellow"
                              ? "bg-gdsc-yellow"
                              : "bg-gdsc-green"
                      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    ></div>

                    <div className="p-6 relative">
                      {/* Subtle background pattern */}
                      <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-transparent rounded-bl-full"></div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 relative z-10 gap-3 sm:gap-0">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 group-hover:scale-110 ${
                            event.color === "gdsc-blue"
                              ? "bg-gdsc-blue/10 text-gdsc-blue"
                              : event.color === "gdsc-red"
                                ? "bg-gdsc-red/10 text-gdsc-red"
                                : event.color === "gdsc-yellow"
                                  ? "bg-gdsc-yellow/10 text-gdsc-yellow"
                                  : "bg-gdsc-green/10 text-gdsc-green"
                          }`}
                        >
                          {event.type}
                        </span>
                        <div className="text-sm text-gray-500 text-left sm:text-right">
                          <div className="transform group-hover:scale-105 transition-transform duration-300">
                            {event.date}
                          </div>
                          <div
                            className="transform group-hover:scale-105 transition-transform duration-300"
                            style={{ animationDelay: "0.1s" }}
                          >
                            {event.time}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-gdsc-blue transition-colors duration-300 leading-tight">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                        {event.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                          <span className="mr-1 transform group-hover:scale-125 transition-transform duration-300">
                            👥
                          </span>
                          {event.attendees} registered
                        </div>
                        {event.registration_link ? (
                          <a
                            href={event.registration_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-white px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 hover:shadow-lg text-center font-medium touch-target ${
                              event.color === "gdsc-blue"
                                ? "bg-gdsc-blue hover:bg-blue-600"
                                : event.color === "gdsc-red"
                                  ? "bg-gdsc-red hover:bg-red-600"
                                  : event.color === "gdsc-yellow"
                                    ? "bg-gdsc-yellow hover:bg-yellow-600"
                                    : "bg-gdsc-green hover:bg-green-600"
                            }`}
                          >
                            Register
                          </a>
                        ) : (
                          <button
                            className={`text-white px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:scale-105 hover:shadow-lg font-medium touch-target ${
                              event.color === "gdsc-blue"
                                ? "bg-gdsc-blue hover:bg-blue-600"
                                : event.color === "gdsc-red"
                                  ? "bg-gdsc-red hover:bg-red-600"
                                  : event.color === "gdsc-yellow"
                                    ? "bg-gdsc-yellow hover:bg-yellow-600"
                                    : "bg-gdsc-green hover:bg-green-600"
                            }`}
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Floating element */}
                    <div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-gdsc-yellow rounded-full animate-float opacity-60"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-16 md:mt-20">
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gdsc-blue/5 to-gdsc-green/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Don't Miss Out on Our <span className="text-gdsc-blue">Events</span>!
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    Stay updated with our latest events and workshops. Join our community to receive notifications about upcoming sessions and be part of our growing developer network.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block font-semibold text-lg"
                    >
                      Join Our Community
                    </a>
                    <a
                      href="/contact"
                      className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-semibold text-lg"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
