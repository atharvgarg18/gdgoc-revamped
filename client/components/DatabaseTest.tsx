import React, { useEffect, useState } from 'react';
import { getFacultyAndAlumni, createFacultyAndAlumni, FacultyAndAlumni, supabase } from '../lib/supabase';

export default function DatabaseTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [facultyData, setFacultyData] = useState<FacultyAndAlumni[]>([]);

  const addLog = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSupabaseConnection = async () => {
    addLog("Testing Supabase connection...");
    if (!supabase) {
      addLog("❌ Supabase client not initialized - running in fallback mode");
      return;
    }
    addLog("✅ Supabase client initialized");

    // Test basic connection
    try {
      const { data, error } = await supabase.from('faculty_and_alumni').select('count').limit(1);
      if (error) {
        addLog(`❌ Table access error: ${error.message}`);
      } else {
        addLog("✅ Can access faculty_and_alumni table");
      }
    } catch (error) {
      addLog(`❌ Connection test failed: ${error}`);
    }
  };

  const testDirectQuery = async () => {
    addLog("Testing direct table query...");
    if (!supabase) {
      addLog("❌ No Supabase client");
      return;
    }

    try {
      const { data, error, count } = await supabase
        .from('faculty_and_alumni')
        .select('*', { count: 'exact' });
      
      if (error) {
        addLog(`❌ Direct query error: ${error.message} (Code: ${error.code})`);
        addLog(`❌ Error details: ${JSON.stringify(error.details)}`);
      } else {
        addLog(`✅ Direct query success: Found ${count} records`);
        addLog(`📊 Data: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      addLog(`❌ Direct query exception: ${error}`);
    }
  };

  const testFacultyConnection = async () => {
    addLog("Testing getFacultyAndAlumni API...");
    try {
      const result = await getFacultyAndAlumni();
      addLog(`✅ getFacultyAndAlumni success: ${JSON.stringify(result)}`);
      if (result.success && result.data) {
        setFacultyData(result.data);
        addLog(`📊 Found ${result.data.length} faculty/alumni members`);
      }
    } catch (error) {
      addLog(`❌ getFacultyAndAlumni error: ${error}`);
    }
  };

  const testCreateFaculty = async () => {
    addLog("Testing createFacultyAndAlumni...");
    try {
      const testMember = {
        name: "Test Faculty Member",
        role: "Test Advisor",
        profile_type: "Faculty Mentor" as const,
        bio: "This is a test faculty member",
        image: "https://via.placeholder.com/300",
        display_order: 999
      };
      
      addLog(`🔄 Attempting to create: ${JSON.stringify(testMember)}`);
      const result = await createFacultyAndAlumni(testMember);
      addLog(`✅ createFacultyAndAlumni result: ${JSON.stringify(result)}`);
    } catch (error) {
      addLog(`❌ createFacultyAndAlumni error: ${error}`);
    }
  };

  useEffect(() => {
    const runTests = async () => {
      await testSupabaseConnection();
      await testDirectQuery();
      await testFacultyConnection();
    };
    runTests();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className="mb-6">
        <button 
          onClick={testSupabaseConnection}
          className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Connection
        </button>
        <button 
          onClick={testDirectQuery}
          className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Direct Query
        </button>
        <button 
          onClick={testFacultyConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Get Faculty
        </button>
        <button 
          onClick={testCreateFaculty}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test Create Faculty
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Faculty Data ({facultyData.length})</h2>
        <div className="bg-gray-100 p-4 rounded">
          {facultyData.length > 0 ? (
            <ul>
              {facultyData.map(member => (
                <li key={member.id} className="mb-2">
                  <strong>{member.name}</strong> - {member.role} ({member.profile_type})
                </li>
              ))}
            </ul>
          ) : (
            <p>No faculty/alumni data found</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Test Log</h2>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
          {testResults.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
