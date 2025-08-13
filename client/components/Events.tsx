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
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us for exciting workshops, seminars, and hands-on sessions
            designed to enhance your technical skills and expand your
            professional network.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gdsc-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-6">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Exciting Events Coming Soon!
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              We're planning amazing workshops and events for our community.
              Join our WhatsApp group to be the first to know!
            </p>
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gdsc-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium inline-block"
            >
              Get Notified
            </a>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}
                  >
                    <span className="mr-2">{getEventTypeIcon(event.type)}</span>
                    {event.type}
                  </div>
                  <div className="text-right text-gray-600">
                    <div className="font-medium text-gray-900">
                      {event.date}
                    </div>
                    <div className="text-sm">{event.time}</div>
                  </div>
                </div>

                {/* Event Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex items-center text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {event.attendees} registered
                    </span>
                  </div>

                  {event.registration_link ? (
                    <a
                      href={event.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gdsc-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      Register Now
                    </a>
                  ) : (
                    <button className="bg-gdsc-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don't Miss Out on Our Events!
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Stay updated with our latest events and workshops. Join our
            community to receive notifications about upcoming sessions and
            exclusive opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gdsc-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              Join Our Community
            </a>
            <a
              href="/events"
              onClick={() => window.scrollTo(0, 0)}
              className="border-2 border-gdsc-blue text-gdsc-blue px-6 py-3 rounded-lg hover:bg-gdsc-blue hover:text-white transition-colors duration-300 font-medium"
            >
              View All Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
