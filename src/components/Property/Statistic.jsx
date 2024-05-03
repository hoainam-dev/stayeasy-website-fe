import React, { useContext, useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Alert } from "../Alert/Alert";
import UpComing from "./roomStatus/UpComing";
import Happenning from "./roomStatus/Happenning";
import Finished from "./roomStatus/Finished";
import { Link } from "react-router-dom";

export default function Statistic() {
  // GET USER
  const user = useContext(UserContext).user;

  const userId = user?.id;

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [data, setData] = useState([]);

  // get booking status pending
  const getBooking = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/host-manager/${userId}&PENDING`
      );

      if (result.status === 200) {
        setData(result.data);
      }
    } catch (error) {
      console.log("loi: ", error);
    }
  };

  // handle confirm
  const handleConfirm = async (index) => {
    try {
      const result = await axios.put(
        `http://localhost:8080/api/v1/stayeasy/host-manager/update/${index.bookingId}&CONFIRMED`
      );

      if (result.status === 200) {
        Alert(2000, "Xác nhận đặt phòng", "thành công!", "success", "OK");
        getBooking();
      }
    } catch (error) {
      console.log("error1");
    }
  };

  // handle reject
  const handleReject = async (index) => {
    try {
      const result = await axios.put(
        `http://localhost:8080/api/v1/stayeasy/host-manager/update/${index.bookingId}&REJECTED`
      );

      if (result.status === 200) {
        Alert(2000, "Từ chối đặt phòng", "Đã từ chối!", "success", "OK");
        getBooking();
      }
    } catch (error) {
      console.log("error!");
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  // navbar
  const [revenue, setRevenue] = useState(); // doanh thu
  const [numGuest, setNumGuest] = useState(); // luong khach

  const menu = [
    {
      id: 1,
      title: "Sắp diễn ra",
      icon: <CalendarDaysIcon className="w-7" />,
      element: <UpComing />,
    },
    {
      id: 2,
      title: "Đang diễn ra",
      icon: <ClockIcon className="w-7" />,
      element: <Happenning />,
    },
    {
      id: 3,
      title: "Đã hoàn thành",
      icon: <CheckCircleIcon className="w-7" />,
      element: <Finished setRevenue={setRevenue} setNumGuest={setNumGuest} />,
    },
  ];

  const [item, setItem] = useState(menu[2]);

  return (
    <div className="px-4">
      {/* Chart area */}
      <div className="flex my-4 gap-4">
        <div className="flex flex-col gap-4">
          {/* Chart 1 */}
          <Box
            className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white "
            sx={{ flexGrow: 4 }}
          >
            <h2 className="m-4">Doanh thu</h2>
            <p className="text-[3rem] font-medium text-center">{revenue} $</p>
            <SparkLineChart
              data={[1, 2, 4, 8, 6]}
              showHighlight={true}
              showTooltip={true}
              width={250}
              height={100}
            />
          </Box>

          {/* Chart 2 */}
          <Box
            className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white "
            sx={{ flexGrow: 4 }}
          >
            <h2 className="m-4">người thuê nhà</h2>
            <p className="text-[3rem] font-medium text-center">{numGuest}</p>
            <SparkLineChart
              data={[1, 2, 4, 8, 6]}
              showHighlight={true}
              showTooltip={true}
              width={250}
              height={100}
            />
          </Box>
        </div>

        {/* request area */}
        <div
          style={{ overflow: "hidden" }}
          className="w-[65vw] rounded-xl flex flex-col h-[41.5rem] shadow-xl bg-white "
          // sx={{ flexGrow: 4 }}
        >
          <h2 className="m-4">Yêu cầu đặt phòng</h2>
          {/* list request */}
          <div className="w-[100%] h-full overflow-scroll">
            <>
              {data?.length > 0 ? (
                <>
                  {data?.map((index) => (
                    <div
                      key={index.bookingId}
                      className="flex justify-between gap-3 py-2 px-4 w-full border-b-2"
                    >
                      {/* <img src={e.avatar} /> */}
                      {/* <div className="flex gap-4"> */}
                      <div class="w-[16%]">
                        <img
                          className="w-full h-32 rounded-md"
                          src={index.propertyDTOS.thumbnail}
                          alt="avt"
                        />
                      </div>
                      <div className="text-start w-[68%]">
                        <h4>
                          {index.propertyDTOS.propertyName.length > 150
                            ? index.propertyDTOS.propertyName.substring(
                                0,
                                150
                              ) + "..."
                            : index.propertyDTOS.propertyName}
                        </h4>
                        <div className="flex gap-2">
                          <span>Yêu cầu từ</span>
                          <span className="font-medium gap-2 flex">
                            <span>{index.userDTOS.firstName}</span>
                            <span>{index.userDTOS.lastName}</span>
                          </span>
                        </div>
                      </div>
                      {/* </div> */}

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleConfirm(index)}
                          className="ring-offset-2 ring-1 rounded-lg h-16 px-2 hover:bg-cyan-500 hover:text-white text-[1.2em]"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => handleReject(index)}
                          className="ring-offset-2 ring-1 rounded-lg px-2 h-16 hover:bg-[#FF385C] hover:text-white text-[1.2em]"
                        >
                          Từ chối
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex justify-center items-center">
                  Không có yêu cầu.
                </div>
              )}
            </>
          </div>
        </div>
      </div>

      {/* check status area */}
      <div className="border w-[calc(100vw-15vw - 2rem)] bg-white rounded-xl shadow-md p-3 flex flex-col gap-4">
        {/* nav */}
        <div className="flex w-full gap-4 items-center">
          {menu?.map((i) => (
            <Link key={i.id}>
              <button
                onClick={() => setItem(i)}
                className={`${
                  item.id === i.id ? "bg-cyan-500 text-white" : ""
                } relative flex items-center gap-3 hover:bg-gray-400 hover:text-white border rounded-md py-2 px-4`}
              >
                <span>{i.icon}</span>
                <span>{i.title}</span>
              </button>
            </Link>
          ))}
        </div>

        <div>{item.element}</div>
      </div>
    </div>
  );
}