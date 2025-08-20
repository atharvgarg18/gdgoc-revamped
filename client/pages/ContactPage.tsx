import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function ContactPage() {
  const socialLinks = [
    {
      id: "website",
      name: "Website",
      href: "https://gdgoc-ietdavv.netlify.app",
      subtitle: "Official site",
      brandClass: "",
      icon: (
        <img
          src="https://www.dscvit.com/newlogo.svg"
          alt="Website"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },

    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/gdgoc-iet-davv",
      subtitle: "Follow our official page",
      brandClass: "",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
          alt="LinkedIn"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://www.instagram.com/gdgoc.ietdavv",
      subtitle: "Photos & stories",
      brandClass: "",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
          alt="Instagram"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      href: "https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa",
      subtitle: "Join the main community",
      brandClass: "",
      icon: (
        <img
          src="https://cdn.simpleicons.org/whatsapp/25D366"
          alt="WhatsApp"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "discord",
      name: "Discord",
      href: "https://discord.gg/aqk5kZZB2R",
      subtitle: "Join our chat server",
      brandClass: "",
      icon: (
        <img
          src="https://cdn.simpleicons.org/discord/5865F2"
          alt="Discord"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "youtube",
      name: "YouTube",
      href: "https://youtube.com/@gdgocietdavv",
      subtitle: "Videos & recordings",
      brandClass: "",
      icon: (
        <img
          src="https://cdn.simpleicons.org/youtube/FF0000"
          alt="YouTube"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "x",
      name: "X",
      href: "https://x.com/gdgoc_iet",
      subtitle: "Announcements & updates",
      brandClass: "",
      icon: (
        <img
          src="https://cdn.simpleicons.org/x/000000"
          alt="X"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "email",
      name: "Email",
      href: "mailto:gdsc@ietdavv.edu.in",
      subtitle: "Contact us directly",
      brandClass: "",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
          alt="Email"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
    {
      id: "bevy",
      name: "Bevy",
      href: "https://gdg.community.dev/gdg-on-campus-institute-of-engineering-and-technology-davv-indore-india/",
      subtitle: "Community events on Bevy",
      brandClass: "",
      // Using Simple Icons "bevy" mark for a clean, accurate SVG.
      icon: (
        <img
          src="https://cdn.simpleicons.org/bevy/0f172a"
          alt="Bevy"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with GDGoC IET DAVV. Find our location, contact details, and connect with our tech community in Indore."
        keywords="GDGoC contact, IET DAVV location, tech community Indore, Google Developer Groups contact, student developers contact"
      />

      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-4 h-4 bg-gdsc-blue rounded-full animate-float opacity-60" />
            <div
              className="absolute top-40 right-20 w-6 h-6 bg-gdsc-red rotate-45 animate-float opacity-50"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-40 left-20 w-5 h-5 bg-gdsc-yellow rounded-full animate-float opacity-70"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-20 right-10 w-8 h-8 bg-gdsc-green rounded-full animate-float opacity-40"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <div className="relative z-10 text-center container-responsive px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900">Get in</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-gradient-x">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with our vibrant tech community at IET DAVV. We're here to
              help you grow, learn, and build amazing things together.
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-blue-600 transition-colors cursor-pointer"
              onClick={() =>
                document
                  .getElementById("linkhub-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Links + Map Section */}
        <section id="linkhub-section" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* LEFT: Social links */}
              <div className="max-w-md mx-auto md:mx-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Find us on
                </h2>
                <p className="text-gray-600 mb-6">
                  All our official social handles and community links — one
                  click away.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full bg-white rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gdsc-blue"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center ${s.brandClass}`}
                          aria-hidden="true"
                        >
                          {s.icon}
                        </div>

                        <div className="text-left">
                          <div className="text-sm text-gray-500">
                            {s.subtitle}
                          </div>
                          <div className="text-base font-semibold text-gray-900">
                            {s.name}
                          </div>
                        </div>
                      </div>

                      <svg
                        className="w-5 h-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                        role="img"
                      >
                        <title>Open</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT: Map */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Find Us Here
                </h2>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    borderRadius: 12,
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps?q=IET%20DAVV%2C%20Indore&hl=en&z=16&output=embed"
                    width="100%"
                    height="350"
                    style={{
                      border: "0",
                      borderRadius: "1rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="text-gray-600 mt-6">
                  Institute of Engineering & Technology — Devi Ahilya
                  Vishwavidyalaya, Khandwa Road, Indore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container-responsive">
            <div className="text-center bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Whether you're a beginner or experienced developer, there's a
                place for you at GDGoC IET DAVV. Let's build something amazing
                together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gdsc-blue text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <a
                  href="/events"
                  onClick={() => window.scrollTo(0, 0)}
                  className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-lg hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  View Upcoming Events
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
