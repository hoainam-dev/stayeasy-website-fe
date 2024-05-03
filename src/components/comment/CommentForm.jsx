// CommentForm.js

import React, { useState, useEffect, useRef, useContext } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import "./comment.scss";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";
import moment from "moment";
import { UserContext } from "../UserContext";
import StarIcon from '@mui/icons-material/Star';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value?.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  console.log(name);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
  };
}

const CommentForm = ({ propertyId, ownerId }) => {
  const dispatch = useDispatch();
  const counter = useSelector(counterSelector);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const commentContainerRef = useRef(null);
;

  const user = useContext(UserContext).user;

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [counter]);


  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/api/v1/stayeasy/topic/feedback/${propertyId}`,
        (message) => {
          const newFeedback = JSON.parse(message.body);
          setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
        }
      );
    });
    return () => stompClient.disconnect();
  }, [propertyId]);

  const handleSendFeedback = () => {
    const idUser = user?.id;
    if (newFeedback && idUser) {
      const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        stompClient.send(
          `/api/v1/stayeasy/app/feedback/${propertyId}`,
          {},
          JSON.stringify({
            content: newFeedback,
            userId: user?.id,
            username: `${user?.firstName}  ${user?.lastName}`,
            avatar: user?.avatar,
            propertyId: propertyId,
          })
        );
      });
      setNewFeedback("");
    } else {
      dispatch(grouptSlice.actions.openLoginForm());
    }
  };

  console.log("dataFedd: ", feedbacks);

  useEffect(() => {
    // Lấy danh sách phản hồi từ API khi component được tạo
    fetch(`http://localhost:8080/api/v1/stayeasy/feedback/get/${propertyId}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedbacks:", error));

    // Thiết lập kết nối WebSocket để lắng nghe phản hồi mới (đã triển khai trước đó)
  }, [propertyId]);

  useEffect(() => {
    // Sau khi nhận được danh sách bình luận mới, cuộn xuống cuối container

    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
    }
  }, [feedbacks]);

  return (
    <div className="ml-24 p-4">
      <h1>{feedbacks?.length} Bình luận</h1>
      <ul
        className={`${
          feedbacks?.length > 0 ? "" : "hidden"
        } show-cm w-[75%] mt-6 rounded-3xl shadow-checkout-shadow border-checkout-bg border-[1px] bg-white`}
        ref={commentContainerRef}
      >
        {feedbacks?.map((feedback, index) => (
          <li className="row w-[95%] pl-8 pb-2 pt-8" key={index}>
            <div>
              <img
                className="w-[5rem] h-[5rem] rounded-full"
                src={
                  feedback.avatar ||
                  `https://bootdey.com/img/Content/avatar/avatar7.png`
                }
                alt="Image Description"
              />
            </div>

            <div className="w-full rounded-2xl ml-10 p-4 bg-white mt-2 h-full shadow-checkout-shadow border-checkout-bg border-[1px] mb-4">
              <div className="flex">
              <h1 className="text-3xl">{feedback.username || "Ẩn Danh"}</h1>
              </div>
              <span className="text-2xl italic">
                {moment(feedback.createAt).format("YYYY-MM-DD HH:mm")}
              </span>
              <p>{feedback.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* write comment */}

      <div
        className={`${
          user?.id === ownerId ? "hidden" : ""
        }  w-[75%] mt-8 rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] pl-8 pt-4 pb-4`}
      >
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            <img
              className="d-flex g-width-50 rounded-circle g-mt-3 g-mr-15"
              src={
                user?.avatar ||
                `https://bootdey.com/img/Content/avatar/avatar7.png`
              }
              alt="Image Description"
            />
            <p className="text-3xl m-0 font-semibold">
              {user?.firstName != null && user?.lastName != null ? user?.firstName + " " + user?.lastName: "Ẩn Danh"}
            </p>
          </div>

          <div className="rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] w-[95%] ml-[2rem] mt-2">
            <textarea
              name="comment"
              id="comment"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              style={{ height: "100px", width: "100%" }}
              placeholder="Nhập bình luận của bạn..."
              className="p-4"
            ></textarea>
          </div>
          <div className={`w-full flex justify-end pr-12 pb-2 mt-3`}>
            <div
              className={`bg-[#ff5a5f] w-[25%] rounded-2xl text-center cursor-pointer hover:bg-[#ff5a5f]`}
              onClick={handleSendFeedback}
            >
              <p className="text-white font-medium text-3xl pt-2">
                Send Feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
