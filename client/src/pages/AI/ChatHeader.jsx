import {
  FaRobot,
  FaMoon,
  FaSun,
  FaTrash,
  FaCog,
  FaComments
} from "react-icons/fa";

function ChatHeader({

  darkMode,

  setDarkMode,

  clearChat,

  totalMessages

}) {

  return (

    <div className="chat-header">

      <div className="chat-left">

        <div className="ai-logo">

          <FaRobot />

        </div>

        <div>

          <h2>

            TaskFlow AI

          </h2>

          <p>

            🟢 Gemini 2.5 Flash Online

          </p>

        </div>

      </div>

      <div className="chat-right">

        <div className="chat-count">

          <FaComments />

          <span>

            {totalMessages} Messages

          </span>

        </div>

        <button

          className="header-btn"

          onClick={()=>

            setDarkMode(!darkMode)

          }

        >

          {

            darkMode

            ?

            <FaSun/>

            :

            <FaMoon/>

          }

        </button>

        <button

          className="header-btn"

        >

          <FaCog/>

        </button>

        <button

          className="header-btn danger"

          onClick={clearChat}

        >

          <FaTrash/>

        </button>

      </div>

    </div>

  );

}

export default ChatHeader;