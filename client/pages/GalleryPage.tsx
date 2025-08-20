import { useState, useEffect } from "react";
import { getGalleryItems, GalleryItem } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadGalleryItems();
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

    const cards = document.querySelectorAll(".gallery-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [galleryItems]);

  const loadGalleryItems = async () => {
    try {
      const result = await getGalleryItems();
      if (result.success) {
        setGalleryItems(result.data);
      }
    } catch (error) {
      console.error("Error loading gallery items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory,
  );

  const categories = [
    { value: "all", label: "All Photos", count: galleryItems.length },
    ...Array.from(new Set(galleryItems.map((item) => item.category))).map(
      (category) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        count: galleryItems.filter((item) => item.category === category).length,
      }),
    ),
  ].filter((cat) => cat.count > 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: "from-blue-500 to-blue-600",
      event: "from-green-500 to-green-600",
      competition: "from-red-500 to-red-600",
      community: "from-purple-500 to-purple-600",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  const getCategoryBgColor = (category: string) => {
    const colors = {
      workshop: "bg-blue-50",
      event: "bg-green-50",
      competition: "bg-red-50",
      community: "bg-purple-50",
    };
    return colors[category as keyof typeof colors] || "bg-gray-50";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      workshop: "🛠️",
      event: "🎉",
      competition: "🏆",
      community: "🤝",
    };
    return icons[category as keyof typeof icons] || "📸";
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Gallery"
        description="Browse through our photo gallery showcasing memorable moments from GDGoC IET DAVV events, workshops, competitions, and community gatherings."
        keywords="GDGoC gallery, event photos, workshop images, tech events, community photos, IET DAVV events, programming competitions, meetup photos"
      />

      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-pink-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Circles */}
            <div className="absolute top-20 left-20 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-float blur-xl"></div>
            <div
              className="absolute top-40 right-32 w-24 md:w-48 h-24 md:h-48 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-28 md:w-56 h-28 md:h-56 bg-gradient-to-r from-green-400/20 to-pink-400/20 rounded-full animate-float blur-xl"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 md:grid-cols-16 h-full gap-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-gray-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute top-1/4 left-16 w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-purple-500 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-green-500 rotate-12 animate-bounce"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="animate-slide-up">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-gray-900">Our</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-blue-600 animate-gradient-x">
                  Gallery
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Explore memorable moments from our events, workshops,
                competitions, and community gatherings. Each photo tells a story
                of learning, collaboration, and innovation.
              </p>

              {/* Stats */}
              <div
                className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-pink-600">
                    {galleryItems.length}+
                  </div>
                  <div className="text-gray-600">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600">
                    {categories.length - 1}
                  </div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">
                    100+
                  </div>
                  <div className="text-gray-600">Memories</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Join Our Community
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("gallery-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-animate border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Explore Gallery
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-pink-600 transition-colors cursor-pointer"
              onClick={() =>
                document
                  .getElementById("gallery-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery-section"
          className="py-16 md:py-20 bg-white relative overflow-hidden"
        >
          <div className="relative z-10 container-responsive">
            {/* Filter Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Explore by Category
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`
                      flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                      ${
                        selectedCategory === category.value
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                      }
                    `}
                  >
                    <span className="mr-2">
                      {getCategoryIcon(category.value)}
                    </span>
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
              <div className="text-center py-20">
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <div
                      className="w-4 h-4 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Loading amazing photos...
                </h3>
              </div>
            ) : filteredItems.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="text-8xl mb-8">📸</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Amazing Photos Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                  We're capturing incredible moments from our events and
                  activities. Stay tuned for our photo gallery updates!
                </p>
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block transform hover:scale-105"
                >
                  Join Our Events
                </a>
              </div>
            ) : (
              /* Gallery Grid - Masonry Style */
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    data-index={index}
                    className={`
                      gallery-card group relative break-inside-avoid rounded-2xl shadow-lg hover:shadow-2xl 
                      transition-all duration-500 overflow-hidden border border-white/50 backdrop-blur-sm 
                      transform hover:scale-105 hover:-translate-y-2 mb-6
                      ${getCategoryBgColor(item.category)}
                      ${
                        visibleCards.has(index)
                          ? "animate-slide-up opacity-100"
                          : "opacity-0"
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Category Header Bar */}
                    <div
                      className={`h-2 bg-gradient-to-r ${getCategoryColor(item.category)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    ></div>

                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Category Badge */}
                      <div
                        className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(item.category)} text-white shadow-lg`}
                      >
                        <span className="mr-1">
                          {getCategoryIcon(item.category)}
                        </span>
                        {item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)}
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-lg">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(item.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                    ></div>

                    {/* Floating Decorative Element */}
                    <div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-float opacity-60 shadow-lg"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container-responsive">
            <div className="text-center bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Be Part of Our Story?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Join our community and be part of the memories we create together.
                Every event is an opportunity to learn, grow, and connect with
                amazing people.
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
                  className="border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-lg hover:bg-gdsc-blue hover:text-white transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Upcoming Events
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
