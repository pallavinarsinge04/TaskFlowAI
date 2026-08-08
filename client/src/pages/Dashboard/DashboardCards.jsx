import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

function DashboardCards({ cards = [] }) {
  const navigate = useNavigate();

  const parseValue = (value) => {
    if (typeof value === "number") return { end: value, suffix: "" };
    const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { end: 0, suffix: String(value) };
    return { end: Number(match[1]), suffix: match[2] };
  };

  return (
    <section className="dashboard-cards">
      {cards.map((card, index) => {
        const { end, suffix } = parseValue(card.value);

        return (
          <motion.article
            key={card.title}
            className="stat-card"
            style={{ "--accent": card.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => navigate(card.path || "/dashboard")}
          >
            <div className="stat-card-icon">{card.icon}</div>
            <div className="stat-card-body">
              <p className="stat-card-label">{card.title}</p>
              <h3 className="stat-card-value">
  {end}{suffix}
</h3>
              {card.subtitle && (
                <span className="stat-card-subtitle">{card.subtitle}</span>
              )}
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

export default DashboardCards;
