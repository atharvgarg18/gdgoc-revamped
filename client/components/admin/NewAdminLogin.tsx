import { useState } from "react";
import { checkAdminPassword } from "@/lib/supabase";

interface NewAdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export default function NewAdminLogin({ onLogin }: NewAdminLoginProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const isValid = checkAdminPassword(password);

      if (isValid) {
        localStorage.setItem("gdgoc-admin-auth", "authenticated");
        onLogin(true);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-4 h-4 rounded-full bg-gdsc-blue"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-red"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-yellow"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-green"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            GDGoC Admin Panel
          </h2>
          <p className="mt-2 text-gray-600">
            Enter your admin password to continue
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-blue focus:border-transparent"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gdsc-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gdsc-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              For security reasons, password is not displayed publicly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
