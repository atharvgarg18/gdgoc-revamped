import { useState, useEffect } from "react";
import { getProjects, Project } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

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
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
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
    const result = await getProjects();
    if (result.success) {
      setProjects(result.data);
    }
    setIsLoading(false);
  };

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory,
  );

  const categories = [
    { value: "all", label: "All Projects", count: projects.length },
    {
      value: "web",
      label: "Web",
      count: projects.filter((p) => p.category === "web").length,
    },
    {
      value: "mobile",
      label: "Mobile",
      count: projects.filter((p) => p.category === "mobile").length,
    },
    {
      value: "ai",
      label: "AI/ML",
      count: projects.filter((p) => p.category === "ai").length,
    },
    {
      value: "blockchain",
      label: "Blockchain",
      count: projects.filter((p) => p.category === "blockchain").length,
    },
    {
      value: "iot",
      label: "IoT",
      count: projects.filter((p) => p.category === "iot").length,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gdsc-green/10 text-gdsc-green";
      case "in_progress":
        return "bg-gdsc-blue/10 text-gdsc-blue";
      case "planned":
        return "bg-gdsc-yellow/10 text-gdsc-yellow";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "web":
        return "bg-gdsc-blue";
      case "mobile":
        return "bg-gdsc-green";
      case "ai":
        return "bg-gdsc-red";
      case "blockchain":
        return "bg-gdsc-yellow";
      case "iot":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Projects"
        description="Explore innovative projects built by GDGoC IET DAVV community members. From web applications to mobile apps, AI solutions, and more. Discover our open-source contributions."
        keywords="GDGoC projects, student projects, open source, web development, mobile apps, AI projects, blockchain, IoT, programming projects, IET DAVV"
      />

      <Navigation />
      <main className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 md:w-40 h-20 md:h-40 bg-gdsc-blue/5 rounded-full animate-float"></div>
            <div
              className="absolute top-20 right-20 w-16 md:w-32 h-16 md:h-32 bg-gdsc-red/5 rounded-full animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/4 w-24 md:w-48 h-24 md:h-48 bg-gdsc-yellow/5 rounded-full animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-10 right-1/3 w-14 md:w-28 h-14 md:h-28 bg-gdsc-green/5 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 md:grid-cols-8 h-full gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-gray-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 container-responsive text-center">
            <div className="animate-slide-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue to-gdsc-green">
                  Projects
                </span>
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Discover the innovative projects built by our community members.
                From web applications to mobile apps, AI solutions, and more.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <a
                  href="https://github.com/gdgoc-iet-davv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  View on GitHub
                </a>
                <button className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium">
                  Contribute
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="relative z-10 container-responsive">
            {/* Category Filter */}
            <div className="mb-8 md:mb-12">
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-gdsc-blue text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                    <span className="ml-2 text-xs opacity-75">
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
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
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Loading Projects...
                </h3>
              </div>
            ) : filteredProjects.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-blue rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-red rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-yellow rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 md:w-6 md:h-6 bg-gdsc-green rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Amazing Projects Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  We're working on exciting projects that will showcase our
                  community's talent and innovation.
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium inline-block"
                >
                  Join the Team
                </a>
              </div>
            ) : (
              /* Projects Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-index={index}
                    className={`project-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover ${
                      visibleCards.has(index)
                        ? "animate-slide-up opacity-100"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Project Image */}
                    {project.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                        >
                          {project.status.replace("_", " ")}
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Project Header */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getCategoryColor(project.category)}`}
                          ></div>
                          <span className="text-sm text-gray-500 capitalize">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gdsc-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech_stack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{project.tech_stack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="mb-4 text-sm text-gray-500">
                        <span className="font-medium">Team:</span>{" "}
                        {project.team_members.join(", ")}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
                          >
                            GitHub
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gdsc-blue text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Floating element */}
                    <div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-gdsc-yellow rounded-full animate-float opacity-60"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
