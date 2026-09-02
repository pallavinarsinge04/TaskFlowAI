import { useEffect, useMemo, useState } from "react";
import "./TeamPage.css";
import {
  FaPlus,
  FaTrash,
  FaUsers,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { supabase } from "../../supabase/supabaseClient";

const API_URL = "http://localhost:5000/api";

function TeamPage() {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingMember, setEditingMember] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    userId: "",
    name: "",
    role: "member",
    status: "Online",
  });

  // =========================================
  // AUTH HEADERS
  // =========================================

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("Authentication session not found.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
    };
  };

  // =========================================
  // LOAD PROJECTS
  // =========================================

  const loadProjects = async () => {
    try {
      setProjectsLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(
        `${API_URL}/projects`,
        { headers }
      );

      const projectList =
        response.data?.projects || [];

      setProjects(projectList);

      if (projectList.length > 0) {
        setSelectedProjectId((currentId) => {
          if (
            currentId &&
            projectList.some(
              (project) => project.id === currentId
            )
          ) {
            return currentId;
          }

          return projectList[0].id;
        });
      } else {
        setSelectedProjectId("");
      }
    } catch (error) {
      console.error(
        "Load projects error:",
        error.response?.data || error.message
      );

      setProjects([]);
      setSelectedProjectId("");
    } finally {
      setProjectsLoading(false);
    }
  };

  // =========================================
  // LOAD TEAM MEMBERS
  // =========================================

  const loadMembers = async (projectId) => {
    if (!projectId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(
        `${API_URL}/team/project/${projectId}`,
        { headers }
      );

      setMembers(response.data?.members || []);
    } catch (error) {
      console.error(
        "Load team members error:",
        error.response?.data || error.message
      );

      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    loadProjects();
  }, []);

  // =========================================
  // PROJECT CHANGE
  // =========================================

  useEffect(() => {
    if (selectedProjectId) {
      loadMembers(selectedProjectId);
    }
  }, [selectedProjectId]);

  // =========================================
  // REALTIME
  // =========================================

  useEffect(() => {
    if (!selectedProjectId) return;

    let channel = null;
    let mounted = true;

    const setupRealtime = async () => {
      channel = supabase
        .channel(
          `team-page-${selectedProjectId}`
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "team_members",
            filter: `project_id=eq.${selectedProjectId}`,
          },
          () => {
            if (mounted) {
              loadMembers(selectedProjectId);
            }
          }
        );

      await channel.subscribe();
    };

    setupRealtime();

    return () => {
      mounted = false;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [selectedProjectId]);

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  // =========================================
  // OPEN ADD FORM
  // =========================================

  const openAddForm = () => {
    setEditingMember(null);

    setForm({
      userId: "",
      name: "",
      role: "member",
      status: "Online",
    });

    setShowForm(true);
  };

  // =========================================
  // OPEN EDIT FORM
  // =========================================

  const openEditForm = (member) => {
    setEditingMember(member);

    setForm({
      userId: member.user_id || "",
      name: member.name || "",
      role:
        member.role === "owner"
          ? "owner"
          : member.role || "member",
      status: member.status || "Offline",
    });

    setShowForm(true);
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const closeForm = () => {
    setShowForm(false);
    setEditingMember(null);

    setForm({
      userId: "",
      name: "",
      role: "member",
      status: "Online",
    });
  };

  // =========================================
  // ADD MEMBER
  // =========================================

  const addMember = async (event) => {
    event.preventDefault();

    if (!selectedProjectId) {
      alert("Please select a project first.");
      return;
    }

    if (!form.userId.trim()) {
      alert("Enter the user's Supabase User ID.");
      return;
    }

    if (!form.name.trim()) {
      alert("Enter member name.");
      return;
    }

    try {
      const headers = await getAuthHeaders();

      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.name
      )}&background=2563eb&color=ffffff`;

      const response = await axios.post(
        `${API_URL}/team/project/${selectedProjectId}`,
        {
          userId: form.userId.trim(),
          name: form.name.trim(),
          role: form.role,
          status: form.status,
          profileImage: avatar,
        },
        {
          headers,
        }
      );

      const newMember = response.data?.member;

      if (newMember) {
        setMembers((currentMembers) => {
          const exists = currentMembers.some(
            (member) => member.id === newMember.id
          );

          if (exists) {
            return currentMembers;
          }

          return [newMember, ...currentMembers];
        });
      }

      closeForm();

      alert("Team member added successfully.");
    } catch (error) {
      console.error(
        "Add member error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add team member."
      );
    }
  };

  // =========================================
  // UPDATE MEMBER
  // =========================================

  const updateMember = async (event) => {
    event.preventDefault();

    if (!editingMember) return;

    if (!form.name.trim()) {
      alert("Enter member name.");
      return;
    }

    try {
      const headers = await getAuthHeaders();

      const response = await axios.put(
        `${API_URL}/team/${editingMember.id}`,
        {
          name: form.name.trim(),
          role:
            editingMember.role === "owner"
              ? "owner"
              : form.role,
          status: form.status,
        },
        {
          headers,
        }
      );

      const updatedMember =
        response.data?.member;

      if (updatedMember) {
        setMembers((currentMembers) =>
          currentMembers.map((member) =>
            member.id === updatedMember.id
              ? updatedMember
              : member
          )
        );
      }

      closeForm();

      alert("Team member updated successfully.");
    } catch (error) {
      console.error(
        "Update member error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update team member."
      );
    }
  };

  // =========================================
  // REMOVE MEMBER
  // =========================================

  const removeMember = async (id) => {
    const member = members.find(
      (item) => item.id === id
    );

    if (member?.role === "owner") {
      alert("Project owner cannot be removed.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to remove this member?"
      )
    ) {
      return;
    }

    try {
      const headers = await getAuthHeaders();

      await axios.delete(
        `${API_URL}/team/${id}`,
        {
          headers,
        }
      );

      setMembers((currentMembers) =>
        currentMembers.filter(
          (memberItem) =>
            memberItem.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Remove member error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove team member."
      );
    }
  };

  // =========================================
  // SEARCH
  // =========================================

  const filtered = useMemo(() => {
    const searchText = search
      .toLowerCase()
      .trim();

    if (!searchText) {
      return members;
    }

    return members.filter((member) => {
      const name =
        member.name?.toLowerCase() || "";

      const role =
        member.role?.toLowerCase() || "";

      const status =
        member.status?.toLowerCase() || "";

      return (
        name.includes(searchText) ||
        role.includes(searchText) ||
        status.includes(searchText)
      );
    });
  }, [members, search]);

  // =========================================
  // UI
  // =========================================

  return (
    <div className="team-page">

      {/* HEADER */}

      <div className="team-header">

        <div>
          <h1>
            <FaUsers /> Team Management
          </h1>

          <p>
            Manage your project members,
            roles, and status.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={openAddForm}
          disabled={!selectedProjectId}
        >
          <FaPlus />
          Add Member
        </button>

      </div>

      {/* PROJECT SELECTOR */}

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Select Project
        </label>

        {projectsLoading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>
            No projects found. Create a project
            first.
          </p>
        ) : (
          <select
            value={selectedProjectId}
            onChange={(event) =>
              setSelectedProjectId(
                event.target.value
              )
            }
            style={{
              width: "100%",
              padding: "11px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: "15px",
            }}
          >
            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* TOOLBAR */}

      <div className="team-toolbar">

        <input
          type="text"
          placeholder="Search Member..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <span className="member-count">
          {filtered.length} Members
        </span>

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="add-member-card">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <h3>
              {editingMember
                ? "Edit Team Member"
                : "Add Team Member"}
            </h3>

            <button
              type="button"
              onClick={closeForm}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={
              editingMember
                ? updateMember
                : addMember
            }
          >

            {/* USER ID ONLY FOR ADD */}

            {!editingMember && (
              <>
                <label>
                  Supabase User ID
                </label>

                <input
                  type="text"
                  name="userId"
                  placeholder="Enter user's UUID"
                  value={form.userId}
                  onChange={handleChange}
                />

                <small
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#64748b",
                  }}
                >
                  This is the user's Supabase
                  Authentication UUID.
                </small>
              </>
            )}

            <label>
              Member Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={form.name}
              onChange={handleChange}
            />

            <label>
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={
                editingMember?.role === "owner"
              }
            >
              {editingMember?.role === "owner" ? (
                <option value="owner">
                  Owner
                </option>
              ) : (
                <>
                  <option value="member">
                    Member
                  </option>

                  <option value="viewer">
                    Viewer
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </>
              )}
            </select>

            <label>
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Online">
                Online
              </option>

              <option value="Away">
                Away
              </option>

              <option value="Busy">
                Busy
              </option>

              <option value="Offline">
                Offline
              </option>
            </select>

            <div className="form-buttons">

              <button type="submit">
                {editingMember
                  ? "Update"
                  : "Save"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={closeForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* MEMBERS */}

      {loading ? (
        <div className="empty-card">
          <h2>Loading...</h2>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-card">

          <h2>No Team Members</h2>

          <p>
            Add your first member to this
            project.
          </p>

        </div>
      ) : (
        <div className="member-grid">

          {filtered.map((member) => (

            <div
              className="member-card"
              key={member.id}
            >

              <img
                src={
                  member.profile_image ||
                  "https://i.pravatar.cc/150?img=1"
                }
                alt={member.name}
                className="avatar"
              />

              <h3>
                {member.name || "Team Member"}
              </h3>

              <p>
                {member.role || "member"}
              </p>

              <p>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      member.status === "Online"
                        ? "#22c55e"
                        : member.status === "Busy"
                        ? "#ef4444"
                        : member.status === "Away"
                        ? "#f59e0b"
                        : "#94a3b8",
                    marginRight: "6px",
                  }}
                />

                {member.status || "Offline"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >

                <button
                  className="delete-btn"
                  onClick={() =>
                    openEditForm(member)
                  }
                >
                  <FaEdit />
                  Edit
                </button>

                {member.role !== "owner" && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      removeMember(member.id)
                    }
                  >
                    <FaTrash />
                    Remove
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default TeamPage;