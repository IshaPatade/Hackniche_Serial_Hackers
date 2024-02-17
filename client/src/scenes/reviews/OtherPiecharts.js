import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const dataMap = {
  abcoffee: {
    labels: ["0-1", "1-2", "2-3", "3-4", "4-5"],
    values: [6, 10, 54, 20, 27],
  },
  amanda: {
    labels: ["0-1", "1-2", "2-3", "3-4", "4-5"],
    values: [0, 2, 2, 6, 29],
  },
  "earth cafe": {
    labels: ["0-1", "1-2", "2-3", "3-4", "4-5"],
    values: [0, 14, 5, 3, 140],
  },
};

const PieChart = () => {
  const [selectedOption, setSelectedOption] = useState("abcoffee");
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      ctx.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: dataMap[selectedOption].labels,
          datasets: [
            {
              label: "Number of ratings",
              data: dataMap[selectedOption].values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        },
        options: {
          //   responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div>
        <select value={selectedOption} onChange={handleChange} className="">
          <option value="abcoffee">abcoffee</option>
          <option value="amanda">amanda</option>
          <option value="earth cafe">earth cafe</option>
        </select>
        <canvas ref={chartRef} id="pie-chart"></canvas>
      </div>
      <canvas ref={chartRef} />
    </>
  );
};

export default PieChart;
