import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

import "./KpiCard.css";

function KpiCard({
  title,
  value,
  icon,
  color = "#2563eb",
  trend = 0,
  progress = 0,
  subtitle = "",
}) {
  const positive = trend >= 0;

  return (
    <motion.div
      className="kpi-card"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {/* Header */}

      <div className="kpi-top">

        <div
          className="kpi-icon"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          {icon}
        </div>

        <div
          className={
            positive
              ? "trend positive"
              : "trend negative"
          }
        >
          {positive ? (
            <FaArrowUp />
          ) : (
            <FaArrowDown />
          )}

          {Math.abs(trend)}%
        </div>

      </div>

      {/* Value */}

      <div className="kpi-value">

        <CountUp
          end={value}
          duration={2}
        />

      </div>

      {/* Title */}

      <div className="kpi-title">

        {title}

      </div>

      {/* Subtitle */}

      {subtitle && (
        <div className="kpi-subtitle">
          {subtitle}
        </div>
      )}

      {/* Progress */}

      <div className="progress-container">

        <div className="progress-track">

          <motion.div
            className="progress-fill"
            style={{
              background: color,
            }}
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 1.5,
            }}
          />

        </div>

        <span>{progress}%</span>

      </div>

    </motion.div>
  );
}

export default KpiCard;