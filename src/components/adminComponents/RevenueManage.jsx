import React from "react";

import Table from "react-bootstrap/Table";

function RevenueManage({ data }) {
  // console.log("daa: ", data);
  return (
    <div className="shadow-md p-8 rounded-lg bg-white">
      <h1>Bảng thống kê hằng tháng</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Ngày thống kê</th>
            <th>Doanh thu</th>
            <th>Tài khoản mới</th>
            <th>Bài đăng mới</th>
            <th>Lượt đặt phòng</th>
            <th>Lượt hủy phòng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.date}</td>
              <td>{e.revenue}$</td>
              <td>{e.totalAccount}</td>
              <td>{e.totalPost}</td>
              <td>{e.totalBookings}</td>
              <td>{e.totalCancelBooking}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RevenueManage;
