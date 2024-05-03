import React, { useContext, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../../UserContext";
import axios from "axios";

export default function Finished({ setRevenue, setNumGuest }) {
  const user = useContext(UserContext).user;
  const userId = user?.id;
  const [data, setData] = useState([]);

  const count = data.length;

  // doanh thu
  const [total, setTotal] = useState([]);

  const revenue = total.reduce((acc, cur) => acc + cur, 0);

  setRevenue(revenue);

  useEffect(() => {
    if (data) {
      setTotal([...data.map((item) => item.total)]);
    }
  }, [data]);

  // lượng khách

  const [guest, setGuest] = useState([]);

  const totalGuest = guest.reduce((acc, cur) => acc + cur, 0);

  setNumGuest(totalGuest);

  useEffect(() => {
    if (data) {
      setGuest([...data.map((item) => item.numOfGuest)]);
    }
  }, [data]);

  // get booking status happening
  const getBooking = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/host-manager/${userId}&COMPLETED`
      );

      if (result.status === 200) {
        setData(result.data);
      }
    } catch (error) {
      console.log("loi: ", error);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div>Đã hoàn thành: {count}</div>
          {data?.map((index) => (
            <div
              key={index.bookingId}
              className="flex justify-between gap-3 border-b-2 pb-4"
            >
              <div className="flex gap-3">
                <img
                  className="w-48 rounded-md"
                  src={index.propertyDTOS.thumbnail}
                  alt="thumbnail"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-medium">
                    {index.propertyDTOS.propertyName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>
                      <MapPinIcon className="w-7" />
                    </span>
                    <span>{index.propertyDTOS.address}</span>
                  </div>
                  <span><span className="font-medium me-2">Nhận phòng:</span> <span className="italic">{index.checkIn}</span></span>
                  <span><span className="font-medium me-2">Trả phòng:</span> <span className="italic">{index.checkOut}</span></span>
                </div>
              </div>

              <button className="ring-1 h-16 px-4 rounded-md hover:bg-cyan-500 hover:text-white">
                Chi tiết
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Hiện tại đang trống.</div>
      )}
    </>
  );
}