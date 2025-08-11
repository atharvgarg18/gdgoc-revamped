import { useState, useEffect } from "react";
import { GalleryItem } from "@shared/admin-types";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'event', label: 'Events' },
    { value: 'competition', label: 'Competitions' },
    { value: 'community', label: 'Community' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-gdsc-blue text-white';
      case 'event': return 'bg-gdsc-red text-white';
      case 'competition': return 'bg-gdsc-yellow text-white';
      case 'community': return 'bg-gdsc-green text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-gdsc-blue">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore moments from our workshops, events, and community activities. 
              See how we learn, grow, and build together as a community.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-gdsc-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
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
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items found</h3>
                <p className="text-gray-600">Check back later for more content!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      
                      <div className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
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
