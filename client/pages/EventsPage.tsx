import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function EventsPage() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  // Fetch events with React Query for real-time updates
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['public-events'],
    queryFn: async (): Promise<Event[]> => {
      const response = await fetch("/api/events");
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 10000, // Consider data fresh for 10 seconds
  });

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

  return (
    <div className="min-h-screen">
      <SEO
        title="Events"
        description="Discover exciting workshops, seminars, and hands-on sessions organized by GDGoC IET DAVV. Join our tech events to enhance your skills and expand your network in the developer community."
        keywords="GDGoC events, tech workshops, programming seminars, coding bootcamps, developer meetups, IET DAVV events, technology workshops, student events"
      />

      <Navigation />
      <main className="pt-16">
        {/* Enhanced Hero Section with background elements */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 md:w-40 h-20 md:h-40 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div
              className="absolute top-20 right-20 w-16 md:w-32 h-16 md:h-32 bg-gdsc-red/5 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/4 w-24 md:w-48 h-24 md:h-48 bg-gdsc-yellow/5 rounded-full animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-10 right-1/3 w-14 md:w-28 h-14 md:h-28 bg-gdsc-green/5 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 md:grid-cols-8 h-full gap-4">
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

          <div className="relative z-10 container-responsive text-center">
            <div className="animate-slide-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Events &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue to-gdsc-green">
                  Workshops
                </span>
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Join us for exciting workshops, seminars, and hands-on sessions
                designed to enhance your technical skills and expand your
                network.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Join Our Community
                </a>
                <button className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium">
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-4 w-16 md:w-32 h-16 md:h-32 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div
              className="absolute top-32 right-8 w-12 md:w-24 h-12 md:h-24 bg-gdsc-red/5 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-8 w-20 md:w-40 h-20 md:h-40 bg-gdsc-yellow/5 rounded-full animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-10 right-4 w-14 md:w-28 h-14 md:h-28 bg-gdsc-green/5 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative z-10 container-responsive">
            {/* Error State */}
            {error ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Unable to Load Events
                </h3>
                <p className="text-gray-600 mb-6">
                  We're having trouble loading events. Please try again later.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-animate bg-gdsc-blue text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium"
                >
                  Retry
                </button>
              </div>
            ) : isLoading ? (
              /* Loading State */
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 bg-gdsc-red rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 bg-gdsc-yellow rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 bg-gdsc-green rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Loading Events...
                </h3>
                {/* Loading skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                      <div className="h-2 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : events.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-blue rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-red rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-yellow rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-green rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Exciting Events Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  We're planning amazing workshops and events for our community.
                  Join our WhatsApp group to be the first to know when
                  registration opens!
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium inline-block"
                >
                  Get Notified
                </a>
              </div>
            ) : (
              /* Events Grid */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {events.map((event, index) => (
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
                            Register Now
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
                            Register Now
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

            {/* Live update indicator */}
            {!isLoading && !error && (
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live updates every 30 seconds</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
