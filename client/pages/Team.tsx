import { useState, useEffect } from "react";
import { getTeamMembers, TeamMember } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";

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
    const result = await getTeamMembers();
    if (result.success) {
      setTeamMembers(result.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Enhanced Hero Section with background elements */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-4 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div
              className="absolute top-20 right-8 md:right-20 w-12 md:w-24 h-12 md:h-24 bg-gdsc-red/5 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-8 md:left-1/4 w-20 md:w-40 h-20 md:h-40 bg-gdsc-yellow/5 rounded-full animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-10 right-4 md:right-1/3 w-14 md:w-28 h-14 md:h-28 bg-gdsc-green/5 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 md:grid-cols-12 h-full gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-gray-400"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 container-responsive text-center">
            {/* Logo animation */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="flex space-x-1">
                <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gdsc-blue animate-pulse"></div>
                <div
                  className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gdsc-red animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gdsc-yellow animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gdsc-green animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>

            <h1 className="text-responsive-2xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Meet Our <span className="text-gdsc-blue">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The passionate individuals who make GDGoC IET DAVV a thriving
              community of learners and innovators.
            </p>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container-responsive">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex space-x-2">
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
            ) : teamMembers.length === 0 ? (
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
                  Building Our Team
                </h3>
                <p className="text-gray-600 text-lg">
                  Our amazing team members will be featured here soon!
                </p>
              </div>
            ) : (
              <>
                {/* Section intro */}
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Leaders & Innovators
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Meet the dedicated individuals driving innovation and
                    fostering growth in our tech community.
                  </p>
                </div>

                {/* Team Grid with enhanced cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.id}
                      data-index={index}
                      className={`team-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                        visibleCards.has(index)
                          ? "animate-slide-up opacity-100"
                          : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gdsc-blue/10 to-transparent rounded-bl-full"></div>

                      {/* Image container */}
                      <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 relative">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gdsc-blue transition-colors duration-300">
                            {member.name}
                          </h3>
                          <p className="text-gdsc-blue font-semibold text-sm">
                            {member.role}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>

                        {/* Social Links with new component */}
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

                      {/* Floating elements */}
                      <div
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gdsc-yellow rounded-full animate-float opacity-60"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Enhanced Join Team CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-16 md:w-20 h-16 md:h-20 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div
              className="absolute bottom-10 right-10 w-20 md:w-32 h-20 md:h-32 bg-gdsc-green/5 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/4 w-12 h-12 bg-gdsc-red/5 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative z-10 container-responsive text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                Want to Join Our Team?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                We're always looking for passionate students who want to make a
                difference in the tech community. Join us in building the
                future!
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block touch-target"
                >
                  Apply Now
                </a>
                <button className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full text-lg font-semibold hover:bg-gdsc-blue hover:text-white transition-all duration-300 touch-target">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-blue group-hover:scale-110 transition-transform duration-300">
                    {teamMembers.length}+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Team Members
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-red group-hover:scale-110 transition-transform duration-300">
                    50+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Projects
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-yellow group-hover:scale-110 transition-transform duration-300">
                    100+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Events
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-green group-hover:scale-110 transition-transform duration-300">
                    500+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Members
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
