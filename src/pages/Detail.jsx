
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  useParams,
  useLocation,
  Link,
  json,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../components/UserContext";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import React from "react";
import axios from "axios";
// import DatePicker from "react-datepicker";
import Slider from "react-slick";
import NumGuest from "../components/numguest/NumGuest";
import { dataDetailSlice } from "../redux-tookit/reducer/dataDetailSlice";
import { dataDetailSelector } from "../redux-tookit/selector";
import Popup from "../components/popup/PopUp";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { grouptSlice } from "../redux-tookit/reducer/grouptSlice";
import CommentForm from "../components/comment/CommentForm";
import { differenceInCalendarDays, format } from "date-fns";
import Rules from "../components/rules/Rules";
import { LicenseInfo } from "@mui/x-license-pro";
import UtilitiesDetail from "../components/utilies/UtilitiesDetail";
LicenseInfo.setLicenseKey(
  "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
);

function Detail() {
  const user = useContext(UserContext).user;
  const isAuthenticated = useContext(UserContext).isAuthenticated;
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataDetail } = useSelector(dataDetailSelector);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  var currentURL = window.location.href;
  var url = new URL(currentURL);
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const today = new Date();
  let timeStamp = today.getTime() + 86400000;
  const [message, setMessage] = useState("");
  const [totalGuests, setTotalGuests] = useState(1);
  const [checkin, setCheckin] = useState(
    urlParams.get("checkin") ? new Date(urlParams.get("checkin")) : today
  );
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(2, "day"));
  const [value, setValue] = useState([checkInDate, checkOutDate]);
  const idUser = user ? user.id : null;
  const [checkout, setCheckout] = useState(
    urlParams.get("checkout")
      ? new Date(urlParams.get("checkout"))
      : new Date(timeStamp)
  );
  console.log(urlParams.get("adults"));
  const [adults, setAdults] = useState(
    parseInt(urlParams.get("adults")) || parseInt(urlParams.get("adults")) == 0
      ? parseInt(urlParams.get("adults"))
      : 1
  );
  const [children, setChildren] = useState(
    parseInt(urlParams.get("children")) ||
      parseInt(urlParams.get("adults")) == 0
      ? parseInt(urlParams.get("children"))
      : 0
  );
  const [infants, setInfants] = useState(
    parseInt(urlParams.get("infants")) || parseInt(urlParams.get("adults")) == 0
      ? parseInt(urlParams.get("infants"))
      : 0
  );
  const [pet, setPet] = useState(
    parseInt(urlParams.get("pet")) || parseInt(urlParams.get("adults")) == 0
      ? parseInt(urlParams.get("pet"))
      : 0
  );
  const [totalDays, setTotalDays] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(
    dataDetail.imagesList ? [0] : null
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [place, setPlace] = useState([]);
  const toggleShowCheckout = () => setShowCheckout(!showCheckout);
  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/booking/listing/${id}`)
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
  }, [id]);
  const fetchData = async () => {
    try {
      dispatch(dataDetailSlice.actions.getDataDetailRequest());
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property/${id}`
      );
      dispatch(dataDetailSlice.actions.getDataDetailSuccess(response.data));
      setDataLoaded(true); // Đặt trạng thái tải dữ liệu thành true khi dữ liệu đã được tải hoàn toàn
    } catch (error) {
      dispatch(dataDetailSlice.actions.getDataDetailFailure());
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    url.searchParams.set("adults", adults);
    url.searchParams.set("children", children);
    url.searchParams.set("infants", infants);
    url.searchParams.set("pet", pet);
    window.history.replaceState({}, "", url);
  }, [adults, children, infants, pet]);

  useEffect(() => {
    // Tính số ngày giữa checkin và checkout
    const newTotalDays = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );

    // Cập nhật totalDaysState
    setTotalDays(newTotalDays);
  }, [checkin, checkout]);

  useEffect(() => {
    setTotalGuests(adults + children);
  }, [adults, children]);

  useEffect(() => {
    setCheckout(checkin);
  }, [checkin]);

  const onChangeCheckin = (date) => {
    setCheckin(date);
    url.searchParams.set("checkin", date);
    window.history.replaceState({}, "", url);
  };

  const onChangeCheckout = (date) => {
    setCheckout(date);
    url.searchParams.set("checkout", date);
    window.history.replaceState({}, "", url);
  };
  const shouldDisableDate = (date) => {
    return disabledDates.some((disabledDate) =>
      dayjs(disabledDate).isSame(date, "day")
    );
  };
  const changePicker = (newvalue) => {
    if (dayjs(newvalue[0]).isValid() && dayjs(newvalue[1]).isValid()) {
      setValue(newvalue); // Cập nhật mảng giá trị mới
      setCheckInDate(dayjs(newvalue[0]).format("YYYY-MM-DD")); // Cập nhật ngày check-in
      onChangeCheckin(dayjs(newvalue[0]).format("YYYY-MM-DD"));
      setCheckOutDate(dayjs(newvalue[1]).format("YYYY-MM-DD"));
      onChangeCheckout(dayjs(newvalue[1]).format("YYYY-MM-DD"));
      console.log("Check-in:", dayjs(newvalue[0]).format("YYYY-MM-DD"));
      console.log("Check-out:", dayjs(newvalue[1]).format("YYYY-MM-DD"));
    }
  };

  const disabledDates = place
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

  const onChangeDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickImage = (image) => {
    setCurrentImage(image);
    if (image) {
      url.searchParams.set("popup", true);
      url.searchParams.set("image", image.imageId);
      window.history.replaceState({}, "", url);
    }
    setOpenPopup(true);
  };

  const styleImg = {
    width: "100%",
    height: "600px",
    objectFit: "contain",
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginRight: "-40px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginLeft: "-40px",
        }}
        onClick={onClick}
      />
    );
  }

  if (openPopup === false) {
    url.searchParams.delete("popup");
    url.searchParams.delete("image");
    window.history.replaceState({}, "", url);
  }

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }
  function handleSubmit() {
    console.log("isAuthenticated: " + isAuthenticated);
    const checkIn = dayjs(checkInDate).format("YYYY-MM-DD");
    const checkOut = dayjs(checkOutDate).format("YYYY-MM-DD");

    if (isAuthenticated) {
      // Sử dụng backticks cho template literals
      navigate(
        `/booking/${id}?checkin=${checkIn}&checkout=${checkOut}&numGuest=${totalGuests}`
      );
    } else {
      // Chưa xác thực, chuyển hướng đến trang đăng nhập và lưu trạng thái hiện tại
      navigate("/login", {
        replace: true,
        state: {
          from: {
            pathname: `/booking/${id}?checkin=${checkIn}&checkout=${checkOut}&numGuest=${totalGuests}`,
            search: ``,
          },
        },
      });
    }
  }

  function sendMessageHost() {
    if (message.trim() && user) {
      const idHost = dataDetail.owner.id;
      const data = {
        userId: user.id,
        hostId: idHost,
        content: message,
      };
      fetch("http://localhost:8080/api/v1/stayeasy/chatroom/first-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            setShow(true);
            navigate("/inbox");
          }
          return response.json();
        })
        .then((data) => {})
        .catch((error) => {});
    } else {
      dispatch(grouptSlice.actions.openLoginForm());
    }
  }

  return (
    <>
      <Header page={"explore"}></Header>
      <Popup
        currentImageInit={currentImage}
        imagesList={dataDetail.imagesList}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
      <div className="w-full box-border pl-20 pr-20">
        <div
          className="w-full h-[500px] flex justify-center mb-4 slider_detail"
          key={id}
        >
          {dataDetail.imagesList?.length > 1 ? (
            <Slider {...settings} className="w-[80%]">
              {dataDetail.imagesList?.map((item, index) => (
                <div key={index} className=" h-[450px]">
                  <img
                    style={styleImg}
                    src={item.url}
                    testindex={index}
                    alt=""
                    onClick={() => onClickImage(item)}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img src={dataDetail.imagesList?.[0].url} alt="" />
          )}
        </div>
        <div className="w-full flex justify-between ml-24 mr-24 box-border">
          {/* left */}
          <div className="w-[55%] pl-6 box-border">
            {/* info */}
            <div className="pt-6 pb-6 border-b-2 border-black/30 box-border">
              <div className="text-4xl font-medium">
                <p>{dataDetail.propertyName}</p>
              </div>
              <div className="text-3xl font-medium mt-2">
                <p>{dataDetail.address}</p>
              </div>
              <div className="flex mt-2 text-[17px] font-normal gap-2 ssm:w-[20rem] sm:w-[30rem] md:w-[36rem] lg:w-[38rem] 2lg:w-[38rem]">
                <p>{dataDetail.numGuests} khách</p>
                <span>-</span>
                <p>{dataDetail.numBedRoom} phòng ngủ</p>
                <span>-</span>
                <p>{dataDetail.numBathRoom} phòng tắm</p>
              </div>
              <div className="w-[50%] rating text-lg font-semibold flex pt-4">
                <div className="flex">
                  <p className="text-4xl">{dataDetail.rating}</p>
                  <FontAwesomeIcon
                    className=" text-yellow-300 stroke-black ml-[2px]"
                    size="2x"
                    icon={icon({
                      name: "star",
                      family: "classic",
                      style: "solid",
                    })}
                  />
                </div>
              </div>
            </div>

            {/* info-host */}
            <div className="w-full pt-6 pb-2 flex justify-items-center border-b-2 border-black/30 box-border">
              <div className="w-[6rem] h-[6rem] rounded-[50%] overflow-hidden">
                <img src={dataDetail.owner?.avatar ||
                `https://bootdey.com/img/Content/avatar/avatar7.png`
              } alt="" />
              </div>
              <div className="p-3">
                <div className="text-base font-semibold">
                  <p className="text-[17px]">
                    Hosted by {dataDetail.owner?.lastName}{" "}
                    {dataDetail.owner?.firstName}
                  </p>
                </div>
                <div className="text-base">
                  <p className="text-[17px]">
                    Chủ nhà siêu cấp 4 năm kinh nghiệm đón tiếp khách
                  </p>
                </div>
              </div>
            </div>

            {/* info-rules */}
            <Rules rulesList={dataDetail.rulesList}></Rules>

            <UtilitiesDetail utilities={dataDetail.propertyUtilitis}></UtilitiesDetail>

            {/* info-detail */}
            <div className="w-full pt-6 pb-6 border-b-2 border-black/30 box-border">
              <div>
                <p className="text-[17px] pl-4">{dataDetail.description}</p>
              </div>
            </div>
          </div>
          {/* end-left */}

          {/* right */}
          <div className="w-[50%] lg:w-[40%]">
            <div
              className={` ${
                showCheckout
                  ? "btnActive transition duration-500"
                  : "transition duration-500"
              } lg:hidden fixed  top-60 right-10 cursor-pointer bg-white`}
              onClick={toggleShowCheckout}
            >
              X
            </div>
            <div
              className={` ${
                showCheckout
                  ? "checkActive transition duration-500"
                  : "transition duration-500"
              } fixed lg:relative top-60 -right-[350px] lg:top-0 lg:right-0 lg:block w-[300px] lg:w-[75%] max-w-[350px] h-[450px] rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] bg-white`}
            >
              <div className="p-5 pt-4">
                <div className="flex justify-items-center">
                  <p className="text-[2.4rem] font-semibold">
                    ${dataDetail.price}
                  </p>
                  <span className="pt-[6px] ml-1 text-[17px]">/ đêm</span>
                </div>
                <div className="pt-6 pb-6  relative h-[15rem]">
                  <div className="flex border-solid border-2 border-black/30 rounded-t-2xl overflow-hidden p-2 justify-between">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateRangePicker"]}>
                        <DateRangePicker
                          localeText={{ start: "Check-in", end: "Check-out" }}
                          value={value}
                          onChange={changePicker}
                          shouldDisableDate={shouldDisableDate}
                          disablePast
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div
                    onClick={onChangeDropdown}
                    className="h-[5.8rem] border-solid border-2 border-black/30 rounded-b-2xl p-2 flex justify-between relative cursor-pointer"
                  >
                    <div className="ml-4">
                      <p className="mb-0 font-medium text-lg">KHÁCH</p>
                      <p className="text-2xl">
                        {totalGuests} khách{" "}
                        {infants > 0 ? ", " + infants + " em bé" : ""}{" "}
                        {pet > 0 ? ", " + pet + " thú cưng" : ""}
                      </p>
                    </div>
                    <div className="text-4xl mr-2 mt-3 h-9 w-9">
                      {showDropdown ? (
                        <FontAwesomeIcon
                          icon={icon({
                            name: "chevron-up",
                            family: "classic",
                            style: "solid",
                          })}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={icon({
                            name: "chevron-down",
                            family: "classic",
                            style: "solid",
                          })}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={` ${
                      showDropdown ? "" : "hidden"
                    } absolute w-[100%] h-[42rem] border-checkout-bg border-[1px] rounded-2xl top-[13.5rem] bg-white left-0 z-10`}
                  >
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="adult"
                        totalGuest={adults}
                        setTotalGuest={setAdults}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="children"
                        totalGuest={children}
                        setTotalGuest={setChildren}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="infants"
                        totalGuest={infants}
                        setTotalGuest={setInfants}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="pet"
                        totalGuest={pet}
                        setTotalGuest={setPet}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between text-center">
                  <button
                    className="h-[4.8rem] bg-red-600 rounded-xl"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <p className="text-white font-medium text-3xl pt-2">
                      Đặt phòng
                    </p>
                  </button>
                  <p className="text-black text-2xl pt-2">
                    Bạn vẫn chưa bị trừ tiền
                  </p>
                </div>
                <div className="pt-6 pb-4 border-b-2">
                  <div className="flex justify-between text-lg">
                    <p className="text-[17px]">
                      {dataDetail.price} x {totalDays} đêm
                    </p>
                    <p className="text-[17px]">
                      {dataDetail.price * totalDays}$
                    </p>
                  </div>
                  {/* <div className="flex justify-between text-lg">
                    <p className="text-[17px]">Phí dịch vụ StayEasy</p>
                    <p className="text-[17px]">10$</p>
                  </div> */}
                </div>
                <div className="flex justify-between text-lg pt-6 font-semibold">
                  <p className="text-[17px]">Tổng trước thuế</p>
                  <p className="text-[17px]">{dataDetail.price * totalDays}$</p>
                </div>
              </div>
            </div>
          </div>
          {/* end-right */}
        </div>

        {/* chat with host */}
        <Row>
          <Col
            className="col-3"
            style={{ position: "fixed", zIndex: "99", top: "60%", right: "0" }}
          >
            <Alert show={show} variant="success">
              <Alert.Heading>Thông báo</Alert.Heading>
              <p>
                Tin nhắn của bạn đã được gửi đến {dataDetail.owner.firstName}{" "}
                {dataDetail.owner.lastName}
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShow(false)}
                  variant="outline-success"
                >
                  Close me
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>

        {/* <h2>host: {dataDetail.owner?.id}</h2>
        <h2>user: {idUser}</h2> */}

        {idUser !== dataDetail.owner?.id && (
          <div className="flex justify-center w-full">
            <div className="border-black/30 border-b-2 w-[89%] p-12 box-border flex justify-center">
              <Col className="col-5">
                <InputGroup className="mb-3">
                  <Form.Control
                    style={{ height: "40px", fontSize: "20px" }}
                    placeholder="Nhắn tin cho host"
                    aria-label="Nhắn tin cho host"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    onClick={sendMessageHost}
                    className="fs-5"
                    variant="outline-primary"
                    id="button-addon2"
                    style={{ width: "80px" }}
                  >
                    Gửi
                  </Button>
                </InputGroup>
              </Col>
            </div>
          </div>
        )}
        <CommentForm
          propertyId={id}
          ownerId={dataDetail.owner?.id}
        ></CommentForm>
      </div>
    </>
  );
}

export default Detail;
