import "./ProductivityChart.css";

function ProductivityChart() {
  const data = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 95 },
    { day: "Fri", value: 75 },
    { day: "Sat", value: 60 },
    { day: "Sun", value: 90 },
  ];

  return (
    <div className="productivity-chart">
      <h2>📈 Weekly Productivity</h2>

      <div className="chart">
        {data.map((item, index) => (
          <div className="bar-box" key={index}>
            <div
              className="bar"
              style={{ height: `${item.value}%` }}
            >
              <span>{item.value}%</span>
            </div>

            <p>{item.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductivityChart;