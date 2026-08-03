import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMinus
} from "react-icons/fa6";

import "./TrendBadge.css";

function TrendBadge({
  value = 0,
  showIcon = true,
  showSign = true,
  positiveColor = "#10b981",
  negativeColor = "#ef4444",
  neutralColor = "#64748b",
  size = "medium",
}) {
  const trend = Number(value);

  const isPositive = trend > 0;
  const isNegative = trend < 0;
  const isNeutral = trend === 0;

  let badgeClass = "trend-badge";

  if (isPositive) badgeClass += " positive";
  if (isNegative) badgeClass += " negative";
  if (isNeutral) badgeClass += " neutral";

  if (size === "small") badgeClass += " small";
  if (size === "large") badgeClass += " large";

  const badgeStyle = {
    "--positive-color": positiveColor,
    "--negative-color": negativeColor,
    "--neutral-color": neutralColor,
  };

  return (
    <div
      className={badgeClass}
      style={badgeStyle}
    >
      {showIcon && (
        <>
          {isPositive && <FaArrowTrendUp />}
          {isNegative && <FaArrowTrendDown />}
          {isNeutral && <FaMinus />}
        </>
      )}

      <span>
        {showSign && trend > 0 ? "+" : ""}
        {trend}%
      </span>
    </div>
  );
}

export default TrendBadge;