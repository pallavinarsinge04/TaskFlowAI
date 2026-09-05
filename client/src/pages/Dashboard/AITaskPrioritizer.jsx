import { useState } from "react";
import axios from "axios";
import {
  FaBrain,
  FaCheckCircle,
  FaCalendarAlt,
  FaUser,
  FaExclamationTriangle,
  FaArrowUp,
  FaSpinner,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import "./AITaskPrioritizer.css";

const AI_API =
  "http://localhost:5000/api/ai";

const TASK_API =
  "http://localhost:5000/api/tasks";

function AITaskPrioritizer({ project, onTasksUpdated }) {
  const [recommendations, setRecommendations] =
    useState([]);

  const [selectedTasks, setSelectedTasks] =
    useState(new Set());

  const [loading, setLoading] =
    useState(false);

  const [applying, setApplying] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const analyzeTasks = async () => {
    if (!project?.id) {
      setMessage("Please select a project.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const {
        data: sessionData,
      } = await supabase.auth.getSession();

      const token =
        sessionData?.session?.access_token;

      if (!token) {
        setMessage("Please login again.");
        return;
      }

      const response = await axios.post(
        `${AI_API}/project/${project.id}/prioritize-tasks`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const items =
        response.data?.recommendations || [];

      setRecommendations(items);

      setSelectedTasks(
        new Set(items.map((item) => item.taskId))
      );

      if (items.length === 0) {
        setMessage(
          "No unfinished tasks need prioritization."
        );
      }
    } catch (error) {
      console.error(
        "AI task prioritization error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to analyze tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (taskId) => {
    setSelectedTasks((previous) => {
      const next = new Set(previous);

      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }

      return next;
    });
  };

  const applyRecommendations = async () => {
    const selected =
      recommendations.filter((item) =>
        selectedTasks.has(item.taskId)
      );

    if (selected.length === 0) {
      setMessage(
        "Select at least one recommendation."
      );
      return;
    }

    try {
      setApplying(true);
      setMessage("");

      const {
        data: sessionData,
      } = await supabase.auth.getSession();

      const token =
        sessionData?.session?.access_token;

      if (!token) {
        setMessage("Please login again.");
        return;
      }

      for (const recommendation of selected) {
        const updateData = {
          priority:
            recommendation.recommendedPriority,
        };

        if (recommendation.suggestedDueDate) {
          updateData.dueDate =
            recommendation.suggestedDueDate;
        }

        if (
          recommendation.suggestedAssignee
        ) {
          updateData.assignee =
            recommendation.suggestedAssignee;
        }

        await axios.put(
          `${TASK_API}/${recommendation.taskId}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setMessage(
        `${selected.length} task recommendation${
          selected.length > 1 ? "s" : ""
        } applied successfully.`
      );

      if (onTasksUpdated) {
        onTasksUpdated();
      }

      setSelectedTasks(new Set());
    } catch (error) {
      console.error(
        "Apply AI recommendations error:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to apply recommendations."
      );
    } finally {
      setApplying(false);
    }
  };

  const selectAll = () => {
    setSelectedTasks(
      new Set(
        recommendations.map(
          (item) => item.taskId
        )
      )
    );
  };

  const clearAll = () => {
    setSelectedTasks(new Set());
  };

  return (
    <section className="ai-prioritizer">
      <div className="ai-prioritizer-header">
        <div>
          <div className="ai-prioritizer-title">
            <FaBrain />

            <div>
              <h2>
                AI Task Prioritization
              </h2>

              <p>
                Let AI determine what should
                be done first.
              </p>
            </div>
          </div>
        </div>

        <button
          className="ai-analyze-button"
          onClick={analyzeTasks}
          disabled={loading || !project?.id}
        >
          {loading ? (
            <>
              <FaSpinner className="spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FaBrain />
              Analyze Tasks
            </>
          )}
        </button>
      </div>

      {message && (
        <div className="ai-prioritizer-message">
          {message}
        </div>
      )}

      {recommendations.length > 0 && (
        <>
          <div className="ai-prioritizer-actions">
            <span>
              {selectedTasks.size} selected
            </span>

            <div>
              <button onClick={selectAll}>
                Select All
              </button>

              <button onClick={clearAll}>
                Clear
              </button>

              <button
                className="apply-ai-button"
                onClick={
                  applyRecommendations
                }
                disabled={applying}
              >
                {applying ? (
                  <>
                    <FaSpinner className="spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Apply Selected
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="ai-recommendations">
            {recommendations.map(
              (recommendation) => (
                <div
                  key={recommendation.taskId}
                  className={`ai-recommendation ${
                    selectedTasks.has(
                      recommendation.taskId
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    toggleTask(
                      recommendation.taskId
                    )
                  }
                >
                  <div className="ai-rank">
                    #{recommendation.rank}
                  </div>

                  <div className="ai-recommendation-main">
                    <div className="ai-task-heading">
                      <input
                        type="checkbox"
                        checked={selectedTasks.has(
                          recommendation.taskId
                        )}
                        onChange={() =>
                          toggleTask(
                            recommendation.taskId
                          )
                        }
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      />

                      <h3>
                        Task{" "}
                        {recommendation.rank}
                      </h3>
                    </div>

                    <div className="ai-recommendation-grid">
                      <div>
                        <FaArrowUp />

                        <span>
                          Priority
                        </span>

                        <strong
                          className={`priority-${recommendation.recommendedPriority.toLowerCase()}`}
                        >
                          {
                            recommendation.recommendedPriority
                          }
                        </strong>
                      </div>

                      <div>
                        <FaCalendarAlt />

                        <span>
                          Suggested deadline
                        </span>

                        <strong>
                          {recommendation.suggestedDueDate ||
                            "No change"}
                        </strong>
                      </div>

                      <div>
                        <FaUser />

                        <span>
                          Suggested assignee
                        </span>

                        <strong>
                          {recommendation.suggestedAssignee ||
                            "No change"}
                        </strong>
                      </div>

                      <div>
                        <FaExclamationTriangle />

                        <span>
                          Risk
                        </span>

                        <strong
                          className={`risk-${recommendation.risk.toLowerCase()}`}
                        >
                          {recommendation.risk}
                        </strong>
                      </div>
                    </div>

                    <div className="ai-reason">
                      <strong>
                        Why?
                      </strong>

                      <p>
                        {recommendation.reason}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default AITaskPrioritizer;