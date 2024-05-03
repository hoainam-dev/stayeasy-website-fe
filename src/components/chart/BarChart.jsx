import React from "react";
import { Line, Chart, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

const BarChart = ({ title, dataLabelOne, dataLabelTwo }) => {
  // console.log(dataLabelOne);
  // const currentDate = new Date();
  // const day = currentDate.getDate();
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Sử dụng mảng các ngày như là nhãn
  const labels = daysInMonth.map((i) => `day ${i}`);
  const data = {
    labels: labels,
    datasets: [
      {
        label: dataLabelOne.label,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: dataLabelOne.data,
      },

      {
        label: dataLabelTwo.label,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "red",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "red",
        data: dataLabelTwo.data,
      },
    ],
  };

  return (
    <div className="shadow-md p-8 bg-white">
      <h3>{title}</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
