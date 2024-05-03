
import React, { useState, useEffect, useRef, useContext, memo } from "react";
import "./feedback.scss";
import moment from "moment";
import { UserContext } from "../UserContext";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";

const Feedback = ({ userId,propertyId}) => {
  const [feedbacks, setFeedbacks] = useState({});
  const [newFeedback, setNewFeedback] = useState({
    content: "",
    rating: 0,
    user: {
      id: "",
    },
    property: {
      propertyId: "",
    },
  });
  const [editFeedback, setEditFeedback] = useState({
    feedbackId: "",
    content: "",
    rating: 0,
    user: {
      id: "",
    },
    property: {
      propertyId: "",
    },
  });
  const commentContainerRef = useRef(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [disable, setDisable] = useState(false);
  const [isEdit , setIsEdit] = useState(false);

  const user = useContext(UserContext).user;
  
  useEffect(() => {
    if (user) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const getFeedback = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/trip/feedback/${userId}/${propertyId}`
    );
    setFeedbacks(res.data);
  };

  useEffect(() => {
    getFeedback();
  }, [propertyId]);


  const handleSendFeedback = () => {
    newFeedback.user.id = user?.id;
    newFeedback.property.propertyId = propertyId;
    newFeedback.rating = rating;
    newFeedback.content = content;
    axios.post(`http://localhost:8080/api/v1/stayeasy/trip/feedback/add`, newFeedback)
    .then(function (response) {
      console.log("response: ", response);
      setNewFeedback({
        content: "",
        rating: 0,
        user: {
          id: "",
        },
        property: {
          propertyId: "",
        },
      });
      setContent("");
      setRating(0);
      getFeedback();
    })
    .catch(function (error) {
      console.log("error: ", error);
    });
  };

  const handleUpdateFeedback = async(feedbackId) => {
    
        editFeedback.feedbackId = feedbackId;
        editFeedback.rating = rating;
        editFeedback.user.id = user?.id;
        editFeedback.property.propertyId = propertyId;
        editFeedback.content = content;
        const res = await axios.put(
          `http://localhost:8080/api/v1/stayeasy/trip/feedback/edit/${feedbackId}`,
          editFeedback
        );
      setEditFeedback({
        feedbackId: "",
        content: "",
        rating: 0,
        user: {
          id: "",
        },
        property: {
          propertyId: "",
        },
      });
      setContent("");
      setRating(0);
      setIsEdit(false);
      getFeedback();
  };

  const handleDeleteFeedback = async(feedbackId) => {
    await axios.delete(
      `http://localhost:8080/api/v1/stayeasy/trip/feedback/delete/${feedbackId}`
    );
    getFeedback();
  };

  return (
    <div className="w-full">
      <h1>Đánh giá</h1>
      <ul
        className={`${
          feedbacks ? "" : "hidden"
        } show-cm w-full mt-6 rounded-3xl shadow-checkout-shadow border-checkout-bg border-[1px] bg-white`}
        ref={commentContainerRef}
      >
          <li className="row w-[95%] pl-8 pb-2 pt-8">
            <div>
              <img
                className="w-[5rem] h-[5rem] rounded-full"
                src={
                  feedbacks.user?.avatar ||
                  `https://bootdey.com/img/Content/avatar/avatar7.png`
                }
                alt="Image Description"
              />
            </div>

            <div className="w-full rounded-2xl ml-10 p-4 bg-white mt-2 h-full shadow-checkout-shadow border-checkout-bg border-[1px] mb-4">
              <div className="flex relative">
                <h1 className="text-3xl">{feedbacks.user?.firstName || "Ẩn Danh"}</h1>
                <div className="pl-4 flex">
                {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                    return (
                    <label key={index}>
                        <StarIcon
                        style={{fontSize: "25px"}}
                        className={`${ratingValue <= feedbacks.rating ? "text-yellow-500" : "text-gray-300"}`}
                        />
                    </label>
                    );
                }
                )}
                </div>
                <div className="absolute right-0 top-0">
                  <div className="flex gap-4">
                    <button
                        onClick={() => {
                        setContent(feedbacks.content);
                        setIsEdit(true);
                        setEditFeedback(feedbacks);
                        }}
                    >
                        <i className="far fa-edit"></i>
                    </button>
                    
                    <button
                        onClick={() => handleDeleteFeedback(feedbacks.feedbackId)}
                    >
                        <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-2xl italic">
                {moment(feedbacks.createAt).format("YYYY-MM-DD HH:mm")}
              </span>
              <p>{feedbacks.content}</p>
            </div>
          </li>
      </ul>

      {/* write comment */}

      <div
        className={` ${feedbacks ? 'hidden' : ''} w-full mt-8 rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] pl-8 pt-4 pb-4`}
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
              {user?.firstName + " " + user?.lastName}
            </p>
            <div className="pl-4 flex">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <StarIcon
                    style={{fontSize: "25px"}}
                    onClick={() => setRating(ratingValue)}
                    className={`cursor-pointer ${ratingValue <= (rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                  />
                </label>
              );
            }
            )}
            </div>
          </div>

          <div className="rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] w-[95%] ml-[2rem] mt-2">
            <textarea
              name="comment"
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ height: "100px", width: "100%" }}
              placeholder="Nhập bình luận của bạn..."
              className="p-4"
            ></textarea>
          </div>
          <div className={`${disable ? "hidden" : ""} w-full flex justify-end pr-12 pb-2 mt-3`}>
            <div
              className={`bg-[#ff5a5f] w-[25%] rounded-2xl text-center cursor-pointer hover:bg-[#ff5a5f] ${disable ? "hidden" : ""}`}
              onClick={handleSendFeedback}
            >
              <p className="text-white font-medium text-3xl pt-2">
                Send Feedback
              </p>
            </div>
          </div>
        </div>
      </div>



      <div
        className={` ${(feedbacks) &&(isEdit) ? '' : 'hidden'} w-full mt-8 rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] pl-8 pt-4 pb-4`}
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
              {user?.firstName + " " + user?.lastName}
            </p>
            <div className="pl-4 flex">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <StarIcon
                    style={{fontSize: "25px"}}
                    onClick={() => setRating(ratingValue)}
                    className={`cursor-pointer ${ratingValue <= (rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                  />
                </label>
              );
            }
            )}
            </div>
          </div>

          <div className="rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] w-[95%] ml-[2rem] mt-2">
            <textarea
              name="commentEdit"
              id="commentEdit"
              defaultValue={feedbacks.content}
              onChange={(e) => setContent(e.target.value)}
              style={{ height: "100px", width: "100%" }}
              placeholder="Nhập bình luận của bạn..."
              className="p-4"
            ></textarea>
          </div>
          <div className={`w-full flex justify-end pr-12 pb-2 mt-3`}>
            <div
              className={`bg-[#ff5a5f] w-[25%] rounded-2xl text-center cursor-pointer hover:bg-[#ff5a5f]`}
              onClick={() => handleUpdateFeedback(feedbacks.feedbackId)}
            >
              <p className="text-white font-medium text-3xl pt-2">
                Update Feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Feedback);
