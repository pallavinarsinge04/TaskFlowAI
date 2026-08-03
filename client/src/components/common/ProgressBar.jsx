import { motion } from "framer-motion";
import "./ProgressBar.css";

function ProgressBar({
  progress = 0,
  height = 10,
  color = "#2563eb",
  background = "#e5e7eb",
  showLabel = true,
  animated = true,
  striped = false,
  rounded = true,
}) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-wrapper">

      <div
        className={`progress-track ${
          rounded ? "rounded" : ""
        }`}
        style={{
          height: `${height}px`,
          background,
        }}
      >

        <motion.div
          className={`progress-fill ${
            striped ? "striped" : ""
          }`}
          style={{
            background: color,
          }}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${safeProgress}%`,
          }}
          transition={{
            duration: animated ? 1.2 : 0,
            ease: "easeOut",
          }}
        />

      </div>

      {showLabel && (
        <span className="progress-label">
          {safeProgress}%
        </span>
      )}

    </div>
  );
}

export default ProgressBar;