import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./Profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar_url: "",
    role: "Full Stack Developer",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error);

        setProfile((prev) => ({
          ...prev,
          email: user.email,
        }));

        setLoading(false);
        return;
      }

      setProfile({
        name: data.name || "",
        email: data.email || user.email,
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || "",
        role: "Full Stack Developer",
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const fileName = `${user.id}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    const avatar = data.publicUrl;

    setProfile((prev) => ({
      ...prev,
      avatar_url: avatar,
    }));
  };

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
    });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...profile,
        profilePic: profile.avatar_url,
      })
    );

    window.dispatchEvent(new Event("profileUpdated"));

    alert("Profile Updated Successfully!");
  };

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">

      <div className="profile-banner">

        <div className="profile-card">

          <img
            src={
              profile.avatar_url ||
              "https://i.pravatar.cc/300"
            }
            alt=""
          />

          <div>

            <input
              type="file"
              onChange={handleUpload}
            />

            <input
              value={profile.name}
              placeholder="Name"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />

            <p>{profile.role}</p>

            <div className="profile-actions">

              <button onClick={saveProfile}>
                Save Profile
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="profile-grid">

        <div className="card">

          <h2>About Me</h2>

          <textarea
            value={profile.bio}
            rows={5}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio: e.target.value,
              })
            }
          />

        </div>

        <div className="card">

          <h2>Contact Information</h2>

          <input
            value={profile.email}
            disabled
          />

          <input
            value={profile.phone}
            placeholder="Phone"
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />

          <input
            value={profile.location}
            placeholder="Location"
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value,
              })
            }
          />

        </div>

        <div className="card">

          <h2>Skills</h2>

          <div className="skills">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Express</span>
            <span>Java</span>
            <span>Kotlin</span>
            <span>Firebase</span>
            <span>AI</span>
          </div>

        </div>

        <div className="card">

          <h2>Statistics</h2>

          <div className="stats">

            <div>
              <h3>25</h3>
              <p>Projects</p>
            </div>

            <div>
              <h3>120</h3>
              <p>Tasks</p>
            </div>

            <div>
              <h3>98%</h3>
              <p>Completion</p>
            </div>

          </div>

        </div>

        <div className="card">

          <h2>Recent Projects</h2>

          <ul>
            <li>TaskFlow AI</li>
            <li>Smart AI Ecommerce</li>
            <li>Student Attendance App</li>
            <li>Flashcard Quiz App</li>
          </ul>

        </div>

        <div className="card">

          <h2>AI Productivity Score</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: "92%" }}
            ></div>
          </div>

          <h3>92%</h3>

        </div>

      </div>

    </div>
  );
}

export default Profile;