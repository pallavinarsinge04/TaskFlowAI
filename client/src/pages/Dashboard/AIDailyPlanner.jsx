import { useState } from "react";
import axios from "axios";

import {
  FaBrain,
  FaCalendarDay,
  FaClock,
  FaExclamationTriangle,
  FaLightbulb,
  FaCheckCircle,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";

import "./AIDailyPlanner.css";

const AI_API =
  "http://localhost:5000/api/ai";

function AIDailyPlanner({ project }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const generatePlan = async () => {
    try {
      setLoading(true);
      setError("");

      const {
        data: sessionData,
      } =
        await supabase.auth.getSession();

      const token =
        sessionData?.session?.access_token;

      if (!token) {
        setError(
          "Your session has expired. Please login again."
        );
        return;
      }

      const response =
        await axios.post(
          `${AI_API}/daily-plan`,
          {
            projectId:
              project?.id || null,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setPlan(
        response.data?.plan || null
      );
    } catch (err) {
      console.error(
        "Daily planner error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to generate daily plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-daily-planner">
      <div className="daily-planner-header">
        <div className="daily-planner-heading">
          <div className="daily-planner-icon">
            <FaBrain />
          </div>

          <div>
            <h2>
              AI Daily Planner
            </h2>

            <p>
              Let AI organize your workday.
            </p>
          </div>
        </div>

        <button
          className="start-day-button"
          onClick={generatePlan}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="spin" />
              Planning...
            </>
          ) : (
            <>
              <FaCalendarDay />
              Start My Day
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="daily-planner-error">
          <FaExclamationTriangle />
          {error}
        </div>
      )}

      {plan && (
        <div className="daily-plan-content">

          <div className="daily-plan-greeting">
            <h3>
              {plan.greeting}
            </h3>

            <p>
              {plan.summary}
            </p>
          </div>

          {/* TOP PRIORITIES */}

          {plan.topPriorities?.length > 0 && (
            <div className="daily-section">
              <div className="daily-section-title">
                <FaCheckCircle />
                <h3>
                  Top Priorities
                </h3>
              </div>

              <div className="priority-list">
                {plan.topPriorities.map(
                  (item, index) => (
                    <div
                      className="daily-priority-item"
                      key={item.taskId}
                    >
                      <div className="priority-number">
                        {index + 1}
                      </div>

                      <div>
                        <h4>
                          {item.title}
                        </h4>

                        <p>
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* SCHEDULE */}

          {plan.schedule?.length > 0 && (
            <div className="daily-section">
              <div className="daily-section-title">
                <FaClock />
                <h3>
                  Today's Schedule
                </h3>
              </div>

              <div className="daily-schedule">
                {plan.schedule.map(
                  (item, index) => (
                    <div
                      className="schedule-item"
                      key={`${item.taskId}-${index}`}
                    >
                      <div className="schedule-time">
                        <strong>
                          {item.startTime}
                        </strong>

                        <span>
                          {item.endTime}
                        </span>
                      </div>

                      <FaArrowRight className="schedule-arrow" />

                      <div className="schedule-task">
                        <h4>
                          {item.title}
                        </h4>

                        <p>
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* WARNINGS */}

          {plan.warnings?.length > 0 && (
            <div className="daily-section">
              <div className="daily-section-title warning-title">
                <FaExclamationTriangle />

                <h3>
                  Deadline Warnings
                </h3>
              </div>

              <div className="warning-list">
                {plan.warnings.map(
                  (warning, index) => (
                    <div
                      className="warning-item"
                      key={`${warning.taskId}-${index}`}
                    >
                      <FaExclamationTriangle />

                      <span>
                        {warning.message}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* PRODUCTIVITY TIP */}

          {plan.productivityTip && (
            <div className="productivity-tip">
              <FaLightbulb />

              <div>
                <strong>
                  Productivity Tip
                </strong>

                <p>
                  {plan.productivityTip}
                </p>
              </div>
            </div>
          )}

          <button
            className="regenerate-plan"
            onClick={generatePlan}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spin" />
                Regenerating...
              </>
            ) : (
              <>
                <FaBrain />
                Regenerate Plan
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default AIDailyPlanner;