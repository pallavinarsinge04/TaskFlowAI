import { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaSyncAlt,
  FaEye,
} from "react-icons/fa";

const StatCard = ({
  title,
  value,
  color = "#2563eb",
}) => {

  const [count, setCount] = useState(0);
  const [updated, setUpdated] = useState(
    new Date().toLocaleTimeString()
  );

  // Animated Counter
  useEffect(() => {
    let start = 0;

    const end =
      typeof value === "number"
        ? value
        : parseInt(value) || 0;

    if (start === end) return;

    let duration = 800;
    let increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(timer);

  }, [value]);

  // Refresh Card
  const handleRefresh = () => {
    setUpdated(new Date().toLocaleTimeString());

    alert(`${title} refreshed successfully.`);
  };

  const trendUp = Math.random() > 0.5;

  return (

    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        borderTop: `6px solid ${color}`,
        transition: ".3s",
        cursor: "pointer",
      }}
    >

      {/* Top */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <h3
          style={{
            color: "#64748b",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>

        <button
          onClick={handleRefresh}
          style={{
            border: "none",
            background: "#eef4ff",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <FaSyncAlt color={color} />
        </button>

      </div>

      {/* Number */}

      <h1
        style={{
          fontSize: "42px",
          margin: "18px 0",
          color,
        }}
      >
        {count}
      </h1>

      {/* Progress */}

      <div
        style={{
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: `${Math.min(count,100)}%`,
            background: color,
            height: "100%",
          }}
        />

      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div>

          <span
            style={{
              color: trendUp
                ? "#22c55e"
                : "#ef4444",
              fontWeight: 700,
            }}
          >

            {trendUp ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            )}

            {trendUp ? " +12%" : " -4%"}

          </span>

        </div>

        <button
          style={{
            border: "none",
            background: color,
            color: "white",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() =>
            alert(`${title} Details`)
          }
        >

          <FaEye />

          {" "}View

        </button>

      </div>

      <p
        style={{
          marginTop: "15px",
          color: "#94a3b8",
          fontSize: "13px",
        }}
      >

        Updated: {updated}

      </p>

    </div>

  );
};

export default StatCard;