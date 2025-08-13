import { useEffect, useState } from 'react';
import { testSupabaseConnection, isSupabaseConnected } from '@/lib/supabase';

export default function ConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'connected' | 'fallback' | 'error'>('testing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    if (!isSupabaseConnected()) {
      setStatus('fallback');
      setMessage('Supabase client not initialized - using local data');
      return;
    }

    try {
      const result = await testSupabaseConnection();
      if (result.success) {
        setStatus('connected');
        setMessage('Connected to Supabase successfully');
      } else {
        setStatus('error');
        setMessage(result.error || 'Connection failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Connection test failed');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'fallback': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return '✅';
      case 'fallback': return '⚠️';
      case 'error': return '❌';
      default: return '🔄';
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getStatusColor()} text-sm`}>
      <div className="flex items-center gap-2">
        <span>{getStatusIcon()}</span>
        <span className="font-medium">Database Status:</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
