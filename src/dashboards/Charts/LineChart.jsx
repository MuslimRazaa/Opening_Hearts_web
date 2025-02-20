import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Gradient Color Function
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "#F16522");
    gradient.addColorStop(1, "#EB008B");
    return gradient;
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const randomData = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: true, // Tooltip only appears when directly over the point
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: true, // Ensures hover only happens on points
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#888",
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 2000,
          color: "#888",
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(() => randomData(0, 10000)),
        borderColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea); // Apply gradient to the line
        },
        borderWidth: 2,
        pointBackgroundColor: "#FF5733",
        pointBorderColor: "#FF5733",
        pointHoverBackgroundColor: "#FFFFFF", // Hover point background color
        pointHoverBorderColor: "#FF5733", // Hover point border color
        pointRadius: 5, // Normal point size
        pointHoverRadius: 8, // Point size on hover
        tension: 0.4, // Smooth line
      },
    ],
  };

  return (
    <div
      style={{
        padding: "18px",
        boxShadow: "0px 4px 4px 0px #00000040",
        borderRadius: "10px",
        background: "#fff",
        height: "300px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <h2
            className="bar-graph-heading-one"
            style={{
              color: "#FF5733",
              margin: "0",
              fontSize: "18px",
              whiteSpace: "nowrap",
            }}
          >
            Total Revenue
          </h2>
          <h1
            className="bar-graph-heading-two"
            style={{
              color: "#FF5733",
              fontSize: "26px",
              fontWeight: "bold",
              margin: "5px 0",
              overflow: "hidden",
            }}
          >
            $20,05,800
          </h1>
        </div>
        <div>
          <select
            className="option-bar-graph"
            style={{
              padding: "0px 16px",
              borderRadius: "20px",
              background: "#fff",
              color: "#FF5733",
              fontWeight: "bold",
              cursor: "pointer",
              outline: "none",
              whiteSpace: "nowrap",
            }}
          >
            <option className="graph-options" value="1">
              1 Year
            </option>
            <option value="3">3 Years</option>
            <option value="6">6 Months</option>
          </select>
        </div>
      </div>
      {/* Chart Section */}
      <Line
        data={data}
        options={options}
        style={{
          position: "absolute",
          height: "200px",
        }}
      />
    </div>
  );
};

export default LineChart;
