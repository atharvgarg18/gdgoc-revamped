import { useState, useEffect } from "react";
import { getTeamMembers, TeamMember } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

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
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-gdsc-blue">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals who make GDGoC IET DAVV a thriving community 
              of learners and innovators.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
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
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
                <p className="text-gray-600">Check back later to meet our team!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-gdsc-blue font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      <div className="flex space-x-3">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gdsc-blue rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <span className="text-xs">in</span>
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <span className="text-xs">gh</span>
                          </a>
                        )}
                        {member.twitter && (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gdsc-red rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <span className="text-xs">tw</span>
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <span className="text-xs">ig</span>
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for passionate students who want to make a difference 
              in the tech community.
            </p>
            <a 
              href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors inline-block"
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
