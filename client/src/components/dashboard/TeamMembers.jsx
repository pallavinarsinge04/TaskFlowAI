import { useState } from "react";
import "./TeamMembers.css";
import {
  FaCircle,
  FaEnvelope,
  FaPhone,
  FaTasks,
  FaPlus,
} from "react-icons/fa";

function TeamMembers() {
  const [members, setMembers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [member, setMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    tasks: "",
    productivity: "",
    image: "",
  });

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const addMember = (e) => {
    e.preventDefault();

    if (
      !member.name ||
      !member.role ||
      !member.email ||
      !member.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setMembers([
      ...members,
      {
        ...member,
        online: true,
      },
    ]);

    setMember({
      name: "",
      role: "",
      email: "",
      phone: "",
      tasks: "",
      productivity: "",
      image: "",
    });

    setShowForm(false);
  };

  return (
    <div className="team-members">

      <div className="team-header">

        <div>
          <h2>👥 Team Members</h2>
          <p>Add and manage your project team</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
        >
          <FaPlus />
          Add Member
        </button>

      </div>

      {/* ADD MEMBER CARD */}

      {showForm && (

        <div className="add-member-card">

          <h3>Add New Member</h3>

          <form onSubmit={addMember}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={member.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={member.role}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={member.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={member.phone}
              onChange={handleChange}
            />

            <input
              type="number"
              name="tasks"
              placeholder="Assigned Tasks"
              value={member.tasks}
              onChange={handleChange}
            />

            <input
              type="number"
              name="productivity"
              placeholder="Productivity %"
              value={member.productivity}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={member.image}
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

      {/* MEMBERS */}

      {members.length === 0 ? (

        <div className="empty-members">

          <h2>No Team Members</h2>

          <p>
            Click <b>Add Member</b> to create your team.
          </p>

        </div>

      ) : (

        <div className="team-grid">

          {members.map((member, index) => (

            <div className="member-card" key={index}>

              <div className="member-top">

                <img
                  src={
                    member.image ||
                    "https://i.pravatar.cc/150"
                  }
                  alt={member.name}
                />

                <span className="online-dot">
                  <FaCircle />
                </span>

              </div>

              <h3>{member.name}</h3>

              <span className="role">
                {member.role}
              </span>

              <div className="contact">

                <p>
                  <FaEnvelope />
                  {member.email}
                </p>

                <p>
                  <FaPhone />
                  {member.phone}
                </p>

              </div>

              <div className="member-stats">

                <div>

                  <FaTasks />

                  <strong>{member.tasks}</strong>

                  <span>Tasks</span>

                </div>

                <div>

                  <strong>
                    {member.productivity}%
                  </strong>

                  <span>Productivity</span>

                </div>

              </div>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${member.productivity}%`,
                  }}
                ></div>

              </div>

              <button className="profile-btn">
                View Profile
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default TeamMembers;