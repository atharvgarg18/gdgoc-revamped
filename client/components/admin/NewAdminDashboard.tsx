import { useState } from "react";
import EventsManager from "./EventsManager";
import TeamManager from "./TeamManager";
import GalleryManager from "./GalleryManager";
import ProjectsManager from "./ProjectsManager";

interface NewAdminDashboardProps {
  onLogout: () => void;
}

type Section = "events" | "team" | "projects" | "gallery";

export default function NewAdminDashboard({
  onLogout,
}: NewAdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>("events");

  const handleLogout = () => {
    localStorage.removeItem("gdgoc-admin-auth");
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        return <EventsManager />;
      case "team":
        return <TeamManager />;
      case "projects":
        return <ProjectsManager />;
      case "gallery":
        return <GalleryManager />;
      default:
        return <EventsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">GDGoC Admin</h1>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveSection("events")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "events"
                    ? "bg-gdsc-blue text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                📅 Events
              </button>
              <button
                onClick={() => setActiveSection("team")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "team"
                    ? "bg-gdsc-green text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                👥 Team
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "projects"
                    ? "bg-gdsc-red text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                🚀 Projects
              </button>
              <button
                onClick={() => setActiveSection("gallery")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "gallery"
                    ? "bg-gdsc-yellow text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                🖼️ Gallery
              </button>
            </nav>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
