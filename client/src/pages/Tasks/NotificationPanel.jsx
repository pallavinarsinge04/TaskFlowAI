import "./NotificationPanel.css";

function NotificationPanel({ tasks }) {

  const notifications=[];

  tasks.forEach(task=>{

    if(task.priority==="High"){

      notifications.push(
        `🔥 High Priority : ${task.title}`
      );

    }

    if(task.status==="Pending"){

      notifications.push(
        `⏳ Pending : ${task.title}`
      );

    }

    if(
      task.status!=="Completed" &&
      task.dueDate &&
      new Date(task.dueDate)<new Date()
    ){

      notifications.push(
        `⚠️ Overdue : ${task.title}`
      );

    }

  });

  return(

    <div className="notifications">

      <h2>

        🔔 Notifications

      </h2>

      {

        notifications.length===0 ?

        <p>No Notifications</p>

        :

        notifications.map((n,index)=>(

          <div
            key={index}
            className="notification-card"
          >

            {n}

          </div>

        ))

      }

    </div>

  );

}

export default NotificationPanel;