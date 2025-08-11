import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import EventsAdmin from "./admin/EventsAdmin";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem("admin-token");
    if (savedToken) {
      // Verify token is still valid
      verifyToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch("/api/admin/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setToken(token);
      } else {
        localStorage.removeItem("admin-token");
      }
    } catch (error) {
      localStorage.removeItem("admin-token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gdsc-blue rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gdsc-red rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-4 h-4 bg-gdsc-yellow rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          <div className="w-4 h-4 bg-gdsc-green rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
        </div>
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // For now, just show events admin. In a full implementation, you'd have routing here
  return <EventsAdmin token={token} onLogout={handleLogout} />;
}
