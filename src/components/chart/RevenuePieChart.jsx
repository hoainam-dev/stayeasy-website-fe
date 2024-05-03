import React from "react";
import { Pie } from "react-chartjs-2";

const RevenuePieChart = () => {
  const revenueData = [
    1000, 1500, 2000, 2500, 1800, 2200, 1900, 2300, 2600, 2700, 2800, 3000,
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Mảng chứa màu cho từng tháng
  const monthColors = [
    "rgba(255, 99, 132, 0.6)", // January: đỏ
    "rgba(54, 162, 235, 0.6)", // February: xanh dương
    "rgba(255, 206, 86, 0.6)", // March: vàng
    "rgba(75, 192, 192, 0.6)", // April: xanh lục
    "rgba(153, 102, 255, 0.6)", // May: tím
    "rgba(255, 159, 64, 0.6)", // June: cam
    "rgba(255, 99, 132, 0.6)", // July: đỏ
    "rgba(54, 162, 235, 0.6)", // August: xanh dương
    "rgba(255, 206, 86, 0.6)", // September: vàng
    "rgba(75, 192, 192, 0.6)", // October: xanh lục
    "rgba(153, 102, 255, 0.6)", // November: tím
    "rgba(255, 159, 64, 0.6)", // December: cam
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        backgroundColor: monthColors,
        borderColor: monthColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: ${value}`;
        },
      },
    },
  };

  return (
    <div className="shadow-lg m-8 rounded-lg">
      <h2>Doanh thu 12 tháng</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default RevenuePieChart;
