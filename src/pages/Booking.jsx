import React, { useContext, useState, useEffect } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import Footer from "../components/footer/Footer";
import { useParams } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { TiHeartFullOutline } from "react-icons/ti";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import BookingModal from "./booking/BookingModal";
import {
  calculatePricing,
  generateHolidayPrices,
} from "./booking/calculatePricing";
import { UserContext } from "../components/UserContext";
import Rules from "../components/rules/Rules";
import Amenities from "../components/Amenities/Amenities";
import { Alert } from "../components/Alert/Alert";

import "./booking/booking.css";

const Booking = () => {
  const [place, setPlace] = useState([]);
  const { id } = useParams();
  //   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const user = useContext(UserContext).user;
  const urlParams = new URLSearchParams(window.location.search);
  const checkIn = urlParams.get("checkin");
  const checkOut = urlParams.get("checkout");
  const numGuest = urlParams.get("numGuest");
  const [redirect, setRedirect] = useState("");
  const numberNight = differenceInCalendarDays(
    new Date(checkOut),
    new Date(checkIn)
  );
  // show UI
  const [isOpenPayFunction, setIsOpenPayFunction] = useState(false);
  const [isOpenCountryModal, setIsOpenCountryModal] = useState(false);
  const [isOpenHouseRuleModal, setIsOpenHouseRuleModal] = useState(false);
  const [isOpenPolicyModal, setIsOpenPolicyModal] = useState(false);
  const [isOpenChargeForDamageModal, setIsOpenChargeForDamageModal] =
    useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const currency = "USD";
  const method = "SALE";
  const intent = "PAYPAL";
  const description = `${user?.useName} Payment for booking ${place.propertyName}`;
  const [selectedPayment, setSelectedPayment] = useState("Paypal");

  const [isLoadingPlace, setIsLoadingPlace] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
    setIsOpenPayFunction(false);
  };
  const togglePopupCountry = () => {
    setIsOpenCountryModal(!isOpenCountryModal);
  };
  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const handleOpenEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };
  const handleOpenDialog1 = () => {
    setIsDialogOpen1(!isDialogOpen1);
  };
  const handleOpenDialog2 = () => {
    setIsDialogOpen2(!isDialogOpen2);
  };
  const togglePopupHouseRule = () => {
    setIsOpenHouseRuleModal(!isOpenHouseRuleModal);
  };

  const togglePopupPolicy = () => {
    setIsOpenPolicyModal(!isOpenPolicyModal);
  };

  const togglePopupChargeForDamage = () => {
    setIsOpenChargeForDamageModal(!isOpenChargeForDamageModal);
  };

  useEffect(() => {
    if (!id) return;
    setIsLoadingPlace(true);
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/property/${id}`)
      .then((response) => {
        if (response) {
          setPlace(response.data);
          setIsLoadingPlace(false);
          console.log(response.data); // Logging response data instead of place
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });

    !pricing ? setIsLoadingPrice(true) : setIsLoadingPrice(false);
  }, [id]);

  const pricing = place
    ? calculatePricing(checkIn, checkOut, place, numberNight)
    : {};

  const litsPrice = place
    ? generateHolidayPrices(checkIn, checkOut, numberNight)
    : {};
  async function bookThisPlace() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/stayeasy/booking/create",
        {
          checkIn,
          checkOut,
          numOfGuest: numGuest,
          numberNight,
          currency,
          method,
          intent,
          description,
          propertyId: id,
          userId: user.id,
          price: pricing.total,
          total: pricing.total,
        }
      );
      // Lấy dữ liệu từ response
      const { data } = response;
      if (!response) {
        Alert(
          3000,
          "Đặt phòng thành công",
          "Chúng tôi đang chuyển hướng đến trang thanh toán Paypal, vui lòng chờ trong dây lát",
          "success",
          "OK"
        );
      }
      // Kiểm tra xem có approvalUrl trong response không
      if (data && data.approvalUrl) {
        // Redirect đến approvalUrl
        window.location.href = data.approvalUrl;
      } else {
        // Xử lý trường hợp không có approvalUrl
        console.error("Không tìm thấy approvalUrl.");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      Alert(
        2000,
        "Không thể đặt phòng",
        "Không thể đặt phòng trong  khoảng thời gian này, hãy sửa ngày của bạn",
        "error",
        "OK"
      );
      console.error("Đã xảy ra lỗi:", error);
    }
  }

  return (
    <>
      <div className="flex justify-between">
        {/* Left content */}
        <div className="pl-64 pt-28 max-w-[53%]">
          <div className="flex flex-col">
            <div className="flex items-center">
              <a href={`/explore/detail/${id}`} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 320 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
                <h1 className="px-10 pl-6">Xác nhận và thanh toán</h1>
              </a>
            </div>
          </div>
          <div className="flex flex-col px-16 py-16">
            {/* box */}
            <div className="w-full px-10 py-6 rounded-3xl border border-black flex justify-between items-center">
              <div>
                <p className="font-bold">Địa điểm có rating cao.</p>
                <p>
                  Địa điểm của {place.owner?.lastName} thường được đặt trước.
                </p>
              </div>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ff385c"
                    d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"
                  />
                </svg>
              </div>
            </div>

            {/* Your Trip */}
            <div className="w-full my-10">
              <h2 className="text-4xl">Chuyến đi của bạn</h2>
              <div className="flex justify-between items-center mt-10">
                <p className="font-medium text-3xl">Ngày</p>
                <button
                  className="underline font-medium"
                  onClick={handleOpenEdit}
                >
                  Sửa
                </button>
              </div>
              <span>
                {" "}
                {format(new Date(checkIn), "MM-dd")} Đến{" "}
                {format(new Date(checkOut), "MM-dd")}{" "}
              </span>
              <div className="flex justify-between items-center mt-10">
                <p className="font-medium text-3xl">Số khách</p>
                <button
                  className="underline font-medium"
                  onClick={handleOpenEdit}
                >
                  Sửa
                </button>
              </div>
              <span>{numGuest} khách</span>
              {isOpenEdit && (
                <BookingModal
                  propertyId={id}
                  isOpen={true}
                  onClose={handleOpenEdit}
                />
              )}
              <hr className="my-5" />
            </div>

            {/* Pay with */}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl">Thanh toán với</h2>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="22.5"
                    viewBox="0 0 576 512"
                  >
                    <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4 .2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="22.5"
                    viewBox="0 0 576 512"
                  >
                    <path d="M520.4 196.1c0-7.9-5.5-12.1-15.6-12.1h-4.9v24.9h4.7c10.3 0 15.8-4.4 15.8-12.8zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-44.1 138.9c22.6 0 52.9-4.1 52.9 24.4 0 12.6-6.6 20.7-18.7 23.2l25.8 34.4h-19.6l-22.2-32.8h-2.2v32.8h-16zm-55.9 .1h45.3v14H444v18.2h28.3V217H444v22.2h29.3V253H428zm-68.7 0l21.9 55.2 22.2-55.2h17.5l-35.5 84.2h-8.6l-35-84.2zm-55.9-3c24.7 0 44.6 20 44.6 44.6 0 24.7-20 44.6-44.6 44.6-24.7 0-44.6-20-44.6-44.6 0-24.7 20-44.6 44.6-44.6zm-49.3 6.1v19c-20.1-20.1-46.8-4.7-46.8 19 0 25 27.5 38.5 46.8 19.2v19c-29.7 14.3-63.3-5.7-63.3-38.2 0-31.2 33.1-53 63.3-38zm-97.2 66.3c11.4 0 22.4-15.3-3.3-24.4-15-5.5-20.2-11.4-20.2-22.7 0-23.2 30.6-31.4 49.7-14.3l-8.4 10.8c-10.4-11.6-24.9-6.2-24.9 2.5 0 4.4 2.7 6.9 12.3 10.3 18.2 6.6 23.6 12.5 23.6 25.6 0 29.5-38.8 37.4-56.6 11.3l10.3-9.9c3.7 7.1 9.9 10.8 17.5 10.8zM55.4 253H32v-82h23.4c26.1 0 44.1 17 44.1 41.1 0 18.5-13.2 40.9-44.1 40.9zm67.5 0h-16v-82h16zM544 433c0 8.2-6.8 15-15 15H128c189.6-35.6 382.7-139.2 416-160zM74.1 191.6c-5.2-4.9-11.6-6.6-21.9-6.6H48v54.2h4.2c10.3 0 17-2 21.9-6.4 5.7-5.2 8.9-12.8 8.9-20.7s-3.2-15.5-8.9-20.5z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="22.5"
                    viewBox="0 0 576 512"
                  >
                    <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3 .5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5 .1-9.8-6.9-15.5-16.2-15.5z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="25"
                    viewBox="0 0 640 512"
                  >
                    <path d="M105.7 215v41.3h57.1a49.7 49.7 0 0 1 -21.1 32.6c-9.5 6.6-21.7 10.3-36 10.3-27.6 0-50.9-18.9-59.3-44.2a65.6 65.6 0 0 1 0-41l0 0c8.4-25.5 31.7-44.4 59.3-44.4a56.4 56.4 0 0 1 40.5 16.1L176.5 155a101.2 101.2 0 0 0 -70.8-27.8 105.6 105.6 0 0 0 -94.4 59.1 107.6 107.6 0 0 0 0 96.2v.2a105.4 105.4 0 0 0 94.4 59c28.5 0 52.6-9.5 70-25.9 20-18.6 31.4-46.2 31.4-78.9A133.8 133.8 0 0 0 205.4 215zm389.4-4c-10.1-9.4-23.9-14.1-41.4-14.1-22.5 0-39.3 8.3-50.5 24.9l20.9 13.3q11.5-17 31.3-17a34.1 34.1 0 0 1 22.8 8.8A28.1 28.1 0 0 1 487.8 248v5.5c-9.1-5.1-20.6-7.8-34.6-7.8-16.4 0-29.7 3.9-39.5 11.8s-14.8 18.3-14.8 31.6a39.7 39.7 0 0 0 13.9 31.3c9.3 8.3 21 12.5 34.8 12.5 16.3 0 29.2-7.3 39-21.9h1v17.7h22.6V250C510.3 233.5 505.3 220.3 495.1 211zM475.9 300.3a37.3 37.3 0 0 1 -26.6 11.2A28.6 28.6 0 0 1 431 305.2a19.4 19.4 0 0 1 -7.8-15.6c0-7 3.2-12.8 9.5-17.4s14.5-7 24.1-7C470 265 480.3 268 487.6 273.9 487.6 284.1 483.7 292.9 475.9 300.3zm-93.7-142A55.7 55.7 0 0 0 341.7 142H279.1V328.7H302.7V253.1h39c16 0 29.5-5.4 40.5-15.9 .9-.9 1.8-1.8 2.7-2.7A54.5 54.5 0 0 0 382.3 158.3zm-16.6 62.2a30.7 30.7 0 0 1 -23.3 9.7H302.7V165h39.6a32 32 0 0 1 22.6 9.2A33.2 33.2 0 0 1 365.7 220.5zM614.3 201 577.8 292.7h-.5L539.9 201H514.2L566 320.6l-29.4 64.3H561L640 201z" />
                  </svg>
                </div>
              </div>

              {/* Dropdown */}
              <div className="flex justify-between items-center mt-10">
                <div className="relative flex flex-col items-center w-full h-fit rounded-xl ">
                  <button
                    onClick={() => setIsOpenPayFunction((prev) => !prev)}
                    className="p-3 w-full flex items-center justify-between text-2xl text-gray-600 rounded-lg tracking-wider border border-black active:border-black duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        width="35"
                        height="35"
                      >
                        <rect width="256" height="256" fill="none" />
                        <rect
                          x="24"
                          y="56"
                          width="208"
                          height="144"
                          rx="8"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="8"
                        />
                        <line
                          x1="168"
                          y1="168"
                          x2="200"
                          y2="168"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="8"
                        />
                        <line
                          x1="120"
                          y1="168"
                          x2="136"
                          y2="168"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="8"
                        />
                        <line
                          x1="24"
                          y1="96.9"
                          x2="232"
                          y2="96.9"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="8"
                        />
                      </svg>
                      {selectedPayment}
                    </div>
                    {!isOpenPayFunction ? (
                      <AiOutlineCaretDown className="h-11"></AiOutlineCaretDown>
                    ) : (
                      <AiOutlineCaretUp className="h-11"></AiOutlineCaretUp>
                    )}
                  </button>

                  {isOpenPayFunction && (
                    <div className="bg-white absolute top-20 flex flex-col items-start rounded-lg mt-[15px] w-full border border-black">
                      <div className="flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent">
                        <button
                          className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                          onClick={() =>
                            handlePaymentSelect("Credit or debit card")
                          }
                        >
                          <div className="text-2xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 256"
                              width="35"
                              height="35"
                            >
                              <rect width="256" height="256" fill="none" />
                              <rect
                                x="24"
                                y="56"
                                width="208"
                                height="144"
                                rx="8"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="8"
                              />
                              <line
                                x1="168"
                                y1="168"
                                x2="200"
                                y2="168"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="8"
                              />
                              <line
                                x1="120"
                                y1="168"
                                x2="136"
                                y2="168"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="8"
                              />
                              <line
                                x1="24"
                                y1="96.9"
                                x2="232"
                                y2="96.9"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="8"
                              />
                            </svg>
                          </div>
                          Credit or debit card
                        </button>
                      </div>
                      <div className="flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent">
                        <button
                          className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                          onClick={() => handlePaymentSelect("PayPal")}
                        >
                          <div className="text-2xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 576 512"
                            >
                              <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3 .5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5 .1-9.8-6.9-15.5-16.2-15.5z" />
                            </svg>
                          </div>
                          Pay Pal
                        </button>
                      </div>
                      <div className="flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent">
                        <button
                          className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                          onClick={() => handlePaymentSelect("Google Pay")}
                        >
                          <div className="text-2xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="35"
                              viewBox="0 0 640 512"
                            >
                              <path d="M105.7 215v41.3h57.1a49.7 49.7 0 0 1 -21.1 32.6c-9.5 6.6-21.7 10.3-36 10.3-27.6 0-50.9-18.9-59.3-44.2a65.6 65.6 0 0 1 0-41l0 0c8.4-25.5 31.7-44.4 59.3-44.4a56.4 56.4 0 0 1 40.5 16.1L176.5 155a101.2 101.2 0 0 0 -70.8-27.8 105.6 105.6 0 0 0 -94.4 59.1 107.6 107.6 0 0 0 0 96.2v.2a105.4 105.4 0 0 0 94.4 59c28.5 0 52.6-9.5 70-25.9 20-18.6 31.4-46.2 31.4-78.9A133.8 133.8 0 0 0 205.4 215zm389.4-4c-10.1-9.4-23.9-14.1-41.4-14.1-22.5 0-39.3 8.3-50.5 24.9l20.9 13.3q11.5-17 31.3-17a34.1 34.1 0 0 1 22.8 8.8A28.1 28.1 0 0 1 487.8 248v5.5c-9.1-5.1-20.6-7.8-34.6-7.8-16.4 0-29.7 3.9-39.5 11.8s-14.8 18.3-14.8 31.6a39.7 39.7 0 0 0 13.9 31.3c9.3 8.3 21 12.5 34.8 12.5 16.3 0 29.2-7.3 39-21.9h1v17.7h22.6V250C510.3 233.5 505.3 220.3 495.1 211zM475.9 300.3a37.3 37.3 0 0 1 -26.6 11.2A28.6 28.6 0 0 1 431 305.2a19.4 19.4 0 0 1 -7.8-15.6c0-7 3.2-12.8 9.5-17.4s14.5-7 24.1-7C470 265 480.3 268 487.6 273.9 487.6 284.1 483.7 292.9 475.9 300.3zm-93.7-142A55.7 55.7 0 0 0 341.7 142H279.1V328.7H302.7V253.1h39c16 0 29.5-5.4 40.5-15.9 .9-.9 1.8-1.8 2.7-2.7A54.5 54.5 0 0 0 382.3 158.3zm-16.6 62.2a30.7 30.7 0 0 1 -23.3 9.7H302.7V165h39.6a32 32 0 0 1 22.6 9.2A33.2 33.2 0 0 1 365.7 220.5zM614.3 201 577.8 292.7h-.5L539.9 201H514.2L566 320.6l-29.4 64.3H561L640 201z" />
                            </svg>
                          </div>
                          Google Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {selectedPayment === "Credit or debit card" && (
                <div className="mt-4">
                  <input
                    className="w-full p-4 border border-black text-2xl rounded-t-lg placeholder-gray-600"
                    placeholder="Card number"
                  />
                  <div className="flex items-center">
                    <input
                      className="w-full p-4 border border-black text-2xl rounded-bl-lg placeholder-gray-600"
                      placeholder="Expiration"
                    />
                    <input
                      className="w-full p-4 border border-black text-2xl rounded-br-lg placeholder-gray-600"
                      placeholder="CVV"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      className="w-full p-4 border border-black text-2xl rounded-lg placeholder-gray-600"
                      placeholder="Zip code"
                    />
                  </div>
                  <button
                    className="w-full p-3 mt-4 border border-black rounded-lg flex justify-between items-center"
                    onClick={togglePopupCountry}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-thin text-2xl">Country/region</span>
                      <span className="text-2xl">Vietnam</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </button>
                  <hr className="my-5" />
                </div>
              )}

              {selectedPayment && selectedPayment == "Paypal" && (
                <div className="mt-4">
                  <span>Selected payment method: {selectedPayment}</span>
                </div>
              )}
            </div>

            {/* Required for your trip */}
            <div className="w-full">
              <h2 className="text-4xl">Cần thiết cho chuyến đi</h2>
              <div className="flex justify-between items-center">
                <div className="flex flex-col mt-5">
                  <h4>Số điện thoại</h4>
                  <p>
                    Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập
                    nhật về chuyến đi.
                  </p>
                </div>
                <button className="w-24 h-14 border border-black rounded-xl font-medium">
                  Add
                </button>
              </div>
              <hr className="my-5" />
            </div>
            {/* Cancellation policy */}
            <div className="w-full">
              <h2 className="text-4xl">Chính sách hủy</h2>
              <div className="flex flex-col mt-5">
                <p>
                  <span className="font-bold">
                    Hủy miễn phí trước ngày{" "}
                    {format(new Date(checkIn), "dd") - 2} tháng{" "}
                    {format(new Date(checkIn), "MM")} .{" "}
                  </span>
                  Hủy trước khi nhận phòng vào ngày{" "}
                  {format(new Date(checkIn), "dd")} tháng{" "}
                  {format(new Date(checkIn), "MM")} để được hoàn lại một phần.
                  <span className="font-medium underline ml-1">
                    Tìm hiểu thêm
                  </span>
                </p>
              </div>
              <hr className="my-5" />
            </div>

            {/* Ground rules */}
            <div className="w-full">
              <h2 className="text-4xl">Quy tắc thuê</h2>
              <div className="flex flex-col mt-5">
                <p>
                  Chúng tôi mong mỗi vị khách hãy ghi nhớ một số điều đơn giản
                  để tạo nên một vị khách tuyệt vời.
                </p>
                <Rules rulesList={place.rulesList}></Rules>
              </div>
              <div className="flex flex-col mt-5">
                <Amenities utilitiesList={place.propertyUtilitis}></Amenities>
              </div>
            </div>

            {/* policy */}
            <div className="w-full">
              <div className="text-lg">
                <p>
                  Bằng cách chọn nút bên dưới, tôi đồng ý với
                  <button
                    onClick={togglePopupHouseRule}
                    className="font-medium underline ml-1"
                  >
                    Quy tắc thuê
                  </button>
                  ,
                  <button className="font-medium underline ml-1">
                    Nội quy khách thuê
                  </button>
                  ,
                  <button
                    onClick={togglePopupPolicy}
                    className="font-medium underline ml-1"
                  >
                    Chính sách dịch vụ và hủy của Airbnb
                  </button>
                  , và Airbnb có thể
                  <button
                    onClick={togglePopupChargeForDamage}
                    className="font-medium underline ml-1 mr-1"
                  >
                    tính phí vào phương thức thanh toán
                  </button>
                  của tôi nếu tôi gây thiệt hại.
                </p>
              </div>
            </div>

            {/* button confirm */}
            <div className="max-w-[40%] my-5">
              <button
                onClick={() => bookThisPlace()}
                type="submit"
                className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white text-3xl font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                {" "}
                Xác nhận đặt
                {numberNight > 0 && <span> ${pricing.total}</span>}
              </button>
            </div>

            {/* modal start */}
            {isOpenCountryModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                <div
                  className="absolute inset-0 bg-gray-900 opacity-50"
                  onClick={togglePopupCountry}
                ></div>

                {/* header area start */}
                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
                  <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                    <button
                      className="absolute -mr-2 text-gray-500 hover:text-gray-700"
                      onClick={togglePopupCountry}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="18"
                        height="18"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </button>
                    <h2 className="text-3xl justify-center text-center font-semibold">
                      Country/region
                    </h2>
                  </div>

                  <hr />

                  {/* body area start */}
                  <div className="px-10 py-4 overflow-auto max-h-[88%] z-50"></div>
                </div>
              </div>
            )}

            {/* modal House rules */}
            {isOpenHouseRuleModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                <div
                  className="absolute inset-0 bg-gray-900 opacity-50"
                  onClick={togglePopupHouseRule}
                ></div>
                {/* header area start */}
                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
                  <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                    <button
                      className="absolute -mr-2 text-gray-500 hover:text-gray-700"
                      onClick={togglePopupHouseRule}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="18"
                        height="18"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </button>
                  </div>
                  {/* body area start */}
                  <div className="px-10 py-4 overflow-auto max-h-[88%] z-50 mt-16">
                    <h2 className="text-5xl font-semibold">House rules</h2>
                    <p className="text-3xl my-5">
                      You’ll be staying in someone’s home, so please treat it
                      with care and respect.
                    </p>
                    <h4 className="text-3xl my-5">Checking in and out</h4>

                    <div className="flex justify-start items-center mt-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="26"
                        width="26"
                        viewBox="0 0 512 512"
                      >
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                      </svg>
                      <p className="text-3xl mt-3 ml-7">
                        Check-in after 2:00 PM
                      </p>
                    </div>
                    <hr />
                    <div className="flex justify-start items-center mt-4 mb-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="26"
                        width="26"
                        viewBox="0 0 512 512"
                      >
                        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                      </svg>
                      <p className="text-3xl mt-3 ml-7">
                        Checkout before 12:00 PM
                      </p>
                    </div>

                    <h4 className="text-3xl my-8">During your stay</h4>
                    <div className="flex items-center mt-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="25"
                        viewBox="0 0 640 512"
                      >
                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                      </svg>
                      <p className="text-3xl mt-3 ml-7">
                        Tối đa {place.numGuests} khách
                      </p>
                    </div>
                    <hr />
                    <div className="flex items-center mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="25"
                        viewBox="0 0 640 512"
                      >
                        <path d="M448 32V43c0 38.2 15.2 74.8 42.2 101.8l21 21c21 21 32.8 49.5 32.8 79.2v11c0 17.7-14.3 32-32 32s-32-14.3-32-32V245c0-12.7-5.1-24.9-14.1-33.9l-21-21C405.9 151.1 384 98.1 384 43V32c0-17.7 14.3-32 32-32s32 14.3 32 32zM576 256V245c0-38.2-15.2-74.8-42.2-101.8l-21-21c-21-21-32.8-49.5-32.8-79.2V32c0-17.7 14.3-32 32-32s32 14.3 32 32V43c0 12.7 5.1 24.9 14.1 33.9l21 21c39 39 60.9 91.9 60.9 147.1v11c0 17.7-14.3 32-32 32s-32-14.3-32-32zM0 416c0-35.3 28.7-64 64-64H416c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H64c-35.3 0-64-28.7-64-64V416zm224 0v32H384V416H224zm288-64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32zm96 0c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32z" />
                      </svg>
                      <p className="text-3xl mt-3 ml-7">Smoking is allowed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* modal Rebooking and Refund Policy */}
            {isOpenPolicyModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                <div
                  className="absolute inset-0 bg-gray-900 opacity-50"
                  onClick={togglePopupPolicy}
                ></div>

                {/* header area start */}
                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[53%]">
                  <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                    <button
                      className="absolute -mr-2 text-gray-500 hover:text-gray-700"
                      onClick={togglePopupPolicy}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="18"
                        height="18"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </button>
                    <h2 className="text-2xl justify-center text-center font-semibold">
                      Rebooking and Refund Policy
                    </h2>
                  </div>

                  <hr />

                  {/* body area start */}
                  <div className="px-10 py-4 overflow-auto max-h-[88%] z-50 text-2xl">
                    <p>
                      If a Host cancels your reservation prior to check-in, you
                      will automatically receive a full refund. If a Host
                      cancels 30 days or less prior to check-in, and you contact
                      us, we will also assist you with finding comparable or
                      better accommodations.{" "}
                    </p>
                    <p>
                      Other Travel Issues must be reported to us no later than
                      72 hours after discovery. If we determine that a Travel
                      Issue has disrupted the stay, we will provide a full or
                      partial refund and, depending on the circumstances, may
                      assist the guest with finding comparable or better
                      accommodations. The amount of any refund will depend on
                      the severity of the Travel Issue, the impact on you, the
                      portion of the stay affected, and whether you remain at
                      the accommodations.
                    </p>
                    <a href="#" className="font-medium">
                      <p className="underline">Read the full terms</p>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* modal Getting charged for damage */}
            {isOpenChargeForDamageModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                <div
                  className="absolute inset-0 bg-gray-900 opacity-50"
                  onClick={togglePopupChargeForDamage}
                ></div>

                {/* header area start */}
                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[65%]">
                  <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                    <button
                      className="absolute -mr-2 text-gray-500 hover:text-gray-700"
                      onClick={togglePopupChargeForDamage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="18"
                        height="18"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </button>
                    <h2 className="text-3xl justify-center text-center font-semibold">
                      Getting charged for damage
                    </h2>
                  </div>

                  <hr />

                  {/* body area start */}
                  <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">
                    <p>
                      Accidents are rare, but they happen. If you, someone you
                      invite, or a pet are responsible for damage during a stay,
                      your payment method may be charged.
                    </p>

                    <h3>What can I be charged for?</h3>
                    <p>
                      You could be charged for damage, any of your Host’s stuff
                      that goes missing, or unexpected cleaning costs due to
                      your stay.
                    </p>

                    <h3>What’s the process?</h3>
                    <p>
                      If you and your Host can’t work it out first, we’ll step
                      in to determine responsibility. We’ll only charge your
                      payment method if we have reason to believe you’re
                      responsible.
                    </p>

                    <h3>What if I don’t agree?</h3>
                    <p>
                      You’ll have a chance to appeal if you think we made a
                      mistake.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right content */}
        <div>
          <div className="fixed top-[15rem] left-[85rem] w-[32%] p-5 rounded-3xl border border-black">
            {/* Neu dang tinh toan thi tra ve animation */}
            {isLoadingPlace || isLoadingPrice ? (
              <div className="flex justify-center p-[15rem]">
                <div class="dots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <>
                {/* top content */}
                <div className="flex items-center justify-between mb-5">
                  <img
                    className="rounded-xl mr-5"
                    width="150"
                    height="150"
                    src={place.thumbnail}
                  />
                  <div class="mb-4">
                    <h4 class="text- font-semibold">{place.propertyName}</h4>
                    <p class="text-gray-600">{place.address}</p>
                    <div class="flex items-center mt-2">
                      <GoStarFill />
                      <span class="text-black-900 mr-1">{place.rating}</span>
                      <span class="text-gray-900 ml-1">
                        ({place.feedbackList ?? 106} reviews)
                      </span>
                      <TiHeartFullOutline />
                      <span class="ml-2 text-gray-900">Superhost</span>
                    </div>
                  </div>
                </div>

                {/* center content */}
                <div className="mt-5">
                  <h2 className="text-4xl">Chi tiết giá</h2>
                  <div className="flex justify-between items-center">
                    <a
                      className="underline underline-offset-4 text-black "
                      onClick={handleOpenDialog2}
                    >
                      ${place.price} x {numberNight} đêm
                    </a>
                    {isDialogOpen2 && (
                      <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-25 z50">
                        <div className="bg-white   p-8 rounded-lg drop-shadow-xl">
                          <button
                            onClick={handleOpenDialog2}
                            className="mt-4 px-4 py-2 text-black hover:bg-zinc-100 hover:rounded-full rounded-md"
                          >
                            X
                          </button>
                          <h3 className="text-4xl">Chi tiết giá cơ sở</h3>
                          {litsPrice.map((item, index) => (
                            <div class="flex justify-between items-center mt-10">
                              <p class=" text-3xl">Ngày {item.date}</p>
                              <div class="px-16"></div>
                              <p class="  text-3xl text-pink">
                                {item.price} ${" "}
                              </p>
                            </div>
                          ))}
                          <div class="flex justify-between items-center mt-10">
                            <h3 className="text-4xl">Tổng giá cơ sở</h3>
                            <div class="px-16"></div>
                            <h3 className="text-4xl">${pricing.price}</h3>
                          </div>
                        </div>
                      </div>
                    )}

                    <p>${pricing.price ? `${pricing.price}` : ""}</p>
                  </div>
                  {/* Khuyen mai */}
                  <div className="flex justify-between items-center">
                    <a
                      className="underline underline-offset-4 text-black "
                      onClick={handleOpenDialog}
                    >
                      Khuyến mãi
                    </a>
                    {isDialogOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-25 z50">
                        <div className="bg-white p-8 rounded-lg drop-shadow-xl">
                          <button
                            onClick={handleOpenDialog}
                            className="mt-4 px-4 py-2 text-black hover:bg-zinc-100 hover:rounded-full rounded-md"
                          >
                            X
                          </button>
                          <p className="text-xl">{`Khoản phí một lần do chủ nhà tính`}</p>
                          <p className="text-xl">{`để trang trải chi phí vệ sinh chỗ của họ.`}</p>
                        </div>
                      </div>
                    )}
                    <p className="text-pink-600">
                      {" "}
                      - ${pricing.discount ? `${pricing.discount}` : ""}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <a className="underline underline-offset-4 text-black ">
                      Phí dọn dẹp
                    </a>
                    <p>${pricing.cleanFee ? `${pricing.cleanFee}` : ""}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      className="underline underline-offset-4 text-black "
                      onClick={handleOpenDialog1}
                    >
                      Phí dịch vụ Airbnb
                    </a>
                    {isDialogOpen1 && (
                      <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-25 z10">
                        <div className="bg-white p-8 rounded-lg drop-shadow-xl">
                          <button
                            onClick={handleOpenDialog1}
                            className="mt-4 px-4 py-2 text-black hover:bg-zinc-100 hover:rounded-full rounded-md"
                          >
                            X
                          </button>
                          <p className="text-xl">{`Điều này giúp chúng tôi vận hành nền tảng của mình và .`}</p>
                          <p className="text-xl">
                            cung cấp các dịch vụ như hỗ trợ 24/7 trong chuyến đi
                            của bạn
                          </p>
                          <p className="text-xl">
                            {" "}
                            Số tiền này đã bao gồm thuế GTGT.
                          </p>
                        </div>
                      </div>
                    )}
                    <p>
                      $
                      {pricing.serviceFeePercentage
                        ? `${pricing.serviceFeePercentage}`
                        : ""}
                    </p>
                  </div>
                </div>
                <hr />
                {/* bot content */}
                <div className="mt-5">
                  <div className="flex justify-between items-center font-bold">
                    <p>
                      Tổng <span className="underline">(USD)</span>
                    </p>
                    <p>${pricing.total}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      :<Footer></Footer>
    </>
  );
};
export default Booking;
