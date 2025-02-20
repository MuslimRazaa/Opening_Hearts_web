import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueManagmentLineChart = ({ name, value, totalOrder, ProductOrderManagmentChart }) => {
    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "#F16522");
        gradient.addColorStop(1, "#EB008B");
        return gradient;
    };

    const labels = name;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true, intersect: true,
                callbacks: { label: (tooltipItem) => `$${tooltipItem.raw.toLocaleString()}` },
            },
        },
        interaction: { mode: "nearest", axis: "x", intersect: true },
        scales: {
            x: { grid: { display: false }, ticks: { color: "#888", font: { size: 10 }, padding: 10 } },
            y: { grid: { display: false }, ticks: { stepSize: 2000, color: "#888", font: { size: 10 }, padding: 10 } },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: "", data: value,
                borderColor: (context) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) { return null; }
                    return getGradient(ctx, chartArea);
                },
                borderWidth: 2,
                pointBackgroundColor: "#FF5733",
                pointBorderColor: "#FF5733",
                pointHoverBackgroundColor: "#FFFFFF",
                pointHoverBorderColor: "#FF5733",
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.4,
            },
        ],
    };

    return (
        <div style={{ padding: "18px", boxShadow: "0px 4px 4px 0px #00000040", borderRadius: "10px", background: "#fff", height: "300px", boxSizing: "border-box", overflow: "hidden", }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", }}>
                <div style={{ overflow: "hidden" }}>
                    <h2 className="bar-graph-heading-one" style={{ color: "#FF5733", margin: "0", fontSize: "18px", whiteSpace: "nowrap", }} >Total Revenue</h2>
                    <h1 className="bar-graph-heading-two" style={{ color: "#FF5733", fontSize: "26px", fontWeight: "bold", margin: "5px 0", overflow: "hidden", }} >
                        ${totalOrder}
                    </h1>
                </div>
                <div>
                    <select
                        className="option-bar-graph"
                        style={{ padding: "0px 16px", borderRadius: "20px", background: "#fff", color: "#FF5733", fontWeight: "bold", cursor: "pointer", outline: "none", whiteSpace: "nowrap" }}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "1") {
                                ProductOrderManagmentChart("daily");
                            } else if (value === "2") {
                                ProductOrderManagmentChart("monthly");
                            } else if (value === "3") {
                                ProductOrderManagmentChart("yearly");
                            }
                        }}
                    >
                        <option value="2" >Monthly</option>
                        <option value="3">Yearly</option>
                        <option className="graph-options">Daily</option>
                    </select>
                </div>
            </div>
            {/* Chart Section */}
            <Line data={data} options={options} style={{ position: "absolute", height: "200px", }} />
        </div>
    );
};

export default RevenueManagmentLineChart;
