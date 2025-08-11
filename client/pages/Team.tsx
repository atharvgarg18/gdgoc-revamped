import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Atharv Garg",
    role: "Lead",
    image: "https://via.placeholder.com/300x300",
    bio: "Passionate about full-stack development and community building",
    social: { linkedin: "#", github: "#", twitter: "#" }
  },
  {
    name: "Core Member 1",
    role: "Technical Lead",
    image: "https://via.placeholder.com/300x300",
    bio: "Specializes in machine learning and data science",
    social: { linkedin: "#", github: "#", twitter: "#" }
  },
  {
    name: "Core Member 2",
    role: "Design Lead",
    image: "https://via.placeholder.com/300x300",
    bio: "UI/UX designer with a passion for creating beautiful experiences",
    social: { linkedin: "#", github: "#", twitter: "#" }
  },
  {
    name: "Core Member 3",
    role: "Event Coordinator",
    image: "https://via.placeholder.com/300x300",
    bio: "Organizing amazing events and building community connections",
    social: { linkedin: "#", github: "#", twitter: "#" }
  }
];

export default function Team() {
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
              The passionate individuals who make GDSC IET DAVV a thriving community 
              of learners and innovators.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-gdsc-blue font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="w-8 h-8 bg-gdsc-blue rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <span className="text-xs">in</span>
                      </a>
                      <a href={member.social.github} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <span className="text-xs">gh</span>
                      </a>
                      <a href={member.social.twitter} className="w-8 h-8 bg-gdsc-red rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <span className="text-xs">tw</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <button className="bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Apply Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
