
import { FaCheckCircle } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import React, { useState, useEffect } from 'react';


const PaymentSuccsess = () => {
  const [bill, setBill] = useState([]);
  useEffect(() => {
    // Get paymentId and PayerID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const PayerID = urlParams.get('PayerID');

    // Check if paymentId exists
    if (!paymentId || !PayerID) {
        console.error('paymentId or PayerID is missing');
        return;
    }
    // Fetch data from backend API
    axios.get(`http://localhost:8080/api/v1/stayeasy/booking/paypal/success?paymentId=${paymentId}&PayerID=${PayerID}`)
        .then(response => {
            if (response) {
                setBill(response.data);
            } else {
                console.error('Response data is empty or undefined');
            }
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}, []); // Empty dependency array to ensure useEffect runs only once on component mount
     // Assuming jsonData is your JSON array
     if (bill.length === 0) {
      return (
        <div className=
          "flex justify-center items-center h-screen w-screen bg-gray-100 opacity-100" >
          <div className="flex flex-col items-center">
            <img src="https://cdn.dribbble.com/users/2356828/screenshots/15188850/media/f8152a69b40f21eec559e6e0d05a46f1.gif" alt="Loading" className="w-40% h-40%" />
            <p className="text-lg font-medium text-gray-700 mt-4">Quá trình thanh toán sắp hoàn tất...</p>
          </div>
        </div>
      );
    }
    const name = bill[0].bookingDTO.propertyDTOS.propertyName;
    const mail = bill[0].bookingDTO.userDTOS.email;
    const address = bill[0].bookingDTO.propertyDTOS.address;
    const numGuest = bill[0].bookingDTO.numOfGuest;
    const checkIn = bill[0].bookingDTO.checkIn;
    const checkOut = bill[0].bookingDTO.checkOut;
    const price = bill[0].amount;
    const createTime = bill[0].createTime;
    const confirm = bill[0].confirmation;
 
    return (
      <div className="bg-white py-24 sm:py-32 md:container md:mx-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Thanh toán thành công</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">
             cho chuyến đi của bạn tới {name}
            </p>
            <FaCheckCircle
              class="items-center mx-auto"
              size="72" color="green"
            />
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Chúng tôi sẽ sớm gửi thêm thông tin chuyến đi cho bạn qua email. Hãy kiểm tra email của bạn.
              {mail}
            </p>
          </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Thông tin giao dịch</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Bạn đã thực hiện thanh toán thành công cho chuyến đi của mình, hóa đơn thanh toán đã được xác nhận. 
              Mọi thông tin sẽ được chúng tôi bảo mật.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Hóa đơn thanh toán</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
            
                <li className="flex gap-x-3">
                  <FaCheck className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Checkin {checkIn}
                </li>
                <li className="flex gap-x-3">
                  <FaCheck className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Checkout {checkOut}
                </li>
                <li className="flex gap-x-3">
                  <FaCheck className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Number Guests {numGuest}
                </li>
                <li className="flex gap-x-3">
                  <FaCheck className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Address {address}
                </li>
           
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Số tiền thanh toán </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900"> {confirm === "FENDING" ? "Đang chờ xác nhận từ chủ nhà" : confirm === "CONFIRM" ? "Chủ nhà đã xác nhận" : ""}</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-900"> {price} USD</span>
                </p>
                <a
                  href="/"
                  className="bg-slate-950 mt-10 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-950"
                >
                  Go Home
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                 Ngày tạo {createTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
};
export default PaymentSuccsess;