import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./TeamPage.css";

import {
  FaPlus,
  FaTrash,
  FaUsers,
  FaTimes,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import socket from "../../socket/socket";

const API_URL = "http://localhost:5000/api/team";
const PROJECT_API = "http://localhost:5000/api/projects";

function TeamPage() {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [editingMemberId, setEditingMemberId] =
    useState(null);

  const [editForm, setEditForm] = useState({
    role: "member",
    status: "Offline",
  });

  const [form, setForm] = useState({
    userId: "",
    name: "",
    role: "member",
    status: "Online",
  });

  // =====================================================
  // AUTH
  // =====================================================

  const getAuthHeaders = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.access_token) {
      throw new Error(
        "No active login session. Please login again."
      );
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  };

  // =====================================================
  // LOAD PROJECTS
  // =====================================================

  const loadProjects = async () => {
    try {
      const headers = await getAuthHeaders();

      const response = await axios.get(
        PROJECT_API,
        { headers }
      );

      const list =
        response.data?.projects || [];

      setProjects(list);

      if (
        list.length > 0 &&
        !selectedProjectId
      ) {
        setSelectedProjectId(list[0].id);
      }
    } catch (error) {
      console.error(
        "Load projects error:",
        error.response?.data ||
          error.message
      );
    }
  };

  // =====================================================
  // LOAD MEMBERS
  // =====================================================

  const loadMembers = async (projectId) => {
    if (!projectId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const headers =
        await getAuthHeaders();

      const response = await axios.get(
        `${API_URL}/project/${projectId}`,
        { headers }
      );

      setMembers(
        response.data?.members || []
      );
    } catch (error) {
      console.error(
        "Load members error:",
        error.response?.data ||
          error.message
      );

      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      loadMembers(selectedProjectId);
    }
  }, [selectedProjectId]);

  // =====================================================
  // REALTIME
  // =====================================================

  useEffect(() => {
    const handleAdded = (member) => {
      if (!member) return;

      if (
        member.project_id !==
        selectedProjectId
      ) {
        return;
      }

      setMembers((current) => {
        if (
          current.some(
            (item) =>
              item.id === member.id
          )
        ) {
          return current;
        }

        return [member, ...current];
      });
    };

    const handleUpdated = (member) => {
      if (!member) return;

      if (
        member.project_id !==
        selectedProjectId
      ) {
        return;
      }

      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, ...member }
            : item
        )
      );
    };

    const handleRemoved = (data) => {
      if (!data) return;

      setMembers((current) =>
        current.filter(
          (item) =>
            item.id !== data.id
        )
      );
    };

    socket.on(
      "teamMemberAdded",
      handleAdded
    );

    socket.on(
      "teamMemberUpdated",
      handleUpdated
    );

    socket.on(
      "teamMemberRemoved",
      handleRemoved
    );

    return () => {
      socket.off(
        "teamMemberAdded",
        handleAdded
      );

      socket.off(
        "teamMemberUpdated",
        handleUpdated
      );

      socket.off(
        "teamMemberRemoved",
        handleRemoved
      );
    };
  }, [selectedProjectId]);

  // =====================================================
  // ADD FORM
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD MEMBER
  // =====================================================

  const addMember = async (event) => {
    event.preventDefault();

    if (!selectedProjectId) {
      alert("Please select a project.");
      return;
    }

    if (!form.userId.trim()) {
      alert("Enter User ID.");
      return;
    }

    if (!form.name.trim()) {
      alert("Enter member name.");
      return;
    }

    try {
      const headers =
        await getAuthHeaders();

      const response =
        await axios.post(
          `${API_URL}/project/${selectedProjectId}`,
          {
            userId:
              form.userId.trim(),

            name:
              form.name.trim(),

            role:
              form.role,

            status:
              form.status,

            profileImage: "",
          },
          { headers }
        );

      const member =
        response.data?.member;

      if (member) {
        setMembers((current) => {
          if (
            current.some(
              (item) =>
                item.id === member.id
            )
          ) {
            return current;
          }

          return [member, ...current];
        });
      }

      setForm({
        userId: "",
        name: "",
        role: "member",
        status: "Online",
      });

      setShowForm(false);

      alert(
        "Member added successfully."
      );
    } catch (error) {
      console.error(
        "Add member error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add member."
      );
    }
  };

  // =====================================================
  // START EDIT
  // =====================================================

  const startEdit = (member) => {
    console.log(
      "Editing member:",
      member
    );

    setEditingMemberId(member.id);

    setEditForm({
      role:
        member.role || "member",

      status:
        member.status || "Offline",
    });
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const cancelEdit = () => {
    setEditingMemberId(null);

    setEditForm({
      role: "member",
      status: "Offline",
    });
  };

  // =====================================================
  // EDIT FORM CHANGE
  // =====================================================

  const handleEditChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const saveMember = async (memberId) => {
    console.log(
      "Saving member:",
      memberId,
      editForm
    );

    try {
      const headers =
        await getAuthHeaders();

      const response =
        await axios.put(
          `${API_URL}/${memberId}`,
          {
            role:
              editForm.role,

            status:
              editForm.status,
          },
          {
            headers,
          }
        );

      console.log(
        "Update response:",
        response.data
      );

      const updatedMember =
        response.data?.member;

      if (updatedMember) {
        setMembers((current) =>
          current.map((member) =>
            member.id ===
            updatedMember.id
              ? updatedMember
              : member
          )
        );
      }

      setEditingMemberId(null);

      alert(
        "Member updated successfully."
      );
    } catch (error) {
      console.error(
        "UPDATE MEMBER ERROR:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update member."
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const removeMember = async (id) => {
    if (
      !window.confirm(
        "Delete this team member?"
      )
    ) {
      return;
    }

    try {
      const headers =
        await getAuthHeaders();

      await axios.delete(
        `${API_URL}/${id}`,
        { headers }
      );

      setMembers((current) =>
        current.filter(
          (member) =>
            member.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete member error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove member."
      );
    }
  };

  // =====================================================
  // CLOSE ADD FORM
  // =====================================================

  const closeForm = () => {
    setShowForm(false);

    setForm({
      userId: "",
      name: "",
      role: "member",
      status: "Online",
    });
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filtered = useMemo(() => {
    const text =
      search.toLowerCase();

    return members.filter(
      (member) =>
        (member.name || "")
          .toLowerCase()
          .includes(text) ||
        (member.role || "")
          .toLowerCase()
          .includes(text)
    );
  }, [members, search]);
const handleNotificationCreated = (notification) => {
  if (!notification) return;

  if (notification.user_id !== user.id) {
    return;
  }

  console.log(
    "🔔 New notification:",
    notification
  );
};

socket.on(
  "notificationCreated",
  handleNotificationCreated
);
socket.off(
  "notificationCreated",
  handleNotificationCreated
);
  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="team-page">

      {/* HEADER */}

      <div className="team-header">

        <div>
          <h1>
            <FaUsers />
            Team Management
          </h1>

          <p>
            Manage members, roles and
            permissions.
          </p>
        </div>

        <button
          type="button"
          className="add-btn"
          onClick={() =>
            setShowForm(true)
          }
        >
          <FaPlus />
          Add Member
        </button>

      </div>

      {/* TOOLBAR */}

      <div className="team-toolbar">

        <select
          value={selectedProjectId}
          onChange={(event) =>
            setSelectedProjectId(
              event.target.value
            )
          }
        >
          <option value="">
            Select Project
          </option>

          {projects.map(
            (project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        <span className="member-count">
          {filtered.length} Members
        </span>

      </div>

      {/* ADD FORM */}

      {showForm && (
        <div className="add-member-card">

          <div className="add-member-header">

            <h3>
              Add Team Member
            </h3>

            <button
              type="button"
              onClick={closeForm}
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={addMember}
          >

            <label>
              Supabase User ID
            </label>

            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={
                handleChange
              }
              placeholder="User UUID"
            />

            <label>
              Member Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Member name"
            />

            <label>
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={
                handleChange
              }
            >
              <option value="member">
                Member
              </option>

              <option value="viewer">
                Viewer
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <label>
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={
                handleChange
              }
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
                Add Member
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
          <h2>
            Loading team...
          </h2>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-card">
          <h2>
            No Team Members
          </h2>

          <p>
            Add your first member.
          </p>
        </div>
      ) : (
        <div className="member-grid">

          {filtered.map(
            (member) => {

              const isEditing =
                editingMemberId ===
                member.id;

              return (
                <div
                  className="member-card"
                  key={member.id}
                >

                  <img
                    src={
                      member.profile_image ||
                      "https://i.pravatar.cc/150?img=1"
                    }
                    alt={
                      member.name
                    }
                    className="avatar"
                  />

                  <h3>
                    {member.name}
                  </h3>

                  {/* EDIT MODE */}

                  {isEditing ? (

                    <div className="edit-member-form">

                      <label>
                        Role
                      </label>

                      <select
                        name="role"
                        value={
                          editForm.role
                        }
                        onChange={
                          handleEditChange
                        }
                      >
                        <option value="member">
                          Member
                        </option>

                        <option value="viewer">
                          Viewer
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>

                      <label>
                        Status
                      </label>

                      <select
                        name="status"
                        value={
                          editForm.status
                        }
                        onChange={
                          handleEditChange
                        }
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

                      <div className="member-actions">

                        <button
                          type="button"
                          className="save-btn"
                          onClick={() =>
                            saveMember(
                              member.id
                            )
                          }
                        >
                          <FaSave />
                          Save
                        </button>

                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={
                            cancelEdit
                          }
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    <>
                      <p>
                        <strong>
                          Role:
                        </strong>{" "}
                        {member.role}
                      </p>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {member.status ||
                          "Offline"}
                      </p>

                      <div className="member-actions">

                        {member.role !==
                          "owner" && (
                          <>
                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                startEdit(
                                  member
                                )
                              }
                            >
                              <FaEdit />
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                removeMember(
                                  member.id
                                )
                              }
                            >
                              <FaTrash />
                              Remove
                            </button>
                          </>
                        )}

                        {member.role ===
                          "owner" && (
                          <div className="owner-badge">
                            👑 Project Owner
                          </div>
                        )}

                      </div>
                    </>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}

export default TeamPage;