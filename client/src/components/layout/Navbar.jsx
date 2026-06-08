import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">

      <div className="flex items-center gap-2">

        <FaTasks size={30} className="text-blue-600"/>

        <h1 className="text-2xl font-bold text-blue-600">
          TaskFlow AI
        </h1>

      </div>

      <ul className="flex gap-8 font-semibold">

        <li className="cursor-pointer hover:text-blue-600">
          Home
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          Features
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          Pricing
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          About
        </li>

      </ul>

      <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
        Login
      </button>

    </nav>
  );
};

export default Navbar;