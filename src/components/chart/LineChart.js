import React from "react";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
const LineChart = ({ title, dataThisMonth, dataLastMonth }) => {
  // console.log("oke: ", dataThisMonth);
  // Tạo mảng các ngày trong tháng
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Sử dụng mảng các ngày như là nhãn
  const labels = daysInMonth.map((i) => `day ${i}`);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "This Month ",
        data: dataThisMonth,
        borderColor: "green",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Last Month ",
        data: dataLastMonth,
        borderColor: "red",
        backgroundColor: "rgba(192,75,192,0.4)",
      },
    ],
  };

  return (
    <div className="shadow-md p-8  bg-white">
      <h3>{title}</h3>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
