import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiDoughnutChart = () => {
//    Chart Data
  
const data = {
    labels: ["Complete", "In Process", "Refund"],
    datasets: [
      {
        data: [25, 35, 40], 
        backgroundColor: ["#ff8369", "#FFB1C1", "#ff3535"], 
        hoverBackgroundColor: ["#FF6E42", "#FFC0CF", "#FF3333"], 
        borderWidth: 0, 
        borderRadius: 4,

      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    cutout: "70%", 
    rotation: -90, 
    circumference: 180,
    plugins: {
      legend: {
        display: true, 
        position: "left",
        labels: {
          usePointStyle: true,
          boxWidth: 12, 
          color: "#000",
          padding: 15, 
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* Chart Container */}
      <div style={{ 
        width: "600px", 
        height: "300px", 
        padding: "18px", 
        boxShadow: "0px 4px 4px 0px #00000040",
        borderRadius:"8px"
          }}>


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
                        Complete Orders
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
                        25,800
                    </h1>
                    <p className="bar-graph-heading-3" >+20% month over month</p>
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
                        <option className="graph-options" value="1">1 Year</option>
                        <option value="3">3 Years</option>
                        <option value="6">6 Months</option>
                    </select>
                </div>
            </div>
            <div className="doughnut-container">
                <Doughnut data={data} options={options} style={{
                    position:"absolute",
                    height:"350px",
                    width:"340px",
                    bottom:"0",
                }}/>
            </div>
        </div>
    </div>
  );
};

export default SemiDoughnutChart;
