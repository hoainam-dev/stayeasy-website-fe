import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";

function BookingModal(props) {
  const [place, setPlace] = useState([]);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const checkIn = urlParams.get("checkin");
  const checkOut = urlParams.get("checkout");
  const numGuest = urlParams.get("numGuest");
  const [open, setOpen] = useState(props.isOpen);
  const [dateRange, setDateRange] = useState([
    {
      startDate: checkIn ? format(new Date(checkIn), "yyyy-MM-dd") : new Date(),
      endDate: checkOut ? format(new Date(checkOut), "yyyy-MM-dd") : new Date(),
      key: "selection",
    },
  ]);
  console.log(props.isOpen);
  const [guests, setGuests] = useState(numGuest);
  if(open) {
    
      // Chọn các thành phần sau khi component được render
      const elements = document.querySelectorAll('.rdrCalendarWrapper, .rdrDateRangeWrapper, .rdrMonth');
  
      // Áp dụng style cho mỗi thành phần được chọn
      elements.forEach(element => {
        element.style.width = '100%'; // Thay đổi chiều rộng thành 100%
        element.style.height = '50%'; // Thay đổi chiều rộng thành 100%
      });
      const buttons = document.querySelectorAll('.rdrDayDisabled');
      buttons.forEach(button => {
        button.classList.remove('rdrDayDisabled'); // Loại bỏ class rdrDayDisabled
        button.classList.add('bg-black', 'rounded-full', 'border-solid', 'border-2', 'border-white'); // Thêm các class cần thiết
      
        const span = button.querySelector('.rdrDayNumber span');
        span.classList.add('text-white','text-2xl', 'line-through'); // Thêm class cho text bên trong button
      });
  
  }
  useEffect(() => {
    if (!props.propertyId) return;
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/booking/listing/${props.propertyId}`
      )
      .then((response) => {
        if (response) {
          setPlace(response.data);
          console.log(response.data);
          // Logging response data instead of place
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [props.propertyId]);

  
  const bookedDates = place
    .map((booking) => {
      let disabledDates = [];
      let currentDate = new Date(booking.checkIn);
      while (currentDate <= new Date(booking.checkOut)) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return disabledDates;
    })
    .flat();
    
  useEffect(() => {
    const checkinDate = format(new Date(dateRange[0].startDate), "yyyy-MM-dd");
    const checkoutDate = format(new Date(dateRange[0].endDate), "yyyy-MM-dd");
    const numGuests = guests;

    const searchParams = new URLSearchParams();
    searchParams.set("checkin", checkinDate);
    searchParams.set("checkout", checkoutDate);
    searchParams.set("numGuest", numGuests);

    const newURL = `http://localhost:3000/booking/${
      props.propertyId
    }?${searchParams.toString()}`;
    window.history.replaceState(null, "", newURL);
  }, [dateRange, numGuest, props.propertyId]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);

    // Thực hiện các công việc cần thiết trước khi reload trang

    setTimeout(() => {
      setOpen(false);
      window.location.reload();
    }, 1000); // Giả sử loading trong 1 giây

    // Hoặc có thể thực hiện các công việc bất đồng bộ khác ở đây
  };
  return (
    //   isLoading && <div class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    //   <div class="flex justify-center items-center mt-[50vh]">
    //     <div class="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
    //   </div>
    // </div>
    open && (
      <div className="fixed z-10 inset-0 overflow-y-auto pb-20">
        <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div className="inline-block w-[48%] align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-4xl">Chỉnh sửa đặt phòng</h1>
              <button onClick={props.onClose}>&#10005;</button>
            </div>
            <div className="mt-4">
              <label htmlFor="guests">Số lượng khách</label>
              <input
                type="number"
                id="guests"
                value={numGuest}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border mt-2 rounded px-3 py-2 bg-gray-100 text-gray-900"
              />
            </div>
            <div className="max-w-[100%] w-[100%]">
              <DateRangePicker
                className="w-[100rem]"
                rangeColors={["#ec4899"]}
                ranges={dateRange}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                disabledDates={bookedDates}
                color={(date) =>
                  bookedDates.some(
                    (booking) =>
                      date >= booking.startDate && date <= booking.endDate
                  )
                  
                    ? "#020617"
                    : null
                }
              />
            </div>

            <div className="flex justify-center">
              {isLoading ? (
                <div class="flex gap-2">
                  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                  <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                </div>
              ) : (
                <button
                  className="bg-pink-600 text-white px-4 py-2 rounded mt-6 hover:bg-slate-950"
                  onClick={handleUpdate}
                >
                  Cập nhật
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default BookingModal;
