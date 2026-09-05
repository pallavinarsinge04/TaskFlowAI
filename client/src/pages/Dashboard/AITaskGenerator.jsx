import React, { useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaMagic,
  FaPlus,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";
import "./AITaskGenerator.css";

const AITaskGenerator = ({ project, onTasksCreated }) => {
  const [requirement, setRequirement] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateTasks = async () => {
    if (!project?.id) {
      setError("Please select a project.");
      return;
    }

    if (!requirement.trim()) {
      setError("Describe what you want to build.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setGeneratedTasks([]);
      setSelectedTasks([]);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error(
          "Authentication session not found."
        );
      }

      const response = await axios.post(
        `http://localhost:5000/api/ai/project/${project.id}/generate-tasks`,
        {
          requirement,
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const tasks = response.data?.tasks || [];

      setGeneratedTasks(tasks);
      setSelectedTasks(
        tasks.map((_, index) => index)
      );
    } catch (err) {
      console.error(
        "AI task generation error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to generate tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (index) => {
    setSelectedTasks((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const createSelectedTasks = async () => {
    if (!selectedTasks.length) {
      setError("Select at least one task.");
      return;
    }

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error(
          "Authentication session not found."
        );
      }

      const headers = {
        Authorization: `Bearer ${session.access_token}`,
      };

      const tasksToCreate = selectedTasks.map(
        (index) => generatedTasks[index]
      );

      await Promise.all(
        tasksToCreate.map((task) =>
          axios.post(
            "http://localhost:5000/api/tasks",
            {
              projectId: project.id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              status: "Pending",
              dueDate: null,
              assignee: "",
              completed: false,
            },
            { headers }
          )
        )
      );

      setSuccess(
        `${tasksToCreate.length} task${
          tasksToCreate.length !== 1 ? "s" : ""
        } created successfully.`
      );

      setGeneratedTasks([]);
      setSelectedTasks([]);
      setRequirement("");

      if (onTasksCreated) {
        onTasksCreated();
      }
    } catch (err) {
      console.error(
        "Create AI tasks error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create tasks."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="ai-task-generator">

      <div className="ai-task-header">

        <div className="ai-task-title">

          <div className="ai-task-icon">
            <FaRobot />
          </div>

          <div>
            <h3>AI Task Generator</h3>

            <p>
              Describe your requirement and let AI
              break it into actionable tasks.
            </p>
          </div>

        </div>

      </div>

      <div className="ai-task-input-area">

        <textarea
          value={requirement}
          onChange={(e) =>
            setRequirement(e.target.value)
          }
          placeholder="Example: Build a user authentication system with signup, login, validation and password reset..."
          rows={5}
        />

        <button
          className="generate-task-btn"
          onClick={generateTasks}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="ai-spin" />
              Generating...
            </>
          ) : (
            <>
              <FaMagic />
              Generate Tasks
            </>
          )}
        </button>

      </div>

      {error && (
        <div className="ai-task-error">
          {error}
        </div>
      )}

      {success && (
        <div className="ai-task-success">
          <FaCheck />
          {success}
        </div>
      )}

      {generatedTasks.length > 0 && (
        <div className="generated-tasks">

          <div className="generated-header">

            <div>
              <h4>
                Generated Tasks
              </h4>

              <p>
                Select the tasks you want to add.
              </p>
            </div>

            <button
              onClick={createSelectedTasks}
              disabled={
                creating ||
                selectedTasks.length === 0
              }
            >
              {creating ? (
                <>
                  <FaSpinner className="ai-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FaPlus />
                  Create Selected
                </>
              )}
            </button>

          </div>

          <div className="generated-task-list">

            {generatedTasks.map(
              (task, index) => {

                const selected =
                  selectedTasks.includes(index);

                return (
                  <div
                    className={`generated-task ${
                      selected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() =>
                      toggleTask(index)
                    }
                  >

                    <div
                      className={`task-checkbox ${
                        selected ? "checked" : ""
                      }`}
                    >
                      {selected && <FaCheck />}
                    </div>

                    <div className="generated-task-content">

                      <div className="generated-task-title">
                        <strong>
                          {task.title}
                        </strong>

                        <span
                          className={`task-priority ${task.priority.toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p>
                        {task.description}
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>
      )}

    </section>
  );
};

export default AITaskGenerator;