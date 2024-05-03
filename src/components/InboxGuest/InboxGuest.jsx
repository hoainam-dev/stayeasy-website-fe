import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./inboxGuest.module.css";
import { json, useNavigate, useParams } from "react-router-dom";
import Message from "./Message/Message";
import Stomp from "stompjs";
import { ShowContext } from "../../pages/Inbox/ShowComponent";
import SockJS from "sockjs-client";
import EmojiPicker from "emoji-picker-react";
import { Spinner } from "react-bootstrap";
import {UserContext} from '../../components/UserContext'
export default function InboxGuest() {
  const active = useContext(ShowContext).active;
  const changeActive = useContext(ShowContext).changeActive;
  const roomId = useParams().roomId;
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  // const idUser = JSON.parse(localStorage.getItem("user"))?.id;
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [isPickkerVisible, setPickkerVisible] = useState(false);
  const [perm, setPerm] = useState(false);
  const navigate = useNavigate()
  const user = useContext(UserContext).user
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/v1/stayeasy/chatroom/check-room/${roomId}`, {
  //     headers: {
  //       'Authorization': `BEARER ${JSON.parse(localStorage.getItem("access_token"))}`
  //     }
  //   })
  //     .then(data => data.json())
  //     .then(data => {
  //       if (data) {
  //         setPerm(true)
  //       } else {
  //         navigate('/inbox')
  //       }
  //     })

  // })



  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/stayeasy/chatroom/get/all/${roomId}`,
      {
        headers: {
          'Authorization': `BEARER ${localStorage.getItem("access_token")}`
        }
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setMessages(data);
        setPerm(true)
      })
      .catch((err) => {
        setPerm(false)
        navigate('/inbox')
      });
  }, [roomId, perm]);
  useEffect(() => {

    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    if (perm) {
      const client = Stomp.over(socket);
      client.debug = null;
      client.connect({}, () => {
        if (client.connected) {
          client.subscribe(`/api/v1/stayeasy/topic/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          });
        }
      });

      setStompClient(client);

      return () => {
        if (client.connected) {
          client.disconnect();
        }
      };
    }


  }, [roomId, perm]);

  function handleMess(e) {
    setMessage(e.target.value);
  }
  function sendMess(event) {
    if (event.key === "Enter") {
      if (message.trim()) {
        const chatMessage = {
          chatRoomId: roomId,
          userId: user.id,
          content: message,
        };
        stompClient.send(
          `/api/v1/stayeasy/app/chat/${roomId}`,
          { token: `${localStorage.getItem("access_token")}` },
          JSON.stringify(chatMessage)
        );
        setMessage("");
      }
    }
  }
  const handleEmojiClick = (emojiData) => {
    setMessage(message + emojiData.emoji);
  };
  function offEmoji() {
    setPickkerVisible(false);
  }

  return (
    setPerm ?
      <div
        className={
          active ? style.thread_box : `${style.thread_box} ${style.thread_active}`
        }
      >
        <div className={style.thread_top}>
          <div className={style.thread_name}>
            <h2>Chat Box</h2>
          </div>
          <div className={style.thread_button}>
            <button onClick={changeActive}>
              {active ? "Hide details" : "Learns the details"}
            </button>
          </div>
        </div>

        <div className={style.thread_center}>
          <ul>
            {messages.map((e) => (
              <Message key={e.messageId} data={e}></Message>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        <div className={style.thread_chat}>
          <input
            onChange={handleMess}
            onClick={offEmoji}
            onKeyDown={sendMess}
            value={message}
            type="text"
            placeholder="enter your message"
          />
          <i
            onClick={() => setPickkerVisible(!isPickkerVisible)}
            className="fa-solid fa-face-laugh-squint"
          ></i>
          {isPickkerVisible ? (
            <div className={style.thread_emoji}>
              <EmojiPicker onEmojiClick={handleEmojiClick}></EmojiPicker>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      :

      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

  );
}
