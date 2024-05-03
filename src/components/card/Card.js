import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector, grouptSelector } from "../../redux-tookit/selector";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import axios from "axios";
import Slider from "react-slick";
import { UserContext } from "../UserContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
function Card(props) {
  // console.log("property: ", props.item);

  const dispatch = useDispatch();
  const user = useContext(UserContext).user;

  const counter = useSelector(counterSelector);
  const { reloadLike } = useSelector(grouptSelector);
  const checkin = new Date();
  let timeStamp = checkin.getTime() + 86400000;
  const checkout = new Date(timeStamp);
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);

  const isActive = props.item.likeList?.some(
    (like) => like?.idUser === user?.id
  );

  console.log("isActive: ", isActive);
  console.log(props.item.likeList);

  // Kiểm tra xem người dùng đã like property này hay chưa => true/false

  useEffect(() => {

    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    const client = Stomp.over(socket);
    client.debug = null;
    client.connect({}, () => {
    });

    setStompClient(client);

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };


  }, []);
  const handleLike = (e, idPost) => {
    e.stopPropagation();


    // console.log(props.item.owner.id);
    // like
    if (user && !isActive) {
      // console.log("like id: ", idPost, "idUSer: ", user?.id);

      axios
        .post(`http://localhost:8080/api/v1/stayeasy/like`, {
          idPost: idPost,
          idUser: user?.id,
        })
        .then(function (response) {
          dispatch(grouptSlice.actions.reloadLike());
          console.log("res ", response.data);

          if (user?.id !== props.item.owner.id) {
            let data = {
              senderId: user?.id,
              receiverId: props.item.owner.id,
              content: `${user.firstName} ${user.lastName} vừa thích bài đăng của bạn!`
            }
            stompClient.send(
              `/api/v1/stayeasy/app/notification/${data.receiverId}`,
              {},
              JSON.stringify(data)
            );
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // unlike
    else if (user && isActive) {
      // console.log("unlike id: ", idPost, "idUSer: ", user?.id);
      axios
        .delete(`http://localhost:8080/api/v1/stayeasy/unlike`, {
          params: {
            idPost: idPost,
            idUser: user?.id,
          },
        })
        .then(function (response) {
          dispatch(grouptSlice.actions.reloadLike());
          console.log("res ", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      dispatch(grouptSlice.actions.openLoginForm());
      console.log("chưa đăng nhập");
    }
  };

  const handleDetail = () => {
    const checkinString = checkin.toISOString().split("T")[0];
    const checkoutString = checkout.toISOString().split("T")[0];
    console.log(checkinString, checkoutString);

    console.log(checkin, checkout);
    navigate(
      `/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}`
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: false,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    const handleClick = (e) => {
      e.stopPropagation(); // Chặn sự kiện nổi bọt
      onClick && onClick(e); // Gọi lại hàm onClick nếu có
    };
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginRight: "-40px",
          position: "absolute",
          right: "30px",
          top: "55%",
        }}
        onClick={handleClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    const handleClick = (e) => {
      e.stopPropagation(); // Chặn sự kiện nổi bọt
      onClick && onClick(e); // Gọi lại hàm onClick nếu có
    };
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          position: "absolute",
          left: "10px",
          top: "55%",
          zIndex: "1",
        }}
        onClick={handleClick}
      />
    );
  }

  // console.log(props.item);
  return (
    <div
      onClick={() => handleDetail()}
      className="w-[32.5rem] h-[44rem] cursor-pointer flex-initial p-2"
      key={props.index}
    >
      <div className="w-full h-full relative">
        <div className="w-full h-[31rem] rounded-[1.6rem] overflow-hidden">
          {props.item.imagesList?.length > 0 ? (
            <Slider {...settings} className="w-full h-full">
              {props.item.imagesList?.map((item, index) => (
                <div key={index} className="h-[32.5rem]">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover rounded-[1.6rem]"
                    src={item.url}
                    testindex={index}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="h-[32.5rem]">
              <img
                loading="lazy"
                className="w-full h-full object-cover rounded-[1.6rem]"
                src={props.item.thumbnail}
                alt=""
              />
            </div>
          )}
        </div>
        <div
          className={`heart-btn flex absolute top-5 right-[2rem] text-fav-icon text-5xl bg-transparent 
              ${isActive ? "active" : ""}`}
          onClick={(e) => handleLike(e, props.item.propertyId)}
        >
          <FontAwesomeIcon
            style={{ stroke: "white" }}
            className="text-4xl z-10 text-customColor transition-all ease-in duration-200"
            icon={icon({ name: "heart", family: "classic", style: "solid" })}
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between items-center text-3xl mt-2 h-10">
            <div className="h-[2rem] line-clamp-2">
              <h3 className="text-[1.6rem]">{props.item.propertyName}</h3>
            </div>
            <div className="flex items-center mt-3 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="block h-5 w-5 mb-3 text-current"
              >
                <path
                  fill-rule="evenodd"
                  d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                ></path>
              </svg>
              <p className="text-2xl">{props.item.rating}</p>
            </div>
          </div>
          <div className="text-[#717171]">{props.item.address}</div>
          <div className="text-[#717171]">5 đêm · 19 – 24 tháng 3</div>
          <div className="underline">
            <p className="font-medium">
              ${props.item.price}
              <span className="font-normal">/đêm</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
