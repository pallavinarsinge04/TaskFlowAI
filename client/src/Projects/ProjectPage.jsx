import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { FaPlus, FaSearch } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";
import "./Project.css";

function ProjectPage() {

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, search, statusFilter]);

  async function loadProjects() {

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setProjects(data);
    setLoading(false);
  }

  function filterProjects() {

    let result = [...projects];

    if (statusFilter !== "All") {
      result = result.filter(
        (p) => p.status === statusFilter
      );
    }

    if (search !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProjects(result);
  }

  return (
    <div className="project-page">

      <div className="project-header">

        <div>
          <h1>Projects</h1>
          <p>Manage all your projects</p>
        </div>

        <button
          className="new-project-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          New Project
        </button>

      </div>

      <div className="project-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

      </div>

      {loading ? (

        <h2>Loading...</h2>

      ) : (

        <div className="project-grid">

          {filteredProjects.length === 0 ? (

            <h3>No Projects Found</h3>

          ) : (

            filteredProjects.map((project) => (

              <ProjectCard
                key={project.id}
                project={project}
                reload={loadProjects}
              />

            ))

          )}

        </div>

      )}

      {showModal && (

        <AddProjectModal
          close={() => setShowModal(false)}
          reload={loadProjects}
        />

      )}

    </div>
  );
}

export default ProjectPage;