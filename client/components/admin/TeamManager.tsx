import React, { useState, useEffect } from "react";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getFacultyAndAlumni,
  createFacultyAndAlumni,
  updateFacultyAndAlumni,
  deleteFacultyAndAlumni,
  TeamMember,
  FacultyAndAlumni,
} from "@/lib/supabase";
import { validateAndFormatUrl } from "@/lib/urlUtils";

export default function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [facultyAndAlumni, setFacultyAndAlumni] = useState<FacultyAndAlumni[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | FacultyAndAlumni | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    profile_type: "Lead" as "Lead" | "Co-Lead" | "Mentor" | "Faculty Mentor" | "Former Leads",
    image: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    display_order: 1,
  });

  useEffect(() => {
    loadTeamMembers();
    loadFacultyAndAlumni();
  }, []);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    const result = await getTeamMembers();
    if (result.success) {
      setTeamMembers(result.data);
    }
    setIsLoading(false);
  };

  const loadFacultyAndAlumni = async () => {
    setIsLoading(true);
    const result = await getFacultyAndAlumni();
    if (result.success) {
      setFacultyAndAlumni(result.data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate and format URLs
      const processedData = {
        ...formData,
        linkedin: formData.linkedin
          ? validateAndFormatUrl(formData.linkedin) || ""
          : "",
        github: formData.github
          ? validateAndFormatUrl(formData.github) || ""
          : "",
        twitter: formData.twitter
          ? validateAndFormatUrl(formData.twitter) || ""
          : "",
        instagram: formData.instagram
          ? validateAndFormatUrl(formData.instagram) || ""
          : "",
      };

      // Check for invalid URLs
      const invalidUrls = [];
      if (formData.linkedin && !processedData.linkedin)
        invalidUrls.push("LinkedIn");
      if (formData.github && !processedData.github) invalidUrls.push("GitHub");
      if (formData.twitter && !processedData.twitter)
        invalidUrls.push("Twitter");
      if (formData.instagram && !processedData.instagram)
        invalidUrls.push("Instagram");

      if (invalidUrls.length > 0) {
        alert(
          `Please enter valid URLs for: ${invalidUrls.join(", ")} (e.g., https://linkedin.com/in/username)`,
        );
        setIsSubmitting(false);
        return;
      }

      // Determine which table to use based on profile type
      const isFacultyOrAlumni = processedData.profile_type === "Faculty Mentor" || processedData.profile_type === "Former Leads";
      console.log('🔍 Debug Info:', {
        profile_type: processedData.profile_type,
        isFacultyOrAlumni,
        editingMember: !!editingMember,
        data: processedData
      });

      if (editingMember) {
        let result;
        if (isFacultyOrAlumni) {
          const facultyAlumniData = {
            ...processedData,
            profile_type: processedData.profile_type as "Faculty Mentor" | "Former Leads"
          };
          console.log('🔄 Updating faculty/alumni:', facultyAlumniData);
          result = await updateFacultyAndAlumni(editingMember.id, facultyAlumniData);
        } else {
          // Only pass valid TeamMember profile types
          const teamMemberData = {
            ...processedData,
            profile_type: processedData.profile_type as "Lead" | "Co-Lead" | "Mentor"
          };
          console.log('🔄 Updating team member:', teamMemberData);
          result = await updateTeamMember(editingMember.id, teamMemberData);
        }
        
        console.log('✅ Update result:', result);
        if (result.success) {
          await loadTeamMembers();
          await loadFacultyAndAlumni();
          resetForm();
        } else {
          alert(`Error updating member: ${result.error}`);
        }
      } else {
        let result;
        if (isFacultyOrAlumni) {
          const facultyAlumniData = {
            ...processedData,
            profile_type: processedData.profile_type as "Faculty Mentor" | "Former Leads"
          };
          console.log('➕ Creating faculty/alumni:', facultyAlumniData);
          result = await createFacultyAndAlumni(facultyAlumniData);
        } else {
          const teamMemberData = {
            ...processedData,
            profile_type: processedData.profile_type as "Lead" | "Co-Lead" | "Mentor"
          };
          console.log('➕ Creating team member:', teamMemberData);
          result = await createTeamMember(teamMemberData);
        }
        
        console.log('✅ Create result:', result);
        if (result.success) {
          await loadTeamMembers();
          await loadFacultyAndAlumni();
          resetForm();
        } else {
          alert(`Error creating member: ${result.error}`);
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (member: TeamMember | FacultyAndAlumni) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    let result;
    if (member.profile_type === "Faculty Mentor" || member.profile_type === "Former Leads") {
      result = await deleteFacultyAndAlumni(member.id);
      if (result.success) {
        await loadFacultyAndAlumni();
      }
    } else {
      result = await deleteTeamMember(member.id);
      if (result.success) {
        await loadTeamMembers();
      }
    }

    if (!result.success) {
      alert(`Error deleting team member: ${result.error}`);
    }
  };

  const handleEdit = (member: TeamMember | FacultyAndAlumni) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      profile_type: member.profile_type || "Lead",
      image: member.image,
      bio: member.bio,
      linkedin: member.linkedin || "",
      github: member.github || "",
      twitter: member.twitter || "",
      instagram: member.instagram || "",
      display_order: member.display_order,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      profile_type: "Lead" as "Lead" | "Co-Lead" | "Mentor" | "Faculty Mentor" | "Former Leads",
      image: "",
      bio: "",
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
      display_order: teamMembers.length + 1,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gdsc-blue rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-gdsc-red rounded-full animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gdsc-yellow rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gdsc-green rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gdsc-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          + Add Team Member
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...teamMembers, ...facultyAndAlumni].map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x300?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gdsc-green font-medium text-sm mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex space-x-2 mb-3">
                {member.linkedin && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    LinkedIn
                  </span>
                )}
                {member.github && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    GitHub
                  </span>
                )}
                {member.twitter && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Twitter
                  </span>
                )}
                {member.instagram && (
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                    Instagram
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Order: {member.display_order}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {teamMembers.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No team members found. Add your first team member!
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingMember ? "Edit Team Member" : "Add New Team Member"}
                </h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Type *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                    value={formData.profile_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile_type: e.target.value as
                          | "Lead"
                          | "Co-Lead" 
                          | "Mentor"
                          | "Faculty Mentor"
                          | "Former Leads",
                      })
                    }
                    required
                  >
                    <option value="Lead">Lead</option>
                    <option value="Co-Lead">Co-Lead</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Faculty Mentor">Faculty Mentor</option>
                    <option value="Former Leads">Former Leads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Social Links (Optional)
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Full URL including https://
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                        value={formData.github}
                        onChange={(e) =>
                          setFormData({ ...formData, github: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Full URL including https://
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Twitter URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://twitter.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                        value={formData.twitter}
                        onChange={(e) =>
                          setFormData({ ...formData, twitter: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Full URL including https://
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gdsc-green"
                        value={formData.instagram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instagram: e.target.value,
                          })
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Full URL including https://
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-gdsc-green rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingMember
                        ? "Update Member"
                        : "Add Member"}
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
