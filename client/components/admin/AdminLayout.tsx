import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: "Events",
      href: "/admin/events",
      current: location.pathname === "/admin/events",
    },
    {
      name: "Team",
      href: "/admin/team",
      current: location.pathname === "/admin/team",
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      current: location.pathname === "/admin/gallery",
    },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      if (token) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin-token");
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-2 shadow">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
            </div>
            <span className="font-bold text-lg">GDGoC Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 bg-gray-50 border-b">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
              </div>
              <span className="font-bold text-lg">GDGoC Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-gdsc-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout button */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
