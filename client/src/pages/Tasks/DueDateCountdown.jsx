import "./DueDateCountdown.css";

function DueDateCountdown({ dueDate }) {

  if (!dueDate) {
    return <span className="no-date">No due date</span>;
  }

  const today = new Date();
  const due = new Date(dueDate);

  const diffTime = due - today;

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let status = "";
  let label = "";

  if (diffDays < 0) {

    status = "overdue";
    label = `⚠️ Overdue by ${Math.abs(diffDays)} day(s)`;

  } else if (diffDays === 0) {

    status = "today";
    label = "🔥 Due Today";

  } else if (diffDays <= 2) {

    status = "urgent";
    label = `⏳ Due in ${diffDays} day(s)`;

  } else if (diffDays <= 7) {

    status = "warning";
    label = `📅 Due in ${diffDays} days`;

  } else {

    status = "safe";
    label = `🟢 ${diffDays} days left`;

  }

  return (

    <span className={`due-badge ${status}`}>

      {label}

    </span>

  );

}

export default DueDateCountdown;