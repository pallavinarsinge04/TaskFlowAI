import React, { useState } from "react";
import axios from "axios";

import { supabase } from "../../supabase/supabaseClient";
import "./AIProjectAutomation.css";

const API_URL = "http://localhost:5000/api/ai";

const AIProjectAutomation = ({ project, onTasksUpdated }) => {
  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);
  const [automation, setAutomation] = useState(null);
  const [error, setError] = useState("");

  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.access_token;
  };

  const runAutomation = async () => {
    if (!project?.id) {
      setError("Please select a project first.");
      return;
    }

    if (!requirement.trim()) {
      setError("Please describe what you want AI to prepare.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAutomation(null);

      const token = await getAccessToken();

      if (!token) {
        setError("Your session has expired. Please login again.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/project/${project.id}/automate`,
        {
          requirement: requirement.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setAutomation(response.data);
      } else {
        setError(
          response.data?.message ||
            "AI automation failed."
        );
      }
    } catch (err) {
      console.error("AI Project Automation Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to run AI project automation."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshDashboard = () => {
    if (typeof onTasksUpdated === "function") {
      onTasksUpdated();
    }
  };

  if (!project) {
    return (
      <div className="ai-automation-empty">
        <div className="ai-automation-empty-icon">🤖</div>

        <h3>No Project Selected</h3>

        <p>
          Select a project to use AI Project Automation.
        </p>
      </div>
    );
  }

  return (
    <div className="ai-project-automation">
      <div className="ai-automation-header">
        <div>
          <div className="ai-automation-title">
            🤖 AI Project Automation
          </div>

          <p>
            Let AI analyze your project and create a safe
            automation plan.
          </p>
        </div>
      </div>

      <div className="ai-automation-project">
        <span>Project</span>
        <strong>{project.name}</strong>
      </div>

      <div className="ai-automation-form">
        <label>
          What should AI prepare?
        </label>

        <textarea
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Example: Prepare this project for launch. Check unfinished tasks, priorities, deadlines and identify risks."
          rows={5}
          disabled={loading}
        />

        <div className="ai-automation-examples">
          <button
            type="button"
            onClick={() =>
              setRequirement(
                "Prepare this project for launch. Check unfinished tasks, priorities, deadlines and identify risks."
              )
            }
            disabled={loading}
          >
            🚀 Prepare for launch
          </button>

          <button
            type="button"
            onClick={() =>
              setRequirement(
                "Review this project and identify tasks that need higher priority and possible deadline improvements."
              )
            }
            disabled={loading}
          >
            🎯 Review priorities
          </button>

          <button
            type="button"
            onClick={() =>
              setRequirement(
                "Analyze the project and identify major risks and the next actions required."
              )
            }
            disabled={loading}
          >
            ⚠️ Find risks
          </button>
        </div>

        <button
          className="ai-automation-run"
          onClick={runAutomation}
          disabled={loading || !requirement.trim()}
        >
          {loading ? (
            <>
              <span className="ai-automation-spinner" />
              Analyzing Project...
            </>
          ) : (
            <>✨ Analyze & Create Plan</>
          )}
        </button>
      </div>

      {error && (
        <div className="ai-automation-error">
          ⚠️ {error}
        </div>
      )}

      {automation && (
        <div className="ai-automation-result">
          <div className="ai-result-heading">
            <div>
              <span className="ai-result-badge">
                AI PLAN READY
              </span>

              <h3>Automation Plan</h3>
            </div>

            <button
              type="button"
              onClick={handleRefreshDashboard}
              className="ai-refresh-button"
            >
              ↻ Refresh
            </button>
          </div>

          {automation.summary && (
            <div className="ai-automation-summary">
              <h4>📋 Summary</h4>

              <p>{automation.summary}</p>
            </div>
          )}

          {Array.isArray(automation.actions) &&
            automation.actions.length > 0 && (
              <div className="ai-automation-actions">
                <h4>
                  ⚡ Recommended Actions (
                  {automation.actions.length})
                </h4>

                {automation.actions.map(
                  (action, index) => (
                    <div
                      className="ai-action-card"
                      key={`${action.taskId || "action"}-${index}`}
                    >
                      <div className="ai-action-number">
                        {index + 1}
                      </div>

                      <div className="ai-action-content">
                        <div className="ai-action-top">
                          <strong>
                            {action.title ||
                              action.type
                                ?.replaceAll("_", " ")
                                ?.replace(
                                  /\b\w/g,
                                  (letter) =>
                                    letter.toUpperCase()
                                )}
                          </strong>

                          {action.priority && (
                            <span
                              className={`ai-priority ${action.priority.toLowerCase()}`}
                            >
                              {action.priority}
                            </span>
                          )}
                        </div>

                        {action.description && (
                          <p>
                            {action.description}
                          </p>
                        )}

                        <div className="ai-action-meta">
                          {action.type && (
                            <span>
                              🔧{" "}
                              {action.type.replaceAll(
                                "_",
                                " "
                              )}
                            </span>
                          )}

                          {action.dueDate && (
                            <span>
                              📅 {action.dueDate}
                            </span>
                          )}

                          {action.assignee && (
                            <span>
                              👤 {action.assignee}
                            </span>
                          )}
                        </div>

                        {action.reason && (
                          <div className="ai-action-reason">
                            <strong>Why:</strong>{" "}
                            {action.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          {Array.isArray(automation.risks) &&
            automation.risks.length > 0 && (
              <div className="ai-automation-risks">
                <h4>⚠️ Project Risks</h4>

                {automation.risks.map(
                  (risk, index) => (
                    <div
                      className="ai-risk-card"
                      key={index}
                    >
                      <div className="ai-risk-title">
                        <strong>
                          {risk.title ||
                            "Project Risk"}
                        </strong>

                        {risk.severity && (
                          <span
                            className={`ai-severity ${risk.severity.toLowerCase()}`}
                          >
                            {risk.severity}
                          </span>
                        )}
                      </div>

                      <p>{risk.description}</p>
                    </div>
                  )
                )}
              </div>
            )}

          {(!automation.actions ||
            automation.actions.length === 0) &&
            (!automation.risks ||
              automation.risks.length === 0) && (
              <div className="ai-no-actions">
                ✅ No automation actions or risks were
                identified.
              </div>
            )}

          <div className="ai-review-note">
            🔒 <strong>Review before applying.</strong>{" "}
            This phase generates a safe plan only. It does
            not automatically delete or modify your tasks.
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProjectAutomation;