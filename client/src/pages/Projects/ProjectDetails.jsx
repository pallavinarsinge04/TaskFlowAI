import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import TaskList from "./TaskList";
import {
  FaCalendarAlt,
  FaChartLine,
  FaFlag,
  FaClipboardList
} from "react-icons/fa";
import "./ProjectDetails.css";

function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {

    loadProject();

  }, []);

  async function loadProject() {

    const { data, error } = await supabase

      .from("projects")

      .select("*")

      .eq("id", id)

      .single();

    if (error) {

      alert(error.message);

      return;

    }

    setProject(data);

  }

  if (!project) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="project-details">

      <div className="details-header">

        <div>

          <h1>{project.title}</h1>

          <p>{project.description}</p>

        </div>

      </div>

      <div className="details-grid">

        <div className="details-card">

          <FaFlag />

          <h3>Status</h3>

          <p>{project.status}</p>

        </div>

        <div className="details-card">

          <FaChartLine />

          <h3>Progress</h3>

          <p>{project.progress}%</p>

        </div>
        <TaskList projectId={project.id} />

        <div className="details-card">

          <FaClipboardList />

          <h3>Priority</h3>

          <p>{project.priority}</p>

        </div>

        <div className="details-card">

          <FaCalendarAlt />

          <h3>Due Date</h3>

          <p>{project.due_date || "No Date"}</p>

        </div>

      </div>

      <div className="progress-wrapper">

        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{

              width: `${project.progress}%`

            }}

          />

        </div>

      </div>

    </div>

  );

}

export default ProjectDetails;