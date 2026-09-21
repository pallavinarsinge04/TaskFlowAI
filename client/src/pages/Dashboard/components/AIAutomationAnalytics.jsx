import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../../../supabase/supabaseClient";
import "./AIAutomationAnalytics.css";

const API_BASE = "http://localhost:5000/api/ai";

const AIAutomationAnalytics = ({ project }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Authentication session expired.");
      }

      const response = await axios.get(
        `${API_BASE}/project/${project.id}/automation-analytics`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error(
        "Failed to load automation analytics:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project?.id) {
      loadAnalytics();
    }
  }, [project?.id]);

  if (!project) return null;

  if (loading) {
    return (
      <div className="ai-automation-analytics">
        <div className="analytics-loading">
          Loading AI automation analytics...
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="ai-automation-analytics">
      <div className="automation-analytics-header">
        <div>
          <h3>📊 AI Automation Analytics</h3>
          <p>
            Track how AI automation is being used in this project.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAnalytics}
          className="analytics-refresh-btn"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="automation-stat-grid">
        <div className="automation-stat-card">
          <span className="automation-stat-icon">🤖</span>
          <strong>{analytics.totalActions}</strong>
          <span>Total Actions</span>
        </div>

        <div className="automation-stat-card">
          <span className="automation-stat-icon">✅</span>
          <strong>{analytics.successfulActions}</strong>
          <span>Successful</span>
        </div>

        <div className="automation-stat-card">
          <span className="automation-stat-icon">❌</span>
          <strong>{analytics.failedActions}</strong>
          <span>Failed</span>
        </div>

        <div className="automation-stat-card">
          <span className="automation-stat-icon">↩</span>
          <strong>{analytics.undoneActions}</strong>
          <span>Undone</span>
        </div>
      </div>

      <div className="automation-success-section">
        <div>
          <h4>Automation Success Rate</h4>
          <p>
            {analytics.successRate}% of recorded automation
            actions completed successfully.
          </p>
        </div>

        <div className="automation-progress">
          <div
            className="automation-progress-bar"
            style={{
              width: `${analytics.successRate}%`,
            }}
          />
        </div>
      </div>

      <div className="automation-breakdown">
        <h4>Action Breakdown</h4>

        {analytics.breakdown.length === 0 ? (
          <p>No automation actions recorded yet.</p>
        ) : (
          <div className="automation-breakdown-list">
            {analytics.breakdown.map((item) => (
              <div
                className="automation-breakdown-item"
                key={item.type}
              >
                <span>
                  {item.type.replaceAll("_", " ")}
                </span>

                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="automation-recent">
        <h4>Recent Automation Activity</h4>

        {analytics.recentActivity.length === 0 ? (
          <p>No recent automation activity.</p>
        ) : (
          <div className="automation-recent-list">
            {analytics.recentActivity.map((item) => (
              <div
                className="automation-recent-item"
                key={item.id}
              >
                <div>
                  <strong>
                    {item.action_type?.replaceAll("_", " ")}
                  </strong>

                  <span>
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </span>
                </div>

                <span
                  className={`automation-status ${item.status}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAutomationAnalytics;