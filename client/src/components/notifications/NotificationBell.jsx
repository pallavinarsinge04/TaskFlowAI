import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaBell, FaCheck, FaTrash } from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import socket from "../../socket";

const API_URL = "http://localhost:5000/api/notifications";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  /*
  ======================================================
  LOAD NOTIFICATIONS
  ======================================================
  */

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(
        API_URL,
        {
          headers,
        }
      );

      setNotifications(
        response.data?.notifications || []
      );
    } catch (error) {
      console.error(
        "Load notifications error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ======================================================
  INITIAL LOAD
  ======================================================
  */

  useEffect(() => {
    loadNotifications();
  }, []);

  /*
  ======================================================
  REALTIME NOTIFICATIONS
  ======================================================
  */

  useEffect(() => {
    let currentUser = null;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      currentUser = user;

      if (!user) return;

      const handleNotificationCreated = (
        notification
      ) => {
        if (!notification) return;

        if (
          notification.user_id !== user.id
        ) {
          return;
        }

        setNotifications(
          (currentNotifications) => {
            const exists =
              currentNotifications.some(
                (item) =>
                  item.id === notification.id
              );

            if (exists) {
              return currentNotifications;
            }

            return [
              notification,
              ...currentNotifications,
            ];
          }
        );
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
    };

    let cleanup;

    setupRealtime().then((cleanupFunction) => {
      cleanup = cleanupFunction;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  /*
  ======================================================
  UNREAD COUNT
  ======================================================
  */

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) =>
        notification.read === false
    ).length;
  }, [notifications]);

  /*
  ======================================================
  MARK ONE AS READ
  ======================================================
  */

  const markAsRead = async (id) => {
    try {
      const headers =
        await getAuthHeaders();

      await axios.put(
        `${API_URL}/${id}/read`,
        {},
        {
          headers,
        }
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (notification) =>
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
        error.response?.data ||
          error.message
      );
    }
  };

  /*
  ======================================================
  MARK ALL AS READ
  ======================================================
  */

  const markAllAsRead = async () => {
    try {
      const headers =
        await getAuthHeaders();

      await axios.put(
        `${API_URL}/read-all`,
        {},
        {
          headers,
        }
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.map(
            (notification) => ({
              ...notification,
              read: true,
            })
          )
      );
    } catch (error) {
      console.error(
        "Mark all notifications error:",
        error.response?.data ||
          error.message
      );
    }
  };

  /*
  ======================================================
  DELETE NOTIFICATION
  ======================================================
  */

  const deleteNotification = async (id) => {
    try {
      const headers =
        await getAuthHeaders();

      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers,
        }
      );

      setNotifications(
        (currentNotifications) =>
          currentNotifications.filter(
            (notification) =>
              notification.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Delete notification error:",
        error.response?.data ||
          error.message
      );
    }
  };

  /*
  ======================================================
  UI
  ======================================================
  */

  return (
    <div
      className="notification-container"
      style={{
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="notification-bell"
        title="Notifications"
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        <FaBell />

        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-7px",
              right: "-7px",
              minWidth: "18px",
              height: "18px",
              borderRadius: "50%",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ef4444",
              color: "#fff",
              fontWeight: "700",
            }}
          >
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="notification-dropdown"
          style={{
            position: "absolute",
            right: 0,
            top: "42px",
            width: "360px",
            maxHeight: "500px",
            overflowY: "auto",
            background: "#fff",
            borderRadius: "12px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              padding: "15px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              borderBottom:
                "1px solid #e5e7eb",
            }}
          >
            <strong>
              Notifications
            </strong>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {loading ? (
            <div
              style={{
                padding: "25px",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              <FaBell
                style={{
                  fontSize: "28px",
                  marginBottom: "10px",
                }}
              />

              <p>
                No notifications
              </p>
            </div>
          ) : (
            notifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: "14px",
                    borderBottom:
                      "1px solid #f1f5f9",
                    background:
                      notification.read
                        ? "#fff"
                        : "#f8fafc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <strong>
                        {notification.title}
                      </strong>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          fontSize:
                            "13px",
                          color:
                            "#64748b",
                        }}
                      >
                        {
                          notification.message
                        }
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          title="Mark as read"
                          style={{
                            border:
                              "none",
                            background:
                              "none",
                            cursor:
                              "pointer",
                          }}
                        >
                          <FaCheck />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        title="Delete"
                        style={{
                          border:
                            "none",
                          background:
                            "none",
                          cursor:
                            "pointer",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;