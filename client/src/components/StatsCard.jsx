function StatCard({ data }) {
  return (
    <div className="stat-card" style={{ borderLeft: `5px solid ${data.color}` }}>
      <div className="stat-icon">{data.icon}</div>

      <div>
        <h2>{data.value}</h2>
        <p>{data.title}</p>
      </div>
    </div>
  );
}

export default StatCard;