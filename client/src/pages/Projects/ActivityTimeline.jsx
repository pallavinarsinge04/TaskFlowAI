import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import {
  FaPlusCircle,
  FaCheckCircle,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import "./ActivityTimeline.css";

function ActivityTimeline({ projectId }) {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, [projectId]);

  async function loadActivities() {

    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setActivities(data);
  }

  const getIcon = (action) => {

    switch (action) {

      case "Created":
        return <FaPlusCircle className="created" />;

      case "Completed":
        return <FaCheckCircle className="completed" />;

      case "Deleted":
        return <FaTrash className="deleted" />;

      case "Updated":
        return <FaEdit className="updated" />;

      default:
        return <FaPlusCircle />;

    }

  };

  return (

    <div className="timeline">

      <h2>Project Activity</h2>

      {activities.length === 0 ? (

        <p>No Activity Found</p>

      ) : (

        activities.map((activity) => (

          <div
            className="timeline-item"
            key={activity.id}
          >

            <div className="timeline-icon">

              {getIcon(activity.action)}

            </div>

            <div className="timeline-content">

              <h4>{activity.action}</h4>

              <p>{activity.description}</p>

              <small>

                {new Date(
                  activity.created_at
                ).toLocaleString()}

              </small>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default ActivityTimeline;