import { useState, useEffect } from "react";
import { getProjects, Project } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { isValidUrl } from "@/lib/urlUtils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 },
    );

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [projects]);

  const loadProjects = async () => {
    try {
      const result = await getProjects();
      if (result.success || result.data) {
        // Use data whether from database or fallback
        const projectsData = result.data || [];
        setProjects(projectsData);
      } else {
        console.error("Get Projects failed:", result.error || "Unknown error");
        setProjects([]);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory,
  );

  const categories = [
    { value: "all", label: "All Projects", count: projects.length },
    { value: "web", label: "Web", count: projects.filter((p) => p.category === "web").length },
    { value: "mobile", label: "Mobile", count: projects.filter((p) => p.category === "mobile").length },
    { value: "ai", label: "AI/ML", count: projects.filter((p) => p.category === "ai").length },
    { value: "blockchain", label: "Blockchain", count: projects.filter((p) => p.category === "blockchain").length },
    { value: "iot", label: "IoT", count: projects.filter((p) => p.category === "iot").length },
    { value: "other", label: "Other", count: projects.filter((p) => p.category === "other").length },
  ].filter((cat) => cat.count > 0 || cat.value === "all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "in_progress":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "planned":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      web: "bg-blue-500",
      mobile: "bg-green-500",
      ai: "bg-red-500",
      blockchain: "bg-yellow-500",
      iot: "bg-purple-500",
      other: "bg-gray-500",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Projects"
        description="Explore innovative projects built by GDGoC IET DAVV community members. From web applications to mobile apps, AI solutions, and more."
        keywords="GDGoC projects, student projects, open source, web development, mobile apps, AI projects, blockchain, IoT, programming projects, IET DAVV"
      />

      <Navigation />
      <main className="pt-16">
        {/* Hero Section - Inspired by homepage design */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Circles */}
            <div className="absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full animate-float blur-xl" />
            <div
              className="absolute top-40 right-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-red-400/20 to-yellow-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-32 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "4s" }}
            />
            <div
              className="absolute bottom-20 right-20 w-28 md:w-56 h-28 md:h-56 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "1s" }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 md:grid-cols-16 h-full gap-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border-r border-gray-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute top-1/4 left-16 w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-green-500 rotate-45 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-yellow-500 rotate-12 animate-bounce" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Our</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-gradient-x">
                  Projects
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Discover the innovative projects built by our community members.
                From web applications to mobile apps, AI solutions, and cutting-edge tech.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">{projects.length}+</div>
                  <div className="text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600">{categories.length - 1}</div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">{projects.filter((p) => p.status === "completed").length}</div>
                  <div className="text-gray-600">Completed</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <a
                  href="https://github.com/gdgoc-iet-davv/website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
                >
                  View on GitHub
                </a>
                <button
                  onClick={() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-animate border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Explore Projects
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects-section" className="py-16 md:py-20 relative overflow-hidden bg-white">
          <div className="relative z-10 container-responsive">
            {/* Category Filter */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Explore by Category</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.value
                        ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    {category.label}
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Loading amazing projects...</h3>
              </div>
            ) : filteredProjects.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Amazing Projects Coming Soon!</h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                  We're working on exciting projects that will showcase our community's talent and innovation. Stay tuned!
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block transform hover:scale-105"
                >
                  Join the Team
                </a>
              </div>
            ) : (
              /* Projects Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-index={index}
                    className={`project-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 transform hover:scale-105 hover:-translate-y-2 flex flex-col h-full ${
                      visibleCards.has(index) ? "animate-slide-up opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image */}
                    {project.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Status Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.status.replace("_", " ").toUpperCase()}
                        </div>

                        {/* Category Dot */}
                        <div className="absolute top-4 right-4">
                          <div className={`w-4 h-4 rounded-full ${getCategoryColor(project.category)} shadow-lg`} />
                        </div>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      {/* Project Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500 capitalize font-medium">{project.category} Project</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                              {tech}
                            </span>
                          ))}
                          {project.tech_stack.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">+{project.tech_stack.length - 4} more</span>
                          )}
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="mb-6 text-sm text-gray-500">
                        <span className="font-medium">Team:</span> <span>{project.team_members.join(", ")}</span>
                      </div>

                      {/* Actions - anchored to bottom */}
                      <div className="flex gap-3 mt-auto">
                        {/* Code: use anchor when valid */}
                        {project.github_url && isValidUrl(project.github_url) ? (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2.5 rounded-lg text-center text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-gray-900 text-white hover:bg-gray-800"
                            aria-label={`${project.title} - Code`}
                          >
                            <span>Code</span>
                          </a>
                        ) : (
                          <div className="flex-1 px-4 py-2.5 rounded-lg text-center text-sm font-medium opacity-50 cursor-not-allowed bg-gray-400 text-white" aria-disabled="true">
                            <span>Code Soon</span>
                          </div>
                        )}

                        {/* Live: use anchor when valid */}
                        {project.live_url && isValidUrl(project.live_url) ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2.5 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            aria-label={`${project.title} - Live`}
                          >
                            <span>Live</span>
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {/* Hover Effect Overlay - non-interactive so it won't capture clicks */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container-responsive text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Want to Build Something Amazing?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community of passionate developers and bring your ideas to life. Let's build the future together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
              >
                Join Our Community
              </a>
              <a
                href="https://github.com/gdgoc-iet-davv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
              >
                Contribute on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
