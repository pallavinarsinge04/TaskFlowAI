import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";
import { supabase } from "../../supabase/supabaseClient";

import "./Notifications.css";

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

  // --------------------------------------------------
  // AUTH HEADERS
  // --------------------------------------------------

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("User is not authenticated.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  };

  // --------------------------------------------------
  // LOAD NOTIFICATIONS
  // --------------------------------------------------

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(API, {
        headers,
      });

      console.log("Notifications API response:", response.data);

      setNotifications(response.data?.notifications || []);
    } catch (error) {
      console.error(
        "Load notifications error:",
        error.response?.data || error.message
      );

      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadNotifications();
  }, []);

  // --------------------------------------------------
  // REAL-TIME NOTIFICATIONS
  // --------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const setupRealtime = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user || !mounted) return;

        const handleNotificationCreated = (notification) => {
          console.log("Real-time notification:", notification);

          if (!notification) return;

          // Only show notifications belonging to current user
          if (notification.user_id !== user.id) return;

          setNotifications((currentNotifications) => {
            const exists = currentNotifications.some(
              (item) => item.id === notification.id
            );

            if (exists) {
              return currentNotifications;
            }

            return [notification, ...currentNotifications];
          });
        };

        socket.on(
          "notificationCreated",
          handleNotificationCreated
        );

        return () => {
          socket.off(
            "notificationCreated",
            handleNotificationCreated
          );
        };
      } catch (error) {
        console.error(
          "Notification realtime setup error:",
          error
        );
      }
    };

    let cleanup;

    setupRealtime().then((cleanupFunction) => {
      if (mounted) {
        cleanup = cleanupFunction;
      } else if (cleanupFunction) {
        cleanupFunction();
      }
    });

    return () => {
      mounted = false;

      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  // --------------------------------------------------
  // UNREAD COUNT
  // --------------------------------------------------

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => notification.read === false
    ).length;
  }, [notifications]);

  // --------------------------------------------------
  // FILTER + SEARCH
  // --------------------------------------------------

  const filteredNotifications = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return notifications.filter((notification) => {
      const matchesSearch =
        !searchText ||
        notification.title
          ?.toLowerCase()
          .includes(searchText) ||
        notification.message
          ?.toLowerCase()
          .includes(searchText);

      if (!matchesSearch) {
        return false;
      }

      if (filter === "unread") {
        return notification.read === false;
      }

      return true;
    });
  }, [notifications, filter, search]);

  // --------------------------------------------------
  // MARK ONE AS READ
  // --------------------------------------------------

  const markRead = async (id) => {
    try {
      const headers = await getAuthHeaders();

      await axios.put(
        `${API}/${id}/read`,
        {},
        {
          headers,
        }
      );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Mark notification read error:",
        error.response?.data || error.message
      );
    }
  };

  // --------------------------------------------------
  // MARK ALL AS READ
  // --------------------------------------------------

  const markAllRead = async () => {
    try {
      const headers = await getAuthHeaders();

      await axios.put(
        `${API}/read-all`,
        {},
        {
          headers,
        }
      );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Mark all notifications error:",
        error.response?.data || error.message
      );
    }
  };

  // --------------------------------------------------
  // DELETE NOTIFICATION
  // --------------------------------------------------

  const deleteNotification = async (id) => {
    try {
      const headers = await getAuthHeaders();

      await axios.delete(`${API}/${id}`, {
        headers,
      });

      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (notification) => notification.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete notification error:",
        error.response?.data || error.message
      );
    }
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString();
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

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
            Stay updated with Projects, Tasks, Meetings & AI
            Alerts.
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
            type="text"
            placeholder="Search Notification..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <button
          type="button"
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          <FaFilter />
          All
        </button>

        <button
          type="button"
          className={filter === "unread" ? "active" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>

        {unreadCount > 0 && (
          <button
            type="button"
            className="mark-all"
            onClick={markAllRead}
          >
            <FaCheckDouble />
            Mark All Read
          </button>
        )}
      </div>

      {/* NOTIFICATION LIST */}

      <div className="notification-list">
        {loading ? (
          <div className="empty-state">
            <FaBell size={40} />

            <h2>Loading Notifications...</h2>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <FaBell size={50} />

            <h2>No Notifications</h2>

            <p>
              {filter === "unread"
                ? "You're all caught up."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                notification.type || "general"
              } ${
                notification.read ? "" : "unread"
              }`}
            >
              {/* ICON */}

              <div className="notification-icon">
                <FaBell />
              </div>

              {/* BODY */}

              <div className="notification-body">
                <h3>{notification.title}</h3>

                <p>{notification.message}</p>

                <small>
                  {formatDate(notification.created_at)}
                </small>
              </div>

              {/* ACTIONS */}

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    type="button"
                    className="read-btn"
                    onClick={() =>
                      markRead(notification.id)
                    }
                    title="Mark as read"
                  >
                    <FaCheck />
                  </button>
                )}

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                  title="Delete notification"
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