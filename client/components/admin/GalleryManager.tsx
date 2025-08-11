import { useState, useEffect } from "react";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  GalleryItem,
} from "@/lib/supabase";

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    category: "workshop" as const,
    display_order: 1,
  });

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    setIsLoading(true);
    const result = await getGalleryItems();
    if (result.success) {
      setGalleryItems(result.data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingItem) {
        const result = await updateGalleryItem(editingItem.id, formData);
        if (result.success) {
          await loadGalleryItems();
          resetForm();
        } else {
          alert(`Error updating gallery item: ${result.error}`);
        }
      } else {
        const result = await createGalleryItem(formData);
        if (result.success) {
          await loadGalleryItems();
          resetForm();
        } else {
          alert(`Error creating gallery item: ${result.error}`);
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    const result = await deleteGalleryItem(id);
    if (result.success) {
      await loadGalleryItems();
    } else {
      alert(`Error deleting gallery item: ${result.error}`);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      date: item.date,
      category: item.category,
      display_order: item.display_order,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      date: new Date().toISOString().split("T")[0],
      category: "workshop",
      display_order: galleryItems.length + 1,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return "bg-gdsc-blue text-white";
      case "event":
        return "bg-gdsc-red text-white";
      case "competition":
        return "bg-gdsc-yellow text-white";
      case "community":
        return "bg-gdsc-green text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gdsc-blue rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-gdsc-red rounded-full animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gdsc-yellow rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gdsc-green rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gdsc-yellow text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
        >
          + Add Gallery Item
        </button>
      </div>

      {/* Gallery Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {item.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}
                >
                  {item.category}
                </span>
              </div>

              <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Order: {item.display_order}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {galleryItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No gallery items found. Add your first gallery item!
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Gallery item title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description of the gallery item"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                    >
                      <option value="workshop">Workshop</option>
                      <option value="event">Event</option>
                      <option value="competition">Competition</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-yellow"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher numbers appear first
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-gdsc-yellow rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingItem
                        ? "Update Item"
                        : "Add Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
