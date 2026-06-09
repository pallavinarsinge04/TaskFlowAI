import { FaBell } from "react-icons/fa";

const NotificationBell = () => {

  return (

    <div className="relative">

      <FaBell size={24} />

      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">

        5

      </span>

    </div>

  );

};

export default NotificationBell;