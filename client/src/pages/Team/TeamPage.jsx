import { useState } from "react";
import "./TeamPage.css";

function TeamPage() {
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
  ]);

  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    if (!form.name || !form.role) return;

    const newMember = {
      id: Date.now(),
      name: form.name,
      role: form.role,
    };

    setMembers([newMember, ...members]);

    setForm({ name: "", role: "" });
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="team-page">

      {/* HEADER */}
      <div className="team-header">
        <h2>Team Members</h2>
      </div>

      {/* ADD MEMBER BOX */}
      <div className="add-member-box">

        <input
          name="name"
          placeholder="Member Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="role"
          placeholder="Role (e.g Developer)"
          value={form.role}
          onChange={handleChange}
        />

        <button onClick={addMember}>
          + Add Member
        </button>

      </div>

      {/* MEMBERS LIST */}
      <div className="member-list">

        {members.map((m) => (
          <div key={m.id} className="member-card">

            <div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>

            <button
              className="delete"
              onClick={() => removeMember(m.id)}
            >
              Remove
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TeamPage;