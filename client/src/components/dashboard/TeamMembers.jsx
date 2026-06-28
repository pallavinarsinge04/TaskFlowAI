import "./TeamMembers.css";
import {
  FaCircle,
  FaEnvelope,
  FaPhone,
  FaTasks
} from "react-icons/fa";

function TeamMembers() {

  const members = [
    {
      name: "Pallavi Narsinge",
      role: "Project Manager",
      email: "pallavi@gmail.com",
      phone: "+91 9876543210",
      tasks: 18,
      productivity: 95,
      online: true,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Amit Sharma",
      role: "Frontend Developer",
      email: "amit@gmail.com",
      phone: "+91 9876543211",
      tasks: 14,
      productivity: 88,
      online: true,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Riya Patel",
      role: "Backend Developer",
      email: "riya@gmail.com",
      phone: "+91 9876543212",
      tasks: 12,
      productivity: 82,
      online: false,
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Karan Singh",
      role: "UI/UX Designer",
      email: "karan@gmail.com",
      phone: "+91 9876543213",
      tasks: 15,
      productivity: 91,
      online: true,
      image: "https://i.pravatar.cc/150?img=4"
    }
  ];

  return (
    <div className="team-members">

      <div className="team-header">

        <div>
          <h2>👥 Team Members</h2>
          <p>Manage your project team</p>
        </div>

        <button>Add Member</button>

      </div>

      <div className="team-grid">

        {members.map((member, index) => (

          <div className="member-card" key={index}>

            <div className="member-top">

              <img src={member.image} alt={member.name} />

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
                <strong>{member.productivity}%</strong>
                <span>Productivity</span>
              </div>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${member.productivity}%`
                }}
              ></div>

            </div>

            <button className="profile-btn">
              View Profile
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeamMembers;