import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import SEO from "@/components/SEO";
import { getTeamMembers, TeamMember, getFacultyAndAlumni, FacultyAndAlumni } from "@/lib/supabase";
import { scrollToTopInstant } from "@/lib/scrollUtils";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [facultyAndAlumni, setFacultyAndAlumni] = useState<FacultyAndAlumni[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollToTopInstant();
    loadTeamMembers();
    loadFacultyAndAlumni();
  }, []);

  // observe each card after members are loaded or filtering changes
  useEffect(() => {
    if ((!teamMembers || teamMembers.length === 0) && (!facultyAndAlumni || facultyAndAlumni.length === 0)) return;

    // Clear any existing visible classes and reset animations
    const cards = document.querySelectorAll(".team-member-card");
    cards.forEach((card) => {
      if (card instanceof HTMLElement) {
        card.classList.remove("is-visible");
        card.style.transitionDelay = "0ms";
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!(entry.target instanceof HTMLElement)) return;
          const el = entry.target as HTMLElement;

          // prefer the local stagger; fallback to data-index if not present
          const staggerAttr = el.getAttribute("data-stagger");
          const raw = staggerAttr ?? el.getAttribute("data-index") ?? "0";
          let stagger = Number(raw);
          if (Number.isNaN(stagger)) stagger = 0;

          // cap the stagger so long lists don't create big delays (max 8 steps)
          const capped = Math.min(Math.max(stagger, 0), 8);

          // make each step 45ms (shorter feel) — adjust if you want faster/slower
          el.style.transitionDelay = `${capped * 45}ms`;

          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      // trigger a little earlier: low threshold + negative bottom margin
      { threshold: 0.05, rootMargin: "0px 0px -12% 0px" },
    );

    // Re-observe all cards after a short delay to ensure DOM is updated
    setTimeout(() => {
      const newCards = document.querySelectorAll(".team-member-card");
      newCards.forEach((c) => {
        if (c instanceof HTMLElement) observer.observe(c);
      });
    }, 100);

    return () => observer.disconnect();
  }, [teamMembers, facultyAndAlumni, selectedType]); // Add facultyAndAlumni as dependency

  const loadTeamMembers = async () => {
    try {
      const result = await getTeamMembers();
      if (result.success || result.data) {
        const members = result.data || [];
        setTeamMembers(members);
        console.log("Loaded team members:", members);
      } else {
        console.warn("getTeamMembers returned no data", result.error);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error loading team members", error);
      setTeamMembers([]);
    }
  };

  const loadFacultyAndAlumni = async () => {
    try {
      const result = await getFacultyAndAlumni();
      if (result.success || result.data) {
        const members = result.data || [];
        setFacultyAndAlumni(members);
        console.log("Loaded faculty and alumni:", members);
      } else {
        console.warn("getFacultyAndAlumni returned no data", result.error);
        setFacultyAndAlumni([]);
      }
    } catch (error) {
      console.error("Error loading faculty and alumni", error);
      setFacultyAndAlumni([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      Lead: "from-purple-600 to-blue-600",
      "Co-Lead": "from-purple-500 to-pink-500",
      "Mentor": "from-teal-600 to-blue-600",
      "Faculty Mentor": "from-indigo-600 to-purple-600",
      "Former Leads": "from-gray-500 to-gray-700",
      "Technical Lead": "from-blue-600 to-green-600",
      "Design Lead": "from-green-600 to-yellow-600",
      "Marketing Lead": "from-yellow-600 to-red-600",
    };
    return colors[role] || "from-gray-600 to-gray-800";
  };

  const getProfileTypeIcon = (profileType: string): JSX.Element => {
    switch (profileType) {
      case "Faculty Mentor":
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
            <title>Faculty Mentor</title>
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
      case "Former Leads":
        return (
          <svg
            className="w-10 h-10 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            role="img"
            aria-hidden={true}
          >
            <title>Former Leads</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            />
            <circle cx="12" cy="12" r="10" strokeDasharray="5,5" strokeOpacity="0.5"/>
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
      "Faculty Mentor": "from-indigo-600 to-purple-600",
      Lead: "from-purple-600 to-pink-600",
      "Co-Lead": "from-pink-500 to-purple-500",
      "Former Leads": "from-gray-500 to-gray-700",
      Mentor: "from-teal-600 to-blue-600",
    };
    return colors[profileType] || "from-gray-600 to-gray-800";
  };

  const groupMembersByType = () => {
    // Create a combined type for both team members and faculty/alumni
    type CombinedMember = (TeamMember | FacultyAndAlumni) & {
      profile_type: "Lead" | "Co-Lead" | "Mentor" | "Faculty Mentor" | "Former Leads";
    };

    const grouped: Record<string, CombinedMember[]> = {
      "Lead": [],
      "Co-Lead": [],
      "Mentor": [],
      "Faculty Mentor": [],
      "Former Leads": [],
    };

    // Add team members
    teamMembers.forEach((member) => {
      const rawType = (member.profile_type || "").trim();
      
      const type =
        rawType === "Lead" ||
        rawType === "Co-Lead" ||
        rawType === "Mentor"
          ? rawType
          : "Mentor";

      if (grouped[type]) {
        grouped[type].push(member as CombinedMember);
      } else {
        grouped["Mentor"].push(member as CombinedMember);
      }
    });

    // Add faculty and alumni
    facultyAndAlumni.forEach((member) => {
      const rawType = (member.profile_type || "").trim();
      
      const type =
        rawType === "Faculty Mentor" ||
        rawType === "Former Leads"
          ? rawType
          : "Faculty Mentor";

      if (grouped[type]) {
        grouped[type].push(member as CombinedMember);
      } else {
        grouped["Faculty Mentor"].push(member as CombinedMember);
      }
    });

    return grouped;
  };

  const groupedMembers = groupMembersByType();
  const profileOrder = [
    "Lead",
    "Co-Lead", 
    "Mentor",
    "Faculty Mentor",
    "Former Leads",
  ];

  // Create combined list for filtering
  const allMembers = [
    ...teamMembers.map(m => ({ ...m, profile_type: m.profile_type as "Lead" | "Co-Lead" | "Mentor" | "Faculty Mentor" | "Former Leads" })),
    ...facultyAndAlumni.map(m => ({ ...m, profile_type: m.profile_type as "Lead" | "Co-Lead" | "Mentor" | "Faculty Mentor" | "Former Leads" }))
  ];

  // Filter functionality similar to Events page
  const filteredMembers = selectedType === "all" 
    ? allMembers 
    : allMembers.filter(member => member.profile_type === selectedType);

  const filteredGroupedMembers = selectedType === "all" 
    ? groupedMembers 
    : { [selectedType]: groupedMembers[selectedType] || [] };

  const filteredProfileOrder = selectedType === "all" 
    ? profileOrder 
    : [selectedType];

  const profileTypes = [
    { value: "all", label: "All Members", count: allMembers.length },
    ...profileOrder.map((type) => ({
      value: type,
      label: type,
      count: groupedMembers[type]?.length || 0,
    })),
  ].filter((type) => type.count > 0);

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
                    {allMembers.length}+
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
          className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-1/3 right-20 w-6 h-6 bg-yellow-400 rotate-45 opacity-25 animate-float" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-40 left-20 w-4 h-4 bg-red-400 rounded-full opacity-30 animate-float" style={{ animationDelay: "2s" }}></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Section */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
                Explore by Category
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {profileTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`
                      px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
                      ${
                        selectedType === type.value
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
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

            {/* Team Members Display */}
            {isLoading ? (
              <div className="text-center py-20 backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 shadow-xl">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/30 border-t-purple-500"></div>
                    <div className="absolute inset-0 animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-500" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Loading our amazing team...
                </h3>
              </div>
            ) : allMembers.length === 0 ? (
              <div className="text-center py-20 backdrop-blur-lg bg-white/70 rounded-3xl border border-white/30 shadow-2xl">
                <div className="text-8xl mb-8 animate-bounce">👥</div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  Amazing Team Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                  We're building an incredible team of passionate individuals.
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredProfileOrder.map((profileType) => {
                  const members = filteredGroupedMembers[profileType] || [];
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
                          const globalIndex = allMembers.findIndex(
                            (m) => m.id === member.id,
                          );
                          return (
                            <article
                              key={member.id}
                              data-index={globalIndex}
                              data-stagger={index}
                              className="team-member-card relative group rounded-2xl overflow-hidden shadow-lg transform opacity-0 translate-y-6 transition-transform duration-500"
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
            <div className="mt-16 text-center bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Team?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                We're always looking for passionate individuals who want to make
                a difference in the tech community. Join us and help build the
                future!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chat.whatsapp.com/DjVwm5za2GZIlSvr8OXS3M?mode=ems_copy_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gdsc-blue text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <a
                  href="https://github.com/gdgoc-iet-davv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-lg hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
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
