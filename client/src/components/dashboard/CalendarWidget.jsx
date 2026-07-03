import { useState } from "react";
import "./CalendarWidget.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt
} from "react-icons/fa";

function CalendarWidget() {

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  return (

    <div className="calendar-widget">

      <div className="calendar-header">

        <h2>

          <FaCalendarAlt />

          Calendar

        </h2>

        <div className="calendar-controls">

          <button onClick={previousMonth}>
            <FaChevronLeft />
          </button>

          <span>

            {months[month]} {year}

          </span>

          <button onClick={nextMonth}>
            <FaChevronRight />
          </button>

        </div>

      </div>

      <div className="calendar-days">

        {days.map(day => (

          <div
            key={day}
            className="day-name"
          >
            {day}
          </div>

        ))}

      </div>

      <div className="calendar-grid">

        {calendarDays.map((day,index)=>{

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return(

            <div
              key={index}
              className={`calendar-cell ${
                day ? "" : "empty"
              } ${isToday ? "today" : ""}`}
            >

              {day}

            </div>

          );

        })}

      </div>

      <div className="calendar-footer">

        <div className="event-card">

          <h4>Today's Schedule</h4>

          <p>10:00 AM - Sprint Meeting</p>

          <p>02:00 PM - UI Review</p>

          <p>05:00 PM - Client Demo</p>

        </div>

      </div>

    </div>

  );

}

export default CalendarWidget;