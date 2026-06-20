import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({});

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    const res = await axios.get(

      `http://localhost:5000/api/profile/${user._id}`

    );

    setProfile(res.data.user);

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">

        <div className="flex items-center gap-6">

          <img

            src={
              profile.profileImage ||
              "https://via.placeholder.com/120"
            }

            className="w-32 h-32 rounded-full object-cover"

          />

          <div>

            <h1 className="text-3xl font-bold">

              {profile.name}

            </h1>

            <p>{profile.email}</p>

            <p>{profile.role}</p>

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">

            About

          </h2>

          <p>{profile.bio}</p>

          <p className="mt-2">

            📞 {profile.phone}

          </p>

          <p>

            📍 {profile.location}

          </p>

        </div>

      </div>

    </div>

  );

};

export default Profile;