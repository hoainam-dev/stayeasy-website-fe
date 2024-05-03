import { FaCheck } from "react-icons/fa6";
import { TbMailCancel } from "react-icons/tb";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import axios from "axios";
import React, { useState, useEffect } from 'react';
const includedFeatures = [
  'Bạn muốn thay đổi chuyến đi',
  'Bạn muốn thay đổi thời gian',
  'Bạn muốn thay đổi địa điểm khác',
  'Bạn chọn phương thức thanh toán khác',
]

 function CancelPayment() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkState, setCheckState] = useState({});

  const handleToggle = (feature) => {
    setCheckState((prevState) => ({
      ...prevState,
      [feature]: !prevState[feature],
    }));
  };
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`http://localhost:8080/api/v1/stayeasy/booking/paypal/cancel`)
                .then(response => {
                    if (response.status === 200) {
                        setData(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
                .finally(() => {
                    setIsLoaded(true);
                });
        }
    }, [isLoaded]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">Thanh toán không thành công</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Bạn đã hủy thanh toán cho chuyến đi của mình, hãy thực hiện lại để có kỳ nghỉ tuyệt với nhất
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-prose rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl text-xl font-bold tracking-tight text-gray-900">Thông tin giao dịch</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Chúng tôi đã gửi đến email của bạn thông tin cho chuyến đi của bạn, hãy kiểm tra email và hoàn tất thanh toán
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Lí do hủy thanh toán</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
      {includedFeatures.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          {checkState[feature] ? (
            <FaCheck
              className="h-6 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
          ) : (
            <button
              onClick={() => handleToggle(feature)}
              className="h-6 w-5 flex-none text-indigo-600 bg-transparent border-none"
              aria-hidden="true"
            >
              <MdOutlineRadioButtonUnchecked />
            </button>
          )}
          {feature}
        </li>
      ))}
    </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Thanh toán lại</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$XXX</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Go Home
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CancelPayment;