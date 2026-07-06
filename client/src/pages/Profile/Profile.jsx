import { useState, useEffect } from "react";
import "./Profile.css";
import { supabase } from "../../supabase/supabaseClient";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  // ===============================
  // Load Profile
  // ===============================
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

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setProfile(data);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.name,
            email: data.email,
            profilePic: data.avatar_url,
          })
        );
      } else {
        setProfile((prev) => ({
          ...prev,
          id: user.id,
          email: user.email,
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Upload Profile Photo
  // ===============================
  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const fileName = `${profile.id}-${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file, {
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      setProfile((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // ===============================
  // Save Profile
  // ===============================
  const saveProfile = async () => {
    try {
      setSaving(true);

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: profile.id,
          name: profile.name,
          role: profile.role,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
        });

      if (error) throw error;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: profile.name,
          email: profile.email,
          profilePic: profile.avatar_url,
        })
      );

      window.dispatchEvent(
        new Event("profileUpdated")
      );

      alert("Profile Updated Successfully!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
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
            alt="Profile"
          />

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />

          <div>

            <input
              type="text"
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              value={profile.role}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  role: e.target.value,
                })
              }
            />
                        <div className="profile-actions">

              <button onClick={saveProfile}>
                {saving ? "Saving..." : "Save Profile"}
              </button>

              <button
                onClick={() =>
                  navigator.share
                    ? navigator.share({
                        title: profile.name,
                        text: "Check out my profile!",
                      })
                    : alert("Sharing not supported")
                }
              >
                Share Profile
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="profile-grid">

        {/* About */}

        <div className="card">

          <h2>About Me</h2>

          <textarea
            rows="5"
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio: e.target.value,
              })
            }
          />

        </div>

        {/* Contact */}

        <div className="card">

          <h2>Contact Information</h2>

          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={profile.location}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value,
              })
            }
          />

        </div>

        {/* Skills */}

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
            <span>Supabase</span>
            <span>AI</span>

          </div>

        </div>

        {/* Statistics */}

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

        {/* Recent Projects */}

        <div className="card">

          <h2>Recent Projects</h2>

          <ul>

            <li>TaskFlow AI</li>

            <li>AI Attendance Management</li>

            <li>Student Attendance App</li>

            <li>Flashcard Quiz App</li>

          </ul>

        </div>

        {/* AI Score */}

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