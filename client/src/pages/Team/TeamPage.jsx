import { useState, useEffect, useMemo } from "react";
import "./TeamPage.css";
import { FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  // ------------------------
  // Load Members
  // ------------------------

  const loadMembers = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setMembers(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Input Change
  // ------------------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------------
  // Add Member
  // ------------------------

  const addMember = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Enter member name");
      return;
    }

    if (!form.role.trim()) {
      alert("Enter role");
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login.");
        return;
      }

      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.name
      )}&background=2563eb&color=ffffff`;

      const { data, error } = await supabase
        .from("team_members")
        .insert([
          {
            user_id: user.id,
            name: form.name,
            role: form.role,
            status: "Online",
            profile_image: avatar,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMembers((prev) => [data, ...prev]);

      setForm({
        name: "",
        role: "",
      });

      setShowForm(false);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // ------------------------
  // Delete Member
  // ------------------------

  const removeMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMembers((prev) =>
        prev.filter((m) => m.id !== id)
      );
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // ------------------------
  // Search
  // ------------------------

  const filtered = useMemo(() => {
    return members.filter(
      (m) =>
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

          <p>Manage your project members.</p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Member
        </button>
      </div>

      <div className="team-toolbar">

        <input
          type="text"
          placeholder="Search Member..."
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

      {loading ? (
        <div className="empty-card">
          <h2>Loading...</h2>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-card">

          <h2>No Team Members</h2>

          <p>Add your first member.</p>

        </div>
      ) : (
        <div className="member-grid">

          {filtered.map((m) => (

            <div
              className="member-card"
              key={m.id}
            >

              <img
                src={
                  m.profile_image ||
                  "https://i.pravatar.cc/150?img=1"
                }
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