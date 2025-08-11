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
  }, [galleryItems, selectedCategory]);

  const loadGalleryItems = async () => {
    const result = await getGalleryItems();
    if (result.success) {
      setGalleryItems(result.data);
    }
    setIsLoading(false);
  };

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const categories = [
    { value: "all", label: "All", count: galleryItems.length },
    {
      value: "workshop",
      label: "Workshops",
      count: galleryItems.filter((i) => i.category === "workshop").length,
    },
    {
      value: "event",
      label: "Events",
      count: galleryItems.filter((i) => i.category === "event").length,
    },
    {
      value: "competition",
      label: "Competitions",
      count: galleryItems.filter((i) => i.category === "competition").length,
    },
    {
      value: "community",
      label: "Community",
      count: galleryItems.filter((i) => i.category === "community").length,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return {
          bg: "bg-gdsc-blue",
          text: "text-white",
          border: "border-gdsc-blue",
        };
      case "event":
        return {
          bg: "bg-gdsc-red",
          text: "text-white",
          border: "border-gdsc-red",
        };
      case "competition":
        return {
          bg: "bg-gdsc-yellow",
          text: "text-white",
          border: "border-gdsc-yellow",
        };
      case "community":
        return {
          bg: "bg-gdsc-green",
          text: "text-white",
          border: "border-gdsc-green",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
          border: "border-gray-500",
        };
    }
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
        {/* Enhanced Hero Section */}
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
              Our <span className="text-gdsc-blue">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore moments from our workshops, events, and community
              activities. See how we learn, grow, and build together as a
              community.
            </p>
          </div>
        </section>

        {/* Enhanced Category Filter */}
        <section className="py-8 bg-white border-b sticky top-16 z-30 backdrop-blur-md bg-white/90">
          <div className="container-responsive">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 btn-animate text-sm md:text-base ${
                    selectedCategory === category.value
                      ? "bg-gdsc-blue text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedCategory === category.value
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 md:py-24">
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
            ) : filteredItems.length === 0 ? (
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
                  No Gallery Items Found
                </h3>
                <p className="text-gray-600 text-lg">
                  {selectedCategory === "all"
                    ? "Our gallery is being updated with amazing moments from our community!"
                    : `No ${selectedCategory} items available yet. Check back soon!`}
                </p>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="text-center mb-8 md:mb-12">
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gdsc-blue">
                      {filteredItems.length}
                    </span>
                    {selectedCategory === "all"
                      ? " items"
                      : ` ${selectedCategory} items`}
                  </p>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredItems.map((item, index) => {
                    const categoryStyle = getCategoryColor(item.category);
                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        className={`gallery-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover ${
                          visibleCards.has(index)
                            ? "animate-slide-up opacity-100"
                            : "opacity-0"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Image container */}
                        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/400x300?text=No+Image";
                            }}
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Category badge */}
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text} shadow-lg`}
                          >
                            {item.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 relative">
                          {/* Background decoration */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gdsc-blue/5 to-transparent rounded-bl-full"></div>

                          <div className="relative z-10">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-gdsc-blue transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                              {item.description}
                            </p>

                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </div>

                              {/* View button */}
                              <button
                                className={`px-3 py-1 rounded-full text-xs font-medium border-2 transition-all duration-300 ${categoryStyle.border} ${categoryStyle.text} hover:${categoryStyle.bg} hover:text-white`}
                              >
                                View
                              </button>
                            </div>
                          </div>

                          {/* Floating element */}
                          <div
                            className="absolute -bottom-2 -right-2 w-6 h-6 bg-gdsc-yellow rounded-full animate-float opacity-60"
                            style={{ animationDelay: `${index * 0.5}s` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Enhanced CTA Section */}
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
                Be Part of Our Story
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Join our community and create memories that will be featured in
                our gallery. Every workshop, event, and project is a step
                towards building the future.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://chat.whatsapp.com/CcTjDYXNfQMEoLUHzB3hwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animate bg-gdsc-blue text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block touch-target"
                >
                  Join Our Community
                </a>
                <button className="btn-animate border-2 border-gdsc-blue text-gdsc-blue px-8 py-4 rounded-full text-lg font-semibold hover:bg-gdsc-blue hover:text-white transition-all duration-300 touch-target">
                  View All Events
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-blue group-hover:scale-110 transition-transform duration-300">
                    {galleryItems.length}+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Memories
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-red group-hover:scale-110 transition-transform duration-300">
                    {
                      galleryItems.filter((i) => i.category === "workshop")
                        .length
                    }
                    +
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Workshops
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-yellow group-hover:scale-110 transition-transform duration-300">
                    {galleryItems.filter((i) => i.category === "event").length}+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Events
                  </div>
                </div>
                <div className="group">
                  <div className="text-2xl md:text-3xl font-bold text-gdsc-green group-hover:scale-110 transition-transform duration-300">
                    {
                      galleryItems.filter((i) => i.category === "community")
                        .length
                    }
                    +
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Community
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
