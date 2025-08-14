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
  // track which individual cards are visible (by index)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollToTopInstant();
    loadTeamMembers();
  }, []);

  // observe each card after members are loaded
  useEffect(() => {
    if (!teamMembers || teamMembers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) {
              setVisibleCards((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    // observe all team member cards
    const cards = document.querySelectorAll(".team-member-card");
    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, [teamMembers]);

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.success || result.data) {
        const members = result.data || [];
        // optional: normalize profile_type values here if needed
        setTeamMembers(members);
        console.log("Loaded team members:", members);
      } else {
        console.warn("getTeamMembers returned no data", result.error);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error loading team members", error);
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      Lead: "bg-blue-500", // Google Blue
      "Co-Lead": "bg-red-500", // Google Red
      "Core Member": "bg-gray-600",
      "Technical Lead": "bg-blue-600",
      "Design Lead": "bg-green-500", // Google Green
      "Marketing Lead": "bg-yellow-500", // Google Yellow
      "Faculty Advisor": "bg-blue-700",
      "Senior Mentor": "bg-green-600",
      Mentor: "bg-green-500",
    };
    return colors[role] || "bg-gray-600";
  };

  const getProfileTypeIcon = (profileType: string): JSX.Element => {
    switch (profileType) {
      case "Faculty Advisor":
        return (
          <svg
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Faculty Advisor</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L1 7l11 5 9-4.09V17a2 2 0 01-2 2H6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
          </svg>
        );
      case "Lead":
        return (
          <svg
            className="w-8 h-8 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Lead</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        );
      case "Co-Lead":
        return (
          <svg
            className="w-8 h-8 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Co-Lead</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 20v-1a4 4 0 014-4h6a4 4 0 014 4v1" />
          </svg>
        );
      case "Core Member":
        return (
          <svg
            className="w-8 h-8 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Core Member</title>
            <circle cx="12" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a6.5 6.5 0 0113 0" />
          </svg>
        );
      case "Mentor":
      default:
        return (
          <svg
            className="w-8 h-8 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Mentor</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20a6 6 0 0112 0" />
          </svg>
        );
    }
  };

  const getProfileTypeColor = (profileType: string) => {
    const colors: Record<string, string> = {
      "Faculty Advisor": "text-blue-600 border-blue-600",
      Lead: "text-blue-500 border-blue-500",
      "Co-Lead": "text-red-500 border-red-500",
      "Core Member": "text-gray-600 border-gray-600",
      Mentor: "text-green-500 border-green-500",
    };
    return colors[profileType] || "text-gray-600 border-gray-600";
  };

  const groupMembersByType = () => {
    const grouped: Record<string, TeamMember[]> = {
      "Faculty Advisor": [],
      Lead: [],
      "Co-Lead": [],
      "Core Member": [],
      Mentor: [],
    };

    teamMembers.forEach((member) => {
      const rawType = (member.profile_type || "").trim();
      const type =
        rawType === "Faculty Advisor" ||
        rawType === "Lead" ||
        rawType === "Co-Lead" ||
        rawType === "Core Member" ||
        rawType === "Mentor"
          ? rawType
          : "Core Member";

      if (grouped[type]) {
        grouped[type].push(member);
      } else {
        grouped["Core Member"].push(member);
      }
    });

    return grouped;
  };

  const groupedMembers = groupMembersByType();
  const profileOrder = ["Faculty Advisor", "Lead", "Co-Lead", "Core Member", "Mentor"];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Team"
        description="Meet the passionate individuals behind GDGoC IET DAVV. Our diverse team of student leaders, developers, and innovators."
      />

      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
          {/* Google Color Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-12 h-12 bg-blue-500 rounded-full opacity-10 animate-float" />
            <div className="absolute top-1/4 right-16 w-8 h-8 bg-red-500 rotate-45 opacity-15 animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-40 left-20 w-6 h-6 bg-green-500 rounded-full opacity-20 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-20 right-10 w-10 h-10 bg-yellow-500 rounded-full opacity-15 animate-float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-red-500 rounded-full opacity-10 animate-float" style={{ animationDelay: "3s" }} />
            <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-blue-500 rotate-45 opacity-12 animate-float" style={{ animationDelay: "1.5s" }} />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Meet Our</span>{" "}
                <span className="text-blue-500">Team</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Meet the passionate individuals behind GDGoC IET DAVV. Our diverse team of student leaders, developers, and innovators work together to build an amazing tech community.
              </p>

              <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">{teamMembers.length}+</div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">500+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">50+</div>
                  <div className="text-gray-600">Events Organized</div>
                </div>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <button onClick={() => document.getElementById("team-section")?.scrollIntoView({ behavior: "smooth" })} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Meet the Team
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-blue-500 transition-colors cursor-pointer" onClick={() => document.getElementById("team-section")?.scrollIntoView({ behavior: "smooth" })}>
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={sectionRef} id="team-section" className="py-16 md:py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading our amazing team...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No team members found. Please check the admin panel to add team members.</p>
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
                          <span className="text-3xl">{getProfileTypeIcon(profileType)}</span>
                          <h2 className={`text-2xl md:text-3xl font-bold ${getProfileTypeColor(profileType).split(' ')[0]}`}>
                            {profileType}
                          </h2>
                        </div>
                        <div className={`w-20 h-1 ${getProfileTypeColor(profileType).split(' ')[1].replace('border', 'bg')} mx-auto rounded-full`} />
                      </div>

                      {/* Members Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {members.map((member, index) => {
                          const globalIndex = teamMembers.findIndex((m) => m.id === member.id);
                          return (
                            <div
                              key={member.id}
                              data-index={globalIndex}
                              className={`team-member-card relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border-2 border-transparent hover:border-blue-200 ${visibleCards.has(globalIndex) ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
                              style={{ animationDelay: `${index * 0.08}s` }}
                            >
                              {/* Member Image */}
                              <div className="aspect-square overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                              </div>

                              <div className="p-3">
                                {/* Member Info */}
                                <div className="text-center mb-3">
                                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-500 transition-colors duration-300 line-clamp-1">{member.name}</h3>
                                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleColor(member.role)} mb-2`}>
                                    {member.role}
                                  </div>
                                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{member.bio}</p>
                                </div>

                                {/* Social Links */}
                                {(member.linkedin || member.github || member.twitter || member.instagram) && (
                                  <div className="flex justify-center">
                                    <SocialIcons
                                      links={{
                                        linkedin: member.linkedin,
                                        github: member.github,
                                        twitter: member.twitter,
                                        instagram: member.instagram,
                                      }}
                                      size="xs"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Role Color Accent */}
                              <div className={`absolute top-0 left-0 w-full h-1 ${getRoleColor(member.role)}`} />

                              {/* Google Color Decorative Dot */}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-float opacity-60 shadow-lg" style={{ animationDelay: `${index * 0.5}s` }} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Join Us Section */}
            <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 md:p-12 border-2 border-blue-100">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">Want to Join Our Team?</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">We're always looking for passionate individuals who want to make a difference in the tech community. Join us and help build the future!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105">
                  Join Our Community
                </a>
                <a href="https://github.com/gdgoc-iet-davv" target="_blank" rel="noopener noreferrer" className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium transform hover:scale-105">
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
