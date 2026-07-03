import "./TeamMembers.css";
import {
  FaCircle,
  FaEnvelope,
  FaPhone,
  FaUsers
} from "react-icons/fa";

function TeamMembers() {

  const members = [

    {
      id:1,
      name:"John Smith",
      role:"Project Manager",
      status:"Online",
      image:"https://i.pravatar.cc/150?img=11"
    },

    {
      id:2,
      name:"Emma Wilson",
      role:"UI Designer",
      status:"Online",
      image:"https://i.pravatar.cc/150?img=12"
    },

    {
      id:3,
      name:"David Lee",
      role:"Backend Developer",
      status:"Away",
      image:"https://i.pravatar.cc/150?img=13"
    },

    {
      id:4,
      name:"Sophia Brown",
      role:"Frontend Developer",
      status:"Offline",
      image:"https://i.pravatar.cc/150?img=14"
    }

  ];

  return (

    <div className="team-members">

      <div className="team-header">

        <div>

          <h2>

            <FaUsers />

            Team Members

          </h2>

          <p>Project Collaboration</p>

        </div>

        <button className="view-btn">

          View All

        </button>

      </div>

      <div className="team-list">

        {members.map(member=>(

          <div
            className="team-card"
            key={member.id}
          >

            <img
              src={member.image}
              alt={member.name}
            />

            <div className="member-info">

              <h3>

                {member.name}

              </h3>

              <p>

                {member.role}

              </p>

              <span className={member.status.toLowerCase()}>

                <FaCircle />

                {member.status}

              </span>

            </div>

            <div className="member-actions">

              <button>

                <FaEnvelope />

              </button>

              <button>

                <FaPhone />

              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="team-footer">

        <div>

          <h3>26</h3>

          <p>Total Members</p>

        </div>

        <div>

          <h3>18</h3>

          <p>Online</p>

        </div>

        <div>

          <h3>8</h3>

          <p>Offline</p>

        </div>

      </div>

    </div>

  );

}

export default TeamMembers;