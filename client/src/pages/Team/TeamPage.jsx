import { useState } from "react";
import "./TeamPage.css";

function TeamPage() {
  const [members, setMembers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addMember = (e) => {
    e.preventDefault();

    if (!form.name || !form.role) {
      alert("Please fill all fields.");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: form.name,
      role: form.role,
    };

    setMembers([...members, newMember]);

    setForm({
      name: "",
      role: "",
    });

    setShowForm(false);
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="team-page">

      {/* HEADER */}

      <div className="team-header">

        <h2>👥 Team Members</h2>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Member
        </button>

      </div>

      {/* ADD MEMBER FORM */}

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
                Save Member
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}

      {/* MEMBER LIST */}

      {members.length === 0 ? (

        <div className="empty-card">

          <h2>No Team Members</h2>

          <p>
            Click the <b>Add Member</b> button to create your first team member.
          </p>

        </div>

      ) : (

        <div className="member-list">

          {members.map((m) => (

            <div className="member-card" key={m.id}>

              <div>

                <h3>{m.name}</h3>

                <p>{m.role}</p>

              </div>

              <button
                className="delete-btn"
                onClick={() => removeMember(m.id)}
              >
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