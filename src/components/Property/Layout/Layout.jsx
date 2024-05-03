import React from "react";
import Footer from "../../footer/Footer";
import { Outlet } from "react-router-dom";
import "../Property.css";
import CommonHeader from "../../header/CommonHeader";

export default function Layout() {
  return (
    <div className="flex flex-col items-center">
      <CommonHeader />

      <div style={{marginTop: "8rem", minHeight: "81vh"}}>
        {/* <div className="col-3 col-md-2 fixed">
          <Sidebar />
        </div> */}

        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <div className="w-full fixed bg-white" style={{bottom: "0"}}><Footer/></div>
    </div>
  );
}
