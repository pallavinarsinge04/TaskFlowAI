import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

const CalendarView = () => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-5">

        📅 Calendar

      </h2>

      <Calendar />

    </div>

  );

};

export default CalendarView;