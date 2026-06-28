import "./CalendarWidget.css";

function CalendarWidget() {
  const events = [
    {
      title: "Sprint Planning",
      date: "28 June 2026",
      time: "10:00 AM",
    },
    {
      title: "UI Review Meeting",
      date: "29 June 2026",
      time: "02:00 PM",
    },
    {
      title: "Client Presentation",
      date: "30 June 2026",
      time: "11:30 AM",
    },
    {
      title: "Project Deadline",
      date: "02 July 2026",
      time: "06:00 PM",
    },
  ];

  return (
    <div className="calendar-widget">

      <div className="calendar-header">
        <h2>📅 Calendar</h2>
        <button>View All</button>
      </div>

      <div className="calendar-month">
        <h3>June 2026</h3>
      </div>

      <div className="calendar-grid">

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

        <div className="day inactive">31</div>
        <div className="day">1</div>
        <div className="day">2</div>
        <div className="day">3</div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>

        <div className="day">7</div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day">11</div>
        <div className="day">12</div>
        <div className="day">13</div>

        <div className="day">14</div>
        <div className="day">15</div>
        <div className="day">16</div>
        <div className="day">17</div>
        <div className="day">18</div>
        <div className="day active">19</div>
        <div className="day">20</div>

        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day">23</div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>

        <div className="day event">28</div>
        <div className="day event">29</div>
        <div className="day event">30</div>

      </div>

      <div className="upcoming-events">

        <h3>Upcoming Events</h3>

        {events.map((event, index) => (
          <div className="event-card" key={index}>

            <div className="event-icon">
              📌
            </div>

            <div className="event-info">
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <span>{event.time}</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CalendarWidget;