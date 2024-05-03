import React, { useContext, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

export default function UpComing() {
  const user = useContext(UserContext).user;
  const userId = user?.id;
  const [data, setData] = useState([]);
  const [propertyId, setPropertyId] = useState();

  // tổng các giá trị trong mảng
  const count = data.length;

  // time
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [State, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // get booking status upComing
  const getBooking = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/host-manager/${userId}&CONFIRMED`
      );

      if (result.status === 200) {
        setData(result.data);
      }
    } catch (error) {
      console.log("loi: ", error);
    }
  };
  //
  useEffect(() => {
    getBooking();
  }, []);

  // get booking by propertyId
  useEffect(() => {
    if (propertyId) {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/admin/booking?propertyId=${propertyId}`
        )
        .then(function (response) {
          const newState = response.data.map((booking, index) => ({
            startDate: new Date(booking.checkIn),
            endDate: new Date(booking.checkOut),
            key: `selection${index + 1}`,
            defaultDate: booking.checkIn + " " + booking.checkOut,
            autoFocus: false,
          }));
          setDate(newState);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [propertyId]);

  return (
    <div className="flex w-full">
      <div className="w-1/2 border-r-2 pr-4">
        {data?.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div>Sắp diễn ra: {count} </div>
            {data?.map((index) => (
              <div
                key={index.bookingId}
                className="flex justify-between gap-3 border-b-2 pb-4 cursor-pointer"
              >
                <div
                  className="flex gap-3 w-[90%]"
                  onClick={() => setPropertyId(index.propertyDTOS.propertyId)}
                >
                  <img
                    className="w-48 h-32 rounded-md"
                    src={index.propertyDTOS.thumbnail}
                    alt="thumbnail"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">
                      {index.propertyDTOS.propertyName.length > 50 ? index.propertyDTOS.propertyName.substring(0,50) + '...' : index.propertyDTOS.propertyName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>
                        <MapPinIcon className="w-7" />
                      </span>
                      <span>{index.propertyDTOS.address}</span>
                    </div>
                  </div>
                </div>

                <button className="ring-1 p-2 h-14 text-[0.8em] rounded-md hover:bg-cyan-500 hover:text-white">
                  Chi tiết
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Hiện tại đang trống.</div>
        )}
      </div>
      {/* date area */}
      <div className="w-1/2 border-l-2">
        <DateRangePicker
          onChange={(item) => setState([{ ...State, ...item }])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          onRangeFocusChange={(item) => item}
          months={2}
          ranges={date}
          minDate={new Date()} // vô hiệu hóa ngày quá khứ
          direction="horizontal"
          className="w-[50%]"
          style={{ width: "250px" }}
        />
      </div>
    </div>
  );
}