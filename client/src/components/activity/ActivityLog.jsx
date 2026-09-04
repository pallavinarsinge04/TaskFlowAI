import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaHistory,
  FaSearch,
  FaFilter,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaRobot,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaUserPlus,
  FaUserMinus,
  FaShieldAlt,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import socket from "../../socket/socket";

import "./ActivityLog.css";

const API = "http://localhost:5000/api/activity-logs";

function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] =
    useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // AUTH HEADERS
  // --------------------------------------------------

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("User is not authenticated.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  };

  // --------------------------------------------------
  // LOAD PROJECTS
  // --------------------------------------------------

  const loadProjects = async () => {
    try {
      const headers = await getAuthHeaders();

      const response = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers,
        }
      );

      setProjects(response.data?.projects || []);
    } catch (error) {
      console.error(
        "Load projects error:",
        error.response?.data || error.message
      );

      setProjects([]);
    }
  };

  // --------------------------------------------------
  // LOAD ACTIVITIES
  // --------------------------------------------------

  const loadActivities = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const params = {};

      if (selectedProjectId) {
        params.projectId = selectedProjectId;
      }

      const response = await axios.get(API, {
        headers,
        params,
      });

      console.log(
        "Activity API response:",
        response.data
      );

      setActivities(
        response.data?.activities || []
      );
    } catch (error) {
      console.error(
        "Load activities error:",
        error.response?.data || error.message
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadProjects();
  }, []);

  // --------------------------------------------------
  // PROJECT CHANGE
  // --------------------------------------------------

  useEffect(() => {
    loadActivities();
  }, [selectedProjectId]);

  // --------------------------------------------------
  // REALTIME
  // --------------------------------------------------

  useEffect(() => {
    const handleActivityCreated = async (activity) => {
      if (!activity) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      if (activity.user_id !== user.id) {
        return;
      }

      if (
        selectedProjectId &&
        activity.project_id !== selectedProjectId
      ) {
        return;
      }

      setActivities((currentActivities) => {
        const exists = currentActivities.some(
          (item) => item.id === activity.id
        );

        if (exists) {
          return currentActivities;
        }

        return [
          activity,
          ...currentActivities,
        ];
      });
    };

    socket.on(
      "activityCreated",
      handleActivityCreated
    );

    return () => {
      socket.off(
        "activityCreated",
        handleActivityCreated
      );
    };
  }, [selectedProjectId]);

  // --------------------------------------------------
  // ACTIVITY ICON
  // --------------------------------------------------

  const getActivityIcon = (activity) => {
    const action =
      activity.action?.toLowerCase() || "";

    const entity =
      activity.entity_type?.toLowerCase() || "";

    if (
      action.includes("project") ||
      entity === "project"
    ) {
      return <FaProjectDiagram />;
    }

    if (
      action.includes("task") ||
      entity === "task"
    ) {
      if (action.includes("complete")) {
        return <FaCheckCircle />;
      }

      if (action.includes("delete")) {
        return <FaTrash />;
      }

      if (action.includes("update")) {
        return <FaEdit />;
      }

      return <FaTasks />;
    }

    if (
      action.includes("member") ||
      action.includes("team") ||
      entity === "team_member"
    ) {
      if (action.includes("remove")) {
        return <FaUserMinus />;
      }

      if (action.includes("add")) {
        return <FaUserPlus />;
      }

      return <FaUsers />;
    }

    if (
      action.includes("ai") ||
      entity === "ai"
    ) {
      return <FaRobot />;
    }

    if (action.includes("delete")) {
      return <FaTrash />;
    }

    if (action.includes("update")) {
      return <FaEdit />;
    }

    if (action.includes("create")) {
      return <FaPlus />;
    }

    if (action.includes("role")) {
      return <FaShieldAlt />;
    }

    return <FaHistory />;
  };

  // --------------------------------------------------
  // FILTER ACTIVITIES
  // --------------------------------------------------

  const filteredActivities = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return activities.filter((activity) => {
      const matchesSearch =
        !searchText ||
        activity.action
          ?.toLowerCase()
          .includes(searchText) ||
        activity.description
          ?.toLowerCase()
          .includes(searchText) ||
        activity.entity_type
          ?.toLowerCase()
          .includes(searchText);

      if (!matchesSearch) {
        return false;
      }

      if (filter === "projects") {
        return (
          activity.entity_type === "project"
        );
      }

      if (filter === "tasks") {
        return (
          activity.entity_type === "task"
        );
      }

      if (filter === "team") {
        return (
          activity.entity_type ===
          "team_member"
        );
      }

      return true;
    });
  }, [activities, search, filter]);

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString();
  };

  // --------------------------------------------------
  // RELATIVE TIME
  // --------------------------------------------------

  const getRelativeTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const created = new Date(date);

    const seconds = Math.floor(
      (now - created) / 1000
    );

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(
      seconds / 60
    );

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} day${
        days > 1 ? "s" : ""
      } ago`;
    }

    return formatDate(date);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="activity-page">

      {/* HEADER */}

      <div className="activity-header">

        <div className="activity-title">

          <div className="activity-title-icon">
            <FaHistory />
          </div>

          <div>
            <h1>Activity Log</h1>

            <p>
              Track important actions and
              changes across your projects.
            </p>
          </div>

        </div>

        <div className="activity-count">
          <strong>
            {filteredActivities.length}
          </strong>

          <span>Activities</span>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="activity-toolbar">

        {/* SEARCH */}

        <div className="activity-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* PROJECT */}

        <div className="activity-project-filter">

          <FaProjectDiagram />

          <select
            value={selectedProjectId}
            onChange={(event) =>
              setSelectedProjectId(
                event.target.value
              )
            }
          >
            <option value="">
              All Projects
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>

        </div>

        {/* FILTER */}

        <div className="activity-filters">

          <button
            type="button"
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            <FaFilter />
            All
          </button>

          <button
            type="button"
            className={
              filter === "projects"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("projects")
            }
          >
            Projects
          </button>

          <button
            type="button"
            className={
              filter === "tasks"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("tasks")
            }
          >
            Tasks
          </button>

          <button
            type="button"
            className={
              filter === "team"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("team")
            }
          >
            Team
          </button>

        </div>

      </div>

      {/* ACTIVITY LIST */}

      <div className="activity-list">

        {loading ? (
          <div className="activity-empty">

            <FaHistory size={45} />

            <h2>
              Loading Activity...
            </h2>

            <p>
              Fetching your latest activities.
            </p>

          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="activity-empty">

            <FaHistory size={55} />

            <h2>
              No Activity Found
            </h2>

            <p>
              Activity generated by your
              projects, tasks and team actions
              will appear here.
            </p>

          </div>
        ) : (
          filteredActivities.map(
            (activity) => (
              <div
                key={activity.id}
                className={`activity-card ${
                  activity.action || ""
                }`}
              >

                {/* ICON */}

                <div className="activity-icon">
                  {getActivityIcon(activity)}
                </div>

                {/* CONTENT */}

                <div className="activity-content">

                  <div className="activity-main">

                    <h3>
                      {activity.description ||
                        activity.action}
                    </h3>

                    <span className="activity-type">
                      {activity.entity_type ||
                        "system"}
                    </span>

                  </div>

                  <p className="activity-description">
                    {activity.description ||
                      "An activity was recorded."}
                  </p>

                  <div className="activity-meta">

                    <span>
                      {getRelativeTime(
                        activity.created_at
                      )}
                    </span>

                    <span>
                      {formatDate(
                        activity.created_at
                      )}
                    </span>

                  </div>

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default ActivityLog;