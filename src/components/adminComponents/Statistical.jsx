import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BarChart from "../chart/BarChart";
import "./common.scss";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LineChart from "../chart/LineChart";
import axios from "axios";
import { MdOutlineSsidChart } from "react-icons/md";
import RevenueManage from "./RevenueManage";
import Box from "@mui/material/Box";

function Statistical() {
  const [revenueThisMonth, setRevenueThisMonth] = useState([]);
  const [revenueLastMonth, setRevenueLastMonth] = useState([]);
  const [statisticsMonthly, setStatisticsMonthly] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);
  const [dataCancelBooking, setDataCancelBooking] = useState([]);

  const countBooking = {
    label: "Room Bookings",
    data: dataBooking,
  };
  const countCancelBooking = {
    label: "Cancel Bookings",
    data: dataCancelBooking,
  };

  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  // console.log("thisMonth: ", thisMonth);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/revenue`)
      .then(function (response) {
        // console.log("data: ", response.data);
        setThisMonth(response.data[0]);
        setLastMonth(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log("thissmont: ", thisMonth);
  let compareRevenue =
    ((thisMonth?.revenue - lastMonth?.revenue) / lastMonth?.revenue) * 100;
  let compareTotalAccount =
    ((thisMonth.totalAccount - lastMonth.totalAccount) /
      lastMonth.totalAccount) *
    100;
  let compareTotalPost =
    ((thisMonth.totalPost - lastMonth.totalPost) / lastMonth.totalPost) * 100;
  let compareTotalBookings =
    ((thisMonth.totalBookings - lastMonth.totalBookings) /
      lastMonth.totalBookings) *
    100;

  // console.log("revenue daily: ", revenueDaily);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/admin/revenue/daily?date=2024-03-1`
      )
      .then(function (response) {
        // console.log("data: ", response.data);
        // Lấy ngày đầu tiên của tháng hiện tại
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        const currentDate = new Date();
        const day = currentDate.getDate();
        // Tạo mảng mới để lưu trữ doanh thu của mỗi ngày trong tháng
        let revenueThisMonth = Array.from({ length: day }).fill(0);
        let revenueLastMonth = Array.from({ length: 31 }).fill(0);

        // Lặp qua mỗi phần tử trong dữ liệu trả về và gán doanh thu vào mảng mới
        response.data.currentMonthRevenue.forEach((item) => {
          // Lấy ngày từ chuỗi ngày trả về từ máy chủ
          const day = new Date(item.date).getDate();
          // Tính toán vị trí của ngày trong mảng mới
          const index = day - 1; // Giảm đi 1 để bắt đầu từ 0
          // Gán doanh thu vào vị trí tương ứng trong mảng mới
          revenueThisMonth[index] = item.revenue;
        });
        setRevenueThisMonth(revenueThisMonth);

        response.data.previousMonthRevenue.forEach((item) => {
          const day = new Date(item.date).getDate();
          const index = day - 1;
          revenueLastMonth[index] = item.revenue;
        });
        setRevenueLastMonth(revenueLastMonth);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/booking/daily`)
      .then(function (response) {
        // console.log("data booking daily: ", response.data);
        const currentDate = new Date();
        const day = currentDate.getDate();
        // Tạo mảng mới để lưu trữ số booking của mỗi ngày trong tháng
        let bookingThisMonth = Array.from({ length: day }).fill(0);
        // Lưu dữ liệu số lượng đặt phòng của tháng hiện tại
        response.data.map((item) => {
          const day = new Date(item[0]).getDate();
          // console.log("day: ", day);
          const index = day - 1;
          bookingThisMonth[index] = item[1];
        });
        setDataBooking(bookingThisMonth);

        // Tạo mảng mới để lưu trữ số cancel booking của mỗi ngày trong tháng
        let cancelBookingThisMonth = Array.from({ length: day }).fill(0);
        // Lưu dữ liệu số lượng đặt phòng của tháng hiện tại
        response.data.map((item) => {
          const day = new Date(item[0]).getDate();
          // console.log("day: ", day);
          const index = day - 1;
          cancelBookingThisMonth[index] = item[2];
        });
        setDataCancelBooking(cancelBookingThisMonth);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/statistics/monthly`)
      .then(function (response) {
        // console.log("data monthly: ", response.data);
        setStatisticsMonthly(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log("cancel booking: ", dataCancelBooking);
  return (
    <>
      <Row>
        <h1>
          {" "}
          Thống kê được tính từ đầu tháng cho đến ngày hôm nay {thisMonth.date}
        </h1>
        <div className="flex w-full justify-between py-6">
          {/* box Doanh thu */}
          <Card
            title="Doanh thu"
            condition={compareRevenue}
            compare={compareRevenue.toFixed(2)}
            thisMonth={thisMonth?.revenue}
            lastMonth={lastMonth.revenue}
          />

          {/* box Lượt đăng ký tài khoản */}
          <Card
            title="Lượt đăng ký tài khoản"
            condition={compareTotalAccount}
            compare={compareTotalAccount.toFixed(2)}
            thisMonth={thisMonth.totalAccount}
            lastMonth={lastMonth.totalAccount}
          />

          {/* box Bài đăng mới */}
          <Card
            title="Bài đăng mới"
            condition={compareTotalPost}
            compare={compareTotalPost.toFixed(2)}
            thisMonth={thisMonth.totalPost}
            lastMonth={lastMonth.totalPost}
          />

          {/* box Lượt đặt phòng */}
          <Card
            title="Lượt đặt phòng"
            condition={compareTotalBookings}
            compare={compareTotalBookings.toFixed(2)}
            thisMonth={thisMonth.totalBookings}
            lastMonth={lastMonth.totalBookings}
          />
        </div>
      </Row>
      <Row className="py-6">
          <Col xs={6}>
            <LineChart
              title={"Biểu đồ doanh thu tháng này"}
              dataThisMonth={revenueThisMonth}
              dataLastMonth={revenueLastMonth}
            ></LineChart>
          </Col>
          <Col xs={6}>
            <BarChart
              title={"Biểu đồ số lượt đặt phòng tháng này"}
              dataLabelOne={countBooking}
              dataLabelTwo={countCancelBooking}
            ></BarChart>
          </Col>
      </Row>
      <Row className="py-6">
        <Col xs={12}>
          <RevenueManage data={statisticsMonthly}></RevenueManage>
        </Col>
      </Row>
    </>
  );
}

export default Statistical;

export const Card = ({ title, condition, compare, thisMonth, lastMonth }) => {
  return (
    <Box className="flex flex-col w-[31rem] h-[16rem] rounded-xl shadow-md bg-white">
      <h2 className="m-4">{title}</h2>
      <div className="w-full text-center">
        <p className="font-medium text-4xl">{thisMonth}</p>
      </div>
      <div className="w-full">
        {condition > 0 ? (
          <div className="flex items-center">
            <AutoGraphIcon style={{ color: "#0de10d", fontSize: "4rem", marginLeft: "1rem"}}></AutoGraphIcon>
            <p className="text-2xl font-medium mx-4">
              {" "} Tăng{" "}
              {compare === "Infinity" ? ` ${thisMonth} lần` : ` ${compare} %`} so với tháng trước {lastMonth}
            </p>
          </div>
        ) : condition === 0 ? (
          <>
            {/* <MdOutlineSsidChart style={{ fontSize: "4rem", color: "yellow", marginLeft: "1rem" }}/> */}
            <p className="text-2xl font-medium mx-4"></p>
          </>
        ) : (
          <div className="flex items-center">
            <TrendingDownIcon style={{ fontSize: "4rem", color: "red", marginLeft: "1rem" }}></TrendingDownIcon>
            <p className="text-2xl font-medium mx-4">
              {" "}
              Giảm {Math.abs(compare) || 0}% so với tháng trước {lastMonth}
            </p>
          </div>
        )}
      </div>
    </Box>
  );
};
