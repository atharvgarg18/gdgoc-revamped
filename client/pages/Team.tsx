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
      { threshold: 0.15 },
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
      Lead: "from-purple-600 to-blue-600",
      "Co-Lead": "from-purple-500 to-pink-500",
      "Core Member": "from-gray-600 to-gray-800",
      "Technical Lead": "from-blue-600 to-green-600",
      "Design Lead": "from-green-600 to-yellow-600",
      "Marketing Lead": "from-yellow-600 to-red-600",
      "Faculty Advisor": "from-indigo-600 to-purple-600",
      "Senior Mentor": "from-teal-600 to-blue-600",
      Mentor: "from-emerald-600 to-teal-600",
    };
    return colors[role] || "from-gray-600 to-gray-800";
  };

  const getProfileTypeIcon = (profileType: string): JSX.Element => {
    switch (profileType) {
      case "Faculty Advisor":
        return (
          <svg
            className="w-10 h-10 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Faculty Advisor</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2L1 7l11 5 9-4.09V17a2 2 0 01-2 2H6"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
          </svg>
        );
      case "Lead":
        return (
          <svg
            className="w-10 h-10 text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Leads</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            />
          </svg>
        );
      case "Co-Lead":
        return (
          <svg
            className="w-10 h-10 text-pink-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Co-Leads</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 20v-1a4 4 0 014-4h6a4 4 0 014 4v1"
            />
          </svg>
        );
      case "Core Member":
        return (
          <svg
            className="w-10 h-10 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Core Members</title>
            <circle
              cx="12"
              cy="8"
              r="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.5 20a6.5 6.5 0 0113 0"
            />
          </svg>
        );
      case "Mentor":
      default:
        return (
          <svg
            className="w-10 h-10 text-teal-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Mentors</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12a4 4 0 100-8 4 4 0 000 8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20a6 6 0 0112 0"
            />
          </svg>
        );
    }
  };

  const getProfileTypeColor = (profileType: string) => {
    const colors: Record<string, string> = {
      "Faculty Advisor": "from-indigo-600 to-purple-600",
      Lead: "from-purple-600 to-pink-600",
      "Co-Lead": "from-pink-500 to-purple-500",
      "Core Member": "from-gray-400 to-gray-700",
      Mentor: "from-teal-600 to-blue-600",
    };
    return colors[profileType] || "from-gray-600 to-gray-800";
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
  const profileOrder = [
    "Faculty Advisor",
    "Lead",
    "Co-Lead",
    "Core Member",
    "Mentor",
  ];

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
            <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 animate-float" />
            <div
              className="absolute top-1/4 right-16 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rotate-45 opacity-25 animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full opacity-30 animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-20 right-10 w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full opacity-20 animate-float"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Meet Our</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-green-600">
                  Team
                </span>
              </h1>

              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Meet the passionate individuals behind GDGoC IET DAVV. Our
                diverse team of student leaders, developers, and innovators work
                together to build an amazing tech community.
              </p>

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
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading our amazing team...</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No team members found. Please check the admin panel to add
                  team members.
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {profileOrder.map((profileType) => {
                  const members = groupedMembers[profileType] || [];
                  if (members.length === 0) return null;

                  return (
                    <div key={profileType} className="space-y-8">
                      <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {profileType}
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {members.map((member, index) => {
                          const globalIndex = teamMembers.findIndex(
                            (m) => m.id === member.id,
                          );
                          return (
                            <article
                              key={member.id}
                              data-index={globalIndex}
                              className={`team-member-card relative group rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 ${visibleCards.has(globalIndex) ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
                              style={{ animationDelay: `${index * 0.06}s` }}
                            >
                              <div className="relative aspect-square w-full overflow-hidden">
                                <img
                                  src={
                                    member.image || "/placeholder-square.png"
                                  }
                                  alt={member.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />

                                {/* Desktop glass overlay (sm+). Uses column layout so text gets full width; on sm+ it becomes row but icons remain non-shrinking */}
                                <div className="hidden sm:block absolute left-4 right-4 bottom-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 overflow-hidden">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    {/* Text: takes available width; keeps truncate working */}
                                    <div className="flex-1 min-w-0">
                                      <h3 className="text-white text-lg font-semibold leading-tight truncate">
                                        {member.name}
                                      </h3>
                                      <p className="text-gray-100 text-sm mt-0.5 line-clamp-2 truncate">
                                        {member.role}
                                      </p>
                                    </div>

                                    {/* Icons: placed below on small widths (because of flex-col), or to the right on sm+.
            fixed/min width and flex-shrink-0 prevent them from grabbing text width */}
                                    {(member.linkedin ||
                                      member.github ||
                                      member.twitter ||
                                      member.instagram) && (
                                      <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center gap-2 flex-shrink-0">
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
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Mobile pill shown only on small screens (sm:hidden) — stacks name, role, then icons (icons below so they don't push text) */}
                              <div className="sm:hidden mt-2 rounded-md bg-white/90 text-gray-900 px-3 py-3">
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold truncate">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-gray-700 mt-0.5 truncate">
                                    {member.role}
                                  </div>
                                </div>

                                {(member.linkedin ||
                                  member.github ||
                                  member.twitter ||
                                  member.instagram) && (
                                  <div className="mt-2 flex items-center gap-2 justify-start">
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
                                )}
                              </div>
                            </article>
                          );
                        })}
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
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <a
                  href="https://github.com/gdgoc-iet-davv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
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
