import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const ServiceManagmentBarChart = ({ name, value, totalOrder, ProductOrderManagmentChart }) => {

    const getHoverGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, 0, chartArea.width, chartArea.height);
        gradient.addColorStop(1, "#F16522");
        gradient.addColorStop(0.5, "#EB008B");
        return gradient;
    };

    const data = {
        labels: name,
        datasets: [
            {
                label: "Complete Orders",
                data: value,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                hoverBackgroundColor: "rgba(255, 99, 132, 0.9)",
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, },
            tooltip: { enabled: true, backgroundColor: "#FF5733", titleColor: "#fff", bodyColor: "#fff", },
        },
        interaction: { mode: "nearest", axis: "x", intersect: true },
        scales: {
            x: {
                grid: { display: false, },
                ticks: { color: "#888", font: { size: 8, }, padding: 10 },
            },
            y: {
                grid: { display: false },
                ticks: { stepSize: 5000, color: "#888", font: { size: 8, }, padding: 10 },
            },
        },
        onHover: (event, chartElement) => {
            if (chartElement.length) {
                const chart = chartElement[0].element.$context.chart;
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const gradient = getHoverGradient(ctx, chartArea);
                chart.data.datasets[0].hoverBackgroundColor = gradient;
                chart.update();
            }
        },
    };

    return (
        <div style={{ padding: "18px", boxShadow: "0px 4px 4px 0px #00000040", borderRadius: "10px", background: "#fff", height: "300px", boxSizing: "border-box", overflow: "hidden", }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ overflow: "hidden" }}>
                    <h2 className="bar-graph-heading-one" style={{ color: "#FF5733", margin: "0", fontSize: "18px", whiteSpace: "nowrap" }}>
                        Complete Services
                    </h2>
                    <h1 className="bar-graph-heading-two" style={{ color: "#FF5733", fontSize: "26px", fontWeight: "bold", margin: "5px 0", overflow: "hidden" }}>
                        {totalOrder}
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
                        <option value="1">Daily</option>
                    </select>
                </div>
            </div>
            <Bar data={data} options={options} style={{ position: "absolute", height: "200px" }} />
        </div>

    );
};

export default ServiceManagmentBarChart;
