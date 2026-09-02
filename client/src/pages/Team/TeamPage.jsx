import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./TeamPage.css";
import {
  FaPlus,
  FaTrash,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import socket from "../../socket";

const API_URL = "http://localhost:5000/api/team";
const PROJECT_API = "http://localhost:5000/api/projects";

function TeamPage() {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    userId: "",
    name: "",
    role: "member",
    status: "Online",
  });

  // =====================================================
  // AUTH HEADERS
  // =====================================================

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error(
        "Your session has expired. Please login again."
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

      const response = await axios.get(PROJECT_API, {
        headers,
      });

      const projectList =
        response.data?.projects || [];

      setProjects(projectList);

      if (
        projectList.length > 0 &&
        !selectedProjectId
      ) {
        setSelectedProjectId(
          projectList[0].id
        );
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
        {
          headers,
        }
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
  // REALTIME TEAM UPDATES
  // =====================================================

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    const handleMemberAdded = (member) => {
      if (!member) return;

      if (
        member.project_id !==
        selectedProjectId
      ) {
        return;
      }

      setMembers((currentMembers) => {
        const exists =
          currentMembers.some(
            (item) =>
              item.id === member.id
          );

        if (exists) {
          return currentMembers;
        }

        return [
          member,
          ...currentMembers,
        ];
      });
    };

    const handleMemberUpdated = (
      member
    ) => {
      if (!member) return;

      if (
        member.project_id !==
        selectedProjectId
      ) {
        return;
      }

      setMembers((currentMembers) =>
        currentMembers.map((item) =>
          item.id === member.id
            ? {
                ...item,
                ...member,
              }
            : item
        )
      );
    };

    const handleMemberRemoved = (
      data
    ) => {
      if (!data) return;

      if (
        data.projectId &&
        data.projectId !==
          selectedProjectId
      ) {
        return;
      }

      setMembers((currentMembers) =>
        currentMembers.filter(
          (item) =>
            item.id !== data.id
        )
      );
    };

    socket.on(
      "teamMemberAdded",
      handleMemberAdded
    );

    socket.on(
      "teamMemberUpdated",
      handleMemberUpdated
    );

    socket.on(
      "teamMemberRemoved",
      handleMemberRemoved
    );

    return () => {
      socket.off(
        "teamMemberAdded",
        handleMemberAdded
      );

      socket.off(
        "teamMemberUpdated",
        handleMemberUpdated
      );

      socket.off(
        "teamMemberRemoved",
        handleMemberRemoved
      );
    };
  }, [selectedProjectId]);

  // =====================================================
  // FORM CHANGE
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
      alert(
        "Please select a project first."
      );
      return;
    }

    if (!form.userId.trim()) {
      alert(
        "Enter the Supabase User ID."
      );
      return;
    }

    if (!form.name.trim()) {
      alert(
        "Enter member name."
      );
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
          {
            headers,
          }
        );

      const newMember =
        response.data?.member;

      /*
       Socket.IO will also send the event.
       We do not manually insert here if
       the socket event will handle it.
      */

      if (newMember) {
        setMembers(
          (currentMembers) => {
            const exists =
              currentMembers.some(
                (item) =>
                  item.id ===
                  newMember.id
              );

            if (exists) {
              return currentMembers;
            }

            return [
              newMember,
              ...currentMembers,
            ];
          }
        );
      }

      setForm({
        userId: "",
        name: "",
        role: "member",
        status: "Online",
      });

      setShowForm(false);

      alert(
        "Team member added successfully."
      );
    } catch (error) {
      console.error(
        "Add member error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add team member."
      );
    }
  };

  // =====================================================
  // DELETE MEMBER
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
        {
          headers,
        }
      );

      /*
       Socket event also removes it.
       We remove locally immediately for
       faster UI response.
      */

      setMembers(
        (currentMembers) =>
          currentMembers.filter(
            (member) =>
              member.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Remove member error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove member."
      );
    }
  };

  // =====================================================
  // CLOSE FORM
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
  // FILTER MEMBERS
  // =====================================================

  const filtered = useMemo(() => {
    const searchText =
      search.toLowerCase();

    return members.filter(
      (member) =>
        (member.name || "")
          .toLowerCase()
          .includes(searchText) ||
        (member.role || "")
          .toLowerCase()
          .includes(searchText)
    );
  }, [members, search]);

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
            Manage your project members.
          </p>
        </div>

        <button
          className="add-btn"
          type="button"
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
          placeholder="Search existing members..."
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

      {/* ADD MEMBER */}

      {showForm && (
        <div className="add-member-card">

          <div className="add-member-header">

            <h3>
              Add Team Member
            </h3>

            <button
              type="button"
              onClick={closeForm}
              title="Close"
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={addMember}
          >

            {/* USER ID */}

            <label>
              Supabase User ID
            </label>

            <input
              type="text"
              name="userId"
              placeholder="Enter Supabase Authentication UUID"
              value={form.userId}
              onChange={
                handleChange
              }
            />

            <small>
              Enter the UUID of the
              registered Supabase user.
            </small>

            {/* NAME */}

            <label>
              Member Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={form.name}
              onChange={
                handleChange
              }
            />

            {/* ROLE */}

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

            {/* STATUS */}

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

            {/* BUTTONS */}

            <div className="form-buttons">

              <button type="submit">
                Add Member
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={
                  closeForm
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* MEMBER LIST */}

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
            (member) => (
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

                <p>
                  {member.role}
                </p>

                <span>
                  {member.status ||
                    "Offline"}
                </span>

                {member.role !==
                  "owner" && (
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() =>
                      removeMember(
                        member.id
                      )
                    }
                  >
                    <FaTrash />
                    Remove
                  </button>
                )}

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default TeamPage;