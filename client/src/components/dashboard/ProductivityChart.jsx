import "./ProductivityChart.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartLine
} from "react-icons/fa";

function ProductivityChart() {

  const data = [
    { day: "Mon", value: 70 },
    { day: "Tue", value: 85 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 92 },
    { day: "Fri", value: 78 },
    { day: "Sat", value: 98 },
    { day: "Sun", value: 88 }
  ];

  const max = Math.max(...data.map(item => item.value));

  return (

    <div className="productivity-chart">

      <div className="chart-header">

        <div>

          <h2>

            <FaChartLine />

            Productivity Overview

          </h2>

          <p>

            Weekly productivity performance

          </p>

        </div>

        <div className="chart-score">

          <h1>89%</h1>

          <span>

            <FaArrowUp />

            +12%

          </span>

        </div>

      </div>

      <div className="chart-bars">

        {data.map((item) => (

          <div
            key={item.day}
            className="bar-item"
          >

            <div className="bar-wrapper">

              <div

                className="bar"

                style={{
                  height: `${(item.value / max) * 220}px`
                }}

              >

                <span className="bar-value">

                  {item.value}%

                </span>

              </div>

            </div>

            <p>{item.day}</p>

          </div>

        ))}

      </div>

      <div className="chart-footer">

        <div className="footer-card">

          <h3>Completed Tasks</h3>

          <span>148</span>

        </div>

        <div className="footer-card">

          <h3>Pending Tasks</h3>

          <span>22</span>

        </div>

        <div className="footer-card">

          <h3>Efficiency</h3>

          <span className="green">

            <FaArrowUp />

            94%

          </span>

        </div>

        <div className="footer-card">

          <h3>Delay</h3>

          <span className="red">

            <FaArrowDown />

            6%

          </span>

        </div>

      </div>

    </div>

  );

}

export default ProductivityChart;