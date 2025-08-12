import { useState, useEffect } from "react";
import { isSupabaseConnected, testSupabaseConnection } from "@/lib/supabase";

export default function AdminConnectionStatus() {
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    testing: boolean;
    lastChecked?: string;
    fallbackMode: boolean;
  }>({
    connected: false,
    testing: true,
    fallbackMode: false,
  });

  const checkConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, testing: true }));
    
    const isConnected = isSupabaseConnected();
    
    if (!isConnected) {
      setConnectionStatus({
        connected: false,
        testing: false,
        fallbackMode: true,
        lastChecked: new Date().toLocaleTimeString(),
      });
      return;
    }

    const result = await testSupabaseConnection();
    
    setConnectionStatus({
      connected: result.success,
      testing: false,
      fallbackMode: !result.success,
      lastChecked: new Date().toLocaleTimeString(),
    });
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusColor = () => {
    if (connectionStatus.testing) return "text-yellow-600 bg-yellow-50";
    if (connectionStatus.connected) return "text-green-600 bg-green-50";
    return "text-orange-600 bg-orange-50";
  };

  const getStatusIcon = () => {
    if (connectionStatus.testing) return "🔄";
    if (connectionStatus.connected) return "✅";
    return "⚠️";
  };

  const getStatusText = () => {
    if (connectionStatus.testing) return "Testing connection...";
    if (connectionStatus.connected) return "Supabase Connected";
    return "Fallback Mode (localStorage)";
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            <span className="mr-2">{getStatusIcon()}</span>
            {getStatusText()}
          </div>
          
          {connectionStatus.lastChecked && (
            <span className="text-sm text-gray-500">
              Last checked: {connectionStatus.lastChecked}
            </span>
          )}
        </div>

        <button
          onClick={checkConnection}
          disabled={connectionStatus.testing}
          className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <span className="mr-1">🔄</span>
          Refresh
        </button>
      </div>

      {connectionStatus.fallbackMode && (
        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Running in fallback mode:</strong> Changes are saved to localStorage only. 
            To enable database functionality, check your Supabase configuration in Netlify environment variables.
          </p>
          <div className="mt-2 text-xs text-orange-600">
            <p>• Verify VITE_SUPABASE_URL is set correctly</p>
            <p>• Verify VITE_SUPABASE_ANON_KEY is set correctly</p>
            <p>• Ensure Supabase project is active</p>
          </div>
        </div>
      )}

      {connectionStatus.connected && (
        <div className="mt-2 text-sm text-green-600">
          ✓ Database connection active. All changes will be saved to Supabase.
        </div>
      )}
    </div>
  );
}
