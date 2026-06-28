import { useEffect, useState } from "react";
import "./ActivityLog.css";

function ActivityLog({ taskId }) {

  const storageKey = `activity_${taskId}`;

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setLogs(saved);

  }, [storageKey]);

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      JSON.stringify(logs)
    );

  }, [logs, storageKey]);

  const addLog = (action) => {

    const newLog = {

      id: Date.now(),

      action,

      user: "Pallavi",

      time: new Date().toLocaleString()

    };

    setLogs([newLog, ...logs]);

  };

  useEffect(() => {

    // Auto demo logs (you will later trigger from real actions)

    addLog("Opened Task");

  }, []);

  return (

    <div className="activity-log">

      <h2>📜 Activity Log</h2>

      {logs.length === 0 ? (

        <p>No activity yet</p>

      ) : (

        logs.map((log) => (

          <div key={log.id} className="log-item">

            <div className="log-icon">🟢</div>

            <div className="log-content">

              <h4>{log.action}</h4>

              <small>

                {log.user} • {log.time}

              </small>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default ActivityLog;