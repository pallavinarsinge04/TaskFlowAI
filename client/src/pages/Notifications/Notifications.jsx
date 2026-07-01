import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";
import "./Notifications.css";
import useNotification from "../../hooks/useNotification";
import {
  FaBell,
  FaSearch,
  FaCheck,
  FaTrash,
  FaFilter,
  FaCheckDouble,
} from "react-icons/fa";

const API = "http://localhost:5000/api/notifications";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Current user's role
  const role = localStorage.getItem("role");

  // Browser desktop notifications
  useNotification(socket);

  useEffect(() => {

    // Join Socket.IO room based on role
    if (role) {
      socket.emit("joinRole", role);
    }

    loadNotifications();

    socket.on("notification", (notification) => {

      setNotifications((prev) => [
        notification,
        ...prev,
      ]);

    });

    return () => {

      socket.off("notification");

    };

  }, []);

  const loadNotifications = async () => {

    try {

      const res = await axios.get(
        `${API}?role=${role}`
      );

      setNotifications(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const unreadCount = useMemo(() => {

    return notifications.filter(
      n => !n.read
    ).length;

  }, [notifications]);

  const filteredNotifications = useMemo(() => {

    return notifications.filter((item) => {

      const matchesSearch =

        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.message
          ?.toLowerCase()
          .includes(search.toLowerCase());

      if (filter === "unread")
        return !item.read && matchesSearch;

      return matchesSearch;

    });

  }, [notifications, filter, search]);

  const markRead = async (id) => {

    try {

      await axios.put(`${API}/${id}`);

      setNotifications(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, read: true }
            : item
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  const deleteNotification = async (id) => {

    try {

      await axios.delete(`${API}/${id}`);

      setNotifications(prev =>
        prev.filter(
          item => item._id !== id
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  const markAllRead = async () => {

    try {

      await axios.put(
        `${API}/read-all`
      );

      setNotifications(prev =>
        prev.map(item => ({
          ...item,
          read: true,
        }))
      );

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="notifications-page">

      {/* HEADER */}

      <div className="notifications-header">

        <div>

          <h1>

            <FaBell />

            Notifications

          </h1>

          <p>

            Role :
            <strong>
              {" "}
              {role || "Guest"}
            </strong>

          </p>

          <p>

            Stay updated with Projects,
            Tasks, Meetings & AI Alerts.

          </p>

        </div>

        <div className="notification-counter">

          {unreadCount}

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="notification-toolbar">

        <div className="search-box">

          <FaSearch />

          <input

            placeholder="Search Notification..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

          />

        </div>

        <button

          className={
            filter === "all"
              ? "active"
              : ""
          }

          onClick={() =>
            setFilter("all")
          }

        >

          <FaFilter />

          All

        </button>

        <button

          className={
            filter === "unread"
              ? "active"
              : ""
          }

          onClick={() =>
            setFilter("unread")
          }

        >

          Unread

        </button>

        <button

          className="mark-all"

          onClick={markAllRead}

        >

          <FaCheckDouble />

          Mark All Read

        </button>

      </div>

      {/* LIST */}

      <div className="notification-list">

        {loading ? (

          <div className="empty-state">

            Loading Notifications...

          </div>

        ) : filteredNotifications.length === 0 ? (

          <div className="empty-state">

            No Notifications Found

          </div>

        ) : (

          filteredNotifications.map(item => (

            <div

              key={item._id}

              className={`notification-card ${item.read ? "" : "unread"}`}

            >

              <div className="notification-body">

                <h3>

                  {item.title}

                </h3>

                <p>

                  {item.message}

                </p>

                <span>

                  {new Date(
                    item.createdAt
                  ).toLocaleString()}

                </span>

              </div>

              <div className="notification-actions">

                {!item.read && (

                  <button

                    className="read-btn"

                    onClick={() =>
                      markRead(item._id)
                    }

                  >

                    <FaCheck />

                  </button>

                )}

                <button

                  className="delete-btn"

                  onClick={() =>
                    deleteNotification(item._id)
                  }

                >

                  <FaTrash />

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Notifications;