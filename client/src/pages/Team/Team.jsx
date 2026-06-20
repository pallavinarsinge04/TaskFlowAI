import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/team"
    );

    setMembers(res.data.members);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        👥 Team Members
      </h1>

      <div className="grid grid-cols-3 gap-5">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {member.name}
            </h2>

            <p>{member.role}</p>

            <p>{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;