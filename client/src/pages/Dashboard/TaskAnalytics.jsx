import React from "react";
import {
  FaChartLine,
  FaFlag,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./TaskAnalytics.css";

const TaskAnalytics = ({
  taskTrend = [],
  priorityDistribution = {},
  overdueTaskList = [],
}) => {
  const maxTasks = Math.max(
    ...taskTrend.map((item) => item.total),
    1
  );

  const priorityTotal =
    (priorityDistribution.High || 0) +
    (priorityDistribution.Medium || 0) +
    (priorityDistribution.Low || 0);

  const getPercentage = (value) => {
    if (!priorityTotal) return 0;
    return Math.round((value / priorityTotal) * 100);
  };

  return (
    <section className="task-analytics">

      {/* TASK TREND */}
      <div className="analytics-card trend-card">

        <div className="analytics-header">
          <div>
            <h3>
              <FaChartLine /> Task Trend
            </h3>

            <p>Tasks created during the last 7 days</p>
          </div>
        </div>

        <div className="trend-chart">

          {taskTrend.length === 0 ? (
            <div className="empty-analytics">
              No task activity yet
            </div>
          ) : (
            taskTrend.map((item) => {

              const height =
                (item.total / maxTasks) * 100;

              const completedHeight =
                item.total > 0
                  ? (item.completed / item.total) * 100
                  : 0;

              return (
                <div
                  className="trend-column"
                  key={item.date}
                >

                  <div className="trend-value">
                    {item.total}
                  </div>

                  <div className="trend-bar-wrapper">

                    <div
                      className="trend-bar"
                      style={{
                        height: `${Math.max(height, 5)}%`,
                      }}
                    >

                      <div
                        className="completed-bar"
                        style={{
                          height: `${completedHeight}%`,
                        }}
                      />

                    </div>

                  </div>

                  <span>
                    {new Date(item.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                  </span>

                </div>
              );
            })
          )}

        </div>

        <div className="chart-legend">
          <span>
            <i className="legend-total" />
            Total Tasks
          </span>

          <span>
            <i className="legend-completed" />
            Completed
          </span>
        </div>

      </div>


      {/* PRIORITY */}
      <div className="analytics-card">

        <div className="analytics-header">

          <div>
            <h3>
              <FaFlag /> Priority Distribution
            </h3>

            <p>Current task priorities</p>
          </div>

        </div>

        <div className="priority-list">

          {[
            ["High", priorityDistribution.High || 0],
            ["Medium", priorityDistribution.Medium || 0],
            ["Low", priorityDistribution.Low || 0],
          ].map(([priority, value]) => (

            <div
              className="priority-item"
              key={priority}
            >

              <div className="priority-info">

                <span>{priority}</span>

                <strong>
                  {value}
                </strong>

              </div>

              <div className="priority-progress">

                <div
                  className={`priority-progress-fill ${priority.toLowerCase()}`}
                  style={{
                    width: `${getPercentage(value)}%`,
                  }}
                />

              </div>

              <small>
                {getPercentage(value)}%
              </small>

            </div>

          ))}

        </div>

      </div>


      {/* OVERDUE */}
      <div className="analytics-card overdue-card">

        <div className="analytics-header">

          <div>
            <h3>
              <FaExclamationTriangle /> Overdue Tasks
            </h3>

            <p>Tasks that passed their deadline</p>
          </div>

          <strong className="overdue-count">
            {overdueTaskList.length}
          </strong>

        </div>

        <div className="overdue-list">

          {overdueTaskList.length === 0 ? (

            <div className="empty-analytics">
              🎉 No overdue tasks
            </div>

          ) : (

            overdueTaskList
              .slice(0, 5)
              .map((task) => (

                <div
                  className="overdue-task"
                  key={task.id}
                >

                  <div>
                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      Due: {task.due_date}
                    </span>
                  </div>

                  <span className="overdue-label">
                    Overdue
                  </span>

                </div>

              ))

          )}

        </div>

      </div>

    </section>
  );
};

export default TaskAnalytics;