import { useState, useEffect } from "react";
import "./TeamMembers.css";
import {
  FaCircle,
  FaEnvelope,
  FaPhone,
  FaTasks,
  FaPlus,
  FaTrash,
  FaEye,
} from "react-icons/fa";

function TeamMembers() {

  // ===========================
  // MEMBERS (Local Storage)
  // ===========================

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("teamMembers");
    return saved ? JSON.parse(saved) : [];
  });

  // ===========================
  // STATES
  // ===========================

  const [showForm, setShowForm] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [member, setMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    tasks: "",
    productivity: "",
    image: "",
    online: true,
  });

  // ===========================
  // LIVE CLOCK
  // ===========================

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // ===========================
  // SAVE TO LOCAL STORAGE
  // ===========================

  useEffect(() => {
    localStorage.setItem(
      "teamMembers",
      JSON.stringify(members)
    );
  }, [members]);

  // ===========================
  // HANDLE INPUT
  // ===========================

  const handleChange = (e) => {

    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });

  };

  // ===========================
  // ADD MEMBER
  // ===========================

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

    const newMember = {
      id: Date.now(),
      ...member,
      online: true,
    };

    setMembers([newMember, ...members]);

    setMember({
      name: "",
      role: "",
      email: "",
      phone: "",
      tasks: "",
      productivity: "",
      image: "",
      online: true,
    });

    setShowForm(false);

    alert("Member Added Successfully 🎉");
  };

  // ===========================
  // DELETE MEMBER
  // ===========================

  const deleteMember = (id) => {

    if (window.confirm("Delete this member?")) {

      setMembers(
        members.filter((m) => m.id !== id)
      );

    }

  };

  // ===========================
  // TOGGLE STATUS
  // ===========================

  const toggleStatus = (id) => {

    setMembers(

      members.map((m) =>

        m.id === id
          ? { ...m, online: !m.online }
          : m

      )

    );

  };

  // ===========================
  // SEARCH + FILTER
  // ===========================

  const filteredMembers = members.filter((m) => {

    const searchMatch = m.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const roleMatch =
      roleFilter === "All"
        ? true
        : m.role === roleFilter;

    return searchMatch && roleMatch;

  });<div>
        {/* TEAM MEMBERS */}

      {members.length === 0 ? (
        <div className="empty-members">
          <h2>No Team Members</h2>
          <p>
            Click <b>Add Member</b> to create your team.
          </p>
        </div>
      ) : (
        <div className="team-grid">

          {members.map((member) => (
            <div className="member-card" key={member.id}>

              <div className="member-top">

                <img
                  src={
                    member.image ||
                    "https://i.pravatar.cc/150"
                  }
                  alt={member.name}
                />

                <span
                  className={
                    member.online
                      ? "online-dot"
                      : "offline-dot"
                  }
                >
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
                />

              </div>

              <div className="member-buttons">

                <button
                  className="profile-btn"
                  onClick={() =>
                    setSelectedMember(member)
                  }
                >
                  View Profile
                </button>

                <button
                  className="status-btn"
                  onClick={() =>
                    toggleStatus(member.id)
                  }
                >
                  {member.online
                    ? "Go Offline"
                    : "Go Online"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeMember(member.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* PROFILE POPUP */}

      {selectedMember && (
        <div className="profile-modal">

          <div className="profile-card">

            <img
              src={
                selectedMember.image ||
                "https://i.pravatar.cc/150"
              }
              alt=""
            />

            <h2>{selectedMember.name}</h2>

            <h4>{selectedMember.role}</h4>

            <p>
              <b>Email :</b>{" "}
              {selectedMember.email}
            </p>

            <p>
              <b>Phone :</b>{" "}
              {selectedMember.phone}
            </p>

            <p>
              <b>Assigned Tasks :</b>{" "}
              {selectedMember.tasks}
            </p>

            <p>
              <b>Productivity :</b>{" "}
              {selectedMember.productivity}%
            </p>

            <p>
              <b>Status :</b>{" "}
              {selectedMember.online
                ? "🟢 Online"
                : "🔴 Offline"}
            </p>

            <button
              className="close-btn"
              onClick={() =>
                setSelectedMember(null)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default TeamMembers;