import "./ActivityTimeline.css";

function ActivityTimeline({ tasks }) {

  const activities = [];

  tasks.forEach(task => {

    activities.push({
      icon: "📝",
      text: `Task "${task.title}" created`,
      date: task.dueDate
    });

    if(task.status==="Completed"){

      activities.push({
        icon:"✅",
        text:`Completed "${task.title}"`,
        date:task.dueDate
      });

    }

    if(task.status==="In Progress"){

      activities.push({
        icon:"🚀",
        text:`Started "${task.title}"`,
        date:task.dueDate
      });

    }

  });

  return (

    <div className="timeline">

      <h2>📜 Activity Timeline</h2>

      {activities.length===0 ? (

        <p>No Activities</p>

      ) : (

        activities.map((item,index)=>(

          <div
            key={index}
            className="timeline-item"
          >

            <div className="timeline-icon">

              {item.icon}

            </div>

            <div>

              <h4>{item.text}</h4>

              <small>{item.date}</small>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default ActivityTimeline;