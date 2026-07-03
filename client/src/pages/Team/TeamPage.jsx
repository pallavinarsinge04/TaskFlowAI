import { useState, useMemo, useEffect } from "react";
import "./TeamPage.css";
import { FaPlus, FaTrash, FaUsers } from "react-icons/fa";

function TeamPage() {

  // Load saved members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("teamMembers");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  // Save automatically whenever members change
  useEffect(() => {
    localStorage.setItem(
      "teamMembers",
      JSON.stringify(members)
    );
  }, [members]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addMember = (e) => {

    e.preventDefault();

    if (!form.name.trim() || !form.role.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: form.name,
      role: form.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.name
      )}&background=2563eb&color=ffffff`,
    };

    setMembers((prev) => [newMember, ...prev]);

    setForm({
      name: "",
      role: "",
    });

    setShowForm(false);
  };

  const removeMember = (id) => {

    if (window.confirm("Remove this member?")) {

      setMembers((prev) =>
        prev.filter((m) => m.id !== id)
      );

    }

  };

  const filtered = useMemo(() => {

    return members.filter((m) =>

      m.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      m.role
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [members, search]);

  return (

    <div className="team-page">

      <div className="team-header">

        <div>

          <h1>
            <FaUsers /> Team Management
          </h1>

          <p>
            Manage your project members.
          </p>

        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Add Member
        </button>

      </div>

      <div className="team-toolbar">

        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <span className="member-count">
          {filtered.length} Members
        </span>

      </div>

      {showForm && (

        <div className="add-member-card">

          <h3>Add Team Member</h3>

          <form onSubmit={addMember}>

            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
            />

            <div className="form-buttons">

              <button type="submit">
                Save
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

      {filtered.length === 0 ? (

        <div className="empty-card">

          <h2>No Team Members</h2>

          <p>
            Add your first member to get started.
          </p>

        </div>

      ) : (

        <div className="member-grid">

          {filtered.map((m) => (

            <div
              className="member-card"
              key={m.id}
            >

              <img
                src={m.avatar}
                alt={m.name}
                className="avatar"
              />

              <h3>{m.name}</h3>

              <p>{m.role}</p>

              <button
                className="delete-btn"
                onClick={() =>
                  removeMember(m.id)
                }
              >
                <FaTrash />
                Remove
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default TeamPage;