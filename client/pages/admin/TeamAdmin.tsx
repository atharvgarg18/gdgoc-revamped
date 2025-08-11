import { useState, useEffect } from "react";
import { TeamMember } from "@shared/admin-types";

interface TeamAdminProps {
  token: string;
  onLogout: () => void;
}

export default function TeamAdmin({ token }: TeamAdminProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    image: "",
    bio: "",
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    },
    order: 1,
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/team", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingMember 
        ? `/api/admin/team/${editingMember.id}`
        : "/api/admin/team";
      
      const method = editingMember ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        fetchTeamMembers();
        resetForm();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Error saving team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        fetchTeamMembers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Error deleting team member");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      image: "",
      bio: "",
      social: {
        linkedin: "",
        github: "",
        twitter: "",
        instagram: "",
      },
      order: teamMembers.length + 1,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading team members...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gdsc-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Team Member
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gdsc-green font-medium">{member.role}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
              
              {/* Social Links */}
              <div className="flex space-x-2 mt-3">
                {member.social.linkedin && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">LinkedIn</span>
                )}
                {member.social.github && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">GitHub</span>
                )}
                {member.social.twitter && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Twitter</span>
                )}
                {member.social.instagram && (
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">Instagram</span>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">Order: {member.order}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lead, Technical Lead, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description about the team member"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Social Links (Optional)</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                        value={formData.social?.linkedin || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          social: { ...formData.social, linkedin: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">GitHub</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                        value={formData.social?.github || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          social: { ...formData.social, github: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Twitter</label>
                      <input
                        type="url"
                        placeholder="https://twitter.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                        value={formData.social?.twitter || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          social: { ...formData.social, twitter: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Instagram</label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gdsc-green focus:border-gdsc-green"
                        value={formData.social?.instagram || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          social: { ...formData.social, instagram: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gdsc-green rounded-md hover:bg-green-600"
                  >
                    {editingMember ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
