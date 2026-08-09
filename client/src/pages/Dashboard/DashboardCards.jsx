import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 1600 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        easedProgress * numericValue
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <>{displayValue}</>;
}

function parseValue(value) {
  if (typeof value === "number") {
    return {
      number: value,
      suffix: "",
    };
  }

  const stringValue = String(value);

  const match = stringValue.match(
    /^(\d+(?:\.\d+)?)(.*)$/
  );

  if (!match) {
    return {
      number: null,
      suffix: stringValue,
    };
  }

  return {
    number: Number(match[1]),
    suffix: match[2],
  };
}

function DashboardCards({ cards = [] }) {
  const navigate = useNavigate();

  return (
    <section className="dashboard-cards">
      {cards.map((card, index) => {
        const { number, suffix } = parseValue(card.value);

        return (
          <motion.article
            key={card.title || index}
            className="stat-card"
            style={{
              "--accent": card.color || "#2563eb",
            }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.35,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => {
              if (card.path) {
                navigate(card.path);
              }
            }}
          >
            {/* Icon */}
            <div className="stat-card-icon">
              {card.icon}
            </div>

            {/* Content */}
            <div className="stat-card-body">
              <p className="stat-card-label">
                {card.title}
              </p>

              <h3 className="stat-card-value">
                {number !== null ? (
                  <>
                    <AnimatedNumber
                      value={number}
                      duration={1600}
                    />
                    {suffix}
                  </>
                ) : (
                  suffix
                )}
              </h3>

              {card.subtitle && (
                <span className="stat-card-subtitle">
                  {card.subtitle}
                </span>
              )}
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

export default DashboardCards;