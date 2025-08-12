import { useState } from "react";
import EventsManager from "./EventsManager";
import TeamManager from "./TeamManager";
import GalleryManager from "./GalleryManager";
import ProjectsManager from "./ProjectsManager";
import AdminConnectionStatus from "./AdminConnectionStatus";

interface ModernAdminDashboardProps {
  onLogout: () => void;
}

type Section = "events" | "team" | "projects" | "gallery";

export default function ModernAdminDashboard({
  onLogout,
}: ModernAdminDashboardProps) {
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

  const menuItems = [
    {
      id: "events" as Section,
      label: "Events",
      icon: "📅",
      color: "from-blue-500 to-blue-600",
      activeColor: "bg-blue-500",
    },
    {
      id: "team" as Section,
      label: "Team",
      icon: "👥",
      color: "from-green-500 to-green-600",
      activeColor: "bg-green-500",
    },
    {
      id: "projects" as Section,
      label: "Projects",
      icon: "🚀",
      color: "from-red-500 to-red-600",
      activeColor: "bg-red-500",
    },
    {
      id: "gallery" as Section,
      label: "Gallery",
      icon: "🖼️",
      color: "from-yellow-500 to-yellow-600",
      activeColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://www.dscvit.com/newlogo.svg"
                  alt="GDGoC Logo"
                  className="w-8 h-8"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    GDGoC Admin
                  </h1>
                  <p className="text-xs text-gray-500">Content Management</p>
                </div>
              </div>
            </div>

            {/* Navigation Pills */}
            <nav className="hidden lg:flex items-center space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105
                    ${
                      activeSection === item.id
                        ? `${item.activeColor} text-white shadow-lg`
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full opacity-80"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button & Logout */}
            <div className="flex items-center space-x-3">
              {/* Mobile Dropdown */}
              <div className="lg:hidden relative">
                <select
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value as Section)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.icon} {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div
              className={`
              w-12 h-12 rounded-xl bg-gradient-to-r ${menuItems.find((item) => item.id === activeSection)?.color} 
              flex items-center justify-center text-white text-xl shadow-lg
            `}
            >
              {menuItems.find((item) => item.id === activeSection)?.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {menuItems.find((item) => item.id === activeSection)?.label}{" "}
                Management
              </h2>
              <p className="text-gray-600">
                Manage your {activeSection} content and data
              </p>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <AdminConnectionStatus />

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6">{renderContent()}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GDGoC IET DAVV. Admin Panel v2.0
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>🔒 Secure</span>
              <span>⚡ Fast</span>
              <span>🎨 Modern</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
