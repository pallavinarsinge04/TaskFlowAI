import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./ProjectAnalytics.css";

function ProjectAnalytics({ projectId }) {

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    high: 0,
    upcoming: 0,
    progress: 0
  });

  useEffect(() => {
    loadAnalytics();
  }, [projectId]);

  async function loadAnalytics() {

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.log(error);
      return;
    }

    const total = data.length;

    const completed = data.filter(
      task => task.completed
    ).length;

    const pending = total - completed;

    const high = data.filter(
      task => task.priority === "High"
    ).length;

    const today = new Date();

    const upcoming = data.filter(task => {

      if (!task.due_date) return false;

      return new Date(task.due_date) >= today;

    }).length;

    const progress =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    setStats({
      total,
      completed,
      pending,
      high,
      upcoming,
      progress
    });

  }

  return (

    <div className="analytics-container">

      <div className="analytics-card">

        <h3>Total Tasks</h3>

        <h2>{stats.total}</h2>

      </div>

      <div className="analytics-card">

        <h3>Completed</h3>

        <h2>{stats.completed}</h2>

      </div>

      <div className="analytics-card">

        <h3>Pending</h3>

        <h2>{stats.pending}</h2>

      </div>

      <div className="analytics-card">

        <h3>High Priority</h3>

        <h2>{stats.high}</h2>

      </div>

      <div className="analytics-card">

        <h3>Upcoming</h3>

        <h2>{stats.upcoming}</h2>

      </div>

      <div className="analytics-card">

        <h3>Completion</h3>

        <h2>{stats.progress}%</h2>

      </div>

    </div>

  );

}

export default ProjectAnalytics;