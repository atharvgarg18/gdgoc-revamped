import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import SEO from "@/components/SEO";
import { getTeamMembers, TeamMember } from "@/lib/supabase";
import { scrollToTopInstant } from "@/lib/scrollUtils";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollToTopInstant();
    loadTeamMembers();

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

    return () => observer.disconnect();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.success || result.data) {
        const members = result.data || [];
        setTeamMembers(members);
      }
    } catch (error) {
      console.warn("Error loading team members");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      Lead: "from-purple-600 to-blue-600",
      "Technical Lead": "from-blue-600 to-green-600",
      "Design Lead": "from-green-600 to-yellow-600",
      "Marketing Lead": "from-yellow-600 to-red-600",
      "Faculty Advisor": "from-indigo-600 to-purple-600",
      "Senior Mentor": "from-teal-600 to-blue-600",
      Mentor: "from-emerald-600 to-teal-600",
    };
    return colors[role as keyof typeof colors] || "from-gray-600 to-gray-800";
  };

  const getProfileTypeIcon = (profileType: string) => {
    const icons = {
      "Faculty Advisor": "👨‍🏫",
      "Mentors": "🧑‍💼",
      "Leads": "⭐",
    };
    return icons[profileType as keyof typeof icons] || "👤";
  };

  const getProfileTypeColor = (profileType: string) => {
    const colors = {
      "Faculty Advisor": "from-indigo-600 to-purple-600",
      "Mentors": "from-teal-600 to-blue-600", 
      "Leads": "from-purple-600 to-pink-600",
    };
    return colors[profileType as keyof typeof colors] || "from-gray-600 to-gray-800";
  };

  const groupedMembers = teamMembers.reduce((acc, member) => {
    const type = member.profile_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const profileOrder = ["Faculty Advisor", "Mentors", "Leads"];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Team"
        description="Meet the passionate individuals behind GDGoC IET DAVV. Our diverse team of student leaders, developers, and innovators."
      />

      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
          {/* Background Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-1/4 right-16 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rotate-45 opacity-25 animate-float" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-20 right-10 w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full opacity-20 animate-float" style={{ animationDelay: "0.5s" }}></div>
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
                  <div className="text-3xl font-bold text-purple-600">
                    {teamMembers.length}+
                  </div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50+</div>
                  <div className="text-gray-600">Events Organized</div>
                </div>
              </div>

              {/* CTA Button */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("team-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
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
          ref={sectionRef}
          id="team-section"
          className="py-16 md:py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading our amazing team...</p>
              </div>
            ) : (
              <div className="space-y-16">
                {profileOrder.map((profileType) => {
                  const members = groupedMembers[profileType] || [];
                  if (members.length === 0) return null;

                  return (
                    <div key={profileType} className="space-y-8">
                      {/* Profile Type Header */}
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-3 mb-4">
                          <span className="text-4xl">{getProfileTypeIcon(profileType)}</span>
                          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${getProfileTypeColor(profileType)} bg-clip-text text-transparent`}>
                            {profileType}
                          </h2>
                        </div>
                        <div className={`w-24 h-1 bg-gradient-to-r ${getProfileTypeColor(profileType)} mx-auto rounded-full`}></div>
                      </div>

                      {/* Members Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {members.map((member, index) => (
                          <div
                            key={member.id}
                            className={`relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                              isVisible ? "animate-fade-in-up" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {/* Member Image */}
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                              />
                            </div>

                            <div className="p-6 pt-4">
                              {/* Member Info */}
                              <div className="text-center mb-4">
                                <h3 className={`text-xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:${getRoleColor(member.role)} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                                  {member.name}
                                </h3>
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getRoleColor(member.role)} mb-2`}>
                                  {member.role}
                                </div>
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
                              className={`absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r ${getProfileTypeColor(profileType)} rounded-full animate-float opacity-60 shadow-lg`}
                              style={{ animationDelay: `${index * 0.5}s` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Join Us Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                We're always looking for passionate individuals who want to make
                a difference in the tech community. Join us and help build the
                future!
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
                  href="https://github.com/gdgoc-iet-davv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Contribute on GitHub
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
