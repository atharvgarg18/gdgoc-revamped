import { useState, useEffect } from "react";
import { TeamMember } from "@shared/admin-types";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-gdsc-red/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gdsc-yellow/5 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
            <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-gdsc-green/5 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
              Meet Our <span className="text-gdsc-blue">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              The passionate individuals who make GDGoC IET DAVV a thriving community 
              of learners and innovators.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-gdsc-red rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-4 h-4 bg-gdsc-yellow rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  <div className="w-4 h-4 bg-gdsc-green rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 hover:scale-105 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 relative">
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gdsc-blue/5 to-transparent rounded-bl-full"></div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gdsc-blue transition-colors duration-300">{member.name}</h3>
                      <p className="text-gdsc-blue font-semibold mb-3 group-hover:text-gdsc-green transition-colors duration-300">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                      <div className="flex space-x-3">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gdsc-blue rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg">
                            <span className="text-xs font-bold">in</span>
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg">
                            <span className="text-xs font-bold">gh</span>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gdsc-red rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg">
                            <span className="text-xs font-bold">tw</span>
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 hover:shadow-lg">
                            <span className="text-xs font-bold">ig</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Join Team CTA */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gdsc-green/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-slide-up">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              We're always looking for passionate students who want to make a difference 
              in the tech community.
            </p>
            <a 
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-up inline-block"
              style={{ animationDelay: "0.4s" }}
            >
              Apply Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
