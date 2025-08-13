import { useState, useEffect } from "react";
import { getTeamMembers, TeamMember } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import SEO from "@/components/SEO";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadTeamMembers();
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

    const cards = document.querySelectorAll(".team-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [teamMembers]);

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.success) {
        setTeamMembers(result.data);
      }
    } catch (error) {
      console.error("Error loading team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      Lead: "from-blue-500 to-blue-600",
      "Technical Lead": "from-green-500 to-green-600",
      "Design Lead": "from-purple-500 to-purple-600",
      "Community Manager": "from-yellow-500 to-yellow-600",
      "Mobile Development Lead": "from-red-500 to-red-600",
      "Web Development Lead": "from-indigo-500 to-indigo-600",
    };
    return colors[role as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getRoleBgColor = (role: string) => {
    const colors = {
      Lead: "bg-blue-50",
      "Technical Lead": "bg-green-50",
      "Design Lead": "bg-purple-50",
      "Community Manager": "bg-yellow-50",
      "Mobile Development Lead": "bg-red-50",
      "Web Development Lead": "bg-indigo-50",
    };
    return colors[role as keyof typeof colors] || "bg-gray-50";
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Team"
        description="Meet the passionate team behind GDGoC IET DAVV. Our diverse group of student leaders, developers, and innovators work together to build an amazing tech community."
        keywords="GDGoC team, student leaders, tech team, developers, IET DAVV students, community leaders, programming team, tech enthusiasts"
      />

      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Circles */}
            <div className="absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-float blur-xl"></div>
            <div
              className="absolute top-40 right-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-28 md:w-56 h-28 md:h-56 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 rounded-full animate-float blur-xl"
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
            <div className="absolute top-1/4 left-16 w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-blue-500 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-yellow-500 rotate-12 animate-bounce"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Meet Our</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-green-600 animate-gradient-x">
                  Team
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Meet the passionate individuals behind GDGoC IET DAVV. Our
                diverse team of student leaders, developers, and innovators work
                together to build an amazing tech community.
              </p>

              {/* Stats */}
              <div
                className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600">
                    {teamMembers.length}+
                  </div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">
                    {Array.from(new Set(teamMembers.map((m) => m.role))).length}
                  </div>
                  <div className="text-gray-600">Roles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600">
                    100%
                  </div>
                  <div className="text-gray-600">Dedication</div>
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
                  className="btn-animate bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Team
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("team-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-animate border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Meet the Team
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-purple-600 transition-colors cursor-pointer"
              onClick={() =>
                document
                  .getElementById("team-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team-section"
          className="py-16 md:py-20 bg-white relative overflow-hidden"
        >
          <div className="relative z-10 container-responsive">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Amazing Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each member brings unique skills, perspectives, and passion to
                our community. Together, we're building the future of technology
                at IET DAVV.
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Loading our amazing team...
                </h3>
              </div>
            ) : teamMembers.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="text-8xl mb-8">👥</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Our Amazing Team Members Will Be Featured Here Soon!
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                  We're assembling an incredible team of passionate developers
                  and innovators. Stay tuned to meet the people behind GDGoC IET
                  DAVV!
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block transform hover:scale-105"
                >
                  Join Our Team
                </a>
              </div>
            ) : (
              /* Team Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    data-index={index}
                    className={`
                      team-card group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
                      overflow-hidden border border-white/50 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-2
                      ${getRoleBgColor(member.role)}
                      ${
                        visibleCards.has(index)
                          ? "animate-slide-up opacity-100"
                          : "opacity-0"
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Role Header Bar */}
                    <div
                      className={`h-2 bg-gradient-to-r ${getRoleColor(member.role)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    ></div>

                    {/* Member Image */}
                    <div className="relative p-6 pb-0">
                      <div className="relative mx-auto w-32 h-32 mb-6">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400";
                          }}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>

                        {/* Role Badge */}
                        <div
                          className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRoleColor(member.role)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {member.role}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-4">
                      {/* Member Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center">
                        <SocialIcons
                          links={{
                            linkedin: member.linkedin,
                            github: member.github,
                            twitter: member.twitter,
                            instagram: member.instagram,
                          }}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${getRoleColor(member.role)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                    ></div>

                    {/* Floating Decorative Element */}
                    <div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-purple-400 rounded-full animate-float opacity-60 shadow-lg"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Join Team Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container-responsive text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're always looking for passionate individuals who want to make a
              difference in the tech community. Join us and be part of something
              amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
              >
                Join Our Community
              </a>
              <a
                href="/events"
                className="btn-animate border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
              >
                Attend Our Events
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
