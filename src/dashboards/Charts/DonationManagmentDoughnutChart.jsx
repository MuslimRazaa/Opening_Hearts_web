import React from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS,ArcElement,Tooltip,Legend,} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const DonationManagmentDoughnutChart = ({value , totalOrder , ProductOrderManagmentChart}) => {
  
const data = {
    // labels: [`Pending ${value?.pending}`,`Active ${value?.accepted}`,`Complete ${value?.complete}`, `Refund ${value?.refund}` , `Rejected ${value?.reject}`,],
    datasets: [
      {
        data: [totalOrder], 
        backgroundColor: ["#ff8369"], 
        hoverBackgroundColor: ["#ff8369"], 
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
      <div style={{ width: "600px", height: "300px", padding: "18px", boxShadow: "0px 4px 4px 0px #00000040",borderRadius:"8px"}}>

        <div style={{display: "flex",justifyContent: "space-between",marginBottom: "20px"}}>
                <div style={{ overflow: "hidden" }}>
                    <h2 className="bar-graph-heading-one" style={{ color: "#FF5733", margin: "0", fontSize: "18px", whiteSpace: "nowrap"}}>
                        Total Doners
                    </h2>
                    <h1 className="bar-graph-heading-two" style={{color: "#FF5733",fontSize: "26px",fontWeight: "bold",margin: "5px 0",overflow: "hidden"}}>
                        {totalOrder}
                    </h1>
                    <p className="bar-graph-heading-3" style={{opacity:0}}>+20% month over month</p>
                </div>

                <div>
                </div>
            </div>
            <div className="doughnut-container">
                <Doughnut data={data} options={options} style={{ position:"absolute", height:"350px", width:"340px", bottom:"0", }}/>
            </div>
        </div>
    </div>
  );
};

export default DonationManagmentDoughnutChart;
