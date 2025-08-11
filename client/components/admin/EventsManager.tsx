import { useState, useEffect } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  Event,
} from "@/lib/supabase";

const eventTypes = [
  { value: "Workshop", label: "Workshop", icon: "🛠️" },
  { value: "Bootcamp", label: "Bootcamp", icon: "🏕️" },
  { value: "Seminar", label: "Seminar", icon: "🎓" },
  { value: "Hackathon", label: "Hackathon", icon: "💻" },
  { value: "Conference", label: "Conference", icon: "🎤" },
  { value: "Meetup", label: "Meetup", icon: "🤝" },
];

const colorThemes = [
  { value: "gdsc-blue", label: "Blue", color: "#4285F4" },
  { value: "gdsc-red", label: "Red", color: "#EA4335" },
  { value: "gdsc-yellow", label: "Yellow", color: "#FBBC04" },
  { value: "gdsc-green", label: "Green", color: "#34A853" },
];

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    description: "",
    color: "gdsc-blue" as const,
    attendees: 0,
    image: "",
    registration_link: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadEvents = async () => {
    setIsLoading(true);
    const result = await getEvents();
    if (result.success) {
      setEvents(result.data);
    } else {
      showNotification("error", "Failed to load events");
    }
    setIsLoading(false);
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingEvent) {
        const result = await updateEvent(editingEvent.id, formData);
        if (result.success) {
          await loadEvents();
          resetForm();
          showNotification("success", "Event updated successfully!");
        } else {
          showNotification("error", `Error updating event: ${result.error}`);
        }
      } else {
        const result = await createEvent(formData);
        if (result.success) {
          await loadEvents();
          resetForm();
          showNotification("success", "Event created successfully!");
        } else {
          showNotification("error", `Error creating event: ${result.error}`);
        }
      }
    } catch (error) {
      showNotification(
        "error",
        "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      )
    )
      return;

    const result = await deleteEvent(id);
    if (result.success) {
      await loadEvents();
      showNotification("success", "Event deleted successfully!");
    } else {
      showNotification("error", `Error deleting event: ${result.error}`);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      description: event.description,
      color: event.color,
      attendees: event.attendees,
      image: event.image || "",
      registration_link: event.registration_link || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      date: "",
      time: "",
      type: "",
      description: "",
      color: "gdsc-blue",
      attendees: 0,
      image: "",
      registration_link: "",
    });
  };

  const formatDateForInput = (dateString: string) => {
    // Convert "Dec 15, 2024" to "2024-12-15" format
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const formatDateForDisplay = (inputDate: string) => {
    // Convert "2024-12-15" to "Dec 15, 2024" format
    try {
      const date = new Date(inputDate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return inputDate;
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const getEventStats = () => {
    const total = events.length;
    const upcoming = events.filter(
      (event) => new Date(event.date) >= new Date(),
    ).length;
    const totalAttendees = events.reduce(
      (sum, event) => sum + event.attendees,
      0,
    );
    const typeCount = events.reduce(
      (acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return { total, upcoming, totalAttendees, typeCount };
  };

  const stats = getEventStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
          <div
            className="w-4 h-4 bg-gdsc-red rounded-full animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-gdsc-yellow rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-gdsc-green rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span>{notification.type === "success" ? "✅" : "❌"}</span>
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Events Management
          </h2>
          <p className="text-gray-600 mt-1">
            Create and manage events that appear on your website
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gdsc-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span>➕</span>
          <span>Add New Event</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gdsc-blue/10">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gdsc-green/10">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.upcoming}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gdsc-yellow/10">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Attendees
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalAttendees}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gdsc-red/10">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Most Popular</p>
              <p className="text-lg font-bold text-gray-900">
                {Object.entries(stats.typeCount).sort(
                  ([, a], [, b]) => b - a,
                )[0]?.[0] || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterType("all");
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || filterType !== "all"
                ? "No events match your criteria"
                : "No events found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first event to get started!"}
            </p>
            {!searchTerm && filterType === "all" && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gdsc-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Create First Event
              </button>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                        event.color === "gdsc-blue"
                          ? "bg-blue-100 text-blue-800"
                          : event.color === "gdsc-red"
                            ? "bg-red-100 text-red-800"
                            : event.color === "gdsc-yellow"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {eventTypes.find((t) => t.value === event.type)?.icon}{" "}
                      {event.type}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Edit event"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete event"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-4">📅</span>
                      <span className="ml-2">{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4">⏰</span>
                      <span className="ml-2">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4">👥</span>
                      <span className="ml-2">{event.attendees} attendees</span>
                    </div>
                    {event.registration_link && (
                      <div className="flex items-center">
                        <span className="w-4">🔗</span>
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-gdsc-blue hover:underline truncate"
                        >
                          Registration Link
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter event title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                      value={
                        formData.date ? formatDateForInput(formData.date) : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value
                            ? formatDateForDisplay(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2:00 PM - 5:00 PM"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option value="">Select event type...</option>
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Theme *
                    </label>
                    <div className="flex space-x-3">
                      {colorThemes.map((theme) => (
                        <button
                          key={theme.value}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              color: theme.value as any,
                            })
                          }
                          className={`flex-1 px-3 py-3 rounded-lg border-2 transition-all ${
                            formData.color === theme.value
                              ? "border-gray-800 shadow-lg"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: theme.color + "20" }}
                        >
                          <div
                            className="w-4 h-4 rounded-full mx-auto mb-1"
                            style={{ backgroundColor: theme.color }}
                          ></div>
                          <span className="text-xs font-medium">
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your event..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Attendees
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                      value={formData.attendees || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendees: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://forms.gle/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                      value={formData.registration_link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registration_link: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Image URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-sm font-medium text-white bg-gdsc-blue rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <span>
                      {isSubmitting
                        ? "Saving..."
                        : editingEvent
                          ? "Update Event"
                          : "Create Event"}
                    </span>
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
