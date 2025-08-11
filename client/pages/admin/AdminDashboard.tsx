import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import EventsAdmin from "./EventsAdmin";
import TeamAdmin from "./TeamAdmin";
import GalleryAdmin from "./GalleryAdmin";

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

type AdminSection = 'events' | 'team' | 'gallery';

export default function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('events');

  const renderContent = () => {
    switch (activeSection) {
      case 'events':
        return <EventsAdmin token={token} onLogout={onLogout} />;
      case 'team':
        return <TeamAdmin token={token} onLogout={onLogout} />;
      case 'gallery':
        return <GalleryAdmin token={token} onLogout={onLogout} />;
      default:
        return <EventsAdmin token={token} onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
              </div>
              <span className="font-bold text-lg">GDGoC Admin</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveSection('events')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'events'
                    ? 'bg-gdsc-blue text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveSection('team')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'team'
                    ? 'bg-gdsc-green text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Team
              </button>
              <button
                onClick={() => setActiveSection('gallery')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'gallery'
                    ? 'bg-gdsc-yellow text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Gallery
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}
