import { useState, useEffect } from "react";
import NewAdminLogin from "@/components/admin/NewAdminLogin";
import NewAdminDashboard from "@/components/admin/NewAdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem("gdgoc-admin-auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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

  if (!isAuthenticated) {
    return <NewAdminLogin onLogin={handleLogin} />;
  }

  return <NewAdminDashboard onLogout={handleLogout} />;
}
