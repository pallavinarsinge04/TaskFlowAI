import React, { useState } from "react";
import axios from "axios";
import { supabase } from "../../supabase/supabaseClient";
import "./AITaskCommand.css";

const API_URL = "http://localhost:5000/api/ai/task-command";

const AITaskCommand = ({ project, onTaskCreated }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // --------------------------------------------------
  // Get Supabase access token
  // --------------------------------------------------
  const getAccessToken = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(sessionError.message);
    }

    if (!session?.access_token) {
      throw new Error("Please log in again.");
    }

    return session.access_token;
  };

  // --------------------------------------------------
  // Execute AI command
  // --------------------------------------------------
  const executeCommand = async (confirmed = false) => {
    if (!message.trim()) {
      setError("Please enter a command.");
      return;
    }

    if (!project?.id) {
      setError("Please select a project first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const token = await getAccessToken();

      const response = await axios.post(
        API_URL,
        {
          message: message.trim(),
          projectId: project.id,
          confirmed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "AI command could not be completed."
        );
      }

      // --------------------------------------------------
      // Delete confirmation required
      // --------------------------------------------------
      if (response.data.requiresConfirmation) {
        setResult(response.data);
        setDeleteConfirmation(true);
        return;
      }

      // --------------------------------------------------
      // Successful action
      // --------------------------------------------------
      setResult(response.data);
      setDeleteConfirmation(false);

      if (typeof onTaskCreated === "function") {
        onTaskCreated(response.data.task || null);
      }

      // Clear input after successful command
      setMessage("");
    } catch (err) {
      console.error("AI Task Command error:", err);

      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong while executing the AI command.";

      setError(serverMessage);
      setDeleteConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Handle normal submit
  // --------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (deleteConfirmation) {
      return;
    }

    await executeCommand(false);
  };

  // --------------------------------------------------
  // Confirm delete
  // --------------------------------------------------
  const handleConfirmDelete = async () => {
    await executeCommand(true);
  };

  // --------------------------------------------------
  // Cancel delete
  // --------------------------------------------------
  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
    setResult(null);
    setError("");
  };

  // --------------------------------------------------
  // Example command
  // --------------------------------------------------
  const useExample = (example) => {
    setMessage(example);
    setResult(null);
    setError("");
    setDeleteConfirmation(false);
  };

  return (
    <div className="ai-task-command">
      {/* Header */}
      <div className="ai-command-header">
        <div className="ai-command-icon">⚡</div>

        <div>
          <h2>AI Task Command</h2>

          <p>
            Control your project tasks using natural language.
          </p>
        </div>
      </div>

      {/* Current Project */}
      <div className="ai-command-project">
        <span className="project-label">Current Project</span>

        <strong>{project?.name || "No project selected"}</strong>
      </div>

      {/* Command Form */}
      <form onSubmit={handleSubmit} className="ai-command-form">
        <label htmlFor="ai-task-command-input">
          What would you like me to do?
        </label>

        <textarea
          id="ai-task-command-input"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setError("");
          }}
          placeholder='Example: Create a task to design the login page with high priority...'
          rows={5}
          disabled={loading || deleteConfirmation}
        />

        <div className="ai-command-actions">
          <button
            type="submit"
            className="ai-command-submit"
            disabled={loading || !message.trim() || deleteConfirmation}
          >
            {loading ? (
              <>
                <span className="ai-command-spinner"></span>
                Processing...
              </>
            ) : (
              <>
                ⚡ Execute Command
              </>
            )}
          </button>

          {message && !loading && !deleteConfirmation && (
            <button
              type="button"
              className="ai-command-clear"
              onClick={() => {
                setMessage("");
                setResult(null);
                setError("");
              }}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Example Commands */}
      <div className="ai-command-examples">
        <h3>Try these commands</h3>

        <div className="ai-example-list">
          <button
            type="button"
            onClick={() =>
              useExample(
                "Create a task to design the login page with high priority."
              )
            }
            disabled={loading}
          >
            <span>➕</span>
            Create a task
          </button>

          <button
            type="button"
            onClick={() =>
              useExample(
                "Change the priority of the login page task to High."
              )
            }
            disabled={loading}
          >
            <span>✏️</span>
            Update a task
          </button>

          <button
            type="button"
            onClick={() =>
              useExample(
                "Mark the login page task as completed."
              )
            }
            disabled={loading}
          >
            <span>✅</span>
            Complete a task
          </button>

          <button
            type="button"
            onClick={() =>
              useExample(
                "Delete the login page task."
              )
            }
            disabled={loading}
          >
            <span>🗑️</span>
            Delete a task
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="ai-command-error">
          <div className="ai-command-error-icon">⚠️</div>

          <div>
            <strong>Command failed</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <div className="ai-delete-confirmation">
          <div className="confirmation-icon">⚠️</div>

          <div className="confirmation-content">
            <h3>Confirm Task Deletion</h3>

            <p>
              AI identified a task that should be deleted.
              This action cannot be undone.
            </p>

            {result?.task && (
              <div className="confirmation-task">
                <strong>{result.task.title}</strong>

                {result.task.description && (
                  <span>{result.task.description}</span>
                )}
              </div>
            )}

            <div className="confirmation-actions">
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>

              <button
                type="button"
                className="cancel-delete-btn"
                onClick={handleCancelDelete}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Result */}
      {result &&
        result.success &&
        !result.requiresConfirmation && (
          <div className="ai-command-success">
            <div className="success-icon">✓</div>

            <div className="success-content">
              <h3>Command completed</h3>

              <p>
                {result.message ||
                  "The AI command was completed successfully."}
              </p>

              {result.action && (
                <div className="ai-action-badge">
                  {result.action.replace(/_/g, " ")}
                </div>
              )}

              {/* Task Details */}
              {result.task && (
                <div className="ai-result-task">
                  <div className="result-task-header">
                    <span>Task</span>

                    <strong>{result.task.title}</strong>
                  </div>

                  {result.task.description && (
                    <p>{result.task.description}</p>
                  )}

                  <div className="result-task-details">
                    {result.task.priority && (
                      <span>
                        <strong>Priority:</strong>{" "}
                        {result.task.priority}
                      </span>
                    )}

                    {result.task.status && (
                      <span>
                        <strong>Status:</strong>{" "}
                        {result.task.status}
                      </span>
                    )}

                    {result.task.assignee && (
                      <span>
                        <strong>Assignee:</strong>{" "}
                        {result.task.assignee}
                      </span>
                    )}

                    {result.task.due_date && (
                      <span>
                        <strong>Due:</strong>{" "}
                        {result.task.due_date}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default AITaskCommand;