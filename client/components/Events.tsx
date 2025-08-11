import { useEffect, useRef, useState } from "react";

const events = [
  {
    title: "Introduction to Machine Learning",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    type: "Workshop",
    description: "Learn the fundamentals of ML with hands-on exercises",
    color: "gdsc-blue",
    attendees: 85
  },
  {
    title: "Android Development Bootcamp",
    date: "Dec 20, 2024",
    time: "10:00 AM - 4:00 PM",
    type: "Bootcamp",
    description: "Build your first Android app from scratch",
    color: "gdsc-green",
    attendees: 120
  },
  {
    title: "Web Development with React",
    date: "Dec 25, 2024",
    time: "1:00 PM - 6:00 PM",
    type: "Workshop",
    description: "Modern web development using React and TypeScript",
    color: "gdsc-red",
    attendees: 95
  },
  {
    title: "Cloud Computing Fundamentals",
    date: "Jan 5, 2025",
    time: "11:00 AM - 3:00 PM",
    type: "Seminar",
    description: "Introduction to Google Cloud Platform services",
    color: "gdsc-yellow",
    attendees: 75
  }
];

export default function Events() {
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

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-gdsc-blue">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for exciting workshops, seminars, and hands-on sessions designed to 
              enhance your technical skills and expand your network.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                  isVisible ? "animate-slide-up" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 ${
                  event.color === "gdsc-blue" ? "bg-gdsc-blue" :
                  event.color === "gdsc-red" ? "bg-gdsc-red" :
                  event.color === "gdsc-yellow" ? "bg-gdsc-yellow" :
                  "bg-gdsc-green"
                }`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      event.color === "gdsc-blue" ? "bg-gdsc-blue/10 text-gdsc-blue" :
                      event.color === "gdsc-red" ? "bg-gdsc-red/10 text-gdsc-red" :
                      event.color === "gdsc-yellow" ? "bg-gdsc-yellow/10 text-gdsc-yellow" :
                      "bg-gdsc-green/10 text-gdsc-green"
                    }`}>
                      {event.type}
                    </span>
                    <div className="text-right text-sm text-gray-500">
                      <div>{event.date}</div>
                      <div>{event.time}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">👥</span>
                      {event.attendees} registered
                    </div>
                    <button className={`text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity ${
                      event.color === "gdsc-blue" ? "bg-gdsc-blue" :
                      event.color === "gdsc-red" ? "bg-gdsc-red" :
                      event.color === "gdsc-yellow" ? "bg-gdsc-yellow" :
                      "bg-gdsc-green"
                    }`}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Miss Out on Our Events!
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay updated with our latest events and workshops. Join our community 
              to receive notifications about upcoming sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gdsc-blue text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors">
                Join Our Newsletter
              </button>
              <button className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-3 rounded-full hover:bg-gdsc-blue hover:text-white transition-all">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
