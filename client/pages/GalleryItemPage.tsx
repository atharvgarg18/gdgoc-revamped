import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGalleryItems, GalleryItem } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowLeft, Calendar, Tag, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get photos from the gallery item or fallback to a default
  const photos = item?.images || [item?.image || ''].filter(Boolean);

  useEffect(() => {
    loadGalleryData();
  }, [id]);

  const loadGalleryData = async () => {
    try {
      const result = await getGalleryItems();
      if (result.success) {
        setAllItems(result.data);
        const currentItem = result.data.find((item) => item.id === id);
        setItem(currentItem || null);
      }
    } catch (error) {
      console.error("Error loading gallery item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: "from-blue-500 to-blue-600",
      event: "from-green-500 to-green-600",
      competition: "from-red-500 to-red-600",
      community: "from-purple-500 to-purple-600",
    };
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
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

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/30 border-t-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gallery Item Not Found</h1>
          <p className="text-gray-600 mb-8">The gallery item you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/gallery")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={item.title}
        description={item.description}
        keywords={`gallery, ${item.category}, ${item.title}, GDGoC IET DAVV`}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="container-responsive">
          {/* Back Button */}
          <button
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Gallery
          </button>

          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getCategoryColor(item.category)} text-white shadow-lg`}>
                  <span className="mr-2">{getCategoryIcon(item.category)}</span>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {item.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openModal(0)}
                  className={`bg-gradient-to-r ${getCategoryColor(item.category)} text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  View Photos
                </button>
                <button
                  onClick={() => navigate("/gallery")}
                  className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  More from Gallery
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => openModal(0)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Photo Collection
          </h2>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={photo}
                  alt={`${item.title} - Photo ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink 
                    size={32} 
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" 
                  />
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1} / {photos.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <img
              src={photos[currentImageIndex]}
              alt={`${item.title} - Photo ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain animate-zoom-in"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
