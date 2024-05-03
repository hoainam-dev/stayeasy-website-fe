import React, { useEffect, useState } from "react";
import { Card } from "./Statistical";
import axios from "axios";

function PropertyStatistical({ propertyId, zoom }) {
  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  useEffect(() => {
    if (propertyId) {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/admin/statistics?propertyId=${propertyId}`
        )
        .then(function (response) {
          console.table(response.data);
          setThisMonth(response.data[0]);
          setLastMonth(response.data[1]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [propertyId]);

  let compareRevenue =
    ((thisMonth?.revenue - lastMonth?.revenue) / lastMonth?.revenue) * 100;
  let compareTotalBookings =
    ((thisMonth.totalBookings - lastMonth.totalBookings) /
      lastMonth.totalBookings) *
    100;
  let comparetoTalLike =
    ((thisMonth?.totalLike - lastMonth?.totalLike) / lastMonth?.totalLike) *
    100;

  let compareTotalCancelBookings =
    ((thisMonth?.totalCancelBookings - lastMonth?.totalCancelBookings) /
      lastMonth?.totalCancelBookings) *
    100;
  console.log("cp: ", compareRevenue || thisMonth?.revenue);
  return (
    <div style={{ zoom: zoom }}>
      <h1>Thống kê từ đầu tháng</h1>
      <div className="flex justify-between py-10">
        <Card
          title="Doanh thu ($)"
          condition={compareRevenue || 0}
          compare={compareRevenue.toFixed(2)}
          thisMonth={thisMonth?.revenue}
          lastMonth={lastMonth.revenue}
        />

        <Card
          title="Lượt đặt phòng"
          condition={compareTotalBookings || 0}
          compare={compareTotalBookings.toFixed(2)}
          thisMonth={thisMonth?.totalBookings}
          lastMonth={lastMonth.totalBookings}
        />
        <Card
          title="Lượt hủy phòng"
          condition={compareTotalCancelBookings || 0}
          compare={compareTotalCancelBookings.toFixed(2)}
          thisMonth={thisMonth?.totalCancelBooking}
          lastMonth={lastMonth.totalCancelBooking}
        />
        <Card
          title="Lượt yêu thích"
          condition={comparetoTalLike || 0}
          compare={comparetoTalLike.toFixed(2)}
          thisMonth={thisMonth?.totalLike}
          lastMonth={lastMonth.totalLike}
        />
      </div>
    </div>
  );
}

export default PropertyStatistical;
